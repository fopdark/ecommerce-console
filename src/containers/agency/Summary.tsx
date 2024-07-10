import {
  UsergroupAddOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import CardDataStats from "@/components/CardDataStats";
import { useTranslation } from "react-i18next";

function Summary({ meta }: any) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-7 2xl:gap-7.5 py-4">
      <CardDataStats
        title={t("user.summary.totalApplications")}
        total={meta?.total_application || 0}
      >
        <UsergroupAddOutlined className="text-2xl" />
      </CardDataStats>
      <CardDataStats
        title={t("user.summary.totalMale")}
        total={meta?.total_male || 0}
      >
        <UserAddOutlined className="text-2xl" />
      </CardDataStats>
      <CardDataStats
        title={t("user.summary.totalFemale")}
        total={meta?.total_female || 0}
      >
        <UserDeleteOutlined className="text-2xl" />
      </CardDataStats>
      <CardDataStats
        title={t("user.summary.totalApproved")}
        total={meta?.total_approved || 0}
      >
        <CheckOutlined className="text-2xl" />
      </CardDataStats>
      <CardDataStats
        title={t("user.summary.totalFinalApproved")}
        total={meta?.total_final_approved || 0}
      >
        <CheckOutlined className="text-2xl" />
      </CardDataStats>
      <CardDataStats
        title={t("user.summary.totalRejected")}
        total={meta?.total_rejected || 0}
      >
        <CloseOutlined className="text-2xl" />
      </CardDataStats>
      <CardDataStats
        title={t("user.summary.totalEvaluatedCard")}
        total={meta?.total_evaluated_card || 0}
      >
        <CloseOutlined className="text-2xl" />
      </CardDataStats>
    </div>
  );
}

export default Summary;
