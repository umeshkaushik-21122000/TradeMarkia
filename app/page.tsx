'use client';
import { Suspense } from 'react';
import HeaderSection from './Components/HeaderSection';
import SideBarSection from './Components/SideBarSection';
import ResultSection from './Components/ResultSection';
import useUrlChange from './hooks/useUpdateUrl';
import MainSkeleton from './Components/MainSkeleton';

const Home: React.FC = () => {
  const { data, loading, error } = useUrlChange('https://vit-tm-task.api.trademarkia.app/api/v3/us');

  if (loading) return <MainSkeleton />;
  if (error) return <p>Some error detected: {error.message}</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div className='text-black'>
      <HeaderSection />
      <div className='mt-3 flex p-12 gap-10'>
  <div className='result-section basis-[70%]'>
    <ResultSection data={data.body.hits.hits} />
  </div>
  <div className='basis-1/3' >
    <SideBarSection data={data} />
  </div>
</div>
    </div>
  );
};

const MainComponent: React.FC = () => {
  return (
    <Suspense fallback={<MainSkeleton />}>
      <Home />
    </Suspense>
  );
};

export default MainComponent;
