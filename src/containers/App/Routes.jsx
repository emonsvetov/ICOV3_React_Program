import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { ParticipantLayout, ManagerLayout } from "../Layout/index";

import LogIn from "../LogIn/index";
// import Signup from '../Signup/index';
// import SignupSuccess from '../Signup/SignupSuccess';

import Forgot from "../Forgot/index";
import CheckYourEmail from "../Forgot/CheckYourEmail";
import ForgotSuccess from "../Forgot/ForgotSuccess";

// Invitation

import Invitation from "../Participant/Invitation/index";
import InvitationSuccess from "../Participant/Invitation/InvitationSuccess";

//participant
import ParticipantHome from "../Participant/Home/index";
import AccountIndex from "../Participant/Accounts/index";
import ManagerAccountIndex from "../Manager/Accounts/index";
import GiftCodeIndex from "../Participant/GiftCodes/index";
import GoalIndex from "../Participant/Goals/index";
import GoalView from "../Participant/Goals/components/GoalView";
import SubmitReferral from "../Participant/Referral/index";
import SuggestionBox from "../Participant/SuggestionBox/index";
import PointIndex from "../Participant/Points/index";
import {
  SelectMerchants,
  BrowseMerchants,
  GlobalMerchants,
  RedeemMerchant,
  Checkout,
  Cart,
} from "../Participant/RedeemPoints";
import Lead from "../Participant/Lead";
import Faqs from "../Participant/Faqs/index";
import About from "../Participant/About/index";
import Privacy from "../Participant/Privacy/index";
import TnC from "../Participant/TnC/index";
import Peer2Peer from "../Participant/Peer2Peer/index";
import Survey from "../Participant/Survey";
import Calendar from "../Participant/Calendar";
import Newsletter from "../Participant/Newsletter";
import Media from "../Participant/Media";
import Iframe from "../Participant/Iframe";
import Training from "../Participant/Training";
import ProgramRules from "../Participant/ProgramRules";
import Feeling from "../Participant/Feeling";
import LeaderboardPage from "../Participant/leaderboards/index";
import Budget from "../Manager/Budget"
import BudgetPrograms from "../Manager/Budget/view/Budget"
import ManageBudget from "../Manager/Budget/assignBudget/AssignBudget";
//manager

import {
  default as ManagerHome,
  Leaderboards,
  NSpireWall,
} from "../Manager/Home/index";
import ProgramSettings from "../Manager/ProgramSettings/index";
import ManageAndReward from "../Manager/ManageAndReward/index";
import InviteParticipant from "../Manager/InviteParticipant/index";
import Referral from "../Manager/Referral";
import Team from "../Manager/Team";
import TeamView from "../Manager/Team/components/TeamView";
import Report from "../Manager/Report";
import Invoices from "../Manager/Report/Invoices/index";
import SupplierRedemption from "../Manager/Report/SupplierRedemption/index";
import ParticipantAccountSummary from "../Manager/Report/ParticipantAccountSummary/index";
import DepositTransfers from "../Manager/Report/DepositTransfers/index";
import DepositBalance from "../Manager/Report/DepositBalance/index";
// import ParticipantStatusSummary from "../Manager/Report/ParticipantStatusSummary/index";
import AwardAccountSummaryGL from "../Manager/Report/AwardAccountSummaryGL/index";
import ProgramStatus from "../Manager/Report/ProgramStatus";
import AwardDetail from "../Manager/Report/AwardDetail/index";
import AwardSummary from "../Manager/Report/AwardSummary";
import DepositTransfer from "../Manager/Report/components/DepositTransfer";
import FileImport from "../Manager/Report/FileImport/index";
import Engagement from "../Manager/Report/Engagement/index";
import GoalProgressSummary from "../Manager/Report/components/GoalProgressSummary";
import MerchantRedemption from "../Manager/Report/MerchantRedemption";
import ParticipantAccount from "../Manager/Report/components/ParticipantAccount";
import ParticipantStatusSummary from "../Manager/Report/ParticipantStatusSummary";
import ParticipantStatus from "../Manager/Report/components/ParticipantStatus";
import QuarterlyAward from "../Manager/Report/QuarterlyAward/index";
import AnnualAwardSummary from "../Manager/Report/AnnualAwardSummary";
import MainWrapper from "./MainWrapper";
import ManageAccount from "../Manager/ManageAccount";
import PageNotFound from "./404Error/PageNotFound";
import UserNotFound from "@/containers/App/404Error/UserNotFound";
import CsvImport from "../Manager/CsvImport";
import ManagerViewInvoice from "../Manager/ManageAccount/components/ViewInvoice";
import ReferralTools from "../Manager/ReferralTools";
import RefParticipants from "../Manager/RefParticipants";

