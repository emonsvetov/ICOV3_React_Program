import React from 'react'
import {CKEditor} from 'ckeditor4-react';


const Editor = (props) => {
  const {setValue, placeholder} = props;
  return (
    <div>
      <CKEditor
        initData={placeholder}
        config={{
          toolbar: [
            ['EmojiPanel'],
          ],
          extraPlugins: 'emoji',
          removePlugins: 'image',
        }}
        onInstanceReady={() => {
          // console.log('Editor is ready!');
        }}
        onChange={(event) => {
          const data = event.editor.getData();
          // console.log(data);
          setValue(data);
        }}
      />
    </div>
  )
}
export default Editor
