import React, { useState } from 'react';
import { Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const CustomizeForm: React.FC = () => {
  const [form] = Form.useForm();

  const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        break;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        break;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
        break;
      default:
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({ note: 'Hello world!', gender: 'male' });
  };

  const handleChange = () => {};

  const [value, setValue] = useState('0');
  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      //   style={{ maxWidth: '80vw' }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      className="pt-5 max-h-[80vh] overflow-y-auto"
      id='customerForm'
    >
      <Form.Item name="index" label="Số thứ tự" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="name" label="Họ Tên" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Số Điện Thoại"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="status" label="Trạng Thái" rules={[{ required: true }]}>
        <Select
          // style={{ width: 150 }}
          onChange={handleChange}
          value={value}
          options={[
            { value: '0', label: 'Đang chờ duyêt' },
            { value: '1', label: 'Đã xem' },
            { value: '2', label: 'Đã liên hệ' },
            { value: '3', label: 'Đã thông báo' },
          ]}
        />
      </Form.Item>
      <Form.Item name="content" label="Nội dung" rules={[{ required: true }]}>
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name="note" label="Ghi chú" rules={[{ required: true }]}>
        <TextArea rows={4} />
      </Form.Item>
    </Form>
  );
};

export default CustomizeForm;
