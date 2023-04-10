import { useState } from 'react';

const activeButtonStyle =
  '!text-OuterSpace !font-bold border-b-2 border-turkishRose';

interface NavigationListProps {
  navItems: {
    key: string;
    label: string;
  }[];
}

const useNavigationList = ({ navItems }: NavigationListProps) => {
  const [activeItem, setActiveItem] = useState<number>(0);

  const NavigationComponent = () => (
    <div className='flex gap-x-6 overflow-auto whitespace-nowrap'>
      {navItems.map((item, index) => (
        <button
          key={item['key']}
          type='button'
          className={`text-2xl font-medium text-[#A0A8AE] ${
            activeItem === index && activeButtonStyle
          }`}
          onClick={() => setActiveItem(index)}
        >
          {navItems[index]['label']}
        </button>
      ))}
    </div>
  );

  return {
    NavigationComponent,
    activeItemKey: navItems[activeItem]['key']
  };
};

export default useNavigationList;
