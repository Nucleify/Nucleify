import { DataTable } from 'primereact/datatable'
import type { JSX } from 'react'

import styles from './index.module.scss'
import type { DataTableInterface } from './types/interfaces'

export function AdDataTable({
  className = '',
  adType,
  value,
  loading,
  rows = 10,
  paginator = true,
  showHeaders = true,
  stripedRows = true,
  rowHover = true,
  filters,
  onFilter,
  children,
  ...rest
}: DataTableInterface): JSX.Element | null {
  if (!value || loading) return null

  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  const adTypeAttribute = adType ? { 'data-ad-type': adType } : {}

  const pt = {
    root: {
      className: cx(styles['ad-datatable'], className),
      'data-nuc-datatable': '',
    },
    bodyRow: {
      className: styles['ad-datatable-row'],
    },
    paginator: {
      root: {
        className: styles['ad-datatable-paginator'],
      },
      content: {
        className: styles['ad-datatable-paginator-content'],
      },
      firstPageButton: { className: styles['ad-datatable-paginator-first'] },
      prevPageButton: { className: styles['ad-datatable-paginator-prev'] },
      nextPageButton: { className: styles['ad-datatable-paginator-next'] },
      lastPageButton: { className: styles['ad-datatable-paginator-last'] },
      pageButton: { className: styles['ad-datatable-paginator-current'] },

      rowsPerPageDropdown: {
        root: {
          className: styles['ad-select'],
          style: { display: 'flex', alignItems: 'center' },
          ...adTypeAttribute,
        },
        input: {
          className: styles['ad-select-label'],
        },
        trigger: {
          className: styles['ad-select-dropdown'],
        },
        panel: {
          className: styles['ad-select-overlay'],
          ...adTypeAttribute,
        },
        wrapper: {
          className: styles['ad-select-list-container'],
        },
        list: {
          className: styles['ad-select-list'],
        },
        item: {
          className: styles['ad-select-option'],
        },
      },
    },
  }

  return (
    // PrimeReact DataTable props union is overly strict when spreading `rest` with `pt`
    // @ts-expect-error — cellSelection overload mismatch with spread
    <DataTable
      {...rest}
      value={value}
      rows={rows}
      paginator={paginator}
      showHeaders={showHeaders}
      stripedRows={stripedRows}
      rowHover={rowHover}
      filters={filters}
      onFilter={onFilter}
      pt={pt}
      {...adTypeAttribute}
    >
      {children}
    </DataTable>
  )
}
