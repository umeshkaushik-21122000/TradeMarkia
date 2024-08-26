import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const FilterCard = ({ data }: any) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams(); // Get search parameters

  useEffect(() => {
    // Extract the specific filter parameters from the URL and initialize selectedFilters
    const filterKey = Object.keys(data)[0]; // Assuming `data` has only one key
    const filterValues = searchParams.getAll(filterKey);
    
    if (filterValues.length > 0) {
      setSelectedFilters(filterValues);
    }
  }, [searchParams, data]);

  const handleClick = (e: any) => {
    if (e.target.type === 'checkbox') {
      const filter = e.target.name;
      const filterKey = Object.keys(data)[0]; // Assuming `data` has only one key

      setSelectedFilters((prevFilters) => {
        // Toggle the filter in the array
        const newFilters = prevFilters.includes(filter)
          ? prevFilters.filter((item) => item !== filter)
          : [...prevFilters, filter];

        // Create URLSearchParams from existing searchParams
        const queryParams = new URLSearchParams(searchParams.toString());

        // Remove old filter parameters for this specific key
        queryParams.delete(filterKey);

        // Add new filter parameters
        newFilters.forEach((filter) => {
          queryParams.append(filterKey, filter);
        });

        // Construct the new URL
        const newUrl = `${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        // Update the URL
        router.push(newUrl);

        return newFilters;
      });
    }
  };

  return (
    <div className='h-[20vh] mt-5 overflow-auto' onClick={handleClick}>
      {data[Object.keys(data)[0]].map((obj: any) => (
        <div className='flex gap-3 text-lg my-5' key={obj.key}>
          <input
            type="checkbox"
            name={obj.key}
            checked={selectedFilters.includes(obj.key)} // Check if the filter is selected
            onChange={() => {}} // Prevent the default behavior of the checkbox
          />
          <p>{obj.key.toUpperCase()}</p>
        </div>
      ))}
      </div>

  );
};

export default FilterCard;
