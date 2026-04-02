# 컴포넌트 메서드 시그니처

## 1. shared/api — API 클라이언트

```typescript
// shared/api/instance.ts
const apiClient: AxiosInstance  // 기본 Axios 인스턴스 (baseURL, 인터셉터)

// 인터셉터
requestInterceptor(config: AxiosRequestConfig): AxiosRequestConfig  // 토큰 주입
responseInterceptor(response: AxiosResponse): AxiosResponse          // 응답 정규화
errorInterceptor(error: AxiosError): Promise<never>                  // 401 → 토큰 갱신, 에러 핸들링
```

## 2. shared/model — Zustand 스토어

```typescript
// shared/model/auth-store.ts
interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setUser(user: User): void
  setToken(token: string): void
  logout(): void
}

// shared/model/ui-store.ts
interface UIStore {
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  toggleSidebar(): void
  setTheme(theme: 'light' | 'dark'): void
}

// shared/model/settings-store.ts
interface SettingsStore {
  locale: 'ko' | 'en' | 'ja'
  setLocale(locale: 'ko' | 'en' | 'ja'): void
}
```

## 3. entities — 엔티티 모델 및 API 훅

```typescript
// entities/user/model/types.ts
interface User {
  id: string
  name: string
  email: string
  department: string
  position: string
  profileImage?: string
}

// entities/user/api/queries.ts
useUserProfile(userId: string): UseQueryResult<User>
useUserList(params: UserListParams): UseQueryResult<PaginatedResponse<User>>

// entities/post/model/types.ts
interface Post {
  id: string
  title: string
  content: string
  author: User
  category: string
  createdAt: string
  commentCount: number
  likeCount: number
}

// entities/post/api/queries.ts
usePostList(params: PostListParams): UseQueryResult<PaginatedResponse<Post>>
usePostDetail(postId: string): UseQueryResult<Post>
useComments(postId: string): UseQueryResult<Comment[]>

// entities/leave/model/types.ts
interface Leave {
  id: string
  type: LeaveType
  startDate: string
  endDate: string
  status: 'pending' | 'approved' | 'rejected'
  reason: string
  approver: User
}

// entities/leave/api/queries.ts
useLeaveList(params: LeaveListParams): UseQueryResult<PaginatedResponse<Leave>>
useLeaveBalance(): UseQueryResult<LeaveBalance>
useLeaveCalendar(month: string): UseQueryResult<Leave[]>

// entities/notice/api/queries.ts
useNoticeList(params: NoticeListParams): UseQueryResult<PaginatedResponse<Notice>>
useNoticeDetail(noticeId: string): UseQueryResult<Notice>

// entities/department/api/queries.ts
useOrganizationTree(): UseQueryResult<Department[]>

// entities/attendance/api/queries.ts
useAttendanceRecords(params: AttendanceParams): UseQueryResult<PaginatedResponse<AttendanceRecord>>
useAttendanceStats(month: string): UseQueryResult<AttendanceStats>

// entities/approval/api/queries.ts
useApprovalList(params: ApprovalListParams): UseQueryResult<PaginatedResponse<ApprovalRequest>>
useApprovalDetail(approvalId: string): UseQueryResult<ApprovalRequest>
```

## 4. features — 기능 메서드

```typescript
// features/auth/api/mutations.ts
useSSOLogin(): UseMutationResult<AuthResponse, Error, SSOLoginParams>
useLogout(): UseMutationResult<void, Error, void>
useRefreshToken(): UseMutationResult<TokenResponse, Error, void>

// features/create-post/api/mutations.ts
useCreatePost(): UseMutationResult<Post, Error, CreatePostParams>
useUpdatePost(): UseMutationResult<Post, Error, UpdatePostParams>
useDeletePost(): UseMutationResult<void, Error, string>
useCreateComment(): UseMutationResult<Comment, Error, CreateCommentParams>
useToggleLike(): UseMutationResult<void, Error, string>

// features/leave-request/api/mutations.ts
useRequestLeave(): UseMutationResult<Leave, Error, LeaveRequestParams>
useApproveLeave(): UseMutationResult<Leave, Error, string>
useRejectLeave(): UseMutationResult<Leave, Error, RejectLeaveParams>

// features/approval-request/api/mutations.ts
useCreateApproval(): UseMutationResult<ApprovalRequest, Error, CreateApprovalParams>
useApproveRequest(): UseMutationResult<ApprovalRequest, Error, string>
useRejectRequest(): UseMutationResult<ApprovalRequest, Error, RejectApprovalParams>

// features/attendance-check/api/mutations.ts
useCheckIn(): UseMutationResult<AttendanceRecord, Error, void>
useCheckOut(): UseMutationResult<AttendanceRecord, Error, void>

// features/file-upload/api/mutations.ts
useUploadFile(): UseMutationResult<FileResponse, Error, File>
useDeleteFile(): UseMutationResult<void, Error, string>
```

## 5. widgets — 위젯 인터페이스

```typescript
// widgets/layout/ui/AppLayout.tsx
interface AppLayoutProps {
  children: React.ReactNode
}

// widgets/header/ui/Header.tsx
interface HeaderProps {
  onMenuToggle: () => void
}

// widgets/sidebar/ui/Sidebar.tsx
interface SidebarProps {
  open: boolean
  onClose: () => void
}

// widgets/bottom-nav/ui/BottomNavigation.tsx
interface BottomNavigationProps {
  activeRoute: string
}
```
