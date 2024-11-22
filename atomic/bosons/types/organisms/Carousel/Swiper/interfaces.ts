export interface CarouselSwiperInterface {
  slides?: SlideInterface[]
  slidesPerView?: number
  slidesPerGroup?: number
  spaceBetween?: number
  speed?: number
  modules?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  navigation?: boolean
  pagination?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  scrollbar?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  allowSlideNext?: boolean
  allowSlidePrev?: boolean
  allowTouchMove?: boolean
  autoHeight?: boolean
  autoplay?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  breakpoints?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  breakpointsBase?: 'container' | 'window'
  cardsEffect?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  centerInsufficientSlides?: boolean
  centeredSlides?: boolean
  centeredSlidesBounds?: boolean
  containerModifierClass?: string
  controller?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  coverflowEffect?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  createElements?: boolean
  creativeEffect?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  cssMode?: boolean
  cubeEffect?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  direction?: 'horizontal' | 'vertical'
  edgeSwipeDetection?: string | boolean
  edgeSwipeThreshold?: number
  effect?: string
  enabled?: boolean
  eventsPrefix?: string
  fadeEffect?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  flipEffect?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  focusableElements?: string
  followFinger?: boolean
  freeMode?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  grid?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  hashNavigation?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  height?: number
  history?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  init?: boolean
  initialSlide?: number
  injectStyles?: string[]
  injectStylesUrls?: string[]
  keyboard?: any // eslint-disable-line @typescript-eslint/no-explicit-any
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
  mousewheel?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  nested?: boolean
  noSwiping?: boolean
  noSwipingClass?: string
  noSwipingSelector?: string
  normalizeSlideIndex?: boolean
  observeParents?: boolean
  observeSlideChildren?: boolean
  observer?: boolean
  on?: object
  onAny?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  oneWayMovement?: boolean
  parallax?: any // eslint-disable-line @typescript-eslint/no-explicit-any
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
  swipeHandler?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  swiperElementNodeName?: string
  threshold?: number
  thumbs?: any // eslint-disable-line @typescript-eslint/no-explicit-any
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
  virtual?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  virtualTranslate?: boolean
  watchOverflow?: boolean
  watchSlidesProgress?: boolean
  width?: number
  wrapperClass?: string
  zoom?: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface SlideInterface {
  url?: string
  prefix?: string
  image?: string
}
