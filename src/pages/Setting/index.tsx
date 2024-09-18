import React, { useEffect, useState } from 'react';
import { Button, Card, Flex, Form, Input, UploadFile } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import UploadImage from '@/components/UploadImage';
import { getImageUrl, handleUploadFile } from '@/utils/common';
import { getSetting, update } from '@/services/setting';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const SettingForm: React.FC<any> = () => {
  const [form] = Form.useForm();
  const [previewImages1, setPreviewImages1] = useState<UploadFile[]>();
  const [previewImages2, setPreviewImages2] = useState<UploadFile[]>();
  const [previewImages3, setPreviewImages3] = useState<UploadFile[]>();
  const [previewImages4, setPreviewImages4] = useState<UploadFile[]>();
  const [previewImages5, setPreviewImages5] = useState<UploadFile[]>();
  const [previewImages6, setPreviewImages6] = useState<UploadFile[]>();
  const [data, setData] = useState<any>();

  const onUpdate = async (values: any) => {
    console.log('previewImages2', previewImages2)
    try {
      const image1 = await handleUploadFile(previewImages1);
      const image2 = await handleUploadFile(previewImages2);
      const image3 = await handleUploadFile(previewImages3);
      const image4 = await handleUploadFile(previewImages4);
      const image5 = await handleUploadFile(previewImages5);
      const image6 = await handleUploadFile(previewImages6);

      const requestData = {
        ...values,
        _id: data?._id,
        soccials: [
          {
            link: values?.social1?.link,
            image_url: image1,
          },
          {
            link: values?.social2?.link,
            image_url: image2,
          },
          {
            link: values?.social3?.link,
            image_url: image3,
          },
          {
            link: values?.social4?.link,
            image_url: image4,
          },
          {
            link: values?.social3?.link,
            image_url: image5,
          },
          {
            link: values?.social4?.link,
            image_url: image6,
          },
        ],
      };
      delete requestData.social1
      delete requestData.social2
      delete requestData.social3
      delete requestData.social4
      delete requestData.social5
      delete requestData.social6
      const res = await update(data?._id, requestData);
      console.log('res', res);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values: any) => {
    onUpdate(values);
  };

  const handleGet = async () => {
    const res = await getSetting();
    console.log('res', res)
    if (res) {
      setData(res);
      form.setFieldsValue({
        ...res,
        social1: {
          link: res?.soccials[0]?.link,
          image_url: [
            {
              ...res?.soccials[0]?.image_url,
              url: getImageUrl(res?.soccials[0]?.image_url?.path),
            },
          ],
        },
        social2: {
          link: res?.soccials[1]?.link,
          image_url: [
            {
              ...res?.soccials[1]?.image_url,
              url: getImageUrl(res?.soccials[1]?.image_url?.path),
            },
          ],
        },
        social3: {
          link: res?.soccials[2]?.link,
          image_url: [
            {
              ...res?.soccials[2]?.image_url,
              url: getImageUrl(res?.soccials[2]?.image_url?.path),
            },
          ],
        },
        social4: {
          link: res?.soccials[3]?.link,
          image_url: [
            {
              ...res?.soccials[3]?.image_url,
              url: getImageUrl(res?.soccials[3]?.image_url?.path),
            },
          ],
        },
        social5: {
          link: res?.soccials[4]?.link,
          image_url: [
            {
              ...res?.soccials[4]?.image_url,
              url: getImageUrl(res?.soccials[4]?.image_url?.path),
            },
          ],
        },
        social6: {
          link: res?.soccials[5]?.link,
          image_url: [
            {
              ...res?.soccials[5]?.image_url,
              url: getImageUrl(res?.soccials[5]?.image_url?.path),
            },
          ],
        },
      });
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      className="pt-5 overflow-y-auto flex flex-col gap-2"
      id="contactForm"
    >
      <Card size="small" title={`Mạng xã hội`}>
        <div className="grid grid-cols-2 gap-2">
          <Card size="small" title={`Zalo`}>
            <Form.Item
              name={['social1', 'image_url']}
              label="Hình ảnh"
              rules={[{ required: true }]}
            >
              <UploadImage
                onChange={(images: UploadFile[]) => {
                  form.setFieldValue(['social1', 'image_url'], images);
                  setPreviewImages1(images);
                }}
                data={form.getFieldValue(['social1', 'image_url'])}
                limit={1}
              />
            </Form.Item>
            <Form.Item label="Link" name={['social1', 'link']}>
              <Input />
            </Form.Item>
          </Card>
          <Card size="small" title={`Facebook`}>
            <Form.Item
              name={['social2', 'image_url']}
              label="Hình ảnh"
              rules={[{ required: true }]}
            >
              <UploadImage
                onChange={(images: UploadFile[]) => {
                  form.setFieldValue(['social2', 'image_url'], images);
                  setPreviewImages2(images);
                }}
                data={form.getFieldValue(['social2', 'image_url'])}
                limit={1}
              />
            </Form.Item>
            <Form.Item label="Link" name={['social2', 'link']}>
              <Input />
            </Form.Item>
          </Card>
          <Card size="small" title={`Linkedin`}>
            <Form.Item
              name={['social3', 'image_url']}
              label="Hình ảnh"
              rules={[{ required: true }]}
            >
              <UploadImage
                onChange={(images: UploadFile[]) => {
                  form.setFieldValue(['social3', 'image_url'], images);
                  setPreviewImages3(images);
                }}
                data={form.getFieldValue(['social3', 'image_url'])}
                limit={1}
              />
            </Form.Item>
            <Form.Item label="Link" name={['social3', 'link']}>
              <Input />
            </Form.Item>
          </Card>
          <Card size="small" title={`Instagram`}>
            <Form.Item
              name={['social4', 'image_url']}
              label="Hình ảnh"
              rules={[{ required: true }]}
            >
              <UploadImage
                onChange={(images: UploadFile[]) => {
                  form.setFieldValue(['social4', 'image_url'], images);
                  setPreviewImages4(images);
                }}
                data={form.getFieldValue(['social4', 'image_url'])}
                limit={1}
              />
            </Form.Item>
            <Form.Item label="Link" name={['social4', 'link']}>
              <Input />
            </Form.Item>
          </Card>
          <Card size="small" title={`X`}>
            <Form.Item
              name={['social5', 'image_url']}
              label="Hình ảnh"
              rules={[{ required: true }]}
            >
              <UploadImage
                onChange={(images: UploadFile[]) => {
                  form.setFieldValue(['social5', 'image_url'], images);
                  setPreviewImages5(images);
                }}
                data={form.getFieldValue(['social5', 'image_url'])}
                limit={1}
              />
            </Form.Item>
            <Form.Item label="Link" name={['social5', 'link']}>
              <Input />
            </Form.Item>
          </Card>
          <Card size="small" title={`Youtube`}>
            <Form.Item
              name={['social6', 'image_url']}
              label="Hình ảnh"
              rules={[{ required: true }]}
            >
              <UploadImage
                onChange={(images: UploadFile[]) => {
                  form.setFieldValue(['social6', 'image_url'], images);
                  setPreviewImages6(images);
                }}
                data={form.getFieldValue(['social6', 'image_url'])}
                limit={1}
              />
            </Form.Item>
            <Form.Item label="Link" name={['social6', 'link']}>
              <Input />
            </Form.Item>
          </Card>
        </div>
      </Card>

      <Card size="small" title={'SEO'}>
        <div className="px-2">
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
            label="Link"
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
      </Card>

      <Card size="small" title={'Thông tin chung'}>
        <div className="px-2">
          <Form.Item
            name={['google_iframe']}
            label="Google Iframe"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name={['google_analytics']}
            label="Google Analytics"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name={['body_js']}
            label="Body JS"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </div>
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
  );
};

export default SettingForm;
