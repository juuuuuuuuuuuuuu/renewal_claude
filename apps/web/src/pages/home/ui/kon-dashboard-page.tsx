import * as React from 'react'
import { ChevronLeft, ChevronRight, Search, ShoppingCart, Bell, ChevronDown, Clock, Heart } from 'lucide-react'
import { cn } from '@hub/ui'

// ─── Asset images (Figma MCP assets, valid for 7 days) ────────────────────
const IMG = {
  background:   'https://www.figma.com/api/mcp/asset/01bc65bb-ce4f-4b49-9d96-e3b18b5ac993',
  heroBg:       'https://www.figma.com/api/mcp/asset/789cf264-6017-4ccf-b741-61e272772f99',
  heroChar:     'https://www.figma.com/api/mcp/asset/cb03843a-f263-4fd9-989c-dc5ccccea415',
  profileMe:    'https://www.figma.com/api/mcp/asset/0d446be6-2449-40d2-a9cd-ba8885af8073',
  profileTimot: 'https://www.figma.com/api/mcp/asset/1a13790a-ceef-4682-9087-797877ca6646',
  profileCate:  'https://www.figma.com/api/mcp/asset/a0a36ec3-d3bf-438d-9409-0c1ac2b7be70',
  profileJung:  'https://www.figma.com/api/mcp/asset/802479dc-4a93-4fc6-a92c-29a3e6d6aaba',
  iconHardware: 'https://www.figma.com/api/mcp/asset/2a7c0a01-42ce-4c96-8ec2-50fa16940723',
  iconCollab:   'https://www.figma.com/api/mcp/asset/03c86293-ba5c-4454-b13f-32dcb731037e',
  iconVersion:  'https://www.figma.com/api/mcp/asset/8265735f-12b8-4141-a99d-935b7fdfa910',
  iconSoftware: 'https://www.figma.com/api/mcp/asset/7398a9ca-4008-430d-94eb-530e8b439357',
  iconAI:       'https://www.figma.com/api/mcp/asset/f320195f-6f6e-4366-96e7-c52732cd18c2',
  iconCloud:    'https://www.figma.com/api/mcp/asset/254ac5e5-7ba2-4fc6-9d67-2b3369b451c5',
  iconAccount:  'https://www.figma.com/api/mcp/asset/fd6babe1-c975-421f-8a72-52c8489709b7',
  iconNetwork:  'https://www.figma.com/api/mcp/asset/ec52c51a-da8b-4b7b-be2e-2c5c6c2516ba',
  assetIpad:    'https://www.figma.com/api/mcp/asset/07fbe905-f07b-41a2-8f19-2b734f2e7598',
  assetDesktop: 'https://www.figma.com/api/mcp/asset/fa30bd5a-bf9d-463b-add0-67937dfc5955',
  assetAdobe:   'https://www.figma.com/api/mcp/asset/99d0993e-d3f4-4ecf-867c-c315ab7d857f',
  assetUsb:     'https://www.figma.com/api/mcp/asset/96315ec0-2301-4585-b517-fc2d5e1a628d',
  bannerIT:     'https://www.figma.com/api/mcp/asset/5eeb4b77-b39c-45d2-8f38-6c6218583965',
  bannerKraft:  'https://www.figma.com/api/mcp/asset/3e573972-4fa4-4a51-80d2-c3c9aaf8c356',
  logoGroup:    'https://www.figma.com/api/mcp/asset/6772b4d2-6faf-4364-8817-3a9d47e67e30',
  logoKon:      'https://www.figma.com/api/mcp/asset/45116e71-686e-4fa8-a5a3-3ef1ebc9e709',
  iconClock:    'https://www.figma.com/api/mcp/asset/07fbe905-f07b-41a2-8f19-2b734f2e7598',
  naver:        'https://www.figma.com/api/mcp/asset/32afa4cc-d987-4aaa-8a28-022bbb247400',
  youtube:      'https://www.figma.com/api/mcp/asset/099f93bb-b8f9-4864-a8d4-934605091896',
  instagram:    'https://www.figma.com/api/mcp/asset/3e283b88-d229-453e-b39f-18d8cbd6b761',
  facebook:     'https://www.figma.com/api/mcp/asset/462c839d-9caa-4ba0-b3cc-45eec8df76e2',
}

