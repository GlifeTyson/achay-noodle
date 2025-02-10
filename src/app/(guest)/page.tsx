"use client";
import HomeIndex from "@/components/Home";
import { initEmailJS } from "@/services/emailjs";
import { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    initEmailJS();
  }, []);

  return (
    <div>
      <HomeIndex />
    </div>
  );
};

export default Page;
