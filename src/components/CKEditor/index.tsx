import React, { useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo,
  Highlight,
  HorizontalLine,
  Image,
  ImageResize,
  ImageUpload,
  ImageInsert,
  ImageInsertUI,
  ImageElementSupport,
  ImageStyle,
  ImageEditing,
  ImageStyleUI,
  ImageBlock,
  ImageToolbar,
  AutoImage,
  ImageCaption,
  Alignment,
  Editor,
  FileLoader,
  UploadAdapter,
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import './style.css';
import axios from 'axios';
import { API_URL } from '@/constant/ConstantCommon';
import { uploadFiles } from '@/services/files';

interface Props {
  onChange: (values: any) => void;
  value?: any;
}

export default function CKEditorComponent({ onChange, value }: Props) {

  function uploadAdapter(loader: FileLoader): UploadAdapter {
    return {
      upload: () => {
        return new Promise(async (resolve, reject) => {
          try {
            const file = await loader.file;
            // const response = await axios.request({
            //   method: "POST",
            //   url: `${HOST}/upload_files`,
            //   data: {
            //     files: file
            //   },
            //   headers: {
            //     "Content-Type": "multipart/form-data"
            //   }
            // });
            const resUploadImages = await uploadFiles({
              files: [file],
            });
            
            console.log('resUploadImages',resUploadImages)
            resolve({
              // default: `${HOST}/${response.data.filename}`
            });
          } catch (error) {
            reject("reject upload image");
          }
        });
      },
      abort: () => {}
    };
  }

  function uploadPlugin(editor: Editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <div>
      <CKEditor
        data={value}
        editor={ClassicEditor}
        config={{
          toolbar: [
            'undo',
            'redo',
            '|',
            'heading',
            '|',
            'bold',
            'italic',
            '|',
            'link',
            'insertTable',
            'mediaEmbed',
            '|',
            'bulletedList',
            'numberedList',
            'indent',
            'outdent',
            'highlight',
            'horizontalLine',
            'imageInsert',
            'alignment',
          ],
          plugins: [
            Bold,
            Essentials,
            Heading,
            Indent,
            IndentBlock,
            Italic,
            Link,
            List,
            MediaEmbed,
            Paragraph,
            Table,
            Undo,
            Highlight,
            HorizontalLine,
            AutoImage,
            Image,
            ImageCaption,
            ImageInsert,
            ImageResize,
            ImageStyle,
            // ImageToolbar,
            ImageUpload,
            Alignment,
            Image,
            ImageInsert,
            // ImageResize,
            // ImageInsertUI,
            // ImageStyle,
            // ImageEditing,
            // ImageStyleUI,
            // ImageBlock,
            // ImageToolbar,
            // AutoImage,
          ],
          initialData: '',
          image: {
            toolbar: [
              'imageTextAlternative',
              'toggleImageCaption',
              'imageStyle:inline',
              'imageStyle:block',
              'imageStyle:side',
            ],
          },
          extraPlugins: [uploadPlugin]
        }}
        onChange={(event, editor) => {
          onChange(editor.getData());
          // console.log('editor', editor.getData());
        }}
      />
    </div>
  );
}
