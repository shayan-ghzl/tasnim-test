
export interface ITaxParam {
  page: number;
  take: number;
  order: string;
  filter: string;
  distinct_fields: string;
}

export interface ITax {
  id: number;
  created_at: string;
  updated_at: string;
  updated_version: number;
  created_by: string;
  updated_by: null;
  active: true;
  division_id: number;
  division_name: string;
  tax_id: string;
  tax_description: string;
  tax1_name: null;
  tax1_percent: null;
  tax1_purchase_account: null;
  tax1_sales_account: null;
  tax2_name: null;
  tax2_percent: null;
  tax2_purchase_account: null;
  tax2_sales_account: null;
}

export interface IResponse {
  results: ITax[];
  page_info: {
    total_results: number;
    total_pages: number;
    page: number;
    result_per_page: number;
  };
}

