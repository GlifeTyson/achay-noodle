import React from "react";
import Member from "@/components/Member";
import Menu from "@/components/Menu";
// import Contact from "@/components/Contact";
import Landing from "@/components/Landing";

const HomeIndex = () => {
  return (
    <div>
      <Landing />
      <Menu />
      <Member />
      {/* <Contact /> */}
    </div>
  );
};

export default HomeIndex;
