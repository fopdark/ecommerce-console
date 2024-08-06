import React from 'react';
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
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import './style.css';

interface Props {
  onChange: (values: any) => void;
}

export default function CKEditorComponent({ onChange }: Props) {
  return (
    <div>
      <CKEditor
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
            ImageToolbar,
            ImageUpload,
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
          console.log('editor', editor.getData());
        }}
      />
    </div>
  );
}
