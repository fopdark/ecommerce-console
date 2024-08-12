import React, { useEffect, useState } from 'react';
import { Button, Card, Flex, Form, Input, UploadFile } from 'antd';
import { uploadFiles } from '@/services/files';
import { create, update } from '@/services/why';
import { CloseOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import UploadImage from '@/components/UploadImage';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const WhyChooseUsForm: React.FC<any> = ({ data, onSuccess }) => {
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
        // address: [values?.address],
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
      <Form.Item name="content" label="Nội Dung" rules={[{ required: true }]}>
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="hot"
        label="Nổi bật"
        rules={[{ required: true }]}
      >
        <Form.List name="hot">
          {(fields, { add, remove }) => (
            <div
              style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}
            >
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`Nổi bật ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <Form.Item
                    name="images"
                    label="Hình ảnh"
                    rules={[{ required: true }]}
                  >
                    <UploadImage
                      onChange={(images: UploadFile[]) => {
                        form.setFieldValue('images', images);
                        // setPreviewImages(images);
                      }}
                      data={form.getFieldValue('images')}
                    />
                  </Form.Item>
                  <Form.Item label="Nội dung" name={[field.name, 'address']}>
                    <Input />
                  </Form.Item>
                </Card>
              ))}

              <Button type="dashed" onClick={() => add()} block>
                + Thêm điểm nổi bật
              </Button>
            </div>
          )}
        </Form.List>
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

export default WhyChooseUsForm;
