import React, { useState, useEffect } from "react";
import ReportTableFilter from "@/shared/components/table/components/ReportTableFilter";
import { useTranslation } from "react-i18next";

const GoalProgressSummary = () => {
  const { t } = useTranslation();

  // const [users, setUsers] = useState(null);
  // const [currentRow, setCurrentRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ keyword: "" });
  // selectedFlatRows.map(d => d.original)/

  // console.log(filter)
  /*
    useEffect(() => {
        let mounted = true;
        setLoading(true)
        apiTableService.fetchData(
            {
                url: `/organization/${organization.id}/program/${program.id}/user`,
                page: pageIndex,
                size: pageSize,
                filter
            }
        )
        .then(items => {
            if(mounted) {
                // console.log(items)
                setUsers(items)
                setLoading(false)
            }
        })
        return () => mounted = false;
    }, [getUsers, setLoading, setUsers, pageIndex, pageSize, filter])
    */

  useEffect(() => {
    // return setUsers[DEPOSIT_TRANSFER_DATA];
  }, []);

  if (loading) {
    return <p>{t("loading")}</p>;
  }

  return (
    <>
      <div className="users">
        <div className="header d-flex  justify-content-between">
          <ReportTableFilter filter={filter} setFilter={setFilter} />
        </div>
        <div>Consolidated Goal Progress Report 05/01/2022 - 05/31/2022</div>
      </div>
    </>
  );
};

export default GoalProgressSummary;
