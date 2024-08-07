export interface SignUpRequest {
    firstName: string,
    lastName: string;
    email: string;
    password: string,
}

export interface LoginRequest{
    email: string,
    password: string,
}

export interface AuthResponse{
    used: string,
    token: string,
}