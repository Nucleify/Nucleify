import AdCardBoxes from './atomic/template/card-boxes/index.tsx'
import Image from 'next/image'

export default function Home() {
  const mockItems = [
    {
      title: 'Jeden nowoczesny system',
      description:
        'rozwiązujący większość problemów biznesowych zarówno małych jak i dużych firm.',
      icon: (
        <Image
          src="https://tillio.pl/src/assets/icon/board.svg"
          alt="Board"
          width={32}
          height={32}
        />
      ),
    },
    {
      title: 'Uporządkujesz firmowe dane',
      description:
        'wykorzystując wbudowane narzedzia skutecznie skatalogujesz najważniejsze informacje o klientach i procesach.',
      icon: (
        <Image
          src="https://tillio.pl/src/assets/icon/storage.svg"
          alt="Board"
          width={32}
          height={32}
        />
      ),
    },
    {
      title: 'Zorganizujesz pracę zespołu',
      description:
        'wykorzystując zadania i projekty każdy będzie wiedział co ma zrobić każdego dnia po zjawieniu się w pracy.',
      icon: (
        <Image
          src="https://tillio.pl/src/assets/icon/cube-magenta.svg"
          alt="Board"
          width={32}
          height={32}
        />
      ),
    },
    {
      title: 'Zwiększysz efektywność działań',
      description:
        'odzyskując czas na zbędne czynności, powtarzalne zadania czy poszukiwanie danych klienta na dyskach firmowych.',
      icon: (
        <Image
          src="https://tillio.pl/src/assets/icon/presentation-chart-line.svg"
          alt="Board"
          width={32}
          height={32}
        />
      ),
    },
    {
      title: 'Zwiększysz sprzedaż w firmie',
      description:
        'wykorzystując nowoczesne narzędzia sprzedażowe, zorganizujesz i przyśpieszysz proces sprzedaży.',
      icon: (
        <Image
          src="https://tillio.pl/src/assets/icon/funnel.svg"
          alt="Board"
          width={32}
          height={32}
        />
      ),
    },
    {
      title: 'Poprawisz jakość obsługi klienta',
      description:
        'wykorzystując system CXM proces obsługi klienta zyska na jakości co wpłynie na wskaźnik churn rate.',
      icon: (
        <Image
          src="https://tillio.pl/src/assets/icon/team.svg"
          alt="Board"
          width={32}
          height={32}
        />
      ),
    },
    {
      title: 'Dostęp do raportów w czasie rzeczywistym',
      description:
        'pozwalających na bieżącą analizę danych i skuteczniejsze podejmowanie decyzji.',
      icon: (
        <Image
          src="https://tillio.pl/src/assets/icon/sim-card.svg"
          alt="Board"
          width={32}
          height={32}
        />
      ),
    },
    {
      title: 'Zabezpieczysz dane firmowe przed utratą',
      description:
        'zyskując regularne kopie zapasowe oraz nowoczesną infrastrukturę utrzymywaną w chmurze.',
      icon: (
        <Image
          src="https://tillio.pl/src/assets/icon/shield.svg"
          alt="Board"
          width={32}
          height={32}
        />
      ),
    },
  ]

  return (
    <main>
      <AdCardBoxes items={mockItems} />
    </main>
  )
}
