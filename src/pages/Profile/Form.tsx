import React from 'react';
import { Button, ColorPicker, Form, Input, Select, Space } from 'antd';
// import CKEditorComponent from '../CKEditor';
import TextArea from 'antd/es/input/TextArea';
import CKEditorComponent from '@/components/CKEditor';
import UploadImage from '@/components/Product/UploadImage';
// import UploadImage from './UploadImage';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ProfileForm: React.FC = () => {
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

  const formItems = [
    {
      label: 'Đường dẫn',
      name: 'link',
    },
    {
      label: 'Đường dẫn',
      name: 'link',
    },
  ];

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
    >
      {formItems.map(({ name, label }) => (
        <Form.Item name={name} label={label} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      ))}
      {/* <Form.Item name="index" label="Số thứ tự" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="color" label="Màu" rules={[{ required: true }]}>
        <ColorPicker defaultValue="#1677ff" />
        <ColorPicker defaultValue="#1677ff" />
        <ColorPicker defaultValue="#1677ff" />
        <ColorPicker defaultValue="#1677ff" />
        <ColorPicker defaultValue="#1677ff" />
        <ColorPicker defaultValue="#1677ff" />
        <ColorPicker defaultValue="#1677ff" />
        <ColorPicker defaultValue="#1677ff" />
        <ColorPicker defaultValue="#1677ff" />
        <ColorPicker defaultValue="#1677ff" />
      </Form.Item>
      <Form.Item name="description" label="Mô tả" rules={[{ required: true }]}>
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item name="content" label="Nội dung" rules={[{ required: true }]}>
        <CKEditorComponent />
      </Form.Item>
      <Form.Item
        name="images"
        label="Hình ảnh"
        rules={[{ required: true }]}
      >
        <UploadImage/>
      </Form.Item>
      <div className="px-2">
        <h2>SEO</h2>
        <Form.Item
          name="seo_title"
          label="Tiêu đề"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="seo_alt" label="Alt" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="seo_keyword"
          label="Keyword"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="seo_content"
          label="Nội dung"
          rules={[{ required: true }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="schema"
          label="Schema JSON"
          rules={[{ required: true }]}
        >
          <TextArea rows={4} />
        </Form.Item>
      </div> */}
      <div className="flex justify-end gap-4">
        <Button htmlType="button" onClick={onFill}>
          Hủy
        </Button>
        <Button type="primary" htmlType="submit">
          Đồng ý
        </Button>
      </div>
    </Form>
  );
};

export default ProfileForm;
