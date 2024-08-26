import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const StatusSection = () => {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams(); // Get search parameters

  const statusOptions = [
    { name: 'All', id: 1 },
    { name: 'Registered', id: 2 },
    { name: 'Pending', id: 3 },
    { name: 'Abandoned', id: 4 },
    { name: 'Others', id: 5 },
  ];

  useEffect(() => {
    // Extract 'status' parameters from URL and initialize selectedStatuses
    const statusParams = searchParams.getAll('status');
    if (statusParams.length > 0) {
      setSelectedStatuses(statusParams);
    }
  }, [searchParams]);

  const handleStatusToggle = (status: string) => {
    // Check if 'input_query' is present in the URL
    if (!searchParams.get('input_query')) {
      return;
    }

    setSelectedStatuses((prevStatuses) => {
      // Toggle the status in the array
      const newStatuses = prevStatuses.includes(status)
        ? prevStatuses.filter((item) => item !== status)
        : [...prevStatuses, status];

      // Create URLSearchParams from existing searchParams
      const queryParams = new URLSearchParams(searchParams.toString());

      // Remove old status parameters
      queryParams.delete('status');

      // Add new status parameters
      newStatuses.forEach((status) => {
        queryParams.append('status', status);
      });

      // Construct the new URL
      const newUrl = `${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

      // Update the URL
      router.push(newUrl);

      return newStatuses;
    });
  };

  return (
    <div>
      <h2>Status</h2>
      {statusOptions.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => handleStatusToggle(option.name)}
          className={selectedStatuses.includes(option.name) ? 'border border-2 border-black bg-gray-500 p-3' : 'p-2'}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};

export default StatusSection;
