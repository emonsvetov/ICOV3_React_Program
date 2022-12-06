import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const MYPOINTS = [
  {
    name: "Points to Redeem:",
    value: 800,
  },
  {
    name: "Peer Points to Award:",
    value: 4000,
  },
];
const PointsOrigin = ({ myPoints }) => {
  if (!myPoints) return "Loading...";
  return (
    <div className="points-origin flex-column p-2">
      <div className="points-origin-header bg-blue">My Balance</div>
      <table className="points-origin-table" width="100%">
        <tbody>
          {MYPOINTS.map((item, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="points-title text-uppercase"> {item.name}</td>
              </tr>
              <tr>
                <td className="value"> {item.value.toLocaleString()}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    myPoints: state.pointBalance,
  };
};

export default connect(mapStateToProps)(PointsOrigin);
