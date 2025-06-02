import { boxesGain, boxesSecurity } from '@/app/atomic'

import { AdGainSection } from '@/app/atomic/section'
import { AdSecuritySection } from '@/app/atomic/section'

export default function Home() {
  return (
    <main>
      <AdGainSection items={boxesGain} />
      <AdSecuritySection items={boxesSecurity} />
    </main>
  )
}
