/** Shell reveal / boot types shared by section motion specs and web frame utils. */

export type MaskRevealSpec = {
  kind: 'mask'
  items: string
}

export type CopyStageRevealSpec = {
  kind: 'copy-stage'
  copy: string
  stage: string
  stageDelay?: number
}

export type StackLatticeRevealSpec = {
  kind: 'stack-lattice'
  mask: string
  lattice: string
}

export type FrameSectionRevealSpec =
  | MaskRevealSpec
  | CopyStageRevealSpec
  | StackLatticeRevealSpec

export type FrameBootCipher = {
  selector: string
  fallbackText: string
  glyphClass?: string
  deferStartMs?: number | null
  durationBase?: number
  durationStep?: number
  delayBase?: number
  delayStep?: number
  settleMs?: number
}

export type MarketingFrameBits = {
  nav?: string
  rail?: string
  eyebrow?: string
  mark?: string
  headline?: string
  support?: string
  cta?: string
  panel?: string
}

export type MarketingFrameBoot = {
  mode: 'marketing'
  quietAddsStatic?: boolean
  compactMaxWidth?: number
  includeNav?: boolean
  clearExtra?: string
  cipher: FrameBootCipher
  bits?: MarketingFrameBits
  iris?: { delayMs?: number; setOrigin?: boolean }
  warmFontsAlways?: boolean
  enableIris?: boolean
}

export type ThankYouFrameBoot = {
  mode: 'thankYou'
  quietAddsStatic?: boolean
  compactMaxWidth?: number
  cipher: FrameBootCipher
  iris?: { delayMs?: number; setOrigin?: boolean }
  bits: {
    title: string
    support: string
    cta: string
    cube: string
  }
  enableIris?: boolean
}

export type FrameBootOptions = MarketingFrameBoot | ThankYouFrameBoot
