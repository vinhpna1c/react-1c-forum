import { CircularProgress } from "@chakra-ui/react";

export default function LoadingIndicator() {
    return (
        <div className="flex justify-center w-full">
            <CircularProgress isIndeterminate color='grey' />
        </div>

    )
}