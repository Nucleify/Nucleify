
const prefix: string = process.env.APP_ENV === 'production' ? '/build' : ''

export const imgUrl: string = prefix + '/img/'
export const contributorsImgUrl: string = prefix + '/img/contributors/'
export const storysetImgUrl: string = prefix + '/img/storyset/'
export const storysetAboutImgUrl: string = prefix + '/img/storyset/about/'
export const storysetServicesImgUrl: string = prefix + '/img/storyset/services/'
export const storysetBlogImgUrl: string = prefix + '/img/storyset/blog/'
export const technologiesImgUrl: string = prefix + '/img/technologies/'
