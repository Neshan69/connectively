import type { ReactNode } from 'react'

export type ModuleVariant = 'video' | 'audio' | 'messages'

type ModuleCardProps = {
  variant: ModuleVariant
  onSelect?: () => void
}

type ModuleConfig = {
  icon: string
  badgeText: string
  badge: string
  iconWrap: string
  title: string
  titleText: string
  description: string
  cardHover: string
  action: string
  actionIcon: string
  actionText: string
  arrow: string
  ping?: boolean
  spec: {
    icon: string
    iconColor: string
    label: string
    trailing: ReactNode
  }
}

const SPEC_ROW =
  'mt-4 p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#86868B] dark:text-[#8E8E93]'

/**
 * The three starter modules of the hub (video / audio / messages).
 * They all share the same skeleton, only the accent colour changes.
 */
const MODULES: Record<ModuleVariant, ModuleConfig> = {
  video: {
    icon: 'videocam',
    badgeText: '4K HDR',
    badge:
      'text-[10px] font-mono font-semibold tracking-wide text-[#0071E3] dark:text-[#2997FF] bg-[#0071E3]/10 dark:bg-[#2997FF]/25 px-2 py-0.5 rounded-full border border-[#0071E3]/20 dark:border-[#2997FF]/35',
    iconWrap:
      'w-9 h-9 rounded-xl bg-[#0071E3]/10 dark:bg-[#2997FF]/15 border border-[#0071E3]/20 dark:border-[#2997FF]/30 flex items-center justify-center text-[#0071E3] dark:text-[#2997FF] shadow-xs group-hover:scale-105 transition-transform',
    title:
      'text-[14px] font-semibold text-[#1D1D1F] dark:text-white group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF] transition-colors flex items-center gap-1.5',
    titleText: 'HD Video Meeting',
    description:
      'Center Stage auto-framing, studio lighting presets & ultra-res 60fps SharePlay canvas.',
    cardHover: 'hover:border-[#0071E3]/40 dark:hover:border-[#2997FF]/50',
    action:
      'text-[#0071E3] dark:text-[#2997FF] font-semibold flex items-center gap-1 group-hover:gap-1.5 transition-all',
    actionIcon: 'play_arrow',
    actionText: 'Start Video Call',
    arrow: 'text-[#0071E3] dark:text-[#2997FF]',
    ping: true,
    spec: {
      icon: 'center_focus_strong',
      iconColor: 'text-[#0071E3] dark:text-[#2997FF]',
      label: 'Center Stage',
      trailing: <span className="text-neutral-500 dark:text-neutral-400 font-medium">60 FPS</span>,
    },
  },
  audio: {
    icon: 'mic',
    badgeText: 'Spatial Audio',
    badge:
      'text-[10px] font-mono font-semibold tracking-wide text-[#34C759] bg-[#34C759]/10 dark:bg-[#34C759]/20 px-2 py-0.5 rounded-full border border-[#34C759]/20 dark:border-[#34C759]/35',
    iconWrap:
      'w-9 h-9 rounded-xl bg-[#34C759]/10 dark:bg-[#34C759]/20 border border-[#34C759]/20 dark:border-[#34C759]/35 flex items-center justify-center text-[#34C759] shadow-xs group-hover:scale-105 transition-transform',
    title:
      'text-[14px] font-semibold text-[#1D1D1F] dark:text-white group-hover:text-[#34C759] transition-colors flex items-center gap-1.5',
    titleText: 'Studio Audio Call',
    description:
      'Computational noise reduction, lossless spatial stage rendering & sub-5ms low latency.',
    cardHover: 'hover:border-[#34C759]/40 dark:hover:border-[#34C759]/50',
    action:
      'text-[#34C759] font-semibold flex items-center gap-1 group-hover:gap-1.5 transition-all',
    actionIcon: 'headset',
    actionText: 'Join Audio Room',
    arrow: 'text-[#34C759]',
    spec: {
      icon: 'graphic_eq',
      iconColor: 'text-[#34C759]',
      label: 'Voice Isolation',
      trailing: (
        <div className="flex items-center gap-0.5 h-3 items-end">
          <span className="w-0.5 h-1.5 bg-[#34C759] rounded-full" />
          <span className="w-0.5 h-3 bg-[#34C759] rounded-full" />
          <span className="w-0.5 h-2 bg-[#34C759] rounded-full" />
          <span className="w-0.5 h-2.5 bg-[#34C759] rounded-full" />
        </div>
      ),
    },
  },
  messages: {
    icon: 'chat_bubble',
    badgeText: 'iMessage',
    badge:
      'text-[10px] font-mono font-semibold tracking-wide text-[#AF52DE] dark:text-[#BF5AF2] bg-[#AF52DE]/10 dark:bg-[#BF5AF2]/20 px-2 py-0.5 rounded-full border border-[#AF52DE]/20 dark:border-[#BF5AF2]/35',
    iconWrap:
      'w-9 h-9 rounded-xl bg-[#AF52DE]/10 dark:bg-[#BF5AF2]/20 border border-[#AF52DE]/20 dark:border-[#BF5AF2]/35 flex items-center justify-center text-[#AF52DE] dark:text-[#BF5AF2] shadow-xs group-hover:scale-105 transition-transform',
    title:
      'text-[14px] font-semibold text-[#1D1D1F] dark:text-white group-hover:text-[#AF52DE] dark:group-hover:text-[#BF5AF2] transition-colors flex items-center gap-1.5',
    titleText: 'Encrypted Messages',
    description:
      'Full PQ3 cryptographic protection, interactive canvas drops, thread sync & reactions.',
    cardHover: 'hover:border-[#AF52DE]/40 dark:hover:border-[#BF5AF2]/50',
    action:
      'text-[#AF52DE] dark:text-[#BF5AF2] font-semibold flex items-center gap-1 group-hover:gap-1.5 transition-all',
    actionIcon: 'edit_square',
    actionText: 'Compose Message',
    arrow: 'text-[#AF52DE] dark:text-[#BF5AF2]',
    spec: {
      icon: 'lock',
      iconColor: 'text-[#AF52DE] dark:text-[#BF5AF2]',
      label: 'End-to-End',
      trailing: (
        <span className="text-[#AF52DE] dark:text-[#BF5AF2] font-medium">PQ3 Active</span>
      ),
    },
  },
}

