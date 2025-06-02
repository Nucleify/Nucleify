import { AdCardBox, AdSecuritySectionInterface } from '@/app/atomic'

export function AdSecuritySection({
  items,
  className = '',
}: AdSecuritySectionInterface) {
  return (
    <section id="card-boxes-section-security">
      <div className="security-columns">
        <div className={`ad-card-boxes ${className}`}>
          {items.map((item, index) => (
            <AdCardBox
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              iconBelowTitle
            />
          ))}
        </div>
        <div className="security-info">
          <h3>Nie martw się o technologię</h3>
          <h2>Dbamy o bezpieczeństwo danych Twojej firmy</h2>
          <p>
            Aby Twoje dane były zawsze bezpieczne wykorzystujemy sprawdzone
            technologie oraz nowoczesną infrastrukturę firmy Google
            zlokalizowaną w Data Center w Warszawie.
          </p>
          <ul>
            <li>
              <strong>Dane szyfrowane </strong>
              na poziomie infrastruktury oraz systemu.
            </li>
            <li>
              <strong>Kopie zapasowe </strong>
              zapisywane są na terenie Unii Europejskiej.
            </li>
            <li>
              <strong>Logowanie </strong>
              do systemu obsługuje weryfikację dwuetapową.
            </li>
            <li>
              <strong>RODO / GDPR </strong>
              system spełnia wymogi zgodności.
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
