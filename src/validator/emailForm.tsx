import { z } from "zod";

export const formSchema = z.object({
  user_name: z.string().min(1, "Không được để trống tên"),
  user_email: z
    .string()
    .email("Email không đúng định dạng")
    .min(1, "Không được để trống email"),
  number_of_guests: z
    .number()
    .min(1, "Số lượng người phải lớn hơn 1")
    .max(20, "Số lượng người phải bé hơn 20"),
  date: z.string().min(1, "Không được trống ngày"),
  time: z.string().min(1, "Không được để trống thời gian"),
});
