import React, {createContext} from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import {ParticipantLayout, ManagerLayout} from '../Layout/index';

// import LogIn from '../LogIn/index';
// import Signup from '../Signup/index';
// import SignupSuccess from '../Signup/SignupSuccess';

//participant
import ParticipantHome from '../Participant/Home/index';
import AccountIndex from '../Participant/Accounts/index';
import FaqIndex from '../Participant/Faqs/index';
import GiftCodeIndex from '../Participant/GiftCodes/index';
import GoalIndex from '../Participant/Goals/index';
import PointIndex from '../Participant/Points/index';

//manager
import ManagerHome from '../Manager/Home/index';
import ProgramSettings from '../Manager/ProgramSettings/index'
import ManageAndReward from '../Manager/ManageAndReward/index'
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
      
      {/* <Route path="/login" element={<LoginPage />} */}
      <Route path="/participant" element={<ParticipantLayout />} >
        <Route path="home" element={<ParticipantHome />} />
        <Route path="my-account" element={''} />
        <Route path="my-gift-codes" element={<GiftCodeIndex />} />
        <Route path="my-points" element={<PointIndex />} />
        <Route path="my-goals" element={''} />
        <Route path="faqs" element={''} />

        <Route path="*" element={<Navigate to="/participant/home" />} />  
      </Route>
      <Route path="/manager" element={<ManagerLayout />} >
        <Route path="home" element={<ManagerHome />} />
        <Route path="program-settings" element={<ProgramSettings />} />
        <Route path="manage-and-reward" element={<ManageAndReward />} />

        <Route path="*" element={<Navigate to="/manager/home" />} />  
      </Route>
      <Route path="*" element={<Navigate to="/participant/home" replace />} />
    </Routes>
);

export default RouteIndex;
