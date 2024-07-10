import React from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

import KoreanIcon from "../../images/icon/south-korea.png";
import EnglishIcon from "../../images/icon/united-kingdom.png";
import JapanIcon from "../../images/icon/japan.png";
import VietNamIcon from "../../images/icon/vietnam.png";

const SelectedLanguage: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    {
      label: (
        <div className="flex gap-2 items-center">
          <img src={KoreanIcon} className="w-5 h-5" />
          <p>Korean</p>
        </div>
      ),
      value: "ko",
    },
    {
      label: (
        <div className="flex gap-2 items-center">
          <img src={EnglishIcon} className="w-5 h-5" />
          <p>English</p>
        </div>
      ),
      value: "en",
    },
    {
      label: (
        <div className="flex gap-2 items-center">
          <img src={JapanIcon} className="w-5 h-5" />
          <p>Japanese</p>
        </div>
      ),
      value: "ja",
    },
    {
      label: (
        <div className="flex gap-2 items-center">
          <img src={VietNamIcon} className="w-5 h-5" />
          <p>Vietnamese</p>
        </div>
      ),
      value: "vi",
    },
  ];

  const handleChange = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  return (
    <Select
      className="w-full"
      defaultValue={localStorage.getItem("language") || "ko"}
      onChange={handleChange}
      options={languages.map(({ label, value }) => ({
        label: label,
        value: value,
      }))}
    />
  );
};

export default SelectedLanguage;
