import React, {useState} from 'react';
import { 
    Col, 
    Container, 
    Row, 
    Button,
} from 'reactstrap';
import RewardItem from '../components/RewardItem';
import {REWARD_DATA} from '../components/Mockdata'
import AddPostPopup from '../components/AddPostPopup';

const Spirewall = () => {
  const [isOpen, setOpen] = useState(false);
  const toggle = () => {
    setOpen(prevState => !prevState)
  }
  return (
      <Container className='spirewall'>
        <Button color='danger' onClick={toggle}>Add New Post</Button>
        <div>
          {REWARD_DATA.map((item, index) =>{
            return <div className='panel p-4' key={`rewardItem-${index}`} >
              <RewardItem data = {item} />
            </div>
          })}
        </div>
        <AddPostPopup  isOpen={isOpen} setOpen={setOpen} toggle={toggle}/>
      </Container>
    
)}

export default Spirewall;
