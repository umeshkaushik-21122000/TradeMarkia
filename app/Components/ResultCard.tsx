import Image from "next/image";
import { ResultCardProps } from "../types/type";
import unavailable from "@/public/unavailable.png";
import refresh from "@/public/refresh.png";
import { formatDate, getStatusColor } from "../utils/utils";

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
        <div
          className={`mt-3 flex items-center gap-1 ${formatDate(renewal_date) === "" ? "hidden" : ""}`}
        >
          <Image
            src={refresh}
            alt="referesh image"
            height={15}
            width={15}
            unoptimized
          />
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

export default ResultCard;
