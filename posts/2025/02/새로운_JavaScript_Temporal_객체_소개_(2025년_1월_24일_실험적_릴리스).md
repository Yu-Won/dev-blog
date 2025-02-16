---
title: "새로운 JavaScript Temporal 객체 소개 (2025년 1월 24일 실험적 릴리스)"
tags:
  - JavaScript Temporal 
published: true
date: 2025-02-16 23:09:33
description: "JavaScript Temporal 객체 알아보기"
---

# 새로운 JavaScript Temporal 객체 소개 (2025년 1월 24일 실험적 릴리스)

---

## Table of Contents

- [기존 Date 객체의 한계](#기존-date-객체의-한계)
    - [1. 일관성 없는 API와 사용성 문제](#1-일관성-없는-api와-사용성-문제)
    - [2. 불변성(Immutable) 지원 부족](#2-불변성immutable-지원-부족)
    - [3. 시간대(Timezone) 및 UTC 처리의 불편함](#3-시간대timezone-및-utc-처리의-불편함)
    - [4. 포맷팅이 불편함](#4-포맷팅이-불편함)
    - [5. 날짜 계산이 불편함](#5-날짜-계산이-불편함)
- [Temporal 이란?](#temporal-이란)
    - [Temporal의 핵심 개념](#temporal의-핵심-개념)
- [주요 특징](#주요-특징)
    - [1. 불변성 (Immutable)](#1-불변성-immutable)
    - [2. 시간대(Timezone) 지원](#2-시간대timezone-지원)
    - [3. 나노초 단위 지원](#3-나노초-단위-지원)
    - [4. ISO 8601 포맷 기본 지원](#4-iso-8601-포맷-기본-지원)
    - [5. 날짜 간격 계산 간편화](#5-날짜-간격-계산-간편화)
    - [6. 기간 정렬 가능](#6-기간-정렬-가능)
- [참고 자료](#참고-자료)






지난 2025년 1월 24일, JavaScript의 `Temporal` 객체가 브라우저의 실험적 기능으로 제공되기 시작했다. 기존의 `Date` 객체와 어떤 차이점이 있으며, 어떤 기능을 제공하는지 정리해 보았다.

## 기존 Date 객체의 한계

`Date` 객체는 JavaScript가 1995년에 만들어질 때 Java의 초기 결함이 있는 `java.util.Date` API를 그대로 가져와 사용했다. Java 팀은 1997년에 이 문제를 해결했지만, JavaScript는 여전히 이를 유지하고 있다. 이 때문에 여러 가지 문제가 존재한다.

### 1. 일관성 없는 API와 사용성 문제

`Date` 객체는 생성, 조작, 포맷팅이 직관적이지 않다.

```js
const date = new Date(2025, 1, 14); // 2025년 2월 14일
```

- 월(Month)이 0부터 시작하여 직관적이지 않다.
- 날짜를 조작할 때 `setDate`, `setMonth` 같은 메서드를 직접 호출해야 한다.

### 2. 불변성(Immutable) 지원 부족

`Date` 객체는 mutable(변경 가능)하여, 조작 시 부작용이 발생할 수 있다.

```js
const date = new Date(2025, 1, 16);
date.setDate(date.getDate() + 1); // 원본 date 객체가 변경됨
```

이로 인해 여러 곳에서 같은 객체를 참조하면 예상치 못한 오류가 발생할 수 있다.

### 3. 시간대(Timezone) 및 UTC 처리의 불편함

`Date` 객체는 기본적으로 브라우저의 로컬 타임존을 사용하기 때문에, UTC 변환이 번거롭다.

```js
const date = new Date('2025-02-16T00:00:00Z');
console.log(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
```

이처럼 `toLocaleString`을 활용해야 하지만, 브라우저별로 결과가 다를 수 있다. 또한, "시간대 없음"이라는 개념이 부족하여 달력이나 시계를 읽는 시간 개념을 다루기 어렵다.

### 4. 포맷팅이 불편함

기본 `Date` 객체에서 날짜를 원하는 형식으로 출력하려면 불편하게 조합해야 한다.

```js
const date = new Date();
console.log(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
```

### 5. 날짜 계산이 불편함

특정 날짜에 N일을 더하는 작업이 직관적이지 않다.

```js
const date = new Date();
date.setDate(date.getDate() + 7);
console.log(date);
```

이렇게 원본 객체를 수정해야 하는 문제가 있다.

이러한 문제들 때문에 대부분의 프로젝트에서 `moment.js`, `day.js`, `date-fns` 같은 라이브러리를 사용하여 날짜 및 시간을 처리해왔다.

## Temporal 이란?

`Temporal`은 기존 `Date` 객체의 한계를 극복하고 **보다 직관적이고 강력한 날짜/시간 API**를 제공하는 새로운 JavaScript 내장 객체다. 현재 실험적 릴리스로 제공되고 있으며, 추후 표준이 될 가능성이 높다.

### Temporal의 핵심 개념

Temporal은 순간(Instants), 지역 시간(Wall-clock time), 그리고 기간(Durations) 개념을 명확하게 정의한다.

- **지속시간(Duration)**: 두 시점 사이의 차이 (`Temporal.Duration`)
- **시점**:
    - **유니크한 시점**
        - 타임스탬프 (`Temporal.Instant`)
        - 시간대를 포함한 날짜-시간 (`Temporal.ZonedDateTime`)
    - **시간대를 인식하지 않는 날짜/시간 (`Plain`)**
        - 전체 날짜 및 시간: `Temporal.PlainDateTime`
        - 날짜만: `Temporal.PlainDate`
        - 연도와 월: `Temporal.PlainYearMonth`
        - 월과 일: `Temporal.PlainMonthDay`
        - 시간만: `Temporal.PlainTime`
- **현재 시간**: `Temporal.Now`

## 주요 특징

### 1. 불변성 (Immutable)

`Temporal`은 **immutable**하게 동작하며, 값을 변경하면 새로운 객체를 반환한다.

```js
const today = Temporal.PlainDate.from('2025-02-16');
const tomorrow = today.add({ days: 1 });

console.log(today.toString());   // 2025-02-16 (변경되지 않음)
console.log(tomorrow.toString()); // 2025-02-17 (새 객체 반환)
```

### 2. 시간대(Timezone) 지원

ISO 시간대를 명확하게 지정할 수 있다.

```js
const seoulTime = Temporal.Now.zonedDateTimeISO('Asia/Seoul');
console.log(seoulTime.toString()); // 2025-02-16T10:00:00+09:00[Asia/Seoul]
```

### 3. 나노초 단위 지원

기존 `Date` 객체는 밀리초(ms)까지만 지원했지만, `Temporal`은 나노초(ns)까지 정밀하게 다룰 수 있다.

```js
const now = Temporal.Now.instant();
console.log(now.epochNanoseconds); // 1708049295000000000 (나노초 단위)
```

### 4. ISO 8601 포맷 기본 지원

```js
const date = Temporal.PlainDateTime.from('2025-02-16T15:30:00');
console.log(date.toString()); // 2025-02-16T15:30:00
```

### 5. 날짜 간격 계산 간편화

`Temporal`에서는 `since()` 메서드를 사용해 날짜 차이를 쉽게 계산할 수 있다.

```js
const start = Temporal.PlainDate.from('2025-02-16');
const end = Temporal.PlainDate.from('2025-03-01');
const diff = end.since(start);
console.log(diff.days); // 13
```

### 6. 기간 정렬 가능

`Temporal.Duration.compare`를 활용해 기간을 정렬할 수 있다.

```js
const durations = [
  Temporal.Duration.from({ hours: 1 }),
  Temporal.Duration.from({ hours: 2 }),
  Temporal.Duration.from({ hours: 1, minutes: 30 }),
  Temporal.Duration.from({ hours: 1, minutes: 45 }),
];

durations.sort(Temporal.Duration.compare);
console.log(durations.map((d) => d.toString()));
// [ 'PT1H', 'PT1H30M', 'PT1H45M', 'PT2H' ]
```

## 참고 자료

- [TC39 Temporal Proposal](https://tc39.es/proposal-temporal/docs/)
- [MDN: JavaScript Temporal 소개](https://developer.mozilla.org/en-US/blog/javascript-temporal-is-coming/)
- [Bytes.dev - Temporal 개요](https://bytes.dev/archives/365)
- [MDN: Temporal API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal)