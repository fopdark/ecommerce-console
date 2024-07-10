import React from "react";
import { Drawer } from "antd";
import SideBar from "../Sidebar";
import LogoIcon from "../../images/logo/logo.svg";

interface MenuSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const MenuSidebar: React.FC<MenuSidebarProps> = (props) => {
  const { sidebarOpen, setSidebarOpen } = props;

  const onClose = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <Drawer
        title={
          <div
            className={`px-7 w-75 min-h-20 shadow-2 bg-white dark:bg-boxdark flex items-center justify-between`}
          >
            <div className="flex items-center gap-2">
              <img src={LogoIcon} />
              {/* <p className="text-[#231F20] font-bold text-[8px] dark:text-white">
                SEOUL SEMICONDUCTOR
              </p> */}
            </div>
          </div>
        }
        classNames={{
          header: "!p-0",
          body: "!p-0",
        }}
        placement={"left"}
        width={300}
        onClose={onClose}
        open={sidebarOpen}
        closeIcon={false}
      >
        <SideBar collapsed={false} isHidden={false} />
      </Drawer>
    </>
  );
};

export default MenuSidebar;
