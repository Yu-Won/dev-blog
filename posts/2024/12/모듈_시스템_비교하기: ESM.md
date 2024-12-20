---
title: "모듈 시스템 비교하기(2편) - ESM"
tags:
  - ESM
published: true
date: 2024-12-20 14:11:39
description: "모듈 시스템 비교하기 - ESM"
---

# 모듈 시스템 비교하기(2편) - ESM이란

---

## Table of Contents

- [ESM(ECMAScript Modules) 의 등장](#esmecmascript-modules-의-등장)
  - [1. 브라우저 네이티브 지원](#1-브라우저-네이티브-지원)
  - [2. 정적 분석 가능](#2-정적-분석-가능)
  - [3. 모듈 캐싱](#3-모듈-캐싱)


지난번에 cjs의 등장 배경과 히스토리들을 간단하게 살펴보았다. 그렇다면 ESM의 등장 배경에 대해서도 알아보자.

## ESM(ECMAScript Modules) 의 등장
node.js, npm으로 인해 자바스크립트 생태계가 확장 되었지만 브라우저에 최적화 되지 않은 CommonJS 모듈 시스템의 한계로 인해 자바스크립트 생태계는 호환성 문제를 겪기 시작했다. 
자바스크립트의 호환성 문제와 CommonJS의 한계를 극복하기 위해서 ECMAScript 표준 위원회(TC39)가 새로운 모듈 시스템을 제안했는데 그게 바로 ESM이다.
ES6/ES2015 에서 공식적으로 도입 되었으며 다음과 같은 특징을 가지고 있다.

### 1. 브라우저 네이티브 지원
ESM은 최신 브라우저(크롬 등)에서 기본적으로 지원된다. 이를 통해 번들링 없이도 모듈을 로드할 수 있어 간단한 프로젝트에서 빌드 도구 없이 직접 모듈을 사용할 수 있다. 아래 코드는 직접 브라우저에 바로 실행되며 greet.js가 동적으로 실행된다. script 태그에 `type="module"` 로 손쉽게 설정이 가능하다.

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ESM in Browser</title>
</head>
<body>
  <script type="module">
    import { greet } from './greet.js';
    console.log(greet('World'));
  </script>
</body>
</html>

```

```js
export function greet(name) {
  return `Hello, ${name}`;
}
```

### 2. 정적 분석 가능
ESM은 `import`와 `export`가 정적으로 정의되므로, 빌드 도구(Webpack, Rollup 등)는 의존성을 분석해 사용되지 않는 코드를 제거(Tree Shaking)할 수 있다. 아래 예시에서 빌드 도구는 `subtract`와 `multiply`가 사용되지 않음을 감지하여 최종 번들에서 제거한다.

```js
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;

// main.js
import { add } from './math.js';

console.log(add(2, 3)); // 5

```

### 3. 모듈 캐싱
ESM은 한 번 로드된 모듈을 동일한 페이지 내에서 재사용(캐싱)한다. 동일한 모듈을 여러 번 가져와도 실제 네트워크 요청은 한 번만 발생한다.

```js
// logger.js
export function logMessage(message) {
  console.log(`Log: ${message}`);
  return Date.now();
}

// main.js
import { logMessage } from './logger.js';

const timestamp1 = logMessage('First Message');
const timestamp2 = logMessage('Second Message');

console.log(timestamp1 === timestamp2); // true, 동일한 인스턴스 사용

```

CJS의 문제점으로 지목되던 부분들을 완벽하게 보완할 수 있는 점 때문에 대부분의 최신 프로젝트에선 기본적인 시스템으로 자리잡게 되었다.

----
기존에 자리잡은 시스템을 변경하는 일은 정말 쉬운 일이 아닌것 같다. 각각의 장점이 있고 그때 당시의 최선의 선택이였던것 같아서 모든 선택엔 아쉬움이 남을 수 밖에 없는것 같다.