import React from "react";
import Member from "@/components/Member";
import Menu from "@/components/Menu";
// import Contact from "@/components/Contact";
import Landing from "@/components/Landing";
import Discover from "@/components/Discover";

const HomeIndex = () => {
  return (
    <div>
      <Landing />
      <Menu />
      <Member />
      <Discover />
    </div>
  );
};

export default HomeIndex;
