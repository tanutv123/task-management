import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {ReactNode} from "react";
interface Props {
    open: boolean;
    setOpen: (state: boolean) => void;
    children?: ReactNode
}
export default function TableActionDialog({ open, setOpen, children } : Props){
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Action</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    {children}
                </div>
                <DialogFooter className="sm:justify-end">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}