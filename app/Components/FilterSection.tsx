import React from 'react';
import FilterCard from './FilterCard';

const FilterSection = ({ data }: any) => {
  const filters = [
    {
      id: 1,
      name: "Owners",
      key: 'current_owners',
    },
    {
      id: 2,
      name: "Law Firms",
      key: 'law_firms',
    },
    {
      id: 3,
      name: "Attorneys",
      key: 'attorneys',
    },
  ];

  return (
    <div>
      {filters.map((filter) => {
        // Extracting the relevant data for each filter
        const myData = {
          [filter.key]: data.body.aggregations[filter.key]?.buckets || []
        };// Fallback to an empty array if data is not found

        return (
          <div key={filter.id}>
            <h3>{filter.name}</h3> {/* Display the filter name */}
            <FilterCard data={myData} />
          </div>
        );
      })}
    </div>
  );
}

export default FilterSection;
