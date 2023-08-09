
import CardLayout from '../CardLayout';
import { CommunityItem, TagItem } from "../../components"
import { Link } from 'react-router-dom';
import CategoryDiv from '../../components/Category/CategoryDiv';
import { Category } from '../../models/constants/Category';
import { auth } from '../../services/firebase/firebase.service';
import { featureList } from '../../utils/mock/community';


type tagData = {
    Code: string,
    Description: string,
}
// const tagData = ['Công nghệ', 'Tranh luận', 'Sách', 'Khoa học'];
const mockData = [
    { code: '001', description: 'Công nghệ' },
    { code: '002', description: 'Tranh luận' },
    { code: '003', description: 'Sách' },
    { code: '004', description: 'Khoa học' },
    { code: '005', description: 'Xe' },
    { code: '006', description: 'Kỹ thuật' },
    { code: '007', description: 'Giáo dục' },
    { code: '007', description: 'Lịch sử' },
    { code: '007', description: 'Du lịch' }
]


type LeftSectionProps = {
    communities: Amity.Community[],
}

export default function LeftSection(props: LeftSectionProps) {
    const isAuthenticated = auth.currentUser != null;

    return (
        <div className="flex flex-col gap-5">
            <CardLayout>
                <div className='flex flex-col space-y-3 m-2 '>
                    {featureList.map((feature, index) => {
                        if (index == 2) {
                            return (
                                isAuthenticated && <CommunityItem {...feature} key={index} followCount={props.communities.length} />
                            )
                        }
                        if (index == 0) {
                            return (
                                <Link key={index} to="/news">
                                    <CommunityItem {...feature} key={index} />
                                </Link>
                            )
                        }
                        return (
                            <CommunityItem {...feature} key={index} />
                        )
                    }
                    )}
                </div>
            </CardLayout>
            {/* loading category */}
            <CardLayout>
                <div className='flex flex-col m-2'>
                    <div className="flex mb-2 items-end " >
                        <span className='text-base text-gray-600 font-semibold' >Danh mục</span>
                    </div>
                    <div className='flex flex-wrap gap-x-2 gap-y-1'>
                        {Category.map((category, index) => {
                            return (
                                <Link key={index} to={`/category/${category.value}`} >
                                    <CategoryDiv category={category.label} />
                                </Link>
                            )
                        })}
                    </div>
                </div>


            </CardLayout >

            {isAuthenticated && <CardLayout>
                <div className='flex flex-col m-2'>
                    <div className="flex mb-2 items-end " >
                        <span className='text-base text-gray-600 font-semibold' >Cộng đồng của tôi</span>
                    </div>
                    <div className='flex flex-col space-y-3 '>
                        {props.communities.length === 0 && <h4>Bạn hiện đang không tham gia cộng đồng nào</h4>}
                        {props.communities.map((community, index) => {
                            var path = "/community/" + community.communityId;

                            return (
                                <Link key={community.channelId} to={path}>
                                    <CommunityItem name={community.displayName} Avatar={community.avatarFileId} description={community.description} memberCount={community.membersCount} />
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </CardLayout>
            }
        </div >

    )
}