// ─── Types ────────────────────────────────────────────────────────────────
type RequestStatus = 'Pending' | 'Work in Progress' | 'Open' | 'Completed'

interface RequestCard {
  id: string
  title: string
  status: RequestStatus
  time: string
}

interface AssetCard {
  id: string
  name: string
  subname?: string
  serial: string
  iconSrc: string
  iconType?: 'image' | 'laptop'
}

interface ApprovalCard {
  id: string
  name: string
  avatar: string
  content: string
  price?: string
}

interface AnnouncementItem {
  id: string
  title: string
  date: string
}

// ─── Data ─────────────────────────────────────────────────────────────────
const REQUEST_TABS = [
  { label: 'Pending', count: 1 },
  { label: 'Open', count: 4 },
  { label: 'Work in progress', count: 2 },
  { label: 'Completed', count: 1 },
  { label: 'All', count: 8 },
] as const

const STATUS_STYLE: Record<RequestStatus, { color: string; bar: string }> = {
  Pending:          { color: 'text-[#fa0]',    bar: 'bg-[#fa0]' },
  'Work in Progress': { color: 'text-[#0884ff]', bar: 'bg-[#0884ff]' },
  Open:             { color: 'text-[#069d7a]', bar: 'bg-[#069d7a]' },
  Completed:        { color: 'text-[#2a4b8d]', bar: 'bg-[#2a4b8d]' },
}

const MY_REQUESTS: RequestCard[] = [
  { id: 'REQ0010108', title: 'Account creation\n(Github)', status: 'Pending', time: '2m ago' },
  { id: 'REQ0010112', title: 'AI&Software\nRequest', status: 'Work in Progress', time: '2m ago' },
  { id: 'REQ0010153', title: 'I would like to submit\na request for an RT..', status: 'Work in Progress', time: '2m ago' },
  { id: 'REQ0010136', title: 'Desk Set Up', status: 'Open', time: '2m ago' },
  { id: 'REQ0010179', title: 'Software Issues', status: 'Completed', time: '2m ago' },
]

const MY_ASSETS: AssetCard[] = [
  { id: 'A2928', name: 'iPad Pro M4 (2024)', serial: 'A2928', iconSrc: IMG.assetIpad, iconType: 'image' },
  { id: 'mac', name: 'MacBook Pro', subname: '16-inch', serial: 'Mac15,7 / FRW13xx/A', iconSrc: '', iconType: 'laptop' },
  { id: 'desktop', name: 'Desktop', serial: 'RTX5090 / AMD9800X3D', iconSrc: IMG.assetDesktop, iconType: 'image' },
  { id: 'adobe', name: 'Adobe Creative\nCloud for Teams', serial: 'ACCT Pro', iconSrc: IMG.assetAdobe, iconType: 'image' },
  { id: 'usb', name: 'USB-C Hub', serial: 'H-C 25778', iconSrc: IMG.assetUsb, iconType: 'image' },
]

const MY_APPROVALS: ApprovalCard[] = [
  { id: 'REQ0010108', name: 'Timothée Chalame', avatar: IMG.profileTimot, content: 'Replaced z a Ryzen 9800X3D due to an Intel CPU issue.', price: '662,000' },
  { id: 'REQ0010124', name: 'Cate Blanchett', avatar: IMG.profileCate, content: "I'd like to request an RTX 5090 for Unreal Engine 5 development.", price: '662,000' },
  { id: 'REQ0010196', name: 'Jung Haein', avatar: IMG.profileJung, content: 'AI&Software Request' },
]

const ANNOUNCEMENTS: AnnouncementItem[] = [
  { id: '1', title: 'Notice of Scheduled Server Maintenance', date: '2016-01-12' },
  { id: '2', title: 'Congratulations to Mr. Hong Gil-dong from the IT Development Team on the birth of his baby', date: '2016-01-05' },
  { id: '3', title: 'Announcement of New Employees for This Month', date: '2016-01-02' },
  { id: '4', title: 'Personnel Appointment Announcement', date: '2015-12-24' },
]

