---
title: "eslint yarn-berry jetbrains 오류"
tags:
  - eslint
  - yarn-berry
  - jetbrains
published: true
date: 2022-09-01 00:10:44
description: "오류를 해결해보자"
---

# eslint yarn-berry jetbrains 오류

---

## eslint + yarn-berry PnP + jetbrains 설정

Webstorm + yarn-berry PnP(Plug'n'Play)로 프로젝트를 시작하려 할 때 다음과 같은 오류를 마주할 수 있다.

``ESlint: Initializtion error (ESLint). Missing "./lib/options" export in "eslint" package``

yarn-berry의 PnP 방식은 node_modules 없이 사용하는 방식이고 jetbrains은 PnP를 지원한다고 했지만 안된다.
아마도 yarn-berry 경로를 jetbrains에서 찾지 못하는 것 같다. 주기적으로 해당 문제가 제기되고 있다. [이슈링크](https://youtrack.jetbrains.com/issue/WEB-52594)

plugin 형태로 경로를 저장하고 있기 때문에 해당 경로를 unplugged해서 경로를 직접 입력해주면 된다.

```shell
# plugin 되어있던 eslint를 unplug
yarn unplug eslint 

# eslint의 경로를 보여줍니다.
yarn bin eslint
```
그러면 다음과 같이 `package.json`에 dependenciesMeta가 생기면서 다음과 같은 경로를 알려준다.
```shell
# package.json
"dependenciesMeta": {
    "eslint@8.22.0": {
      "unplugged": true
    }
  },
```
경로: 
`[path to your project]/.yarn/unplugged/eslint-npm-8.6.0-f5ecfc9f69/node_modules/eslint/bin/eslint.js
`

다음의 경로 중 `/bin/eslint.js` 부분을 제외하고

Preferences >  Languages & Frameworks > Javascript > Code Quality Tools > ESLint로 들어가서,
Manual ESLint configuration을 선택한 뒤 ESLint package 부분에 다음 경로를 지정해주면 된다.

## ref

- [jetbrains issue link](https://youtrack.jetbrains.com/issue/WEB-52594)
- [Setting up ESLint on Webstorm when using Yarn Berry with Plug'n'Play](https://madole.xyz/blog/setting-up-eslint-on-webstorm-when-using-yarn-berry-with-pnp)
