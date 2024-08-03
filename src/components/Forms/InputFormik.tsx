import { Input } from 'antd';

function InputFormik(props: any) {
  return (
    <Input
      name={'name'}
    //   label={'label'}
         value={formik.values.email}
         onChange={formik.handleChange}
      //    onBlur={formik.handleBlur}
      //    error={formik.touched.email && Boolean(formik.errors.email)}
      //    helperText={formik.touched.email && formik.errors.email}
      //    placeholder={t("PROFILE.PROFILE.EMAIL.PLACEHOLDER")}
      disabled
    />
  );
}

export default InputFormik;
