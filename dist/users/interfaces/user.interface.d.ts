export interface User {
    id?: string;
    username: string;
    password: string;
    reg_time: Date;
    login_fail: number;
    locked: boolean;
    permissions: string[];
}
export interface Permissions {
    permissions: string[];
}
