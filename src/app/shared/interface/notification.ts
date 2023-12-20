import { User } from "./user";

export interface Notification {
    id: number;
    title: string;
   // description: string;
    date: string;
    read: boolean;
    user: User;
}
