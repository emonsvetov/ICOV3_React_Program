import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Input } from "reactstrap";

import { setAuthProgram } from "@/containers/App/auth";
import { getProgram } from "@/services/program/getProgram";
import { getProgramTree } from "@/services/program/getProgramTree";

import { BuildProgramOptions, cacheProgramTree, getCachedProgramTree } from "@/shared/helpers";
import { useTranslation } from "react-i18next";

const SelectProgram = ({ auth, program, rootProgram }) => {
  const { t } = useTranslation();
  useEffect(() => {
    const cachedTree = getCachedProgramTree()
    if( cachedTree ) {
      setOptions(JSON.parse(cachedTree));
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
  const onChange = (e) => {
    // console.log(e.target.value)
    // // store.dispatch(setStoreProgram(e.target.value))
    getProgram(auth.organization_id, e.target.value).then((p) => {
      setAuthProgram(p);
      // console.log(getAuthProgram())
      window.location.reload();
    });
    // store.dispatch(setStoreProgram(getAuthProgram()))
  };
  if (!auth || !program) return t("loading");
  // console.log(program)
  return (
    <>
      <span>For&nbsp;Program:</span>
      <div className="mb-0">
        <Input
          type="select"
          value={program.id}
          name="program"
          id="program-select"
          onChange={onChange}
        >
          <BuildProgramOptions programs={options} />
        </Input>
      </div>
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
