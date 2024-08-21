import React from 'react';
import { Row, Col, Card, Statistic, Skeleton, Empty } from 'antd';
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
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

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
  loading: boolean;
}

const ScalarsComponent: React.FC<Props> = ({ scalars, loading }) => {
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

  if (!scalars && !loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Empty description="No data available" />
      </div>
    );
  }

  return (
    <div className="scalars-grid">
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card
            size={isMobile ? 'small' : 'default'}
            className="card-transform"
          >
            <Skeleton loading={loading} active>
              <Statistic
                title="Active Carriers"
                value={scalars?.active_carriers}
                valueStyle={{
                  fontSize: isMobile ? 17 : 24,
                  color: '#3f8600',
                }}
                prefix={<ArrowUpOutlined />}
              />
            </Skeleton>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            size={isMobile ? 'small' : 'default'}
            className="card-transform"
          >
            <Skeleton loading={loading} active>
              <Statistic
                title="Active Clients"
                value={scalars?.active_clients}
                valueStyle={{
                  fontSize: isMobile ? 17 : 24,
                }}
              />
            </Skeleton>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            size={isMobile ? 'small' : 'default'}
            className="card-transform"
          >
            <Skeleton loading={loading} active>
              <Statistic
                title="New Carriers"
                value={scalars?.new_carriers}
                valueStyle={{
                  fontSize: isMobile ? 17 : 24,
                  color: '#3f8600',
                }}
                prefix={<ArrowUpOutlined />}
              />
            </Skeleton>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            size={isMobile ? 'small' : 'default'}
            className="card-transform"
          >
            <Skeleton loading={loading} active>
              <Statistic
                title="New Clients"
                value={scalars?.new_clients}
                valueStyle={{
                  fontSize: isMobile ? 17 : 24,
                }}
              />
            </Skeleton>
          </Card>
        </Col>
      </Row>

      <Row style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
        <Card
          className="doughnut-chart card-shadow "
          title="Distribution of Carriers and Clients"
        >
          <Skeleton loading={loading} active>
            <Doughnut data={doughnutData} />
          </Skeleton>
        </Card>
        <Card
          className="bar-chart card-shadow "
          title="Revenue and Margin Overview"
        >
          <Skeleton loading={loading} active>
            <Bar data={barData} />
          </Skeleton>
        </Card>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col span={8}>
          <Card
            size={isMobile ? 'small' : 'default'}
            className="card-transform"
          >
            <Skeleton loading={loading} active>
              <Statistic
                title="Total Assigned Count"
                value={scalars?.total_assigned_count}
                valueStyle={{
                  fontSize: isMobile ? 17 : 24,
                }}
              />
            </Skeleton>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            size={isMobile ? 'small' : 'default'}
            className="card-transform"
          >
            <Skeleton loading={loading} active>
              <Statistic
                title="Average Margin Percentage"
                value={
                  scalars?.average_margin_perc
                    ? scalars.average_margin_perc * 100
                    : 0
                }
                precision={2}
                suffix="%"
                valueStyle={{
                  fontSize: isMobile ? 17 : 24,
                  color: '#cf1322',
                }}
                prefix={<ArrowDownOutlined />}
              />
            </Skeleton>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            size={isMobile ? 'small' : 'default'}
            className="card-transform"
          >
            <Skeleton loading={loading} active>
              <Statistic
                title="Total Order Count"
                value={scalars?.total_order_count}
                valueStyle={{
                  fontSize: isMobile ? 17 : 24,
                }}
              />
            </Skeleton>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ScalarsComponent;
