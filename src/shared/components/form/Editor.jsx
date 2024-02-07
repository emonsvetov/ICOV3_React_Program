import React from "react";
import { CKEditor } from "ckeditor4-react";

const Editor = (props) => {
  const { setValue, placeholder, usersMentionData, setMentionsUserIds } = props;

  const mentionFeed = (query, callback) => {
    let searchQuery = query.query.toLowerCase();
    let data = usersMentionData.filter((item) => {
      return item.name.toLowerCase().includes(searchQuery);
    });
    callback(data);
  };

  function getMentionsUsers(mentionsUsersContent) {
    const checkMentionRegex = /@(\w+)/g;
    const usersContentMentions = [];
    let contentMatch;
    while ((contentMatch = checkMentionRegex.exec(mentionsUsersContent)) !== null) {
      usersContentMentions.push(contentMatch[0]);
    }
    const mentionUserIds = usersContentMentions?.map((mention) => {
      // Use regular expression to extract the numeric part
      const usersMatch = mention.match(/\d+/);
      if (usersMatch) {
        return usersMatch[0];
      } else {
        return null; // Handle mentions without a numeric part (no user ID)
      }
    });
    const allMentionsUserIds = mentionUserIds?.map((userIds) => parseInt(userIds, 10));
    setMentionsUserIds(allMentionsUserIds);
  }

  return (
    <div>
      {usersMentionData.length !== 0 ? (
        <CKEditor
          initData={placeholder}
          config={{
            toolbar: [["EmojiPanel"]],
            extraPlugins: "emoji,mentions,link",
            removePlugins: "image",
            mentions: [
              {
                feed: mentionFeed,
                itemTemplate:
                  '<li data-id="{id}">' +
                  '<strong class="name">{name}</strong>' +
                  "</li>",
                outputTemplate: "<span>{name}{id}</span><span>&nbsp;</span>",
                minChars: 0,
              },
            ],
          }}
          onInstanceReady={({ editor }) => {
            // Handles native `instanceReady` event.
          }}
          onChange={(event) => {
            const content = event.editor.getData();
            getMentionsUsers(content);
            setValue(content);
          }}
          name="editor1"
        />
      ) : (
        "loading"
      )}
    </div>
  );
};
export default Editor;
