import { useEffect } from 'react'

import { AdPopover } from 'atomic'
import { isMobile } from '../nuc_media/utils/is_mobile'
import { useShareRequests } from './atomic/utils/requests'
import { NucSharePopover } from './components/share-popover'
import './_index.scss'

export function NucShare({ position }) {
  const { loading, loadAll } = useShareRequests()

  useEffect(() => {
    loadAll()
  }, [loadAll])

  if (loading) return null

  return (
    <AdPopover
      dismissable
      icon="prime:inbox"
      position={position}
      popoverClass="share-inbox-popover"
      buttonText={isMobile() ? '' : 'Share Inbox'}
      buttonClass="share-inbox-toggle"
    >
      <NucSharePopover />
    </AdPopover>
  )
}
