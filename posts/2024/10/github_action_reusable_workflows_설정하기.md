---
title: "github action reusable workflows 설정하기"
tags:
  - github action
published: true
date: 2024-10-26 16:46:12
description: "github action reusable workflows 설정"
---

# github action reusable workflows 설정하기

---

## Table of Contents
- [설정 방법](#설정-방법)
  - [Reusable workflow](#reusable-workflow)
  - [Caller workflow](#caller-workflow)
  - [주의해야할 점](#주의해야할-점)
- [ref](#ref)

> 이 글은 github action에 대한 지식을 전부 설명하지 않습니다.

github action 으로 작성된 파이프라인을 보던 중 workflow 가 공통된 작업이 많았다. cloud에 업로드하는 경로, environment 만 다를 뿐 나머지 로직은 동일해서 해당 로직을 재사용 하는 방법을 알아봤다.

## 설정 방법
workflow 를 재사용하기 위해선 `reusable workflow` 와 `caller workflow` 를 구분해서 설정해야한다. `reusable workflow`는 단어 그대로 재사용이 가능한 workflow 인데, 공통된 로직을 해당 워크플로우에 작성하고 caller 에서는 가져다 쓰는 구조이다.

#### Reusable workflow
`.github/workflows` 디렉토리 내에서만 지원하고 하위 디렉토리나 다른 디렉토리에선 지원하지 않으며 `on`에 필수적으로 `workflow_call` 을 명시적으로 선언해야 `reusable workflow` 로서 사용할 수 있다.

```yml
on:
  workflow_call:
```


만약 나처럼 업로드 하기 위한 경로나, 환경에만 차이가 있다면 해당 값만 props 처럼 받아서 사용하고 싶을 텐데 이런 설정은 `inputs` 이나 `secrets` 키워드를 이용해서 지원한다.

```yml
# .github/workflow/reusable-workflow.yml

name: Reusable workflow

on:
  workflow_call:
    inputs: 
      # 여기에 caller workflow 에 따라 달라지게 될 inputs을 입력한다.
      env:
        required: true
        type: string
        description: 'github action 실행 환경'
    secrets:
	        

jobs:
  build:
	name: Build Service
	runs-on: ubuntu-latest
	steps:
	  # inputs이나 secrets의 값들은 다음과 같이 참조하여 호출한다.
	  - run: cp ${{ inputs.env }} .env
	# 생략..
```

#### Caller workflow
reusable workflow를 호출하는 workflow이다. 해당 workflow 내에서 `reusable workflow` 를 `uses` 키워드를 통해 호출한다.

```yml
# .github/workflow/dev-deploy.yml

name: Dev Deploy

on:
  push:
    branches: dev

jobs:
  deply:
    uses: ./.github/workflows/reusable-workflow.yml
    # reusable workflows의 inputs 내에 필요한 값은 with 키워드를 통해 전달한다.
    with:
      env: dev
    # secrets은 다음과 같이 상속해서 참조할 수도 있다.
    secrets: inherit    
```
해당 파일을 보면 `reusable workflow` 가 같은 레포에 선언되어 있는걸 알수 있다. 위와 같이 설정할 경우 caller 와 reusable workflow는 동일한 커밋에서 호출된다.

만약 `reusable workflow` 가 다른 레포에 있다면 다음과 같이 호출한다.

```yml
# owner_name/repo_name_a/.github/workflow/dev-deploy.yml

name: Dev Deploy

on:
  push:
    branches: dev

jobs:
  deply:
    uses: owner_name/repo_name_b/.github/workflows/reusable-workflow.yml@main
    with:
      env: dev
    secrets: inherit    
```

해당 파일을 보면 다른 워크플로에서 호출되고 있음을 알 수 있으며, 마지막에 @main 옵션을 통해 main 브렌치에 있는 workflow를 호출한다.

마지막 옵션은 ref 옵션으로 커밋 SHA, 릴리즈 태그, 브렌치 이름을 옵션에 포함시킬 수 있다. 만약 릴리즈 태그와 브렌치 이름이 같을 경우 릴리즈 태그를 더 우선시 해서 릴리즈 태그 옵션으로 호출한다.

### 주의해야할 점

1. 깃헙에서 가장 권장하는 옵션은 커밋 SHA 로 [보안상의 이유](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions#using-third-party-actions)로 해당 옵션을 가장 권장한다고 한다. 외부 workflow를 호출 할 때에는 해당 부분을 고려 해야겠다.

2. workflow는 최상위에서 호출한 caller 를 포함해서 최대 4개의 depth 까지 연결할 수 있다. reusable 내에 reusable 을 호출할 수 있지만 최대 4개의 depth 까지만 가능하기 때문에 만약 reusable workflow 를 설정한다면 해당 부분을 고려해서 구조를 설계해야 한다.

3. 하나의 workflows 에서는 최대 20개의 **단일** reusable workflow 를 호출할 수 있다. 만약 `최상위_workflow.yml` -> `called_workflow_1.yml` -> `called_workflow_2.yml` 일경우 2개로 계산 된다.

4. `secrets: inherit` 키워드를 사용하면 해당 workflow에만 secrets이 전달된다. 만약 secrets 을 하위 `reusable workflow` 에 제한적으로 전달되길 원하거나 모든 workflow 에 전달하길 원할경우 해당 부분을 고려해야한다.

## ref
- https://docs.github.com/en/actions/sharing-automations/reusing-workflows

