import { ElementDirectionType } from 'atomic'

export interface SwiperInterface {
  slides?: SwiperSlideInterface[]
  slidesPerView?: number
  slidesPerGroup?: number
  spaceBetween?: number
  speed?: number
  modules?: any[] // eslint-disable-line
  navigation?: boolean
  pagination?: any // eslint-disable-line
  scrollbar?: any // eslint-disable-line
  allowSlideNext?: boolean
  allowSlidePrev?: boolean
  allowTouchMove?: boolean
  autoHeight?: boolean
  autoplay?: any // eslint-disable-line
  breakpoints?: any // eslint-disable-line
  breakpointsBase?: 'container' | 'window'
  cardsEffect?: any // eslint-disable-line
  centerInsufficientSlides?: boolean
  centeredSlides?: boolean
  centeredSlidesBounds?: boolean
  containerModifierClass?: string
  controller?: any // eslint-disable-line
  coverflowEffect?: any // eslint-disable-line
  createElements?: boolean
  creativeEffect?: any // eslint-disable-line
  cssMode?: boolean
  cubeEffect?: any // eslint-disable-line
  direction?: ElementDirectionType
  edgeSwipeDetection?: string | boolean
  edgeSwipeThreshold?: number
  effect?: string
  enabled?: boolean
  eventsPrefix?: string
  fadeEffect?: any // eslint-disable-line
  flipEffect?: any // eslint-disable-line
  focusableElements?: string
  followFinger?: boolean
  freeMode?: any // eslint-disable-line
  grid?: any // eslint-disable-line
  hashNavigation?: any // eslint-disable-line
  height?: number
  history?: any // eslint-disable-line
  init?: boolean
  initialSlide?: number
  injectStyles?: string[]
  injectStylesUrls?: string[]
  keyboard?: any // eslint-disable-line
  lazyPreloadPrevNext?: number
  lazyPreloaderClass?: string
  longSwipes?: boolean
  longSwipesMs?: number
  longSwipesRatio?: number
  loop?: boolean
  loopAddBlankSlides?: boolean
  loopAdditionalSlides?: number
  loopPreventsSliding?: boolean
  maxBackfaceHiddenSlides?: number
  mousewheel?: any // eslint-disable-line
  nested?: boolean
  noSwiping?: boolean
  noSwipingClass?: string
  noSwipingSelector?: string
  normalizeSlideIndex?: boolean
  observeParents?: boolean
  observeSlideChildren?: boolean
  observer?: boolean
  on?: object
  onAny?: any // eslint-disable-line
  oneWayMovement?: boolean
  parallax?: any // eslint-disable-line
  passiveListeners?: boolean
  preventClicks?: boolean
  preventClicksPropagation?: boolean
  preventInteractionOnTransition?: boolean
  resistance?: boolean
  resistanceRatio?: number
  resizeObserver?: boolean
  rewind?: boolean
  roundLengths?: boolean
  runCallbacksOnInit?: boolean
  setWrapperSize?: boolean
  shortSwipes?: boolean
  simulateTouch?: boolean
  slideActiveClass?: string
  slideBlankClass?: string
  slideClass?: string
  slideFullyVisibleClass?: string
  slideNextClass?: string
  slidePrevClass?: string
  slideToClickedSlide?: boolean
  slideVisibleClass?: string
  slidesOffsetAfter?: number
  slidesOffsetBefore?: number
  slidesPerGroupAuto?: boolean
  slidesPerGroupSkip?: number
  swipeHandler?: any // eslint-disable-line
  swiperElementNodeName?: string
  threshold?: number
  thumbs?: any // eslint-disable-line
  touchAngle?: number
  touchEventsTarget?: 'container' | 'wrapper'
  touchMoveStopPropagation?: boolean
  touchRatio?: number
  touchReleaseOnEdges?: boolean
  touchStartForcePreventDefault?: boolean
  touchStartPreventDefault?: boolean
  uniqueNavElements?: boolean
  updateOnWindowResize?: boolean
  url?: string
  userAgent?: string
  virtual?: any // eslint-disable-line
  virtualTranslate?: boolean
  watchOverflow?: boolean
  watchSlidesProgress?: boolean
  width?: number
  wrapperClass?: string
  zoom?: any // eslint-disable-line
}

export interface SwiperSlideInterface {
  url?: string
  prefix?: string
  image?: string
}
