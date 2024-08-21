import React, { useEffect, useState } from 'react';
import DataTable from '../dataTable/DataTable';
import useStatistics from '../../hook/useStatistics';
import Header from '../header/Header';
import { NavigationType } from '../../store/enum';
import { DatePicker, Select } from 'antd';
import Histograms from '../histograms/Histograms';
import moment from 'moment';
import KpiGrid from '../kpiGrid/KpiGrid';
import ScalarsGrid from '../scalarsGrid/ScalarsGrid';
import ScalarsDoughnutChart from '../scalarsGrid/ScalarsGrid';

const { RangePicker } = DatePicker;
const { Option } = Select;

type FetchProps = {
  aggregateBy: 'day' | 'week' | 'month';
  timeTarget: 'pickup_date' | 'created_at';
  startDate: string | null;
  endDate: string | null;
};

const MainPage: React.FC = () => {
  const [data, setData] = useState<MainData>();
  const [selectedPage, setSelectedPage] = useState('Dashboard');

  const [, setTimeTarget] = useState<'pickup_date' | 'created_at'>(
    'pickup_date',
  );
  const [, setAggregationType] = useState<'day' | 'week' | 'month'>('day');

  const [fetchProps, setFetchProps] = useState<FetchProps>({
    aggregateBy: 'day',
    timeTarget: 'pickup_date',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
  });

  const [loading, setLoading] = useState(true);
  const [filteredDate, setFilteredData] = useState<Partial<MainData>>();
  const { fetchStatistics } = useStatistics();

  const handleSelectionChange = (value: string) => {
    setSelectedPage(value);
  };

  const handleDateRangeChange = (dates: any) => {
    const [start, end] = dates;
    const startDate = start.format('YYYY-MM-DD');
    const endDate = end.format('YYYY-MM-DD');

    const filteredDataTable = data?.data_table?.filter(entry => {
      const entryDate = moment(entry.aggregate_date).format('YYYY-MM-DD');
      return entryDate >= startDate && entryDate <= endDate;
    });

    const filteredHistograms = {
      time_margin_perc: {
        data: data?.histograms?.time_margin_perc?.data?.filter(entry => {
          const entryDate = moment(entry.date, 'DD-MM-YYYY').format(
            'YYYY-MM-DD',
          );
          return entryDate >= startDate && entryDate <= endDate;
        }),
        index_by: 'date',
      },
      time_order_count: {
        data: data?.histograms?.time_order_count?.data?.filter(entry => {
          const entryDate = moment(entry.date, 'DD-MM-YYYY').format(
            'YYYY-MM-DD',
          );
          return entryDate >= startDate && entryDate <= endDate;
        }),
        index_by: 'date',
      },
      time_revenue: {
        data: data?.histograms?.time_revenue?.data?.filter(entry => {
          const entryDate = moment(entry.date, 'DD-MM-YYYY').format(
            'YYYY-MM-DD',
          );
          return entryDate >= startDate && entryDate <= endDate;
        }),
        index_by: 'date',
      },
    };

    if (filteredDataTable && filteredHistograms) {
      setFilteredData({
        data_table: filteredDataTable,
        histograms: filteredHistograms,
      });
    }
  };

  const handleTimeTargetChange = (value: 'pickup_date' | 'created_at') => {
    setTimeTarget(value);
    setFetchProps(prev => ({
      ...prev,
      timeTarget: value,
    }));
  };

  const handleAggregationChange = (value: 'day' | 'week' | 'month') => {
    setAggregationType(value);
    setFetchProps(prev => ({
      ...prev,
      aggregateBy: value,
    }));
  };

  useEffect(() => {
    setLoading(true);
    fetchStatistics(fetchProps)
      .then(result => {
        setData(result as MainData);
        setLoading(false);
        setFilteredData(result as MainData);
      })
      .catch(error => {
        console.error('Error fetching statistics:', error);
      });
  }, [fetchProps]);

  return (
    <>
      <Header onSelectionChange={handleSelectionChange} />
      {selectedPage !== NavigationType.kpiGrid &&
        selectedPage !== NavigationType.scalars && (
          <div className="filter-container">
            <RangePicker
              className="range-picker"
              onChange={handleDateRangeChange}
            />
            <div className="filter-container-row">
              <Select
                defaultValue="pickup_date"
                style={{ width: 120 }}
                className="card-shadow"
                onChange={handleTimeTargetChange}
              >
                <Option value="pickup_date">Pickup Date</Option>
                <Option value="created_at">Created At</Option>
              </Select>
              <Select
                defaultValue="day"
                style={{ width: 120 }}
                className="card-shadow"
                onChange={handleAggregationChange}
              >
                <Option value="day">Day</Option>
                <Option value="week">Week</Option>
                <Option value="month">Month</Option>
              </Select>
            </div>
          </div>
        )}

      {selectedPage === NavigationType.dashboard && (
        <>
          <ScalarsDoughnutChart
            loading={loading}
            scalars={data && data.scalars}
          />
          <DataTable loading={loading} data={filteredDate?.data_table} />
          <Histograms loading={loading} histograms={filteredDate?.histograms} />
          <KpiGrid loading={loading} kpis={data && data.kpis} />
        </>
      )}

      {selectedPage === NavigationType.dataTable && (
        <DataTable loading={loading} data={filteredDate?.data_table} />
      )}

      {selectedPage === NavigationType.histograms && (
        <Histograms loading={loading} histograms={filteredDate?.histograms} />
      )}

      {selectedPage === NavigationType.kpiGrid && (
        <KpiGrid loading={loading} kpis={data && data.kpis} />
      )}

      {selectedPage === NavigationType.scalars && (
        <ScalarsGrid loading={loading} scalars={data && data.scalars} />
      )}
    </>
  );
};

export default MainPage;
