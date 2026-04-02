# 요구사항 문서

## 의도 분석 요약

- **사용자 요청**: 사내 인트라넷 웹사이트 구축 — 커뮤니티, 휴가 관리, 공지사항, 직원 프로필/조직도, 근태관리, 결재 등 다목적 기능 제공. Turborepo 모노레포 + FSD 아키텍처 기반. 모바일 반응형 웹 + 하이브리드 앱(iOS/AOS) 지원.
- **요청 유형**: 신규 프로젝트 (Greenfield)
- **범위**: 시스템 전체 (System-wide)
- **복잡도**: 높음 (Complex)
- **현재 단계 목표**: 프론트엔드 모노레포 스캐폴딩 (apps/web + packages/ui + packages/config) + 아키텍처 문서화. 백엔드는 별도 레포지토리로 분리. 하이브리드 앱(Capacitor)은 향후 단계.

---

## 기술 스택

| 영역 | 기술 |
|---|---|
| Core | React (SPA), TypeScript |
| Package Manager | pnpm |
| Monorepo | Turborepo |
| 빌드/번들러 | Vite |
| 라우팅 | TanStack Router |
| Server State | React Query (TanStack Query) |
| Client State | Zustand |
| UI 컴포넌트 기반 | shadcn/ui (Radix UI 기반) |
| 스타일링 | Tailwind CSS |
| UI 컴포넌트 문서화 | Storybook (내부 개발 도구) |
| 테스트 (단위/컴포넌트) | Vitest + React Testing Library |
| 테스트 (E2E) | Playwright |
| i18n | 다국어 지원 (한국어, 영어, 일본어) |
| 하이브리드 앱 (향후) | Capacitor (WebView 래핑) |
| 백엔드 (별도 레포) | Java + Spring Boot |
| 인증 | SSO (SAML/OIDC) — 사내 IdP 연동 |

---

## 아키텍처 요구사항

### 모노레포 구조

```
monorepo-root/
├── apps/
│   └── web/                        # 사내 웹사이트 (React SPA)
│       └── src/
│           ├── app/                 # FSD Layer 1: 앱 초기화, 프로바이더, 라우팅
│           ├── pages/               # FSD Layer 2: 페이지 컴포넌트
│           ├── widgets/             # FSD Layer 3: 독립적 UI 블록
│           ├── features/            # FSD Layer 4: 비즈니스 기능
│           ├── entities/            # FSD Layer 5: 비즈니스 엔티티
│           └── shared/              # FSD Layer 6: 공유 유틸, API, 설정
├── packages/
│   ├── ui/                          # 공통 UI 컴포넌트 라이브러리
│   │   ├── src/
│   │   │   └── components/          # shadcn/ui 기반 컴포넌트 (cva + cn())
│   │   ├── .storybook/              # Storybook 설정
│   │   └── package.json
│   └── config/                      # 공통 설정
│       ├── eslint/                  # ESLint 설정
│       ├── prettier/                # Prettier 설정
│       └── typescript/              # TypeScript 설정
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
└── tsconfig.json
```

### FSD (Feature-Sliced Design) 아키텍처 규칙
- 레이어 간 의존성은 상위 → 하위 방향만 허용 (app → pages → widgets → features → entities → shared)
- 같은 레이어 내 슬라이스 간 직접 참조 금지
- 각 슬라이스는 public API (index.ts)를 통해서만 외부에 노출
- 각 슬라이스 내부 세그먼트: ui/, model/, api/, lib/, config/

### packages/ui 설계 원칙
- shadcn/ui 패턴 기반: Radix UI 헤드리스 컴포넌트 + Tailwind CSS
- cva (Class Variance Authority)로 variant 정의, cn() (clsx + tailwind-merge)으로 클래스 관리
- 앱에서는 props 기반으로 사용 (`<Button variant="primary" size="sm" />`)
- Storybook은 내부 개발팀 컴포넌트 문서화 및 개발 도구로 사용
- Figma 디자인 확정 시 커스텀 디자인 100% 대응 가능 (헤드리스 컴포넌트 기반)

