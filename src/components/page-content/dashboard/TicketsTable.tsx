import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { getAllTickets } from '@src/services/SupportService';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import { ColumnType } from 'antd/es/table';
import { Link } from 'react-router-dom';

const TicketsTable = () => {
  const { data: supportData, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.TICKETS],
    queryFn: async () => getAllTickets(),
    initialData: []
  });

  const columns = [
    {
      key: 'Ticket No:',
      title: 'Ticket No:',
      dataIndex: 'id',
      width: '25rem',
      render: (id: string) => (
        <Link
          className='border font-semibold rounded-lg border-Aluminium text-whiteSmoke py-2 px-4'
          to={`${id}`}
        >
          #{id}
        </Link>
      )
    },
    {
      key: 'Created On',
      title: 'Created On',
      align: 'center',
      dataIndex: 'createdAt',
      render: (createdAt: number) => (
        <span className='font-semibold text-whiteSmoke'>
          {new Date(createdAt * 1000).toLocaleDateString()}
        </span>
      )
    },
    {
      key: 'Status',
      title: 'Status',
      dataIndex: 'status',
      render: (status: string) => (
        <span
          className={`${
            status === 'Open' ? 'bg-[#CEBFB7] ' : 'bg-[#EDEDED]'
          } text-center text-OuterSpace py-2 px-2 block font-semibold rounded-md`}
        >
          {status === 'Open' ? 'Open' : 'Closed'}
        </span>
      )
    },
    {
      key: 'topic',
      title: 'Topic',
      dataIndex: 'topic'
    },
    {
      key: 'closedOn',
      title: 'Closed On',
      align: 'center',
      dataIndex: 'closedOn',
      render: (closedOn) => {
        console.log(closedOn);
        return (
          <span className='font-semibold text-whiteSmoke text-center block'>
            {closedOn != null
              ? new Date(closedOn * 1000).toLocaleDateString()
              : '-'}
          </span>
        );
      }
    }
  ] as ColumnType<any>[];
  return (
    <div className='max-w-6xl my-5'>
      <Table
        className='shadow-md rounded-xl'
        prefixCls='ant-table-tickets'
        loading={isFetching}
        dataSource={supportData || []}
        bordered={false}
        rowKey='id'
        columns={columns}
      />
    </div>
  );
};

export default TicketsTable;
