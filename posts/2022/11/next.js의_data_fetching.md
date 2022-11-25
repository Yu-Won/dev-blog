---
title: "next.js의 data fetching"
tags:
  - next.js
published: true
date: 2022-11-25 22:38:47
description: "props 형제들"
---

# next.js의 data fetching

---

## next.js의 data fetching

next.js는 어플리케이션의 사용 사례에 따라서 다양한 방식으로 컨텐츠를 렌더링할 수 있다. 여기에는 다음과 같은 방법이 포함된다.

## getServerSideProps

`getServerSideProps`를 호출하면 next.js는 페이지를 요청할 때 마다 데이터를 사용해서 pre-render로 페이지를 생성한다. `getServerSideProps`는 다음과 같은 특징을 가지고 있다.

- SSR로 렌더링하며 브라우저상에서 렌더링하지 않는다.
- 페이지에 직접 요청하면 `getServerSideProps`는 요청한 즉시 실행되며, 데이터를 사용해서 pre-render로 페이지를 생성한다.
- `next.link`나 `next/router`를 통해 CSR을 해서 렌더링 할 경우, next.js는 서버에 API 요청을 보낸다.
- page에서만 실행될 수 있으며, 다른 곳에서는 호출할 수 없다.
- `getServerSideProps`는 독립적으로 export 되어야한다. 페이지 컴포넌트에 property 형태로 사용될 경우 동작하지 않는다.

next.js는 다음과 같은 상황에 `getServerSideProps`를 사용하기를 권장하고 있다.

- 페이지가 **반드시 요청한 즉시 데이터를 받아와서 렌더링 해야하는 경우**

### getServerSideProps API

```jsx
export function Page(props) {
  return <div>page</div>;
}

export async function getServerSideProps(context) {
  return {
    props: {}, // page comonent에 props 로 전달된다.
  };
}
```

### context parameter

- params: 해당 페이지가 동적인 경로를 가질 경우, `params`라는 route parameter를 가진다.<br />만약 페이지가 `[id].js`의 파일명일경우, `params`는 `{ id: ... }`같이 나타난다.
- req: key, value를 가지는 추가적인 쿠키 키의 props가 있는 HTTP IncommingMessage object이다.
- res: HTTP response object.
- query: 동적 경로 매개변수를 포함사는 query string.
- preview: 페이지가 preview mode일 때 true, 아닐경우 false.
- previewData: `setPreviewData`로 설정한 미리보기 데이터.
- resolvedUrl: client transition을 위한 정규화된 버전의 요청 url.
- locale: (활성화 된 경우) 현재의 locale.
- locales: (활성화 된 경우) 지원하는 모든 locale.
- defaultLocale: (활성화 된 경우) default locale.

### return value

- props: page component에 props로 전달되는 key-value를 가지는 객체.
- notFound: boolean type, 404 상태 및 404 page를 반환할 수 있다.<br />true일 경우, 성공적으로 생성한 페이지가 있더라고 404 페이지로 리턴.
- redirect: 내부 및 외부 리소스로 redirect를 허용하는 객체.<br />`{ destination: string, permanent: boolean }`과 같은 값을 가져야함.

## getStaticPaths

`getStaticProps`를 사용하는 페이지에서 동적인 경로를 가질경우, 빌드타임에 정적으로 생성할 경로를 미리 정의해야한다. 그렇기 때문에 `getStaticPaths`를 사용해서 모든 경로를 미리 정의하고 pre-render 한다. 또한 다음과 같은 특징을 가지고 있다.

- `getStaticPaths`는 production에서 빌드하는 동안에만 실행되며, 런타임중에는 호출되지 않는다.
- `getStaticProps`와 함께 사용해야 한다.
- `getServerSideProps`와는 사용할 수 없다.
- page에서만 실행될 수 있으며, 다른 곳에서는 호출할 수 없다.

next.js는 다음과 같은 상황에 `getStatidPaths`를 사용하기를 권장하고 있다.

- 동적인 경로를 가지는 경우
- pre-render로 정적인 페이지를 만들 경우

### getStaticPaths API

