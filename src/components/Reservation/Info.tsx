"use client";

import { contentInfo } from "@/utils/constants";

const Info = () => {
  return (
    <div className="w-full h-full p-4 md:p-6 text-playfair">
      <div className="flex flex-col items-center size-full rounded-md border-2 border-dashed border-black p-4">
        <span className="text-xl md:text-3xl font-medium">Giờ mở cửa</span>
        <p>-------------------</p>
        <div className="flex flex-col h-[50vh] justify-center">
          <div className="flex flex-col items-center gap-3 mt-10 font-medium">
            <p className="text-lg md:text-2xl">{contentInfo.title}</p>
            <p className="text-sm md:text-base">{contentInfo.address}</p>
          </div>
          <div className="text-sm md:text-base mt-10 mx-auto">
            <p>{contentInfo.days1}</p>
            <p>
              {contentInfo.days1Day}: <b>{contentInfo.workingTimeDay}</b>
            </p>
            <p>
              {contentInfo.days1Noon}: <b>{contentInfo.workingTimeNoon}</b>
            </p>
            <p>{contentInfo.days2}</p>
            {contentInfo.days1Day}: <b>{contentInfo.workingTimeDay}</b>
            <p>
              {contentInfo.days1Noon}: <b>{contentInfo.off}</b>
            </p>
          </div>
        </div>
        <div className="text-sm md:text-base">
          <p>{contentInfo.message}</p>
          <p>
            {contentInfo.name1}(<b>{contentInfo.phoneNumber1}</b>)
          </p>
          <p>({contentInfo.noteInfo1})</p>
          <p>
            {contentInfo.name2} (<b>{contentInfo.phoneNumber2}</b>)
          </p>
          <p>({contentInfo.noteInfo2})</p>
        </div>
      </div>
    </div>
  );
};

export default Info;
