

import { Checkbox, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { signUp } from "../../services/auth/auth.service";
import { useState, useEffect } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { Link } from "react-router-dom";


type SignUpFormData = {
    email: string,
    password: string,
    fullname: string
}

export default function SignUpPage() {
    const [signUpForm, setSignUpForm] = useState<SignUpFormData>({
        email: "",
        password: "",
        fullname: ""
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        console.log(event.target.value);

        setSignUpForm((prev) => {
            return ({
                ...prev,
                [event.target.name]: event.target.value,
            })
        }
        )
    }

    const [signUpMsg, setSignUpMsg] = useState('');
    useEffect(() => {
        console.info("Message change")
        if (signUpMsg.length != 0) {
            setTimeout(() => {
                setSignUpMsg('');
            }, 1000)
        }
    }, [signUpMsg])

    const submitForm = () => {

        signUp(signUpForm.email, signUpForm.password, signUpForm.fullname);
    }

    const isError = false;
    return (
        <AuthLayout>
            <div className="flex flex-col p-[120px] space-y-5">
                <h3 className="text-white text-[32px] font-semibold">Đăng ký</h3>
                <p className="text-gray-200  text-base ">Đăng ký một tài khoản mới để sử dụng và kết nối.</p>
                <FormControl isInvalid={isError} className="space-y-[30px]">
                    <div className="flex flex-col">
                        <FormLabel className="text-white text-base font-semibold">Họ và tên</FormLabel>
                        <Input name="fullname" type='text' placeholder="Full name" bgColor={'#33394F'} padding={6} border={'none'}
                            onChange={(e) => handleChange(e)}
                        />
                        {!isError ? (
                            <FormHelperText>
                                {/* Enter the email you'd like to receive the newsletter on. */}
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Fullname is required.</FormErrorMessage>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <FormLabel className="text-white text-base font-semibold">Email</FormLabel>
                        <Input name="email" type='email' placeholder="Email" bgColor={'#33394F'} padding={6} border={'none'}
                            onChange={(e) => handleChange(e)}
                        />
                        {!isError ? (
                            <FormHelperText>
                                {/* Enter the email you'd like to receive the newsletter on. */}
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Email is required.</FormErrorMessage>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <FormLabel className="text-white text-base font-semibold">Mật khẩu</FormLabel>
                        <Input name="password" type='password' placeholder="Mật khẩu" bgColor={'#33394F'} padding={6} border={'none'}
                            onChange={(e) => handleChange(e)}
                        />
                        {!isError ? (
                            <FormHelperText>
                                {/* Enter the password you'd like to receive the newsletter on. */}
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Password is required.</FormErrorMessage>
                        )}
                    </div>
                    <div className="flex space-x-2">
                        <Checkbox colorScheme="blackAlpha" defaultChecked />
                        <span className="text-white font-semibold text-base">Tôi đồng ý với các điều khoản và điều kiện</span>
                    </div>
                    <button className="bg-[#163B57] rounded w-full p-3 text-white font-semibold text-base"
                        onClick={(e) => {
                            e.preventDefault();
                            submitForm();
                        }}
                    >Đăng ký</button>
                    <div className="flex flex-row justify-center space-x-1 text-base font-semibold">
                        <span className="text-gray-400">Chưa có tài khoản?</span>
                        <Link to={'/login'}>
                            <span className="text-gray-600">Đăng nhập</span>
                        </Link>
                    </div>
                </FormControl>
            </div>
        </AuthLayout>
    )
}
