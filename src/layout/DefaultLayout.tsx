import React, { useState, ReactNode } from "react";
import { ConfigProvider, Flex } from "antd";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import LogoIcon from "../images/logo/logo.svg";
import MenuIcon from "../images/icon/menu.svg";
import MenuSidebar from "@/components/Drawers/MenuSidebar";

import * as lightTheme from "../ant-tokens/light.json";
import * as darkTheme from "../ant-tokens/dark.json";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const [light, setLight] = useState<boolean>(true);

  const handleChangeTheme = (checked: boolean) => {
    if (checked) setLight(true);
    else setLight(false);
  };

  return (
    <>
      <ConfigProvider theme={light ? lightTheme : darkTheme}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {/* <!-- ===== Header Start ===== --> */}
          <div className="flex sticky top-0 right-0 w-full z-[21]">
            <div
              className={`px-7 w-75 min-h-20 shadow-2 bg-white dark:bg-boxdark hidden lg:flex items-center justify-between`}
            >
              <div className="flex items-center gap-2">
                <img src={LogoIcon}  />
                {/* <p className="text-[#231F20] font-bold text-[8px] dark:text-white">
                  MEDIA AGENCY
                </p> */}
              </div>
              <img
                src={MenuIcon}
                className="w-[32px] h-[8.5px] cursor-pointer"
                alt="menu"
                onClick={toggleCollapsed}
              />
            </div>
            <div className="flex-1">
              <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
          </div>
          <MenuSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          <div className="flex main-ant-custom">
            {/* <!-- ===== Sidebar Start ===== --> */}
            <Sidebar isHidden={true} collapsed={collapsed} />
            {/* <!-- ===== Sidebar End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main className="w-full">
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-0">{children}</div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
        </div>
      </ConfigProvider>
    </>
  );
};

export default DefaultLayout;
