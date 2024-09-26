import React, { useEffect } from 'react';
import { Button, Flex, Form, Input, Select } from 'antd';
import CKEditorComponent from '../CKEditor';
import TextArea from 'antd/es/input/TextArea';
import { create, update } from '@/services/advise';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AdviseForm: React.FC<any> = ({ data, onSuccess }) => {
  const [form] = Form.useForm();
  const onUpdate = async (values: any) => {
    try {
      const res = await update(data?._id, values);
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  const onCreate = async (values: any) => {
    try {
      const res = await create(values);
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values: any) => {
    if (data?._id) {
      onUpdate(values);
    } else {
      onCreate(values);
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
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      className="pt-5 overflow-y-auto"
      id="adviseForm"
    >
      <Form.Item name="status" label="Hiển Thị" rules={[{ required: false }]}>
        <Select
          options={[
            { value: 1, label: 'Hiển Thị' },
            { value: 0, label: 'Tạm Ẩn' },
          ]}
        />
      </Form.Item>
      <Form.Item name="title" label="Tên" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item name="content" label="Nội dung" rules={[{ required: false }]}>
        <CKEditorComponent
          onChange={(value: any) => form.setFieldValue('content', value)}
        />
      </Form.Item>
      <div className="px-2">
        <h2>SEO</h2>
        <Form.Item
          name={['seo', 'title']}
          label="Tiêu đề"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['seo', 'alt']}
          label="Alt"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['seo', 'keyword']}
          label="Keyword"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['seo', 'content']}
          label="Nội dung"
          rules={[{ required: false }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name={['seo', 'schema']}
          label="Schema JSON"
          rules={[{ required: false }]}
        >
          <TextArea rows={4} />
        </Form.Item>
      </div>
      <Flex justify="end" gap={10}>
        {/* <Button onClick={() => setModalOpen(false)}>Hủy</Button> */}
        <Button form="adviseForm" key="submit" htmlType="submit" type="primary">
          Đồng ý
        </Button>
      </Flex>
    </Form>
  );
};

export default AdviseForm;
