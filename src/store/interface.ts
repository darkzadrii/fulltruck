interface MainData {
  data_table: DataTableType[];
  histograms: Histograms;
  kpis: KPIs;
  scalars: Scalars
}

interface DataTableType {
  active_carrier: number;
  active_client: number;
  aggregate_date: string;
  assigned_count: number;
  margin_abs: number;
  margin_abs_per_order: number;
  margin_perc: number;
  new_carriers: number;
  new_clients: number;
  order_count: number;
  order_per_period: number;
  revenue: number;
  revenue_assigned: number;
  revenue_per_order: number;
}


interface MarginData {
  date: string;
  margin_perc: number;
}

interface OrderData {
  date: string;
  order_count: number;
}

interface TimeOrderCount {
  data: OrderData[] | undefined;
  index_by: string;
}

interface TimeMarginPerc {
  data: MarginData[] | undefined;
  index_by: string;
}

interface RevenueData {
  date: string;
  margin_abs: number;
  revenue: number;
}

interface TimeRevenue {
  data: RevenueData[] | undefined;
  index_by: string;
}

interface Histograms {
  time_margin_perc: TimeMarginPerc;
  time_order_count: TimeOrderCount;
  time_revenue: TimeRevenue;
}

interface KPI {
  label: string;
  margin_abs: number;
  margin_abs_per_order: number;
  margin_abs_perc_on_tot: number;
  margin_perc: number;
  order_count: number;
  order_count_perc_on_tot: number;
  revenue: number;
  revenue_per_order: number;
  revenue_perc_on_tot: number;
}

interface KPIs {
  carrier: {
    [key: string]: KPI;
  };
  client: {
    [key: string]: KPI;
  };
}

interface Scalars {
  active_carriers: number;
  active_clients: number;
  average_margin_perc: number;
  avg_order_margin_abs: number;
  avg_order_revenue: number;
  new_carriers: number;
  new_clients: number;
  total_assigned_count: number;
  total_margin_abs: number;
  total_order_count: number;
  total_revenue: number;
}
