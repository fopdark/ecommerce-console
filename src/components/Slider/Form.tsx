import React, { useEffect, useState } from 'react';
import { Form, Input, Select, UploadFile } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import UploadImage from '../UploadImage';
import { uploadFiles } from '@/services/files';
import { createProduct, updateProduct } from '@/services/product';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const SliderForm: React.FC<any> = ({ data, onSuccess }) => {
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
      const request = { ...values, image_url: resUploadImages };
      const res = await updateProduct(data?._id, request);
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
      resUploadImages = await uploadFiles({
        files: requestImages,
      });
      const request = { ...values, ...resUploadImages };
      const res = await createProduct(request);
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
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      className="pt-5 max-h-[80vh] overflow-y-auto"
      id="sliderForm"
    >
      <Form.Item name="index" label="Số thứ tự" rules={[{ required: true }]}>
        <Input />
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
      <Form.Item name="image_url" label="Hình ảnh" rules={[{ required: true }]}>
        <UploadImage
          onChange={(images: UploadFile[]) => {
            form.setFieldValue('image_url', images);
            setPreviewImages(images);
          }}
          data={form.getFieldValue('image_url')}
          limit={1}
        />
      </Form.Item>
    </Form>
  );
};

export default SliderForm;
