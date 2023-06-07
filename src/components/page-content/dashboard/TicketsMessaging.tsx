import { Input, List, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import VirtualList from 'rc-virtual-list';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { AddMessage, getTicketById } from '@src/services/SupportService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MessageItem } from '@src/types/API/SupportType';
import SendOutlinedSvg from '@src/assets/svg/SendOutlinedSvg';

const ContainerHeight = 400;

const TicketsMessaging = () => {
  const { id = '' } = useParams();
  const {
    data: ticketData,
    isFetching,
    refetch
  } = useQuery({
    queryKey: [QueriesKeysEnum.TICKETS, id],
    queryFn: async () => getTicketById(id),
    initialData: undefined,
    enabled: !!id
  });

  const { mutateAsync: addMessage } = useMutation({
    mutationFn: async (data: { ticketId: string; message: string }) =>
      AddMessage(data.ticketId, data.message)
  });

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      // TODO: load more messages
    }
  };

  const onSendHandler = async (message: string) => {
    if (message) {
      await addMessage({ ticketId: id, message });
      await refetch();
    }
  };

  return (
    <List className='bg-white rounded-[.5rem] mt-[3.375rem] overflow-hidden'>
      <div className='flex items-center justify-between px-[1.25rem] py-[.625rem] border-b border-[#ECEAE9]'>
        <h2 className='text-[.8125rem] text-[#B1B1B1] font-medium'>
          Ticket No: <span className='text-OuterSpace'>{ticketData?.id}</span>
        </h2>
        <span
          className={`flex items-center justify-center w-[6.25rem] h-[2.5rem] rounded-[.3125rem] font-semibold text-[.8125rem] ${
            ticketData?.status === 'Open' ? 'bg-[#CEBFB7]' : 'bg-[#EDEDED]'
          }`}
        >
          {ticketData?.status}
        </span>
      </div>
      <VirtualList
        data={ticketData?.messages || []}
        height={ContainerHeight}
        className='w-full px-[1.25rem]'
        itemHeight={47}
        itemKey='_id'
        onScroll={onScroll}
        prefixCls='virtual-list-chat'
      >
        {(item: MessageItem) => (
          <List.Item key={item.createdAt}>
            <div className='flex flex-col'>
              <span className='font-medium text-xs text-[#B1B1B1] leading-[.945rem]'>
                {item.senderName}
              </span>
              <p className='text-OuterSpace text-sm font-medium leading-[1.1025rem]'>
                {item.message}
              </p>
            </div>
            <span className='font-medium text-[8px] text-[#B1B1B1]'>
              {new Date(item.createdAt * 1000).toLocaleString()}
            </span>
          </List.Item>
        )}
      </VirtualList>

      {ticketData?.status !== 'Closed' && (
        <Input.Search
          prefixCls='ant-input-send-message'
          placeholder='Type your message here'
          allowClear
          className='mt-10 w-full text-[#00000080]'
          enterButton={<SendOutlinedSvg />}
          size='large'
          enterKeyHint='send'
          onSearch={onSendHandler}
        />
      )}
    </List>
  );
};

export default TicketsMessaging;
