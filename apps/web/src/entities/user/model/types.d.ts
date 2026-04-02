export interface User {
    id: string;
    name: string;
    email: string;
    department: string;
    position: string;
    profileImage?: string;
    role: 'admin' | 'manager' | 'employee';
    phone?: string;
    joinedAt: string;
}
export interface UserProfile extends User {
    bio?: string;
    skills?: string[];
    manager?: Pick<User, 'id' | 'name' | 'position'>;
}
//# sourceMappingURL=types.d.ts.map