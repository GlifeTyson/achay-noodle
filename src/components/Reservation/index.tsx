import React from "react";
import Info from "./Info";

const Reservation = () => {
  return (
    <section id="reservation" className="bg-flour px-6">
      <h1 id="reservation" className="text-playfair text-5xl font-medium">
        Đặt bàn
      </h1>
      <div className="w-full h-screen p-5 md:p-10">
        <div className="flex flex-col w-full h-full md:flex-row">
          <div className="w-full md:w-1/2 h-full bg-darkFlour rounded-md">
            <Info />
          </div>
          <div className="flex-1 border border-black"></div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
