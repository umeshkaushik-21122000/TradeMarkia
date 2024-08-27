import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ApiResponse, RequestBody } from '../types/type';


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
  requestBody: RequestBody
): Promise<ApiResponse> => {
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

  return response.json();
};

// Main hook function
const useUrlChange = (apiEndpoint: string) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const inputQuery = searchParams.get('input_query') || '';

  useEffect(() => {
    const requestBody = buildRequestBody(searchParams, inputQuery);

    const fetchDataAsync = async () => {
      try {
        setLoading(true);
        const result = await fetchData(apiEndpoint, requestBody);
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, [apiEndpoint, searchParams, inputQuery]);

  return { data, loading, error };
};

export default useUrlChange;
