import React, { useEffect } from "react";
import { Table, Col, Container, Row } from "reactstrap";
import { getParticipantCurrentPointsAction } from '@/redux/actions/userActions';
import { connect } from "react-redux";

const ParticipantCurrentPoints = ({ dispatch,participant,auth, program,currentPoints}) => {
  useEffect( () => {
    if( participant?.id && program?.id)
    {
      dispatch(
        getParticipantCurrentPointsAction(
          program.organization_id, 
          program.id,
          participant.id
        )
      )
    }
  }, [auth, program])
  return (
    <>
        <Table striped bordered hover>
            <tbody>
                <tr>
                    <td>Total Points Rewarded:</td>
                    <td>{participant?.totalPointsRewarded}</td>

                </tr>
                <tr>
                    <td><strong>Current Points Balance:</strong></td>
                    <td><strong>{participant?.pointBalance}</strong></td>
                    {/*<td><strong>{currentPoints?.current_points_balance}</strong></td>*/}

                </tr>
                <tr>
                    <td><strong>Current Peer Points Balance:</strong></td>
                    <td><strong>{participant?.peerBalance}</strong></td>
                    {/*<td><strong>{currentPoints?.current_peers_balance}</strong></td>*/}
                </tr>

            </tbody>
        </Table>
    </>
  );
};

const mapStateToProps = (state) => {
    console.log(state.currentPoints)
  return {
    program: state.program,
    auth: state.auth,
    currentPoints: state.participant.currentPoints,
  };
};

export default connect(mapStateToProps)(ParticipantCurrentPoints);
    