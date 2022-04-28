import { connect } from 'react-redux';
import {setAuthProgram} from '@/containers/App/auth';
import {getProgram} from '@/services/program/getProgram';

import { 
    Input,
  } from 'reactstrap';

const SelectProgram = ( { auth, program } ) => {
    // console.log(program)
    const onChange = (e) => {
        // console.log(e.target.value)
        // // store.dispatch(setStoreProgram(e.target.value))
        getProgram(auth.organization_id, e.target.value)
        .then( p => {
            setAuthProgram( p )
            window.location.reload()
        })
        // store.dispatch(setStoreProgram(getAuthProgram()))
    }
    // console.log(auth)
    const ProgramOptions = () => (
        Object.keys(auth.programRoles).map( ( programId, i ) => {
            const p = auth.programRoles[programId];
            // console.log(program)
            const roleIds = Object.keys(p.roles)
            return roleIds.map( ( roleId ) => {
                const role = p.roles[roleId]
                if( auth.loginAs.name === role.name )    {
                    return <option key={`program-option-${p.id}`} value={`${p.id}`}>{p.name}</option>
                }
            })
        })
    )
    if( !auth || !program ) return 'loading...'
    // console.log(program)
    return (
        <>
            <span>For Program:</span>
            <div className='mb-0'>
                <Input type="select" defaultValue={program.id} name="program" id="program-select" onChange={onChange}>
                    <ProgramOptions />
                </Input>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
       auth: state.auth,
       program: state.program
    };
  };
  
  export default connect(mapStateToProps)(SelectProgram);

