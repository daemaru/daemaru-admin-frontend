export type LoginRequest = {
    accountId: string;
    password: string;
}

export type LoginResponse = {
    accessToken: string;
}