const RECOMMENDED = [
  'Standard 27" Monitor', 'URL/IP(Forewall) Filtering', 'Apple Macbook pro 15"',
  'Sales Laptop', 'Adobe Acrobat Pro', 'Glalaxy book 5 Pro',
  'Apple Macbook pro 16"', 'Dell Standard 24" Monitor', 'Figma',
]

const QUICK_MENUS = [
  { label: '하드웨어', icon: IMG.iconHardware },
  { label: '협업도구', icon: IMG.iconCollab },
  { label: '버전관리도구', icon: IMG.iconVersion },
  { label: '소프트웨어', icon: IMG.iconSoftware },
  { label: 'AI', icon: IMG.iconAI },
  { label: '클라우드', icon: IMG.iconCloud },
  { label: '계정/접근권한', icon: IMG.iconAccount },
  { label: '네트워크&보안', icon: IMG.iconNetwork },
]

// ─── Sub-components ───────────────────────────────────────────────────────

function SectionCard({ title, onPrev, onNext, children, className }: {
  title: string
  onPrev?: () => void
  onNext?: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('bg-white rounded-[15px] overflow-hidden', className)}>
      <div className="flex items-center justify-between px-[30px] pt-[28px] pb-0">
        <h2 className="text-[16px] font-semibold text-black tracking-[-0.16px]">{title}</h2>
        <div className="flex items-center gap-0.5">
          <button onClick={onPrev} className="p-1 rounded hover:bg-gray-100 transition-colors">
            <ChevronLeft className="w-4 h-4 text-gray-400" />
          </button>
          <button onClick={onNext} className="p-1 rounded hover:bg-gray-100 transition-colors">
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
      {children}
    </div>
  )
}

function RequestStatusCard({ card }: { card: RequestCard }) {
  const style = STATUS_STYLE[card.status]
  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[12px] w-[161px] h-[167px] shrink-0 relative overflow-hidden p-[13px]">
      <p className={cn('text-[12px] font-bold tracking-[-0.12px]', style.color)}>{card.status}</p>
      <div className={cn('w-[12px] h-[2px] mt-[6px]', style.bar)} />
      <p className="text-[14px] text-black mt-[9px] leading-[18px] whitespace-pre-line tracking-[-0.14px]">{card.title}</p>
      <p className="absolute bottom-[27px] left-[13px] text-[11px] text-[#999aa9] tracking-[-0.11px]">{card.id}</p>
      <div className="absolute bottom-[11px] left-[13px] flex items-center gap-[5px]">
        <Clock className="w-[14px] h-[14px] text-[#999aa9]" />
        <span className="text-[12px] text-[#999aa9] tracking-[-0.12px]">{card.time}</span>
      </div>
    </div>
  )
}

function AssetCardItem({ asset }: { asset: AssetCard }) {
  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[12px] w-[161px] h-[167px] shrink-0 relative overflow-hidden p-[13px]">
      <div className="h-[24px] w-[24px] mt-[23px] mb-[28px]">
        {asset.iconType === 'laptop' ? (
          <div className="flex flex-col gap-[2px]">
            <div className="bg-[#d3d7df] h-[19px] w-[24px] rounded-[5px]" />
            <div className="bg-[#99a1b7] h-[2px] w-[24px] rounded-full" />
          </div>
        ) : (
          <img src={asset.iconSrc} alt={asset.name} className="w-[24px] h-[24px] object-contain" />
        )}
      </div>
      <p className="text-[14px] text-black leading-[18px] whitespace-pre-line tracking-[-0.14px]">{asset.name}</p>
      {asset.subname && <p className="text-[14px] text-black leading-[18px] tracking-[-0.14px]">{asset.subname}</p>}
      <p className="absolute bottom-[27px] left-[13px] text-[12px] text-[#999aa9] tracking-[-0.12px]">{asset.serial}</p>
    </div>
  )
}

