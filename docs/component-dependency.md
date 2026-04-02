# 컴포넌트 의존성 관계 및 통신 패턴

## 1. 패키지 간 의존성

```
packages/config ← packages/ui ← apps/web
     (설정)         (UI 컴포넌트)    (앱)
```

| 패키지 | 의존 대상 | 관계 |
|---|---|---|
| packages/config | 없음 | 최하위 — ESLint, Prettier, TS 설정만 제공 |
| packages/ui | packages/config | config의 ESLint/TS 설정 사용. Radix UI, Tailwind CSS, cva 의존 |
| apps/web | packages/ui, packages/config | UI 컴포넌트 사용, 공통 설정 사용 |

## 2. FSD 레이어 간 의존성 (엄격한 단방향)

```
app/ ──→ pages/ ──→ widgets/ ──→ features/ ──→ entities/ ──→ shared/
 |         |          |            |              |             |
 |         |          |            |              |             +-- api/ (Axios)
 |         |          |            |              |             +-- model/ (Zustand)
 |         |          |            |              |             +-- ui/ (공통 UI)
 |         |          |            |              |             +-- lib/ (유틸)
 |         |          |            |              |             +-- config/ (상수)
 |         |          |            |              |             +-- i18n/ (번역)
 |         |          |            |              |
 |         |          |            |              +-- 각 entity의 api/, model/, ui/
 |         |          |            |
 |         |          |            +-- 각 feature의 api/, model/, ui/
 |         |          |
 |         |          +-- layout, header, sidebar, bottom-nav
 |         |
 |         +-- 각 페이지 슬라이스
 |
 +-- providers, router, auth-guard
```

### 의존성 규칙
- 상위 레이어 → 하위 레이어만 참조 가능
- 같은 레이어 내 슬라이스 간 직접 참조 금지
- 모든 슬라이스는 index.ts (public API)를 통해서만 외부 노출
- packages/ui 컴포넌트는 shared/ 레이어에서 re-export하거나 직접 import

## 3. 데이터 흐름

### 서버 데이터 흐름 (React Query)
```
백엔드 API
    |
shared/api (Axios 인스턴스)
    |
entity/feature api/ 세그먼트 (React Query 훅)
    |
pages/widgets/features (컴포넌트에서 훅 호출)
    |
UI 렌더링
```

### 클라이언트 상태 흐름 (Zustand)
```
사용자 액션
    |
feature/widget 컴포넌트
    |
shared/model/ Zustand 스토어 (또는 feature 로컬 스토어)
    |
구독 중인 컴포넌트 리렌더링
```

### 인증 흐름
```
SSO IdP ──→ /login (콜백) ──→ features/auth ──→ shared/model/auth-store
                                                        |
                                                shared/api (인터셉터가 토큰 주입)
                                                        |
                                                모든 API 요청에 자동 적용
```

## 4. 통신 패턴

| 패턴 | 사용처 | 설명 |
|---|---|---|
| React Query 캐시 | entity/feature 간 데이터 공유 | 같은 query key를 사용하면 캐시 자동 공유 |
| Zustand 스토어 | 글로벌 클라이언트 상태 | 인증, UI, 설정 상태 공유 |
| Props drilling | 부모→자식 컴포넌트 | 위젯 내부, 페이지→위젯 간 |
| React Query invalidation | mutation 후 데이터 갱신 | 게시글 작성 후 목록 리페칭 등 |
| URL 파라미터 | 페이지 간 데이터 전달 | TanStack Router의 타입 안전 파라미터 |

## 5. packages/ui → apps/web 통신

```
packages/ui (프레젠테이션만)
    |
    +-- 스타일, 접근성, 인터랙션만 담당
    +-- 비즈니스 로직 없음
    +-- props로 데이터/이벤트 수신
    |
apps/web (비즈니스 로직)
    |
    +-- packages/ui 컴포넌트를 import
    +-- 데이터 바인딩 및 이벤트 핸들링
    +-- React Query/Zustand와 연결
```
