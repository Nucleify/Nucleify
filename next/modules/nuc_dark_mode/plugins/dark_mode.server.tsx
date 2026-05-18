import Script from 'next/script'
import type { JSX } from 'react'

export const NUC_DARK_MODE_BOOTSTRAP_SCRIPT = `(function(){try{var m=document.cookie.match(/(?:^|;\\s*)nuc-dark-mode=([^;]*)/);if(m&&m[1]==='false'){document.documentElement.classList.remove('p-dark')}else{document.documentElement.classList.add('p-dark')}}catch(e){}})()`

export function NucDarkModeBootstrapScript(): JSX.Element {
  return (
    <Script
      dangerouslySetInnerHTML={{ __html: NUC_DARK_MODE_BOOTSTRAP_SCRIPT }}
      id="nuc-dark-mode-bootstrap"
      strategy="beforeInteractive"
    />
  )
}
