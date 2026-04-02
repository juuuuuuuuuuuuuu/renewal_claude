# 컴포넌트 정의 및 책임

## 1. packages/ui — 공통 UI 컴포넌트 라이브러리

shadcn/ui (Radix UI + Tailwind CSS) 기반. cva + cn() 패턴으로 variant 관리.

### 기본 프리미티브 컴포넌트
| 컴포넌트 | 책임 | Radix UI 기반 |
|---|
---|
| Button | 클릭 액션 트리거. variant(primary, secondary, destructive, ghost, outline), size(sm, md, lg) | No |
| Input | 텍스트 입력. 유효성 검증 상태 표시 | No |
| Textarea | 멀티라인 텍스트 입력 | No |
| Card | 콘텐츠 컨테이너. Header, Content, Footer 서브컴포넌트 | No |
| Badge | 상태/카테고리 라벨 표시 | No |
| Avatar | 사용자 프로필 이미지/이니셜 표시 | No |
| Skeleton | 로딩 상태 플레이스홀더 | No |
| Separator | 시각적 구분선 | Radix Separator |

### 폼 컴포넌트
| 컴포넌트 | 책임 | Radix UI 기반 |
|---|---|---|
| Form | React Hook Form 통합 폼 래퍼. 유효성 검증, 에러 메시지 | No |
| Select | 드롭다운 선택. 단일/다중 선택 | Radix Select |
| Checkbox | 체크박스 입력 | Radix Checkbox |
| RadioGroup | 라디오 버튼 그룹 | Radix RadioGroup |
| Switch | 토글 스위치 | Radix Switch |
| DatePicker | 날짜 선택. 캘린더 팝오버 | Radix Popover + day-picker |
| Label | 폼 필드 라벨 | Radix Label |

### 오버레이/피드백 컴포넌트
| 컴포넌트 | 책임 | Radix UI 기반 |
|---|---|---|
| Dialog | 모달 다이얼로그 | Radix Dialog |
| Toast | 알림 토스트 메시지 | Radix Toast |
| Tooltip | 호버 툴팁 | Radix Tooltip |
| Popover | 팝오버 콘텐츠 | Radix Popover |
| AlertDialog | 확인/취소 다이얼로그 | Radix AlertDialog |

### 데이터 표시 컴포넌트
| 컴포넌트 | 책임 | Radix UI 기반 |
|---|---|---|
| Table | 데이터 테이블. TanStack Table 통합. 정렬, 필터, 페이지네이션 | No |
| Tabs | 탭 네비게이션 | Radix Tabs |
| Pagination | 페이지 네비게이션 | No |

---

## 2. apps/web — FSD 레이어별 컴포넌트

### app/ 레이어
| 컴포넌트 | 책임 |
|---|---|
| App | 루트 컴포넌트. 프로바이더 조합 |
| Providers | QueryClientProvider, RouterProvider, I18nProvider, ThemeProvider 조합 |
| Router | TanStack Router 라우트 정의 |
| AuthGuard | 인증 상태 확인 및 리다이렉트 |

### pages/ 레이어
| 슬라이스 | 페이지 컴포넌트 | 라우트 |
|---|---|---|
| home | DashboardPage | / |
| community | CommunityListPage, CommunityDetailPage, CommunityWritePage | /community, /community/:id, /community/write |
| leave | LeaveManagementPage, LeaveRequestPage, LeaveCalendarPage | /leave, /leave/request, /leave/calendar |
| notice | NoticeListPage, NoticeDetailPage | /notice, /notice/:id |
| profile | ProfilePage | /profile |
| organization | OrganizationPage | /organization |
| attendance | AttendancePage | /attendance |
| approval | ApprovalListPage, ApprovalDetailPage, ApprovalRequestPage | /approval, /approval/:id, /approval/request |
| auth | LoginPage | /login |
| settings | SettingsPage | /settings |

### widgets/ 레이어
| 슬라이스 | 컴포넌트 | 책임 |
|---|---|---|
| layout | AppLayout | PC: 사이드바+헤더 레이아웃, 모바일: 하단 탭+헤더 레이아웃 |
| header | Header | 상단 헤더. 검색, 알림, 유저 메뉴 |
| sidebar | Sidebar | PC 사이드바 네비게이션. 메뉴 항목, 접기/펼치기 |
| bottom-nav | BottomNavigation | 모바일 하단 탭 네비게이션 |
| notification | NotificationPanel | 알림 패널 |

### features/ 레이어
| 슬라이스 | 컴포넌트 | 책임 |
|---|---|---|
| auth | LoginForm, LogoutButton, SSOCallback | SSO 인증 플로우 |
| create-post | CreatePostForm | 게시글 작성 폼 |
| leave-request | LeaveRequestForm, LeaveApprovalActions | 휴가 신청/승인/반려 |
| approval-request | ApprovalRequestForm, ApprovalActions | 결재 요청/승인/반려 |
| attendance-check | AttendanceCheckIn, AttendanceCheckOut | 출퇴근 기록 |
| search | GlobalSearch | 통합 검색 |
| file-upload | FileUploader | 파일 첨부 |

### entities/ 레이어
| 슬라이스 | 모델 | 책임 |
|---|---|---|
| user | User, UserProfile | 사용자 정보, 프로필 |
| post | Post, Comment | 게시글, 댓글 |
| leave | Leave, LeaveType, LeaveBalance | 휴가 데이터 |
| notice | Notice | 공지사항 |
| department | Department, Organization | 부서, 조직 |
| attendance | AttendanceRecord | 근태 기록 |
| approval | ApprovalRequest, ApprovalLine | 결재 요청, 결재 라인 |

### shared/ 레이어
| 세그먼트 | 내용 |
|---|---|
| api/ | Axios 인스턴스, 인터셉터, 공통 API 타입 (ApiResponse, PaginatedResponse 등) |
| model/ | Zustand 스토어 (useAuthStore, useUIStore, useSettingsStore) |
| ui/ | 앱 전용 공통 UI (PageHeader, EmptyState, ErrorBoundary 등) |
| lib/ | 유틸리티 함수 (날짜 포맷, 권한 체크, 유효성 검증 등) |
| config/ | 환경 변수, 상수, 라우트 경로 상수 |
| i18n/ | i18n 설정, 번역 파일 (ko, en, ja) |
