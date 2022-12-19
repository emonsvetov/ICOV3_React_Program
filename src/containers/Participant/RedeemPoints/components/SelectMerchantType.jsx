import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SelectMerchantType = () => {
  const { t } = useTranslation();
  let navigate = useNavigate();
  return (
    <div className="select-merchant flex-column">
      <h3>{t("select_merchant_type")}</h3>
      <div
        className="panel p-4 yellow"
        onClick={() => navigate("/participant/browse-merchants")}
      >
        <h2>{t("redeem_points_desc_1")}</h2>
        <h4>{t("redeem_points_desc_2")}</h4>
      </div>

      <div
        className="panel mt-3 p-4 red"
        onClick={() => navigate("/participant/browse-merchants")}
      >
        <h2>{t("redeem_your_points")} </h2>
        <h4>{t("redeem_your_points_desc_1")}</h4>
        <h2>{t("redeem_your_points_desc_2")}</h2>
      </div>
    </div>
  );
};

export default SelectMerchantType;
