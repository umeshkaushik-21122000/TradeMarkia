import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterCardProps } from "../types/type";

const FilterCard: React.FC<FilterCardProps> = ({ data }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams(); // Get search parameters

  useEffect(() => {
    // Determine the active filter key (current_owners, law_firms, or attorneys)
    const filterKey = Object.keys(data)[0] as keyof typeof data;
    const filterValues = searchParams.getAll(filterKey);

    if (filterValues.length > 0) {
      setSelectedFilters(filterValues);
    }
  }, [searchParams, data]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;

    if (target.type === "checkbox") {
      const filter = target.name;
      const filterKey = Object.keys(data)[0] as keyof typeof data;

      setSelectedFilters((prevFilters) => {
        const newFilters = prevFilters.includes(filter)
          ? prevFilters.filter((item) => item !== filter)
          : [...prevFilters, filter];

        const queryParams = new URLSearchParams(searchParams.toString());
        queryParams.delete(filterKey);

        newFilters.forEach((filter) => {
          queryParams.append(filterKey, filter);
        });

        const newUrl = `${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
        router.push(newUrl);

        return newFilters;
      });
    }
  };

  // Get the active filter list based on the data key
  const filterList = data[Object.keys(data)[0] as keyof typeof data] || [];

  return (
    <div className="h-[20vh] mt-5 overflow-auto" onClick={handleClick}>
      {filterList.map((obj) => (
        <div className="flex gap-3 text-lg my-5" key={obj.key}>
          <input
            type="checkbox"
            name={obj.key}
            checked={selectedFilters.includes(obj.key)}
            onChange={() => {}}
          />
          <p>{obj.key.toUpperCase()}</p>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
