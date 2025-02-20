// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  ColorItemColorsInterface,
  UseColorsInterface,
  isCurrentUrl,
} from 'atomic'

export function useColors(): UseColorsInterface {
  const documentStyle: CSSStyleDeclaration = getComputedStyle(
    document.documentElement
  )

  const mainItemColors: ColorItemColorsInterface = {
    primary: window.localStorage.getItem('main-item-color'),
    hover: window.localStorage.getItem('main-item-hover-color'),
    selected: window.localStorage.getItem('main-item-selected-color'),
  }
  const activityItemColors: ColorItemColorsInterface = {
    primary: window.localStorage.getItem('activity-item-color'),
    hover: window.localStorage.getItem('activity-item-hover-color'),
    selected: window.localStorage.getItem('activity-item-selected-color'),
  }
  const articleItemColors: ColorItemColorsInterface = {
    primary: window.localStorage.getItem('article-item-color'),
    hover: window.localStorage.getItem('article-item-hover-color'),
    selected: window.localStorage.getItem('article-item-selected-color'),
  }
  const contactItemColors: ColorItemColorsInterface = {
    primary: window.localStorage.getItem('contact-item-color'),
    hover: window.localStorage.getItem('contact-item-hover-color'),
    selected: window.localStorage.getItem('contact-item-selected-color'),
  }
  const moneyItemColors: ColorItemColorsInterface = {
    primary: window.localStorage.getItem('money-item-color'),
    hover: window.localStorage.getItem('money-item-hover-color'),
    selected: window.localStorage.getItem('money-item-selected-color'),
  }
  const questionItemColors: ColorItemColorsInterface = {
    primary: window.localStorage.getItem('question-item-color'),
    hover: window.localStorage.getItem('question-item-hover-color'),
    selected: window.localStorage.getItem('question-item-selected-color'),
  }
  const userItemColors: ColorItemColorsInterface = {
    primary: window.localStorage.getItem('user-item-color'),
    hover: window.localStorage.getItem('user-item-hover-color'),
  }

  function setDefaultColors(initial: boolean): void {
    const properties: string[] = [
      // Main properties
      'main-item-color',
      'main-item-dark-color',
      'main-item-hover-color',
      'main-item-focus-color',
      'main-item-selected-color',
      'main-item-highlight-color',

      // Activity properties
      'activity-item-color',
      'activity-item-dark-color',
      'activity-item-hover-color',
      'activity-item-focus-color',
      'activity-item-selected-color',
      'activity-item-highlight-color',

      // Article properties
      'article-item-color',
      'article-item-dark-color',
      'article-item-hover-color',
      'article-item-focus-color',
      'article-item-selected-color',
      'article-item-highlight-color',

      // Contact properties
      'contact-item-color',
      'contact-item-dark-color',
      'contact-item-hover-color',
      'contact-item-focus-color',
      'contact-item-selected-color',
      'contact-item-highlight-color',

      // Money properties
      'money-item-color',
      'money-item-dark-color',
      'money-item-hover-color',
      'money-item-focus-color',
      'money-item-selected-color',
      'money-item-highlight-color',

      // Question properties
      'question-item-color',
      'question-item-dark-color',
      'question-item-hover-color',
      'question-item-focus-color',
      'question-item-selected-color',
      'question-item-highlight-color',

      // User properties
      'user-item-color',
      'user-item-dark-color',
      'user-item-hover-color',
      'user-item-focus-color',
      'user-item-selected-color',
      'user-item-highlight-color',
    ]

    if (initial) {
      properties.forEach((property: string): void => {
        if (!window.localStorage.getItem(property)) {
          window.localStorage.setItem(
            property,
            documentStyle.getPropertyValue(`--${property}`)
          )
        }
      })
    } else {
      properties.forEach((property: string): void => {
        window.localStorage.setItem(
          property,
          documentStyle.getPropertyValue(`--${property}`)
        )
        isCurrentUrl('/settings') ? window.location.reload() : ''
      })
    }
  }

  return {
    mainItemColors,
    activityItemColors,
    articleItemColors,
    contactItemColors,
    moneyItemColors,
    questionItemColors,
    userItemColors,
    setDefaultColors,
  }
}
