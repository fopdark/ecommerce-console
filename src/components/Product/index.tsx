import { useEffect, useState } from "react";
import { useFormik } from "formik";
// import { useTranslation } from "react-i18next";
import * as Yup from "yup";
//
// import ButtonCustom from "@/components/share-components/button";
// import Input from "@/components/share-components/form/Input";
// import { TextField, InputAdornment, Checkbox } from "@mui/material";
import checkDefaultSvg from "@/assets/svg/check-default.svg";
import checkSuccessSvg from "@/assets/svg/check-success.svg";
import viewSvg from "@/assets/svg/view.svg";
import unViewSvg from "@/assets/svg/un-view.svg";
import closeSvg from "@/assets/svg/close.svg";
import infoRedSvg from "@/assets/svg/info-red.svg";
// import Loading from "@/components/share-components/loading";
// import { callApiWithTryCatch } from "@/utils/apiUntils";
// import authService from "@/services/module/auth";
// import { useSelector } from "react-redux";
// import store, { RootState } from "@/store";
// import { setCurrentUser } from "@/store/slices/authSlice";
// import SnackbarCustom from "@/components/share-components/snackbarCustom";

const ProductForm = () => {
  // const { t } = useTranslation();
  // const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    type: string;
    message: string;
  }>({ open: false, type: "success", message: "" });
  const [passwordConditionsMet, setPasswordConditionsMet] = useState({
    length: false,
    uppercase: false,
    digit: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    isUpdatePassword: Yup.boolean(),
    phone_number: Yup.string()
      .matches(/[0-9]$/, t("ONLY_NUMBER"))
      .required(""),
    new_password: Yup.string().when("isUpdatePassword", {
      is: true,
      then: (schema) =>
        schema
          .required("")
          .min(8, t("REGISTER.PASSWORD.MIN_LENGTH"))
          .max(50)
          .matches(/^(?=.*[A-Z])(?=.*\d)/, t("REGISTER.PASSWORD.COMPLEXITY")),
      otherwise: (schema) => schema,
    }),
    password: Yup.string().when("isUpdatePassword", {
      is: true,
      then: (schema) => schema.required(""),
      otherwise: (schema) => schema,
    }),
    name: Yup.string().max(50).required(""),
  });
  const formik = useFormik<{
    email: string;
    password: string;
    new_password: string;
    name: string;
    phone_number: string;
    isUpdatePassword: boolean;
  }>({
    initialValues: {
      email: "",
      password: "",
      new_password: "",
      name: "",
      phone_number: "",
      isUpdatePassword: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handlePasswordChange = (event: any) => {
    const newPassword = event.target.value;
    formik.setFieldValue("new_password", newPassword);
    setPasswordConditionsMet({
      length: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      digit: /\d/.test(newPassword),
    });
  };

  const handleSubmit = async (values: {
    email: string;
    password: string;
    new_password: string;
    name: string;
    phone_number: string;
    isUpdatePassword: boolean;
  }) => {
    const requestData: UpdateProfileDTO = {
      password: values.password,
      new_password: values.new_password,
      name: values.name,
      phone_number: values.phone_number,
    };
    const res = await callApiWithTryCatch(
      () => authService.updateProfile(requestData),
      setLoading,
    );
    if (res?.errors?.password) {
      formik.setFieldError("password", res?.errors?.password);
    }
    if (res?.errors?.phone_number) {
      formik.setFieldError("phone_number", res?.errors?.phone_number);
    }
    if (res?.statusCode === 200) {
      setSnackbar({
        open: true,
        type: "success",
        message: t("NOTIFICATION.UPDATE_SUCCESSFULLY"),
      });
      store.dispatch(setCurrentUser(res.data));
    } else {
      if (res?.errors) {
        formik.setErrors({ ...res.errors });
        return;
      }
      setSnackbar({
        open: true,
        type: "failed",
        message: res?.message || t("NOTIFICATION.UPDATE_FAILED"),
      });
    }
  };

  // const isEnabledSubmitButton = () => {
  //   if (formik.values.isUpdatePassword) {
  //     return formik.isValid && formik.dirty;
  //   } else {
  //     return (
  //       formik.isValid &&
  //       formik.dirty &&
  //       (currentUser.name != formik.values.name ||
  //         currentUser.phone_number != formik.values.phone_number)
  //     );
  //   }
  // };

  // useEffect(() => {
  //   formik.setFieldValue("email", currentUser?.email || "");
  //   formik.setFieldValue("name", currentUser?.name || "");
  //   formik.setFieldValue("phone_number", currentUser?.phone_number || "");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentUser]);

  return (
    <p>Product Form</p>
    // <div className="bg-[#FFFFFF] rounded-[10px] py-8 px-[22px] mt-5 min-h-[600px]">
    //   <SnackbarCustom
    //     {...snackbar}
    //     onClose={() => setSnackbar({ open: false, type: "", message: "" })}
    //   />
    //   <Loading loading={loading}></Loading>
    //   <form onSubmit={formik.handleSubmit} className="max-w-[300px] mx-auto">
    //     <div className="flex flex-col justify-between min-h-[536px]">
    //       <div className="flex flex-col gap-3">
    //         <Input
    //           name={"email"}
    //           label={t("PROFILE.PROFILE.EMAIL.LABEL")}
    //           value={formik.values.email}
    //           onChange={formik.handleChange}
    //           onBlur={formik.handleBlur}
    //           error={formik.touched.email && Boolean(formik.errors.email)}
    //           helperText={formik.touched.email && formik.errors.email}
    //           placeholder={t("PROFILE.PROFILE.EMAIL.PLACEHOLDER")}
    //           disabled
    //         />
    //         {formik.values.isUpdatePassword && (
    //           <>
    //             <div>
    //               <p className="text-sm font-bold text-[#5F646F] mb-2">
    //                 {t("PROFILE.PROFILE.CURRENT_PASSWORD.LABEL")}
    //               </p>
    //               <TextField
    //                 sx={{
    //                   height: "40px !important",
    //                   ".MuiInputBase-root": {
    //                     height: "40px !important",
    //                     ".MuiOutlinedInput-input": {
    //                       py: 0,
    //                       padding: "9px 14px !important",
    //                     },
    //                   },
    //                 }}
    //                 type={showCurrentPassword ? "text" : "password"}
    //                 className="mt-[15px] input-custom"
    //                 required
    //                 fullWidth
    //                 variant="outlined"
    //                 value={formik.values.password}
    //                 onChange={formik.handleChange}
    //                 onBlur={formik.handleBlur}
    //                 error={
    //                   formik.touched.password && Boolean(formik.errors.password)
    //                 }
    //                 FormHelperTextProps={{ component: "div" }}
    //                 helperText={
    //                   formik.touched.password &&
    //                   formik?.errors?.password && (
    //                     <div className="flex gap-[6px]">
    //                       <img src={infoRedSvg} alt="error" />
    //                       <p className="text-[#FF5C46] text-xs">
    //                         {formik.errors.password}
    //                       </p>
    //                     </div>
    //                   )
    //                 }
    //                 placeholder={t(
    //                   "PROFILE.PROFILE.CURRENT_PASSWORD.PLACEHOLDER",
    //                 )}
    //                 name="password"
    //                 InputProps={{
    //                   endAdornment: (
    //                     <InputAdornment position="end">
    //                       <div
    //                         className="cursor-pointer"
    //                         onClick={() =>
    //                           setShowCurrentPassword(!showCurrentPassword)
    //                         }
    //                       >
    //                         <img
    //                           src={!showCurrentPassword ? viewSvg : unViewSvg}
    //                           alt=""
    //                         />
    //                       </div>
    //                     </InputAdornment>
    //                   ),
    //                 }}
    //                 inputProps={{
    //                   maxLength: 50,
    //                 }}
    //               />
    //             </div>
    //             <div>
    //               <p className="text-sm font-bold text-[#5F646F] mb-2">
    //                 {t("PROFILE.PROFILE.PASSWORD.LABEL")}
    //               </p>
    //               <TextField
    //                 type={showPassword ? "text" : "password"}
    //                 className="mt-[15px] input-custom"
    //                 required
    //                 fullWidth
    //                 variant="outlined"
    //                 placeholder={t("PROFILE.PROFILE.PASSWORD.PLACEHOLDER")}
    //                 sx={{
    //                   height: "40px !important",
    //                   ".MuiInputBase-root": {
    //                     height: "40px !important",
    //                     ".MuiOutlinedInput-input": {
    //                       py: 0,
    //                       padding: "9px 14px !important",
    //                     },
    //                   },
    //                 }}
    //                 name="new_password"
    //                 onInput={handlePasswordChange}
    //                 InputProps={{
    //                   endAdornment: (
    //                     <InputAdornment position="end">
    //                       <div
    //                         className="cursor-pointer"
    //                         onClick={() => setShowPassword(!showPassword)}
    //                       >
    //                         <img
    //                           src={!showPassword ? viewSvg : unViewSvg}
    //                           alt=""
    //                         />
    //                       </div>
    //                     </InputAdornment>
    //                   ),
    //                 }}
    //                 inputProps={{
    //                   maxLength: 50,
    //                 }}
    //                 onBlur={() => {
    //                   // if (isGmail(formik?.values?.email)) {
    //                   //   setModal(true);
    //                   // }
    //                 }}
    //               />
    //               <div className="text-[12px] text-[#9397A1] flex gap-[6px] leading-[18px] mt-[6px]">
    //                 <div
    //                   className={`flex items-center text-[12px] font-[600] px-[4px] py-[6px] gap-[2px] ${passwordConditionsMet.length ? "bg-[#EBF1FD] rounded-[4px] text-[#1C6BFF]" : ""}`}
    //                 >
    //                   <img
    //                     src={
    //                       !passwordConditionsMet.length
    //                         ? !formik.values.new_password
    //                           ? checkDefaultSvg
    //                           : closeSvg
    //                         : checkSuccessSvg
    //                     }
    //                     alt=""
    //                     className="w-[16px] h-[16px]"
    //                   />
    //                   <span>{t("REGISTER.8_DIGITS_OR_MORE")}</span>
    //                 </div>
    //                 <div
    //                   className={`flex items-center text-[12px] font-[600] px-[4px] py-[6px] gap-[2px] ${passwordConditionsMet.uppercase ? "bg-[#EBF1FD] rounded-[4px] text-[#1C6BFF]" : ""}`}
    //                 >
    //                   <img
    //                     src={
    //                       !passwordConditionsMet.uppercase
    //                         ? !formik.values.new_password
    //                           ? checkDefaultSvg
    //                           : closeSvg
    //                         : checkSuccessSvg
    //                     }
    //                     alt=""
    //                     className="w-[16px] h-[16px]"
    //                   />
    //                   <span>
    //                     {t("REGISTER.INCLUDE_UPPERCASE_ENGLISH_LETTERS")}
    //                   </span>
    //                 </div>
    //                 <div
    //                   className={`flex items-center text-[12px] font-[600] px-[4px] py-[6px] gap-[2px] ${passwordConditionsMet.digit ? "bg-[#EBF1FD] rounded-[4px] text-[#1C6BFF]" : ""}`}
    //                 >
    //                   <img
    //                     src={
    //                       !passwordConditionsMet.digit
    //                         ? !formik.values.new_password
    //                           ? checkDefaultSvg
    //                           : closeSvg
    //                         : checkSuccessSvg
    //                     }
    //                     alt=""
    //                     className="w-[16px] h-[16px]"
    //                   />
    //                   <span>{t("REGISTER.CONTAINS_NUMBERS")}</span>
    //                 </div>
    //               </div>
    //             </div>
    //           </>
    //         )}

    //         <Checkbox
    //           name="isUpdatePassword"
    //           sx={{
    //             display: "flex",
    //             justifyContent: "start",
    //             p: 0,
    //             "&.MuiCheckbox-root": {
    //               "&:hover": {
    //                 background: "transparent",
    //               },
    //             },
    //           }}
    //           value={formik.values.isUpdatePassword}
    //           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    //             formik.handleChange(event);
    //             formik.setFieldValue("password", "", false);
    //             formik.setFieldValue("new_password", "", false);
    //             setTimeout(() =>
    //               formik.setFieldTouched("isUpdatePassword", false),
    //             );
    //             setPasswordConditionsMet({
    //               length: false,
    //               uppercase: false,
    //               digit: false,
    //             });
    //           }}
    //           onBlur={formik.handleBlur}
    //           checkedIcon={
    //             <ButtonCustom
    //               background={"transparent"}
    //               borderRadius="4px"
    //               fontSize="14px"
    //               color={"#9397A1"}
    //               height="40px"
    //               width="120px"
    //             >
    //               <p className="text-center w-full text-sm font-bold">
    //                 {t("BUTTON.CANCEL_CHANGE")}
    //               </p>
    //             </ButtonCustom>
    //           }
    //           icon={
    //             <div className="flex flex-col gap-2">
    //               <p className="text-sm font-bold text-[#5F646F]">
    //                 {t("REGISTER.PASSWORD")}
    //               </p>
    //               <ButtonCustom
    //                 background={"#1C6BFF"}
    //                 color={"white"}
    //                 height="46px"
    //                 fontSize="14px"
    //                 width="160px"
    //               >
    //                 <div className="text-center w-full">
    //                   {t("PROFILE.PROFILE.CHANGE_PASSWORD")}
    //                 </div>
    //               </ButtonCustom>
    //             </div>
    //           }
    //         />

    //         <Input
    //           name={"name"}
    //           label={t("PROFILE.PROFILE.NAME.LABEL")}
    //           value={formik.values.name}
    //           onChange={formik.handleChange}
    //           onBlur={formik.handleBlur}
    //           error={formik.touched.name && Boolean(formik.errors.name)}
    //           helperText={formik.touched.name && formik.errors.name}
    //           placeholder={t("PROFILE.PROFILE.NAME.PLACEHOLDER")}
    //           textFieldProps={{
    //             inputProps: { maxLength: 50 },
    //           }}
    //         />
    //         <Input
    //           name={"phone_number"}
    //           label={t("PROFILE.PROFILE.PHONE.LABEL")}
    //           value={formik.values.phone_number}
    //           onChange={formik.handleChange}
    //           onBlur={formik.handleBlur}
    //           error={
    //             formik.touched.phone_number &&
    //             Boolean(formik.errors.phone_number)
    //           }
    //           helperText={
    //             formik.touched.phone_number && formik.errors.phone_number
    //           }
    //           placeholder={t("PROFILE.PROFILE.PHONE.PLACEHOLDER")}
    //           textFieldProps={{
    //             inputProps: { maxLength: 5000 },
    //           }}
    //         />
    //       </div>
    //       <div className="mt-5">
    //         <ButtonCustom
    //           background={isEnabledSubmitButton() ? "#1C6BFF" : "#EBEEF1"}
    //           borderColor={isEnabledSubmitButton() ? "#1C6BFF" : "#EBEEF1"}
    //           borderRadius="4px"
    //           fontSize="16px"
    //           color={isEnabledSubmitButton() ? "white" : "#C5C8CE"}
    //           height="44px"
    //           disabled={isEnabledSubmitButton() ? false : true}
    //           type="submit"
    //         >
    //           <p className="text-center w-full leading-[16px]">
    //             {t("BUTTON.SAVE")}
    //           </p>
    //         </ButtonCustom>
    //       </div>
    //     </div>
    //   </form>
    // </div>
  );
};
export default ProductForm;
