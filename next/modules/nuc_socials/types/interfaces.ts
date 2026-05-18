export interface SocialLinkInputInterface {
  key: string
  url: string
  icon?: string
  label?: string
}

export interface SocialItemInterface extends SocialLinkInputInterface {
  icon: string
  label: string
}
