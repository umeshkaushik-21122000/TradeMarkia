
'use client';
import HeaderSection from './Components/HeaderSection';
import SideBarSection from './Components/SideBarSection';
import ResultSection from './Components/ResultSection';
import useUrlChange from './hooks/useUpdateUrl';

// page load hote hi url check kro usme koi values h to unhe lo or data popluate kro
// vrna kahli vala dikhao

const Home: React.FC = () => {

    const {data,loading,error}=useUrlChange('https://vit-tm-task.api.trademarkia.app/api/v3/us');

    if(loading||!data)return <div>loading....</div>
    if (error)return <p>some error detected</p>
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
