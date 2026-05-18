'use client'

import React, { useEffect, useState } from 'react'

import type {
  NucTimeCalculateCountdownInterface,
  NucTimeCountdownInterface,
} from '../types/interfaces'
import { calculateCountdown } from '../utils/countdown'

import './index.scss'

export function NucTimeCountdown({ date }: NucTimeCountdownInterface) {
  const [result, setResult] =
    useState<NucTimeCalculateCountdownInterface | null>(null)

  useEffect(() => {
    setResult(calculateCountdown(date))

    const timer = setInterval(() => {
      setResult(calculateCountdown(date))
    }, 1000)

    return () => clearInterval(timer)
  }, [date])

  return (
    <div className="nuc-countdown">
      {result && !result.finished && !result.expired ? (
        <div className="time-display">
          {result.days > 0 && <span className="time">{result.days}d</span>}
          <span className="time">{result.hours}h</span>
          <span className="time">{result.minutes}m</span>
          <span className="time">{result.seconds}s</span>
        </div>
      ) : result ? (
        <div className="finished">
          {result.expired ? 'Expired' : 'Finished'}
        </div>
      ) : null}
    </div>
  )
}
