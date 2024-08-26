
'use client';
import { Suspense } from 'react';
import HeaderSection from './Components/HeaderSection';
import SideBarSection from './Components/SideBarSection';
import ResultSection from './Components/ResultSection';
import useUrlChange from './hooks/useUpdateUrl';
import MainSkeleton from './Components/MainSkeleton';

const MainComponet = () =>{
  return(
    <Suspense fallback={<MainSkeleton />}>
      <Home />
    </Suspense>
  )
}

const Home: React.FC = async() => {

    const {data,loading,error}=await useUrlChange('https://vit-tm-task.api.trademarkia.app/api/v3/us');
    if(loading)return 
    if (error)return <p>some error detected</p>
    if(!data)return;
  return (
    <div className='text-black'>
        <HeaderSection />
        <div className='sticky top-72 flex p-12 gap-10'>
            <ResultSection data={data.body.hits.hits} />
            <SideBarSection data={data} />
        </div>
        </div>
  );
};

export default MainComponet;
