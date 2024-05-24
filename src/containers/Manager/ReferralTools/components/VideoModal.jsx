import CloseIcon from 'mdi-react/CloseIcon';
import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

const VideoModal = ({ isOpen, onClose, videoId }) => {
  return (
    <Modal
      className={`modal-2col modal-lg`}
      isOpen={isOpen}
      toggle={onClose}
    >
      <div className="close cursor-pointer">
        <CloseIcon onClick={onClose} size={30} />
      </div>
      <ModalBody>
        <iframe
          width="100%"
          height="450"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </ModalBody>
    </Modal>
  );
};

export default VideoModal;
