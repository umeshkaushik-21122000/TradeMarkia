import React from "react";

import {  ResultSectionProps } from "../types/type";
import ResultCard from "./ResultCard";

const ResultSection: React.FC<ResultSectionProps> = ({ data }) => {

  return (
    <div className="gap-y-3">
      <table className="text-sm text-left w-full">
        <thead className="text-xs uppercase border-b-2">
          <tr>
            <th scope="col" className="px-6 py-3">Mark</th>
            <th scope="col" className="px-6 py-3">Details</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Class/Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((obj) => (
            <ResultCard
              key={obj._id}
              id={obj._id}
              filing_date={obj._source.filing_date.toString()}
              registration_date={obj._source.registration_date.toString()}
              renewal_date={obj._source.status_date.toString()}
              status={obj._source.status_type}
              description={obj._source.mark_description_description[0]}
              name={obj._source.mark_identification}
              owner={obj._source.current_owner}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultSection;

