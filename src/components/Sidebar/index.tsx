import React from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Flex, Menu } from "antd";
import type { MenuProps } from "antd";
import GeneralIcon from "../../images/icon/general.svg?react";
import ProductIcon from "../../images/icon/product.svg?react";
import OperationIcon from "../../images/icon/operation.svg?react";
import CertificateIcon from "../../images/icon/certificate.svg?react";
import GlobalIcon from "../../images/icon/global.svg?react";
import MediaIcon from "../../images/icon/media.svg?react";
import MailIcon from "../../images/icon/mail.svg?react";
import SearchIcon from "../../images/icon/search.svg?react";
import GraphIcon from "../../images/icon/graph.svg?react";
import SearchDocumentIcon from "../../images/icon/search-document.svg?react";
import TechnologyIcon from "../../images/icon/technology.svg?react";
import ScienceIcon from "../../images/icon/science.svg?react";
import ApplicationIcon from "../../images/icon/application.svg?react";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

interface SideBarProps {
  collapsed: boolean;
  isHidden: boolean;
}

const SideBar: React.FC<SideBarProps> = (props) => {
  const { collapsed = false, isHidden = false } = props;

  const items: MenuItem[] = [
    // getItem(
    //   "Dashboard",
    //   "generalSub",
    //   <GeneralIcon className={`${collapsed && "!ml-[-5px] !mb-[-5px]"}`} />,
    //   [getItem("Agency", "1")]
    // ),
    getItem(
      "Agency",
      "agency",
      <GeneralIcon className={`${collapsed && "!ml-[-5px] !mb-[-5px]"}`} />,
    ),
    // getItem(
    //   "Product",
    //   "product",
    //   <ProductIcon className={`${collapsed && "!ml-[-5px] !mb-[-5px]"}`} />
    // ),
    // getItem(
    //   "Operation",
    //   "operation",
    //   <OperationIcon className={`${collapsed && "!ml-[-5px] !mb-[-5px]"}`} />
    // ),
    // getItem(
    //   "Search",
    //   "search",
    //   <SearchIcon className={`${collapsed && "!ml-[-5px] !mb-[-5px]"}`} />
    // ),
    // getItem(
    //   "Technology",
    //   "technology",
    //   <TechnologyIcon className={`${collapsed && "!ml-[-5px] !mb-[-5px]"}`} />
    // ),

    // getItem("Navigation One", "sub1", <MailOutlined />, [
    //   getItem("Option 5", "5"),
    //   getItem("Option 6", "6"),
    //   getItem("Option 7", "7"),
    //   getItem("Option 8", "8"),
    // ]),

    // getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    //   getItem("Option 9", "9"),
    //   getItem("Option 10", "10"),

    //   getItem("Submenu", "sub3", null, [getItem("Option 11", "11"), getItem("Option 12", "12")]),
    // ]),
  ];

  return (
    <Menu
      className={`max-w-75 ${
        isHidden && "hidden"
      } lg:block lg:sticky top-20 lg:h-[calc(100vh_-_80px)]`}
      defaultSelectedKeys={["agency"]}
      // defaultOpenKeys={["agency"]}
      mode="inline"
      theme="light"
      inlineCollapsed={collapsed}
      items={items}
    />
  );
};

export default SideBar;
