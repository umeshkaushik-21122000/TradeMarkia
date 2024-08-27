import React from "react";

// Main Skeleton Component
const MainSkeleton = () => {
  return (
    <div className="animate-pulse">
      <HeaderSkeleton />
        <ShareSectionSkeleton />
      <div className="flex">
        <table>
        <SkeletonLoader rows={10} />
        </table>
        <SideBarLoader />
      </div>
    </div>
  );
};

// Header Skeleton Component
const InputSectionSkeleton: React.FC = () => {
  return (
    <form className='relative flex w-1/2 justify-center items-center gap-x-3'>
      <div className="relative flex w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-300 animate-pulse" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <div className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 animate-pulse">
          <div className="h-6 bg-gray-300 rounded"></div>
        </div>
      </div>
      <button type="submit" className="text-white end-2.5 bottom-2.5 bg-gray-500 rounded-lg text-sm px-8 py-3">
        <div className="h-4 bg-gray-300 rounded"></div>
      </button>
    </form>
  );
};

const LogoSectionSkeleton: React.FC = () => {
  return (
    <div className="w-[155px] h-[31px] bg-gray-500 animate-pulse rounded"></div>
  );
};

const HeaderSkeleton: React.FC = () => {
  return (
    <div className='bg-gray-300 flex w-full py-12 px-20 gap-x-12 items-center'>
      <LogoSectionSkeleton />
      <InputSectionSkeleton />
    </div>
  );
};

// Sidebar Skeleton Components
const SideBarLoader = () => {
  return (
    <div className="p-12 top-72 flex flex-col items-end gap-y-12 right-10">
      <StatusSkeleton />
      <FilterSkeleton />
    </div>
  );
};

const StatusSkeleton: React.FC = () => {
  return (
    <div className='flex flex-col w-full p-6 bg-white border border-gray-200 rounded-lg shadow'>
      <span className='font-bold mb-3 bg-gray-200 h-[20px] w-[100px] animate-pulse rounded'></span>
      <div className='flex flex-wrap gap-5'>
        {Array(5).fill(null).map((_, index) => (
          <button
            key={index}
            type="button"
            className='flex justify-center gap-x-2 items-center text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-gray-200 animate-pulse'
          >
            <div className='h-[7px] w-[7px] rounded-full bg-gray-300 animate-pulse' />
            <span className='bg-gray-300 h-[14px] w-[60px] animate-pulse rounded'></span>
          </button>
        ))}
      </div>
    </div>
  );
};

const FilterSkeleton: React.FC = () => {
  return (
    <div className='flex flex-col w-full p-6 bg-white border border-gray-200 rounded-lg shadow'>
      <div className='flex gap-x-3 mb-4'>
        <div className='w-[100px] h-[20px] bg-gray-200 animate-pulse rounded'></div>
        <div className='w-[100px] h-[20px] bg-gray-200 animate-pulse rounded'></div>
        <div className='w-[100px] h-[20px] bg-gray-200 animate-pulse rounded'></div>
      </div>
      <div className='bg-gray-200 animate-pulse p-4 rounded'>
        <div className='w-full h-[200px] bg-gray-300 rounded'></div>
      </div>
    </div>
  );
};

// Skeleton Row and Loader
const SkeletonRow: React.FC = () => {
  return (
    <tr className="bg-white border-b hover:bg-gray-100">
      <td className="px-6 py-3">
        <div className="w-[230px] h-[100px] bg-gray-200 animate-pulse"></div>
      </td>
      <td className="px-6 py-3">
        <div className="w-[200px] h-[20px] bg-gray-200 animate-pulse mb-2"></div>
        <div className="w-[250px] h-[20px] bg-gray-200 animate-pulse"></div>
      </td>
      <td className="px-6 py-3">
        <div className="w-[100px] h-[20px] bg-gray-200 animate-pulse mb-2"></div>
        <div className="w-[80px] h-[20px] bg-gray-200 animate-pulse"></div>
        <div className="w-[100px] h-[20px] bg-gray-200 animate-pulse mt-3"></div>
      </td>
      <td className="px-6 py-4">
        <div className="w-[200px] h-[20px] bg-gray-200 animate-pulse mb-2"></div>
        <div className="w-[250px] h-[20px] bg-gray-200 animate-pulse"></div>
      </td>
    </tr>
  );
};

const ShareSectionSkeleton: React.FC = () => {
  return (
    <div className='p-12 animate-pulse'>
      {/* Skeleton for the text section */}
      <div className='font-bold text-lg text-gray-300 border-b pb-3 bg-gray-200 h-6 w-3/4 mb-4'></div>
      
      {/* Skeleton for the buttons and icons */}
      <div className='flex justify-between items-center mt-3 pe-24'>
        <div className='flex items-center gap-x-5'>
          {/* Placeholder buttons */}
          <div className='flex items-center gap-x-5'>
            <div className='bg-gray-200 h-8 w-24 rounded-lg'></div>
            <div className='bg-gray-200 h-8 w-24 rounded-lg'></div>
          </div>
        </div>
        <div className='flex gap-x-5'>
          {/* Placeholder buttons with icons */}
          <div className='flex items-center justify-center bg-gray-200 rounded-lg h-8 w-24'></div>
          <div className='flex items-center justify-center bg-gray-200 rounded-full h-8 w-8'></div>
          <div className='flex items-center justify-center bg-gray-200 rounded-full h-8 w-8'></div>
        </div>
      </div>
    </div>
  );
}

const SkeletonLoader: React.FC<{ rows: number }> = ({ rows }) => {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, index) => (
        <SkeletonRow key={index} />
      ))}
    </tbody>
  );
};

export default MainSkeleton;