```jsx
export function Post(props) {
  return <div>post</div>;
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }], // getStaticProps에 context로 전달된다.
    fallback: false,
  };
}

export async function getStaticProps(context) {
  return {
    props: { post: {} }, // page component에 props로 전달된다.
  };
}
```

### return value

- paths: 미리 렌더링할 경로를 결정한다.
- fallback
  - false: paths가 반환하지 않는 모든 경로는 404 page로 리턴.
  - true: paths에 포함되지 않는 페지는 404를 리턴하는 대신, `useRouter`의 `isFallback`을 true로 리턴하여 별도의 fallback page로 리턴한다.<br />그 후 `getStaticProps`에서 데이터를 fetching하고 props를 리턴하면 정상적으로 페이지를 정적으로 생성한다.<br />즉, `getStaticPaths`에서 pre-render하지 않고, `getStaticProps`에서 하겠다는 의미.
  - "blocking": `getStaticPaths`에 포함되지 않는 경로는 SSR처럼 페이지가 생성되길 기다렸다가 해당 페이지 경로를 캐싱한 후 다음 요청시에 캐싱된 데이터를 리턴.<br />즉, 처음에는 pre-render하지 않고 SSR하고, 다음 요청시 SSG.

## getStaticProps

`getStaticProps`를 호출하면 next.js는 빌드시 pre-render로 페이지를 생성한다. `getStaticProps`는 다음과 같은 특징을 가지고 있다.

- `getStaticProps`에서 import된 모듈은 CSR 번들러에 포함되지 않는다.
- 페이지를 렌더링하는데 필요한 데이터들은 빌드시 사용한다.
- `getStaticProps`는 HTML과 JSON 파일 두개를 생성한다.
- 데이터는 공개적으로 캐싱될 수 있다.(사용자별 캐싱 아님)
- pages 폴더 내에서만 사용 가능.
- preview mode를 사용해서 SSG를 일시적으로 우회하고 빌드할 때가 아닌 요청한 시간에 페이지를 렌더링 할 수 있다.

### getStaticProps API

```jsx
export function Post(props) {
  return <div>post</div>;
}

export async function getStaticProps(context) {
  return {
    props: { post: {} }, // page component에 props로 전달된다.
  };
}
```

### context parameter

- params: 해당 페이지가 동적인 경로를 가질 경우, `params`라는 route parameter를 가진다.<br />만약 페이지가 `[id].js`의 파일명일경우, `params`는 `{ id: ... }`같이 나타난다.
- preview: 페이지가 preview mode일 때 true, 아닐경우 false.
- previewData: `setPreviewData`로 설정한 미리보기 데이터.
- resolvedUrl: client transition을 위한 정규화된 버전의 요청 url.
- locale: (활성화 된 경우) 현재의 locale.
- locales: (활성화 된 경우) 지원하는 모든 locale.
- defaultLocale: (활성화 된 경우) default locale.

### return value

- props: page component에 props로 전달되는 key-value를 가지는 객체.
- revalidate: 페이지의 재생성이 일어날 수 있도록 하는 시간.(default: false)
- notFound: boolean type, 404 상태 및 404 page를 반환할 수 있다.<br />true일 경우, 성공적으로 생성한 페이지가 있더라고 404 페이지로 리턴.
- redirect: 내부 및 외부 리소스로 redirect를 허용하는 객체.<br />`{ destination: string, permanent: boolean }`과 같은 값을 가져야함.

## Incremental Static Regeneration

`getStaticProps`의 revalidate props를 활성화 하면 사용할 수 있는 기능. 사이트를 구축한 후 페이지별로 정적인 페이지를 생성하거나 업데이트 할 수 있다.<br />빌드 시 미리 렌더링된 페이지에 대한 요청이 있으면 처음에는 캐시된 데이터가 표시되고, revalidate에 정해준 시간이 지나면 next.js는 백그라운드에서 페이지를 다시 재생성한다. 백그라운드에서 페이지를 성공적으로 다시 만들면 이전의 캐시된 데이터를 무효화하고 업데이트된 페이지를 표시한다. 백그라운드에서 재생성을 실패했을 경우에는 이전의 캐시된 데이터를 그대로 유지한다.
