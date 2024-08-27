export interface ApiResponse {
    [key: string]: any;
  }
  
  export interface RequestBody {
    input_query: string;
    input_query_type: string;
    sort_by: string;
    status: string[];
    exact_match: boolean;
    date_query: boolean;
    owners: string[];
    attorneys: string[];
    law_firms: string[];
    mark_description_description: string[];
    classes: string[];
    page: number;
    rows: number;
    sort_order: string;
    states: string[];
    counties: string[];
  }

  export type Bucket = {
    doc_count: number;
    key: string;
  };
  
  export type Attorneys = {
    buckets: Bucket[];
    doc_count_error_upper_bound: number;
    sum_other_doc_count: number;
  };
  
  export type ClassCodes = {
    buckets: Bucket[];
    doc_count_error_upper_bound: number;
    sum_other_doc_count: number;
  };
  
  export type Country = {
    buckets: Bucket[];
    doc_count_error_upper_bound: number;
    sum_other_doc_count: number;
  };
  
  export type CurrentOwners = {
    buckets: Bucket[];
    doc_count_error_upper_bound: number;
    sum_other_doc_count: number;
  };
  
  export type LawFirms = {
    buckets: Bucket[];
    doc_count_error_upper_bound: number;
    sum_other_doc_count: number;
  };
  
  export type OfficeActions = {
    buckets: Bucket[];
    doc_count_error_upper_bound: number;
    sum_other_doc_count: number;
  };
  
  export type FilterSectionData = {
    attorneys: Attorneys;
    class_codes: ClassCodes;
    country: Country;
    current_owners: CurrentOwners;
    law_firms: LawFirms;
    office_actions: OfficeActions;
  };
  

  export interface FilterCardProps {
    data: {
      current_owners?: Array<{ doc_count: number; key: string }>;
      law_firms?: Array<{ doc_count: number; key: string }>;
      attorneys?: Array<{ doc_count: number; key: string }>;
    };
  }

  export interface FilterProps {
    data: FilterSectionData;
  }
  export interface MarkDescription {
    code: string;
    description: string;
  }
  
  export interface SearchBar {
    attorneys: string;
    law_firm: string;
    mark_identification: string;
    owner: string;
  }
  
  export interface Source {
    registration_number: string;
    registration_date: number;
    filing_date: number;
    status_date: number;
    date_type: string;
    status_code: number;
    status_type: string;
    search_bar: SearchBar;
    mark_identification: string;
    law_firm: string;
    attorney_name: string;
    current_owner: string;
    mark_description_code: string[];
    mark_description_description: string[];
    class_codes: string[];
    country: string;
  }
  
  export interface ResultData {
    _id: string;
    _source: Source;
  }
  
  export interface ResultSectionProps {
    data: ResultData[];
  }
  

  export interface ResultCardProps {
    id: string;
    filing_date: string;
    registration_date: string;
    renewal_date: string;
    status: string;
    description: string;
    name: string;
    owner: string;
  }