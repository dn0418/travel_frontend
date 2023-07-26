// @flow strict

import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import AdminCallBack from '../../../src/components/admin-components/call-back';
import DashboardLayout from '../../../src/components/layouts/dashboard-layout';
import { getServerSideProps } from "../../../src/rest-api/callback/callback.ssr";
import client from '../../../src/rest-api/client';
import { CallbackType } from '../../../src/types';
import { NextPageWithLayout } from '../../../src/types/page-props';
export { getServerSideProps };

const CallBack: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const callbacks: CallbackType[] = props?.callbacksData?.data;
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
            const res = await client.callBack.deleteCallBack(id)
            toast.success('Call Back deleted successfully!');
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
      pathname: '/admin/callback',
      query: params,
    });
  }

  return (
    <>
      <AdminCallBack
        callbacks={callbacks}
        handleDelete={handleDelete}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

CallBack.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CallBack;