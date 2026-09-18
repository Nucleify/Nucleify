export {}

declare global {
  interface Window {
    isClient: boolean
    isMobile: boolean
    isDesktop: boolean
    apiUrl: () => string
    nucImages: {
      imgUrl: string
      contributorsImgUrl: string
      storysetAboutImgUrl: string
      storysetBlogImgUrl: string
      storysetImgUrl: string
      storysetServicesImgUrl: string
      technologiesImgUrl: string
    }
  }
}
