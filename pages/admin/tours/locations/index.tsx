// @flow strict

import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import AdminDestination from '../../../../src/components/admin-components/tours/destination';
import DashboardLayout from '../../../../src/components/layouts/dashboard-layout';
import tourClient from '../../../../src/rest-api/client/tour-client';
import { getServerSideProps } from "../../../../src/rest-api/tours/destination.ssr";
import { NextPageWithLayout } from '../../../../src/types/page-props';
import { TourDestinationType } from '../../../../src/types/tour';
export { getServerSideProps };

const TourDestination: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const destinations: TourDestinationType[] = props?.destinationData?.data;
  const router = useRouter();

  const handleDelete = (id: number) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this destination!",
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
            const res = await tourClient.tourDestination.delete(id)
            toast.success('Destination deleted successfully!');
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
      <AdminDestination
        destinations={destinations}
        handleDelete={handleDelete}
      />
    </>
  );
};

TourDestination.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default TourDestination;