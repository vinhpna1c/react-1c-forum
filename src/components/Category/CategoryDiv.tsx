type CategoryDivProps = {
    category: string;
}

export default function CategoryDiv(props: CategoryDivProps) {
    return (
        <div className='whitespace-nowrap rounded-[4px] bg-white text-center px-2 py-1' style={{ boxShadow: '0 0 2px 0px gray' }}>
            <h3 className='text-[#1a2033] text-xs font-normal '>{props.category}</h3>
        </div>
    )
}