import type { Department, Organization } from '@entities/department/model/types';
export declare const departmentKeys: {
    all: readonly ["departments"];
    list: () => readonly ["departments", "list"];
    tree: () => readonly ["departments", "tree"];
    detail: (id: string) => readonly ["departments", "detail", string];
};
export declare function useDepartmentTree(): import("@tanstack/react-query").UseQueryResult<Organization, Error>;
export declare function useDepartmentList(): import("@tanstack/react-query").UseQueryResult<Department[], Error>;
//# sourceMappingURL=queries.d.ts.map