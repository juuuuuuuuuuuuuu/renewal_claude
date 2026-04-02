interface Notification {
    id: string;
    title: string;
    body: string;
    isRead: boolean;
    createdAt: string;
    link?: string;
}
interface NotificationPanelProps {
    notifications?: Notification[];
    unreadCount?: number;
}
export declare function NotificationPanel({ notifications, unreadCount }: NotificationPanelProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=notification-panel.d.ts.map