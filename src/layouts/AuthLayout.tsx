
import { Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-2" style={{
            background: 'linear-gradient(180deg, #163B57 0%, rgba(22, 59, 87, 0.69) 33.65%, rgba(22, 59, 87, 0.35) 65.42%, rgba(22, 59, 87, 0.00) 100%)'
        }}>
            {/* Left Content */}
            < div className="flex flex-col col-span-1 px-24 py-10">
                <Link className="flex justify-center" to={'/'}>
                    <Image className="object-contain" width={300} height={225} alt="1C_logo" src='/images/1C_Innovation_logo.png' />
                </Link>

                <h4 className="text-white text-[18px] font-semibold">1C: DIỄN ĐÀN</h4>
                <h1 className="text-gray-300 text-4xl font-medium my-2">Nơi mọi người kết nối và chia sẻ mọi điều trong cuộc sống</h1>
                <div className="flex flex-col w-full my-40 bg-[#202433] py-8 px-10 rounded-lg" style={{ boxShadow: '10px 10px 0px 0px rgba(32, 36, 51, 0.35)' }}>
                    <h3 className="text-white text-xl font-semibold">1C Innovation</h3>
                    <div className="flex flex-row items-center my-5">
                        <div className="rounded-full border-4 border-blue-500 mr-2">
                            <Image className="rounded-full bg-white" width={48} height={48} src="/images/avatar_place_holder.png" alt={'user_logo'} />
                        </div>

                        <div className="flex flex-col flex-grow justify-center space-y-2">
                            <h3 className="text-white text-sm font-medium">Nguyễn Ngọc Yên</h3>
                            {/* <span className="text-[#8D8080] text-xs">6h ago</span> */}
                        </div>
                        {/* <FiMoreHorizontal size={24} /> */}
                    </div>

                    <p className="text-white text-sm font-medium italic">
                        <span className="text-2xl">“ </span> HTML là một ngôn ngữ đánh dấu được thiết kế ra để tạo nên các trang web trên World Wide Web. Nó có thể được trợ giúp bởi các công nghệ như CSS và các ngôn ngữ kịch bản giống như JavaScript. <span className="text-2xl"> ”</span></p>
                </div>
                <div className=" flex items-center space-x-2 rounded-lg">
                    <span className="text-[#202433] text-xs font-semibold">PRIVACY POLICY</span>
                    <span className="text-[#202433] text-xs font-semibold">&#x2022;</span>
                    <span className="text-[#202433] text-xs font-semibold">TERMS OF SERVICES</span>
                </div>

            </div>
            {/* Right Content */}
            < div className="col-span-1">
                {children}
            </div>
        </div >
    )
}