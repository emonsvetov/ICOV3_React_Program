import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {setAuthProgram, getAuthProgram} from '@/containers/App/auth';
import {getProgram} from '@/services/program/getProgram';
import {getProgramTree} from '@/services/program/getProgramTree';

import { 
    Input,
  } from 'reactstrap';

const SelectProgram = ( { auth, program, rootProgram } ) => {

    useEffect(() => {
      if( rootProgram && rootProgram?.id ) {
        getProgramTree(auth.organization_id, rootProgram.id)
        .then( p => {
            setOptions( p )
        })
      }
    }, [rootProgram])
    

    const [options, setOptions] = useState([])
    // console.log(program)
    const onChange = (e) => {
        // console.log(e.target.value)
        // // store.dispatch(setStoreProgram(e.target.value))
        getProgram(auth.organization_id, e.target.value)
        .then( p => {
            console.log(p)
            setAuthProgram( p )
            // console.log(getAuthProgram())
            window.location.reload()
        })
        // store.dispatch(setStoreProgram(getAuthProgram()))
    }
    // console.log(auth)
    const ProgramOptions = ({programs, depth = 0}) => {
        // console.log(programs)
        
        let optionsHtml = []
        if( programs.length > 0) {
            programs.map( p => {
                optionsHtml.push(<option key={`program-option-${p.id}`} value={`${p.id}`}>{'-'.repeat(depth)} {p.name}</option>)
                if( p?.children && p.children.length > 0)   {
                    depth++;
                    optionsHtml.push(<ProgramOptions key={`program-option-group-${p.id}`} programs={p.children} depth={depth} />)
                }
            })
        }
        return optionsHtml
        // Object.keys(auth.programRoles).map( ( programId, i ) => {
        //     const p = auth.programRoles[programId];
        //     // console.log(program)
        //     const roleIds = Object.keys(p.roles)
        //     return roleIds.map( ( roleId ) => {
        //         const role = p.roles[roleId]
        //         if( auth.loginAs.name === role.name )    {
        //             return <option key={`program-option-${p.id}`} value={`${p.id}`}>{p.name}</option>
        //         }
        //     })
        // })
        return 'Hello'
    }
    if( !auth || !program ) return 'loading...'
    // console.log(program)
    return (
        <>
            <span>For Program:</span>
            <div className='mb-0'>
                <Input type="select" value={program.id} name="program" id="program-select" onChange={onChange}>
                    <ProgramOptions programs={options} />
                </Input>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
       auth: state.auth,
       program: state.program,
       rootProgram: state.rootProgram
    };
  };
  
  export default connect(mapStateToProps)(SelectProgram);

