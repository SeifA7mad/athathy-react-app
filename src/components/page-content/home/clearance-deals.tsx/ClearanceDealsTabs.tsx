import { Divider } from 'antd';
import { ClearanceDealsTabType } from '.';

interface ClearanceDealsTabsProps {
  tabs: ClearanceDealsTabType[];
  activeTabIndex: number;
  onTabClick: (index: number) => void;
}

export const ClearanceDealsTabs = ({
  tabs,
  activeTabIndex,
  onTabClick
}: ClearanceDealsTabsProps) => (
  <ul className="flex gap-x-6 text-lg font-semibold text-[#A0A8AE]">
    {tabs.map((tab, index) => (
      <li key={tab.key} className="flex flex-col items-center">
        <button
          className={`${
            index === activeTabIndex && 'text-whiteSmoke'
          } hover:text-turkishRose`}
          onClick={() => onTabClick(index)}
          type="button"
        >
          {tab.title}
        </button>
        {index === activeTabIndex && (
          <Divider className="!m-0 !min-w-0 !w-5/6 border-turkishRose border-2 rounded" />
        )}
      </li>
    ))}
  </ul>
);
