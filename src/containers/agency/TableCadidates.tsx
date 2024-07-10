import TableAntd from "@/components/Tables/TableAntd";
import { APPLY_STATUS, APPLY_STATUS_COLOR, GENDER } from "@/constants/Agency";
import { AuditionsList, getEntertainments, getFields } from "@/service/Agency";
import {
  Avatar,
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  TableProps,
  Tag,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import { FIELD, FIELD_OPTION } from "@/types/agency";
import { UndoOutlined } from "@ant-design/icons";
import {
  FormatDate,
  FormatTime,
  getListCountry,
  getOptionsCountry,
  removeEmpty,
} from "@/utils/common";
import Summary from "./Summary";
import { useTranslation } from "react-i18next";
import ModalDetail from "./ModalDetail";

const { RangePicker } = DatePicker;
const { Item } = Form;

const defaultPagination = {
  offset: 0,
  limit: 20,
};

function TableCadidates(props: any) {
  const { t } = useTranslation();
  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const [filterValue, setFilterValue] = useState<any>({});
  const [pagination, setPagination] = useState<any>({
    ...defaultPagination,
    total: 0,
    current: 1,
  });
  const [meta, setMeta] = useState<any>({});
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [countryOptions, setCountryOptions] = useState<any>([]);
  const [modalData, setModalData] = useState<any>({
    open: false,
    id: "",
  });

  const [fieldOptions, setFieldOptions] = useState<Array<FIELD_OPTION>>([
    { label: "All", time: 0, value: "" },
  ]);
  const [companyOptions, setCompanyOptions] = useState<Array<any>>([
    { label: "All", value: "" },
  ]);

  const RenderApproveStatus = (row: any) => {
    let status = 0;
    const priority = [2, 1, 3, 0];
    let result = row?.contracts.map((element: any) => element.apply_status);

    for (let index = 0; index < priority.length; index++) {
      if (result.includes(priority[index])) {
        status = priority[index];
        break;
      }
    }
    return (
      <Tag bordered={false} color={APPLY_STATUS_COLOR[status]}>
        {APPLY_STATUS[status]}
      </Tag>
    );
  };

  const columns = [
    {
      title: t("user.column.registerCode"),
      dataIndex: "register_code",
      key: "register_code",
    },
    {
      title: t("user.column.avatar"),
      dataIndex: "avatar",
      key: "avatar",
      render: (text: string) => <Avatar src={text} />,
      width: 150,
    },
    {
      title: t("user.column.email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("user.column.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("user.column.gender"),
      dataIndex: "gender",
      key: "gender",
      render: (text: string) => <p>{GENDER[text]}</p>,
      width: 100,
    },
    {
      title: t("user.column.nation"),
      dataIndex: "nation",
      key: "nation",
      render: (text: string, record: any) => (
        <p>{renderNation(record.phone_code, text)}</p>
      ),
    },
    {
      title: t("user.column.birthday"),
      dataIndex: "birthday",
      key: "birthday",
      render: (text: string) => <p>{FormatDate(text)}</p>,
    },
    {
      title: `${t("user.column.height")} (cm)`,
      dataIndex: "height",
      key: "height",
      width: 150,
    },
    {
      title: `${t("user.column.weight")} (kg)`,
      dataIndex: "weight",
      key: "weight",
      width: 150,
    },
    {
      title: t("user.column.applyField"),
      dataIndex: "contracts",
      key: "contracts",
      render: (text: string) => <p>{text[0]?.apply_field}</p>,
    },
    {
      title: t("user.column.totalCompanyApply"),
      dataIndex: "contracts",
      key: "contracts",
      render: (text: string) => <p>{text?.length}</p>,
      width: 200,
    },
    {
      title: t("user.column.totalFiles"),
      dataIndex: "total_files",
      key: "total_files",
      width: 100,
    },
    {
      title: t("user.column.createdAt"),
      dataIndex: "created_at",
      key: "created_at",
      defaultSortOrder: "descend",
      sorter: true,
      render: (text: string) => (
        <div>
          <b>{FormatDate(text)}</b>
          <p>{FormatTime(text)}</p>
        </div>
      ),
      width: 150,
    },
    {
      title: t("user.column.updatedAt"),
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text: string) => (
        <div>
          <b>{FormatDate(text)}</b>
          <p>{FormatTime(text)}</p>
        </div>
      ),
      width: 150,
    },
    {
      title: t("user.column.approveStatus"),
      dataIndex: "approve_status",
      key: "approve_status",
      render: (_: string, record: any) => RenderApproveStatus(record),
    },
    {
      title: t("user.column.action"),
      dataIndex: "id",
      key: "action",
      render: (text: string) => {
        return (
          <Button
            onClick={() =>
              setModalData({
                ...modalData,
                id: text,
                open: true,
              })
            }
          >
            {t("button.detail")}
          </Button>
        );
      },
    },
  ];

  const handleGetData = async (newRequest: any) => {
    try {
      setLoading(true);
      const res = await AuditionsList(removeEmpty(newRequest));
      setDataSource(res?.list);
      setPagination({
        offset: newRequest?.offset,
        page: Math.floor(res?.meta?.offset_next / pagination?.limit),
        limit: newRequest?.limit,
        total: res?.meta?.total,
      });
      setMeta(res?.meta);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleGetFields = async () => {
    const res = await getFields();
    if (!res) return;
    const newFields: Array<FIELD_OPTION> = [
      { label: "All", time: 0, value: "" },
    ];
    res.forEach((field: FIELD) => {
      newFields.push({
        label: field.name,
        time: field.time,
        value: field.name,
      });
    });
    setFieldOptions(newFields);
  };

  const handleGetCompanies = async () => {
    const res = await getEntertainments();
    if (!res?.list) return;
    const newOptions: Array<any> = [{ label: "All", value: "" }];
    res?.list.forEach((entertaiment: any) => {
      newOptions.push({
        label: entertaiment.nickname,
        value: entertaiment.user_id,
      });
    });
    setCompanyOptions(newOptions);
  };

  const handleTableChange: TableProps<any>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    handleGetData({
      ...filterValue,
      offset:
        pagination?.current && pagination?.pageSize
          ? (pagination?.current - 1) * pagination?.pageSize
          : 0,
      limit: pagination?.pageSize,
      order_by: sorter?.order === "ascend" ? "ASC" : "DESC",
      sort_by: sorter?.field,
    });
  };

  const onReset = () => {
    form.resetFields();
    handleGetData(defaultPagination);
  };

  const onValuesChange = (changedValues: any, values: any) => {
    const filterValues = {
      keyword: values?.keyword ? values?.keyword : "",
      start_date: values?.registerDate
        ? dayjs(values?.registerDate?.[0]).format("YYYY-MM-DD")
        : "",
      end_date: values?.registerDate
        ? dayjs(values?.registerDate?.[1]).format("YYYY-MM-DD")
        : "",
      from_age: values?.age ? values?.age?.split(",")?.[0] : "",
      to_age: values?.age ? values?.age?.split(",")?.[1] : "",
      gender: values?.gender ? values?.gender : "",
      field: values?.field ? values?.field : "",
      status: values?.approveStatus ? values?.approveStatus : "",
      entertainment_id: values?.entertaimentCompanies
        ? values?.entertaimentCompanies
        : "",
      phone_code: values?.phone_code ? values?.phone_code : "",
      agency_status: values?.agency_status ? values?.agency_status : "",
    };
    setFilterValue(filterValues);
  };

  const onFinish = (values: any) => {
    handleGetData({ ...filterValue, ...defaultPagination });
  };

  const renderNation = (phoneCode: string = "+84", nation: string) => {
    const country = getListCountry().get(phoneCode);
    const result = `${country?.name} (${nation}) `;
    return result;
  };

  useEffect(() => {
    handleGetData(defaultPagination);
    handleGetFields();
    handleGetCompanies();
    setCountryOptions(getOptionsCountry());
  }, []);

  return (
    <>
      {modalData?.id && (
        <ModalDetail
          isModalOpen={modalData?.open}
          handleOk={() => {
            setModalData({ ...modalData, open: false, id: "" });
          }}
          handleCancel={() => {
            setModalData({ ...modalData, open: false, id: "" });
          }}
          id={modalData?.id}
        />
      )}
      <div className="bg-white rounded">
        <Form
          layout="vertical"
          autoComplete="off"
          className="sticky top-[80px] z-10 bg-white px-10 py-5 rounded shadow-sm"
          form={form}
          onFinish={onFinish}
          onValuesChange={onValuesChange}
        >
          <div className="flex gap-4 items-end flex-wrap">
            <Item
              className="mb-0"
              name="keyword"
              label={t("user.filter.keyword.label")}
            >
              <Input
                placeholder={t("user.filter.keyword.placeholder")}
                prefix={<UserOutlined />}
                style={{ width: 250 }}
              />
            </Item>

            <Item
              className="mb-0"
              name="registerDate"
              label={t("user.filter.registerDate.label")}
            >
              <RangePicker
                style={{ width: 250 }}
                placeholder={[
                  t("user.filter.registerDate.placeholder1"),
                  t("user.filter.registerDate.placeholder2"),
                ]}
              />
            </Item>

            <Item
              className="mb-0"
              name="age"
              label={t("user.filter.age.label")}
            >
              <Select
                defaultValue=""
                style={{ width: 150 }}
                options={[
                  { value: "", label: "All" },
                  { value: "15,24", label: "15-24" },
                  { value: "25,34", label: "25-34" },
                  { value: "35,44", label: "35-44" },
                  { value: "45,100", label: ">44" },
                ]}
              />
            </Item>

            <Item
              className="mb-0"
              name="gender"
              label={t("user.filter.gender.label")}
            >
              <Select
                defaultValue=""
                style={{ width: 150 }}
                options={[
                  { value: "", label: "All" },
                  { value: "0", label: "Male" },
                  { value: "1", label: "Female" },
                ]}
              />
            </Item>

            <Item
              className="mb-0"
              name="field"
              label={t("user.filter.field.label")}
            >
              <Select
                defaultValue=""
                style={{ width: 150 }}
                options={fieldOptions}
              />
            </Item>
            <Item
              className="mb-0"
              name="approveStatus"
              label={t("user.filter.approveStatus.label")}
            >
              <Select
                defaultValue=""
                style={{ width: 150 }}
                options={[
                  { value: "", label: "All" },
                  { value: "0", label: "Received" },
                  { value: "1", label: "Approved" },
                  { value: "2", label: "Final Approved" },
                  { value: "3", label: "Rejected" },
                ]}
              />
            </Item>

            <Item
              className="mb-0"
              name="entertaimentCompanies"
              label={t("user.filter.entertainmentCompanies.label")}
            >
              <Select defaultValue="" options={companyOptions} />
            </Item>

            <Item
              className="mb-0"
              name="phone_code"
              label={t("user.filter.nation.label")}
            >
              <Select
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                defaultValue=""
                options={countryOptions}
                style={{ width: 250 }}
                virtual={false}
              />
            </Item>

            <Item
              className="mb-0"
              name="agency_status"
              label={t("user.filter.evaluatedStatus.label")}
            >
              <Select
                defaultValue=""
                style={{ width: 150 }}
                options={[
                  { value: "", label: "All" },
                  { value: "1", label: "Purchase" },
                  { value: "0", label: "Not Purchase" },
                ]}
              />
            </Item>

            <Button
              icon={<UndoOutlined />}
              onClick={() => {
                setFilterValue({});
                onReset();
              }}
            >
              {t("button.reset")}
            </Button>
            <Button
              className={"!text-white !bg-[#1677ff] hover:bg-[#4096ff] "}
              icon={<SearchOutlined />}
              htmlType="submit"
            >
              {t("button.search")}
            </Button>
          </div>
        </Form>
        <div className="bg-white px-10">
          <Summary meta={meta} />
          <TableAntd
            loading={loading}
            columns={columns}
            dataSource={dataSource}
            rowKey="id"
            scroll={{ x: "2500px", y: "500px" }}
            onChange={handleTableChange}
            pagination={{
              total: pagination.total,
              pageSize: pagination.limit,
              current: pagination.page,
            }}
            onRow={(record: any) => ({
              onDoubleClick: () =>
                setModalData({
                  modalData,
                  open: true,
                  id: record?.id,
                }),
            })}
          />
        </div>
      </div>
    </>
  );
}

export default TableCadidates;
