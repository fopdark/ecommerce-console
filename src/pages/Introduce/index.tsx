import React, { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import IntroduceForm from '@/components/Introduce/Form';
import { getList } from '@/services/introduce';

const IntroduceList: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState<any>();
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleGetList = async () => {
    try {
      const res = await getList({});
      console.log('res', res);
      setData(res);
      setSelectedRow(res);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    handleGetList();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Giới thiệu" />
      <IntroduceForm
        data={selectedRow}
        onSuccess={() => {
          setModalOpen(false);
          handleGetList();
        }}
      />
    </>
  );
};

export default IntroduceList;
