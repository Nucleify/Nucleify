'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import type { SwiperOptions } from 'swiper/types'
import 'swiper/css'

import type { ReactNode } from 'react'

import type { SwiperInterface } from './types'

export function AdSwiper(props: SwiperInterface & { children?: ReactNode }) {
  const { slides, children, ...rest } = props
  return (
    <div className="swiper-container ad-swiper">
      <Swiper {...(rest as SwiperOptions)}>
        {slides &&
          slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              {slide.url && slide.image ? (
                <a href={slide.url}>
                  <img src={(slide.prefix || '') + slide.image} alt="" />
                </a>
              ) : null}
            </SwiperSlide>
          ))}
        {children}
      </Swiper>
    </div>
  )
}
