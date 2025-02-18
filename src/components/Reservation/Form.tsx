"use client";
import Button from "@/components/module/Button";
import Input from "@/components/module/Input";
import Modal from "@/components/module/Modal";
import { useToast } from "@/context/ToastContext";
import { sendEmail } from "@/services/emailjs";
import { contentModal } from "@/utils/constants";
import { formSchema } from "@/validator/emailForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import CustomDatePicker from "../module/ui/DatePicker";

const initValue = {
  user_name: "",
  user_email: "",
  number_of_guests: 1,
  date: new Date().toISOString().split("T")[0],
  time: "07:00",
};
const Form = () => {
  const toast = useToast();
  const { t } = useTranslation();

  const [currentTime, setCurrentTime] = useState("");
  const [open, setOpenModal] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  // const today = new Date();
  const formMethods = useForm({
    mode: "onChange",
    defaultValues: initValue,
    resolver: zodResolver(formSchema),
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = formMethods;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
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

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    setCurrentTime(`${hours}:${minutes}`);
  }, []);

  return (
    <form
      id="form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-5 w-full h-fit p-4 md:p-6 border border-black rounded-md text-playfair"
    >
      <span className="text-xl md:text-3xl font-medium">{t("booking")}</span>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="col-span-1">
          <Controller
            control={control}
            name="user_name"
            render={({ field: { value, onChange } }) => (
              <Input
                required
                label={t("name")}
                type="text"
                name="user_name"
                className="w-full h-8 md:h-10 text-sm md:text-lg"
                defaultValue={value}
                labelClassName="text-sm md:text-lg"
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
                required
                defaultValue={value}
                label={t("email")}
                type="text"
                name="user_email"
                labelClassName="text-sm md:text-lg"
                className="w-full h-8 md:h-10 text-sm md:text-lg"
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
                required
                defaultValue={value}
                label={t("number_of_guest")}
                type="number"
                name="number_of_guests"
                min={0}
                max={20}
                labelClassName="text-sm md:text-lg"
                className="w-full h-8 md:h-10 text-sm md:text-lg"
                errorMessage={errors.number_of_guests?.message}
                onChange={(value) => onChange(Number(value))}
              />
            )}
          />
        </div>
        <div className="col-span-1">
          <Controller
            control={control}
            name="date"
            render={({ field: { value, onChange } }) => (
              <CustomDatePicker
                isClearable
                showIcon
                required
                value={today}
                title="Date"
                name="date"
                label="Date"
                wrapperClassname="flex flex-col justify-between size-full"
                labelClassName="text-sm md:text-lg"
                placeholderText="YYYY-MM-DD"
                className="w-full h-8 md:h-10 text-sm placeholder:pl-2 placeholder:text-xs placeholder:md:text-lg md:text-lg border border-gray-200 text-gray-800"
                onSelect={onChange}
              />
            )}
          />
        </div>
        <div className="col-span-1">
          <div className="flex flex-col gap-2 md:gap-2.5">
            <Controller
              control={control}
              name="time"
              render={({ field: { value, onChange } }) => (
                <>
                  <Input
                    required
                    defaultValue={value}
                    label={t("time")}
                    type="time"
                    name="time"
                    labelClassName="text-sm md:text-lg"
                    className="w-full h-8 md:h-10 text-sm md:text-lg"
                    onChange={onChange}
                  />
                </>
              )}
            />
          </div>
        </div>
        <div className="col-span-1 md:col-span-2">
          <Button
            variant="outline"
            // disabled={!isDirty}
            className="w-full h-10 rounded-lg"
            onClick={handleSubmit(onSubmit)}
          >
            {t("headerTitle3")}
          </Button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpenModal(false)}
        size="small"
        title={contentModal.label}
      >
        <div className="flex flex-col gap-6 items-center justify-center p-4">
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
