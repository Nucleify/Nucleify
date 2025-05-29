import { boxes } from '@/app/atomic'

import { AdGainSection } from '@/app/atomic/section'

export default function Home() {
  return (
    <main>
      <AdGainSection items={boxes} />
    </main>
  )
}
