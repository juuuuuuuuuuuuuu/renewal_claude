import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@shared/api';
export const departmentKeys = {
    all: ['departments'],
    list: () => [...departmentKeys.all, 'list'],
    tree: () => [...departmentKeys.all, 'tree'],
    detail: (id) => [...departmentKeys.all, 'detail', id],
};
export function useDepartmentTree() {
    return useQuery({
        queryKey: departmentKeys.tree(),
        queryFn: () => apiClient.get('/organization/tree'),
    });
}
export function useDepartmentList() {
    return useQuery({
        queryKey: departmentKeys.list(),
        queryFn: () => apiClient.get('/departments'),
    });
}
//# sourceMappingURL=queries.js.map