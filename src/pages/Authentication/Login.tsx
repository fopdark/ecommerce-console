import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoDark from "../../images/logo/logo-dark.svg";
import Logo from "../../images/logo/logo.svg";
import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import EmptyLayout from "@/layout/EmptyLayout";
import { v4 as uuid } from "uuid";
import { loginWithAccount } from "@/service/Agency";
import { CommonContext } from "@/context/CommonContext";
import { toast } from "react-toastify";

type FieldType = {
  email?: string;
  password?: string;
  // remember?: boolean;
};

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleSetAccessToken, handleSetUser, access_token } =
    useContext(CommonContext);

  const onFinish = async (values: any) => {
    try {
      const tmpRequestData = {
        ...values,
        device_id: uuid(),
        device_model: window.navigator.platform,
        device_os: "web",
        provider_type: "default",
      };
      const res = await loginWithAccount(tmpRequestData);
      if (res?.user?.profile?.is_agency) {
        handleSetAccessToken(res?.meta?.access_token?.token);
        handleSetUser(res?.user);
        navigate("/");
      } else {
        toast.error(t("user_not_found"));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (access_token) {
      navigate("/");
    }
  }, [access_token]);

  return (
    <EmptyLayout>
      <div className="flex flex-col items-center justify-center bg-white h-screen">
        <div className="min-w-100 p-10">
          <div className="flex flex-col items-center justify-center gap-5 mb-15">
            <Link className="" to="/">
              <img className="hidden dark:block" src={Logo} alt="Logo" />
              <img className="dark:hidden" src={LogoDark} alt="Logo" />
            </Link>
            <p className="text-[#231F20] font-bold text-lg">AGENCY</p>
          </div>
          <Form
            name="basic"
            // labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="flex flex-col gap-4"
          >
            <Form.Item<FieldType>
              // label="Username"
              className="mb-4"
              name="email"
              rules={[
                { required: true, message: t("login.username.required") },
              ]}
            >
              <Input
                placeholder={t("login.username.placeholder")}
                className="py-4 pl-5 text-base"
              />
            </Form.Item>

            <Form.Item<FieldType>
              // label="Password"
              className="mb-8"
              name="password"
              rules={[
                { required: true, message: t("login.password.required") },
              ]}
            >
              <Input.Password
                placeholder={t("login.password.placeholder")}
                className="py-4 pl-5 text-base"
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
              <Button
                htmlType="submit"
                className="w-full text-base py-[18px] rounded-lg h-auto mr-0 "
              >
                {t("button.login")}
              </Button>
            </Form.Item>

            {/* <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 0, span: 24 }}
            >
              <Checkbox> {t("login.remember")}</Checkbox>
            </Form.Item> */}
          </Form>
        </div>
        <p className="absolute bottom-10 text-black text-xs">
          COPYRIGHTS ⓒ 2024 Metacrew Co., Ltd.​
        </p>
      </div>
    </EmptyLayout>
  );
};

export default Login;
