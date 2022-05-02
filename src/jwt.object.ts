/**
 * 사용자 유형.
 * - SYSTEM : 시스템 (시스템)
 * - MASTER : 서비스 (최고 관리자)
 * - MANAGE : 운영자 (서비스 관리자)
 * - USER : 고객 (서비스 이용자)
 */
export enum RoleType {
  SYSTEM = "system",
  MASTER = "master",
  MANAGER = "manager",
  USER = "user",
}

export enum AuthTokenUserType {
  ADMIN = "a",
  USER = "u",
}

export interface JwtHeader {
  alg: string;
  typ: string;
}

/**
 * JWT Payload.
 * - iss :
 * - exp : 토큰 만료시간 (unix time 포맷)
 * - s : 운영자/회원 번호 (seq)
 * - n : 운영자/회원 이름 (name)
 * - r : 권한
 * - e : 로그인아이디 (email)
 * - ip : 접속 IP 주소
 */
export interface JwtPayload {
  iss: string;
  exp: string;
  s: string;
  n: string;
  r: RoleType;
  e: string;
  ip: string;
}

export class JwtObject {
  constructor(
    private readonly header: JwtHeader,
    private readonly payload: JwtPayload
  ) {}

  public getJwtHeader(): JwtHeader {
    return this.header;
  }

  public getPayload(): JwtPayload {
    return this.payload;
  }

  /**
   * 억세스토큰 만료시간을 반환한다.
   * @returns 억세스토큰 만료시간
   */
  public getExpired(): number {
    return Number(this.payload.exp);
  }

  /**
   * 억세스토큰이 만료 되었는지 여부를 반환한다.
   * @param {number} [time=0] 초
   * @returns true / false
   */
  public isExpired(time: number = 0): boolean {
    return Number(this.payload.exp) < Date.now() - time * 1000;
  }

  /**
   * 운영자/회원 번호를 반환한다. (tmcode)
   * @returns 운영자/회원 번호 (숫자)
   */
  public getSeq(): number {
    return Number(this.payload.s);
  }

  /**
   * 운영자/사용자의 이름을 반환한다.
   * @returns 이름
   */
  public getName(): string {
    return this.payload.n;
  }

  /**
   * 사용자 및 권한을 반환한다.
   * @returns 권한 (MASTER, SYSTEM, MANAGER)
   */
  public getRole(): RoleType {
    return this.payload.r as RoleType;
  }

  /**
   * 사용자 유형을 반환한다.
   * @returns 유형 (사용자, 관리자, MANAGER)
   */
  public getUserType(): AuthTokenUserType {
    return this.getRole() === RoleType.USER
      ? AuthTokenUserType.USER
      : AuthTokenUserType.ADMIN;
  }

  /**
   * 운영자/사용자의 이메일을 반환한다.
   * @returns 이메일
   */
  public getLoginEmail(): string {
    return this.payload.e;
  }

  /**
   * IP 주소를 반환한다.
   * @returns IP 주소
   */
  public getIp(): string {
    return this.payload.ip;
  }
}
