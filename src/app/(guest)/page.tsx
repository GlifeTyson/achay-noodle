"use client";
import HomeIndex from "@/components/Home";
import { initEmailJS } from "@/services/emailjs";
import "@/services/i18n/index";
import { Suspense, useEffect } from "react";
const Page = () => {
  useEffect(() => {
    initEmailJS();
  }, []);

  return (
    <Suspense fallback="loading">
      <HomeIndex />
    </Suspense>
  );
};

export default Page;
