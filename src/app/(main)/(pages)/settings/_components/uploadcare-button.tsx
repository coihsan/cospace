'use client'
import React, { useEffect, useRef } from 'react'
import * as LR from '@uploadcare/blocks'
import { useRouter } from 'next/navigation'
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';

type Props = {
  onUpload: (e: string) => any
}

LR.registerBlocks(LR)

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter()
  const ctxProviderRef = useRef<
    typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider
  >(null)

  useEffect(() => {
    const handleUpload = async (e: any) => {
      const file = await onUpload(e.detail.cdnUrl)
      if (file) {
        router.refresh()
      }
    }
    ctxProviderRef.current.addEventListener('file-upload-success', handleUpload)
  }, [onUpload, router])

  return (
      <div className=''>
      <lr-config
        ctx-name="my-uploader"
        pubkey="8c7cc9708b8fdcfc8980"
      />

      <lr-file-uploader-regular
        ctx-name="my-uploader"
        css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-regular.min.css`}
      />

      <lr-upload-ctx-provider
        ctx-name="my-uploader"
        ref={ctxProviderRef}
      />
    </div>
  )
}

export default UploadCareButton