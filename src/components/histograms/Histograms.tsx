import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { FC } from 'react';
import useResizeHandler from '../../hook/useResizeHandler';
import ChartSkeleton from '../skeleton/ChartSkeleton';
import NoDataChart from '../../assets/img/no_data_chart.png';
import { Typography } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface Props {
  histograms: Histograms | undefined;
  loading: boolean;
}

const Histograms: FC<Props> = ({ histograms, loading }) => {
  const { isMobile } = useResizeHandler();

  const transformDataForChart = (
    data: any[] | undefined,
    key: string,
    label: string,
    backgroundColor: string,
    borderColor: string,
  ) => ({
    labels: (data || []).map((item: { date: string }) => item.date),
    datasets: [
      {
        label: label,
        data: (data || []).map((item: { [x: string]: any }) => item[key]),
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  });

  const isSpecificHistogramEmpty = (data: any[] | undefined) => {
    return !data || data.length === 0;
  };

  const isAllHistogramsEmpty = () => {
    return (
      isSpecificHistogramEmpty(histograms?.time_margin_perc?.data) &&
      isSpecificHistogramEmpty(histograms?.time_order_count?.data) &&
      isSpecificHistogramEmpty(histograms?.time_revenue?.data)
    );
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: isMobile ? false : true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Histogram Data',
      },
    },
  };

  return (
    <>
      {loading ? (
        <div className="histogram-skeleton">
          <ChartSkeleton />
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      ) : (
        <div className="histogram">
          {isAllHistogramsEmpty() ? (
            <div className="empty-histogram">
              <img
                className="empty-histogram-image"
                src={NoDataChart}
                alt="No data available"
              />
              <p style={{ textAlign: 'center' }}>
                No histogram data available.
              </p>
            </div>
          ) : (
            <>
              {histograms && histograms?.time_margin_perc ? (
                <div
                  style={{
                    height: '500px',
                    marginBottom: isMobile ? '88px' : 'unset',
                  }}
                >
                  <Typography variant="h5" gutterBottom className="typography">
                    Margin Percentage Over Time
                  </Typography>
                  <Bar
                    height={'100%'}
                    data={transformDataForChart(
                      histograms?.time_margin_perc?.data,
                      'margin_perc',
                      'Margin Percentage',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(75, 192, 192, 1)',
                    )}
                    className="bar-style"
                    options={options}
                  />
                </div>
              ) : (
                <div className="empty-histogram">
                  <img
                    className="empty-histogram-image"
                    src={NoDataChart}
                    alt="No data available"
                  />
                </div>
              )}

              {histograms && histograms?.time_order_count ? (
                <div
                  style={{
                    height: '500px',
                    marginBottom: '88px',
                  }}
                >
                  <Typography variant="h5" gutterBottom className="typography">
                    Order Count Over Time
                  </Typography>
                  <Bar
                    data={transformDataForChart(
                      histograms.time_order_count.data,
                      'order_count',
                      'Order Count',
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(255, 99, 132, 1)',
                    )}
                    className="bar-style"
                    options={options}
                  />
                </div>
              ) : (
                <div className="empty-histogram">
                  <img
                    className="empty-histogram-image"
                    src={NoDataChart}
                    alt="No data available"
                  />
                </div>
              )}

              {histograms && histograms?.time_revenue ? (
                <div
                  style={{
                    height: '500px',
                    marginBottom: '88px',
                  }}
                >
                  <Typography variant="h5" gutterBottom className="typography">
                    Revenue and Margin Over Time
                  </Typography>
                  <Bar
                    className="bar-style"
                    data={{
                      labels: histograms?.time_revenue?.data?.map(
                        item => item.date,
                      ),
                      datasets: [
                        {
                          label: 'Revenue',
                          data: histograms?.time_revenue?.data?.map(
                            item => item.revenue,
                          ),
                          backgroundColor: 'rgba(153, 102, 255, 0.6)',
                          borderColor: 'rgba(153, 102, 255, 1)',
                          borderWidth: 1,
                        },
                        {
                          label: 'Margin',
                          data: histograms?.time_revenue?.data?.map(
                            item => item.margin_abs,
                          ),
                          backgroundColor: 'rgba(255, 159, 64, 0.6)',
                          borderColor: 'rgba(255, 159, 64, 1)',
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={options}
                  />
                </div>
              ) : (
                <div className="empty-histogram">
                  <img
                    className="empty-histogram-image"
                    src={NoDataChart}
                    alt="No data available"
                  />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Histograms;
