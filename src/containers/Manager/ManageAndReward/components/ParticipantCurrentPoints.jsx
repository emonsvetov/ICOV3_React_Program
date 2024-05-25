import React from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";

const ParticipantCurrentPoints = ({participant,auth, program}) => {
  return (
    <>
        <Table striped bordered hover>
            <tbody>
                <tr>
                    <td>Total Points Rewarded:</td>
                    <td>{participant?.totalPointsRewarded ? participant.totalPointsRewarded * program.factor_valuation : 0} </td>

                </tr>
                <tr>
                    <td><strong>Current Points Balance:</strong></td>
                    <td><strong>{participant?.pointBalance ? participant?.pointBalance * program.factor_valuation : 0 }</strong></td>
                    {/*<td><strong>{currentPoints?.current_points_balance}</strong></td>*/}

                </tr>
                {/*<tr>*/}
                {/*    <td><strong>Current Peer Points Balance:</strong></td>*/}
                {/*    <td><strong>{participant?.peerBalance ? participant?.peerBalance * program.factor_valuation : 0}</strong></td>*/}
                {/*    /!*<td><strong>{currentPoints?.current_peers_balance}</strong></td>*!/*/}
                {/*</tr>*/}

            </tbody>
        </Table>
    </>
  );
};

const mapStateToProps = (state) => {
    // console.log(state.currentPoints)
  return {
    program: state.program,
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(ParticipantCurrentPoints);
    