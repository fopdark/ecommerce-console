import React, { useEffect, useState } from 'react';
import { Form, Input, Select, UploadFile } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import UploadImage from '../UploadImage';
import { uploadFiles } from '@/services/files';
import { create, update } from '@/services/slider';
import { handleUploadFile } from '@/utils/common';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const SliderForm: React.FC<any> = ({ data, onSuccess }) => {
  const [form] = Form.useForm();
  const [previewImages, setPreviewImages] = useState<UploadFile[]>();

  const onUpdate = async (values: any) => {
    try {
      // let resUploadImages: any = {};
      // if (previewImages && previewImages?.length > 0) {
      //   resUploadImages = [...previewImages];
      //   const requestImages = previewImages?.map(
      //     (image: UploadFile) => image?.originFileObj,
      //   );
      //   await Promise.all(
      //     requestImages.map(async (image: any, index: number) => {
      //       if (!image) return;
      //       const res = await uploadFiles({
      //         files: [image],
      //       });
      //       resUploadImages = res?.images?.[0];
      //     }),
      //   );
      // }
      let resUploadImages: any = [];
      if (previewImages && previewImages?.length > 0) {
        await Promise.all(
          previewImages.map(async (element, index) => {
            const image = await handleUploadFile([element]);
            resUploadImages[index] = image;
            return resUploadImages;
          }),
        );
      }
      const request = { ...values, image_url: resUploadImages };
      const res = await update(data?._id, request);
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  const onCreate = async (values: any) => {
    try {
      let resUploadImages: any = {};
      const requestImages = previewImages?.map(
        (image: UploadFile) => image?.originFileObj,
      );
      resUploadImages = await uploadFiles({
        files: requestImages,
      });
      console.log('resUploadImages', resUploadImages);
      const request = { ...values, image_url: resUploadImages?.images?.[0] };
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

  const watchImage = Form.useWatch('image_url', form);

  return (
    <Form
      {...layout}
      initialValues={{ status: 1 }}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      className="pt-5 max-h-[80vh] overflow-y-auto"
      id="sliderForm"
    >
      <Form.Item name="index" label="Số thứ tự" rules={[{ required: false }]}>
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
          data={
            form.getFieldValue('image_url')
              ? form.getFieldValue('image_url')
              : data?.image_url
              ? [data?.image_url]
              : []
          }
          limit={1}
        />
      </Form.Item>
    </Form>
  );
};

export default SliderForm;
