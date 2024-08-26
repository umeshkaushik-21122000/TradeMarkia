import Image from "next/image";
import React from "react";
import unavailable from "@/public/unavailable.png";

const ResultSection = ({ data }: any) => {
  return (
    <div className=" gap-y-3 ">
      <table className="w-full text-sm text-left  ">
        <thead className="text-xs  uppercase border-b-2">
          <tr>
            <th scope="col" className="px-6 py-3">
              Mark
            </th>
            <th scope="col" className="px-6 py-3">
              Details
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Class/Description
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((obj: any) => {
            return (
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
            );
          })}
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
  // Convert the string to a number
  const timestamp = parseInt(timestampStr, 10);

  // Check if the timestamp is a valid number
  if (isNaN(timestamp)) {
    return '';
  }

  const date = new Date(timestamp * 1000);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return '';
  }

  // Define options for the date formatting
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };

  // Format the date to '10 Jan 2007' format
  return date.toLocaleDateString('en-GB', options);
}


function getStatusColor(status:string):string {
  switch(status){
    case 'registered': return 'text-green-600'; 
    case 'pending':return'text-yellow-600';
    case 'abandoned':return'text-red-600';
    case 'other': return 'text-blue-600';
    default :return '';
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
    <tr className="bg-white border-b hover:bg-gray-100 z-10">
      <td className="px-6 py-3">
        <Image src={unavailable} alt={name} height={100} width={130} />
      </td>
      <td className="px-6 py-3">
        {" "}
        <div className="font-bold">{name}</div> {owner}{" "}
        <div className="font-bold mt-3">{id}</div> {formatDate(registration_date)}
      </td>
      <td className="px-6 py-3">
        <div className={`${getStatusColor(status)} font-bold text-lg`}>{status==='registered'?'Live/Registered':status}</div> <div>{formatDate(renewal_date)}</div> <div className="mt-3">{formatDate(filing_date)}</div>
      </td>
      <td className="px-6 py-4">
        {description.length > 70
          ? `${description.split(" ").slice(0, 10).join(" ")}${description
              .split(" ")
              .slice(10, 20)
              .join(" ")} ...`
          : description}
      </td>
    </tr>
  );
};
