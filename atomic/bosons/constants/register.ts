import { App } from 'vue'

import {
  imgUrl,
  contributorsImgUrl,
  storysetImgUrl,
  storysetAboutImgUrl,
  storysetServicesImgUrl,
  storysetBlogImgUrl,
  technologiesImgUrl,
} from 'atomic'

export function registerGlobalConstants(app: App): void {
  /**
   *  Images urls
   */
  app.config.globalProperties.imgUrl = imgUrl
  app.config.globalProperties.contributorsImgUrl = contributorsImgUrl
  app.config.globalProperties.storysetImgUrl = storysetImgUrl
  app.config.globalProperties.storysetAboutImgUrl = storysetAboutImgUrl
  app.config.globalProperties.storysetServicesImgUrl = storysetServicesImgUrl
  app.config.globalProperties.storysetBlogImgUrl = storysetBlogImgUrl
  app.config.globalProperties.technologiesImgUrl = technologiesImgUrl
}
