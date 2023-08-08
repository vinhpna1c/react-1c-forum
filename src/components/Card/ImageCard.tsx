import { BsFillBookmarkFill, BsFillChatFill } from "react-icons/bs"
import { SlLike, SlDislike } from "react-icons/sl"
import { RiEditCircleFill } from 'react-icons/ri'
import CardLayout from '../../layouts/CardLayout';

type ImageCardItemProps = {
    caption: string,
    img: string,
    // totalComment: string | number,
    // likeCount: string | number,
    // dislikeCount: string | number
}

function ImageCard(props: ImageCardItemProps) {
    const { caption, img } = props

    return (
        <div className='basis-1/3 p-4'>
            <div className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' style={{ position: "relative" }}>
                <img className='h-52 w-full rounded-xl' src={img} alt="img" />
                <h1 className='text-[#5c5c5c] hover:text-[#8b8b8b] opacity-70 absolute' style={{ top: "10px", right: "20px" }}>  
                    <RiEditCircleFill size={30} />     
                </h1>
                {/* <div className=" bg-gray-800 opacity-70 mt-2 font-medium w-[full] text-[16px] p-3 text-white absolute bottom-0">
                    <h1>Some description text. Some dummy text here. Welcome to KindaCode.com to KindaCode.co</h1>
                </div> */}
            </div>

        </div>
    )
}

export default ImageCard