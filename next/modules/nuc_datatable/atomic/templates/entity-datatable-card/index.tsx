import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import type { DataTableFilterMeta } from 'primereact/datatable'
import { Skeleton } from 'primereact/skeleton'
import React, { useCallback, useMemo, useState } from 'react'

import { NucEntityDataTable } from '../entity-datatable'

import { useTranslation } from 'react-i18next'
import { AdHeading } from '../../../../../atomic/atom/heading'
import { columns } from '../entity-datatable/constants'
import { NucShareDialog } from './components/NucShareDialog'
import type { NucEntityDatatableCardInterface } from './types'

export const NucEntityDataTableCard: React.FC<
  NucEntityDatatableCardInterface
> = (props) => {
  const { t } = useTranslation()

  const [shareDialogVisible, setShareDialogVisible] = useState(false)
  const [selectedItems, setSelectedItems] = useState<unknown[]>([])
  const handleSelectedUpdate = useCallback((selected: unknown[]) => {
    setSelectedItems((prev) => {
      if (
        prev.length === selected.length &&
        prev.every((item, index) => item === selected[index])
      ) {
        return prev
      }
      return selected
    })
  }, [])
  type ColumnWithField = { field?: string }

  const specificColumns = useMemo(() => {
    return columns[props.adType as keyof typeof columns] || []
  }, [props.adType])

  const globalFilterFields = useMemo(() => {
    return specificColumns
      .map((col: ColumnWithField) => col.field)
      .filter((field: string | undefined): field is string => Boolean(field))
  }, [specificColumns])

  const disabledShareTypes = [
    'activity',
    'user',
    'card',
    'question',
    'link',
    'feature',
    'technology',
  ]

  const shareEnabled = useMemo(() => {
    return !disabledShareTypes.includes(props.adType as string)
  }, [props.adType])

  const [filters, setFilters] = useState(() => {
    const initialFilters: DataTableFilterMeta = {
      global: { value: '', matchMode: 'contains' },
    }
    specificColumns.forEach((col: ColumnWithField) => {
      if (col.field) {
        initialFilters[col.field] = { value: null, matchMode: 'contains' }
      }
    })
    return initialFilters
  })

  const headerTemplate = (
    <div className="nuc-entity-datatable-card-header-container">
      {props.loading ? (
        <>
          <Skeleton
            width="180px"
            height="32px"
            borderRadius="10px"
            className="heading-skeleton"
          />
          <div className="heading-actions-skeleton">
            {shareEnabled && (
              <Skeleton width="42px" height="42px" shape="circle" />
            )}
            <Skeleton width="42px" height="42px" shape="circle" />
          </div>
        </>
      ) : (
        <>
          <AdHeading tag={props.tag} text={props.headerText} />

          <div className="nuc-entity-datatable-card-header-actions">
            {props.adType !== 'activity' && (
              <Button
                icon="pi pi-share-alt"
                rounded
                text
                onClick={() => setShareDialogVisible(true)}
              />
            )}
            {props.adType !== 'activity' && (
              <Button
                icon="pi pi-plus"
                rounded
                text
                onClick={() => props.openDialog?.('create')}
              />
            )}
          </div>
        </>
      )}
    </div>
  )

  return (
    <>
      <Card className="nuc-entity-datatable-card" title={headerTemplate}>
        {props.value && (
          <NucEntityDataTable
            value={props.value}
            rows={10}
            rowsPerPageOptions={[10, 20, 50]}
            openDialog={props.openDialog}
            adType={props.adType}
            loading={props.loading}
            globalFilterFields={globalFilterFields}
            enableShare={shareEnabled}
            filters={filters}
            onFiltersUpdate={setFilters}
            filterDisplay="row"
            paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate={t('datatable-paginator', {
              first: '{first}',
              last: '{last}',
              totalRecords: '{totalRecords}',
            })}
            selection={selectedItems}
            onSelectedUpdate={handleSelectedUpdate}
          />
        )}
      </Card>

      <NucShareDialog
        visible={shareDialogVisible}
        onUpdateVisible={(val) => setShareDialogVisible(val)}
        adType={props.adType}
        selectedEntities={selectedItems}
      />
    </>
  )
}
