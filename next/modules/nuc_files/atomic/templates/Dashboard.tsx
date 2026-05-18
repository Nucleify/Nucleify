'use client'

import React, { useState } from 'react'

import { useFileFields } from '../bosons/constants'
import type { NucFileObjectInterface } from '../bosons/types'
import { useFileRequests } from '../bosons/utils'

interface NucFileDashboardProps {
  data: NucFileObjectInterface[]
  getData: () => Promise<void>
  loading: boolean
}

type DialogAction = 'show' | 'create' | 'edit' | 'delete'

interface DialogState {
  visible: boolean
  action: DialogAction
  selectedObject: NucFileObjectInterface | null
}

export default function NucFileDashboard({
  data,
  getData,
  loading,
}: NucFileDashboardProps) {
  const { createAndEditFields, showFields } = useFileFields()

  const [dialog, setDialog] = useState<DialogState>({
    visible: false,
    action: 'show',
    selectedObject: null,
  })

  function openDialog(action: DialogAction, item?: NucFileObjectInterface) {
    setDialog({ visible: true, action, selectedObject: item ?? null })
  }

  function closeDialog() {
    setDialog((prev) => ({ ...prev, visible: false, selectedObject: null }))
  }

  const { deleteFile, storeFile, editFile } = useFileRequests(closeDialog)

  return (
    <section id="files">
      {/* Table — data list */}
      <div className="entity-datatable-card">
        <div className="entity-datatable-header">
          <span>Manage Files</span>
          <button onClick={() => openDialog('create')}>New File</button>
        </div>

        <table>
          <thead>
            <tr>
              {showFields.map((field) => (
                <th key={field.key}>{field.label}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={showFields.length + 1}>Loading…</td>
              </tr>
            )}
            {!loading &&
              data.map((item) => (
                <tr key={item.id}>
                  {showFields.map((field) => (
                    <td key={field.key}>
                      {String(toRecord(item)[field.key] ?? '')}
                    </td>
                  ))}
                  <td>
                    <button onClick={() => openDialog('show', item)}>
                      Show
                    </button>
                    <button onClick={() => openDialog('edit', item)}>
                      Edit
                    </button>
                    <button onClick={() => openDialog('delete', item)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Dialog */}
      {dialog.visible && (
        <div className="dialog-overlay">
          <div className="dialog">
            {dialog.action === 'show' && dialog.selectedObject && (
              <>
                <h3>File Details</h3>
                {showFields.map((field) => (
                  <div key={field.key}>
                    <strong>{field.label}:</strong>{' '}
                    {String(toRecord(dialog.selectedObject)[field.key] ?? '')}
                  </div>
                ))}
                <button onClick={closeDialog}>Close</button>
              </>
            )}

            {dialog.action === 'delete' && dialog.selectedObject && (
              <>
                <h3>Delete File</h3>
                <p>Are you sure you want to delete this file?</p>
                <button
                  onClick={() => {
                    if (dialog.selectedObject?.id !== undefined) {
                      deleteFile(dialog.selectedObject.id, getData)
                    }
                  }}
                >
                  Confirm
                </button>
                <button onClick={closeDialog}>Cancel</button>
              </>
            )}

            {(dialog.action === 'create' || dialog.action === 'edit') && (
              <FileForm
                action={dialog.action}
                initialData={dialog.selectedObject}
                fields={createAndEditFields}
                onSubmit={(formData) => {
                  if (dialog.action === 'create') {
                    storeFile(formData, getData)
                  } else {
                    editFile(formData, getData)
                  }
                }}
                onCancel={closeDialog}
              />
            )}
          </div>
        </div>
      )}
    </section>
  )
}

// ---------------------------------------------------------------------------
// Local form component
// ---------------------------------------------------------------------------

interface FileFormProps {
  action: 'create' | 'edit'
  initialData: NucFileObjectInterface | null
  fields: readonly { name: string; label: string; type?: string }[]
  onSubmit: (data: NucFileObjectInterface) => void
  onCancel: () => void
}

function toRecord(val: unknown): Record<string, unknown> {
  return (val !== null && typeof val === 'object' ? val : {}) as Record<
    string,
    unknown
  >
}

function FileForm({
  action,
  initialData,
  fields,
  onSubmit,
  onCancel,
}: FileFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {}
    for (const f of fields) {
      defaults[f.name] = String(toRecord(initialData)[f.name] ?? '')
    }
    return defaults
  })

  function handleChange(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({
      ...initialData,
      ...(formData as unknown as NucFileObjectInterface),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{action === 'create' ? 'Create File' : 'Edit File'}</h3>
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={`file-field-${field.name}`}>{field.label}</label>
          <input
            id={`file-field-${field.name}`}
            type="text"
            value={formData[field.name] ?? ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        </div>
      ))}
      <button type="submit">Confirm</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  )
}
