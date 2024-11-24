---
title: "모듈 시스템 비교하기: CJS는 어떻게 등장하고 표준이 되었던걸까?"
tags:
  - cjs
published: true
date: 2024-11-24 13:26:11
description: "모듈 시스템 비교하기 - CommonJS"
---

# 모듈 시스템 비교하기(1편): CJS는 어떻게 등장하고 표준이 되었던걸까?

---

## Table of Contents

- [모둘 시스템의 등장 배경](#모듈-시스템의-등장-배경)
- [CommonJS의 등장](#commonjs의-등장)
- [Node.js의 등장](#nodejs의-등장)
- [npm의 등장](#npm의-등장)
- [CommonJS의 한계](#commonjs의-한계)
  - [동기적 모듈 로딩](#1-동기적-모듈-로딩)
  - [정적 분석 불가능](#2-정적-분석-불가능)
  - [브라우저 호환성 부족](#3-브라우저-호환성-부족)
  - [이중 생태계의 복잡성](#4-이중-생태계의-복잡성)
- [Ref](#ref)

여러 프로젝트를 진행하면서 새로운 패키지를 추가해야할 때가 있다. 새로운 패키지를 리서치 하던 중 흥미로운 PR을 본 적이 있다.

https://github.com/TanStack/table/pull/4552

약 2년전 PR 인데, 빠르게 수정되고 빠르게 머지되었다. 저때 cjs와 esm에 대해서 정리해두자! 라고 생각한게 벌써.. 시간이 그렇게 되었다.. 지금이라도 모듈 시스템에 대해 정리해보려 한다.

## 모듈 시스템의 등장 배경

초기에 웹이 등장했을때는 단순히 문서(HTML) 를 전세계로 보여주는게 전부였다. 초기 웹은 정보를 공유하는 목적이였기 때문에 동적인 기능은 거의 없었다. 하지만 전 세계적으로 웹이 도입되면서 정적인 웹 페이지에 동적인 기능을 추가하기 위해서 JavaScript가 개발 되었다. 초기에는 주로 다음과 같은 작업들에 js가 사용되었다.

- 사용자 입력 확인 (form validation)
- 간단한 인터렉션 (버튼 클릭시 이벤트 처리)
- 페이지 일부를 동적으로 변경

이런 이유로 웹에 동적인 동작이 가능해지면서 기술적인 요구사항은 점점 늘어가게 되었다.
다음 예시 코드를 한번 보자.

```html
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>간단한 폼 예제를 만들어보자</title>
	</head>
	<body>
		<h1>폼 예제</h1>

		<form onsubmit="return handleSubmit(this)">
			<label for="name">이름:</label>
			<input type="text" id="name" name="name" required />
			<br /><br />

			<label for="email">이메일:</label>
			<input type="email" id="email" name="email" required />
			<br /><br />

			<button type="submit">확인</button>
		</form>

		<script>
			function handleSubmit(form) {
				const name = form.name.value;
				const email = form.email.value;

				alert(`이름: ${name}, 이메일: ${email}`);
				return false;
			}
		</script>
	</body>
</html>
```

위 예시처럼 JavaScript는 작은 단위의 스크립트를 브라우저에서 실행하기 위해 개발되었다. 하지만 예시만 봐도 알 수 있듯 `<script>` 태그를 이용해서 여러 파일을 관리하는 방식은 프로젝트가 커질수록 유지보수성이 떨어졌다. 이와 함께 다음과 같은 문제점들이 존재했다.

1. 전역 변수 충돌
   - 여러 스크립트 파일들이 전역 변수를 공유하다보니, 의도하지 않은 동작이 일어나기 쉬웠다.
2. 의존성 관리 어려움
   - `<script>` 태그로 파일을 순서대로 로드해야했기 때문에, 특정 파일의 의존성이 해결되지 않으면 잘못된 순서로 실행되는 문제가 있었다.
3. 코드 재사용성
   - 동일한 코드를 여러곳에서 사용하려면 복사 - 붙여넣기 방식에 의존할 수 밖에 없었다.

이러한 이유로 모듈화의 필요성이 증가하게 되었다.

## CommonJS의 등장

한편 위와 같이 브라우저 환경에서만 실행되던 JavaScript를 서버 환경에서도 사용하고자 하는 필요성이 있었다. JavaScript의 비동기적 특성(이벤트 기반 처리와 비동기 요청을 통한 데이터 처리)은 서버 측에서도 유용하게 사용될 수 있다는 생각 때문이였다. 서버 측 JavaScript 모듈화를 위해 제안된 규격이 바로 **CommonJS**다.

CommonJS는 각 **하나의 파일을 하나의 모듈**로 취급한다. 이 규격에 따르면

- 각 파일은 독립적인 코드 실행 환경을 가진다.
- 모듈을 `module.exports` 또는 `exports`로 내보내고, 다른 파일에서는 `require()`를 사용해 로드할 수 있다.
- `require()`는 동기적으로 작동하여 모듈을 모두 로드한 뒤 코드를 실행한다.
- 이후 동일한 모듈을 호출하면, 이미 로드된 모듈이 반환된다.(캐싱)

이 방식은 서버 환경에 적합한 설계였고, `Node.js`의 기본 모듈 시스템으로 채택되었다.

## Node.js의 등장

서버 사이드에서 JavaScript를 실행하기 위한 각고의 노력 끝에 `Node.js`가 등장했다. `Node.js`는 JavaScript 런타임 환경으로, JavaScript가 브라우저 외부에서도 실행될 수 있도록 설계되었다. `Node.js`는 프레임워크를 포함하지 않고 기본적인 런타임과 내장 모듈만을 제공하며, 다음과 같은 특징이 있다

1. 비동기 처리
   - 기존 서버 환경에서는 블로킹 I/O 방식이 일반적이였지만, `Node.js` 는 비동기 I/O을 채택하여 서버가 높은 성능과 확장성을 가질 수 있도록 설계했다.
2. Chrome V8 javascript 엔진 기반 동작
   - js코드를 기계어로 직접 변환(JIT, Just-In-Time Compilation) 하여 실행 성능을 극대화했다.
3. 모듈 시스템
   - 서버에서 다양한 기능을 모듈화 하여 재사용할 수 있는 환경을 제공하기 위해 **CommonJS** 모듈 시스템을 채택한다.

`Node.js`의 등장은 JavaScript로 모듈 관리와 서버 개발을 용이하게 했으며, 이로 인해 모듈을 공유하려는 필요성이 증가했다.(잘 설계된 코드를 공유함으로써 생태계 확장, 개발생산성 증가를 이룰수 있기 때문)

## npm의 등장

npm(Node Package Manager)은 Node.js 기반으로 설계된 패키지 관리 도구다.  
npm의 도입으로

- JavaScript 프로젝트의 의존성 관리가 용이
- 오픈 소스 라이브러리가 빠르게 확산되며 JavaScript 커뮤니티가 성장

과 같은 효과가 있었다.
npm은 단순히 서버용 패키지 관리에서 출발했으나, 현재는 클라이언트와 서버 모두를 아우르며 JavaScript 생태계 전반에서 사용되고 있다.

## CommonJS의 한계

위와 같은 히스토리를 바탕으로 CommonJS 모듈 시스템은 그 때 당시에는 최적의 선택이였던것 같다. 하지만 현재는 ESM(ECMAScript Module) 로 대부분 전환하고 있는데, CommonJS는 다음과 같은 한계점을 명확하게 가지고 있기 때문이다.

### 1. 동기적 모듈 로딩

CommonJS는 `require()`를 통해 동기적으로 모듈을 로드한다. 이 방식은 서버 환경에서는 적합하지만 브라우저 환경에서는 비효율적이다. 브라우저는 네트워크 요청이 포함된 모듈 로딩에서 **비동기**가 기본이기 때문이다.

```js
// moduleA.js
console.log("A 로딩 중...");
module.exports = { value: 42 };

// main.js
console.log("Main 시작");
const moduleA = require("./moduleA");
console.log("moduleA 값:", moduleA.value);
console.log("Main 종료");
```

위 코드는 `require()` 호출 시 `moduleA.js`를 완전히 실행한 후 `main.js`가 실행된다. 서버 환경에서는 파일이 로컬에 있어 빠르지만, 브라우저에서는 네트워크 요청으로 인해 로딩 속도가 느려질 수 있다.

### 2. **정적 분석 불가능**

CommonJS는 동적으로 `require()`를 호출하기 때문에, 빌드 도구가 코드에서 의존성을 미리 파악하기 어렵다. 이로 인해 **Tree Shaking**과 같은 최적화가 어렵다.

```js
// dynamicRequire.js
const moduleName = process.argv[2]; // 런타임에 모듈 이름 결정
const module = require(moduleName); // 동적 로딩
console.log(module);
```

위와 같이 모듈 이름이 동적으로 결정되면 빌드 도구는 어떤 모듈이 사용될지 예측할 수 없어 최적화를 할 수 없다.

### 3. 브라우저 호환성 부족

CommonJS는 기본적으로 브라우저 환경에서 지원되지 않는다. 브라우저에서 CommonJS 모듈을 사용하려면 Webpack 등의 번들러를 통해 변환해야 한다. 반면 ESM은 브라우저에서 네이티브로 지원된다.

```js
// 브라우저 환경에서 ESM
// module.js
export const greet = () => console.log("Hello from ESM!");

// main.js
import { greet } from "./module.js";
greet();
```

위 코드는 브라우저에서 바로 실행될 수 있지만, CommonJS는 변환 없이 실행이 불가능하다.

### 4. 이중 생태계의 복잡성

CommonJS와 ESM은 상호 호환성이 완벽하지 않아 두 모듈 시스템을 혼용할 경우 문제가 발생할 수 있다. 예를 들어 CommonJS는 ESM 모듈을 `import`하는 데 제약이 있고, 반대로 ESM은 CommonJS를 동기적으로 가져오는 데 어려움이 있다.

```js
// ESM에서 CommonJS 사용
// module.cjs (CommonJS)
module.exports = { value: 42 };

// main.mjs (ESM)
import cjsModule from "./module.cjs"; // 이 경우 Node.js에서 플래그를 설정해야 함
console.log(cjsModule.value);
```

Node.js에서는 ESM과 CommonJS를 함께 사용하는 프로젝트에서 `package.json`의 `type` 설정과 추가 플래그를 요구해 개발 복잡도가 증가한다.(package.json 에서 `"type": "modules"` 설정을 추가하거나, `.mjs`, `.cjs`등의 파일 확장자를 사용해본 경험이 있을거다)

위와 같은 이유로 CommonJS 현재 old-style 모듈 시스템으로 취급되고 있으며 다양한 프로젝트들이 ESM 모듈 시스템으로 전환하고자 노력하고 있다. 다음과 같이 쉽게 마이그레이션 할 수 있도록 가이드를 제공하기도 한다.

- https://github.com/tsmx/node-commonjs-to-esm
- https://www.youtube.com/watch?embeds_referring_euri=https%3A%2F%2Fdev.to%2F&source_ve_path=Mjg2NjQsMTY0NTAz&v=bgGQgSQSpI8&feature=youtu.be

---

개인적으로 기술의 히스토리를 아는 일을 좋아한다. 과거의 어떤 결정을 통해 어떤 결과로 인해 지금에 이르렀는지를 알게 되면 나의 현재의 선택에도 도움이 된다고 생각하기 때문이다. 또한 과거에는 최선의 선택 이였다고 생각했지만 현재에 이르러서 아쉬운 선택일 수도 있다. 하지만 과거의 생각을 계속 고집하지 않고 받아들이면서 새롭게 다시 하려는 시도가 중요하다고 생각한다. `Node.js` 가 CommonJS 모듈 시스템을 선택했던 것 처럼 나 또한 그런 선택을 할 수 있고, ESM 스타일로 마이그레이션 하는것 처럼 나도 그런 선택을 현재에 계속 하면 되는게 아닐까 싶다.

## Ref

- https://redfin.engineering/node-modules-at-war-why-commonjs-and-es-modules-cant-get-along-9617135eeca1
- https://nodejs.org/api/modules.html
- https://nodejs.org/api/packages.html#determining-module-system
