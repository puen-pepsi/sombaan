
export interface NotificationDto {
    createAt: Date;
    type: NotificationType;
    originalDateTime: Date;
    description: string;
    maintenance: MaintenanceNotificationDto;
}

export interface MaintenanceNotificationDto {
    id: number;
    customerName: string;
    description: string;
    createAt: string;
    updateAt: string;
    dueDate: string;
    areaName: string;
    isCanceled: boolean;
    isCompleted: boolean;
}

export enum NotificationType {
    New = 1,
    Update = 2,
    Cancel = 3
}