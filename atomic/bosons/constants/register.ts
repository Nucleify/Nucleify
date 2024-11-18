import { App } from 'vue'

export function registerGlobalConstants(app: App): void {
  /**
   *  Images urls
   */
  app.config.globalProperties.imgUrl = 'img/'
  app.config.globalProperties.contributorsImgUrl = 'img/contributors/'
  app.config.globalProperties.storysetImgUrl = 'img/storyset/'
  app.config.globalProperties.storysetAboutImgUrl = 'img/storyset/about/'
  app.config.globalProperties.storysetServicesImgUrl = 'img/storyset/services/'
  app.config.globalProperties.technologiesImgUrl = 'img/technologies/'
}
