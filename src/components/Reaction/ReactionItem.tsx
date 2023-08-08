type ReactionItemProps = {
    icon: JSX.Element,
    reactionCount?: number | string,
}
function ReactionItem(props: ReactionItemProps) {
    return (
        <div className="flex flex-row space-x-1 items-center gap-1">
            {props.icon}
            <span className="text-[#3F4354] text-[10px]">{props.reactionCount}</span>
        </div>
    )
}

export default ReactionItem