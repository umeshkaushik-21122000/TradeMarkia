import Image from "next/image";
import React from "react";
import unavailable from "@/public/unavailable.png";
import refresh from '@/public/refresh.png';

const ResultSection = ({ data }: any) => {
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
          {data.map((obj: any) => (
            <ResultCard
              key={obj._id}
              id={obj._id}
              filing_date={obj._source.filing_date}
              registration_date={obj._source.registration_date}
              renewal_date={obj._source.renewal_date}
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

interface ResultCardProps {
  id: string;
  filing_date: string;
  registration_date: string;
  renewal_date: string;
  status: string;
  description: string;
  name: string;
  owner: string;
}

function formatDate(timestampStr: string): string {
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) {
    return "";
  }
  const date = new Date(timestamp * 1000);
  if (isNaN(date.getTime())) {
    return "";
  }
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
}

function getStatusColor(status: string): string {
  switch (status) {
    case "registered":
      return "text-green-600";
    case "pending":
      return "text-yellow-600";
    case "abandoned":
      return "text-red-600";
    case "other":
      return "text-blue-600";
    default:
      return "";
  }
}

const ResultCard: React.FC<ResultCardProps> = ({
  id,
  filing_date,
  registration_date,
  renewal_date,
  status,
  description,
  name,
  owner,
}) => {
  return (
    <tr className="bg-white border-b hover:bg-gray-100">
      <td className="px-6 py-3">
        <Image src={unavailable} alt="Unavailable" height={100} width={130} />
      </td>
      <td className="px-6 py-3">
        <div className="font-bold">{name}</div>
        {owner}
        <div className="font-bold mt-3">{id}</div>
        {formatDate(registration_date)}
      </td>
      <td className="px-6 py-3">
        <div className={`${getStatusColor(status)} font-bold text-lg`}>
          {status === "registered" ? "Live/Registered" : status}
        </div>
        <div className="mt-1 ">
          on <span className="font-bold">{formatDate(filing_date)}</span>
        </div>
        <div className={`mt-3 flex items-center gap-1 ${formatDate(renewal_date)===''?'hidden':''}`}>
        <Image src={refresh} alt="referesh image" height={15} width={15} unoptimized />
          {formatDate(renewal_date)}
          </div>
      </td>
      <td className="px-6 py-4">
        {description.length > 60
          ? `${description.slice(0, 60)}...`
          : description}
      </td>
    </tr>
  );
};
