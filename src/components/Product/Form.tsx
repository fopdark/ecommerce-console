import React, { useEffect, useState } from 'react';
import {
  Button,
  ColorPicker,
  Flex,
  Form,
  Input,
  Select,
  UploadFile,
} from 'antd';
import CKEditorComponent from '../CKEditor';
import TextArea from 'antd/es/input/TextArea';
import { PUBLIC_DOMAIN } from '@/constant/ConstantCommon';
import { convertToSlug, handleUploadFile } from '@/utils/common';
import UploadImage from '../UploadImage';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { uploadFiles } from '@/services/files';
import { createProduct, updateProduct } from '@/services/product';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const ProductForm: React.FC<any> = ({ data, onSuccess }) => {
  const [form] = Form.useForm();
  const [previewImages, setPreviewImages] = useState<UploadFile[]>();
  const watchTitle = Form.useWatch('title', form);
  const watchSlug = Form.useWatch('slug', form);
  const watchLink = Form.useWatch('link', form);

  const onUpdate = async (values: any) => {
    // console.log({ ...values, link: convertToSlug(values?.link), slug: 'slug' });
    try {
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
      const request = { ...values, images: resUploadImages };
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
    // if (!watchName) return;
    form.setFieldValue('slug', convertToSlug(watchTitle));
  }, [watchTitle]);

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
    form.setFieldValue(
      'link',
      `${PUBLIC_DOMAIN}/san-pham/${convertToSlug(watchSlug)}`,
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
      initialValues={{ status: 1 }}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      //   style={{ maxWidth: '80vw' }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      className="pt-5 max-h-[80vh] overflow-y-auto"
      id="productForm"
    >
      <Form.Item name="index" label="Số thứ tự" rules={[{ required: false }]}>
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
        <Input disabled />
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
      <Form.Item name="colors" label="Màu" rules={[{ required: true }]}>
        <Form.List name="colors">
          {(fields, { add, remove }) => (
            <Flex gap={10}>
              {fields.map((field, index) => (
                <Form.Item key={index}>
                  <Flex align="center" className="test" gap={5}>
                    <Form.Item
                      className="mb-0"
                      rules={[{ required: true }]}
                      {...field}
                      getValueFromEvent={(color) => {
                        return '#' + color.toHex();
                      }}
                      children={<ColorPicker />}
                    />
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Flex>
                </Form.Item>
              ))}

              <Form.Item className="mb-0">
                <Button onClick={() => add(null)} icon={<PlusOutlined />} />
              </Form.Item>
            </Flex>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="description" label="Mô tả" rules={[{ required: true }]}>
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name="content" label="Nội dung" rules={[{ required: true }]}>
        <CKEditorComponent
          onChange={(value: any) => form.setFieldValue('content', value)}
        />
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

export default ProductForm;
