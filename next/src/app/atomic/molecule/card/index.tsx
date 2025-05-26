import { JSX } from 'react'

import Card from '@mui/material/Card'
import CardContentPart from './parts/card-content/index.tsx'

export default function AtomCard(): JSX.Element {
  return (
    <Card
      sx={{
        width: 300,
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardContentPart />
    </Card>
  )
}
