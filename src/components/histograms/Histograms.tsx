import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import { FC } from 'react';
import useResizeHandler from '../../hook/useResizeHandler';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
    histograms: Histograms | undefined
}

const Histograms: FC<Props> = ({ histograms }) => {

    const { isMobile } = useResizeHandler();

    const transformDataForChart = (data: any[], key: string, label: string) => ({
        labels: data.map((item: { date: any; }) => item.date),
        datasets: [
            {
                label: label,
                data: data.map((item: { [x: string]: any; }) => item[key]),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });

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
        <div
            style={{
                width: '100%',
                height: '100%'
            }}

        >
            {
                histograms && histograms?.time_margin_perc && (
                    <div style={{
                        height: '500px',
                        marginBottom: '88px'
                    }}>
                        <h3>Margin Percentage Over Time</h3>
                        <Bar height={'100%'} data={transformDataForChart(histograms?.time_margin_perc?.data, 'margin_perc', 'Margin Percentage')} options={options} />
                    </div>
                )
            }

            {histograms && histograms?.time_order_count && (
                <div style={{
                    height: '500px',
                    marginBottom: '88px'
                }}>
                    <h3>Order Count Over Time</h3>
                    <Bar data={transformDataForChart(histograms.time_order_count.data, 'order_count', 'Order Count')} options={options} />
                </div>
            )
            }

            {
                histograms && histograms?.time_revenue && (
                    <div style={{
                        height: '500px',
                        marginBottom: '88px'
                    }}>
                        <h3>Revenue and Margin Over Time</h3>
                        <Bar
                            data={{
                                labels: histograms.time_revenue.data.map(item => item.date),
                                datasets: [
                                    {
                                        label: 'Revenue',
                                        data: histograms.time_revenue.data.map(item => item.revenue),
                                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                                        borderColor: 'rgba(153, 102, 255, 1)',
                                        borderWidth: 1,
                                    },
                                    {
                                        label: 'Margin',
                                        data: histograms.time_revenue.data.map(item => item.margin_abs),
                                        backgroundColor: 'rgba(255, 159, 64, 0.6)',
                                        borderColor: 'rgba(255, 159, 64, 1)',
                                        borderWidth: 1,
                                    },
                                ],
                            }}
                            options={options}
                        />
                    </div>
                )
            }


        </div>
    );
};

export default Histograms;
