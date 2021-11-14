# @master-hun/common-util

:chart_with_upwards_trend: common-module

![License](https://img.shields.io/badge/license-UNLICENSED-orange.svg?style=flat)

---

## 사용방법

### 설치

```bash
npm i -S @master-hun/common-util
```

### JWT 기본 사용법

```typescript
import { JwtHelper, ManageRole, ServiceRole } from "@master-hun/common-util";

const helper = new JwtHelper();
const jwtObject = helper.getJwtObject(accessToken);
```

* 억세스 토큰이 만료되었는지 여부

```typescript
jwtObject.isExpired();
```

* 회원 번호

```typescript
jwtObject.getUserId();
```

* 접속 IP 주소

```typescript
jwtObject.getIp();
```

* 사용자 유형

```typescript
jwtObject.getUserType();

UserType.SYSTEM;    // 사용자 유형 (시스템) : react에서 미사용
UserType.MASTER    // 사용자 유형 (최고 관리자) : 최고 관리자 권한
UserType.MANAGE     // 사용자 유형 (관리자) : 관리자 권한

```

* 권한 보유 여부 확인 방법

```typescript
// 관리자 권한 사용자정보 읽기권한 보유 여부
jwtObject.hasReadRole(ManageRole.USER_INFO);

// 관리자 권한 사용자정보 쓰기권한 보유 여부
jwtObject.hasWriteRole(ManageRole.USER_INFO);

```