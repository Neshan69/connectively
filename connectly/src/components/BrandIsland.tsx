const BRAND_LOGO =
  'https://lh3.googleusercontent.com/aida/AEtjO1XI4XEhiEz7a94KoQ0vqyuGyemFbBUOyDOhLFxPy5ScdcoZT6OwkpHW5HvlsmmqcPHitDT0WNAVXlohXYdgcuPM0tnG2Dt8wRvHbpICqKrO6NSD0574E-KyCtr4em_11VBl16lAOQ0VKk-Gj-60608v3iedC5ZN8-7Z_P7QXEBpgC6SeF2p7pOYK_CAK885m4LS5svUK7rsgqvQBCsWAa7g-kBP7yBaCUv_SAbBgp4jMel6lYE1G6LpS_mb'

/**
 * The floating brand island on the left edge: NNN logo, the pulsing
 * "NNN Core Active" indicator and the vertical NNN STUDIO wordmark.
 */
export default function BrandIsland() {
  return (
    <aside aria-label="Brand Identity Island" className="fixed left-6 top-1/2 -translate-y-1/2 z-50">
      <div className="bg-white/75 dark:bg-[#16181F]/80 backdrop-blur-2xl border border-white/90 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.5),0_1px_3px_rgba(0,0,0,0.4)] rounded-full p-2.5 flex flex-col items-center gap-3 transform transition-all duration-300 ease-out origin-left hover:scale-110 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.6)] cursor-pointer group">
        <div className="relative flex items-center justify-center py-1 group cursor-default">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0071E3] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0071E3] ring-2 ring-sky-500/20" />
          </span>
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-neutral-900/90 dark:bg-black/90 text-white text-[11px] font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-white/10">
            NNN Core Active
          </div>
        </div>

        <div className="w-11 h-11 rounded-2xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/10 flex items-center justify-center p-1.5 transition-transform duration-200 group-hover:scale-105 shadow-xs">
          <img
            src={BRAND_LOGO}
            alt="NNN Brand Logo"
            className="w-full h-full object-contain filter drop-shadow"
          />
        </div>

        <div className="w-4 h-[1px] bg-neutral-200/80 dark:bg-neutral-700/60" />

        <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-neutral-500 dark:text-neutral-400 [writing-mode:vertical-rl] rotate-180 py-1 transition-colors group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF]">
          NNN STUDIO
        </span>
      </div>
    </aside>
  )
}
