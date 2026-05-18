'use client'

import React, { useEffect } from 'react'

import { NucFileDashboard } from '../templates'

import { useFileRequests } from '../bosons/utils'

export default function NucFilePage() {
  const { results, loading, getAllFiles } = useFileRequests()

  useEffect(() => {
    getAllFiles(true)
  }, [])

  return (
    <div className="panel-container">
      {/* Chart card placeholder — will be wired up when NucEntityChartCard is migrated */}

      <NucFileDashboard
        data={results}
        getData={getAllFiles}
        loading={loading}
      />
    </div>
  )
}