### 향후 확장 계획 (현재 단계 범위 외)
- `apps/mobile/`: Capacitor 기반 하이브리드 앱 (iOS/AOS) — apps/web 빌드 결과물을 WebView에 로드
- 다른 프론트엔드 앱 추가 가능성 있음 (미확정) — packages/ui 분리로 대비

---

## 기능 요구사항 (Functional Requirements)

### FR-01: 인증/인가
- SSO (Single Sign-On) 기반 사내 IdP 연동 (SAML/OIDC)
- 역할 기반 접근 제어 (RBAC)
- 세션 관리 및 자동 로그아웃

### FR-02: 커뮤니티
- 게시판 (CRUD)
- 댓글/대댓글
- 좋아요/북마크
- 파일 첨부
- 검색 기능

### FR-03: 휴가 관리
- 휴가 신청/승인/반려 워크플로우
- 잔여 휴가 조회
- 휴가 캘린더
- 휴가 유형 관리

### FR-04: 사내 공지사항/게시판
- 공지사항 CRUD (관리자)
- 카테고리 분류
- 중요 공지 고정
- 읽음 확인

### FR-05: 직원 프로필/조직도
- 직원 프로필 조회/수정
- 조직도 트리 뷰
- 직원 검색

### FR-06: 근태관리
- 출퇴근 기록
- 근무시간 통계
- 초과근무 관리

### FR-07: 결재
- 결재 라인 설정
- 결재 요청/승인/반려
- 결재 이력 조회

---

## 비기능 요구사항 (Non-Functional Requirements)

### NFR-01: 반응형 디자인
- PC (1280px+), 태블릿 (768px-1279px), 모바일 (320px-767px) 브레이크포인트 지원
- 모바일 퍼스트 접근
- Tailwind CSS 반응형 유틸리티 클래스 활용 (sm:, md:, lg:, xl:)
- 하이브리드 앱(Capacitor)에서 동일한 웹 코드 재사용

### NFR-02: 성능
- 초기 로드 시간 3초 이내 (LCP)
- 코드 스플리팅 (라우트 기반 lazy loading)
- 이미지 최적화

### NFR-03: 접근성
- WCAG 2.1 AA 수준 준수 목표
- Radix UI 기반 접근성 내장 (키보드 네비게이션, 포커스 관리, ARIA)
- 스크린 리더 호환

### NFR-04: 국제화 (i18n)
- 한국어 (기본), 영어, 일본어 지원
- 확장 가능한 i18n 구조 (추가 언어 용이)
- RTL 레이아웃은 현재 불필요

### NFR-05: 보안
- SECURITY-01 ~ SECURITY-15 규칙 전체 적용 (보안 확장 활성화)
- CSP, HSTS, X-Content-Type-Options 등 HTTP 보안 헤더
- XSS/CSRF 방지
- 입력 검증 및 새니타이징
- SSO 토큰 검증 (서버 사이드)

### NFR-06: 유지보수성
- FSD 아키텍처 엄격 준수
- 모노레포 패키지 간 명확한 의존성 관리
- 공통 설정 중앙화 (packages/config)
- packages/ui를 통한 UI 컴포넌트 재사용

### NFR-07: 테스트
- 단위 테스트: Vitest + React Testing Library
- E2E 테스트: Playwright
- Storybook 기반 컴포넌트 개발 및 문서화

---

## 제약사항 (Constraints)

- 현재 단계는 프론트엔드 모노레포 스캐폴딩 (apps/web + packages/ui + packages/config) + 아키텍처 문서화만 수행
- 백엔드 (Java + Spring Boot)는 별도 레포지토리로 완전 분리
- 하이브리드 앱 (Capacitor)은 향후 별도 단계에서 추가
- 실제 기능 구현은 스캐폴딩 완료 후 진행
- Figma 디자인은 아직 확정 전 — shadcn/ui 기반으로 디자인 확정 시 유연하게 대응
