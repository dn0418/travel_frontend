// @flow strict

import {
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Pagination,
  PaginationItem
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiEdit, BiSearch } from "react-icons/bi";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import swal from "sweetalert";
import armeniaClient from "../../../rest-api/client/armenia-client";
import { localizationData } from "../../../utils/locales";
import SectionTitle from "../../common/section-title";

function AdminBrochureUI({
  brochures,
  handleSearch,
  handlePageChange,
  metaData,
}: any) {
  const router = useRouter();
  const { locale } = router;

  const localData =
    locale === "ru"
      ? localizationData.ru
      : locale === "hy"
        ? localizationData.hy
        : localizationData.en;

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
            await armeniaClient.brochure.delete(id)
            toast.success('Brochure deleted successfully!')
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
    <Container className="my-8 flex flex-col items-center">
      <div className="flex w-full justify-end">
        <Link href='/admin/brochure/create'>
          <Button color="secondary" variant="contained">
            Create New Brochure
          </Button>
        </Link>
      </div>
      <div className="my-4 w-full md:my-8">
        <div className="flex flex-col md:flex-row items-center w-full justify-between">
          <SectionTitle title="Brochure List" />
          <div className="">
            <FormControl size="small" className="shadow-sm" variant="outlined">
              <InputLabel>{localData.search_your_need}</InputLabel>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">
                    <BiSearch className="text-[#EDA592]" />
                  </InputAdornment>
                }
                label={localData.search_your_need}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
          </div>
        </div>
        <>
          <div className="my-6 flex flex-col gap-6">
            {
              brochures.length > 0 && brochures.map((brochure: any) => (
                <div className="w-full h-32 p-5 shadow rounded-lg flex gap-8 items-start" key={brochure.id}>
                  <div className="flex h-full justify-center items-center">
                    <BsFileEarmarkPdf size={48} className="text-red-700" />
                  </div>
                  <div className="">
                    <p className="text-xl mt-0 font-semibold">{brochure.title}</p>
                    <div className="flex items-center gap-3">
                      <Link
                        href={brochure.url}
                        target="_blank"
                        className="text-blue-800"
                        download={true}>
                        Download Now
                      </Link>
                      <Link href={`/admin/brochure/update/${brochure.id}`}>
                        <Button color='secondary' className='shadow min-w-fit py-2 px-5 text-lg'>
                          <BiEdit />
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleDelete(brochure.id)}
                        color='error'
                        className='shadow min-w-fit py-2 px-5 text-lg'>
                        <MdDelete />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

          <div className="flex justify-center my-3 md:my-6">
            {brochures.length > 0 && (
              <Pagination
                size="large"
                onChange={handlePageChange}
                count={metaData?.totalPages}
                shape="rounded"
                renderItem={(item) => (
                  <PaginationItem
                    sx={{ color: "#EDA592", bgcolor: "#ffffff" }}
                    className="pagination"
                    components={{
                      next: (props) => (
                        <span className="border-0 p-0 bg-transparent text-[#EDA592]">
                          {localData.next_text}
                        </span>
                      ),
                      previous: (props) => (
                        <span className="border-0 p-0 bg-transparent text-[#EDA592]">
                          {localData.prev_text}
                        </span>
                      ),
                    }}
                    {...item}
                  />
                )}
                variant="outlined"
              />
            )}
          </div>
        </>
      </div>
    </Container>
  );
}

export default AdminBrochureUI;