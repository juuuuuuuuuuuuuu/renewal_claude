import type { User } from '@entities/user/model/types';
export interface Department {
    id: string;
    name: string;
    code: string;
    parentId: string | null;
    manager?: Pick<User, 'id' | 'name' | 'position'>;
    memberCount: number;
    children?: Department[];
}
export interface Organization {
    id: string;
    name: string;
    departments: Department[];
}
//# sourceMappingURL=types.d.ts.map