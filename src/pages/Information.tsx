import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchInformationById } from '@src/services/InformationService';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import { Interweave } from 'interweave';
import { useParams } from 'react-router-dom';

const Information = () => {
  const { id = '' } = useParams<{ id: string }>();

  const { data: informationData, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.INFORMATION, id],
    queryFn: async () => fetchInformationById(id),
    initialData: null,
    enabled: !!id
  });

  if (isFetching) {
    return <Spin />;
  }

  if (!informationData) {
    return null;
  }

  return (
    <div className='flex flex-col gap-y-4 my-14 w-4/5'>
      <h1 className='text-OuterSpace text-3xl font-bold'>
        {' '}
        {informationData?.name}{' '}
      </h1>
      <Interweave
        className='leading-loose text-justify list-decimal text-base text-firebrick'
        content={informationData?.description}
      />
    </div>
  );
};

export default Information;
