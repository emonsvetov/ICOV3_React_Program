import React, { useEffect, useState} from "react";

import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import {getGiftCodes} from '@/services/user/getGiftCodes'
import { Themed } from "@/theme";

const MyGiftCodes = ({ auth, organization, program }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  let [giftCodes, setGiftCodes] = useState(null);

  useEffect(() => {
    if (organization && program) {
      setLoading(true);
      getGiftCodes(organization.id, program.id, auth.id)
        .then((data) => {
          setGiftCodes(data);
          setLoading(false)
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }, [organization, program]);

  const props = {
    giftCodes
  }
  if( loading ) return t('loading')
  return <Themed component="MyGiftCodes" {...props} />
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};

export default connect(mapStateToProps)(MyGiftCodes);
