// @flow strict

import { Pagination, PaginationItem } from "@mui/material";
import { useRouter } from "next/router";
import { PaginationType } from "../../../types";
import { VacancyType } from "../../../types/armenia";
import VacancyCard from "../../cards/vacancy-card";

interface Props {
  vacancies: VacancyType[];
  pagination: PaginationType;
}

function VacancySection({ vacancies, pagination: pagination }: Props) {
  const router = useRouter();
  const { totalPages } = pagination;
  const { locale } = router;

  const handleUpdatePage = (queryParams: { page: number }) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, ...queryParams },
    });
  };

  return (
    <div className='w-full'>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
        {vacancies.map((item, i) => (
          <VacancyCard vacancy={item} key={i} />
        ))}
      </div>
      <div className='flex justify-center my-3 md:my-6'>
        {vacancies.length > 0 && (
          <Pagination
            size='large'
            onChange={(_, p) => handleUpdatePage({ page: p })}
            count={totalPages}
            shape='rounded'
            renderItem={(item) => (
              <PaginationItem
                sx={{ color: "#EDA592", bgcolor: "#ffffff" }}
                className='pagination'
                components={{
                  next: (props) => (
                    <span className='border-0 p-0 bg-transparent text-[#EDA592]'>
                      {
                        locale === 'ru' ? 'Следующий' :
                          (locale === 'hy' ? 'Հաջորդը' : 'Next')
                      }
                    </span>
                  ),
                  previous: (props) => (
                    <span className='border-0 p-0 bg-transparent text-[#EDA592]'>
                      {
                        locale === 'ru' ? 'Пред.' :
                          (locale === 'hy' ? 'Նախ' : 'Prev')
                      }
                    </span>
                  ),
                }}
                {...item}
              />
            )}
            variant='outlined'
          />
        )}
      </div>
    </div>
  );
}

export default VacancySection;