// import { Train } from "@material-ui/icons";

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
  <MainWrapper>
    <Routes>
      <Route path="/" element={<PublicRoute />}>
        <Route path="login" element={<LogIn />} />
        <Route path="/user-not-found" element={<UserNotFound />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/forgot/checkemail" element={<CheckYourEmail />} />
        <Route path="/reset-password" element={<Forgot />} />
        <Route path="/forgot/success" element={<ForgotSuccess />} />
        <Route path="/invitation" element={<Invitation />} />
        <Route path="/invitation/success" element={<InvitationSuccess />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="about" element={<About />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="tnc" element={<TnC />} />
      </Route>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="participant" element={<ParticipantLayout />}>
          <Route path="home" element={<ParticipantHome />} />
          <Route path="my-account" element={<AccountIndex />} />
          <Route path="my-gift-codes" element={<GiftCodeIndex />} />
          <Route path="my-points" element={<PointIndex />} />
          <Route path="my-goals" element={<GoalIndex />} />
          <Route path="my-goals/:userGoalId" element={<GoalView />} />
          <Route path="select-merchants" element={<SelectMerchants />} />
          <Route path="browse-merchants" element={<BrowseMerchants />} />
          <Route path="select-global-merchant" element={<GlobalMerchants />} />
          <Route path="redeem/:merchantId" element={<RedeemMerchant />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="lead" element={<Lead />} />
          <Route path="peer-to-peer" element={<Peer2Peer />} />
          <Route path="leaderboards" element={<LeaderboardPage />} />
          <Route path="referral" element={<SubmitReferral />} />
          <Route path="suggestion_box" element={<SuggestionBox />} />
          <Route path="survey" element={<Survey />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="program_rules" element={<ProgramRules />} />
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="media/:categoryId" element={<Media />} />
          <Route path="iframe/:categoryId" element={<Iframe />} />
          <Route path="training" element={<Training />} />
          <Route path="feeling" element={<Feeling />} />
          <Route path="faqs" element={<Faqs />} />
          <Route path="about" element={<About />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="tnc" element={<TnC />} />
        </Route>
        <Route path="manager" element={<ManagerLayout />}>
          <Route path="home" element={<ManagerHome />} />
          <Route path="nspire-wall" element={<NSpireWall />} />
          <Route path="leaderboards" element={<Leaderboards />} />
          <Route path="program-settings" element={<ProgramSettings />} />
          <Route path="manage-and-reward" element={<ManageAndReward />} />
          <Route path="invite-participant" element={<InviteParticipant />} />
          <Route path="manage-account" element={<ManageAccount/>}>
          <Route path="invoice/:invoiceId" element={<ManagerViewInvoice/>}/>
          </Route>
          {/* <Route path="/" element={<BudgetPrograms />} /> */}
          <Route path="budget" element={<Budget />}/>
          <Route path="budget/manage-setup/:budgetId" element={<ManageBudget />} />
          <Route path="csv-import" element={<CsvImport/>}/>
          <Route path="referral" element={<Referral />} />
          <Route path="team" element={<Team />} />
          <Route path="my-account" element={<ManagerAccountIndex  />} />
          <Route path="team/:teamId" element={<TeamView />} />
          <Route path="report" element={<Report />}>
            <Route path="invoices" element={<Invoices />} />
            <Route path="invoices/:invoiceId" element={<Invoices />} />
            <Route path="supplier-redemption" element={<SupplierRedemption />} />
            <Route path="participant-account-summary" element={<ParticipantAccountSummary />} />
            <Route path="deposit-transfers" element={< DepositTransfers/>} />
            {/*<Route path="participant-status-summary" element={<ParticipantStatusSummary />} />*/}
            <Route path="program-status" element={<ProgramStatus />} />

            <Route path="annual-awards-summary" element={<AnnualAwardSummary />} />
            <Route path="referral-participant" element={<Engagement/>}/>
            <Route path="award-account-summary-gl" element={<AwardAccountSummaryGL />} />
            <Route path="award-detail" element={<AwardDetail />} />
            <Route path="award-summary" element={<AwardSummary />} />
            <Route path="file-import" element={<FileImport />} />
            <Route path="merchant-redemption" element={<MerchantRedemption/>}/>
            <Route
              path="quarterly-awards-summary"
              element={<QuarterlyAward />}
            />
            <Route
              path="participant-account-summary"
              element={<ParticipantAccount />}
            />
            <Route
              path="participant-status-summary"
              element={<ParticipantStatusSummary />}
            />
            <Route path="deposit-balance" element={<DepositBalance />} />
            <Route path="deposit-transfers" element={<DepositTransfer />} />
            <Route
              path="goal-progress-summay"
              element={<GoalProgressSummary />}
            />
          </Route>
          <Route path="referral_tools" element={<ReferralTools />} />
          <Route path="ref-participants/program/:programId" element={<RefParticipants />} />
          <Route path="faqs" element={<Faqs />} />
          <Route path="about" element={<About />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="tnc" element={<TnC />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  </MainWrapper>
);

export default RouteIndex;
