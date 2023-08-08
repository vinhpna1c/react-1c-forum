
import { GoDotFill } from 'react-icons/go';

import { useEffect, useState } from "react"

//Amity
import { UserRepository, FileRepository } from '@amityco/ts-sdk';
import CategoryDiv from '../Category/CategoryDiv';
import TagDiv from '../Tag/TagDiv';
import { Tooltip } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type PostItemProps = {
    //Amity
    thumbnail?: string,
    title?: string,
    username?: string,
    avatar?: string,
    postedAt: string,
    timePostedAt: string,
    profesional?: string,
    content?: string,
    totalComment: string | number,
    ReactionCount: string | number,
    Code?: string | number,
    reacted?: boolean,
    postedUser: string,
    tags?: string[],
    categories?: string[]
}

const PostsCard = (props: PostItemProps) => {
    const { categories, tags, thumbnail, title, postedUser, Code, username, avatar, postedAt, timePostedAt, profesional, content, totalComment, ReactionCount, reacted } = props

    const [user, setUser] = useState<Amity.User>();
    const path = "/thread/" + Code

    useEffect(() => {
        const unsubscribe = UserRepository.getUser(postedUser, response => {
            setUser(response.data)
        });
        unsubscribe();
    }, []);

    return (
        <div className="flex p-2 justify-between">
            <Link to={path}>
                <div className='h-[160px] w-[160px] '>
                    <img className="w-full h-full rounded-2xl border shadow-2xl  object-cover" src={thumbnail} alt={title} />
                </div>

            </Link>
            <div className="flex flex-col flex-grow justify-between ml-3">
                <div className='flex flex-col'>
                    {/* content */}
                    <Link to={path}>
                        <Tooltip label={title} color={'black'} bg={'gray.200'}>
                            <p className="font-sans text-lg font-semibold max-h-[60px] text-ellipsis overflow-hidden">{title}</p>
                        </Tooltip>

                    </Link>
                    {/* cate */}
                    <div className='flex flex-wrap gap-3'>
                        {categories
                            ?
                            categories.map((category, index) => {
                                return (
                                    <Link key={index} to={`/tag/${category}`}>
                                        <CategoryDiv category={category} />
                                    </Link>

                                )
                            })
                            :
                            <></>
                        }
                    </div>

                    {/* tag */}
                    <div className='flex flex-wrap gap-2 mt-1'>
                        {tags
                            ?
                            tags.map((tag, index) => {
                                return (
                                    <Link key={index} to={`/tag/${tag}`}>
                                        <TagDiv tag={tag} />
                                    </Link>

                                )
                            })
                            :
                            <></>
                        }
                    </div>
                </div>

                {/* author detail */}
                <div className='flex justify-between items-center'>
                    <Link className='overflow-ellipsis' to={"/user/profile?id=" + postedUser}>
                        <div className=' flex gap-2 items-center'>
                            <img className='h-8 w-8 rounded-full object-contain' src={user?.avatarCustomUrl ?? ''} alt="" />
                            <span className='text-xs font-medium'>{username ? username : user?.displayName}</span>
                            <GoDotFill size={12} color='#C5D0E6' />
                        </div>
                    </Link>

                    <div className='flex gap-1 items-center'>
                        {/* <div className='text-xs font-sans text-[#97989D]'>{viewCount} Lượt xem</div> */}
                        <span className='text-xs font-sans text-[#97989D]'>{ReactionCount} Lượt thích</span>
                        <span className='text-xs font-sans text-[#97989D]'>{totalComment} Bình luận</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PostsCard