import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Lock } from "lucide-react"
import React from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import ModalCustom from "./modal-custom"

interface ShareDialogProps {
    params: {
        noteId: string
    },
}

const ShareDialog: React.FC = () => {

    return (
        <ModalCustom
            title="Share"
            description="Share your notes and make collaboration"
            labelModal={
                <Button>
                    <Lock />
                    Share
                </Button>
            }>
            <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                        Link
                    </Label>
                    <Input
                        id="link"
                        defaultValue="https://ui.shadcn.com/docs/installation"
                        readOnly
                    />
                </div>
                <Button type="submit" size="sm" className="px-3">
                    <span className="sr-only">Copy</span>
                    <Copy />
                </Button>
            </div>
        </ModalCustom>

    )
}
export default ShareDialog