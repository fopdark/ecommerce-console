import React, { ReactNode, useState } from "react";

import { ConfigProvider } from "antd";
import * as lightTheme from "../ant-tokens/light.json";
import * as darkTheme from "../ant-tokens/dark.json";

const EmptyLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const [light, setLight] = useState<boolean>(true);

  const handleChangeTheme = (checked: boolean) => {
    if (checked) setLight(true);
    else setLight(false);
  };

  return (
    <ConfigProvider theme={light ? lightTheme : darkTheme}>
      {/* <!-- ===== Main Content Start ===== --> */}
      <main>{children}</main>
      {/* <!-- ===== Main Content End ===== --> */}
    </ConfigProvider>
  );
};

export default EmptyLayout;
