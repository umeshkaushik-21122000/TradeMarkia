import React from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import sort from '@/public/sort.png';
import share from '@/public/share.png';
import filter from '@/public/filter_alt.png';

interface ShareSectionProps {
  results: number;
}

const ShareSection: React.FC<ShareSectionProps> = ({ results }) => {
  const searchParams = useSearchParams();
  const searchedWord = searchParams.get('input_query');

  return (
    <div className='p-12'>
        <div className='font-bold text-lg text-[#4B5563] border-b pb-3'>About {results} Trademarks found for “{searchedWord}“</div>
        <div className='flex justify-between items-center  mt-3 pe-24'>
            <div className='flex items-center gap-x-5'>
                Also try searching for
                <button
              className={`flex justify-center gap-x-2 items-center text-[#E7760E] border border-[#E7760E] hover:bg-[#FFB84D]  font-medium rounded-lg text-sm px-5 py-2.5`}
            >
              {searchedWord?.split('').splice(0,searchedWord.length-1)}*
            </button>
            <button
              className={`flex justify-center gap-x-2 items-center text-[#E7760E] border border-[#E7760E]  hover:bg-[#FFB84D] font-medium rounded-lg text-sm px-5 py-2.5`}
            >
              *{searchedWord?.split('').splice(1)}
            </button>
                 </div>
            <div className='flex gap-x-5'>
        <button
              className={`flex justify-center gap-x-2 items-center text-gray-500 border border-gray-300 hover:bg-gray-100 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5`}
            >
              <Image src={filter} alt="sort" height={15} width={15} unoptimized />  filter
            </button>
            <button
              className={`flex rounded-full justify-center  items-center text-gray-500 border border-gray-300 hover:bg-gray-100 focus:ring-4 font-medium text-sm p-3`}
            >
                <Image src={share} alt="sort" height={15} width={15} unoptimized />
            </button>
            <button
              className={`flex rounded-full justify-center  items-center text-gray-500 border border-gray-300 hover:bg-gray-100 focus:ring-4 font-medium text-sm p-3`}
            >
                <Image src={sort} alt="sort" height={15} width={15} unoptimized />
            </button>
            </div>
        </div>
    </div>
  );
}

export default ShareSection;
