export interface Email {
    from: string;
    datetime: Date;
    subject: string;
    message: string;
    unread: boolean;
}
