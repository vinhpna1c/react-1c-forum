
import { ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input } from "@chakra-ui/react";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EditorTool from "./EditorTool";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";


import { ChangeEvent, useState } from "react";

import Blockquote from "@tiptap/extension-blockquote";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import PostTargetType from "../../models/constants/PostTargetType";
import UploadFileType from "../../models/constants/UploadFileType";
import { uploadSingleFileToAmity } from "../../services/file/file.service";
import { auth } from "../../services/firebase/firebase.service";
import { CreatePostDTO } from "../../models/post/post.dto";
import { lowlight } from "lowlight";




type CPMProps = {
    callback?: () => void,
    targetID: string,
    postType: PostTargetType,
}

function CreatePostModal(props: CPMProps) {
    const { callback, targetID, postType } = props
    // console.log(communityID);

    //set up editor
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');

    //Add Cate
    const [categories, setCategories] = useState<string[]>([])

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
            }),
            Blockquote,
            CodeBlockLowlight.configure({
                lowlight,
            }),
            Link,
            Image.configure({
                allowBase64: true,
            }),
        ],
        content: '',
    })

    const submitPost = async () => {
        const currentUser = auth.currentUser;
        if (currentUser === null) {
            return false;
        }

        //Add Cate
        // var cate = [""]
        // Cate.forEach((item: { value: string, label: string }) => {
        //     cate.push(item.value)
        // })
        // cate.shift() //remove first element from array 

        //tags
        const tags: string[] = [];
        const tagArray = editor?.getHTML().split("#");
        tagArray?.shift();
        tagArray?.forEach(element => {
            const tagArrayRemoveBlank = element.split(" ");
            const cleanTagArray = tagArrayRemoveBlank[0].split("<");
            tags.push(cleanTagArray[0])
        });

        // TODO: set up thumbnail display and tags for post
        const postData: CreatePostDTO = {
            title,
            content: editor?.getHTML(),
            targetType: postType,
            targetID,
            thumbnailUrl: thumbnailUrl.length > 0 ? thumbnailUrl : undefined,
            tags: [],
            description,
            tagArray: tags
        };
        console.log("Post data: "+JSON.stringify(postData))
        // const post = await createPost(postData);
        // console.log("Created post: \n" + JSON.stringify(post));
    }

    const uploadFile = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            console.log("File data exists")
            console.log(JSON.stringify(files))
            if (files) {
                const file = files[0];
                uploadSingleFileToAmity(file, UploadFileType.IMAGE).then((uploadedFile) => {
                    console.log(JSON.stringify(uploadedFile));
                    setThumbnailUrl(uploadedFile.fileUrl)
                });
            }

        }

    }
    console.log(categories);

    return (
        <>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader className="flex justify-center">Tạo bài viết mới</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <EditorTool editor={editor} />
                    <h3 className="mb-1 font-medium">Tiêu đề</h3>
                    <Input placeholder="Tiêu đề bài viết" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <h3 className="mb-1 font-medium">Mô tả</h3>
                    <Input placeholder="Mô tả ..." value={description} onChange={(e) => setDescription(e.target.value)} />
                    <h3 className="my-1 font-medium">Thumbnail</h3>
                    <input type="file" name="Upload " placeholder="Upload thumbnail" onChange={uploadFile} accept="image/*"></input>
                    {
                        thumbnailUrl.length > 0 &&
                        <div className="flex justify-center">
                            <img className="h-[200px] object-contain" src={thumbnailUrl + "?size=large"} />
                        </div>

                    }
                    <h3 className="my-1 font-medium">Nội dung</h3>
                    <EditorContent className="prose h-[200px] overflow-y-auto border-gray-300 border-[1px] rounded-lg" editor={editor} onChange={() => console.log(editor?.getHTML())} />

                    {/* <Select
                        isMulti
                        name="Category"
                        options={Category}
                        placeholder="Danh mục"
                        closeMenuOnSelect={false}
                        onChange={(e) => setCategories(e)}
                    /> */}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={async () => {
                        await submitPost();
                        if (callback) {
                            callback!();
                        }

                    }}>
                        Đăng bài
                    </Button>
                </ModalFooter>
            </ModalContent>
        </>
    )
}

export default CreatePostModal;