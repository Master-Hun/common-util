import * as crypto from "crypto";

import {
  JwtHelper,
  UserType,
  UserStatus,
  AuthTokenEventType,
  CommunicationType,
  AdminUserStatus,
} from "../src";

describe("JWTHelper Test", () => {
  const helper = new JwtHelper();

  // it("JWT / ReadOnly", () => {
  //   const token = createToken(
  //     getJwtHeader(),
  //     getJwtPayload(
  //       1,
  //       "1",
  //       // String(ManageRole.USER_INFO.read),
  //       UserType.SYSTEM
  //     )
  //   );
  //   const jo = helper.getJwtObject(token);
  //   expect(jo.isExpired()).toBeFalsy();
  //   expect(jo.getExpired() > Date.now()).toBeTruthy();
  //   expect(jo.getUserSeq()).toBe(1);
  //   expect(jo.getIp()).toBe("127.0.0.1");
  //   // expect(jo.hasReadRole(ManageRole.USER_INFO)).toBeTruthy();
  //   // expect(jo.hasWriteRole(ManageRole.USER_INFO)).toBeFalsy();
  //   expect(jo.getUserType()).toBe(UserType.SYSTEM);
  //   expect(jo.getJwtHeader()).not.toBeNull();
  // });

  // it("JWT / ReadWrite", () => {
  //   const token = createToken(
  //     getJwtHeader(),
  //     getJwtPayload(
  //       1,
  //       "1",
  //       // String(ManageRole.USER_INFO.read | ManageRole.USER_INFO.write),
  //       UserType.MANAGE
  //     )
  //   );
  //   const jo = helper.getJwtObject(token);
  //   expect(jo.isExpired()).toBeFalsy();
  //   expect(jo.getExpired() > Date.now()).toBeTruthy();
  //   expect(jo.getUserSeq()).toBe(1);
  //   expect(jo.getIp()).toBe("127.0.0.1");
  //   // expect(jo.hasReadRole(ManageRole.USER_INFO)).toBeTruthy();
  //   // expect(jo.hasWriteRole(ManageRole.USER_INFO)).toBeTruthy();
  //   // expect(jo.hasReadRole(ManageRole.FACILITY_INFO)).toBeFalsy();
  //   expect(jo.getUserType()).toBe(UserType.MANAGE);
  // });

  // it("JWT / MasterRole", () => {
  //   const token = createToken(
  //     getJwtHeader(),
  //     getJwtPayload(
  //       1,
  //       "1",
  //       // String(ServiceRole.CONFIG_BASIC_FACILITY.read | ServiceRole.ACCOUNTING_BANKBOOKENTRY.read | ServiceRole.ACCOUNTING_BANKBOOKENTRY.write),
  //       UserType.MASTER,
  //       "1,2",
  //       "1")
  //   );
  //   const jo = helper.getJwtObject(token);
  //   expect(jo.isExpired()).toBeFalsy();
  //   expect(jo.getExpired() > Date.now()).toBeTruthy();
  //   expect(jo.getUserSeq()).toBe(1);
  //   expect(jo.getIp()).toBe("127.0.0.1");
  //   // expect(jo.hasReadRole(ServiceRole.CONFIG_BASIC_FACILITY)).toBeTruthy();
  //   // expect(jo.hasWriteRole(ServiceRole.CONFIG_BASIC_FACILITY)).toBeFalsy();
  //   // expect(jo.hasReadRole(ServiceRole.ACCOUNTING_BANKBOOKENTRY)).toBeTruthy();
  //   // expect(jo.hasWriteRole(ServiceRole.ACCOUNTING_BANKBOOKENTRY)).toBeTruthy();
  //   // expect(jo.hasReadRole(ManageRole.FACILITY_INFO)).toBeFalsy();
  //   // expect(jo.hasWriteRole(ManageRole.FACILITY_INFO)).toBeFalsy();
  //   // expect(jo.getUserType()).toBe(UserType.SERVICE);
  // });

  // // it("ManageRole", () => {
  // //   const list = ManageRole.toRoles(ManageRole.enumValues);
  // //   expect(list.length).toBe(3);
  // //   console.table(list);
  // // });

});

describe("Enum Test", () => {
  it("UserStatusType", () => {
    const list = UserStatus.toBaseTypes(UserStatus.enumValues);
    expect(list.length).toBe(4);
    expect(UserStatus.가입대기.name).toBe("r");
    expect(UserStatus.정상.name).toBe("n");
    expect(UserStatus.이용정지.name).toBe("p");
    expect(UserStatus.탈퇴.name).toBe("s");
    expect(list[0].description).toBe(undefined); //
    console.table(list);
  });
  it("AdminUserStatusType", () => {
    const list = AdminUserStatus.toBaseTypes(AdminUserStatus.enumValues);
    expect(list.length).toBe(3);
    expect(AdminUserStatus.정상.name).toBe("n");
    expect(AdminUserStatus.정지.name).toBe("p");
    expect(AdminUserStatus.퇴직.name).toBe("s");
    expect(list[0].description).toBe(undefined); //
    console.table(list);
  });

  it("AuthTokenEventType", () => {
    const list = AuthTokenEventType.toBaseTypes(AuthTokenEventType.enumValues);
    expect(list.length).toBe(4);
    expect(AuthTokenEventType.CREATE.name).toBe("토큰생성");
    expect(AuthTokenEventType.UPDATE.name).toBe("토큰업데이트");
    expect(AuthTokenEventType.EXPIRE.name).toBe("토큰만료");
    expect(AuthTokenEventType.DELETE.name).toBe("토큰삭제");
    expect(list[0].description).toBe(undefined); //
    console.table(list);
  });


  it("CommunicationType", () => {
    const list = CommunicationType.toBaseTypes(CommunicationType.enumValues);
    expect(list.length).toBe(3);
    expect(CommunicationType.NOTICE.name).toBe("공지");
    expect(CommunicationType.ALARM.name).toBe("알림");
    expect(CommunicationType.QUESTION.name).toBe("문의");
    console.table(list);
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

function getJwtPayload(
  userId: number,
  userRole: string,
  ut: string,
  brs?: string,
  fid?: string,
) {
  return {
    iss: "jangbuda",
    exp: String(Date.now() + 60 * 60 * 1000), // 1hour
    uid: String(userId),
    urs: userRole,
    ip: "127.0.0.1",
    ut,
    brs,
    fid,
  };
}
