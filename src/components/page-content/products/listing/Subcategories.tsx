import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';
import useQueryParams from '@src/hooks/useQueryParams';
import { CategoryType } from '@src/types/API/ProductType';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: string;
  subcategories?: CategoryType[];
  isFetching: boolean;
}

export default function Subcategories(props: Props) {
  const navigate = useNavigate();

  const onClick = (id: string, name: string) => {
    navigate(`${APP_PREFIX_PATH}/${RouteKeysEnum.products}/${name}/${id}`);
  };

  if (props.isFetching) {
    return <Spin className='!min-h-[18rem]' />;
  }

  return (
    <div className='w-full flex flex-wrap items-center gap-2'>
      {props.subcategories
        ?.filter((category) => category.id !== props.id)
        .map((subcategory) => (
          <button
            key={subcategory.id}
            className='flex items-center justify-center text-center text-OuterSpace gap-2 w-48 h-14 rounded-md bg-white'
            onClick={() => onClick(subcategory.id, subcategory.name)}
          >
            <span>{subcategory.name}</span>
          </button>
        ))}
    </div>
  );
}
