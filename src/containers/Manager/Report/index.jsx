
import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import { connect } from 'react-redux';
import { Container, Input } from 'reactstrap';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

const Report = ({ auth, program, organization }) => {
  const [reportTypes, setReportTypes] = useState([]);
  let navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`/reports/program/${program.id}`);
        console.log('Response data:', response.data);
        setReportTypes(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
        console.log('Error details:', error.response ? error.response.data : error.message);
      }
    };
  
    if (program.id) {
      fetchReports();
    }
  }, [program.id]);

  const onChange = (e) => {
    navigate(e.target.value);
  };

  let selectedValue = reportTypes.find(item => location.pathname.indexOf(item.link) !== -1)?.link || '';

  return (
    <div className='report'>
      <Container>
        <div style={{color:'white'}}>
          <h3>Reports</h3>
        </div>
        <div className="d-flex program-select my-3">
          <span>Select Report:</span>
          <div className='mb-0'>
            <Input type="select" value={selectedValue} name="report-type" onChange={onChange}>
              {reportTypes.map((item, index) => (
                <option key={index} value={item.link}>{item.name}</option>
              ))}
            </Input>
          </div>
        </div>
      </Container>
      <div style={{'padding': '5px 20px'}}>
        <Outlet />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};

export default connect(mapStateToProps)(Report);