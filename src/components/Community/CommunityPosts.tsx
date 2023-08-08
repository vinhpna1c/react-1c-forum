
function CommunityPosts() {
    return (
        <div className="flex flex-wrap max-w-full bg-[#F4F6F8] my-4 py-5 gap-3 justify-center rounded-3xl max-h-max p-2">
            <div className="w-[14%]">
                <img className="rounded-2xl border shadow-2xl h-full w-full" src="https://th.bing.com/th/id/R.c2656bd56d27b85fccfceb307298f28e?rik=vfgjAHxsh7UiSA&riu=http%3a%2f%2fimage.digitalinsightresearch.in%2fuploads%2fimagelibrary%2fcbr%2fjava.jpg&ehk=vn97rntDxEtOc3Cbaz4ljrRGWJJhTekLa6AxVl8q%2bDU%3d&risl=&pid=ImgRaw&r=0" alt="" />
            </div>
            <div className="flex flex-col gap-2 w-[83%]">
                {/* content */}
                <div className="flex flex-row flex-wrap gap-2 max-h-max justify-between">
                    <div className="w-[90%] font-sans text-lg font-semibold">Cộng đồng DeveloperJava Việt Nam</div>
                </div>
                {/* describe */}
                <div className='flex flex-wrap max-h-fit mt-8 justify-center'>
                    <div className='w-50% flex mt-4 gap-[40px] text-[#858EAD] text-xs font-semibold'>
                        <h1>Tự hào là Group chia sẻ kiến thức số 1 về Javascript tại Việt Nam: Node.js, Angular, Vue, React, FrontEnd, Fullstack. Tự hào là Group chia sẻ kiến thức số 1 về Javascript tại Việt Nam: Node.js, Angular, Vue, React, FrontEnd, Fullstack....</h1>
                    </div>
                </div>
                {/* comumunity detail */}
                <div className='flex flex-wrap max-h-fit mt-8 justify-center'>
                    <div className='w-50% flex mt-4 gap-[40px]'>
                        <div className='text-xs font-sans text-[#97989D]'>651,324 Thành viên</div>
                        <div className='text-xs font-sans text-[#97989D]'>651,324 Bài đăng</div>
                        <div className='text-xs font-sans text-[#97989D]'>Nhóm công khai</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CommunityPosts;