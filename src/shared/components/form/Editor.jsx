import React from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, Code, Strikethrough, Subscript, Superscript, Underline, Link, Heading, Alignment, 
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  LinkImage, 
  List,
  SourceEditing} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
// import { SlashCommand } from 'ckeditor5-premium-features';
// import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

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
    // const checkMentionRegex = /@(\w+)/g;
    // const usersContentMentions = [];
    // let contentMatch;
    // while ((contentMatch = checkMentionRegex.exec(mentionsUsersContent)) !== null) {
    //   usersContentMentions.push(contentMatch[0]);
    // }
    // const mentionUserIds = usersContentMentions?.map((mention) => {
    //   // Use regular expression to extract the numeric part
    //   const usersMatch = mention.match(/\d+/);
    //   if (usersMatch) {
    //     return usersMatch[0];
    //   } else {
    //     return null; // Handle mentions without a numeric part (no user ID)
    //   }
    // });
    // const allMentionsUserIds = mentionUserIds?.map((userIds) => parseInt(userIds, 10));
    // setMentionsUserIds(allMentionsUserIds);

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = mentionsUsersContent;
    const mentions = tempDiv.querySelectorAll('.mention');
    const userIds = Array.from(mentions).map(mention => parseInt(mention.getAttribute('data-user-id'), 10));
    const uniqueUserIds = [...new Set(userIds)];
    setMentionsUserIds(uniqueUserIds);
  }

  function getFeedItems( queryText ) {
    // As an example of an asynchronous action, return a promise
    // that resolves after a 100ms timeout.
    // This can be a server request or any sort of delayed action.
    return new Promise( resolve => {
        setTimeout( () => {
            const itemsToDisplay = usersMentionData
                // Filter out the full list of all items to only those matching the query text.
                .filter( isItemMatching )
                // Return 10 items max - needed for generic queries when the list may contain hundreds of elements.
                .slice( 0, 10 );

            resolve( itemsToDisplay );
        }, 100 );
    } );

    // Filtering function - it uses `name` and `username` properties of an item to find a match.
    function isItemMatching( item ) {
        // Make the search case-insensitive.
        const searchString = queryText.toLowerCase();
        // Include an item in the search results if name or username includes the current user input.
        return (
            item.name.toLowerCase().includes( searchString ) ||
            item.id.toLowerCase().includes( searchString )
        );
    }
}

function customItemRenderer( item ) {
  const itemElement = document.createElement( 'span' );
  itemElement.classList.add( 'custom-item' );
  itemElement.id = `mention-list-item-id-${ item.userId }`;
  itemElement.textContent = `${ item.id } `;

  const usernameElement = document.createElement( 'span' );
  usernameElement.classList.add( 'custom-item-username' );
  usernameElement.textContent = `: ${item.name}`;

  itemElement.appendChild( usernameElement );
  return itemElement;
}

function MentionCustomization( editor ) {
  // The upcast converter will convert <a class="mention" href="" data-user-id="">
  editor.conversion.for( 'upcast' ).elementToAttribute( {
      view: {
          name: 'a',
          key: 'data-mention',
          classes: 'mention',
          attributes: {
              href: true,
              'data-user-id': true
          }
      },
      model: {
          key: 'mention',
          value: viewItem => {
              const mentionAttribute = editor.plugins.get( 'Mention' ).toMentionAttribute( viewItem, {
                  // Add any other properties that you need.
                  link: viewItem.getAttribute( 'href' ),
                  userId: viewItem.getAttribute( 'data-user-id' )
              } );
              return mentionAttribute;
          }
      },
      converterPriority: 'high'
  } );

  // Downcast the model 'mention' text attribute to a view <a> element.
  editor.conversion.for( 'downcast' ).attributeToElement( {
      model: 'mention',
      view: ( modelAttributeValue, { writer } ) => {
          // Do not convert empty attributes (lack of value means no mention).
          if ( !modelAttributeValue ) {
              return;
          }
          return writer.createAttributeElement( 'a', {
              class: 'mention',
              'data-mention': modelAttributeValue.id,
              'data-user-id': modelAttributeValue.userId,
              'href': modelAttributeValue.mailTo
          }, {
              // Make mention attribute to be wrapped by other attribute elements.
              priority: 20,
              // Prevent merging mentions together.
              id: modelAttributeValue.uid
          } );
      },
      converterPriority: 'high'
  } );
}

  return (
    <div>
      {usersMentionData.length !== 0 ? (
        // <CKEditor
        //   initData={placeholder}
        //   config={{
        //     toolbar: [["EmojiPanel"]],
        //     extraPlugins: "emoji,mentions,link",
        //     removePlugins: "image",
        //     mentions: [
        //       {
        //         feed: mentionFeed,
        //         itemTemplate:
        //           '<li data-id="{id}">' +
        //           '<strong class="name">{name}</strong>' +
        //           "</li>",
        //         outputTemplate: "<span>{name}{id}</span><span>&nbsp;</span>",
        //         minChars: 0,
        //       },
        //     ],
        //   }}
        //   onInstanceReady={({ editor }) => {
        //     // Handles native `instanceReady` event.
        //   }}
        //   onChange={(event) => {
        //     const content = event.editor.getData();
        //     getMentionsUsers(content);
        //     setValue(content);
        //   }}
        //   name="editor1"
        // />

        <CKEditor
            editor={ ClassicEditor }
            config={ {
                toolbar: {
                  items: [
                    'undo', 'redo',
                    '|',
                    'heading',
                    '|',
                    'bold', 'italic', 'underline', 'strikethrough',
                    '|',
                    'alignment',
                    '|',
                    'bulletedList', 'numberedList','outdent', 'indent', 
                    '|',
                    'insertImage',
                    '|',
                    'link', 'uploadImage', 'insertTable', 'mediaEmbed', 'insertImage', 'code',
                    '|',
                    'sourceEditing',
                  ]
                },
                plugins: [
                    Essentials, List, Alignment, Paragraph, Bold, Italic, Underline, Link, Mention, Heading, Undo, Code, Strikethrough, Subscript, Superscript, SourceEditing, Code, MentionCustomization
                ],
                // licenseKey: '<YOUR_LICENSE_KEY>',
                mention: {
                  feeds: [
                    {
                        marker: '@',
                        feed: getFeedItems,
                        itemRenderer: customItemRenderer
                    }
                  ],
              },
              initialData: placeholder,
            } }
            onChange={ ( event, editor ) => {
              const data = editor.getData();
              getMentionsUsers(data);
              setValue(data)
            } }
            onBlur={ ( event, editor ) => {
                console.log( 'Blur.', editor );
            } }
            onFocus={ ( event, editor ) => {
                console.log( 'Focus.', editor );
            } }
            onReady={ ( editor ) => {
              // You can store the "editor" and use when it is needed.
              console.log( 'Editor 2 is ready to use!', editor );
            } }
        />
      ) : (
        "loading"
      )}
    </div>
  )
}
export default Editor
