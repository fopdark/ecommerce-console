import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ServiceTable from '../../components/Service';
import ServiceTableLevel1 from '../../components/Service/TableLevel1';

const ServiceLevel1 = () => {
  return (
    <>
      <Breadcrumb pageName="Dịch vụ" />
      <ServiceTableLevel1 />
    </>
  );
};

export default ServiceLevel1;
