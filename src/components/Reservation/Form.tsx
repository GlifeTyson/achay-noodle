"use client";
import Button from "@/components/module/Button";
import Input from "@/components/module/Input";
import Modal from "@/components/module/Modal";
import { useToast } from "@/context/ToastContext";
import { sendEmail } from "@/services/emailjs";
import { contentModal } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
const Form = () => {
  const today = new Date().toISOString().split("T")[0];
  const formMethods = useForm({
    mode: "onChange",
    defaultValues: {
      user_name: "",
      user_email: "",
      number_of_guests: 1,
      date: new Date(),
      time: "12:00",
    },
    resolver: zodResolver(
      z.object({
        user_name: z.string().min(1, "Không được để trống tên"),
        user_email: z
          .string()
          .email("Email không đúng định dạng")
          .min(1, "Không được để trống email"),
        number_of_guests: z
          .number()
          .min(1, "Số lượng người phải lớn hơn 1")
          .max(20, "Số lượng người phải bé hơn 20"),
        date: z.date(),
        time: z.string().min(1),
      })
    ),
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = formMethods;
  const toast = useToast();

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const [open, setOpenModal] = useState(false);

  const onSubmit = async () => {
    const res = sendEmail("#form");

    toast.promise(res, {
      loadingContent: "Sending...",
      isSuccess: (data) => data.status === 200 && data.text === "OK",
      onSuccess: () => {
        setOpenModal(true);
        reset();
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
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-5 w-full h-full p-4 md:p-6 border border-black rounded-md text-playfair"
    >
      <span className="text-xl md:text-3xl font-medium">Đặt bàn ngay</span>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="col-span-1">
          <Controller
            control={control}
            name="user_name"
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                label="Tên"
                type="text"
                name="user_name"
                labelClassName="text-sm md:text-base"
                className="w-full h-7 md:h-9 text-sm md:text-base"
                errorMessage={errors.user_name?.message}
                onChange={onChange}
              />
            )}
          />
        </div>
        <div className="col-span-1">
          <Controller
            control={control}
            name="user_email"
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                label="Email"
                type="text"
                name="user_email"
                labelClassName="text-sm md:text-base"
                className="w-full h-7 md:h-9 text-sm md:text-base"
                errorMessage={errors.user_email?.message}
                onChange={onChange}
              />
            )}
          />
        </div>
        <div className="col-span-1">
          <Controller
            control={control}
            name="number_of_guests"
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                label="Số lượng người"
                type="number"
                name="number_of_guests"
                min={0}
                max={20}
                labelClassName="text-sm md:text-base"
                className="w-full h-7 md:h-9 text-sm md:text-base"
                errorMessage={errors.number_of_guests?.message}
                onChange={(value) => onChange(Number(value))}
              />
            )}
          />
        </div>
        <div className="col-span-1">
          <div className="flex flex-col gap-2 md:gap-2.5">
            <span className="text-base text-gray-700 font-medium">Ngày</span>
            <Input
              type="date"
              name="date"
              min={today}
              labelClassName="text-sm md:text-base"
              className="w-full h-7 md:h-9 text-sm md:text-base"
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
              className="w-full h-7 md:h-9 text-sm md:text-base"
            />
          </div>
        </div>
        <div className="col-span-1 md:col-span-2">
          <Button
            variant="outline"
            disabled={!isDirty}
            className="w-full h-9 rounded-lg"
            onClick={handleSubmit(onSubmit)}
          >
            Đặt bàn
          </Button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpenModal(false)}
        size="small"
        title={contentModal.label}
      >
        <div className="flex flex-col gap-4 items-center justify-center p-4">
          <div>
            <p>{contentModal.content1}</p>
            <p>{contentModal.content2}</p>
          </div>
          <Button
            variant="outline"
            containerClassName="w-fit h-8"
            onClick={() => {
              window.open("https://gmail.com", "_blank");
            }}
          >
            <span>{contentModal.button}</span>
          </Button>
        </div>
      </Modal>
    </form>
  );
};

export default Form;
