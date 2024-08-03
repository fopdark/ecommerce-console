import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import CKEditorComponent from '../../components/CKEditor';
import {
  EyeOutlined,
  PhoneOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';

const ECommerce: React.FC = () => {
  return (
    <>
      {/* <CKEditorComponent /> */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="" total="Cấu Hình Website" rate="" levelUp>
          <SettingOutlined />
        </CardDataStats>
        <CardDataStats title="" total="Tài Khoản" rate="" levelUp>
          <UserOutlined />
        </CardDataStats>
        <CardDataStats title="" total="Đổi Mật Khẩu" rate="" levelUp>
          <EyeOutlined />
        </CardDataStats>
        <CardDataStats title="" total="Liên Hệ" rate="" levelDown>
          <PhoneOutlined />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        {/* <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard /> */}
      </div>
    </>
  );
};

export default ECommerce;
