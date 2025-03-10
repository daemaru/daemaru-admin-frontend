export type LoginRequest = {
    accountId: string;
    password: string;
}

export type LoginResponse = {
    token: string;
    refreshToken: string;
}