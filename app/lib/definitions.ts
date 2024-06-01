export type Article = {
    id: string;
    title: string;
    content: string;
    user_id: string;
}

export type UserProfile = {
    email: string,
    email_verified: boolean,
    first_name: string,
    last_name: string,
    phone_verified: false,
    sub: string
}