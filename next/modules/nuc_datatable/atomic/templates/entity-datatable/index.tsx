import { Button } from 'primereact/button'
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column'
import {
  DataTable,
  DataTableFilterEvent,
  DataTableFilterMeta,
  DataTableProps,
  DataTableRowClickEvent,
} from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import { Menu } from 'primereact/menu'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { NucEntityDataTableSkeleton } from '../entity-datatable-skeleton'

import { useTranslation } from 'react-i18next'
import type { ColumnInterface } from '../../../../../atomic/organism/data-table/types/interfaces'
import { useMenu } from '../../../../../atomic/organism/menu/utils/useMenu'
import type { OpenDialogFunctionType } from '../../../../../atomic/organism/select/types/interfaces'
import { useSelect } from '../../../../../atomic/organism/select/utils/use_select'
import { actions as actionsList, columns } from './constants'
import type { NucEntityDatatableInterface } from './types'

type TableRowData = Record<string, unknown> & { id: number }

interface ActionItem {
  icon: string
  click: (data: TableRowData) => void
}

interface NucEntityDataTableProps extends NucEntityDatatableInterface {
  onFiltersUpdate?: (filters: DataTableFilterMeta) => void
  onSelectedUpdate?: (selected: unknown[]) => void
}

interface ShareCheckboxProps {
  checked: boolean
  indeterminate?: boolean
  className?: string
  onToggle: () => void
}

const ShareCheckbox: React.FC<ShareCheckboxProps> = ({
  checked,
  indeterminate = false,
  className,
  onToggle,
}) => {
  const checkboxRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  return (
    <input
      ref={checkboxRef}
      type="checkbox"
      checked={checked}
      className={className}
      onChange={onToggle}
    />
  )
}

const useReactShareSelection = (items: TableRowData[] = []) => {
  const [selected, setSelected] = useState<Record<number, boolean>>({})

  const isAllSelected =
    items.length > 0 && items.every((item) => selected[item.id])
  const isIndeterminate =
    items.some((item) => selected[item.id]) && !isAllSelected

  const toggle = useCallback((id: number) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const toggleAll = useCallback(() => {
    if (isAllSelected) {
      setSelected({})
    } else {
      const newSelected: Record<number, boolean> = {}
      items.forEach((item) => {
        newSelected[item.id] = true
      })
      setSelected(newSelected)
    }
  }, [isAllSelected, items])

  const getSelectedItems = useCallback(() => {
    return items.filter((item) => selected[item.id])
  }, [items, selected])

  return {
    selected,
    isAllSelected,
    isIndeterminate,
    toggle,
    toggleAll,
    getSelectedItems,
  }
}

export const NucEntityDataTable: React.FC<NucEntityDataTableProps> = (
  props
) => {
  const { t } = useTranslation()

  const {
    adType,
    value,
    openDialog,
    enableShare,
    filters,
    rows = 10,
    loading,
    onFiltersUpdate,
    onSelectedUpdate,
    cellSelection,
    selectionMode,

    actions: propsActions,
    selectedObject: propsSelectedObject,

    ...restProps
  } = props

  const menuRef = useRef<Menu>(null)

  const fallbackOpenDialog: OpenDialogFunctionType = useCallback(
    () => undefined,
    []
  )
  const resolvedOpenDialog = useMemo<OpenDialogFunctionType>(
    () =>
      typeof openDialog === 'function'
        ? (action, data) => openDialog(action as ActionType, data as ObjectType)
        : fallbackOpenDialog,
    [openDialog, fallbackOpenDialog]
  )

  const actions = useMemo(() => {
    return actionsList((action, data) => resolvedOpenDialog(action, data))
  }, [resolvedOpenDialog])

  const { openMenu, selectedObject } = useMenu()

  const { selectItems } = useSelect(selectedObject, resolvedOpenDialog)

  const specificColumns = useMemo<readonly ColumnInterface[]>(() => {
    return columns[adType as keyof typeof columns] || []
  }, [adType])

  const skeletonRows = useMemo(() => Array.from({ length: rows }), [rows])

  const items = (value as TableRowData[]) || []

  const { selected, isAllSelected, isIndeterminate, toggle, toggleAll } =
    useReactShareSelection(items)

  useEffect(() => {
    if (onSelectedUpdate) {
      onSelectedUpdate(items.filter((item) => selected[item.id]))
    }
  }, [selected, onSelectedUpdate])

  const shareHeaderTemplate = () => (
    <ShareCheckbox
      checked={isAllSelected}
      indeterminate={isIndeterminate}
      className={`ad-checkbox-${adType}`}
      onToggle={toggleAll}
    />
  )

  const shareBodyTemplate = (rowData: TableRowData) => (
    <ShareCheckbox
      checked={!!selected[rowData.id]}
      className={`ad-checkbox-${adType}`}
      onToggle={() => toggle(rowData.id)}
    />
  )

  const filterTemplate = (
    options: ColumnFilterElementTemplateOptions,
    colHeader: string
  ) => (
    <InputText
      value={(options.value as string) || ''}
      placeholder={t('column-search-placeholder', { column: t(colHeader) })}
      onChange={(e) => options.filterApplyCallback(e.target.value)}
    />
  )

  const actionBodyTemplate = (rowData: TableRowData) => (
    <div className="action-column-content">
      {adType === 'activity' ? (
        <Button
          className="data-table-button"
          icon="pi pi-trash"
          rounded
          text
          loading={loading}
          onClick={() => openDialog?.('delete', rowData)}
        />
      ) : (
        <>
          {actions.map((action: ActionItem) => (
            <Button
              key={action.icon}
              className="desktop data-table"
              icon={action.icon.replace('prime:', 'pi pi-')}
              rounded
              text
              loading={loading}
              onClick={() => action.click(rowData)}
            />
          ))}
          <Button
            className="mobile data-table"
            icon="pi pi-bars"
            rounded
            text
            loading={loading}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              openMenu(menuRef.current, e, rowData)
            }
          />
          <Menu ref={menuRef} model={selectItems} popup />
        </>
      )}
    </div>
  )

  return (
    <>
      <DataTable
        className="entity-datatable"
        value={items}
        rows={rows}
        loading={loading}
        filters={filters as DataTableFilterMeta}
        onFilter={(e: DataTableFilterEvent) => onFiltersUpdate?.(e.filters)}
        onRowClick={(e: DataTableRowClickEvent) =>
          openDialog?.('show', e.data as TableRowData)
        }
        {...(restProps as DataTableProps<TableRowData[]>)}
      >
        {enableShare && (
          <Column
            className="share-checkbox-column"
            header={shareHeaderTemplate}
            body={shareBodyTemplate}
          />
        )}

        {specificColumns.map((col, index) => (
          <Column
            key={col.field ?? `${adType}-col-${index}`}
            field={col.field}
            header={t(col.header ?? '')}
            className={col.class}
            sortable={col.sortable}
            filter
            filterMatchMode="contains"
            filterElement={(options) =>
              filterTemplate(options, col.header ?? '')
            }
          />
        ))}

        <Column className="action-column" body={actionBodyTemplate} />
      </DataTable>

      <NucEntityDataTableSkeleton
        enableShare={enableShare}
        rows={skeletonRows}
        loading={loading}
        specificColumns={[...specificColumns]}
      />
    </>
  )
}
