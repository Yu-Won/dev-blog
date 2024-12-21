---
title: "모듈 시스템 비교하기(2편) - ESM"
tags:
  - ESM
published: true
date: 2024-12-21 11:26:28
description: "모듈 시스템 비교하기 - ESM"
---

# 모듈 시스템 비교하기(2편) - ESM이란

---

## Table of Contents

- [ESM(ECMAScript Modules) 의 등장](#esmecmascript-modules-의-등장)
  - [1. 브라우저 네이티브 지원](#1-브라우저-네이티브-지원)
  - [2. 정적 분석 가능](#2-정적-분석-가능)
  - [3. 모듈 캐싱](#3-모듈-캐싱)
- [ESM의 현재](#esm의-현재)


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

## ESM의 현재
현재 ESM 시스템은 서버 사이드 환경에서도 지원이 확장 되었으며 Node.js에서는 12버전부터 ESM을 실험적으로 지원하였고, 14버전 이후로는 안정적인 지원이 이루어졌다. 이러한 변화는 서버 사이드에서의 모듈 시스템 통합을 가능하게 하여, 브라우저와 서버 코드에서 동일한 모듈 시스템을 사용할 수 있게 되었다.

ESM의 도입은 자바스크립트 생태계에 큰 변화를 가져왔다. 브라우저와 서버에서 동일한 모듈 시스템을 사용함으로써 개발자 경험이 향상되었고, 코드의 이식성과 유지보수가 더 쉬워졌다. 특히, 다양한 빌드 도구와 패키지 관리 시스템이 ESM을 기본적으로 지원하게 되면서 현대적인 자바스크립트 프로젝트의 표준으로 자리 잡았다.

그러나 ESM의 도입 초기에는 호환성 문제가 있었다. 예를 들어, 기존 CommonJS 모듈과의 상호작용에서 어려움이 발생하거나, 초기 버전의 Node.js 환경에서 `import`와 `export`를 사용하는 데 제약이 있었다. 이러한 문제를 해결하기 위해 Node.js는 ESM 지원을 강화하면서도 CommonJS와의 공존 방안을 제공하고 있으며, 현재는 `type: "module"`과 같은 설정을 통해 두 모듈 시스템을 함께 사용할 수 있다.

또한, ESM은 기본적으로 비동기적 로드를 수행하므로, 파일 시스템 접근과 같은 동기적 모듈 로드 방식에 익숙했던 개발자들에게는 새로운 패턴을 학습해야 하는 부담을 주기도 했다. 이를 보완하기 위해 Node.js는 `import.meta`와 `Dynamic Import`와 같은 새로운 기능을 도입하여 더 유연한 방식으로 모듈을 사용할 수 있도록 했다.

결론적으로, ESM은 자바스크립트의 모듈 관리에 있어 더 강력하고 현대적인 대안을 제공하며, 현재와 미래의 웹 개발 환경에서 핵심적인 역할을 하고 있다. 앞으로도 ESM은 꾸준히 발전하며 더 많은 생태계 전반에서 주요 모듈 시스템으로 자리 잡을 것으로 보인다.