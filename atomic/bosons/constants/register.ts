import { AppType } from 'vite'

export function registerGlobalConstants(app: AppType): void {
  /**
   *  Images urls
   */
  app.config.globalProperties.imgUrl = 'img/'
  app.config.globalProperties.contributorsImgUrl = 'img/contributors/'
  app.config.globalProperties.storysetImgUrl = 'img/storyset/'
  app.config.globalProperties.technologiesImgUrl = 'img/technologies/'
}
