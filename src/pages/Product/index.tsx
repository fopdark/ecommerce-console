import React, { useEffect, useState } from 'react';
import { Button, Flex, Input, Modal, Select, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { deleteProduct, getProducts } from '@/services/product';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ProductForm from '@/components/Product/Form';

const dumData = {
  index: '123',
  link: 'https://init-nextjs.onrender.com/123',
  slug: 'slug',
  status: '1',
  name: '123',
  colors: ['#bf5858'],
  description: '123',
  content:
    '<p style="text-align:center;"><strong>nguyễn phước lợi</strong></p><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><i>xin chào hôm nay là ngày đẹp trời</i></p>',
  images: [
    {
      uid: 'rc-upload-1722954383108-2',
      lastModified: 1720683533716,
      lastModifiedDate: '2024-07-11T07:38:53.716Z',
      name: '800x700.png',
      size: 7431,
      type: 'image/png',
      percent: 0,
      originFileObj: {
        uid: 'rc-upload-1722954383108-2',
      },
      error: {
        status: 400,
        method: 'post',
        url: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
      },
      response: 'Max number of elements reached for this resource!',
      status: 'error',
      thumbUrl:
        'data:image/png;base64,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',
    },
  ],
  seo: {
    title: '123',
    alt: '123',
    keyword: '123',
    content: '123',
    schema: '123',
  },
};

const Products: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState<any>();

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const columns: TableColumnsType<any> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 150,
      // render: (value) => <Input value={value} />,
    },
    { title: 'Tên', dataIndex: 'title', key: 'title' },
    {
      title: 'Hiển Thị',
      dataIndex: 'status',
      key: 'status',
      render: (value) => (
        <p>{value === 1 ? 'Hiển Thị' : 'Tạm Ẩn'}</p>
        // <Select
        //   disabled
        //   style={{ width: 120 }}
        //   onChange={handleChange}
        //   value={value || 0}
        //   options={[
        //     { value: 1, label: 'Hiển Thị' },
        //     { value: 0, label: 'Tạm Ẩn' },
        //   ]}
        // />
      ),
    },
    {
      title: 'Thao Tác',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <div className="flex gap-2">
          <EditOutlined
            className="cursor-pointer"
            style={{
              fontSize: 20,
            }}
            onClick={() => {
              setModalOpen(true);
              setSelectedRow(record);
            }}
          />
          <DeleteOutlined
            className="cursor-pointer"
            style={{
              fontSize: 20,
            }}
            onClick={() => {
              handleDelete(record._id);
            }}
          />
        </div>
      ),
    },
  ];

  const handleGetProducts = async () => {
    try {
      const res = await getProducts({});
      console.log('res', res);
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      if (!id) return;
      const res = await deleteProduct(id);
      handleGetProducts();
      console.log('res', res);
    } catch (error) {
      console.log(error);
    }
  };

  const onCancel = () => {
    setModalOpen(false);
    setSelectedRow({});
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Sản phẩm" />
      <Modal
        title="Chi tiết sản phẩm"
        centered
        open={modalOpen}
        width={1000}
        onCancel={onCancel}
        destroyOnClose={true}
        footer={[
          <Flex justify="end" gap={10}>
            <Button key={'cancel'} onClick={() => setModalOpen(false)}>
              Hủy
            </Button>
            <Button
              form="productForm"
              key="submit"
              htmlType="submit"
              type="primary"
            >
              Đồng ý
            </Button>
          </Flex>,
        ]}
      >
        <ProductForm
          data={selectedRow}
          onSuccess={() => {
            setModalOpen(false);
            handleGetProducts();
          }}
        />
      </Modal>
      <Flex className="mb-4" justify="end">
        <Button
          className="ml-auto"
          type="primary"
          onClick={() => setModalOpen(true)}
        >
          Tạo
        </Button>
      </Flex>
      <Table columns={columns} dataSource={data} rowKey={'link'} />
    </>
  );
};

export default Products;
