// @flow strict

import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import AdminRidePlan from '../../../src/components/admin-components/ride-plan';
import DashboardLayout from '../../../src/components/layouts/dashboard-layout';
import client from '../../../src/rest-api/client';
import { getServerSideProps } from "../../../src/rest-api/ride-plan/ride-plan.ssr";
import { RidePlanType } from '../../../src/types';
import { NextPageWithLayout } from '../../../src/types/page-props';
export { getServerSideProps };

const RidePlan: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const ridePlans: RidePlanType[] = props?.ridePlansData?.data;
  const router = useRouter();
  const params = router.query;

  const handleDelete = (id: number) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: {
          text: "Cancel",
          value: false,
          visible: true,
          closeModal: true,
        },
        confirm: {
          text: "Delete",
          value: true,
          visible: true,
          closeModal: true
        }
      }
    })
      .then(async (willDelete) => {
        if (willDelete) {
          try {
            const res = await client.ridePlan.deletePlan(id)
            toast.success('Ride plan deleted successfully!');
            router.push({
              pathname: router.pathname
            });
          } catch (error) {
            toast.error('Something went wrong!')
          }
        }
      });
  }

  const handlePageChange = (event: React.SyntheticEvent, value: number) => {
    params['page'] = value.toString();

    router.push({
      pathname: '/admin/ride-plan',
      query: params,
    });
  }

  return (
    <>
      <AdminRidePlan
        ridePlans={ridePlans}
        handleDelete={handleDelete}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

RidePlan.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default RidePlan;