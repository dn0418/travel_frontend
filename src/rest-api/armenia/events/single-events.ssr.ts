// import type { CategoryQueryOptions, Product } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import armeniaClient from '../../client/armenia-client';

type ParsedQueryParams = {
  id: string;
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const { data }: any = await armeniaClient.events.all();

  const paths = data?.map((item: any) => {
    return {
      params: { id: item.id.toString() },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params!;
  const events = await armeniaClient.events.all(1, '', '');

  try {
    await armeniaClient.events.all();
    const eventDetails = await armeniaClient.events.getByID(id);

    return {
      props: {
        eventDetails: eventDetails,
        eventsData: events,
      },
      revalidate: 30,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};