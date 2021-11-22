/**
 * 사용자 유형.
 * - SYSTEM : 시스템 (시스템)
 * - MASTER : 서비스 (최고 관리자)
 * - MANAGE : 관리자 (서비스 관리자)
 * - CUSTOMER : 고객 (서비스 이용자)
 */
export enum UserType {
    SYSTEM = "system",
    MASTER = "master",
    MANAGE = "manage",
    CUSTOMER = "customer",
};

/** JWT Header. */
export interface JwtHeader {
    alg: string;
    typ: string;
};

/**
 * JWT Payload.
 * - iss : 
 * - exp : 토큰 만료시간 (unix time 포맷)
 * - useq : 관리자/고객번호 (number)
 * - ip : 접속 IP 주소
 * - urs : 사용자 권한 (bigint)
 * - ut (optional) : 시용자 유형, 생략시 SYSTEM
 */
export interface JwtPayload {
    iss: string;
    exp: string;
    useq: string;
    ip: string;
    urs: string;
    ut?: string;
};

export class JwtObject {

    constructor(
        private readonly header: JwtHeader,
        private readonly payload: JwtPayload,
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
    public isExpired(time = 0): boolean {
        return Number(this.payload.exp) < Date.now() - time * 1000;
    }

    /**
     * 관리자/고객 번호를 반환한다.
     * @returns 관리자/고객번호 (숫자)
     */
    public getUserSeq(): number {
        return Number(this.payload.useq);
    }

    /**
     * 회원권한을 반환한다.
     * @returns 회원권한 (숫자)
     */
    public getUserRole(): bigint {
        return BigInt(this.payload.urs);
    }

    /**
     * IP 주소를 반환한다.
     * @returns IP 주소
     */
    public getIp(): string {
        return this.payload.ip;
    }

    /**
     * 사용자 유형을 반환한다.
     * @returns 사용자 유형
     */
    public getUserType(): UserType {
        switch (this.payload.ut) {
            case "system":
                return UserType.SYSTEM;
            case "master":
                return UserType.MASTER;
            case "manage":
                return UserType.MANAGE;
            case "customer":
                return UserType.CUSTOMER;
            default:
                return UserType.SYSTEM;
        }
    }

}