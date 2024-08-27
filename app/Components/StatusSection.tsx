import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getColorClass } from "../utils/utils";
import { statusOptions } from "../data/data";

const StatusSection = () => {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams(); // Get search parameters





  // Update selectedStatuses based on URL change
  useEffect(() => {
    const statusParams = searchParams.getAll("status");
    setSelectedStatuses(statusParams);
  }, [searchParams.toString()]); // Depend on searchParams.toString() to detect changes

  // Handle status button click
  const handleStatusToggle = (status: string) => {
    let updatedStatuses = [...selectedStatuses];

    if (status === "all") {
      updatedStatuses = [];
    } else {
      const index = updatedStatuses.indexOf(status);
      if (index > -1) {
        updatedStatuses.splice(index, 1);
      } else {
        updatedStatuses.push(status);
      }
    }

    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.delete("status"); // Remove old status parameters
    updatedStatuses.forEach((status) => queryParams.append("status", status)); // Add new status parameters

    setSelectedStatuses(updatedStatuses);
    const newUrl = `?${queryParams.toString()}`;
    router.push(newUrl); // Update the URL without a full page reload
  };

  return (
    <div className="flex flex-col w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
      <span className="font-bold mb-3">Status</span>
      <div className="flex flex-wrap gap-3">
        {statusOptions.map((option) => {
          const isSelected =
            selectedStatuses.includes(option.name.toLowerCase()) ||
            (option.name === "All" && selectedStatuses.length === 0);

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleStatusToggle(option.name.toLowerCase())}
              className={`flex justify-center gap-x-2 items-center text-gray-500 border border-gray-300 hover:bg-gray-100 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 ${
                isSelected ? "bg-blue-100 text-blue-500 border-blue-600" : ""
              }`}
            >
              <div
                className={`h-[7px] w-[7px] rounded-full ${getColorClass(
                  option.color
                )}`}
              />
              <span>{option.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StatusSection;
