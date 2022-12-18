---
title: "next.js 13"
tags:
  - next.js
published: true
date: 2022-12-01 22:38:47
description: "next.js 13은 뭐가 달라졌을까?"
---

# next.js 13

---

## next.js v13에는 어떤것들이 바뀌었을까?

지난 10월 26일 next.js는 Next.js Conf를 개최했었다. 그 때 next.js 13에 대해 발표를 했었다. 어떤 것들이 중점적으로 변경되었는지 살펴보자.

## app Directory (beta)

기존에 next.js 는 pages라는 폴더 내부에 폴더와 파일을 생성하면 next.js 내부에서 알아서 라우팅이 될 수 있도록 설계되어 있었다. pages라는 폴더를 생성함으로써 편리하게 라우팅 설계를 할 수 있다는 장점이 있었지만 완벽하게 해당 페이지 전체를 정적인 파일로 만들지는 못했다.<br />
다음의 이미지를 참고하면 쉽게 이해할 수 있다.<br />

다음과 같이 보이는 페이지가 있다고 가정하자.<br />
`next.js` 는 해당 페이지의 모든 컴포넌트들을 pages 폴더 내에서 관리하고 있지만 실제로 Layout 컴포넌트들은 컴포넌트로 관리하기 때문에 Layout 컴포넌트는 정적

### Layouts

### React ServerComponents

### Streaming

## Turbopack (alpha)

## New `next/image`

## New `@next/font` (beta)

## Improved `next/link`

## next.js v13 테스트 해보기

### enviorment

```json

```

### setting

1. 폴더 생성 및 초기화

```shell
# 폴더 생성
mkdir next.js13_test

# 폴더로 이동
cd next.js13_test

# package.json 생성, pnpm으로 초기세팅을 해봤다.
pnpm init
```

2. [next.js 블로그](https://nextjs.org/blog/next-13)를 참고해서 최신버전 설치

```shell
pnpm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

3. script 삽입

next.js는 해당 script를 추가해야 실행할 수 있다.

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
```

4. `next.config.js` 추가하기
   app 폴더 기능은 아직 beta 단계이기 때문에 default로 설정되어있지 않다. 때문에 next.config.js 에서 다음과 같이 app 폴더 기능을 사용하겠다고 설정해야한다.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
```

5. `typescript` 설정 추가하기

타입스크립트도 같이 테스트 해보고 싶어서 typescript 설정도 추가하기로 했다. next.js는 `ts`, `tsx` 확장자로 끝나는 파일을 만들고 `next dev` script를 실행하면 알아서 typescript를 install 해주고 tsconfig.json을 만들어준다. 지난번 버전에 업데이트 된 기능이였던 것 같다.(버전이.. 기억이 잘 안남)

```shell
# app 폴더 만들기
mkdir app

# next.js 문서대로 page 파일 만들기
touch page.tsx
```

```tsx
// app/page.tsx
// page.tsx를 간단하게 리턴해준다.
const Page = () => {
  return <>Hello, Next.js!</>;
};

export default Page;
```

다음과 같은 순서대로 진행하면 app 폴더 내에 head.tsx, layout.tsx 파일이 추가되고 http://localhost:3000 에 서버가 켜진다.

http://localhost:3000에 접속하면 다음과 같이 보인다.
![pnpm run dev](next.js_run_dev.png)
