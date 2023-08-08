import { FiArrowRight } from 'react-icons/fi';
import "./styles.css"

import { useEffect, useState } from 'react';

import { FileRepository } from '@amityco/ts-sdk';

type CommunityItemProps = {
    Avatar?: string,
    name: string,
    memberCount?: number | string,
    description?: string,
    followCount?: number | string,
    postCount?: number | string
}

function CommunityItem(props: CommunityItemProps) {
    const { Avatar } = props
    const [imgURL, setImgURL] = useState("")

    useEffect(() => {
        try {
            if(Avatar){
                FileRepository.getFile(Avatar ?? "").then((item) => {
                    setImgURL(item.data.fileUrl + "?size=large")
                });
            }
      
        } catch (error) {
            console.log("Error get community image")
        }


    }, []);

    return (
        <div className='flex items-center justify-between w-full'>
            {props.Avatar
                ? <img className='w-8 h-8 object-cover rounded' src={imgURL} />
                : <img className='w-8 h-8 object-cover rounded' src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t1.6435-9/84481500_488747641823180_857236512633257984_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8631f5&_nc_ohc=caQIzw5X1bIAX-5KyQr&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfBznvGMt3d62w76I5ktYbt-CyD9YhR4uSEKPjMT2W2pSg&oe=64CDCD86" />
            }
            <div className='flex flex-col ml-3 w-[65%] justify-start'>
                {props.followCount
                    ? <div className="flex w-full justify-around">
                        <span className='mb-2 break-all text-xs font-semibold text-gray-600 w-[75%] block overflow-hidden whitespace-nowrap text-ellipsis'>{props.name}</span>
                        <div className='w-[15%] text-xs rounded button_background flex justify-center items-center'>{props.followCount}</div>
                    </div>
                    : <span className='w-full mb-2 break-all text-xs font-semibold text-gray-600 block overflow-hidden whitespace-nowrap text-ellipsis'>{props.name}</span>
                }
                {props.memberCount
                    ? <span className='text-[10px] font-normal text-gray-300 break-all block overflow-hidden whitespace-nowrap text-ellipsis'>{props.memberCount} thành viên</span>
                    :
                    props.description
                        ? <span className='text-[10px] font-normal text-gray-300 break-all block overflow-hidden whitespace-nowrap text-ellipsis'>{props.description}</span>
                        : <span className='text-[10px] font-normal text-gray-300 break-all block overflow-hidden whitespace-nowrap text-ellipsis'>{props.postCount} bài đăng</span>
                }

            </div>
            <FiArrowRight size={20} color='#97989D' />
        </div>
    )
}

export default CommunityItem;