function ApprovalCardItem({ card }: { card: ApprovalCard }) {
  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[12px] w-full h-[140px] relative overflow-hidden">
      {/* Profile */}
      <div className="absolute top-[20px] left-[20px] flex items-center gap-[9px]">
        <img src={card.avatar} alt={card.name} className="w-[30px] h-[30px] rounded-full object-cover" />
        <span className="text-[12px] font-bold text-black tracking-[-0.12px]">{card.name}</span>
      </div>
      <span className="absolute top-[34px] right-[20px] text-[11px] text-[#999aa9] tracking-[-0.11px]">{card.id}</span>

      {/* Content */}
      <p className="absolute top-[60px] left-[20px] right-[20px] text-[14px] text-black leading-[18px] tracking-[-0.14px] line-clamp-2">
        {card.content}
      </p>

      {/* Price + Buttons */}
      <div className="absolute bottom-[10px] left-[20px] right-[20px] flex items-center justify-between">
        {card.price ? (
          <span className="text-[14px] font-medium text-[#f71d33] tracking-[-0.14px]">
            ￦{card.price}
          </span>
        ) : (
          <span />
        )}
        <div className="flex gap-[5px]">
          <button className="w-[60px] h-[24px] border border-[#3a4a5f] rounded-[3px] text-[12px] text-[#3a4a5f] tracking-[-0.12px] hover:bg-gray-50 transition-colors">
            Reject
          </button>
          <button className="w-[60px] h-[24px] bg-[#3a4a5f] rounded-[3px] text-[12px] text-white tracking-[-0.12px] hover:bg-[#2d3d50] transition-colors">
            Approve
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export function KonDashboardPage() {
  const [activeTab, setActiveTab] = React.useState<number>(4)
  const [likedItems, setLikedItems] = React.useState<Set<number>>(new Set([4]))

  const toggleLike = (i: number) => {
    setLikedItems(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white from-[30%] to-[#f0f2f6] font-['Pretendard',sans-serif]">

      {/* ── GNB ── */}
      <header className="sticky top-0 z-50 bg-white/30 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-[1400px] mx-auto px-[0px]">
          <div className="flex items-center justify-between h-[64px]">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src={IMG.logoGroup} alt="KRAFTON" className="h-[18px] object-contain" />
              <img src={IMG.logoKon} alt="K-ON" className="h-[10px] object-contain" />
            </div>
            {/* Nav */}
            <nav className="flex items-center gap-8 text-[14px] text-[#7a8593] font-medium">
              <a href="#" className="hover:text-black transition-colors">My Assets</a>
              <a href="#" className="hover:text-black transition-colors">My Requests</a>
              <button className="flex items-center gap-1 hover:text-black transition-colors">
                More <ChevronDown className="w-3 h-3" />
              </button>
            </nav>
            {/* Right icons */}
            <div className="flex items-center gap-5">
              <button className="relative">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-2 -right-2 bg-[#f1362d] text-white text-[10px] font-bold rounded-full w-[16px] h-[16px] flex items-center justify-center">2</span>
              </button>
              <button className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-2 -right-1 bg-[#f1362d] text-white text-[10px] font-bold rounded-full w-[18px] h-[16px] flex items-center justify-center">29</span>
              </button>
              <button className="flex items-center gap-1">
                <img src={IMG.profileMe} alt="profile" className="w-[32px] h-[32px] rounded-full object-cover" />
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </button>
            </div>
          </div>
          {/* 2depth nav */}
          <div className="flex gap-[80px] pb-3 text-[18px] font-semibold text-[#121213]">
            <a href="#" className="hover:text-[#3090d7] transition-colors">IT Assets &amp; Gear</a>
            <a href="#" className="hover:text-[#3090d7] transition-colors">IT Services</a>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-0 pb-16">

        {/* ── Hero Search Banner ── */}
        <section className="relative h-[400px] rounded-[15px] overflow-hidden mt-[28px] bg-[#3090d7]">
          <img src={IMG.heroBg} alt="" className="absolute right-0 top-0 h-full object-cover object-right pointer-events-none select-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3090d7] via-[#3090d7]/80 to-transparent" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
            <h1 className="text-[40px] font-bold text-white tracking-[-0.4px]">
              Looking for something today?
            </h1>
            <p className="text-[20px] text-white/90 tracking-[-0.2px]">
              We make it easy to find IT assets and requests, so you can get what you need without any hassle
            </p>
            <div className="flex items-center gap-[10px] mt-2">
              <div className="w-[600px] h-[50px] bg-white/30 backdrop-blur-sm rounded-full shadow-[0px_4px_15px_rgba(0,0,0,0.15)] flex items-center px-7">
                <span className="text-[16px] text-white/80 tracking-[-0.16px]">Enter a keyword to get started</span>
              </div>
              <button className="w-[50px] h-[50px] bg-white/20 hover:bg-white/30 transition-colors rounded-full flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </section>

        {/* ── Quick Menu ── */}
        <section className="mt-[28px] flex justify-center gap-[60px]">
          {QUICK_MENUS.map((menu) => (
            <button key={menu.label} className="flex flex-col items-center gap-[10px] group">
              <div className="w-[40px] h-[40px] bg-white border border-[#f1f1f1] rounded-[14px] flex items-center justify-center group-hover:shadow-md transition-shadow">
                <img src={menu.icon} alt={menu.label} className="w-[20px] h-[20px] object-contain" />
              </div>
              <span className="text-[14px] font-medium text-black text-center leading-[24px] tracking-[-0.14px]">
                {menu.label}
              </span>
            </button>
          ))}
        </section>

        {/* ── Main Grid ── */}
        <div className="mt-[28px] grid grid-cols-[1fr_456px] gap-[20px]">

          {/* ── Left Column ── */}
          <div className="flex flex-col gap-[20px]">

            {/* My Requests */}
            <SectionCard title="My Requests" className="h-[260px]">
              {/* Tab bar */}
              <div className="flex items-center justify-between px-[30px] mt-[14px]">
                <div className="flex items-center gap-0 bg-[#f0f2f5] rounded-[5px] p-0.5 overflow-hidden">
                  {REQUEST_TABS.map((tab, i) => (
                    <button
                      key={tab.label}
                      onClick={() => setActiveTab(i)}
                      className={cn(
                        'px-3 h-[25px] text-[12px] rounded-[5px] tracking-[-0.12px] transition-colors whitespace-nowrap',
                        activeTab === i
                          ? 'bg-[#3a4a5f] text-white font-medium'
                          : 'text-[#999aa9] hover:text-gray-600'
                      )}
                    >
                      {tab.label}{' '}
                      <span className={activeTab === i ? 'text-white' : 'text-black font-medium'}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Cards */}
              <div className="flex items-center gap-[14px] px-[30px] mt-[14px] overflow-x-auto scrollbar-hide pb-4">
                {MY_REQUESTS.map((card) => (
                  <RequestStatusCard key={card.id} card={card} />
                ))}
              </div>
            </SectionCard>

            {/* My Assets */}
            <SectionCard title="My Assets" className="h-[260px]">
              <div className="flex items-center gap-[14px] px-[30px] mt-[14px] overflow-x-auto scrollbar-hide pb-4">
                {MY_ASSETS.map((asset) => (
                  <AssetCardItem key={asset.id} asset={asset} />
                ))}
              </div>
            </SectionCard>

            {/* Announcement */}
            <SectionCard title="Announcement" className="h-[260px]">
              <div className="flex flex-col mt-[14px] px-[30px]">
                {ANNOUNCEMENTS.map((item, i) => (
                  <div
                    key={item.id}
                    className={cn(
                      'flex items-center justify-between h-[42px] border-t border-[#f1f1f1] cursor-pointer hover:bg-gray-50 transition-colors px-[14px]',
                      i === ANNOUNCEMENTS.length - 1 && 'border-b'
                    )}
                  >
                    <span className="text-[14px] text-black tracking-[-0.14px] truncate">{item.title}</span>
                    <span className="text-[12px] text-[#999aa9] tracking-[-0.12px] shrink-0 ml-4">{item.date}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Recommended For You */}
            <SectionCard title="Recommended For You" className="min-h-[260px]">
              <div className="flex flex-wrap gap-[14px] px-[30px] mt-[14px] pb-6">
                {RECOMMENDED.map((item, i) => (
                  <button
                    key={i}
                    className="flex items-center justify-between bg-white border border-[#f1f1f1] rounded-[9px] h-[46px] px-[13px] w-[calc(33.3%-10px)] hover:border-[#3090d7] transition-colors group"
                  >
                    <span className="text-[14px] text-black tracking-[-0.14px] truncate">{item}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleLike(i) }}
                      className="shrink-0 ml-2"
                    >
                      <Heart
                        className={cn(
                          'w-4 h-4 transition-colors',
                          likedItems.has(i) ? 'fill-[#f71d33] text-[#f71d33]' : 'text-gray-300 group-hover:text-gray-400'
                        )}
                      />
                    </button>
                  </button>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* ── Right Column ── */}
          <div className="flex flex-col gap-[20px]">

            {/* My Approvals */}
            <SectionCard title="My Approvals" className="min-h-[540px]">
              <div className="flex flex-col gap-[14px] px-[30px] mt-[14px] pb-6">
                {MY_APPROVALS.map((card) => (
                  <ApprovalCardItem key={card.id} card={card} />
                ))}
              </div>
            </SectionCard>

            {/* Banners */}
            <div className="flex flex-col gap-[20px]">
              {/* Banner 1 - Dark purple */}
              <div className="h-[120px] rounded-[15px] bg-[#2b1b77] overflow-hidden relative flex items-center justify-center">
                <div className="absolute inset-0 opacity-40"
                  style={{ background: 'radial-gradient(circle at 70% 50%, #512dff 0%, transparent 60%)' }}
                />
                <div className="relative text-center text-white">
                  <p className="text-[26px] font-bold leading-[24px] tracking-[-0.26px]">Finish your IT</p>
                  <p className="text-[22px] font-light leading-[24px] tracking-[-0.22px]">setup to get started.</p>
                </div>
              </div>

              {/* Banner 2 - Light blue */}
              <div className="h-[120px] rounded-[15px] overflow-hidden relative"
                style={{ background: 'linear-gradient(to right, #f0f9ff 45%, white)' }}
              >
                <img src={IMG.bannerKraft} alt="" className="absolute right-0 top-0 h-full object-cover" />
                <div className="relative flex items-center h-full pl-[70px] text-[#414141]">
                  <div>
                    <p className="text-[26px] font-bold leading-[24px] tracking-[-0.26px]">Finish your IT</p>
                    <p className="text-[22px] font-light leading-[24px] tracking-[-0.22px]">setup to get started.</p>
                  </div>
                </div>
              </div>

              {/* Banner 3 - Photo */}
              <div className="h-[120px] rounded-[15px] overflow-hidden relative flex items-center justify-center">
                <img src={IMG.bannerIT} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/35" />
                <div className="relative text-center text-white">
                  <p className="text-[26px] font-bold leading-[24px]">Meet the new Krafton</p>
                  <p className="text-[16px] font-light leading-[24px] tracking-[-0.16px]">
                    Discover Krafton&apos;s refreshed logo and brand identity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="max-w-[1400px] mx-auto px-0 py-[40px] border-t border-[#e8e8e8]">
        <div className="flex items-start justify-between">
          <div>
            <img src={IMG.logoGroup} alt="KRAFTON" className="h-[18px] object-contain mb-[20px]" />
            <p className="text-[16px] font-bold text-black mb-[40px]">Privacy Policy</p>
            <p className="text-[14px] text-[#999aa9]">Copyright © KRAFTON, Inc. All rights reserved.</p>
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-[30px]">
              <img src={IMG.naver} alt="Naver" className="h-[20px] object-contain cursor-pointer hover:opacity-70 transition-opacity" />
              <img src={IMG.youtube} alt="YouTube" className="h-[20px] object-contain cursor-pointer hover:opacity-70 transition-opacity" />
              <img src={IMG.instagram} alt="Instagram" className="h-[20px] w-[20px] object-contain cursor-pointer hover:opacity-70 transition-opacity" />
              <img src={IMG.facebook} alt="Facebook" className="h-[22px] w-[22px] object-contain cursor-pointer hover:opacity-70 transition-opacity" />
            </div>
            <div className="flex items-center gap-[13px] text-[14px] text-black">
              <a href="#" className="hover:underline">KRAFTON Official Website</a>
              <div className="w-px h-[12px] bg-[#d9d9d9]" />
              <a href="#" className="hover:underline">KRAFTON Careers</a>
              <div className="w-px h-[12px] bg-[#d9d9d9]" />
              <a href="#" className="hover:underline">RisingWiz Official Website</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
