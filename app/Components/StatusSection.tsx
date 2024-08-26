import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const StatusSection = () => {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams(); // Get search parameters


  const getColorClass = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-600';
      case 'yellow': return 'bg-yellow-600';
      case 'red': return 'bg-red-600';
      case 'blue': return 'bg-blue-600';
      default: return 'hidden';
    }
  };


  const statusOptions = [
    { name: 'All', id: 1,color:'transparent' },
    { name: 'Registered', id: 2,color:'green' },
    { name: 'Pending', id: 3,color:'yellow' },
    { name: 'Abandoned', id: 4,color:'red' },
    { name: 'Others', id: 5,color:'blue' },
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
    <div className='flex flex-col w-full p-6 bg-white border border-gray-200 rounded-lg shadow '>
      <span className='font-bold mb-3'>Status</span>
      <div className='flex flex-wrap gap-3'>
      {statusOptions.map((option) =>{
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => handleStatusToggle(option.name)}
            className={`flex justify-center gap-x-2 items-center text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 ${selectedStatuses.includes(option.name)?'bg-blue-200 text-blue-400 border-blue-500':''}`}
          >
            <div className={`h-[7px] w-[7px] rounded-full ${getColorClass(option.color)}`} />
            <span >{option.name}</span>
          </button>
        )
      })}
      </div>
    </div>
  );
};

export default StatusSection;
