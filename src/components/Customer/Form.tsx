import React, { useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { create, update } from '@/services/customer';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const CustomerForm: React.FC<any> = ({ data, onSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      if (data?._id) {
        await update(data?._id, values);
      } else {
        await create(values);
      }
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (data?._id) {
      form.setFieldsValue(data);
    }
  }, [data]);

  return (
    <Form
      {...layout}
      initialValues={{ status: 1 }}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      //   style={{ maxWidth: '80vw' }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      className="pt-5 max-h-[80vh] overflow-y-auto"
      id="customerForm"
    >
      <Form.Item name="index" label="Số thứ tự" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item name="status" label="Trạng thái" rules={[{ required: true }]}>
        <Select
          options={[
            { value: 0, label: 'Đang chờ duyêt' },
            { value: 1, label: 'Đã xem' },
            { value: 2, label: 'Đã liên hệ' },
            { value: 3, label: 'Đã thông báo' },
          ]}
        />
      </Form.Item>
      <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Số Điện Thoại"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="content" label="nội dung" rules={[{ required: false }]}>
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name="note" label="Ghi chú" rules={[{ required: false }]}>
        <TextArea rows={4} />
      </Form.Item>
    </Form>
  );
};

export default CustomerForm;
