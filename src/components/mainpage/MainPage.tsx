import React, { useEffect, useState } from 'react';
import DataTable from '../dataTable/DataTable';
import useStatistics from '../../hook/useStatistics';
import Header from '../header/Header';
import { NavigationType } from '../../store/enum';

// Define the type for the Props passed to fetchStatistics
type FetchProps = {
  aggregateBy: 'day' | 'week' | 'month';
  timeTarget: 'pickup_date' | 'created_at';
  startDate: string | null;
  endDate: string | null;
};

const MainPage: React.FC = () => {
  const [data, setData] = useState<MainData>();
  const [selectedPage, setSelectedPage] = useState("Dashboard");
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
    fetchStatistics(fetchProps)
      .then((result) => {
        setData(result as MainData);
        console.log(result)
      })
      .catch((error) => {
        console.error('Error fetching statistics:', error);
      });
  }, []);

  return (
    <>
      <Header onSelectionChange={handleSelectionChange} />
      {
        selectedPage === NavigationType.dashboard && (
          <DataTable data={data && data?.data_table} />
        )
      }

      {
        selectedPage === NavigationType.dataTable && (
          <DataTable data={data && data?.data_table} />
        )
      }
    </>
  );
};

export default MainPage;
