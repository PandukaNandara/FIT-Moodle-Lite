export default interface Reminder {
    id?: string;
    description: string;
    url: string;
    date: Date;
    expireDate: Date;
}