import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Pagination, Skeleton } from 'antd';
import useResizeHandler from '../../hook/useResizeHandler';

interface KpiGridProps {
  kpis: KPIs | undefined;
  loading: boolean;
}

const KpiGrid: React.FC<KpiGridProps> = ({ kpis, loading }) => {
  const { isMobile } = useResizeHandler();
  const [currentPageCarrier, setCurrentPageCarrier] = useState(1);
  const [currentPageClient, setCurrentPageClient] = useState(1);
  const pageSize = isMobile ? 3 : 6;

  const paginatedCarrierKpis = kpis
    ? Object.entries(kpis.carrier).slice(
        (currentPageCarrier - 1) * pageSize,
        currentPageCarrier * pageSize,
      )
    : [];

  const paginatedClientKpis = kpis
    ? Object.entries(kpis.client).slice(
        (currentPageClient - 1) * pageSize,
        currentPageClient * pageSize,
      )
    : [];

  const renderKpiCard = (kpiKey: string, kpi: KPI) => (
    <Grid item xs={12} sm={6} md={4} key={kpiKey}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {kpi.label}
          </Typography>
          <Typography variant="body2">
            <strong>Revenue:</strong> ${kpi.revenue.toFixed(2)}
          </Typography>
          <Typography variant="body2">
            <strong>Revenue per Order:</strong> $
            {kpi.revenue_per_order.toFixed(2)}
          </Typography>
          <Typography variant="body2">
            <strong>Revenue % on Total:</strong>{' '}
            {kpi.revenue_perc_on_tot.toFixed(2)}%
          </Typography>
          <Typography variant="body2">
            <strong>Margin Absolute:</strong> ${kpi.margin_abs.toFixed(2)}
          </Typography>
          <Typography variant="body2">
            <strong>Margin per Order:</strong> $
            {kpi.margin_abs_per_order.toFixed(2)}
          </Typography>
          <Typography variant="body2">
            <strong>Margin % on Total:</strong>{' '}
            {kpi.margin_abs_perc_on_tot.toFixed(2)}%
          </Typography>
          <Typography variant="body2">
            <strong>Margin %:</strong> {kpi.margin_perc.toFixed(2)}%
          </Typography>
          <Typography variant="body2">
            <strong>Order Count:</strong> {kpi.order_count}
          </Typography>
          <Typography variant="body2">
            <strong>Order Count % on Total:</strong>{' '}
            {kpi.order_count_perc_on_tot.toFixed(2)}%
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  const renderSkeletonCard = () => (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
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
          <Typography variant="h5" gutterBottom>
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
          <Typography variant="h5" gutterBottom>
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
      <div>
        <Typography variant="h5" gutterBottom>
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
        <Typography variant="h5" gutterBottom>
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
