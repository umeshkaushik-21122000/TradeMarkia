
'use client';
import HeaderSection from './Components/HeaderSection';
import SideBarSection from './Components/SideBarSection';
import ResultSection from './Components/ResultSection';
import useUrlChange from './hooks/useUpdateUrl';
import MainSkeleton from './Components/MainSkeleton';


const Home: React.FC = () => {

    const {data,loading,error}=useUrlChange('https://vit-tm-task.api.trademarkia.app/api/v3/us');

    if(loading)return <MainSkeleton />
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

export default Home;
