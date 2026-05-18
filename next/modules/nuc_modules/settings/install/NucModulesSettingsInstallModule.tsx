'use client'

import type { FileUploadFile } from 'primereact/fileupload'
import { useState } from 'react'

import { AdButton, AdDialog, AdFileUpload } from 'nucleify'

import { nucModulesApiUrl } from '../../utils/api_url'
import { useInstallModule } from './use_install_module'

import './_index.scss'

export interface NucModulesSettingsInstallModuleProps {
  onModuleInstalled?: () => void
}

export default function NucModulesSettingsInstallModule({
  onModuleInstalled,
}: NucModulesSettingsInstallModuleProps) {
  const [visible, setVisible] = useState(false)

  const { onBeforeSend, onUpload, onError } = useInstallModule(() => {
    setVisible(false)
    onModuleInstalled?.()
  })

  return (
    <>
      <AdButton
        adType="main"
        text
        rounded
        icon="prime:upload"
        className="install-module-button"
        type="button"
        onClick={() => setVisible(true)}
      />

      <AdDialog
        visible={visible}
        onHide={() => setVisible(false)}
        modal
        dismissableMask
        showHeader={false}
        className="install-module-dialog"
      >
        <AdFileUpload
          name="file"
          url={nucModulesApiUrl('/modules/install')}
          maxFileSize={1_000_000}
          withCredentials
          onBeforeSend={onBeforeSend}
          onUpload={onUpload}
          onError={onError}
          emptyTemplate={<span>Drag and drop files to here to upload.</span>}
          itemTemplate={(file, options) => {
            const f = file as FileUploadFile
            return (
              <div key={f.name}>
                <span>{f.name}</span>
                <div>{options.formatSize}</div>
              </div>
            )
          }}
        />
      </AdDialog>
    </>
  )
}
