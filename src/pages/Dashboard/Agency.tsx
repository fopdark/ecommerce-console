import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import TableCadidates from "@/containers/agency/TableCadidates";

const Users: React.FC = () => {
  return (
    <DefaultLayout>
      {/* <Breadcrumb pageName="Agency" /> */}
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <TableCadidates />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Users;
