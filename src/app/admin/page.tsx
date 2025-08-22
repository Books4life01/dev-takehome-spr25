

import RequestTable from "@/components/tables/RequestTable";
import './admin.css'

/**
 * Legacy front-end code from Crisis Corner's previous admin page!
 */
export default async function ItemRequestsPage() {
  
  // const requests:ItemRequest[] = await ItemRequestModel.find<ItemRequest>({});
 

  return (
    // <div><Dropdown status={"pending"} setStatus={null}></Dropdown></div>
    <div className="max-w-full mx-auto mt-8 flex flex-col items-center gap-6">
      <div className="RequestTableContainer">
        <RequestTable batchUpdates={true}/**requests={JSON.parse(JSON.stringify(requests))}**/></RequestTable>
      </div>
    </div>
  );
}
