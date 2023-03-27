/**
 * 사용자 유형.
 */
export enum RoleType {
  /** 시스템 */
  SYSTEM = "system",
  /** 최고 관리자 */
  MASTER = "master",
  /** 서비스 관리자 */
  MANAGER = "manager",
  /** 고객 */
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

export interface JwtPayload {
  /** iss 생성 */
  iss: string;
  /** 토큰 만료시간 (unix time 포맷) */
  exp: string;
  /** 운영자/회원 번호 (seq) */
  s: number;
  /** 운영자/회원 이름 (name) */
  n: string;
  /** 권한 */
  r: RoleType;
  /** 이메일 */
  e: string;
  /** 접속 IP 주소 */
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
    return this.payload.s;
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
