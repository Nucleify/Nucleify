import { DataTable } from 'primereact/datatable'
import type { JSX } from 'react'

import styles from './index.module.scss'

import { adTypePt } from '../../utils/ad_type'
import selectStyles from '../select/index.module.scss'
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

  const adTypeAttribute = adType ? { 'ad-type': adType } : {}

  const pt = {
    root: {
      className: cx(styles['ad-datatable'], className),
      'data-nuc-datatable': '',
      ...adTypePt(adType)?.root,
    },
    bodyRow: {
      className: styles['ad-datatable-row'],
    },
    headerContent: {
      className: styles['ad-datatable-column-header-content'],
    },
    paginator: {
      root: {
        className: cx(
          styles['ad-datatable-paginator-bottom'],
          styles['ad-datatable-paginator']
        ),
      },
      firstPageButton: {
        className: styles['ad-datatable-paginator-first'],
      },
      prevPageButton: {
        className: styles['ad-datatable-paginator-prev'],
      },
      nextPageButton: {
        className: styles['ad-datatable-paginator-next'],
      },
      lastPageButton: {
        className: styles['ad-datatable-paginator-last'],
      },
      current: {
        className: styles['ad-datatable-paginator-current'],
      },
      RPPDropdown: {
        root: {
          className: cx(
            selectStyles['ad-select'],
            styles['ad-datatable-paginator-rpp']
          ),
          ...adTypeAttribute,
        },
        input: {
          className: selectStyles['ad-select-label'],
        },
        trigger: {
          className: selectStyles['ad-select-dropdown'],
        },
        panel: {
          className: selectStyles['ad-select-overlay'],
          ...adTypeAttribute,
        },
        wrapper: {
          className: selectStyles['ad-select-list-container'],
        },
        list: {
          className: selectStyles['ad-select-list'],
        },
        item: {
          className: selectStyles['ad-select-option'],
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
