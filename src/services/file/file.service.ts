
import UploadFileType from "../../models/constants/UploadFileType"
import { FileRepository } from "@amityco/ts-sdk"

const uploadSingleFileToAmity = async (file: File, type: UploadFileType) => {
    const formData = new FormData();
    formData.append('files', file);

    switch (type) {
        case UploadFileType.IMAGE:
            return (await FileRepository.createImage(formData)).data[0];
        case UploadFileType.VIDEO:
            return (await FileRepository.createVideo(formData)).data[0];
        default:
            return (await FileRepository.createFile(formData)).data[0];
    }


}


export {
    uploadSingleFileToAmity,
}