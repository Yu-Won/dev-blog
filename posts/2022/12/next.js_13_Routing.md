---
title: "next.js 13 - Routing"
tags:
  - next.js
published: true
date: 2022-12-01 22:38:47
description: "next.js 13은 뭐가 달라졌을까? - Routing 편"
---

# next.js 13 - Routing

---

## next.js v13에는 어떤것들이 바뀌었을까?

지난 10월 26일 next.js는 Next.js Conf를 개최했었다. 그 때 next.js 13에 대해 발표를 했었다. 먼저 Rouging 부터 살펴보자.

## app Directory (beta)

기존에 next.js 는 `pages`라는 폴더 내부에 폴더와 파일을 생성하면 next.js 내부에서 알아서 라우팅이 될 수 있도록 설계되어 있었다. `pages`폴더를 생성함으로써 편리하게 라우팅 설계를 할 수 있다는 장점이 있었지만 완벽하게 해당 페이지 전체를 정적인 파일로 만들지는 못했다.<br />
다음의 이미지를 참고하면 쉽게 이해할 수 있다.<br />

![pages_directory](pages_directory.png)

다음과 같이 보이는 `/about` 페이지가 있다고 가정하자.<br />
`/about` 페이지에서 실제로 `pages` 폴더 내에서 정적인 파일로 생성할 수 있는 부분은 보라색 영역이다.

문제는 노랑색에 해당하는 레이아웃 부분이다. 레이아웃 부분은 `pages` 폴더 내에서 관리하는 것이 아니라 컴포넌트로 관리를 하게 되는데 대부분의 레이아웃에서는 `<a></a>` 태그들이 존재하게 된다.<br />
물론 `<a></a>`에 해당하는 링크들을 소스코드 내에서 상수로 관리한다면 상관없지만, CMS 등에서 경로를 받아와서 렌더링을 해야할 경우, 컴포넌트 내에서 fetch를 해야하기 때문에 레이아웃에 해당하는 영역을 CSR로 렌더링 시킬 수 밖에 없다.<br />
때문에 이를 보완하기 위해서 `getInitalProps`를 사용하거나 `sitemap.xml` 파일을 제출하는 방법을 개인적으로 사용했었다.

이와 같이 `pages` 폴더를 사용해서 라우팅하는 방식은 약간의 불편함이 있었고 [Layouts RFC](https://nextjs.org/blog/layouts-rfc)를 공개하면서 app Directory를 예고했었다.

> ### 💡 용어 정리
>
> - **Tree**: app directory의 계층구조를 시각화하기 위해 사용하는 용어, 폴더구조
> - **Subtree**: Root(첫번째)에서 시작해서 Leaf(마지막)에서 끝나는 트리의 일부
> - **Root**: Root Layout과 같은 트리, 또는 하위 트리의 첫번째 노드
> - **Leaf**: url path 의 segment처럼 하위 트리가 없는 노드
> - **URL Path**: 도메인 뒤에 오는 URL의 일부(현재 블로그의 "/post/2022/12/next.js_13"에 해당됨)
> - **URL Segment**: "/"로 구분 된 URL 경로의 일부(현재 블로그의 "/post", "/2022"등이 해당됨)

### Defining Routes

기존 `pages` 폴더처럼 `app` 폴더 내부에 폴더를 정의함으로써 route를 설정할 수 있다. 폴더의 이름은 URL segment를 나타내며 중첩된 경로 또한 생성할 수 있다.<br />
하지만 `app` 폴더 내부에 폴더를 정의하길 원하지만 route 경로설정은 되지 않기를 원할 수도 있다. 이를 위해 `next.js`는 폴더 이름을 괄호() 로 생성할 경우 route 경로 설정이 되지 않도록 convention을 추가했다.<br />
개인적으로 생각했을 때, 여러 레이아웃을 공유하지만 route 경로가 다를 때 상위 트리에서 괄호로 정의된 폴더를 사용한다면 유용하게 사용할 수 있지 않을까 생각했다.

그리고 기존의 convention과 동일하게 동적인 segment는 대괄호[]를 사용한 컨벤션을 유지했다.

### Pages and Layouts

새롭게 제안한 Layouts은 기존에 `pages` 폴더가 아니라 `app` 폴더를 사용하는 구조로 되어있다.<br />
`app` 폴더 내에서 폴더나 파일에 따라 다음과 같이 역할이 나뉘어져 있으며 app 폴더에 적용된 새로운 라우팅 모델의 기본 개념을 소개하고자 한다.<br />

- **폴더**: 경로를 정의하는데 사용된다. 루트폴더(root folder) 부터 리프폴더(leaf folder)까지의 트리 구조를 따르는 단일 경로다.
- **파일**: 경로 세그먼트에 대해 보여질 UI를 정의한다.

**Special Files**

- `pages.js`: 현재 경로의 고유한 UI
- `layout.js`: 여러 페이지에서 공유되는 UI를 정의하기 위해 사용할 수 있는 파일. 다른 레이아웃이나 페이지들을 leaf로 받아들인다.
- `loading.js`: 특정 부분에 대한 로딩 UI를 생성하는데 사용하는 선택적인 파일
- `error.js`: 오류 발생시 특정 부분으로 격리하고 표시하고 복구를 시도하는 기능에 사용되는 선택적인 파일
- `template.js`: layout과 유사하지만 새로운 인스턴스의 컴포넌트가 마운트 될 때 상태를 공유하지 않는다. 애니메이션의 시작/종료, useEffect 나 useState에 의존하는 기능등을 구현할 때 유용
- `head.js`: 현재 경로의 `<head>`의 컨텐츠를 정의하는 선택적인 파일
- `not-found.js`: `notFound` 함수를 통해 보여질 UI

### Loading UI

새로운 file convention인 `loading.js`는 [React Suspense](https://beta.reactjs.org/reference/react/Suspense)를 사용해서 UI를 렌더링 할 수 있다. 이 컨벤션을 따르면, 컨텐츠가 로드되는 동안 서버에서 instant loading state를 표시할 수 있으며, 렌더링이 완료되면 자동으로 교체된다.

instant loading state는 경로 탐색시 즉각적으로 표시되는 대체 UI인데 컨텐츠가 그려질 부분에 임시적으로 UI를 표시함으로써 더 나은 UX를 제공할 수 있다.

### Error Handling

새로운 file convention인 `error.js`는 [React Erorr Boundaries](https://reactjs.org/docs/error-boundaries.html)를 기반으로 해서 오류가 발생하는 경우 fallback으로 처리할 수 있다.

`error.js` 내에서 특정한 오류가 발생했을 때 오류를 복구하는 시도를 하는 기능을 추가할 수 있으며, 반드시 Client Components여야만 한다.

## Ref

- [beta next.js docs - Routing Fundamentals](https://beta.nextjs.org/docs/routing/fundamentals)
