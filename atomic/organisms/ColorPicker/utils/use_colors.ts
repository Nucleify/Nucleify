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
    secondary: window.localStorage.getItem('main-item-secondary-color'),
  }
  const activityItemColors: ColorItemColorsInterface = {
    primary: window.localStorage.getItem('activity-item-color'),
    hover: window.localStorage.getItem('activity-item-hover-color'),
    secondary: window.localStorage.getItem('activity-item-secondary-color'),
  }
  const articleItemColors: ColorItemColorsInterface = {
    primary: window.localStorage.getItem('article-item-color'),
    hover: window.localStorage.getItem('article-item-hover-color'),
    secondary: window.localStorage.getItem('article-item-secondary-color'),
  }
  const cardItemColors: ColorItemColorsInterface = {
    primary: window.localStorage.getItem('card-item-color'),
    hover: window.localStorage.getItem('card-item-hover-color'),
    secondary: window.localStorage.getItem('card-item-secondary-color'),
  }
  const contactItemColors: ColorItemColorsInterface = {
    primary: window.localStorage.getItem('contact-item-color'),
    hover: window.localStorage.getItem('contact-item-hover-color'),
    secondary: window.localStorage.getItem('contact-item-secondary-color'),
  }
  const featureItemColors: ColorItemColorsInterface = {
    primary: window.localStorage.getItem('feature-item-color'),
    hover: window.localStorage.getItem('feature-item-hover-color'),
    secondary: window.localStorage.getItem('feature-item-secondary-color'),
  }
  const linkItemColors: ColorItemColorsInterface = {
    primary: window.localStorage.getItem('link-item-color'),
    hover: window.localStorage.getItem('link-item-hover-color'),
    secondary: window.localStorage.getItem('link-item-secondary-color'),
  }
  const moneyItemColors: ColorItemColorsInterface = {
    primary: window.localStorage.getItem('money-item-color'),
    hover: window.localStorage.getItem('money-item-hover-color'),
    secondary: window.localStorage.getItem('money-item-secondary-color'),
  }
  const questionItemColors: ColorItemColorsInterface = {
    primary: window.localStorage.getItem('question-item-color'),
    hover: window.localStorage.getItem('question-item-hover-color'),
    secondary: window.localStorage.getItem('question-item-secondary-color'),
  }
  const technologyItemColors: ColorItemColorsInterface = {
    primary: window.localStorage.getItem('technology-item-color'),
    hover: window.localStorage.getItem('technology-item-hover-color'),
    secondary: window.localStorage.getItem('technology-item-secondary-color'),
  }
  const userItemColors: ColorItemColorsInterface = {
    primary: window.localStorage.getItem('user-item-color'),
    hover: window.localStorage.getItem('user-item-hover-color'),
    secondary: window.localStorage.getItem('user-item-secondary-color'),
  }

  function setDefaultColors(initial: boolean): void {
    const properties: string[] = [
      // Main properties
      'main-item-color',
      'main-item-dark-color',
      'main-item-hover-color',
      'main-item-focus-color',
      'main-item-secondary-color',
      'main-item-selected-color',
      'main-item-highlight-color',

      // Activity properties
      'activity-item-color',
      'activity-item-dark-color',
      'activity-item-hover-color',
      'activity-item-focus-color',
      'activity-item-secondary-color',
      'activity-item-selected-color',
      'activity-item-highlight-color',

      // Article properties
      'article-item-color',
      'article-item-dark-color',
      'article-item-hover-color',
      'article-item-focus-color',
      'article-item-secondary-color',
      'article-item-selected-color',
      'article-item-highlight-color',

      // Card properties
      'card-item-color',
      'card-item-dark-color',
      'card-item-hover-color',
      'card-item-focus-color',
      'card-item-secondary-color',
      'card-item-selected-color',
      'card-item-highlight-color',

      // Contact properties
      'contact-item-color',
      'contact-item-dark-color',
      'contact-item-hover-color',
      'contact-item-focus-color',
      'contact-item-secondary-color',
      'contact-item-selected-color',
      'contact-item-highlight-color',

      // Feature properties
      'feature-item-color',
      'feature-item-dark-color',
      'feature-item-hover-color',
      'feature-item-focus-color',
      'feature-item-secondary-color',
      'feature-item-selected-color',
      'feature-item-highlight-color',

      // Link properties
      'link-item-color',
      'link-item-dark-color',
      'link-item-hover-color',
      'link-item-focus-color',
      'link-item-secondary-color',
      'link-item-selected-color',
      'link-item-highlight-color',

      // Money properties
      'money-item-color',
      'money-item-dark-color',
      'money-item-hover-color',
      'money-item-focus-color',
      'money-item-secondary-color',
      'money-item-selected-color',
      'money-item-highlight-color',

      // Question properties
      'question-item-color',
      'question-item-dark-color',
      'question-item-hover-color',
      'question-item-focus-color',
      'question-item-secondary-color',
      'question-item-selected-color',
      'question-item-highlight-color',

      // Technology properties
      'technology-item-color',
      'technology-item-dark-color',
      'technology-item-hover-color',
      'technology-item-focus-color',
      'technology-item-secondary-color',
      'technology-item-selected-color',
      'technology-item-highlight-color',

      // User properties
      'user-item-color',
      'user-item-dark-color',
      'user-item-hover-color',
      'user-item-focus-color',
      'user-item-secondary-color',
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
    cardItemColors,
    contactItemColors,
    featureItemColors,
    linkItemColors,
    moneyItemColors,
    questionItemColors,
    technologyItemColors,
    userItemColors,
    setDefaultColors,
  }
}
