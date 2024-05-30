import React, {useState} from 'react';
import ConfirmPopup from './ConfirmPopup';

const ConfirmModalWrapper = ({confirmRef, message, action}) => {
  const [isOpen, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const toggle = (id) => {
    if(id){
      setId(id)
    }
    setOpen(prev => !prev)
  }
  confirmRef.current.toggle = toggle

  const props = {
    message, action, isOpen, setOpen, toggle, id
  }
  return (
    <>
      {
        <ConfirmPopup {...props} />
      }
    </>
  )
}

ConfirmModalWrapper.defaultProps = {
  confirmRef: {current: {}}
}

export default ConfirmModalWrapper;
