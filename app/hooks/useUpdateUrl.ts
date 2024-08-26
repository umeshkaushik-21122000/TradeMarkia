import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

// Define types for the API response and request body
interface ApiResponse {
  [key: string]: any;
}

interface RequestBody {
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

// Default request body
const defaultRequestBody: RequestBody = {
  input_query: '',
  input_query_type: '',
  sort_by: 'default',
  status: [],
  exact_match: false,
  date_query: false,
  owners: [],
  attorneys: [],
  law_firms: [],
  mark_description_description: [],
  classes: [],
  page: 1,
  rows: 10,
  sort_order: 'desc',
  states: [],
  counties: [],
};

// Utility function to extract and parse search params
const extractParams = (searchParams: URLSearchParams, paramName: string): string[] => {
  return searchParams.getAll(paramName);
};

// Utility function to construct request body
const buildRequestBody = (
  searchParams: URLSearchParams,
  inputQuery: string
): RequestBody => {
  return {
    ...defaultRequestBody,
    input_query: inputQuery,
    status: extractParams(searchParams, 'status'),
    owners: extractParams(searchParams, 'current_owners'),
    attorneys: extractParams(searchParams, 'attorneys'),
    law_firms: extractParams(searchParams, 'law_firms'),
  };
};

// Fetch data function
const fetchData = async (
  apiEndpoint: string,
  requestBody: RequestBody,
  setData: React.Dispatch<React.SetStateAction<ApiResponse | null>>,
  setError: React.Dispatch<React.SetStateAction<Error | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result: ApiResponse = await response.json();
    setData(result);
  } catch (err) {
    if (err instanceof Error) {
      setError(err);
    }
  } finally {
       setLoading(false);
  }
};

// Main hook function
const useUrlChange = (apiEndpoint: string) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const inputQuery = searchParams.get('input_query') || '';

  // Fetch data whenever relevant URL parameters change
  useEffect(() => {
    const requestBody = buildRequestBody(searchParams, inputQuery);
    fetchData(apiEndpoint, requestBody, setData, setError, setLoading);
  }, [apiEndpoint, searchParams, inputQuery]);

  return { data, loading, error };
};

export default useUrlChange;
