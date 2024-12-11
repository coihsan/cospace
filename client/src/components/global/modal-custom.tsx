import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { useModal } from "@/providers/modal-provider"
import { ReactNode } from "react"
import { Button } from "../ui/button";

type ModalCustomProps = {
    title: string;
    labelModal: ReactNode;
    description: string;
    children: ReactNode;
    defaultOpen?: boolean
}

const ModalCustom: React.FC<ModalCustomProps> = ({ title, description, children, labelModal, defaultOpen }) => {
    const { isOpen, setClose } = useModal()

    return (
        <Dialog
            open={isOpen || defaultOpen}
            onOpenChange={setClose}>
            <DialogTrigger>{labelModal}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}
export default ModalCustom