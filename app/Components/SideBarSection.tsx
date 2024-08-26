'use client';
import StatusSection from './StatusSection'
import FilterSection from './FilterSection'

const SideBarSection = ({data}:any) => {
    if(!data)return;
  return (
    <div>
        {/* <StatusSection /> */}
        <FilterSection data={data?data:{}} />
    </div>
  )
}

export default SideBarSection