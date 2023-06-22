import React from 'react';
import CloseIcon from 'mdi-react/CloseIcon';
import { Modal } from 'reactstrap';
import TeamForm from './TeamForm'
import { Img } from '@/theme'

const EditTeamModal = ({ program, isOpen, setOpen, toggle, team }) => {
  /* const dispatch = useDispatch()
   
   const [loading, setLoading] = useState(false);
 
   
   // console.log(program)
   const onSubmit = (values) => {
 
   
     setMate( mate )
     setLoading(true)
     
   };*/

  let props = {
    toggle,
    team,
    program,
  }
  return (
    <Modal className={`program-settings modal-2col modal-xl`} isOpen={isOpen} toggle={() => setOpen(true)}>

      <div className='close cursor-pointer'>
        <CloseIcon onClick={toggle} size={30} />
      </div>

      <div className="left">
        <div className='title mb-5'>
          <h3>Edit Teammate </h3>
          <span>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
          </span>
        </div>
        <Img src='img/pages/addTeammate.png' alt="teamate-image"/>
      </div>

      <div className="right">
        <TeamForm {...props} />
      </div>

    </Modal>
  )
}

export default EditTeamModal;
