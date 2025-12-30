export type UserRole = "admin" | "user" | "rider";

export interface IUser {
    displayName: string;
    email: string;
    photoURL?: string;
    phoneNumber?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    password: string;
    role: UserRole;
}