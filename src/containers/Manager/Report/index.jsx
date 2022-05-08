import React from 'react';
import { connect } from 'react-redux';
import { 
  Container, 
  Input
} from 'reactstrap';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

const REPORT_TYPES = [
  {name: 'Invoices', link:'/manager/report/invoices'},
  // {name: 'Annual Awards Summary', link:'/manager/report/annual-awards-summary'},
  // {name: 'Award Account Summary GL ', link:'/manager/report/award-account-summary-gl'},
  // {name: 'Award Detail', link:'/manager/report/award-detail'},
  // {name: 'Award Summary', link:'/manager/report/award-summary'},
  // {name: 'File Import', link:'/manager/report/file-import'},
  // {name: 'Merchant Redemption', link:'/manager/report/merchant-redemption'},
  // {name: 'Quarterly Awards Summary', link:'/manager/report/quarterly-awards-summary'},
  // {name: 'Participant Account Summary', link:'/manager/report/participant-account-summary'},
  // {name: 'Participant Status Summary', link:'/manager/report/participant-status-summary'},
  {name: 'Program Status', link:'/manager/report/program-status'},
  // {name: 'Deposit Balance', link:'/manager/report/deposit-balance'},
  // {name: 'Deposit Transfers', link:'/manager/report/deposit-transfers'},
  // {name: 'Goal Progress Summary', link:'/manager/report/goal-progress-summay'},
]

const Report = ({auth, program, organization}) => {
  let navigate = useNavigate();
  const location = useLocation();
  const onChange = (e) => {
    navigate(e.target.value);
  }
  const ReportOptions = () =>(
    REPORT_TYPES.map((item, index) =>{
      return <option key={index} value={item.link}>{item.name}</option>
    })
  )

  return (
    <div className='report'>
      <Container>
        <div className="d-flex program-select my-3">
          <span>Select Report:</span>
          <div className='mb-0'>
            <Input type="select" value={location.pathname} name="report-type" onChange={onChange}>
              <ReportOptions />
            </Input>        
          </div>
        </div>        
        <Outlet />
      </Container>
    </div>
)}

const mapStateToProps = (state) => {
  return {
     auth: state.auth,
     program: state.program,
     organization: state.organization,
  };
};

export default connect(mapStateToProps)(Report);
