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
  }, [])

  return (
    <div>
      <FileUploaderRegular pubkey="8c7cc9708b8fdcfc8980" />
    </div>
  )
}

export default UploadCareButton