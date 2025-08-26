import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../UserComps/Loader";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AllCoupons() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [value, setValue] = useState(null);
  const { seller } = useSelector(state => state.seller);
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const { product } = useSelector(state => state.product);

  useEffect(function () {
    setIsLoading(true);
    axios
      .get(`${API_BASE_URL}/api/v2/coupons/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then(res => {
        setCoupons(res?.data.couponCodes);
        console.log(res);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
      });
  }, []);

  async function handleDelete(id) {
    try {
      const { data, status } = await axios.delete(
        `${API_BASE_URL}/api/v2/coupons/delete-coupon/${id}`,
        { withCredentials: true }
      );
      if (status === 201) {
        toast.success(data?.message);
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, status } = await axios.post(
        `${API_BASE_URL}/api/v2/coupons/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProducts,
          value,
          shopId: seller._id,
        },
        { withCredentials: true }
      );
      if (status === 201) {
        setOpen(false);
        toast.success("Coupon created for the product!");
        window.location.reload();
      }
      console.log(data);
    } catch (error) {
      toast.error(error?.reponse?.data?.message);
    }
  }
  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "discount", minWidth: 100, flex: 0.6 },
    {
      field: "Preview",
      headerName: "",
      type: "number",
      sortable: false,
      minWidth: 100,
      flex: 0.8,
      renderCell: params => {
        const data = params.row.name;
        const product_name = data.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/product/${product_name}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: params => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];
  const row = [];
  coupons &&
    coupons.forEach(item => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + " %",
        sold: 10,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white flex flex-col min-h-[200px] max-h-[600px]">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} cursor-pointer !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white font-[500] cursor-pointer">
                Create Coupon Code
              </span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
            sx={{ flexGrow: 1 }}
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[2000] flex items-center justify-center">
              <div className="width-800px-40 w-[90%] h-[80vh] bg-white rounded-md shadow p-4">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-[30px] font-[Poppins] text-center font-[600]">
                  Create Coupon code
                </h5>
                {/* create coupon code */}
                <form onSubmit={handleSubmit} aria-required={true}>
                  <br />
                  <div>
                    <label className="pb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={e => setName(e.target.value)}
                      placeholder="Enter your Coupon code name..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Discount Percentage
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      name="value"
                      value={value}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={e => setValue(e.target.value)}
                      placeholder="Enter your coupon code value..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Min Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="minAmount"
                      required
                      value={minAmount}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={e => setMinAmount(e.target.value)}
                      placeholder="Enter coupon code min amount.."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Max Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="maxAmount"
                      value={maxAmount}
                      required
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={e => setMaxAmount(e.target.value)}
                      placeholder="Enter coupon code max amount.."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Selected Product</label>
                    <select
                      className="w-full mt-2 border border-gray-300 h-[35px] rounded-[5px]"
                      value={selectedProducts}
                      onChange={e => setSelectedProducts(e.target.value)}
                    >
                      <option value="Choose youe selected products">
                        Choose a selected product
                      </option>
                      {product &&
                        product.map((data, i) => (
                          <option value={data.name} key={i}>
                            {data.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <input
                    type="submit"
                    value="Create"
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer"
                  />
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AllCoupons;
