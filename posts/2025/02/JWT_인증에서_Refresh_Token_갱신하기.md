---
title: "JWT 인증에서 Refresh Token 갱신하기"
tags:
  - refresh-token
published: true
date: 2025-02-02 21:57:28
description: "언제 Refresh Token 을 갱신하는게 좋을까?"
---

# JWT 인증에서 Refresh Token 갱신하기

---

## Table of Contents

- [들어가며](#들어가며)
- [JWT 인증 개요](#jwt-인증-개요)
- [Refresh Token을 활용한 인증 흐름](#refresh-token을-활용한-인증-흐름)
- [React + Axios로 Refresh Token 처리하기](#react--axios로-refresh-token-처리하기)
    - [1. Axios 인스턴스 설정](#1-access-token-만료-시-자동-갱신)
    - [2. Axios 인터셉터를 이용한 자동 토큰 갱신](#2-axios-인터셉터를-이용한-자동-토큰-갱신)
    - [3. React Query와 함께 사용하기](#3-react-query와-함께-사용하기)
- [에러 핸들링 전략](#에러-핸들링-전략)
    - [1. Access Token 만료 시 자동 갱신](#1-access-token-만료-시-자동-갱신)
    - [2. Refresh Token 만료 시 재 로그인 유도](#2-refresh-token-만료-시-재-로그인-유도)
    - [3. 네트워크 오류 및 예외 상황 대비](#3-네트워크-오류-및-예외-상황-대비)
- [정리](#정리)


## 들어가며

JWT(JSON Web Token)를 활용한 인증 방식은 웹 개발에서 널리 사용된다. 하지만 프론트엔드에서 액세스 토큰(access token)이 만료될 때, 이를 어떻게 갱신(refresh)할지 구현하는 과정은 생각보다 복잡할 수 있다.

이 글에서는 **JWT 인증 구조를 직접 구현하는 것이 아니라**, 프론트엔드에서 Refresh Token을 활용해 인증을 지속하는 방법을 다룬다. React, Axios, TanStack React Query를 활용한 실제 예제와 함께 살펴보자.

## JWT 인증 개요

JWT 인증에서는 두 개의 토큰이 사용된다:

- **Access Token**: API 요청 시 사용되며, 보안 강화를 위해 유효 기간이 짧다 (예: 15분).
- **Refresh Token**: 더 긴 유효 기간(예: 7일 이상)을 가지며, Access Token이 만료되었을 때 새로운 Access Token을 발급받는 데 사용된다.

## Refresh Token을 활용한 인증 흐름

1. 사용자가 로그인하면 서버에서 **Access Token + Refresh Token**을 발급한다.
2. Access Token을 HTTP 요청에 포함하여 API 호출을 수행한다.
3. Access Token이 만료되면, Refresh Token을 사용해 새로운 Access Token을 요청한다.
4. 새로운 Access Token을 발급받아 저장한 후, 요청을 다시 수행한다.
5. Refresh Token도 만료되면, 사용자는 다시 로그인해야 한다.

## React + Axios로 Refresh Token 처리하기

### 1. Axios 인스턴스 설정

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  withCredentials: true, // 쿠키에 저장된 refresh token을 포함
});

export default api;
```

### 2. Axios 인터셉터를 이용한 자동 토큰 갱신

```javascript
import api from './api';

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post('/auth/refresh');
        localStorage.setItem('accessToken', data.accessToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        return api(originalRequest); // 실패한 요청 재시도
      } catch (refreshError) {
        console.error('Refresh Token이 만료되었습니다. 다시 로그인해주세요.');
      }
    }
    return Promise.reject(error);
  }
);
```

### 3. React Query와 함께 사용하기

```javascript
import { useQuery } from '@tanstack/react-query';
import api from './api';

const fetchUserData = async () => {
  const { data } = await api.get('/user');
  return data;
};

const useUser = () => {
  return useQuery({
    queryKey: ['USER'],
    queryFn: fetchUserData,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};

export default useUser;
```

## 에러 핸들링 전략

JWT 기반 인증에서 중요한 부분은 **토큰 만료 시의 대응 전략**이다. Refresh Token을 활용한 인증 처리에서 발생할 수 있는 주요 에러와 그 대응 방안을 정리해보자.

### 1. Access Token 만료 시 자동 갱신

- 서버 응답이 `401 Unauthorized`인 경우, 자동으로 Refresh Token을 사용해 Access Token을 갱신한다.
- 갱신 후 실패했던 API 요청을 재시도한다.
- 갱신 요청도 실패하면 사용자에게 로그인이 필요하다는 메시지를 표시한다.

```javascript
if (error.response?.status === 401) {
  try {
    const { data } = await api.post('/auth/refresh');
    localStorage.setItem('accessToken', data.accessToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
    return api(originalRequest); // 실패한 요청 재시도
  } catch (refreshError) {
    console.error('토큰 갱신 실패, 다시 로그인해야 합니다.');
  }
}
```

### 2. Refresh Token 만료 시 재 로그인 유도

- Refresh Token이 만료되면 사용자는 반드시 다시 로그인해야 한다.
- 사용자 경험을 고려하여 단순히 로그아웃시키는 것이 아니라 **안내 메시지를 표시**하는 것이 좋다.

```javascript
if (refreshError.response?.status === 403) {
  alert('세션이 만료되었습니다. 다시 로그인해주세요.');
  window.location.href = '/login';
}
```

### 3. 네트워크 오류 및 예외 상황 대비

- 인터넷 연결이 끊어진 상태에서 API 요청이 실패할 수 있다.
- 서버가 예상치 못한 오류(`500 Internal Server Error`)를 반환하는 경우도 고려해야 한다.

```javascript
if (!error.response) {
  alert('네트워크 연결을 확인해주세요.');
} else if (error.response.status >= 500) {
  alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
}
```

## 정리

JWT 인증 방식에서는 Access Token이 만료될 때 Refresh Token을 활용해 인증을 지속해야 한다. Axios 인터셉터를 활용하면 자동으로 토큰을 갱신할 수 있고, React Query와 함께 사용하면 네트워크 요청을 효율적으로 관리할 수 있다.

특히 **토큰 만료 시의 에러 핸들링 전략**이 중요하다. Refresh Token까지 만료된 경우, 사용자를 재로그인하도록 유도하는 UX적인 고려도 필요하다.

프론트엔드에서 인증을 구현해야 한다면, 이런 방식을 참고해 적용해보자.