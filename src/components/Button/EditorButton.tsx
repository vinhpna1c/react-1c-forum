import { Tooltip } from "@chakra-ui/react";
import React from "react";

export type EditorButtonProps = {
    disable?: boolean
    editAction?: () => void,
    children?: React.ReactNode,
    toolTip?: string,
    isFocused?: boolean,
}

function EditorButton(props: EditorButtonProps) {
    const { children, editAction, disable, toolTip, isFocused } = props;
    return (
        <Tooltip label={toolTip}>
            <button
                onClick={() => {
                    if (editAction) {
                        editAction!()
                        console.log("Call action")
                    }
                }}
                className={`flex justify-center items-center ${isFocused ? 'bg-[#6db6ff]' : 'bg-white'} h-6 w-6 text-center rounded border-[1px] border-gray-600 mr-1 mb-1`}
            >
                {children}
            </button>
        </Tooltip>

    )
}

export default EditorButton;