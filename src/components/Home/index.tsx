import React from "react";
import Menu from "@/components/Menu";
import Landing from "@/components/Landing";
import Reservation from "@/components/Reservation";

const HomeIndex = () => {
  return (
    <div>
      <Landing />
      <Menu />
      <Reservation />
    </div>
  );
};

export default HomeIndex;
