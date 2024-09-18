import React, { useEffect, useState } from 'react';
import { Button, Card, Flex, Form, Input, UploadFile } from 'antd';
import { uploadFiles } from '@/services/files';
import { create, getList, update } from '@/services/contact';
import CKEditorComponent from '@/components/CKEditor';
import { CloseOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const ContactForm: React.FC<any> = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<any>();

  const onUpdate = async (values: any) => {
    try {
      await update(data?._id, values);
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
        // address: [values?.address],
      };
      const res = await create(request);
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values: any) => {
    if (data?._id) {
      onUpdate(values);
    } else {
      onCreate(values);
    }
  };

  const handleGetContact = async () => {
    try {
      const res = await getList({});
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data?._id) {
      form.setFieldsValue(data);
    }
  }, [data]);

  useEffect(() => {
    handleGetContact();
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
      <Form.Item name="hotline" label="Hotline" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="address_list"
        label="Liên lạc"
        rules={[{ required: true }]}
      >
        <Form.List name="address_list">
          {(fields, { add, remove }) => (
            <div
              style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}
            >
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`Địa chỉ ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <Form.Item label="Địa chỉ" name={[field.name, 'address']}>
                    <Input />
                  </Form.Item>

                  {/* Nest Form.List */}
                  <Form.Item label="Hotline">
                    <Form.List name={[field.name, 'phone']}>
                      {(subFields, subOpt) => (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: 16,
                          }}
                        >
                          {subFields.map((subField) => (
                            <Flex key={subField.key} gap={10}>
                              <div className="flex flex-1 justify-between gap-5">
                                <Form.Item
                                  className="mb-0 w-1/2"
                                  label="Số điện thoại"
                                  name={[subField.name, 'number']}
                                >
                                  <Input placeholder="Số điện thoại" />
                                </Form.Item>
                                <Form.Item
                                  className="mb-0 w-1/2"
                                  label="Tên"
                                  name={[subField.name, 'owner']}
                                >
                                  <Input placeholder="Tên" />
                                </Form.Item>
                              </div>
                              <CloseOutlined
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                }}
                              />
                            </Flex>
                          ))}
                          <Button
                            type="dashed"
                            onClick={() => subOpt.add()}
                            block
                          >
                            + Thêm số điện thoại
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Card>
              ))}

              <Button type="dashed" onClick={() => add()} block>
                + Thêm địa chỉ
              </Button>
            </div>
          )}
        </Form.List>
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

export default ContactForm;
