import React, { useEffect, useState } from 'react';
import DataTable from '../dataTable/DataTable';
import useStatistics from '../../hook/useStatistics';

// Define the type for the Props passed to fetchStatistics
type FetchProps = {
  aggregateBy: 'day' | 'week' | 'month';
  timeTarget: 'pickup_date' | 'created_at';
  startDate: string | null;
  endDate: string | null;
};

const MainPage: React.FC = () => {
  const [data, setData] = useState<MainData>();
  const { fetchStatistics } = useStatistics();

  const fetchProps: FetchProps = {
    aggregateBy: 'day',
    timeTarget: 'pickup_date',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
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
    <div>
      <h1>Main Page</h1>
      <DataTable data={data && data?.data_table} />
    </div>
  );
};

export default MainPage;
