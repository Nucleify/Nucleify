import type { App } from 'vue'

import { isClient, isDesktop, isMobile } from 'atomic'

import {
  contributorsImgUrl,
  imgUrl,
  storysetAboutImgUrl,
  storysetBlogImgUrl,
  storysetImgUrl,
  storysetServicesImgUrl,
  technologiesImgUrl,
} from '.'

export function registerNucGlobals(app: App): void {
  const prefix = appEnv() === 'production' ? '' : appUrl()

  /**
   *  nuc_media
   */
  app.config.globalProperties.isClient = isClient
  app.config.globalProperties.isMobile = isMobile
  app.config.globalProperties.isDesktop = isDesktop

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
