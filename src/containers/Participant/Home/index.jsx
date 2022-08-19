import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Col, Container, Row} from 'reactstrap';
import SocialWallPanel from '@/shared/components/socialWall/SocialWallPanel';
import Slider from './components/slider';
import {ParticipantTabNavs} from '../../../shared/components/tabNavs';
import Sidebar from '../../Layout/sidebar';
import {connect} from "react-redux";
import {USER_STATUS_PENDING_DEACTIVATION} from '@/services/user/getUser'

const getSlideImg = () => {
  let imgs = [];
  for (let i = 1; i < 9; i++) {
    imgs.push(`/img/merchants/${i}.png`);
  }
  return imgs;
}


const Home = ({auth, organization, program, template}) => {
  let props = {
    organization,
    program,
  }
  let [showSocialWall, setShowSocialWall] = useState(null);

  useEffect(() => {
    let result = false;
    if (auth && program){
      if (auth.user_status_id === USER_STATUS_PENDING_DEACTIVATION && program.remove_social_from_pending_deactivation){
        result = false
      } else if (program.uses_social_wall > 0){
        result = true
      }
    }
    setShowSocialWall(result)
  }, [auth, program]);

  if (!auth || !program || !template) return 'Loading...'

  const IMG_BACK = template.hero_banner ? `${process.env.REACT_APP_API_STORAGE_URL}/${template.hero_banner}` :
    `${process.env.PUBLIC_URL}/img/back.png`;

  let slide_imgs = getSlideImg();
  return (
    <>
      <div className='mainboard'>
        <img src={IMG_BACK}/>
      </div>
      <Container>
        <ParticipantTabNavs/>
      </Container>
      <Container>
        <Row>
          <Col md={9}>
            <div className="dashboard">
              {showSocialWall &&
                <>
                  <div className='mb-3'>
                    <Row>
                      <Col md={8}>
                        <h1> Welcome back {auth && auth.first_name}! </h1>
                        <div className='description'>
                          Congratulations on earning rewards! Redeem your rewards when you earn them or save them for a
                          "rainy day".
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <SocialWallPanel/>
                </>
              }
              <div className='mt-5'>
                <h3>Select a merchant to redeem your points</h3>
                <Slider data={slide_imgs}/>
              </div>

            </div>
          </Col>
          <Col md={3} className="mt-5">
            <Sidebar/>
          </Col>
        </Row>
      </Container>
    </>

  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
    template: state.template
  };
};
export default connect(mapStateToProps)(Home);
