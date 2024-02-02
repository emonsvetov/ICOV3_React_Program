import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import { connect } from 'react-redux';
import { Container, Input } from 'reactstrap';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const Report = ({ auth, program, organization }) => {
  const [reportTypes, setReportTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/reports/${program.id}`);
        setReportTypes(response.data);
        if (response.data.length > 0) {
          navigate(response.data[0].link);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
        navigate('/manager/report'); 
      } finally {
        setIsLoading(false);
      }
    };
    if (program.id) {
      fetchReports();
    } else {
      navigate('/');
    }
  }, [program.id]);

  const onChange = (e) => {
    navigate(e.target.value);
  };

  let selectedValue = reportTypes.find(item => location.pathname.includes(item.link))?.link || '';

  return (
    <div className='report'>
      <Container>
        <div style={{color: 'white'}}>
          <h3>Reports</h3>
        </div>
        {isLoading ? (
          <div style={{ padding: '20px 0px', color: 'white' }}>
            <p>Loading reports...</p> 
          </div>
        ) : reportTypes.length > 0 ? (
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
        ) : (
          <div style={{ padding: '20px 0px', color: 'white' }}>
            <p>No reports available at the moment.</p>
          </div>
        )}
      </Container>
      <div style={{'padding': '5px 20px'}}>
        <Outlet />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};

export default connect(mapStateToProps)(Report);
