import React from "react";
import { Modal, Col, Row, Container } from 'reactstrap';
import { useTranslation } from "react-i18next";
import CloseIcon from "mdi-react/CloseIcon";
import ReclaimForm from './reclaim/ReclaimForm'

const ReclaimPeerAllocationsModal = ({ isOpen, setOpen, toggle, participants, program, organization }) => {
    const { t } = useTranslation();
    let participant = participants[0];
    const props = { toggle, participant, program, organization }
    return (
        <Modal
            className={`program-settings modal-2col modal-xl`}
            isOpen={isOpen}
            toggle={() => setOpen(true)}
        >
            <div className="close cursor-pointer">
                <CloseIcon onClick={toggle} size={30} />
            </div>

            <Container fluid>
                <div className="reclaimable_peer_points_list">

                    <Row>
                        <Col md={12}>
                            <h3>{t('Reclaim Peer Allocations')}</h3>
                            <div>{t('Peer Points Balance')}: {participant?.peerBalance ? participant?.peerBalance * program.factor_valuation : 0}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <ReclaimForm {...props} />
                        </Col>
                    </Row>
                </div>
            </Container>
        </Modal>
    );
};
export default ReclaimPeerAllocationsModal;