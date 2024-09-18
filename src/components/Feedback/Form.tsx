import React, { useEffect, useState } from 'react';
import { Form, Input, Select, UploadFile } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import UploadImage from '../UploadImage';
import { uploadFiles } from '@/services/files';
import { createFeedback, updateFeedback } from '@/services/feedback';
import { handleUploadFile } from '@/utils/common';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const FeedbackForm: React.FC<any> = ({ data, onSuccess }) => {
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
      //       resUploadImages[index] = res?.images?.[0];
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
      const request = { ...values, iamge_url: resUploadImages?.[0] };
      delete request.images;
      const res = await updateFeedback(data?._id, request);
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
      const request = { ...values, image_url: resUploadImages?.images?.[0] };
      delete request.images;
      const res = await createFeedback(request);
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
      const originalData = { ...data, images: [data?.image_url] };
      form.setFieldsValue(originalData);
    }
  }, [data]);

  const watchImage = Form.useWatch('images', form);

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
      id="feedbackForm"
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
      <Form.Item name="images" label="Hình ảnh" rules={[{ required: true }]}>
        <UploadImage
          onChange={(images: UploadFile[]) => {
            form.setFieldValue('images', images);
            setPreviewImages(images);
          }}
          data={form.getFieldValue('images')}
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

export default FeedbackForm;
