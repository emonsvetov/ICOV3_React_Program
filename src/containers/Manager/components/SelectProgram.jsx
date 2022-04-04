import { connect } from 'react-redux';

import { 
    Col, 
    Container, 
    Row, 
    Table,
    FormGroup, 
    Input,
    Nav,
    NavItem,
    NavLink,
    Button,
  } from 'reactstrap';

const SelectProgram = ( { auth, program } ) => {
    if( !auth || !program ) return 'loading...'
    // console.log(program)
    // console.log(programId)
    const onChange = (e) => {
        console.log(e.target.value)
    }
    // console.log(auth)
    const ProgramOptions = () => (
        Object.keys(auth.programRoles).map( ( programId, i ) => {
            const p = auth.programRoles[programId];
            // console.log(program)
            const roleIds = Object.keys(p.roles)
            return roleIds.map( ( roleId ) => {
                const role = p.roles[roleId]
                if( auth.loginAs === role.name )    {
                    return <option key={`program-option-${p.id}`} value={`${p.id}`}>{p.name}</option>
                }
            })
        })
    )
    return (
        <FormGroup>  
            <Input type="select" defaultValue={program} name="program" id="program-select" onChange={onChange}>
                <ProgramOptions />
            </Input>
        </FormGroup>
    )
}

const mapStateToProps = (state) => {
    return {
       auth: state.auth,
       program: state.program
    };
  };
  
  export default connect(mapStateToProps)(SelectProgram);

