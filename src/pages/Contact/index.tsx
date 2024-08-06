import React, { useEffect } from 'react';
import { Button, Flex, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { PUBLIC_DOMAIN } from '@/constant/ConstantCommon';
import { convertToSlug } from '@/utils/common';
import CKEditorComponent from '@/components/CKEditor';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const ContactForm: React.FC<any> = ({ isParent }) => {
  const [form] = Form.useForm();
  const watchName = Form.useWatch('name', form);
  const watchSlug = Form.useWatch('slug', form);
  const watchLink = Form.useWatch('link', form);

  const onFinish = (values: any) => {
    console.log({ ...values, link: convertToSlug(values?.link), slug: 'slug' });
  };

  // const onReset = () => {
  //   form.resetFields();
  // };

  // const onFill = () => {
  //   form.setFieldsValue({ note: 'Hello world!', gender: 'male' });
  // };

  useEffect(() => {
    // if (!watchName) return;
    form.setFieldValue('slug', convertToSlug(watchName));
  }, [watchName]);

  //   useEffect(() => {
  //     // if (!watchLink) return;
  //     const index  = watchLink?.lastIndexOf("/")
  // console.log("index", index, watchLink?.slice(index+1))
  //     const slug = watchLink?.slice(index+1)
  //     form.setFieldValue('slug', convertToSlug(slug));

  //   }, [watchLink]);

  useEffect(() => {
    // console.log(watchSlug)
    // if(!watchSlug) return
    form.setFieldValue('link', `${PUBLIC_DOMAIN}/${convertToSlug(watchSlug)}`);
  }, [watchSlug]);

  return (
    <>
      <Breadcrumb pageName="Liên hệ" />
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        //   style={{ maxWidth: '80vw' }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        className="pt-5  overflow-y-auto"
        id="contactForm"
      >
        {/* <Form.Item
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
      >
        <Input />
      </Form.Item> */}
        {/* <Form.Item name="index" label="Số thứ tự" rules={[{ required: true }]}>
        <Input />
      </Form.Item> */}
        {/* <Form.Item name="status" label="Hiển Thị" rules={[{ required: true }]}>
        <Select
          options={[
            { value: '1', label: 'Hiển Thị' },
            { value: '0', label: 'Tạm Ẩn' },
          ]}
        />
      </Form.Item> */}
        <Form.Item name="content" label="Nội dung" rules={[{ required: true }]}>
          <CKEditorComponent
            onChange={(value: any) => form.setFieldValue('content', value)}
          />
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
        </div>
        <Flex justify="end" gap={10}>
          <Button key="submit" htmlType="submit" type="primary">
            Lưu
          </Button>
        </Flex>
      </Form>
    </>
  );
};

export default ContactForm;
