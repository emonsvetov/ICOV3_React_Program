import React from 'react'
import {CKEditor} from 'ckeditor4-react';
import { getBearer } from '@/containers/App/auth';

const Editor = (props) => {
  const {setValue, placeholder, organization, program} = props;
  const [content, setContent] = React.useState('');
  return (
    <div>
      <CKEditor
        initData={placeholder}
        config={{
         
          toolbar: [
            // { name: 'insert', items: ['Image', 'EmojiPanel','SendToServer'] }, // Add 'Image' and 'Emoji' buttons
            { name: 'insert', items:['EmojiPanel']}
          ],
          extraPlugins: ['emoji'],
          filebrowserUploadUrl: process.env.REACT_APP_API_BASE_URL+`/api/v1/organization/${organization.id}/program/${program.id}/social-wall-post/uploadImage`,
          fileTools_requestHeaders: {
            "Authorization":getBearer()
          }
        }}
        onInstanceReady={() => {
          // console.log('Editor is ready!');
        }}
        content={content}
        onChange={(event) => {
          const data = event.editor.getData();
          setContent(data)
          setValue(data);
        }}

      />
    </div>
  )
}
export default Editor
