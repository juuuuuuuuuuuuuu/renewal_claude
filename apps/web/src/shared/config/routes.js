export const ROUTES = {
    HOME: '/',
    COMMUNITY: {
        LIST: '/community',
        DETAIL: (id) => `/community/${id}`,
        WRITE: '/community/write',
    },
    LEAVE: {
        LIST: '/leave',
        REQUEST: '/leave/request',
        CALENDAR: '/leave/calendar',
    },
    NOTICE: {
        LIST: '/notice',
        DETAIL: (id) => `/notice/${id}`,
    },
    PROFILE: '/profile',
    ORGANIZATION: '/organization',
    ATTENDANCE: '/attendance',
    APPROVAL: {
        LIST: '/approval',
        DETAIL: (id) => `/approval/${id}`,
        REQUEST: '/approval/request',
    },
    LOGIN: '/login',
    SETTINGS: '/settings',
};
//# sourceMappingURL=routes.js.map