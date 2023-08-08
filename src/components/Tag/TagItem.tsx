import { FiArrowRight } from 'react-icons/fi';
// import "./styles.css"

// type TagItemProps = {
//     name: string,
//     PostsCount?: number | string,
//     description?: string,
//     followCount?: number | string
// }

// function TagItem(props: TagItemProps) {
//     return (
//         <div className='flex items-center justify-between w-full'>
//             <div className='flex flex-col ml-3 w-[65%] justify-start'>
//                 {props.followCount
//                     ? <div className="flex w-full justify-around">
//                         <span className='mb-2 break-all text-xs font-semibold text-gray-600 w-[75%] block overflow-hidden whitespace-nowrap text-ellipsis'>{props.name}</span>
//                         <div className='w-[15%] text-xs rounded button_background flex justify-center items-center'>{props.followCount}</div>
//                     </div>
//                     : <span className='w-full mb-2 break-all text-xs font-semibold text-gray-600 block overflow-hidden whitespace-nowrap text-ellipsis'>{props.name}</span>
//                 }
//                 {props.PostsCount
//                     ? <span className='text-[10px] font-normal text-gray-300 break-all block overflow-hidden whitespace-nowrap text-ellipsis'>{props.PostsCount} bài viết</span>
//                     :
//                     props.description
//                         ? <span className='text-[10px] font-normal text-gray-300 break-all block overflow-hidden whitespace-nowrap text-ellipsis'>{props.description}</span>
//                         : <></>
//                 }

//             </div>
//             <FiArrowRight size={20} color='#97989D' />
//         </div>
//     )
// }

type TagItemProps = {
    tag: string,
    imgUrl?: string,
}
export default function TagItem(props: TagItemProps) {
    return (
            <div className="flex items-center px-3 py-1 bg-gray-300 rounded-full hover:bg-blue-50 text-center">
                <img className="rounded-full w-6 h-6 object-cover mr-2" src={props.imgUrl ? props.imgUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2_Y0eBkxd5AxOn4MIBkaFWmkxip4y0L6W3V_AJ9h7GQ&s"} alt={props.tag} />
                <span className="text-smt- font-medium">{props.tag}</span>
            </div>
    )
}

// export default TagItem;
