import * as crypto from "crypto";
import { AuthTokenUserType, JwtPayload, RoleType } from "../src/jwt.object";
import { JwtHelper } from "../src/jwt.helper";

const timeout = 1;
const jwtHelper = new JwtHelper();
const hedaer = getJwtHeader();
describe("JWT Helper/Object Test", () => {
  describe("[관리자/MASTER] jwt test", () => {
    const payload: JwtPayload = {
      iss: "test",
      exp: String(Date.now() + timeout * 60 * 1000),
      s: 1,
      n: "마스터",
      e: "master@test.com",
      r: RoleType.MANAGER,
      ip: "123.222.222.211",
    };

    const token = createToken(hedaer, payload);
    const jwt = jwtHelper.getJwtObject(token);

    it("만료기간 검증", () => {
      expect(jwt.isExpired()).toBeFalsy();
    });
    it("만료시간 반환 검증", () => {
      expect(jwt.getExpired()).toBeDefined();
    });

    it("고유번호 검증", () => {
      expect(jwt.getSeq()).toBe(payload.s);
    });

    it("이름 검증", () => {
      expect(jwt.getName()).toBe(payload.n);
    });

    it("이메일 검증", () => {
      expect(jwt.getLoginEmail()).toBe(payload.e);
    });

    it("권한 검증", () => {
      expect(jwt.getRole()).toBe(payload.r);
    });

    it("사용자 유형 검증", () => {
      expect(jwt.getUserType()).toBe(AuthTokenUserType.ADMIN);
    });

    it("IP 검증", () => {
      expect(jwt.getIp()).toBe(payload.ip);
    });
  });

  describe("[관리자/MANAGER] JWT Test", () => {
    const payload: JwtPayload = {
      iss: "test",
      exp: String(Date.now() + timeout * 60 * 1000),
      s: 2,
      n: "매니저",
      e: "manager@test.com",
      r: RoleType.MANAGER,
      ip: "123.123.123.211",
    };

    const token = createToken(hedaer, payload);
    const jwt = jwtHelper.getJwtObject(token);

    it("header 검증", () => {
      expect(jwt.getJwtHeader()).toBeDefined();
    });

    it("payload 검증", () => {
      expect(jwt.getPayload()).toBeDefined();
    });

    it("만료기간 검증", () => {
      expect(jwt.isExpired()).toBeFalsy();
    });

    it("고유번호 검증", () => {
      expect(jwt.getSeq()).toBe(payload.s);
    });

    it("이름 검증", () => {
      expect(jwt.getName()).toBe(payload.n);
    });

    it("이메일 검증", () => {
      expect(jwt.getLoginEmail()).toBe(payload.e);
    });

    it("권한 검증", () => {
      expect(jwt.getRole()).toBe(payload.r);
    });

    it("사용자 유형 검증", () => {
      expect(jwt.getUserType()).toBe(AuthTokenUserType.ADMIN);
    });

    it("IP 검증", () => {
      expect(jwt.getIp()).toBe(payload.ip);
    });
  });

  describe("[회원/USER] jwt test", () => {
    const payload: JwtPayload = {
      iss: "test",
      exp: String(Date.now() + timeout * 60 * 1000),
      s: 1,
      n: "사용자",
      e: "user@test.com",
      r: RoleType.USER,
      ip: "123.123.123.123",
    };

    const token = createToken(hedaer, payload);
    const jwt = jwtHelper.getJwtObject(token);

    it("만료기간 검증", () => {
      expect(jwt.isExpired()).toBeFalsy();
    });

    it("고유번호 검증", () => {
      expect(jwt.getSeq()).toBe(payload.s);
    });

    it("이름 검증", () => {
      expect(jwt.getName()).toBe(payload.n);
    });

    it("이메일 검증", () => {
      expect(jwt.getLoginEmail()).toBe(payload.e);
    });

    it("권한 검증", () => {
      expect(jwt.getRole()).toBe(payload.r);
    });

    it("사용자 유형 검증", () => {
      expect(jwt.getUserType()).toBe(AuthTokenUserType.USER);
    });

    it("IP 검증", () => {
      expect(jwt.getIp()).toBe(payload.ip);
    });
  });
});

function createToken(header: any, payload: any) {
  const h = base64ToBase64Url(base64Encode(JSON.stringify(header)));
  const p = base64ToBase64Url(base64Encode(JSON.stringify(payload)));
  const s = base64ToBase64Url(
    crypto
      .createHmac("sha256", "1234567890123456")
      .update(`${h}.${p}`)
      .digest("base64")
  );
  return `${h}.${p}.${s}`;
}

function base64ToBase64Url(base64: string) {
  return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function base64Encode(input: string) {
  return Buffer.from(input).toString("base64");
}

function getJwtHeader() {
  return {
    alg: "HS256",
    typ: "JWT",
  };
}
