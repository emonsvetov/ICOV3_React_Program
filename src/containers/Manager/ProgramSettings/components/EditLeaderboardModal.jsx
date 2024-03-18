import React from 'react';
import { connect } from 'react-redux';
import CloseIcon from 'mdi-react/CloseIcon';
import EditLeaderboardForm from './EditLeaderboardForm'
import { Modal, Card, CardBody, CardHeader } from 'reactstrap';

const EditLeaderboardModal = ({program, organization, leaderboard, isOpen, setOpen, toggle, rtl, theme}) => {

  let props = {
    data: leaderboard,
    program,
    organization,
    rtl,
    theme,
    toggle
  }

  return (
    <Modal className={`${theme.className} ${rtl.direction}-support program-settings modal-2col modal-xl`} isOpen={isOpen} toggle={() => setOpen(true)}>
      <div className='close cursor-pointer'>
        <CloseIcon onClick={toggle} size={30}/>
      </div>
      <Card className='w-100'>
        <CardHeader tag="h3">Edit Leaderboard</CardHeader>
        <CardBody>
          <EditLeaderboardForm {...props} />
        </CardBody>
      </Card>
    </Modal>
)}

const mapStateToProps = (state) => {
  return {
     rtl: state.rtl,
     theme: state.theme
  };
};

export default connect(mapStateToProps)(EditLeaderboardModal);
