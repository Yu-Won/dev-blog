---
title: "React Native의 렌더링 방식 이해하기"
tags:
  - react-native
published: true
date: 2025-03-02 19:64:23
description: "앱에는 html, css가 없는데 어떻게 렌더링하는거지?"
---

# React Native의 렌더링 방식 이해하기

---

## Table of Contents

- [기존 React의 렌더링 방식과의 차이점](#기존-react의-렌더링-방식과의-차이점)
    - [1. React (웹)에서의 렌더링](#1-react-웹에서의-렌더링)
    - [2. React Native에서의 렌더링](#2-react-native에서의-렌더링)
- [React Native의 렌더링 과정](#react-native의-렌더링-과정)
    - [1. JavaScript에서 UI 선언](#1-javascript에서-ui-선언)
    - [2. Shadow Tree 생성 (Bridge를 통한 통신)](#2-shadow-tree-생성-bridge를-통한-통신)
    - [3. 네이티브 UI 업데이트](#3-네이티브-ui-업데이트)
- [Fabric: 새로운 렌더링 아키텍처](#fabric-새로운-렌더링-아키텍처)
    - [Fabric의 주요 특징](#fabric의-주요-특징)
    - [Fabric이 적용된 React Native의 렌더링 과정](#fabric이-적용된-react-native의-렌더링-과정)
- [React Native에서의 성능 최적화](#react-native에서의-성능-최적화)
    - [1. 불필요한 리렌더링 방지 (`React.memo`, `useMemo`)](#1-불필요한-리렌더링-방지-reactmemo-usememo)
    - [2. `useCallback`으로 함수 재생성 방지](#2-usecallback으로-함수-재생성-방지)
    - [3. FlatList와 VirtualizedList 사용](#3-flatlist와-virtualizedlist-사용)
- [결론](#결론)
- [참고 자료](#참고-자료)


## 기존 React의 렌더링 방식과의 차이점

React는 컴포넌트 기반의 선언형 UI 라이브러리로, 브라우저에서 DOM을 조작하는 방식으로 화면을 렌더링한다. 하지만 React Native는 웹이 아니라 모바일 애플리케이션을 위한 프레임워크다. 따라서 화면을 구성하는 방식이 다르다.

### 1. React (웹)에서의 렌더링

웹 환경에서는 React가 가상 DOM(Virtual DOM)을 이용하여 변경된 부분만 실제 DOM에 반영하는 방식으로 성능을 최적화한다.

React는 `setCount`가 호출될 때 가상 DOM에서 변경된 부분을 감지하고, 브라우저의 실제 DOM을 업데이트한다.

### 2. React Native에서의 렌더링

React Native는 웹이 아니라 네이티브 UI를 조작해야 한다. 따라서 브라우저의 DOM을 직접 조작하는 것이 아니라, **네이티브 컴포넌트와 브릿지를 통해 UI를 업데이트하는 방식**을 사용한다.

React Native에서는 `div`, `p`, `button`과 같은 웹 요소를 사용하지 않고, `View`, `Text`, `Button`과 같은 네이티브 컴포넌트를 사용한다.

## React Native의 렌더링 과정

React Native는 다음과 같은 과정으로 렌더링을 수행한다:

### 1. JavaScript에서 UI 선언

컴포넌트를 정의하고, 상태(state)가 변경될 때마다 React의 **Reconciliation 과정**을 거쳐 UI를 갱신한다.

### 2. Shadow Tree 생성 (Bridge를 통한 통신)

React Native는 가상 DOM 대신 **Shadow Tree**를 사용하여 변경 사항을 추적한다. 이 정보는 브릿지를 통해 네이티브 코드로 전달된다.

### 3. 네이티브 UI 업데이트

네이티브 측에서는 전달받은 정보를 기반으로 실제 UI 요소(View, Text 등)를 업데이트한다.

## Fabric: 새로운 렌더링 아키텍처

기존 React Native는 브릿지를 통해 JavaScript와 네이티브 간 통신을 했지만, 이 방식은 성능 저하를 유발하는 주요 원인이었다. 이를 해결하기 위해 **Fabric**이 도입되었다.

### Fabric의 주요 특징

1. **동기 렌더링(Synchronous Rendering)** 지원 → UI 업데이트가 더욱 빠르고 즉각적으로 반영됨
2. **JSI(JavaScript Interface) 활용** → 브릿지를 거치지 않고 네이티브 모듈과 직접 통신 가능
3. **Shadow Tree 최적화** → UI 업데이트 과정이 단순화됨
4. **향상된 멀티스레딩 지원** → UI 스레드에서 불필요한 작업을 줄이고 성능을 개선함

### Fabric이 적용된 React Native의 렌더링 과정

1. React 컴포넌트가 변경됨
2. Shadow Tree가 Fabric을 통해 네이티브와 직접 통신
3. UI 업데이트가 동기적으로 적용됨

Fabric을 사용하면 브릿지를 통한 비효율적인 통신이 제거되면서 **React Native의 성능이 대폭 향상**된다.

## React Native에서의 성능 최적화

React Native의 렌더링 방식은 웹과 다르기 때문에, 최적화 기법도 차이가 있다.

### 1. 불필요한 리렌더링 방지 (`React.memo`, `useMemo`)

이처럼 `React.memo`를 활용하면 동일한 props가 전달될 경우 리렌더링을 방지할 수 있다.

### 2. `useCallback`으로 함수 재생성 방지

이렇게 하면 불필요한 함수 재생성을 막아 렌더링 성능을 높일 수 있다.

### 3. FlatList와 VirtualizedList 사용

대량의 리스트를 렌더링할 때 `FlatList`를 사용하면 메모리 사용을 최적화할 수 있다.

## 결론

React Native는 기존 React와 비슷한 방식으로 UI를 선언하지만, 실제 렌더링 과정은 네이티브 UI와 브릿지를 통해 이루어진다. 그리고 새로운 아키텍처인 **Fabric**이 도입되면서 렌더링 성능이 더욱 향상되었다. 따라서 React 웹 개발자라 하더라도 **네이티브 UI 업데이트 방식과 최적화 기법을 이해하는 것이 중요**하다.

## 참고 자료

- [New Architecture is here](https://reactnative.dev/blog/2024/10/23/the-new-architecture-is-here)
- [Fabric](https://reactnative.dev/architecture/fabric-renderer)