import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = { name: string };
type ResonseType = Id<"workspaces"> | null;

type Options = {
    onSuccess?: (data: ResonseType) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    throwError?: boolean
}

export const useCreateWorkspace = () => {
    const [data, setData] = useState<ResonseType>(null);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<"success" | "error" | "settled" | "pending" | null>(null)

    const isSuccess = useCallback(() => status === 'success', [status])
    const isError = useCallback(() => status === 'error', [status])
    const isSettled = useCallback(() => status === 'settled', [status])
    const isPending = useCallback(() => status === 'pending', [status])


    const mutation = useMutation(api.workspaces.create)

    const mutate = useCallback(async (values: RequestType, options?: Options) => {
        try {
            setData(null)
            setError(null)
            setStatus('pending')

            const response = await mutation(values)
            options?.onSuccess?.(response)
            setStatus('success')
            return response
        } catch (error) {
            options?.onError?.(error as Error)
            setError(error as Error)
            setStatus('error')
            if (options?.throwError) {
                throw error
            }
        } finally {
            setStatus('settled')
            options?.onSettled?.()
        }
    }, [mutation])

    return { mutate, data, error, isError, isPending, isSettled, isSuccess } as const

}