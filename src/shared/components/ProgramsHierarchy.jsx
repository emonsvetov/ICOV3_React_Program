import React, { useState } from 'react';
import CheckboxHierarchy from '@/shared/components/form/CheckboxHierarchy'
import axios from 'axios'
import {connect} from "react-redux";
import {useQuery} from "react-query";
import {isEmpty} from '@/shared/helpers'

const ProgramsHierarchy = ({defaultPrograms, organization, program, selectedPrograms, setSelectedPrograms}) => {
  const [programs, setPrograms] = useState([]);

  const fetchProgramData = async (pageFilterO) => {
    const params = []
    let paramStr = ''
    if( pageFilterO ) {
      if(pageFilterO.status !== 'undefined' && pageFilterO.status) params.push(`status=${pageFilterO.status}`)
      if(pageFilterO.keyword !== 'undefined' && pageFilterO.keyword) params.push(`keyword=${pageFilterO.keyword}`)
      // console.log(params)
      paramStr = params.join('&')
    }
    const apiUrl = `/organization/${organization.id}/program/${program.id}/descendents?includeSelf=1`

    if(isEmpty(programs)) {
      try {
        const response = await axios.get(
          apiUrl
        );
        // console.log(response);
        if (response.data.length === 0) return {results: [], count: 0}
        const data = response.data;
        setPrograms(data);
        return data;
      } catch (e) {
        throw new Error(`API error:${e?.message}`);
      }
    }
  };

  const queryPageFilter = '';
  const {isLoading, error, data, isSuccess} = useQuery(
    ['programs', queryPageFilter],
    () => fetchProgramData(queryPageFilter),
    {
      keepPreviousData: true,
      staleTime: Infinity,
    }
  );

  if (programs) {
    return (
      <>
        <CheckboxHierarchy
          name="programs[]"
          attr='account_holder_id'
          options={programs}
          fields={selectedPrograms}
          setFields={setSelectedPrograms}
          isRoot={true}
          label='View for Program'
        />
      </>
    );
  }

  return '';
};

const mapStateToProps = (state) => {
  return {
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(ProgramsHierarchy);