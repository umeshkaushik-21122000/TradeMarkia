import React, { useState } from 'react';
import FilterCard from './FilterCard';
import { Bucket, FilterProps, FilterSectionData } from '../types/type';
import { filters } from '../data/data';



const FilterSection: React.FC<FilterProps> = ({ data }) => {
  const [selectFilter, setSelectFilter] = useState<number>(0);
  const [list, setList] = useState<Partial<Record<string, Bucket[]>>>({
    current_owners: data.current_owners.buckets,
  });



  const handleClick = (id: number) => {
    setSelectFilter(id);
    const name = filters[id].key;
    setList({
      [name]: data[name as keyof FilterSectionData].buckets,
    });
  };

  return (
    <div className="flex flex-col w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex gap-x-3">
        {filters.map((filter) => (
          <div key={filter.id}>
            <button
              className={`${selectFilter === filter.id ? 'underline font-bold' : ''}`}
              onClick={() => handleClick(filter.id)}
            >
              {filter.name}
            </button>
          </div>
        ))}
      </div>
      <FilterCard data={list} />
    </div>
  );
};

export default FilterSection;
