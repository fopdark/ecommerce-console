import React, { useEffect, useState } from "react";
import { Modal, Spin, Tag } from "antd";
import { AuditionsDetail } from "@/service/Agency";
import {
  APPLY_STATUS,
  APPLY_STATUS_COLOR,
  GENDER,
  VIDEO_TYPE,
} from "@/constants/Agency";
import Fancybox from "@/components/Fancybox";
import { FormatDate } from "@/utils/common";
import { useTranslation } from "react-i18next";
import SlickSlider from "@/components/Slick/SlickSlider";

const ModalDetail: React.FC<{
  id: string;
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}> = ({ id, isModalOpen, handleOk, handleCancel }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isModalOpenVideos, setIsModalOpenVideos] = useState<boolean>(false);

  const handleGetDetail = async (id: string) => {
    try {
      setLoading(true);
      const res = await AuditionsDetail(id);
      setData(res);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const RenderFiles = (row: any) => {
    return (
      <div className="flex flex-col justify-center rounded-xl">
        {row?.files?.map((file: any, index: number) => (
          <div key={index}>
            <h4 className="py-5">{t(`user.${[VIDEO_TYPE[index]]}`)}</h4>
            <div className="flex justify-center w-full cursor-pointer">
              <img
                className="rounded-xl w-1/2"
                src={file.view_url}
                onClick={() => {
                  setIsModalOpenVideos(true);
                  setActiveIndex(index);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const RenderAvatar = (avatar: string) => {
    return (
      <div className="d-flex align-items-center">
        <Fancybox
          options={{
            Carousel: {
              infinite: true,
            },
          }}
          key={Math.random()}
        >
          <div style={{ display: "inline-block" }} className="aspect-1">
            <div className="post_img">
              <div className="symbol symbol-70px me-3 position-relative">
                <a
                  data-fancybox="gallery"
                  href={avatar}
                  key={Math.random()}
                  className="w-fit "
                >
                  <img
                    src={avatar}
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  ></img>
                </a>
              </div>
            </div>
          </div>
        </Fancybox>
      </div>
    );
  };

  useEffect(() => {
    handleGetDetail(id);
  }, [id]);

  return (
    <>
      <Modal
        centered
        width={"1000px"}
        open={isModalOpenVideos}
        cancelButtonProps={{
          className: "hidden",
        }}
        okButtonProps={{
          className: "hidden",
        }}
        onCancel={() => setIsModalOpenVideos(false)}
        destroyOnClose
      >
        <SlickSlider items={data?.files} activeIndex={activeIndex} />
      </Modal>
      <Modal
        width={1000}
        title={t("user.auditionInformation")}
        open={isModalOpen}
        onOk={handleOk}
        okText={t("button.ok")}
        cancelButtonProps={{
          className: "hidden",
        }}
        okButtonProps={{
          className: "!text-white !bg-[#1677ff] hover:bg-[#4096ff] ",
        }}
        onCancel={handleCancel}
        styles={{
          body: { overflowY: "auto", maxHeight: "calc(100vh - 300px)" },
        }}
      >
        <Spin
          spinning={loading}
          style={{
            maxHeight: "calc(100vh - 300px)",
          }}
        >
          <div className="bg-gray-100">
            <div className="container mx-auto py-8">
              <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                <div className="col-span-4 sm:col-span-4">
                  <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex flex-col items-center">
                      {RenderAvatar(data.avatar)}
                      <h1 className="text-xl font-bold my-0">{data?.name}</h1>
                    </div>
                    <hr className="my-6 border-t border-gray-300" />
                    <div className="flex flex-col gap-3">
                      <div className="grid grid-cols-12">
                        <b className="col-span-4">{t("user.column.phone")}:</b>
                        <p className="my-0 col-span-8">
                          {data?.phone_code} {data?.phone}
                        </p>
                      </div>
                      <div className="grid grid-cols-12">
                        <b className="col-span-4">{t("user.column.email")}:</b>
                        <p className="my-0 col-span-8">{data?.email} </p>
                      </div>
                      <div className="grid grid-cols-12">
                        <b className="col-span-4">
                          {t("user.column.birthday")}:
                        </b>
                        <p className="my-0 col-span-8">
                          {FormatDate(data?.birthday)}
                        </p>
                      </div>
                      <div className="grid grid-cols-12">
                        <b className="col-span-4">{t("user.column.nation")}:</b>
                        <p className="my-0 col-span-8">{data?.nation} </p>
                      </div>
                      <div className="grid grid-cols-12">
                        <b className="col-span-4">{t("user.column.height")}:</b>
                        <p className="my-0 col-span-8">{data?.height} (cm) </p>
                      </div>
                      <div className="grid grid-cols-12">
                        <b className="col-span-4">{t("user.column.weight")}:</b>
                        <p className="my-0 col-span-8">{data?.weight} (kg)</p>
                      </div>
                      <div className="grid grid-cols-12">
                        <b className="col-span-4">{t("user.column.gender")}:</b>
                        <p className="my-0 col-span-8">
                          {GENDER[data?.gender]}
                        </p>
                      </div>
                      <div className="grid grid-cols-12">
                        <b className="col-span-4">{data?.sns_type}:</b>
                        <a className="my-0 col-span-8" href={data.sns_id}>
                          {data.sns_id}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-4 sm:col-span-8">
                  <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-bold mt-6 mb-6">
                      {t("user.applyFor")}
                    </h2>
                    <div className="grid grid-cols-12 mb-2">
                      <b className="col-span-4">
                        {t("user.entertainmentCompany")}:
                      </b>
                      <div className="col-span-8 ">
                        {data?.contracts?.map((contract: any) => (
                          <div
                            className="grid grid-cols-6 mb-2"
                            key={contract?.id}
                          >
                            <p className="my-0 col-span-2">
                              {contract.entertainment_company?.nickname}
                            </p>
                            <div className="col-span-4">
                              <Tag
                                bordered={false}
                                color={
                                  APPLY_STATUS_COLOR[contract?.apply_status]
                                }
                              >
                                {APPLY_STATUS[contract?.apply_status]}
                              </Tag>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-12">
                      <b className="col-span-4">{t("user.field")}:</b>
                      <p className="my-0 col-span-8">
                        {data?.contracts?.[0]?.apply_field}
                      </p>
                    </div>
                    <hr className="my-6 border-t border-gray-300" />
                    <div className="mt-4">
                      <h2 className="text-xl font-bold mb-4">
                        {t("user.aboutAudition")}
                      </h2>
                      <p className="text-gray-700">
                        {data?.user_profile?.introduce}
                      </p>
                      {RenderFiles(data)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Spin>
      </Modal>
    </>
  );
};

export default ModalDetail;
