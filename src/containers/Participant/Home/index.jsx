import React from 'react';
import {Link} from 'react-router-dom';
import {Col, Container, Row} from 'reactstrap';
import SocialWallPanel from '@/shared/components/socialWall/SocialWallPanel';
import Slider from './components/slider';
import {ParticipantTabNavs} from '../../../shared/components/tabNavs';
import Sidebar from '../../Layout/sidebar';
import {connect} from "react-redux";

const IMG_BACK = `${process.env.PUBLIC_URL}/img/back.png`;

const getSlideImg = () => {
  let imgs = [];
  for (let i = 1; i < 9; i++) {
    imgs.push(`/img/merchants/${i}.png`);
  }
  return imgs;
}


const Home = ({auth, organization, program}) => {
  let props = {
    organization,
    program,
  }
  if( !auth ) return 'Loading...'

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
              <SocialWallPanel />
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
  };
};
export default connect(mapStateToProps)(Home);
