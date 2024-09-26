import React, { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { getList } from '@/services/advise';
import AdviseForm from '@/components/Advise/Form';

const AdviseList: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState<any>();

  const handleGetList = async () => {
    try {
      const res = await getList({});
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
      <Breadcrumb pageName="Tư Vấn" />
      <AdviseForm
        data={selectedRow}
        onSuccess={() => {
          setModalOpen(false);
          handleGetList();
        }}
      />
    </>
  );
};

export default AdviseList;
