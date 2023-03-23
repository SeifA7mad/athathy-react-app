import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { closeTicket, getAllTickets } from '@src/services/SupportService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Table, Tag, message } from 'antd';
import { ColumnType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { CloseCircleOutlined } from '@ant-design/icons';

const TicketsTable = () => {
  const {
    data: supportData,
    isFetching,
    refetch
  } = useQuery({
    queryKey: [QueriesKeysEnum.TICKETS],
    queryFn: async () => getAllTickets(),
    initialData: []
  });

  const { mutateAsync: closeTicketMutation } = useMutation({
    mutationFn: async (data: { ticketId: string }) => closeTicket(data.ticketId)
  });

  const onTicketCloseHandler = async (ticketId: string) => {
    try {
      message.loading('Closing ticket...', 0);
      await closeTicketMutation({ ticketId });
      await refetch();
    } catch (errorInfo: any) {
      console.error('Failed:', errorInfo);
      message.error('Failed to close ticket');
    } finally {
      setTimeout(() => {
        message.destroy();
      }, 1000);
    }
  };

  const columns = [
    {
      key: 'Ticket No:',
      title: 'Ticket No:',
      dataIndex: 'id',
      render: (id: string) => <Link to={`${id}`}>#{id}</Link>
    },
    {
      key: 'topic',
      title: 'Topic',
      dataIndex: 'topic'
    },
    {
      key: 'subTopic',
      title: 'Sub topic',
      dataIndex: 'subTopic'
    },
    {
      key: 'Created Date',
      title: 'Created Date',
      dataIndex: 'createdAt',
      render: (createdAt: number) => new Date(createdAt * 1000).toDateString()
    },
    {
      key: 'Status',
      title: 'Status',
      dataIndex: 'status',
      render: (status: string) => (
        <Tag color={status === 'Open' ? 'green' : 'red'}>{status}</Tag>
      )
    },
    {
      key: 'details',
      title: 'Close Ticket',
      render: (_, row) => (
        <button
          type='button'
          className='text-xl text-[#F41F52]'
          onClick={() => onTicketCloseHandler(row.id)}
        >
          <CloseCircleOutlined />
        </button>
      )
    }
  ] as ColumnType<any>[];
  return (
    <div className='w-full max-w-6xl bg-white rounded-xl'>
      <Table
        loading={isFetching}
        className=''
        dataSource={supportData}
        bordered={false}
        rowKey='id'
        columns={columns}
      />
    </div>
  );
};

export default TicketsTable;
