import { Table, TableProps } from "antd"
import { FC, useEffect } from "react"

interface Props {
    data: DataTableType[] | undefined
}

const DataTable: FC<Props> = (data) => {
    useEffect(() => {
        console.log(data)
    })

    const columns: TableProps<DataTableType>['columns'] = [
        {
            title: 'Active Carrier',
            dataIndex: 'active_carrier',
            key: 'active_carrier',
            width: 80,
            fixed: 'left',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Active Client',
            dataIndex: 'active_client',
            key: 'active_client',
            width: 80,
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Assigned Count',
            dataIndex: 'assigned_count',
            key: 'assigned_count',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Margin (Absolute)',
            dataIndex: 'margin_abs',
            key: 'margin_abs',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Margin (Absolute per Order)',
            dataIndex: 'margin_abs_per_order',
            key: 'margin_abs_per_order',
            width: 100,
            render: (text) => <span>{text.toFixed(2)}</span>,
        },
        {
            title: 'Margin (%)',
            dataIndex: 'margin_perc',
            key: 'margin_perc',
            render: (text) => <span>{text.toFixed(2)}%</span>,
        },
        {
            title: 'New Carriers',
            dataIndex: 'new_carriers',
            key: 'new_carriers',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'New Clients',
            dataIndex: 'new_clients',
            key: 'new_clients',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Order Count',
            dataIndex: 'order_count',
            key: 'order_count',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Order per Period',
            dataIndex: 'order_per_period',
            key: 'order_per_period',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Revenue',
            dataIndex: 'revenue',
            key: 'revenue',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Revenue Assigned',
            dataIndex: 'revenue_assigned',
            key: 'revenue_assigned',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Revenue per Order',
            dataIndex: 'revenue_per_order',
            key: 'revenue_per_order',
            fixed: 'right',
            width: 80,
            render: (text) => <span>{text.toFixed(2)}%</span>,
        },
    ];

    return (
        <div className="data-table-container">
            <h3 className="title">Data Table</h3>
            <span className="subtitle">An overview of all the main data's</span>
            <Table tableLayout="fixed" size="small" scroll={{ x: 1500 }} columns={columns} dataSource={data.data} />
        </div>
    )
}

export default DataTable