export default function ModuleCard({ variant, onSelect }: ModuleCardProps) {
  const config = MODULES[variant]

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect?.()
        }
      }}
      className={`group relative subcard-glass border border-black/[0.06] dark:border-white/10 ${config.cardHover} rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between cursor-pointer overflow-hidden`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={config.iconWrap}>
            <span className="material-symbols-outlined text-[20px]">{config.icon}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {config.ping && <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] animate-ping" />}
            <span className={config.badge}>{config.badgeText}</span>
          </div>
        </div>

        <h3 className={config.title}>{config.titleText}</h3>

        <p className="text-[11px] text-[#6E6E73] dark:text-[#8E8E93] mt-1.5 leading-relaxed">
          {config.description}
        </p>

        <div className={SPEC_ROW}>
          <span className="flex items-center gap-1">
            <span className={`material-symbols-outlined text-[13px] ${config.spec.iconColor}`}>
              {config.spec.icon}
            </span>
            {config.spec.label}
          </span>
          {config.spec.trailing}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-[11px]">
        <span className={config.action}>
          <span className="material-symbols-outlined text-[15px]">{config.actionIcon}</span>
          {config.actionText}
        </span>
        <span
          className={`material-symbols-outlined text-[15px] ${config.arrow} opacity-0 group-hover:opacity-100 transition-opacity`}
        >
          arrow_forward
        </span>
      </div>
    </div>
  )
}
