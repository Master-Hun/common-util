import { Enumify } from "enumify";

export abstract class BaseType extends Enumify {
  protected constructor(
    private readonly n: string,
    private readonly d?: string
  ) {
    super();
  }

  /**
   * 이름.
   */
  public get name() {
    return this.n;
  }

  /**
   * 설명.
   */
  public get description() {
    return this.d;
  }

  static toBaseTypes(enumifys: Enumify[]) {
    const r: BaseType[] = [];
    for (let enumify of enumifys) {
      r.push(<BaseType>enumify);
    }
    return r;
  }
}

/**
 * 사용자 상태 유형
 */
export class UserStatus extends BaseType {
  public static 가입대기 = new UserStatus("r");
  public static 정상 = new UserStatus("n");
  public static 이용정지 = new UserStatus("p");
  public static 탈퇴 = new UserStatus("s");

  private static _ = UserStatus.closeEnum();
}

/**
 * 관리자 상태 유형
 */
 export class AdminUserStatus extends BaseType {
  public static 정상 = new AdminUserStatus("n");
  public static 정지 = new AdminUserStatus("p");
  public static 퇴직 = new AdminUserStatus("s");

  private static _ = AdminUserStatus.closeEnum();
}

/**
 * 토큰 이벤트 유형
 */
export class AuthTokenEventType extends BaseType {
  /** 토큰생성 */
  public static CREATE = new AuthTokenEventType("토큰생성");
  /** 토큰업데이트 */
  public static UPDATE = new AuthTokenEventType("토큰업데이트");
  /** 토큰만료 */
  public static EXPIRE = new AuthTokenEventType("토큰만료");
  /** 토큰삭제 */
  public static DELETE = new AuthTokenEventType("토큰삭제");

  private static _ = AuthTokenEventType.closeEnum();
}

export class CommunicationType extends BaseType {
  /** 공지 */
  public static NOTICE = new CommunicationType("공지");
  /** 알림 */
  public static ALARM = new CommunicationType("알림");
  /** 문의 */
  public static QUESTION = new CommunicationType("문의");

  private static _ = CommunicationType.closeEnum();
}
