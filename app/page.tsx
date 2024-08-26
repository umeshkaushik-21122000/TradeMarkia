
'use client';
import HeaderSection from './Components/HeaderSection';
import SideBarSection from './Components/SideBarSection';
import ResultSection from './Components/ResultSection';
import useUrlChange from './hooks/useUpdateUrl';

// page load hote hi url check kro usme koi values h to unhe lo or data popluate kro
// vrna kahli vala dikhao

const Home: React.FC = () => {

    const {data,loading,error}=useUrlChange('https://vit-tm-task.api.trademarkia.app/api/v3/us');

  return (
    <div className='p-24 text-black'>
        <HeaderSection />
        <SideBarSection data={data} />
        {/* <ResultSection data={data} /> */}
    </div>
  );
};

export default Home;
