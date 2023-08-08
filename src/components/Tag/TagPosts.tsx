
import { BsFillHeartFill } from 'react-icons/bs';
import NavigationButton from '../Button/NavigationButton';

function TagPosts() {
    return (
        <div className="flex flex-wrap max-w-full bg-[#F4F6F8] my-4 py-5 gap-3 justify-center rounded-3xl max-h-max p-2">
            <div className="w-[14%]">
                <img className="rounded-2xl border shadow-2xl h-full w-full" src="https://th.bing.com/th/id/OIP.-KFaE-t7-RdpBBuQM2wE4AHaEK?pid=ImgDet&rs=1" alt="" />
            </div>
            <div className="flex flex-col w-[83%]">
                {/* content */}
                <div className="flex flex-row flex-wrap gap-2 max-h-max justify-between">
                    <div className="w-[90%] font-sans text-lg font-semibold">Các phương pháp hay nhất dành cho nhà phát triển Blockchain về innovationchain Các phương pháp hay nhất dành cho nhà phát triển</div>
                    <div className="w-[5%] flex justify-center items-center">
                        <NavigationButton backgroundColor="#F4F6F8"><BsFillHeartFill color="#C5D0E6" size={23} /></NavigationButton>
                    </div>
                </div>
                {/* tag */}
                <div className='flex flex-wrap justify-start gap-3'>
                    <div className='whitespace-nowrap rounded-3xl bg-[#F4F6F8]'>
                        <h3 className='px-2 py-1 text-[#858EAD] text-xs font-semibold font-sans'>tài chính</h3>
                    </div>
                    <div className='whitespace-nowrap rounded-3xl bg-[#F4F6F8]'>
                        <h3 className='px-2 py-1 text-[#858EAD] text-xs font-semibold font-sans'>tiền ảo</h3>
                    </div>
                    <div className='whitespace-nowrap rounded-3xl bg-[#F4F6F8]'>
                        <h3 className='px-2 py-1 text-[#858EAD] text-xs font-semibold font-sans'>bitcoin</h3>
                    </div>
                </div>
                {/* author detail */}
                <div className='flex flex-wrap max-h-fit mt-8 justify-between'>
                    <div className='h-auto w-[25%] flex place-items-center gap-2'>
                        <div className='bg-[#F4F6F8] flex place-items-center'>
                            <img className='h-[40px] w-[48px] rounded-3xl' src="https://th.bing.com/th/id/R.33447b3a5e3b071de32ed190bbba418e?rik=ON6E%2fYRc41nhfA&riu=http%3a%2f%2fwww.booooooom.com%2fwp-content%2fuploads%2f2016%2f01%2fcelebrity4.jpg&ehk=lu1tBKsOj%2fBHJ1sD%2b3Xn7umf0Fv16hcQqNCoU%2fKdmkc%3d&risl=&pid=ImgRaw&r=0" alt="" />
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex'>
                                <div>
                                    Liem Luong Duy
                                </div>
                                <div className='pt-1'>
                                    {/* <GoDotFill color='#C5D0E6' /> */}
                                </div>
                            </div>
                            <div className='text-xs font-sans text-[#97989D]'>2 tuần trước</div>
                        </div>

                    </div>
                    <div className='w-50% flex mt-4 gap-[40px]'>
                        <div className='text-xs font-sans text-[#97989D]'>651,324 Lượt xem</div>
                        <div className='text-xs font-sans text-[#97989D]'>651,324 Lượt thích</div>
                        <div className='text-xs font-sans text-[#97989D]'>651,324 Bình luận</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TagPosts;