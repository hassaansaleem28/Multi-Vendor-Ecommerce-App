import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../UserComps/Loader";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineDelete, AiOutlineEye, AiOutlinePlus } from "react-icons/ai";
import { HiChevronDown } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import DataTable from "../ui/DataTable";
import TableAction from "../ui/TableAction";
import { backdrop, modal } from "../../lib/motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-ink-50/60 px-4 py-2.5 text-[15px] text-ink-900 placeholder:text-ink-400 transition-all duration-200 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10";
const labelClass = "mb-1.5 block text-[13px] font-semibold text-ink-700";

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
      const { status } = await axios.post(
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
    } catch (error) {
      toast.error(error?.reponse?.data?.message);
    }
  }

  const columns = [
    { field: "id", headerName: "Coupon Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Code", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Discount", minWidth: 100, flex: 0.6 },
    {
      field: "Preview",
      headerName: "",
      type: "number",
      sortable: false,
      minWidth: 80,
      flex: 0.5,
      renderCell: params => {
        const data = params.row.name;
        const product_name = data.replace(/\s+/g, "-");
        return (
          <TableAction
            icon={AiOutlineEye}
            to={`/product/${product_name}`}
            title="Preview"
            tone="brand"
          />
        );
      },
    },
    {
      field: "Delete",
      flex: 0.5,
      minWidth: 80,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: params => (
        <TableAction
          icon={AiOutlineDelete}
          onClick={() => handleDelete(params.id)}
          title="Delete coupon"
          tone="danger"
        />
      ),
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

  if (isLoading) return <Loader label="Loading coupons" />;

  return (
    <>
      <DataTable
        title="Coupon codes"
        subtitle={`${row.length} code${row.length === 1 ? "" : "s"} active`}
        rows={row}
        columns={columns}
        action={
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setOpen(true)}
            className="inline-flex h-[42px] cursor-pointer items-center gap-2 rounded-xl bg-brand-600 px-4 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-brand-700"
          >
            <AiOutlinePlus size={16} />
            Create coupon
          </motion.button>
        }
      />

      <AnimatePresence>
        {open && (
          <motion.div
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-ink-950/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              variants={modal}
              onClick={e => e.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-[480px] overflow-y-auto rounded-2xl bg-white shadow-panel"
            >
              <header className="sticky top-0 z-10 flex items-center justify-between border-b border-ink-100 bg-white px-6 py-5">
                <h3 className="font-display text-[18px] font-bold text-ink-900">
                  Create coupon code
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
                >
                  <RxCross1 size={16} />
                </button>
              </header>

              <form
                onSubmit={handleSubmit}
                aria-required={true}
                className="space-y-5 p-6"
              >
                <div>
                  <label className={labelClass}>
                    Code name <span className="text-danger-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={name}
                    className={inputClass}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. SUMMER20"
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Discount percentage{" "}
                    <span className="text-danger-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    name="value"
                    value={value ?? ""}
                    className={inputClass}
                    onChange={e => setValue(e.target.value)}
                    placeholder="20"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Min amount <span className="text-danger-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="minAmount"
                      required
                      value={minAmount}
                      className={inputClass}
                      onChange={e => setMinAmount(e.target.value)}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Max amount <span className="text-danger-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="maxAmount"
                      value={maxAmount}
                      required
                      className={inputClass}
                      onChange={e => setMaxAmount(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Applies to product</label>
                  <div className="relative">
                    <select
                      className={`${inputClass} cursor-pointer appearance-none pr-10`}
                      value={selectedProducts ?? ""}
                      onChange={e => setSelectedProducts(e.target.value)}
                    >
                      <option value="">Choose a product</option>
                      {product &&
                        product.map((data, i) => (
                          <option value={data.name} key={i}>
                            {data.name}
                          </option>
                        ))}
                    </select>
                    <HiChevronDown
                      size={18}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="mt-2 flex h-[48px] w-full cursor-pointer items-center justify-center rounded-xl bg-brand-600 font-semibold text-white shadow-card transition-colors duration-300 hover:bg-brand-700"
                >
                  Create coupon
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AllCoupons;
