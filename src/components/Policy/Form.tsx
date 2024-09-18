import React, { useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import CKEditorComponent from '../CKEditor';
import TextArea from 'antd/es/input/TextArea';
import { PUBLIC_DOMAIN } from '@/constant/ConstantCommon';
import { convertToSlug } from '@/utils/common';
import { create, update } from '@/services/policy';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const PolicyForm: React.FC<any> = ({ data, onSuccess }) => {
  const [form] = Form.useForm();
  const watchTitle = Form.useWatch('title', form);
  const watchSlug = Form.useWatch('slug', form);

  const onUpdate = async (values: any) => {
    try {
      await update(data?._id, values);
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  const onCreate = async (values: any) => {
    try {
      await create(values);
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values: any) => {
    if (data?.index) {
      onUpdate(values);
    } else {
      onCreate(values);
    }
  };
  useEffect(() => {
    form.setFieldValue('slug', convertToSlug(watchTitle));
  }, [watchTitle]);

  useEffect(() => {
    form.setFieldValue(
      'link',
      `${PUBLIC_DOMAIN}/policy/${convertToSlug(watchSlug)}`,
    );
  }, [watchSlug]);

  useEffect(() => {
    if (data?.index) {
      form.setFieldsValue(data);
    }
  }, [data]);

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
      id="policyForm"
    >
      <Form.Item name="index" label="Số thứ tự" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="link"
        label="Đường dẫn"
        rules={[{ required: true, defaultField: { type: 'url' } }]}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        name="slug"
        label="Đường dẫn mở rộng"
        rules={[{ required: true }]}
        getValueFromEvent={(event) => {
          return convertToSlug(event.currentTarget.value);
        }}
      >
        <Input disabled/>
      </Form.Item>
      <Form.Item name="status" label="Hiển Thị" rules={[{ required: true }]}>
        <Select
          options={[
            { value: 1, label: 'Hiển Thị' },
            { value: 0, label: 'Tạm Ẩn' },
          ]}
        />
      </Form.Item>
      <Form.Item name="title" label="Tên" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Mô tả" rules={[{ required: true }]}>
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name="content" label="Nội dung" rules={[{ required: true }]}>
        <CKEditorComponent
          onChange={(value: any) => form.setFieldValue('content', value)}
        />
      </Form.Item>
      <div className="px-2">
        <h2>SEO</h2>
        <Form.Item
          name={['seo', 'title']}
          label="Tiêu đề"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['seo', 'alt']}
          label="Alt"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['seo', 'keyword']}
          label="Keyword"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['seo', 'content']}
          label="Nội dung"
          rules={[{ required: true }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name={['seo', 'schema']}
          label="Schema JSON"
          rules={[{ required: true }]}
        >
          <TextArea rows={4} />
        </Form.Item>
      </div>
    </Form>
  );
};

export default PolicyForm;
