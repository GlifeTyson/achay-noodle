"use client";

import { useTranslation } from "react-i18next";

const Info = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full h-full p-4 md:p-6 text-playfair">
      <div className="flex flex-col items-center size-full rounded-md border-2 border-dashed border-black p-4">
        <span className="text-xl md:text-3xl font-medium">
          {t("openingTime")}
        </span>
        <p>-------------------</p>
        <div className="flex flex-col h-[50vh] justify-center">
          <div className="flex flex-col items-center gap-3 mt-10 font-medium">
            <p className="text-lg md:text-2xl">{t("landingTitle")}</p>
            <p className="text-sm md:text-base">{t("address")}</p>
          </div>
          <div className="text-sm md:text-base mt-10 mx-auto">
            <p>{t("dayofweek")}</p>
            <p>
              {t("morning")}: <b>{t("dowMorning")}</b>
            </p>
            <p>
              {t("afternoon")}: <b>{t("dowAfternoon")}</b>
            </p>
            <p>{t("sunday")}</p>
            <p>
              {t("morning")}: <b>{t("dowMorning")}</b>
            </p>
            <p>
              {t("afternoon")}: <b>{t("closed")}</b>
            </p>
          </div>
        </div>
        <div className="text-sm md:text-base">
          <p>{t("infoFooter")}</p>
          <p>
            {t("member1")} (<b>{t("phone1")}</b>)
          </p>
          <p>({t("rangeOpen1")})</p>
          <p>
            {t("member2")} (<b>{t("phone1")}</b>)
          </p>
          <p>({t("rangeOpen2")})</p>
        </div>
      </div>
    </div>
  );
};

export default Info;
