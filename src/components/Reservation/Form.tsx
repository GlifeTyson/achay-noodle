"use client";
import Button from "@/components/module/Button";
import Input from "@/components/module/Input";
import { useToast } from "@/context/ToastContext";
import { sendEmail } from "@/services/emailjs";
import { useState } from "react";

const Form = () => {
  const toast = useToast();

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const handleSubmit = async () => {
    const res = sendEmail("#form");

    toast.promise(res, {
      loadingContent: "Sending...",
      isSuccess: (data) => data.status === 200 && data.text === "OK",
      onSuccess: () => {
        return "An email has been sent to you!, please check your inbox";
      },
      onFail: () => {
        return "Fail occurred, please try again";
      },
      onError: (error: any) => {
        return error.message || "Error occurred, please try again";
      },
    });
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
          />
        </div>
        <div className="col-span-1">
          <Input
            label="Email"
            type="text"
            name="user_email"
            labelClassName="text-sm md:text-base"
            className="h-7 md:h-9 text-sm md:text-base"
          />
        </div>
        <div className="col-span-1">
          <Input
            label="Số lượng người"
            type="number"
            name="number_of_guests"
            labelClassName="text-sm md:text-base"
            className="h-7 md:h-9 text-sm md:text-base"
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
