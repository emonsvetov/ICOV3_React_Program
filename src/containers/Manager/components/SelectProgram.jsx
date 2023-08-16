import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Input } from "reactstrap";
import CachedIcon from '@material-ui/icons/Cached';

import { setAuthProgram } from "@/containers/App/auth";
import { getProgram } from "@/services/program/getProgram";
import { getProgramBalance } from "@/services/program/getBalance";
import { getProgramTree } from "@/services/program/getProgramTree";
import { BuildProgramOptions, cacheProgramTree, getCachedProgramTree } from "@/shared/helpers";
import { useTranslation } from "react-i18next";

const SelectProgram = ({ auth, program, rootProgram, showRefresh = true, onChange, selected = null, label = 'For Program' }) => {
  const { t } = useTranslation();
  useEffect(() => {
    const cachedTree = getCachedProgramTree()
    if( cachedTree ) {
      setOptions(cachedTree);
    } else {
      if (rootProgram && rootProgram?.id) {
        getProgramTree(auth.organization_id, rootProgram.id).then((p) => {
          cacheProgramTree(p);
          setOptions(p);
        });
      }
    }
  }, [rootProgram]);

  const [options, setOptions] = useState([]);
  // console.log(program)
  const onProgramChange = (e) => {
    if( typeof onChange == 'function' ) {
      onChange(e);
      return;
    }
    getProgram(auth.organization_id, e.target.value).then((p) => {
      getProgramBalance(auth.organization_id, p.id)
      .then( balance => {
        p.balance = balance;
        setAuthProgram(p);
        window.location.reload();
      })
    });
  };
  if (!auth || !program) return t("loading");
  // console.log(program)
  const refreshProgramTree=()=>{
    getProgramTree(auth.organization_id, rootProgram.id).then((p) => {
      cacheProgramTree(p);
      setOptions(p);
    });
  }
  return (
    <>
      {label && <span className="form__form-group-label">{label}:</span>}
      <div className="form__form-group-field">
          <Input
            type="select"
            value={selected ? selected : program.id}
            name="program"
            id="program-select"
            onChange={onProgramChange}
          >
          <BuildProgramOptions programs={options} />
        </Input>
      </div>
     {showRefresh && <span alt="Refresh Program Tree"><CachedIcon style={{cursor:"pointer"}} onClick={refreshProgramTree}/></span>}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    rootProgram: state.rootProgram,
  };
};

export default connect(mapStateToProps)(SelectProgram);
