// @flow strict

import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import AdminHotelTypes from '../../../src/components/admin-components/hotels/hotel-types';
import DashboardLayout from '../../../src/components/layouts/dashboard-layout';
import serviceClient from '../../../src/rest-api/client/service-client';
import { getServerSideProps } from '../../../src/rest-api/hotels/hotel-type.ssr';
import { NextPageWithLayout } from '../../../src/types/page-props';
export { getServerSideProps };

const HotelType: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const hotelsTypes = props?.hotelsTypesData?.data;
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
            const res = await serviceClient.hotelType.deleteType(id)
            toast.success('Hotel type deleted successfully!');
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
      <AdminHotelTypes
        types={hotelsTypes}
        handleDelete={handleDelete}
      />
    </>
  );
};

HotelType.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default HotelType;