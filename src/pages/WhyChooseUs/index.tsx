import React, { useEffect, useState } from 'react';
import { Button, Card, Flex, Form, Input, UploadFile } from 'antd';
import { getBenefits, update } from '@/services/why';
import TextArea from 'antd/es/input/TextArea';
import UploadImage from '@/components/UploadImage';
import { getImageUrl, handleUploadFile } from '@/utils/common';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const WhyChooseUsForm: React.FC<any> = () => {
  const [form] = Form.useForm();
  const [previewImages1, setPreviewImages1] = useState<UploadFile[]>();
  const [previewImages2, setPreviewImages2] = useState<UploadFile[]>();
  const [previewImages3, setPreviewImages3] = useState<UploadFile[]>();
  const [previewImages4, setPreviewImages4] = useState<UploadFile[]>();
  const [data, setData] = useState<any>();

  const onUpdate = async (values: any) => {
    try {
      const image1 = await handleUploadFile(previewImages1);
      const image2 = await handleUploadFile(previewImages2);
      const image3 = await handleUploadFile(previewImages3);
      const image4 = await handleUploadFile(previewImages4);

      const requestData = {
        _id: data?._id,
        content: values?.content,
        advantages: [
          {
            content: values?.advantages1?.content,
            img_source: image1,
          },
          {
            content: values?.advantages2?.content,
            img_source: image2,
          },
          {
            content: values?.advantages3?.content,
            img_source: image3,
          },
          {
            content: values?.advantages4?.content,
            img_source: image4,
          },
        ],
        __v: 0,
      };
      const res = await update(data?._id, requestData);
      console.log('res', res);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values: any) => {
    onUpdate(values);
  };

  const handleGetBenefit = async () => {
    const res = await getBenefits({});
    if (res) {
      setData(res);
      form.setFieldsValue({
        content: res.content,
        advantages1: {
          content: res?.advantages[0]?.content,
          img_source: [
            {
              ...res?.advantages[0]?.img_source,
              url: getImageUrl(res?.advantages[0]?.img_source?.path),
            },
          ],
        },
        advantages2: {
          content: res?.advantages[1]?.content,
          img_source: [
            {
              ...res?.advantages[1]?.img_source,
              url: getImageUrl(res?.advantages[1]?.img_source?.path),
            },
          ],
        },
        advantages3: {
          content: res?.advantages[2]?.content,
          // img_source: [getImageUrl(res?.advantages[2]?.img_source?.path)],
          img_source: [
            {
              ...res?.advantages[2]?.img_source,
              url: getImageUrl(res?.advantages[2]?.img_source?.path),
            },
          ],
        },
        advantages4: {
          content: res?.advantages[3]?.content,
          img_source: [
            {
              ...res?.advantages[3]?.img_source,
              url: getImageUrl(res?.advantages[3]?.img_source?.path),
            },
          ],
        },
      });
    }
  };

  useEffect(() => {
    handleGetBenefit();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Vì sao chọn chúng tôi" />
      <Form
        {...layout}
        initialValues={{ status: 1 }}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        className="pt-5 overflow-y-auto"
        id="contactForm"
      >
        <Form.Item
          name="content"
          label="Nội Dung"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[{ required: true }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Card size="small" title={`Nổi bật 1`}>
          <Form.Item
            name={['advantages1', 'img_source']}
            label="Hình ảnh"
            rules={[{ required: false }]}
          >
            <UploadImage
              onChange={(images: UploadFile[]) => {
                form.setFieldValue(['advantages1', 'img_source'], images);
                setPreviewImages1(images);
              }}
              data={form.getFieldValue(['advantages1', 'img_source'])}
              limit={1}
            />
          </Form.Item>
          <Form.Item label="Nội dung" name={['advantages1', 'content']}>
            <Input />
          </Form.Item>
        </Card>
        <Card size="small" title={`Nổi bật 2`}>
          <Form.Item
            name={['advantages2', 'img_source']}
            label="Hình ảnh"
            rules={[{ required: false }]}
          >
            <UploadImage
              onChange={(images: UploadFile[]) => {
                form.setFieldValue(['advantages2', 'img_source'], images);
                setPreviewImages2(images);
              }}
              data={form.getFieldValue(['advantages2', 'img_source'])}
              limit={1}
            />
          </Form.Item>
          <Form.Item label="Nội dung" name={['advantages2', 'content']}>
            <Input />
          </Form.Item>
        </Card>
        <Card size="small" title={`Nổi bật 3`}>
          <Form.Item
            name={['advantages3', 'img_source']}
            label="Hình ảnh"
            rules={[{ required: false }]}
          >
            <UploadImage
              onChange={(images: UploadFile[]) => {
                form.setFieldValue(['advantages3', 'img_source'], images);
                setPreviewImages3(images);
              }}
              data={form.getFieldValue(['advantages3', 'img_source'])}
              limit={1}
            />
          </Form.Item>
          <Form.Item label="Nội dung" name={['advantages3', 'content']}>
            <Input />
          </Form.Item>
        </Card>
        <Card size="small" title={`Nổi bật 4`}>
          <Form.Item
            name={['advantages4', 'img_source']}
            label="Hình ảnh"
            rules={[{ required: false }]}
          >
            <UploadImage
              onChange={(images: UploadFile[]) => {
                form.setFieldValue(['advantages4', 'img_source'], images);
                setPreviewImages4(images);
              }}
              data={form.getFieldValue(['advantages4', 'img_source'])}
              limit={1}
            />
          </Form.Item>
          <Form.Item label="Nội dung" name={['advantages4', 'content']}>
            <Input />
          </Form.Item>
        </Card>
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
    </>
  );
};

export default WhyChooseUsForm;
