import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { 
  Container, 
} from 'reactstrap';

import SearchIcon from 'mdi-react/SearchIcon';
import SelectProgram from '../components/SelectProgram'
import ProgramParticipants from './components/ProgramParticipants'
import {getBalance} from "@/services/program/getBalance";

const ManageAndReward = ({auth, program, organization}) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (organization?.id && program?.id) {
      getBalance(organization.id, program.id)
        .then((data) => {
          console.log(data)
          setBalance(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [organization, program]);

  if( !organization?.id || !program?.id || !auth ) return 'loading...'

  return (
    <div className='manage-reward'>
      <Container>
        <div style={{color:'white'}}>
          <h3>Manage & Reward</h3>
          {/*<div>You can search for users by name, email or unit/suite number(if applicable), reward users instantly, or deactivate an account.</div>*/}
          {/*<div>You can also select or multiple users from the list to send an email</div>*/}

        </div>
        <div className='my-4 d-flex program-select justify-content-between'>
          <div className="d-flex">
            <SelectProgram />
          </div>
          <div className='d-flex'>
            {/*<SearchIcon size={36} className='icon'/>*/}
            {/*<span>Search Program</span>*/}
          </div>
        </div>
        <div align="right">Current Balance: ${balance.toFixed(2)}</div>
        <ProgramParticipants organization={organization} program={program} />
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

export default connect(mapStateToProps)(ManageAndReward);
