import CreateProduct from "./CreateProduct";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

function ShopCreateProduct() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] width-at-800px">
          <DashboardSidebar activeHeading={4} />
        </div>
        <div className="w-full justify-center flex">
          <CreateProduct />
        </div>
      </div>
    </div>
  );
}

export default ShopCreateProduct;
