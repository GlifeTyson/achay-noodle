"use client";
import Button from "@/components/module/Button";
import Input from "@/components/module/Input";
import { sendEmail } from "@/services/emailjs";
import { getConfigs } from "@/utils/config";
import { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const { serviceId, templateId } = getConfigs();

  const handleSubmit = async () => {
    try {
      await sendEmail("#form");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <form
      id="form"
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-5 w-full h-full p-4 md:p-6"
    >
      <span className="text-xl md:text-3xl font-medium">Đặt bàn ngay</span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="col-span-1">
          <Input
            label="Tên"
            type="text"
            name="user_name"
            labelClassName="text-sm md:text-base"
            className="h-7 md:h-9 text-sm md:text-base"
            onChange={(value) => {
              setFormData({
                ...formData,
                user_name: value,
              });
            }}
          />
        </div>
        <div className="col-span-1">
          <Input
            label="Email"
            type="text"
            name="user_email"
            labelClassName="text-sm md:text-base"
            className="h-7 md:h-9 text-sm md:text-base"
            onChange={(value) => {
              setFormData({
                ...formData,
                user_email: value,
              });
            }}
          />
        </div>
        <div className="col-span-1">
          <Input
            label="Số lượng người"
            name="number_of_guests"
            type="number"
            labelClassName="text-sm md:text-base"
            className="h-7 md:h-9 text-sm md:text-base"
            onChange={(e) => {
              console.log(e);
            }}
          />
        </div>
        <div className="col-span-1">
          <div className="flex flex-col gap-2 md:gap-2.5">
            <span className="text-base text-gray-700 font-medium">Ngày</span>
            <Input
              type="date"
              name="date"
              labelClassName="text-sm md:text-base"
              className="h-7 md:h-9 text-sm md:text-base"
              onChange={(e) => {
                console.log(e);
              }}
            />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col gap-2 md:gap-2.5">
            <span className="text-base text-gray-700 font-medium">Ngày</span>
            <Input
              type="time"
              name="time"
              labelClassName="text-sm md:text-base"
              className="h-7 md:h-9 text-sm md:text-base"
              onChange={(e) => {
                console.log(e);
              }}
            />
          </div>
        </div>
        <div className="col-span-1 md:col-span-2">
          <Button
            variant="outline"
            className="w-full h-9 rounded-lg"
            onClick={handleSubmit}
          >
            Đặt bàn
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Form;
