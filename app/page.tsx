"use client";
import { Suspense } from "react";
import HeaderSection from "./Components/HeaderSection";
import SideBarSection from "./Components/SideBarSection";
import ResultSection from "./Components/ResultSection";
import useUrlChange from "./hooks/useUpdateUrl";
import MainSkeleton from "./Components/MainSkeleton";
import ShareSection from "./Components/ShareSection";

const Home: React.FC = () => {
  const { data, loading, error } = useUrlChange(
    "https://vit-tm-task.api.trademarkia.app/api/v3/us",
  );

  if (loading || !data) return <MainSkeleton />;
  if (error) return <p>Some error detected: {error.message}</p>;

  return (
    <div className="text-black">
      <HeaderSection />
      <ShareSection results={data.body.hits.hits.length} />
      <div className="flex p-12 pt-0 gap-10">
        <div className="basis-[70%]">
          <ResultSection data={data.body.hits.hits} />
        </div>
        <div className="basis-1/3">
          <SideBarSection data={data.body.aggregations} />
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
