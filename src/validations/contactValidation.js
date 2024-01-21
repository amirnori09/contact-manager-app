import * as yup from "yup";

export const contactSchema = yup.object().shape({
  fullname: yup.string().required("نام و نام خانوادگی الزامی میباشد"),
  photo: yup.string().url("آدرس معتبر نیست").required("عکس الزامی میباشد "),
  mobile: yup.number().required("شماره تلفن الزامیست"),
  email: yup.string().email("ادرس ایمیل معتبر نیست").required("ایمیل الزامی میباشد"),
  job: yup.string().nullable(),
  group: yup.string().required("انتخاب گروه الزامی میباشد"),
});
