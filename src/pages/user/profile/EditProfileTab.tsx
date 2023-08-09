
import { UserRepository } from "@amityco/ts-sdk"
import { Button, Input, InputGroup, InputRightElement, Radio, RadioGroup, Textarea, useToast } from "@chakra-ui/react"

import { ChangeEvent, ChangeEventHandler, useState } from "react"
import { AiOutlineCheckCircle } from 'react-icons/ai'
import RowProfileLayout from "../../../components/Profile/RowProfileLayout"
import DateTimePattern from "../../../models/constants/DateTimePattern"
import { UpdateUserInformation } from "../../../models/user/user.dto"
import UserMetadata, { Gender } from "../../../models/user/user.metadata"
import { auth } from "../../../services/firebase/firebase.service"
import { formatDate } from "../../../utils/handler/utils"

type EditProfileTabProps = {
    user?: Amity.User,
    onUpdate?: (updatedInformation:Amity.User) => void;
}

export default function EditProfileTab(props: EditProfileTabProps) {
    const currentUser = auth.currentUser;
    const { user } = props;
    const userMetadata = user?.metadata as UserMetadata;

    const toast = useToast();;

    // const [updateInforForm, setUpdateInfoForm] = useState<UpdateUserInformation>({

    // });

    const [updateInforForm, setUpdateInfoForm] = useState<UpdateUserInformation>({
        displayName: user?.displayName,
        description: user?.description,
        // ...userMetadata
        ...userMetadata,
    })
    // : UpdateUserInformation = 
    // {
    //     displayName: user?.displayName,
    //     description: user?.description,
    //     // ...userMetadata
    //     ...userMetadata,
    // }

    const handleUpdateUserInformation = async () => {
        console.log("Submit data: " + JSON.stringify(updateInforForm))
        const { displayName, description, ...rest } = updateInforForm;
        let msg = "";
        let updateStatus: "success" | "info" | "warning" | "error" | "loading" = "success";
        try {
            const updatedUser = await UserRepository.updateUser(currentUser?.uid ?? '', {
                displayName,
                description,
                metadata: rest,
            })
            console.log("User updated: " + JSON.stringify(updatedUser.data));
            msg = "Update information successfully";
            if (props.onUpdate) {
                props.onUpdate!(updatedUser.data);
            }
        }
        catch (e) {
            updateStatus = "error";
            msg = "Error update user information!";
        }
        finally {
            toast({
                position: 'bottom-right',
                isClosable: true,
                duration: 3000,
                status: updateStatus,
                title: msg,
                size: ''
            });
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const field = e.target.name;
        // @ts-ignore
        setUpdateInfoForm({
            ...updateInforForm,
            [field]: e.target.value,
        })
        // updateInforForm[field] = e.target.value;
        // console.log("new form updated: "+JSON.stringify(updateInforForm))
    }
    console.log(userMetadata.dob ? formatDate(userMetadata.dob!, DateTimePattern.YMD) : undefined);

    return (
        <div className="flex justify-center">
            <div className="flex flex-col border-gray-400 border-[2px] rounded-2xl w-full max-w-4xl p-4">
                <RowProfileLayout title="ID:"><Input value={user?._id} disabled /></RowProfileLayout>
                <RowProfileLayout title="Họ và tên:">
                    <Input name="fullname" value={updateInforForm.fullname} onChange={handleChange} />
                </RowProfileLayout>
                {/* <RowProfileLayout title="Tên hiển thị:">
                    <Input name="displayname" value={updateInforForm.displayname} onChange={handleChange} />
                </RowProfileLayout> */}
                <RowProfileLayout title="Tên hiển thị:">
                    <Input type="text" name="displayName" value={updateInforForm.displayName} onChange={handleChange} />
                </RowProfileLayout>
                <RowProfileLayout title="Ngày sinh:">
                    <Input name="dob" type="date"
                        value={userMetadata.dob ? formatDate(userMetadata.dob!, DateTimePattern.YMD) : undefined}
                        onChange={e => {
                            const dobTimestamp = new Date(e.target.value).getTime();
                            updateInforForm.dob = dobTimestamp;
                        }}
                    />
                </RowProfileLayout>
                <RowProfileLayout title="Giới tính:">
                    <RadioGroup defaultValue={userMetadata.gender} onChange={(value) => {
                        updateInforForm.gender = value as Gender;
                    }}>
                        <div className="flex gap-x-1">
                            <Radio value="male">Nam</Radio>
                            <Radio value="female">Nữ</Radio>
                            <Radio value="other">Khác</Radio>
                        </div>
                    </RadioGroup>
                </RowProfileLayout>
                <RowProfileLayout title="Email:">
                    <InputGroup>
                        <Input type="email" value={currentUser?.email ?? ''} disabled />
                        {currentUser?.emailVerified && <InputRightElement>
                            <AiOutlineCheckCircle size={24} color="green" />
                        </InputRightElement>}
                    </InputGroup>
                </RowProfileLayout>
                <RowProfileLayout title="Địa chỉ:"><Input name="address" value={updateInforForm.address} onChange={handleChange} /></RowProfileLayout>
                <RowProfileLayout title="Số điện thoại:"><Input name="phone" value={updateInforForm.phone} type="number" onChange={handleChange} /></RowProfileLayout>
                <RowProfileLayout title="Giới thiệu bản thân:"><Textarea name="description" value={updateInforForm?.description} onChange={handleChange} placeholder="Mô tả về bản thân" /></RowProfileLayout>
                <div className="flex justify-center mt-3">
                    <Button colorScheme="blue" onClick={handleUpdateUserInformation} disabled>Lưu thay đổi</Button>
                </div>

            </div>
        </div>
    )
}
