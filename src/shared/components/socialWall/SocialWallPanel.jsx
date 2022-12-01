import React, {useEffect, useRef, useState} from 'react';
import SocialWallItem from './SocialWallItem';
import {getSocialWallPosts} from '@/services/program/getSocialWallPosts'
import SocialWallCommentModalWrapper from './SocialWallCommentModalWrapper';
import ConfirmModalWrapper from "@/shared/components/modal/confirmModal/ConfirmModalWrapper"
import {connect} from "react-redux";
import {deleteSocialWallPost} from '@/redux/actions/socialWallPostActions';
import {useDispatch} from 'react-redux';
import {
  Button,
  Col,
  Container,
  Row,
} from 'reactstrap';
import TemplateButton from "@/shared/components/TemplateButton"

const SocialWallPanel = ({auth, organization, program, isManager}) => {

  let [socialWallPosts, setSocialWallPosts] = useState(null);
  let [socialWallPost, setSocialWallPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const confirmRef = useRef({});
  const dispatch = useDispatch()

  const popupToggle = () => {
    setOpen(prevState => !prevState)
  };
  const [isOpen, setOpen] = useState(false);
  const [deleteActivityId, setDeleteActivityId] = useState(false);

  const deleteActivity = () => {
    dispatch(deleteSocialWallPost(organization.id, program.id, deleteActivityId))
      .then((res) => {
        getSocialWallPosts(organization.id, program.id, 0, 999999)
          .then(data => {
            setSocialWallPosts(data);
            confirmRef.current.toggle()
          })
          .catch(error => {
            console.log(error.response.data);
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (organization && program) {
      setLoading(true)
      getSocialWallPosts(organization.id, program.id, 0, 999999)
        .then(data => {
          // console.log(data)
          setSocialWallPosts(data);
        })
        .catch(error => {
          console.log(error.response.data);
        })
    }
  }, [organization, program])

  if (!socialWallPosts) return 'Loading...'


  return (
    <Container >
      <Row>
        { isManager && <TemplateButton className='add-new-post' text='Add New Post' /> }
        <div className='panel social-wall-panel pt-4'>
          {socialWallPosts.results.map((item, index) => {
            return <div key={`socialWallItem-${index}`}>
              <SocialWallItem program={program} data={item} popupToggle={popupToggle} confirmRef={confirmRef}
                              setSocialWallPost={setSocialWallPost} isManager={isManager} setDeleteActivityId={setDeleteActivityId}/>
              <hr className="solid"/>
            </div>
          })}
        </div>
      </Row>
      <SocialWallCommentModalWrapper isOpen={isOpen} setOpen={setOpen} toggle={popupToggle}
                                     socialWallPost={socialWallPost} setSocialWallPosts={setSocialWallPosts}/>
      <ConfirmModalWrapper confirmRef={confirmRef} action={deleteActivity} />
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(SocialWallPanel);
