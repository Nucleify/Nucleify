'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import {
  AdDock,
  AdIcon,
  AdLogo,
  AdRadioButton,
  type DockItemInterface,
} from 'atomic'
import {
  checkIsStaff,
  localStorageGetItem,
  localStorageSetItem,
  NucFriendship,
  sessionStorageGetItem,
} from 'modules'
import { useTranslation } from 'react-i18next'
import { positions } from '../atomic/organism/dock/constants/positions'
import { NucShare } from '../modules/nuc_share'
import { NucTerminal } from '../modules/nuc_terminal'
import { getDockItems } from './constants'

import './_index.scss'

/**
 * FIXME: NucTerminal is not yet ported to Next.js.
 * Creating a local mock for now.
 */
const NucTerminalMock = ({ position }: { position: PositionType }) => null

const LOCAL_STORAGE_KEY = 'dock-position'

export const NucDock = () => {
  const params = useParams()
  const { t } = useTranslation()
  const lang = (params?.lang as string) || 'en'

  const [position, setPosition] = useState<PositionType>('bottom')
  const [isStaff, setIsStaff] = useState(false)

  const itemTemplate = (item: DockItemInterface) => {
    if (item.logo) {
      return (
        <Link href={item.url || '#'} aria-label={item.label}>
          <AdLogo adType="main" />
        </Link>
      )
    }

    if (item.icon && (item.url || item.click)) {
      return (
        <Link
          href={item.url || '#'}
          aria-label={item.label}
          onClick={(e) => {
            if (item.click) {
              if (!item.url) e.preventDefault()
              item.click()
            }
          }}
          title={item.label}
        >
          <AdIcon
            icon={item.icon}
            className="item"
            adType={item.adType}
            size="1.7em"
          />
        </Link>
      )
    }

    if (item.icon && !item.url && !item.click) {
      return (
        <span title={item.label}>
          <AdIcon
            icon={item.icon}
            className="item disabled-item"
            size="1.7em"
          />
        </span>
      )
    }

    if (item.label === 'position') {
      return (
        <div className="dock-position-buttons">
          {positions.map((pos) => (
            <AdRadioButton
              key={pos.value}
              value={pos.value}
              checked={position === pos.value}
              onChange={() => setPosition(pos.value)}
              className={`${pos.value} flex`}
              adType="main"
              unstyled
            />
          ))}
        </div>
      )
    }

    return null
  }

  const dockItems = useMemo(() => {
    const items = getDockItems(lang, t)
    return items.map((item) => ({
      ...item,
      template: () => itemTemplate(item),
    }))
  }, [lang, t, position])

  const setDockPositionForScreenSize = () => {
    if (window.innerWidth === 992) {
      setPosition('bottom')
    }
  }

  useEffect(() => {
    const savedPosition = localStorageGetItem(LOCAL_STORAGE_KEY)
    if (savedPosition) {
      setPosition(savedPosition as PositionType)
    }

    const userRole = sessionStorageGetItem('user_role')
    if (userRole) {
      setIsStaff(checkIsStaff(userRole))
    }

    window.addEventListener('resize', setDockPositionForScreenSize)
    return () => {
      window.removeEventListener('resize', setDockPositionForScreenSize)
    }
  }, [])

  useEffect(() => {
    localStorageSetItem(LOCAL_STORAGE_KEY, position)
  }, [position])

  return (
    <>
      <div className={`${position} nuc-dock-popovers`}>
        <NucShare position={position} />
        <NucFriendship position={position} />
        <NucTerminalMock position={position} />
      </div>

      <AdDock
        model={dockItems}
        position={position}
        className={isStaff ? 'staff' : ''}
      />
    </>
  )
}

export default NucDock
