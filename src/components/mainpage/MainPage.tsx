import React, { useEffect, useState } from 'react';
import DataTable from '../dataTable/DataTable';
import useStatistics from '../../hook/useStatistics';
import Header from '../header/Header';
import { NavigationType } from '../../store/enum';
import { DatePicker } from 'antd';
import Histograms from '../histograms/Histograms';

const { RangePicker } = DatePicker;

type FetchProps = {
  aggregateBy: 'day' | 'week' | 'month';
  timeTarget: 'pickup_date' | 'created_at';
  startDate: string | null;
  endDate: string | null;
};

const MainPage: React.FC = () => {
  const [data, setData] = useState<MainData>();
  const [selectedPage, setSelectedPage] = useState("Dashboard");
  const [loading, setLoading] = useState(true);
  const { fetchStatistics } = useStatistics();

  const fetchProps: FetchProps = {
    aggregateBy: 'day',
    timeTarget: 'pickup_date',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
  };

  const handleSelectionChange = (value: string) => {
    setSelectedPage(value);
  };

  useEffect(() => {
    // Fetch data when the component mounts
    setLoading(true);
    fetchStatistics(fetchProps)
      .then((result) => {
        setData(result as MainData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching statistics:', error);
      });
  }, []);

  return (
    <>
      <Header onSelectionChange={handleSelectionChange} />
      <RangePicker />
      {
        selectedPage === NavigationType.dashboard && (
          <>
            <DataTable loading={loading} data={data && data?.data_table} />
            <Histograms histograms={data && data?.histograms} />
          </>
        )
      }

      {
        selectedPage === NavigationType.dataTable && (
          <DataTable loading={loading} data={data && data?.data_table} />
        )
      }
      {
        selectedPage === NavigationType.histograms && (
          <Histograms histograms={data && data?.histograms} />
        )
      }
    </>
  );
};

export default MainPage;
