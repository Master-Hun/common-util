/**
 * 사용자 유형.
 * - SYSTEM : 시스템 (실제 로그인 하는 사용자가 아님)
 * - MANAGE : 관리자 (서비스 관리를 하는 사용자)
 * - SERVICE : 서비스 (실제 서비스를 사용하는 사용자)
 * - PARTNER : 파트너 (파트너 사용자, 현재 미사용, 향후 확장을 위해 정의)
 */
export enum UserType {
    SYSTEM = "system",
    MASTER = "master",
    MANAGE = "manage",
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
 * - uid : 사용자번호 (number)
 * - ip : 접속 IP 주소
 * - urs : 사용자 권한 (bigint)
 * - brs (optional) : 이용가능한 사업번호 배열 (number array with comma seperated)
 *   - SERVICE 사용자 유형인 경우에만 해당
 *   - 관리자 사용자가 SERVICE 사용자 권한을 임시 발급 받는 경우에도 해당함
 * - ut (optional) : 시용자 유형, 생략시 SYSTEM
 * - fid (optional) : 시설번호
 *   - SERVICE 사용자 유형인 경우에만 해당
 *   - 관리자 사용자가 SERVICE 사용자 권한을 임시 발급 받는 경우에도 해당함
 */
export interface JwtPayload {
    iss: string;
    exp: string;
    uid: string;
    ip: string;
    urs: string;
    brs?: string;
    ut?: string;
    fid?: string;
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
     * 회원번호를 반환한다.
     * @returns 회원번호 (숫자)
     */
    public getUserId(): number {
        return Number(this.payload.uid);
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
            case "manage":
                return UserType.MANAGE;
            case "master":
                return UserType.MASTER;
            default:
                return UserType.SYSTEM;
        }
    }

}