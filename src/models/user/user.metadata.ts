export type Gender = 'male' | 'female' | 'other';

interface UserMetadata {
    fullname?: string;
    dob?: number;// timestamp
    gender?: Gender;
    address?: string;
    phone?: string;
}


export default UserMetadata;