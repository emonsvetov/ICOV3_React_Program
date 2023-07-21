import React, { useState } from 'react';
import CheckboxHierarchy from '@/shared/components/form/CheckboxHierarchy'
import axios from 'axios'
import {connect} from "react-redux";
import {useQuery} from "react-query";
import {isEmpty} from '@/shared/helpers'

const MerchantsHierarchy = ({defaultMerchants, organization, selectedMerchants, setSelectedMerchants}) => {
  const [merchants, setMerchants] = useState([]);

  const fetchProgramData = async (pageFilterO) => {
    const params = []
    let paramStr = ''
    if( pageFilterO ) {
      if(pageFilterO.status !== 'undefined' && pageFilterO.status) params.push(`status=${pageFilterO.status}`)
      if(pageFilterO.keyword !== 'undefined' && pageFilterO.keyword) params.push(`keyword=${pageFilterO.keyword}`)
      // console.log(params)
      paramStr = params.join('&')
    }
    const apiUrl = `/organization/${organization.id}/merchant?page=0&limit=9999999999&minimal=1&tree=1`

    if(isEmpty(merchants)) {
      try {
        const response = await axios.get(
          apiUrl
        );
        // console.log(response);
        if (response.data.length === 0) return {results: [], count: 0}

        const data = response.data;
        setMerchants(data);
        return data;
      } catch (e) {
        throw new Error(`API error:${e?.message}`);
      }
    }
  };

  const queryPageFilter = '';
  const {isLoading, error, data, isSuccess} = useQuery(
    ['merchants', queryPageFilter],
    () => fetchProgramData(queryPageFilter),
    {
      keepPreviousData: true,
      staleTime: Infinity,
    }
  );

  if (merchants) {
    return (
      <>
        <CheckboxHierarchy
          name="merchants[]"
          attr='id'
          options={merchants}
          fields={selectedMerchants}
          setFields={setSelectedMerchants}
          isRoot={true}
          label='View for Merchants'
        />
      </>
    );
  }

  return '';
};


const mapStateToProps = (state) => {
  return {
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(MerchantsHierarchy);
