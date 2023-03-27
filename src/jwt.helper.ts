import { JwtObject, JwtHeader, JwtPayload } from "./jwt.object";

/**
 * JWT Helper.
 */
export class JwtHelper {
  public getJwtObject(accessToken: string) {
    const t = accessToken.split(".");
    const header: JwtHeader = JSON.parse(
      this.base64Decode(this.base64UrlToBase64(t[0]))
    );
    const payload: JwtPayload = JSON.parse(
      this.base64Decode(this.base64UrlToBase64(t[1]))
    );
    return new JwtObject(header, payload);
  }

  /**
   * Base64 디코딩한다.
   * @param {string} base64 입력 데이터 (Base64 문자열)
   * @returns Base64 디코딩 문자열
   */
  protected base64Decode(base64: string) {
    return Buffer.from(base64, "base64").toString("utf8");
  }

  /**
   * Base64 URL 규격을 Base64 규격으로 변경한다.
   * @param {string} base64url Base64 URL 문자열
   * @returns Base64 문자열
   */
  protected base64UrlToBase64(base64url: string) {
    return base64url.replace(/\-/g, "+").replace(/_/g, "/");
  }
}
