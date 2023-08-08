import { Editor } from "@tiptap/react";
import EditorButton, { EditorButtonProps } from "../Button/EditorButton";
import { ChangeEvent, useCallback, useMemo } from "react";
import { BsTypeBold, BsTypeItalic, BsTypeStrikethrough, BsCode, BsQuote, BsImage, BsParagraph } from 'react-icons/bs'
import { BiRedo, BiUndo, BiLink } from 'react-icons/bi'
import { VscListOrdered, } from 'react-icons/vsc'
import { PiListBullets } from 'react-icons/pi';
import { RiFormatClear } from 'react-icons/ri'
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4, LuHeading5, LuHeading6 } from 'react-icons/lu'
import { MdOutlineHorizontalRule, MdInsertPageBreak } from 'react-icons/md'
import { uploadSingleFileToAmity } from "../../services/file/file.service";
import UploadFileType from "../../models/constants/UploadFileType";



function EditorTool({ editor }: { editor: Editor | null }) {
  if (editor === null) {
    return <></>;
  }

  const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log("File data exists")
      console.log(JSON.stringify(files))
      if (files) {
        const file = files[0];
        const uploadedFile = await uploadSingleFileToAmity(file, UploadFileType.IMAGE);
        const fileUrl = uploadedFile.fileUrl;
        editor.commands.setImage({ src: fileUrl+'?size=large', alt: 'upload_image' });
      }
    }

  }
  const editorButtons =
    //  useMemo<EditorButtonProps[]>(() => 
    [
      {
        children: <BsTypeBold />,
        editAction: () => editor.chain().focus().toggleBold().run(),
        toolTip: 'bold',
        isFocused: editor.isActive('bold'),
      },
      {
        children: <BsTypeItalic />,
        editAction: () => editor.chain().focus().toggleItalic().run(),
        toolTip: 'italic',
        isFocused: editor.isActive('italic'),
      },
      {
        children: <BsTypeStrikethrough />,
        editAction: () => editor.chain().focus().toggleStrike().run(),
        toolTip: 'strike',
        isFocused: editor.isActive('strike'),
      },
      {
        children: <RiFormatClear />,
        editAction: () => editor.chain().focus().clearNodes().run(),
        toolTip: 'clear note',
      },
      {
        children: <BsParagraph />,
        editAction: () => editor.chain().focus().setParagraph().run(),
        toolTip: 'paragraph',
        isFocused: editor.isActive('bold'),
      },
      {
        children: <LuHeading1 />,
        editAction: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        toolTip: 'h1',
        isFocused: editor.isActive('heading', { level: 1 }),
      },
      {
        children: <LuHeading2 />,
        editAction: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        toolTip: 'h2',
        isFocused: editor.isActive('heading', { level: 2 }),
      },
      {
        children: <LuHeading3 />,
        editAction: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        isFocused: editor.isActive('heading', { level: 3 }),
        toolTip: 'h3',
      },
      {
        children: <LuHeading4 />,
        editAction: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
        isFocused: editor.isActive('heading', { level: 4 }),
        toolTip: 'h4',
      },
      {
        children: <LuHeading5 />,
        editAction: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
        isFocused: editor.isActive('heading', { level: 5 }),
        toolTip: 'h5',
      },
      {
        children: <LuHeading6 />,
        editAction: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
        isFocused: editor.isActive('heading', { level: 6 }),
        toolTip: 'h6',
      },
      {
        children: <PiListBullets />,
        editAction: () => editor.chain().focus().toggleBulletList().run(),
        toolTip: 'bullet list',
        isFocused: editor.isActive('bulletList'),
      },
      {
        children: <VscListOrdered />,
        editAction: () => editor.chain().focus().toggleOrderedList().run(),
        toolTip: 'order list',
        isFocused: editor.isActive('orderedList'),
      },
      {
        children: <BsCode />,
        editAction: () => editor.chain().focus().toggleCodeBlock().run(),
        toolTip: 'code',
        isFocused: editor.isActive('codeBlock'),
      },

      {
        children: <BsQuote />,
        editAction: () => editor.chain().focus().toggleBlockquote().run(),
        toolTip: 'quote',
        isFocused: editor.isActive('blockquote'),
      },
      {
        children: <MdOutlineHorizontalRule />,
        editAction: () => editor.chain().focus().setHorizontalRule().run(),
        toolTip: 'horizontal rule',
      },
      {
        children: <MdInsertPageBreak />,
        editAction: () => editor.chain().focus().setHardBreak().run(),
        toolTip: 'hard break',
      },
      {
        children: <BiRedo />,
        editAction: () => editor.chain().focus().redo().run(),
        toolTip: 'redo',
      },
      {
        children: <BiUndo />,
        editAction: () => editor.chain().focus().undo().run(),
        toolTip: 'undo',
      },
      {
        children:
          <span>
            <BsImage onClick={() => {
              document.getElementById('image_select')?.click();
            }} />
            <input id='image_select' type="file" onChange={uploadFile} style={{ display: 'none' }} />
          </span>

        ,
        toolTip: 'image',
      },
      {
        children: <BiLink />,
        editAction: () => editor.chain().focus().toggleLink({ href: "#" }).run(),
        toolTip: 'link',
      },
      {

        editAction: () => editor.commands.toggleCode(),
        toolTip: 'set color',
        // disable: editor.can().chain().focus().setColor('#ffff22').run()
      },
    ]
  // ,[edito] )

  return (
    <div className="flex flex-wrap mb-1 bg-[#edf0f4] p-1">
      {editorButtons.map((item, index) => <EditorButton key={index} {...item} >{item.children ?? index}</EditorButton>)}
    </div>
  )
}

export default EditorTool;