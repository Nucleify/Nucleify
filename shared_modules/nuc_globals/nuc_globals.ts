import type { App } from 'vue'

import {
  contributorsImgUrl,
  imgUrl,
  storysetAboutImgUrl,
  storysetBlogImgUrl,
  storysetImgUrl,
  storysetServicesImgUrl,
  technologiesImgUrl,
} from './constants/prefixes'
import { isDesktop } from './media/utils/is_desktop'
import { isMobile } from './media/utils/is_mobile'

export function registerNucGlobals(app: App): void {
  const prefix = appEnv() === 'production' ? '' : appUrl()

  app.config.globalProperties.isMobile = isMobile
  app.config.globalProperties.isDesktop = isDesktop

  app.config.globalProperties.imgUrl = prefix + imgUrl
  app.config.globalProperties.contributorsImgUrl = prefix + contributorsImgUrl
  app.config.globalProperties.storysetImgUrl = prefix + storysetImgUrl
  app.config.globalProperties.storysetAboutImgUrl = prefix + storysetAboutImgUrl
  app.config.globalProperties.storysetServicesImgUrl =
    prefix + storysetServicesImgUrl
  app.config.globalProperties.storysetBlogImgUrl = prefix + storysetBlogImgUrl
  app.config.globalProperties.technologiesImgUrl = prefix + technologiesImgUrl
}
