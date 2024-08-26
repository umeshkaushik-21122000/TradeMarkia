'use client';
import StatusSection from './StatusSection'
import FilterSection from './FilterSection'

const SideBarSection = ({data}:any) => {
    if(!data)return;
  return (
    <div className=' flex flex-col gap-y-3'>
        <StatusSection />
        <FilterSection data={data?data:{}} />
    </div>
  )
}

export default SideBarSection