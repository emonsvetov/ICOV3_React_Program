import React, {createContext} from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import {ParticipantLayout, ManagerLayout} from '../Layout/index';

import LogIn from '../LogIn/index';
// import Signup from '../Signup/index';
// import SignupSuccess from '../Signup/SignupSuccess';

//participant
import ParticipantHome from '../Participant/Home/index';
import AccountIndex from '../Participant/Accounts/index';
import FaqIndex from '../Participant/Faqs/index';
import GiftCodeIndex from '../Participant/GiftCodes/index';
import GoalIndex from '../Participant/Goals/index';
import PointIndex from '../Participant/Points/index';
import { 
  SelectMerchants, 
  BrowseMerchants, 
  RedeemMerchant,
  Checkout
 } from '../Participant/RedeemPoints';
import Lead from '../Participant/Lead'
import Faqs from '../Participant/Faqs/index';
import Peer2Peer from '../Participant/Peer2Peer/index'
import Survey from '../Participant/Survey';

//manager

import { Home as ManagerHome, Leaderboards, NSpireWall } from '../Manager/Home/index';
import ProgramSettings from '../Manager/ProgramSettings/index'
import ManageAndReward from '../Manager/ManageAndReward/index'
import InviteParticipant from '../Manager/InviteParticipant/index'
import Referral from '../Manager/Referral';
import Team from '../Manager/Team';
import TeamView from '../Manager/Team/components/TeamView';
import Report from '../Manager/Report';
import Invoices from '../Manager/Report/components/Invoices';
import ProgramStatus from '../Manager/Report/components/ProgramStatus';

// const Accounts = () => (
//   <Routes>
//     <Route index element={AccountIndex} />
//   </Routes>
// );

// const privateRoutes = () => {
//   return (
//     <Route path="/" element={<Layout />} >
//       {/* <Route index element={<Login />} /> */}
//       <PrivateRoute index component={Home} />
//       <PrivateRoute path="/my-account" component={Accounts} />
//       <PrivateRoute path="/my-gift-codes" component={GiftCodes} />
//       <PrivateRoute path="/my-points" component={Points} />
//       <PrivateRoute path="/my-goals" component={Goals} />
//       <PrivateRoute path="/faqs" component={Faqs} />
//     </Route>

//   )
// }


const RouteIndex = () => (
    <Routes>
      <Route path="/" element={<PublicRoute />} >
        <Route path="login" element={<LogIn />} />
      </Route>
      <Route path="/" element={<PrivateRoute />} >
        <Route path="participant" element={<ParticipantLayout />} >
          <Route path="home" element={<ParticipantHome />} />
          <Route path="my-account" element={<AccountIndex />} />
          <Route path="my-gift-codes" element={<GiftCodeIndex />} />
          <Route path="my-points" element={<PointIndex />} />
          <Route path="my-goals" element={''} />
          <Route path="faqs" element={<Faqs />} />
          <Route path="select-merchants" element={<SelectMerchants />} />
          <Route path="browse-merchants" element={<BrowseMerchants />} />
          <Route path="redeem/:merchantId" element={<RedeemMerchant />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="lead" element={<Lead />} />
          <Route path="peer-to-peer" element={<Peer2Peer />} />
          <Route path="survey" element={<Survey />} />
        </Route>
        <Route path="manager" element={<ManagerLayout />} >
          <Route path="home" element={<ManagerHome />} />
          <Route path="nspire-wall" element={<NSpireWall />} />
          <Route path="leaderboards" element={<Leaderboards />} />
          <Route path="program-settings" element={<ProgramSettings />} />
          <Route path="manage-and-reward" element={<ManageAndReward />} />
          <Route path="invite-participant" element={<InviteParticipant />} />
          <Route path="referral" element={<Referral />} />
          <Route path="team" element={<Team />} />
          <Route path="team/:mateId" element={<TeamView />} />
          <Route path="report" element={<Report />} >
            <Route path="invoices" element={<Invoices />} />
            <Route path="program-status" element={<ProgramStatus />} />
            
          </Route>
          
        </Route>
      </Route>
    </Routes>
);

export default RouteIndex;
