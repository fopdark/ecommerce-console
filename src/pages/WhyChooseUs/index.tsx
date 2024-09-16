import React, { useEffect, useState } from 'react';
import { Button, Card, Flex, Form, Input, UploadFile } from 'antd';
import { uploadFiles } from '@/services/files';
import { create, getBenefits, update } from '@/services/why';
import TextArea from 'antd/es/input/TextArea';
import UploadImage from '@/components/UploadImage';
import { getImageUrl } from '@/utils/common';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const WhyChooseUsForm: React.FC<any> = () => {
  const [form] = Form.useForm();
  const [previewImages, setPreviewImages] = useState<UploadFile[]>();
  const [data, setData] = useState<any>();

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
      const image1 = await handleUploadFile(values?.advantages1?.img_source);
      const image2 = await handleUploadFile(values?.advantages1?.img_source);
      const image3 = await handleUploadFile(values?.advantages1?.img_source);
      const image4 = await handleUploadFile(values?.advantages1?.img_source);
      console.log('image1', image1);
      console.log('image2', image2);
      console.log('image3', image3);
      console.log('image4', image4);

      // const request = {
      //   ...values,
      //   // images: resUploadImages,
      //   // address: [values?.address],
      // };
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
        // address: [values?.address],
      };
      const res = await create(request);
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadFile = async (images: any) => {
    console.log('Upload event:', images);
    //   if (Array.isArray(e)) {
    //     return e;
    //   }
    //  return e && e.fileList;

    const res = await Promise.all(
      images.map(async (image: any, index: number) => {
        console.log('image', image);
        if (!image?.originFileObj) return;
        const res = await uploadFiles({
          files: [image?.originFileObj],
        });
        return res?.images?.[0];
      }),
    );

    console.log('res', res);
    return res?.[0];
  };

  const getFile = async (e: any) => {
    const image = await handleUploadFile(e);
    console.log('Upload event:', image);
    return 12;
  };

  const onFinish = async (values: any) => {
    console.log('values', values);
    // const requestData = {
    //   _id: data?._id,
    //   content: values?.content,
    //   advantages: [
    //     {
    //       content: values?.advantages1?.content,
    //       img_source: values?.advantages1?.img_source?.[0],
    //     },
    //     {
    //       content: values?.advantages2?.content,
    //       img_source: values?.advantages2?.img_source?.[0],
    //     },
    //     {
    //       content: values?.advantages3?.content,
    //       img_source: values?.advantages3?.img_source?.[0],
    //     },
    //     {
    //       content: values?.advantages4?.content,
    //       img_source: values?.advantages4?.img_source?.[0],
    //     },
    //   ],
    //   __v: 0,
    // };
    onUpdate(values);
  };

  const handleGetBenefit = async () => {
    const res = await getBenefits({});
    if (res) {
      console.log('res.data', res?.advantages[0]?.img_source);
      setData(res);
      form.setFieldsValue({
        content: res.content,
        advantages1: {
          content: res?.advantages[0]?.content,
          img_source: [
            {
              ...res?.advantages[0]?.img_source,
              url: getImageUrl(res?.advantages[0]?.img_source?.path),
            }]
        },
        advantages2: {
          content: res?.advantages[1]?.content,
          img_source: [{
            ...res?.advantages[1]?.img_source,
            url: getImageUrl(res?.advantages[1]?.img_source?.path),
          }]
        },
        advantages3: {
          content: res?.advantages[4]?.content,
          // img_source: [getImageUrl(res?.advantages[2]?.img_source?.path)],
          img_source: [{
            ...res?.advantages[2]?.img_source,
            url: getImageUrl(res?.advantages[2]?.img_source?.path),
          }]
        },
        advantages4: {
          content: res?.advantages[3]?.content,
          img_source: [{
            ...res?.advantages[3]?.img_source,
            url: getImageUrl(res?.advantages[3]?.img_source?.path),
          }]
        },
      });
    }
  };

  useEffect(() => {
    // if (data?._id) {
    //   form.setFieldsValue(data);
    // }
    handleGetBenefit();
  }, []);

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
      <Form.Item name="content" label="Nội Dung" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} rules={[{ required: true }]}>
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
              // setPreviewImages(images);
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
              // setPreviewImages(images);
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
              // setPreviewImages(images);
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
              // setPreviewImages(images);
            }}
            data={form.getFieldValue(['advantages4', 'img_source'])}
            limit={1}
          />
        </Form.Item>
        <Form.Item label="Nội dung" name={['advantages4', 'content']}>
          <Input />
        </Form.Item>
      </Card>
      {/* <Form.Item name="hot" label="Nổi bật" rules={[{ required: true }]}>
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
                    name={[field.name, 'image']}
                    label="Hình ảnh"
                    rules={[{ required: false }]}
                    valuePropName="data"
                    getValueFromEvent={(e) => getFile(e)}
                  >
                    <UploadImage
                      onChange={(images: UploadFile[]) => {
                        console.log('images nguyên con', images);
                        // form.setFieldValue('images', images);
                        // setPreviewImages(images);
                      }}
                      data={form.getFieldValue('images')}
                      limit={1}
                    />
                  </Form.Item>
                  <Form.Item label="Nội dung" name={[field.name, 'content']}>
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
      </Form.Item> */}
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
