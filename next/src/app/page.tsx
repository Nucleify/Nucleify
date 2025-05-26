import styles from './page.module.css'

import AtomCard from './atomic/molecule/card/index.tsx'

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <AtomCard />
      </main>
    </div>
  )
}
