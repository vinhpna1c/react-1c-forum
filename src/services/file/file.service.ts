
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

const getFileUrlById = async (fileID: string) => {
    if(fileID.length===0){
        return undefined;
    }
    const file = await FileRepository.getFile(fileID);
    if (file) {
        return file.data.fileUrl;
    }
    return undefined;
}


export {
    uploadSingleFileToAmity,
    getFileUrlById,
}