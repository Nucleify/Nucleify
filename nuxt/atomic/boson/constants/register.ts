import type { App } from 'vue'

import {
  contributorsImgUrl,
  imgUrl,
  storysetAboutImgUrl,
  storysetBlogImgUrl,
  storysetImgUrl,
  storysetServicesImgUrl,
  technologiesImgUrl,
} from 'atomic'

export function registerGlobalConstants(app: App): void {
  const prefix = appEnv() === 'production' ? '/build' : ''

  /**
   *  Images urls
   */
  app.config.globalProperties.imgUrl = prefix + imgUrl
  app.config.globalProperties.contributorsImgUrl = prefix + contributorsImgUrl
  app.config.globalProperties.storysetImgUrl = prefix + storysetImgUrl
  app.config.globalProperties.storysetAboutImgUrl = prefix + storysetAboutImgUrl
  app.config.globalProperties.storysetServicesImgUrl =
    prefix + storysetServicesImgUrl
  app.config.globalProperties.storysetBlogImgUrl = prefix + storysetBlogImgUrl
  app.config.globalProperties.technologiesImgUrl = prefix + technologiesImgUrl
}
