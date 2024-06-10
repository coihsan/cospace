'use client'
import React from 'react'
import { useModal } from '@/providers/modal-provider'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import CustomModal from '@/components/global/custom-modal'
import Workflowform from '@/components/forms/workflow-form'

const WorkflowButton = () =>{
    const handleClick = () =>{
        <CustomModal
        title="Create a Workflow Automation"
        subheading="Workflows are a powerfull that help you automate tasks."
      >
        <Workflowform />
      </CustomModal>
    }
    return(
        <Button
        size={'icon'}
        >
            <Plus />
        </Button>
    )
}

export default WorkflowButton