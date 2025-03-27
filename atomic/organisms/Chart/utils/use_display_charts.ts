import { reactive } from 'vue'

import { DisplayChartsInterface, UseDisplayChartsInterface } from 'atomic'

export function useDisplayCharts(): UseDisplayChartsInterface {
  const display: DisplayChartsInterface = reactive({
    Activity: window.localStorage.getItem('display-activity-graphs') === 'true',
    Admin: window.localStorage.getItem('display-admin-graphs') === 'true',
    Article: window.localStorage.getItem('display-article-graphs') === 'true',
    Card: window.localStorage.getItem('display-card-graphs') === 'true',
    Contact: window.localStorage.getItem('display-contact-graphs') === 'true',
    Money: window.localStorage.getItem('display-money-graphs') === 'true',
    Question: window.localStorage.getItem('display-question-graphs') === 'true',
    Structural:
      window.localStorage.getItem('display-structural-graphs') === 'true',
    Technology:
      window.localStorage.getItem('display-technology-graphs') === 'true',
  })

  function displayChartsToggle(action: string): void {
    const key = `display-${action.toLowerCase()}-graphs`
    display[action] = !display[action]

    window.localStorage.setItem(key, String(display[action]))

    const radioButton = document.querySelector(`#${action} .p-radiobutton`)

    if (!display[action] && radioButton) {
      radioButton.classList.remove('p-highlight')
    }
  }

  function setDefaultChartsDisplay(initial?: boolean, reload?: boolean): void {
    const properties: string[] = [
      'display-activity-graphs',
      'display-admin-graphs',
      'display-article-graphs',
      'display-card-graphs',
      'display-contact-graphs',
      'display-money-graphs',
      'display-question-graphs',
      'display-structural-graphs',
      'display-technology-graphs',
    ]

    if (initial) {
      properties.forEach((property: string): void => {
        if (!window.localStorage.getItem(property)) {
          window.localStorage.setItem(property, 'true')

          const key = property.split('-')[1]
          if (Object.prototype.hasOwnProperty.call(display, key)) {
            display[key as keyof DisplayChartsInterface] = true
          }
        }
      })
    } else {
      properties.forEach((property: string): void => {
        window.localStorage.setItem(property, 'true')

        const key = property.split('-')[1]
        if (Object.prototype.hasOwnProperty.call(display, key)) {
          display[key as keyof DisplayChartsInterface] = true
        }
      })
    }
    if (reload) {
      window.location.reload()
    }
  }

  return {
    display,
    displayChartsToggle,
    setDefaultChartsDisplay,
  }
}
