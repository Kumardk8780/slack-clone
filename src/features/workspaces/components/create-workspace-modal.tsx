import React, { useState } from "react"
import { useCreateWorkspace } from "../api/use-create-workspace"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const CreateWorkspaceModal = () => {
    const [open, setOpen] = useCreateWorkspaceModal()
    const [name, setName] = useState("")
    const router = useRouter();

    const { mutate, isPending } = useCreateWorkspace();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate({ name }, {
            onSuccess: (id) => {
                toast.success("Workspace created")
                router.push(`/workspace/${id}`)
                handleClose()
            }
        })
    }

    const handleClose = () => {
        setOpen(false)
        setName("")
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add a workspace
                    </DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Workspace name e.g. 'Work', 'Personal', 'Home' "
                        disabled={isPending}
                        required
                        autoFocus
                        minLength={3}
                    />
                    <div className="flex justify-end">
                        <Button disabled={isPending}>
                            Create
                        </Button>
                    </div>
                </form>

            </DialogContent>
        </Dialog>
    )
}