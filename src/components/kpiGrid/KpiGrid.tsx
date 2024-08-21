import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Input, Pagination, Select, Skeleton } from 'antd';
import useResizeHandler from '../../hook/useResizeHandler';

const { Option } = Select;

interface KpiGridProps {
  kpis: KPIs | undefined;
  loading: boolean;
}

const KpiGrid: React.FC<KpiGridProps> = ({ kpis, loading }) => {
  const { isMobile } = useResizeHandler();
  const [currentPageCarrier, setCurrentPageCarrier] = useState(1);
  const [currentPageClient, setCurrentPageClient] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<
    | 'revenue'
    | 'revenue_per_order'
    | 'margin_abs_per_order'
    | 'margin_abs'
    | 'order_count'
    | null
  >(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const pageSize = isMobile ? 3 : 6;

  const filterAndSortKpis = (kpis: Record<string, KPI>) => {
    let filteredKpis = Object.entries(kpis);

    // Filter by search query
    if (searchQuery) {
      filteredKpis = filteredKpis.filter(([key, kpi]) =>
        kpi.label.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Sort by selected option
    if (sortOption) {
      filteredKpis.sort(([, a], [, b]) => {
        const valueA = a[sortOption];
        const valueB = b[sortOption];

        if (sortDirection === 'asc') {
          return valueA < valueB ? -1 : 1;
        } else {
          return valueA > valueB ? -1 : 1;
        }
      });
    }

    return filteredKpis;
  };

  const paginatedCarrierKpis = filterAndSortKpis(kpis?.carrier || {}).slice(
    (currentPageCarrier - 1) * pageSize,
    currentPageCarrier * pageSize,
  );

  const paginatedClientKpis = filterAndSortKpis(kpis?.client || {}).slice(
    (currentPageClient - 1) * pageSize,
    currentPageClient * pageSize,
  );

  const renderKpiCard = (kpiKey: string, kpi: KPI) => (
    <Grid item xs={12} sm={6} md={4} key={kpiKey}>
      <Card
        style={{
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s',
        }}
        onMouseOver={e => {
          (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.03)';
        }}
        onMouseOut={e => {
          (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom style={{ color: '#003366' }}>
            {kpi.label}
          </Typography>
          <Typography variant="body2" className="typography-kpi">
            <strong>Revenue:</strong> ${kpi.revenue.toFixed(2)}
          </Typography>
          <Typography variant="body2" className="typography-kpi">
            <strong>Revenue per Order:</strong> $
            {kpi.revenue_per_order.toFixed(2)}
          </Typography>
          <Typography variant="body2" className="typography-kpi">
            <strong>Revenue % on Total:</strong>{' '}
            {kpi.revenue_perc_on_tot.toFixed(2)}%
          </Typography>
          <Typography variant="body2" className="typography-kpi">
            <strong>Margin Absolute:</strong> ${kpi.margin_abs.toFixed(2)}
          </Typography>
          <Typography variant="body2" className="typography-kpi">
            <strong>Margin per Order:</strong> $
            {kpi.margin_abs_per_order.toFixed(2)}
          </Typography>
          <Typography variant="body2" className="typography-kpi">
            <strong>Margin % on Total:</strong>{' '}
            {kpi.margin_abs_perc_on_tot.toFixed(2)}%
          </Typography>
          <Typography variant="body2" className="typography-kpi">
            <strong>Margin %:</strong> {kpi.margin_perc.toFixed(2)}%
          </Typography>
          <Typography variant="body2" className="typography-kpi">
            <strong>Order Count:</strong> {kpi.order_count}
          </Typography>
          <Typography variant="body2" className="typography-kpi">
            <strong>Order Count % on Total:</strong>{' '}
            {kpi.order_count_perc_on_tot.toFixed(2)}%
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  const renderSkeletonCard = () => (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        style={{
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent>
          <Skeleton loading={loading} avatar paragraph={{ rows: 6 }} />
        </CardContent>
      </Card>
    </Grid>
  );

  if (loading) {
    return (
      <div className="kpi-grid">
        <div>
          <Typography variant="h5" gutterBottom style={{ color: '#003366' }}>
            Carrier KPIs
          </Typography>
          <Grid container spacing={2}>
            {Array.from({ length: pageSize }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Skeleton
                      loading={loading}
                      avatar
                      paragraph={{ rows: 6 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            current={currentPageCarrier}
            pageSize={pageSize}
            total={0}
            onChange={page => setCurrentPageCarrier(page)}
            style={{ marginTop: 16, textAlign: 'center' }}
            size={isMobile ? 'small' : 'default'}
          />
        </div>

        <div style={{ marginTop: 32 }}>
          <Typography variant="h5" gutterBottom style={{ color: '#003366' }}>
            Client KPIs
          </Typography>
          <Grid container spacing={2}>
            {Array.from({ length: pageSize }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Skeleton
                      loading={loading}
                      avatar
                      paragraph={{ rows: 6 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            current={currentPageClient}
            pageSize={pageSize}
            total={0}
            onChange={page => setCurrentPageClient(page)}
            style={{ marginTop: 16, textAlign: 'center' }}
            size={isMobile ? 'small' : 'default'}
          />
        </div>
      </div>
    );
  }

  if (!kpis) {
    return <div>No KPI data available</div>;
  }

  return (
    <div className="kpi-grid">
      {/* Search Bar and Sort Controls */}
      <div className="kpi-grid-filters">
        <Input
          className="input-filter"
          placeholder="Search ID"
          onChange={e => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <Select
          className="button-filter"
          defaultValue="revenue"
          onChange={setSortOption}
        >
          <Option value="">Sort by</Option>
          <Option value="revenue">Revenue</Option>
          <Option value="revenue_per_order">Revenue per Order</Option>
          <Option value="margin_abs_per_order">Margin per Order</Option>
          <Option value="margin_abs">Margin Absolute</Option>
          <Option value="order_count">Order Count</Option>
        </Select>
        <Button
          className="button-filter"
          onClick={() =>
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
          }
        >
          {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
        </Button>
      </div>

      {/* KPI Grids */}
      <div>
        <Typography variant="h5" gutterBottom style={{ color: '#003366' }}>
          Carrier KPIs
        </Typography>
        <Grid container spacing={2}>
          {loading
            ? Array.from({ length: pageSize }).map((_, index) =>
                renderSkeletonCard(),
              )
            : paginatedCarrierKpis.map(([key, kpi]) => renderKpiCard(key, kpi))}
        </Grid>
        <Pagination
          current={currentPageCarrier}
          pageSize={pageSize}
          total={Object.keys(kpis.carrier).length}
          onChange={page => setCurrentPageCarrier(page)}
          style={{ marginTop: 16, textAlign: 'center' }}
          size={isMobile ? 'small' : 'default'}
        />
      </div>

      <div style={{ marginTop: 32 }}>
        <Typography variant="h5" gutterBottom style={{ color: '#003366' }}>
          Client KPIs
        </Typography>
        <Grid container spacing={2}>
          {paginatedClientKpis.map(([key, kpi]) => renderKpiCard(key, kpi))}
        </Grid>
        <Pagination
          current={currentPageClient}
          pageSize={pageSize}
          total={Object.keys(kpis.client).length}
          onChange={page => setCurrentPageClient(page)}
          style={{ marginTop: 16, textAlign: 'center' }}
          size={isMobile ? 'small' : 'default'}
        />
      </div>
    </div>
  );
};

export default KpiGrid;
