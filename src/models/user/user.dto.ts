import { type } from "os"
import UserMetadata ,{ Gender } from "./user.metadata"

// DTO presents for Data Transfer Object
export interface CreateUser {
    Username: string
    Fullname: string
    UUID: string
    Password?: string
    Gender?: string
    DoB?: string
    Phone?: string
    Email?: string
    Avatar?: string | null
}

export interface UpdateUserInformation extends UserMetadata {
    displayName?: string;
    description?: string;
}
