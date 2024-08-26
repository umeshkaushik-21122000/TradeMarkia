// hooks/useUrlChange.ts
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

// Define a type for the API response data
interface ApiResponse {
  [key: string]: any;
}

// Define a type for the request body
interface RequestBody {
  input_query: string;
  input_query_type: string;
  sort_by: string;
  status: any[];
  exact_match: boolean;
  date_query: boolean;
  owners: any[];
  attorneys: any[];
  law_firms: any[];
  mark_description_description: any[];
  classes: any[];
  page: number;
  rows: number;
  sort_order: string;
  states: any[];
  counties: any[];
}

const useUrlChange = (apiEndpoint: string) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Using useSearchParams to access query parameters
  const searchParams = useSearchParams();
  const inputQuery = searchParams.get('input_query') || '';

  // Define states for other parameters
  const [statusParams, setStatusParams] = useState<string[]>([]);
  const [ownersParams, setOwnersParams] = useState<string[]>([]);
  const [attorneysParams, setAttorneysParams] = useState<string[]>([]);
  const [lawFirmsParams, setLawFirmsParams] = useState<string[]>([]);

  useEffect(() => {
    // Update state based on the URL parameters
    setStatusParams(searchParams.getAll('status'));
    setOwnersParams(searchParams.getAll('current_owners'));
    setAttorneysParams(searchParams.getAll('attorneys'));
    setLawFirmsParams(searchParams.getAll('law_firms'));
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Define the initial request body with default values
        const initialRequestBody: RequestBody = {
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

        // Construct the request body by updating with URL parameters
        const requestBody: RequestBody = {
          ...initialRequestBody,
          input_query: inputQuery,
          status: statusParams.length > 0 ? statusParams : initialRequestBody.status,
          owners: ownersParams.length > 0 ? ownersParams : initialRequestBody.owners,
          attorneys: attorneysParams.length > 0 ? attorneysParams : initialRequestBody.attorneys,
          law_firms: lawFirmsParams.length > 0 ? lawFirmsParams : initialRequestBody.law_firms,
          // Add other URL params to requestBody if needed
        };

        // Make a POST request with the updated request body
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

    fetchData();
  // Dependency on inputQuery, statusParams, ownersParams, attorneysParams, and lawFirmsParams to trigger effect when URL query changes
  }, [inputQuery, statusParams, ownersParams, attorneysParams, lawFirmsParams]);

  return { data, loading, error };
};

export default useUrlChange;
