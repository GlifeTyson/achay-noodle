"use client";

import React from "react";
import Input from "@/components/module/Input";

const Member = () => {
  return (
    <section id="member">
      <div className="h-screen">
        <h1 id="member" className="text-3xl">
          Member
        </h1>
        <div className="flex w-full justify-center">
          <Input
            id="member"
            type="radio"
            label="Member"
            labelClassName="mb-0"
            className="text-sm h-fit"
          />
        </div>
        <div className="flex w-full justify-center">
          <Input
            id="member"
            type="radio"
            label="Member"
            labelClassName="mb-0"
            className="text-sm h-fit"
          />
        </div>
      </div>
    </section>
  );
};

export default Member;
