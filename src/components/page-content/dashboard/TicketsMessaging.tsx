import { Input, List, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import VirtualList from 'rc-virtual-list';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { AddMessage, getTicketById } from '@src/services/SupportService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MessageItem } from '@src/types/API/SupportType';
import { SendOutlined } from '@ant-design/icons';

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
    <List>
      <VirtualList
        data={ticketData?.messages || []}
        height={ContainerHeight}
        className='w-full'
        itemHeight={47}
        itemKey='_id'
        onScroll={onScroll}
      >
        {(item: MessageItem) => (
          <List.Item key={item.createdAt}>
            <List.Item.Meta
              className='text-xl'
              //   avatar={<Avatar src={item.picture.large} />}
              title={item.senderName}
              description={item.message}
            />
            <div>{new Date(item.createdAt * 1000).toLocaleTimeString()}</div>
          </List.Item>
        )}
      </VirtualList>

      {ticketData?.status !== 'Closed' && (
        <Input.Search
          placeholder='Text message...'
          allowClear
          className='mt-10'
          enterButton='Send'
          size='large'
          suffix={<SendOutlined />}
          onSearch={onSendHandler}
        />
      )}
    </List>
  );
};

export default TicketsMessaging;
