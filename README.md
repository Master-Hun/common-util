# @masterh8887/duksan-common-util

:chart_with_upwards_trend: common-module

![License](https://img.shields.io/badge/license-UNLICENSED-orange.svg?style=flat)

---

## 사용방법

### 설치

```bash
npm i duksan-common-util
yarn add duksan-common-util
```

### JWT 기본 사용법

```typescript
import { JwtHelper } from "duksan-common-util";

const helper = new JwtHelper();
const jwt = helper.getJwtObject(accessToken);
```

- 억세스 토큰이 만료되었는지 여부

```typescript
jwt.isExpired();
```

- 관리자/고객 번호

```typescript
jwt.getSeq();
```

- 관리자/고객 이름

```typescript
jwt.getName();
```

- 관리자/고객 접속 이메일

```typescript
jwt.getLoginEmail();
```

- 사용자 권한

```typescript
jwt.getRole();

RoleType.SYSTEM; // 시스템 권한
RoleType.MASTER; // 최고관리자 권한
RoleType.MANAGER; // 매니저 권한
RoleType.USER; // 회원권한
```

- 사용자 유형

```typescript
jwt.getUserType();

AuthTokenUserType.ADMIN; // 사용자 유형 (관리자)
AuthTokenUserType.USER; // 사용자 유형 (회원)
```

- 접속 IP 주소

```typescript
jwt.getIp();
```
