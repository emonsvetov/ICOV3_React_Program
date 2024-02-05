import React from 'react'
import {CKEditor} from 'ckeditor4-react';



const Editor = (props) => {
  const {setValue, placeholder, setMentionedUsers} = props;
  let users=[]
  let mentionedUsers = []
  if (props.users)
    {
      props.users.map((user, idx)=> {
        const username = user.name.replace(/\s/g, "_");
        users.push({
          id:idx,
          user_id:user.id,
          fullname: user.name,
          username: username
        })
      })
  }

  function dataFeed(opts, callback) {
    var matchProperty = 'username',
        data = users.filter(function(item) {
          return item[matchProperty].indexOf(opts.query.toLowerCase()) == 0;
        });
  
    data = data.sort(function(a, b) {
      return a[matchProperty].localeCompare(b[matchProperty], undefined, {
        sensitivity: 'accent'
      });
    });
  
    callback(data);
  }
  return (
    <div>
      <CKEditor
         config={{
          extraPlugins: 'mentions,emoji',
          toolbar: [
            ['EmojiPanel']
          ],
          mentions: [ {
            feed: dataFeed,
            itemTemplate:
              '<li data-id="{id}">' +
              '<strong class="username">{username}</strong>' +
              '<span class="fullname">{fullname}</span>' +
              '</li>',
            outputTemplate:
              '<a href="mailto:{username}@example.com">@{username}</a><span>&nbsp;</span>',
            minChars: 0
          }
        ]
        }}
        onChange={(event) => {
          const data = event.editor.getData();
          setValue(data);
          const mentionRegex = /@([\w]+)/g;
          let match;
          while ((match = mentionRegex.exec(data)) !== null) {
            const mentionedUsername = match[1];
            const mentionedUser = users.find((user) => user.username === mentionedUsername);
            if (mentionedUser) {
              // Handle the selected user here
              mentionedUsers.push(mentionedUser);
              console.log(mentionedUser)
            
              mentionedUsers = mentionedUsers.filter((value, index, self) => {
                return self.indexOf(value) === index;
              });
              console.log(mentionedUsers)
              setMentionedUsers(mentionedUsers);
            }
          }
        }}
      />
    </div>
  )
}
export default Editor
