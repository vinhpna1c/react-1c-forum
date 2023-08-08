type TagDivProps = {
    tag: string;
}

export default function TagDiv(props: TagDivProps) {
    return (
        <div className='whitespace-nowrap rounded-3xl bg-[#F4F6F8]'>
            <h3 className='px-2 py-1 text-[#1a2033] text-xs font-semibold font-sans'>#{props.tag}</h3>
        </div>
    )
}