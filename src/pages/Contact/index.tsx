import React, { useEffect, useState } from 'react';
import { Button, Flex, Form, Input, Select, UploadFile } from 'antd';
import { uploadFiles } from '@/services/files';
import { create, update } from '@/services/contact';
import CKEditorComponent from '@/components/CKEditor';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const IntroduceForm: React.FC<any> = ({ data, onSuccess }) => {
  const [form] = Form.useForm();
  const [previewImages, setPreviewImages] = useState<UploadFile[]>();

  const onUpdate = async (values: any) => {
    try {
      let resUploadImages: any = {};
      if (previewImages && previewImages?.length > 0) {
        resUploadImages = [...previewImages];
        const requestImages = previewImages?.map(
          (image: UploadFile) => image?.originFileObj,
        );
        await Promise.all(
          requestImages.map(async (image: any, index: number) => {
            if (!image) return;
            const res = await uploadFiles({
              files: [image],
            });
            resUploadImages[index] = res?.images?.[0];
          }),
        );
      }
      const request = {
        ...values,
        images: resUploadImages,
        address: [values?.address],
      };
      const res = await update(data?._id, request);
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  const onCreate = async (values: any) => {
    try {
      let resUploadImages = {};
      const requestImages = previewImages?.map(
        (image: UploadFile) => image?.originFileObj,
      );
      if (requestImages && requestImages?.length > 0) {
        resUploadImages = await uploadFiles({
          files: requestImages,
        });
      }

      const request = {
        ...values,
        ...resUploadImages,
        address: [values?.address],
      };
      const res = await create(request);
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
    if (data?._id) {
      form.setFieldsValue(data);
    }
  }, [data]);

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      className="pt-5 overflow-y-auto"
      id="contactForm"
    >
      <Form.Item name="hotline" label="Hotline" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="phone1"
        label="Số điện thoại (1)"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="name1" label="Tên (1)" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="phone2"
        label="Số điện thoại (2)"
        rules={[{ required: false }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="name2" label="Tên (2)" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item name="content" label="Nội dung" rules={[{ required: false }]}>
        <CKEditorComponent
          onChange={(value: any) => form.setFieldValue('content', value)}
        />
      </Form.Item>
      <Flex justify="center" gap={10}>
        <Button
          form="contactForm"
          key="submit"
          htmlType="submit"
          type="primary"
        >
          Đồng ý
        </Button>
      </Flex>
    </Form>
  );
};

export default IntroduceForm;
