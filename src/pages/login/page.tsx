''

import { SignInStatus, signIn, SignInMethod } from "../../services/auth/auth.service";
import { Checkbox, FormControl, FormErrorMessage, FormHelperText, FormLabel, Icon, Input, Image } from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import { auth } from "../../services/firebase/firebase.service";

type SignInFormData = {
    email?: string,
    password?: string,
}

function LoginOptionButton(props: { icon: JSX.Element, description: string }) {
    return (
        <button className="flex flex-row justify-center items-center bg-white rounded w-full py-3">
            <div className="w-6 h-6">
                {props.icon}
            </div>

            <span className="text-[#202433] text-base font-semibold ml-2 mt-1">{props.description}</span>

        </button>
    )
}

export default function LoginPage() {
    const [input, setInput] = useState('')
    const router = useHistory();

    //check and redirect if user exists
    const firebaseUser = auth.currentUser;
    if (firebaseUser) {
        router.push("/");
    }

    const [signInMsg, setSignInMsg] = useState('');
    useEffect(() => {
        console.info("Message change")
        if (signInMsg.length != 0) {
            setTimeout(() => {
                setSignInMsg('');
            }, 1000)
        }
    }, [signInMsg])

    const [signInForm, setSignInForm] = useState<SignInFormData>({});
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        console.log(event.target.value);

        setSignInForm((prev) => {
            console.log("Update sign in information")

            return ({
                ...prev,
                [event.target.name]: event.target.value,
            })
        }
        )
    }

    const submitForm = () => {
        console.log(`Sign in with data: ${JSON.stringify(signInForm)}`)
        signIn(SignInMethod.CREDENTIAL, {
            email: signInForm.email ?? '',
            password: signInForm.password ?? '',
        }).then((result) => {
            if (result !== SignInStatus.SUCCESS) {
                setSignInMsg('Tài khoản đăng nhập không đúng!');
            } else {
                router.goBack();
            }
        })
    }

    const isError = false;
    return (
        <AuthLayout>
            <div className="flex flex-col p-[120px] space-y-5">
                <h3 className="text-white text-[32px] font-semibold">Đăng nhập</h3>
                <p className="text-gray-200  text-base ">Bạn có thể đăng nhập bằng tài khoản đã đăng ký hoặc bạn có thể đăng nhập nhanh bằng Google.</p>
                <FormControl isInvalid={isError} className="space-y-[30px]">
                    <div className="flex flex-col">
                        <FormLabel className="text-white text-base font-semibold">Email</FormLabel>
                        <Input name="email" type='email' placeholder="Email"
                            // value={input} 
                            bgColor={'#33394F'} padding={6} border={'none'}
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
                        <Input name="password" type='password' placeholder="Mật khẩu"
                            // value={input} 
                            bgColor={'#33394F'} padding={6} border={'none'}
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
                        <span className="text-white font-semibold text-base"> Nhớ mật khẩu</span>
                    </div>
                    <button className="bg-[#163B57] rounded w-full p-3 text-white font-semibold text-base"
                        onClick={(e) => {
                            e.preventDefault();
                            console.log("submit")
                            submitForm();
                        }}
                    >Đăng nhập</button>
                    <div className="flex flex-row justify-center space-x-1 text-base font-semibold">
                        <span className="text-gray-300">Chưa có tài khoản?</span>
                        <Link to={'/signup'}>
                            <span className="text-gray-600">Đăng ký</span>
                        </Link>
                    </div>



                </FormControl>
                <div className="flex flex-row">
                    <div className="bg-[#33394F] h-[2px] w-full text-center my-auto flex-grow"></div>
                    <span className="text-white text-base font-semibold mx-3">hoặc</span>
                    <div className="bg-[#33394F] h-[2px] w-full text-center my-auto flex-grow"></div>
                </div>
                <div
                    onClick={() => signIn(SignInMethod.GOOGLE).then((result=>{
                        if(result===SignInStatus.SUCCESS){
                            router.goBack();
                        }
                    }))}
                >
                    <LoginOptionButton icon={(<img  src="/logos/icons-google-48.png" alt="google_icon" />)} description="Đăng nhập với tài khoản Google"
                    />
                </div>

                <LoginOptionButton icon={(<img  src="/logos/icons-facebook-48.png" alt="facebook_icon" />)} description="Đăng nhập với tài khoản Facebook" />
            </div>
        </AuthLayout>
    )
}

function useAuthContext(): { firebaseUser: any; } {
    throw new Error("Function not implemented.");
}
