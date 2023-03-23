import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";

const languageOptions = [
  { value: "en-US", label: "English" },
  { value: "es", label: "Español" },
];

const LanguageBar = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState();

  const onSelectLanguage = (selectedOption) => {
    // alert(JSON.stringify(selectedOption))
    i18n.changeLanguage(selectedOption.value);
    setLanguage(selectedOption);
  };

  useEffect(() => {
    let lang = localStorage.getItem("i18nextLng") || "en-US";
    let option = languageOptions.filter((item) => item.value == lang)[0];
    // console.log("option: participant topbar", lang);
    setLanguage(option);
  }, []);

  return (
    <div style={{zIndex: 2}}>
      <Select
        options={languageOptions}
        value={language}
        onChange={onSelectLanguage}
      />
    </div>
  );
};

export default LanguageBar;