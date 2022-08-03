import React, {useRef, useState} from 'react';
import {
  Modal,
  Input,
  Col,
  Row,
  FormGroup,
  FormFeedback,
  Button,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';
import {Form, Field} from 'react-final-form';
import {createSocialWallPost} from '@/redux/actions/socialWallPostActions';
import {getSocialWallPostTypeComment} from '@/services/program/getSocialWallPostTypes'
import {useDispatch} from 'react-redux';
import {getSocialWallPosts} from '@/services/program/getSocialWallPosts'
import Editor from '@/shared/components/form/Editor';

const RewardCommentPopup = ({isOpen, setOpen, toggle, socialWallPost, program, organization, auth, setSocialWallPosts}) => {

  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const onSubmit = values => {

    if (program.uses_social_wall) {

      getSocialWallPostTypeComment(organization.id, program.id)
        .then(socialWallPostTypeComment => {

          let socialWallPostData = {
            'social_wall_post_type_id': socialWallPostTypeComment.id,
            'social_wall_post_id': socialWallPost.id,
            'event_xml_data_id': null,
            'program_account_holder_id': program.id,
            'awarder_program_id': null,
            'sender_user_account_holder_id': auth.account_holder_id,
            'receiver_user_account_holder_id': socialWallPost.receiver_user_account_holder_id,
            'comment': value,
          }
          // console.log(socialWallPostData);
          dispatch(createSocialWallPost(organization.id, program.id, socialWallPostData))
            .then((res) => {
              toggle()
              getSocialWallPosts(organization.id, program.id, 0, 999999)
                .then(data => {
                  // console.log(data)
                  setSocialWallPosts(data);
                })
                .catch(error => {
                  console.log(error.response.data);
                })
            })
            .catch(err => {
              console.log(err)
            })
        })
    }
  };

  return (
    <Modal className={`modal-2col modal-lg`} isOpen={isOpen} toggle={() => setOpen(true)}>

      <Card className='w-100'>
        <CardHeader tag="h3">

          Add a comment

          <Button className='btn btn-lg float-end' close onClick={toggle}/>

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
                          <Editor setValue={setValue} placeholder="" />
                          {meta.touched && meta.error && <FormFeedback> {meta.error}</FormFeedback>}
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                </Row>
                <div className='d-flex justify-content-end'>
                  <Button color='danger' type='submit'>Post</Button>
                </div>
              </form>
            )}
          </Form>
        </CardBody>
      </Card>


    </Modal>
  )
}

export default RewardCommentPopup;
