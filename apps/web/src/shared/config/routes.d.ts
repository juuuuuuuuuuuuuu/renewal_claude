export declare const ROUTES: {
    readonly HOME: "/";
    readonly COMMUNITY: {
        readonly LIST: "/community";
        readonly DETAIL: (id: string) => string;
        readonly WRITE: "/community/write";
    };
    readonly LEAVE: {
        readonly LIST: "/leave";
        readonly REQUEST: "/leave/request";
        readonly CALENDAR: "/leave/calendar";
    };
    readonly NOTICE: {
        readonly LIST: "/notice";
        readonly DETAIL: (id: string) => string;
    };
    readonly PROFILE: "/profile";
    readonly ORGANIZATION: "/organization";
    readonly ATTENDANCE: "/attendance";
    readonly APPROVAL: {
        readonly LIST: "/approval";
        readonly DETAIL: (id: string) => string;
        readonly REQUEST: "/approval/request";
    };
    readonly LOGIN: "/login";
    readonly SETTINGS: "/settings";
};
//# sourceMappingURL=routes.d.ts.map