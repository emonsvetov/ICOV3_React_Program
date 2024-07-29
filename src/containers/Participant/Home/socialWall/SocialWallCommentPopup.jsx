//SystemModules
import React, { useEffect, useState} from 'react';
import { connect, useDispatch } from "react-redux";
import {Form, Field} from 'react-final-form';
import {
  Modal,
  Col,
  Row,
  FormGroup,
  FormFeedback,
  Button,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';

//CustomModules

import {createSocialWallPost, setSocialWallPostType, postMentionedUsers} from '@/redux/actions/socialWallPostActions';
import {getSocialWallPostType} from '@/services/program/getSocialWallPostTypes'
import {getSocialWallPosts} from '@/services/program/getSocialWallPosts'
import Editor from '@/shared/components/form/Editor';
import { getUsers } from "@/services/program/getUsers";
import { SignalCellularNullSharp } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
//DefaultComponent

const SocialWallCommentPopup = ({isOpen, setOpen, toggle, socialWallPost, program, organization, auth, setSocialWallPosts, swpGlobal, postType = 'comment', setPostType, users}) => {
  const { t } = useTranslation();
  if( swpGlobal && swpGlobal?.newPostType ) {
    postType = swpGlobal.newPostType
  }
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [mentionsUserIds, setMentionsUserIds]=useState(null)
  const [usersMentionData, setUsersMentionData] = useState([]);
  const onSubmit = (values) => {

    if (program.uses_social_wall) {
      let socialWallPostData = {
        comment: value,
        program_id: program.id,
        organization_id: organization.id,
        event_xml_data_id: null,
        awarder_program_id: null,
        like: null,
        likesCount: 0,
        social_wall_post_id: null,
        sender_user_account_holder_id: null,
        receiver_user_account_holder_id: null,
        social_wall_post_type_id: null,
        mentions_user_ids:mentionsUserIds
      };
      if ( socialWallPost?.id ) {
        socialWallPostData.social_wall_post_id = socialWallPost.id;
      }

      if ( auth?.account_holder_id ) {
        socialWallPostData.sender_user_account_holder_id = auth.account_holder_id;
      }

      if ( socialWallPost?.receiver_user_account_holder_id ) {
        socialWallPostData.receiver_user_account_holder_id =
          socialWallPost.receiver_user_account_holder_id;
      }

      if (
        !socialWallPostData.receiver_user_account_holder_id &&
        auth?.account_holder_id
      ) {
        socialWallPostData.receiver_user_account_holder_id =
          auth.account_holder_id;
      }

      getSocialWallPostType(organization.id, program.id, postType).then(
        (socialWallPostType) => {
          // console.log(socialWallPostType)
          // setPostType(null)
          // return
          socialWallPostData.social_wall_post_type_id = socialWallPostType.id;
          dispatch(
            createSocialWallPost(
              organization.id,
              program.id,
              socialWallPostData,

            )
          )
            .then((res) => {
              setPostType(null);
              toggle();
              getSocialWallPosts(organization.id, program.id, 0, 999999)
                .then((data) => {
                  // console.log(data)
                  setSocialWallPosts(data);
                })
                .catch((error) => {
                  console.log(error.response.data);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      );
    }
  };

  useEffect(() => {
    let mentionsData = [];
    getUsers(organization.id, program.id)
      .then((users) => {
        const username = users.results?.map((user) => {
          const newObject = {
            userId: user.id,
            id: `@${user.first_name}`,
            name: user.name,
            mailTo: `mailto:${user.email}`
          };
          mentionsData.push(newObject);
        });
        setUsersMentionData(mentionsData);
      })
      .catch((err) => {
        console.log("error in fetch  users", err);
      });
  },[getUsers]);

  return (
    <Modal
      className={`modal-2col modal-lg`}
      isOpen={isOpen}
      toggle={() => setOpen(true)}
    >
      <Card className="w-100">
        <CardHeader tag="h3">
          {t('add_a_comment')}

          <Button className="btn btn-lg float-end" style={{ float: "right" }} close onClick={toggle}/>

        </CardHeader>
        <CardBody>
          <Form
            onSubmit={onSubmit}
            initialValues={{}}
          >
            {({handleSubmit, form, submitting, pristine, values}) => (
              <form className="form flex-column justify-content-evenly" onSubmit={handleSubmit}>
                <Row>
                  <Col md="12">
                    <Field name="message">
                      {({input, meta}) => (
                        <FormGroup>
                       {/* {usersMentionData.length !== 0 ? ( */}
                            <Editor
                              setValue={setValue}
                              placeholder=""
                              setMentionsUserIds={setMentionsUserIds}
                              usersMentionData={usersMentionData}
                              
                            />
                           {/* ) : (
                            "Loading"
                          )}  */}
                          {meta.touched && meta.error && (
                            <FormFeedback> {meta.error}</FormFeedback>
                          )}
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                </Row>
                <div className="d-flex justify-content-end">
                  <Button color="danger" type="submit">{t('post')}</Button>
                </div>
              </form>
            )}
          </Form>
        </CardBody>
      </Card>
    </Modal>
  )
}
const mapStateToProps = (state) => {
  return {
    swpGlobal: state.socialWallPost
  };
};
const mapDispatchToProps = dispatch => ({
  setPostType: (type) => dispatch(setSocialWallPostType(type)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SocialWallCommentPopup);
