import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@shared/api'

import type { Department, Organization } from '@entities/department/model/types'

export const departmentKeys = {
  all: ['departments'] as const,
  list: () => [...departmentKeys.all, 'list'] as const,
  tree: () => [...departmentKeys.all, 'tree'] as const,
  detail: (id: string) => [...departmentKeys.all, 'detail', id] as const,
}

export function useDepartmentTree() {
  return useQuery({
    queryKey: departmentKeys.tree(),
    queryFn: () => apiClient.get<Organization>('/organization/tree'),
  })
}

export function useDepartmentList() {
  return useQuery({
    queryKey: departmentKeys.list(),
    queryFn: () => apiClient.get<Department[]>('/departments'),
  })
}
