import React, { useState } from 'react';
import FilterCard from './FilterCard';
import { current } from '@reduxjs/toolkit';

const FilterSection = ({ data }: any) => {

  const [selectFilter,setSelectFilter]=useState(0);
  const [list,setList]=useState<any>({
    current_owners:data.body.aggregations.current_owners.buckets
  })
  const filters = [
    {
      id: 0,
      name: "Owners",
      key: 'current_owners',
    },
    {
      id: 1,
      name: "Law Firms",
      key: 'law_firms',
    },
    {
      id: 2,
      name: "Attorneys",
      key: 'attorneys',
    },
  ];

  const handleClick=(id:any)=>{

    setSelectFilter(id);
    const name=filters[id].key;
    setList({
      [name]:data.body.aggregations[name].buckets
    })
  }

  return (
    <div className=' flex flex-col w-full  p-6 bg-white border border-gray-200 rounded-lg shadow'>
        <div className='flex gap-x-3'>
        {filters.map((filter) => {
        // Extracting the relevant data for each filter
        return (
          <div  key={filter.id}>
            <button className={`${selectFilter===filter.id?'underline font-bold':''}`} onClick={(e)=>handleClick(filter.id)}>{filter.name}</button> {/* Display the filter name */}
          </div>
        );
      })}
        </div>
       <FilterCard data={list} />
    </div>
  );
}

export default FilterSection;
