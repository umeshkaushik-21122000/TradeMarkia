import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const StatusSection = () => {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams(); // Get search parameters

  // Function to get color class based on the color name
  const getColorClass = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-600';
      case 'yellow': return 'bg-yellow-600';
      case 'red': return 'bg-red-600';
      case 'blue': return 'bg-blue-600';
      default: return 'hidden';
    }
  };

  // Status options for buttons
  const statusOptions = [
    { name: 'All', id: 1, color: 'transparent' },
    { name: 'Registered', id: 2, color: 'green' },
    { name: 'Pending', id: 3, color: 'yellow' },
    { name: 'Abandoned', id: 4, color: 'red' },
    { name: 'Others', id: 5, color: 'blue' },
  ];

  // Update selectedStatuses based on URL change
  useEffect(() => {
    const statusParams = searchParams.getAll('status');
    setSelectedStatuses(statusParams);
  }, [searchParams.toString()]); // Depend on searchParams.toString() to detect changes

  // Handle status button click
  const handleStatusToggle = (status: string) => {
    const currentStatuses = new Set(selectedStatuses);
    if (currentStatuses.has(status)) {
      currentStatuses.delete(status);
    } else {
      currentStatuses.add(status);
    }

    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.delete('status'); // Remove old status parameters
    currentStatuses.forEach(status => queryParams.append('status', status)); // Add new status parameters

    const newUrl = `?${queryParams.toString()}`;
    router.replace(newUrl); // Update the URL without a full page reload
  };

  return (
    <div className='flex flex-col w-full p-6 bg-white border border-gray-200 rounded-lg shadow'>
      <span className='font-bold mb-3'>Status</span>
      <div className='flex flex-wrap gap-3'>
        {statusOptions.map(option => {
          const isSelected = selectedStatuses.includes(option.name);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleStatusToggle(option.name.toLowerCase())}
              className={`flex justify-center gap-x-2 items-center text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 ${isSelected ? 'bg-blue-200 text-blue-400 border-blue-500' : ''}`}
            >
              <div className={`h-[7px] w-[7px] rounded-full ${getColorClass(option.color)}`} />
              <span>{option.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StatusSection;
