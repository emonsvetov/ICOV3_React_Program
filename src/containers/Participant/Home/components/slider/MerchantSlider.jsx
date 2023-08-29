import { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Themed } from '@/theme';
import { getMerchants } from "@/services/program/getMerchants";

const MerchantSlider = ( {program} ) => {
  const [merchants, setMerchants] = useState([]);
  useEffect(() => {
    if ( program?.id ) {
      getMerchants(program.organization_id, program.id)
      .then( res => {
        setMerchants(res)
      })
    }
  }, [program]);

  return (
    <Themed component={"MerchantSlider"} data={merchants} />
  )
}
const mapStateToProps = (state, props) => {
  return {
    program: state?.program?.id ? state.program : props.program
  };
};
export default connect(mapStateToProps)(MerchantSlider);