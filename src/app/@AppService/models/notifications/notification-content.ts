import { NotificationModel } from "./notification";

export interface NotificationContent {
    title: number;
    body: string;
    languageId: number;
    notificationId: number;
    notification: NotificationModel;
    creationDuration: string;
}