'use client'

import type { JSX } from 'react'

import { AdButton, AdCard, AdLabel } from 'nucleify'

import { NucColorPicker } from '../organism'

import { colorGroups } from '../boson/constants/list'
import { resetColorsToDefault } from '../boson/utils/reset_colors_to_default'

interface NucColorSettingsCardProps {
  heading?: string
}

export function NucColorSettingsCard({
  heading = 'Settings',
}: NucColorSettingsCardProps): JSX.Element {
  return (
    <AdCard title={heading}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '1rem',
        }}
      >
        <AdButton label="Reset colors" onClick={resetColorsToDefault} />
      </div>

      {colorGroups.map((group) => (
        <div key={group.name} style={{ marginBottom: '1rem' }}>
          <h4>{group.name}</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {group.items.map((item) => (
              <li
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  marginBottom: '.5rem',
                }}
              >
                <AdLabel label={item} forInput={item} />
                <NucColorPicker adType={item.toLowerCase() as AdTypeType} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </AdCard>
  )
}
