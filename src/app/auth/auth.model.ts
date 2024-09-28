export interface SignUpRequest {
    firstName: string,
    lastName: string;
    email: string;
    password: string,
    confirmPassword: string
}

export interface LoginRequest{
    email: string,
    password: string,
}

export interface AuthResponse{
    used: string,
    token: string,
}

export interface UserProfile{
    firstName: string,
    lastName: string;
    email: string;
    password: string,
    confirmPassword: string
}