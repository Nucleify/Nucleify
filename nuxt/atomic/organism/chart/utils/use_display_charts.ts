import { reactive } from 'vue'

import type { DisplayChartsInterface, UseDisplayChartsInterface } from 'atomic'
import { localStorageGetItem, localStorageSetItem } from 'atomic'

export function useDisplayCharts(): UseDisplayChartsInterface {
  const display: DisplayChartsInterface = reactive({
    Activity: localStorageGetItem('display-activity-graphs') === 'true',
    Admin: localStorageGetItem('display-admin-graphs') === 'true',
    Article: localStorageGetItem('display-article-graphs') === 'true',
    Card: localStorageGetItem('display-card-graphs') === 'true',
    Contact: localStorageGetItem('display-contact-graphs') === 'true',
    Feature: localStorageGetItem('display-feature-graphs') === 'true',
    Link: localStorageGetItem('display-link-graphs') === 'true',
    Money: localStorageGetItem('display-money-graphs') === 'true',
    Question: localStorageGetItem('display-question-graphs') === 'true',
    Structural: localStorageGetItem('display-structural-graphs') === 'true',
    Technology: localStorageGetItem('display-technology-graphs') === 'true',
  })

  function displayChartsToggle(action: string): void {
    const key = `display-${action.toLowerCase()}-graphs`
    display[action] = !display[action]

    localStorageSetItem(key, String(display[action]))

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
      'display-feature-graphs',
      'display-link-graphs',
      'display-money-graphs',
      'display-question-graphs',
      'display-structural-graphs',
      'display-technology-graphs',
    ]

    if (initial) {
      properties.forEach((property: string): void => {
        if (!localStorageGetItem(property)) {
          localStorageSetItem(property, 'true')

          const key = property.split('-')[1]
          if (Object.prototype.hasOwnProperty.call(display, key)) {
            display[key as keyof DisplayChartsInterface] = true
          }
        }
      })
    } else {
      properties.forEach((property: string): void => {
        localStorageSetItem(property, 'true')

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
