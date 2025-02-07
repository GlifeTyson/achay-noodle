import React from "react";

const Info = () => {
  return (
    <div className="w-full h-full p-4 md:p-6 text-playfair">
      <div className="flex flex-col items-center size-full rounded-md border-2 border-dashed border-black p-4">
        <span className="text-3xl">Giờ mở cửa</span>
        <p>-------------------</p>
        <div className="flex flex-col h-[50vh] justify-center">
          <div className="flex flex-col items-center gap-3 mt-10 font-medium">
            <p className="text-2xl">Tiệm mì A Chảy</p>
            <p>Chung cư 830, 12A2 Sư Vạn Hạnh, phường 13, quận 10</p>
          </div>
          <div className="mt-10 mx-auto">
            <p>Thứ 2 - Thứ 7</p>
            <p>
              Buổi sáng:
              <b> 6-12h</b>
            </p>
            <p>
              Buổi chiều:
              <b> 15h-21h</b>
            </p>
            <p>Chủ Nhật</p>
            <p>
              Buổi sáng:
              <b> 6-12h</b>
            </p>
            <p>
              Buổi chiều:
              <b> Dừng hoạt động</b>
            </p>
          </div>
        </div>
        <div>
          <p>Gọi điện đặt món, không giao hàng qua Grab</p>
          <p>
            C.Phượng (<b>09xx-xxx-xxx</b>)
          </p>
          <p>(Sáng thứ 2 - Sáng thứ 7)</p>
          <p>
            C.Phúc (<b>09xx-xxx-xxx</b>)
          </p>
          <p>(Chiều thứ 2 - Chiều thứ 7 - Sáng chủ nhật)</p>
        </div>
      </div>
    </div>
  );
};

export default Info;
