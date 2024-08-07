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
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import './style.css';

interface Props {
  onChange: (values: any) => void;
  value?: any;
}

export default function CKEditorComponent({ onChange, value }: Props) {
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
            // Image,
            // ImageInsert,
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
        }}
        onChange={(event, editor) => {
          onChange(editor.getData());
          // console.log('editor', editor.getData());
        }}
      />
    </div>
  );
}
