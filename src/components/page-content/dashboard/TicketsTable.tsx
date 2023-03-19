import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { getAllTickets } from '@src/services/SupportService';
import { useQuery } from '@tanstack/react-query';
import { Table, Tag } from 'antd';
import { ColumnType } from 'antd/es/table';

const TicketsTable = () => {
  const { data: supportData } = useQuery({
    queryKey: [QueriesKeysEnum.TICKETS],
    queryFn: async () => getAllTickets(),
    initialData: []
  });

  const columns = [
    {
      key: 'Ticket No:',
      title: 'Ticket No:',
      dataIndex: 'id'
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
      render: (createdAt: string) => new Date(createdAt).toLocaleDateString()
    },
    {
      key: 'Status',
      title: 'Status',
      dataIndex: 'status',
      render: (status: string) => (
        <Tag color={status === 'Open' ? 'green' : 'red'}>{status}</Tag>
      )
    }
  ] as ColumnType<any>[];
  return (
    <div className='w-full max-w-6xl bg-white rounded-xl'>
      <Table
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
