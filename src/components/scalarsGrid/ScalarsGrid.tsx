import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import useResizeHandler from '../../hook/useResizeHandler';

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

interface Props {
  scalars: Scalars | undefined;
}

const ScalarsComponent: React.FC<Props> = ({ scalars }) => {
  const { isMobile } = useResizeHandler();
  const doughnutData = {
    labels: [
      'Active Carriers',
      'Active Clients',
      'New Carriers',
      'New Clients',
    ],
    datasets: [
      {
        label: 'Count',
        data: [
          scalars?.active_carriers,
          scalars?.active_clients,
          scalars?.new_carriers,
          scalars?.new_clients,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
      },
    ],
  };

  const barData = {
    labels: [
      'Total Revenue',
      'Total Margin',
      'Avg Order Revenue',
      'Avg Order Margin',
    ],
    datasets: [
      {
        label: 'Amount',
        data: [
          scalars?.total_revenue,
          scalars?.total_margin_abs,
          scalars?.avg_order_revenue,
          scalars?.avg_order_margin_abs,
        ],
        backgroundColor: '#36A2EB',
      },
    ],
  };

  return (
    <div className="scalars-grid">
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card size={isMobile ? 'small' : 'default'}>
            <Statistic
              title="Active Carriers"
              value={scalars?.active_carriers}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size={isMobile ? 'small' : 'default'}>
            <Statistic title="Active Clients" value={scalars?.active_clients} />
          </Card>
        </Col>
        <Col span={6}>
          <Card size={isMobile ? 'small' : 'default'}>
            <Statistic title="New Carriers" value={scalars?.new_carriers} />
          </Card>
        </Col>
        <Col span={6}>
          <Card size={isMobile ? 'small' : 'default'}>
            <Statistic title="New Clients" value={scalars?.new_clients} />
          </Card>
        </Col>
      </Row>

      <Row style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
        <Card
          className="doughnut-chart"
          title="Distribution of Carriers and Clients"
        >
          <Doughnut data={doughnutData} />
        </Card>
        <Card className="bar-chart" title="Revenue and Margin Overview">
          <Bar data={barData} />
        </Card>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col span={8}>
          <Card size={isMobile ? 'small' : 'default'}>
            <Statistic
              title="Total Assigned Count"
              value={scalars?.total_assigned_count}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card size={isMobile ? 'small' : 'default'}>
            <Statistic
              title="Average Margin Percentage"
              value={
                scalars?.average_margin_perc
                  ? scalars.average_margin_perc * 100
                  : 0
              }
              precision={2}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card size={isMobile ? 'small' : 'default'}>
            <Statistic
              title="Total Order Count"
              value={scalars?.total_order_count}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ScalarsComponent;
