// @flow strict

import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import AdminRubrics from '../../../src/components/admin-components/blogs/rubrics';
import DashboardLayout from '../../../src/components/layouts/dashboard-layout';
import { getServerSideProps } from '../../../src/rest-api/armenia/blogs/rubrics';
import armeniaClient from '../../../src/rest-api/client/armenia-client';
import { NextPageWithLayout } from '../../../src/types/page-props';
export { getServerSideProps };

const Rubrics: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const rubrics = props?.rubricsData?.data;
  const router = useRouter();

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
            const res = await armeniaClient.rubrics.delete(id)
            toast.success('Rubrics type deleted successfully!');
            router.push({
              pathname: router.pathname
            });
          } catch (error) {
            toast.error('Something went wrong!')
          }
        }
      });
  }

  return (
    <>
      <AdminRubrics
        rubrics={rubrics}
        handleDelete={handleDelete}
      />
    </>
  );
};

Rubrics.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Rubrics;