import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { HiChevronDown } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { createEvent } from "../../redux-toolkit/actions/eventActions";
import { easeOutSoft } from "../../lib/motion";

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-ink-50/60 px-4 py-2.5 text-[15px] text-ink-900 placeholder:text-ink-400 transition-all duration-200 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10";
const labelClass = "mb-1.5 block text-[13px] font-semibold text-ink-700";

function CreateEvent() {
  const { seller } = useSelector(state => state.seller);
  const { success, error } = useSelector(state => state.events);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(
    function () {
      if (error) return toast.error(error);
      if (success) {
        toast.success("Event created successfully!");
        navigate("/dashboard-events");
        window.location.reload();
      }
    },
    [dispatch, error, success]
  );

  function handleStartDateChange(e) {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate
      .toISOString()
      .slice(0, 10);
  }

  function handleEndDateChange(e) {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  }

  const today = new Date().toISOString().slice(0, 10);
  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : today;

  function handleSubmit(e) {
    e.preventDefault();
    const newForm = new FormData();
    images.forEach(image => {
      newForm.append("images", image);
    });

    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    newForm.append("start_Date", startDate.toISOString());
    newForm.append("finish_Date", endDate.toISOString());

    dispatch(createEvent(newForm));
  }

  function handleAddImages(e) {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages(prevImages => [...prevImages, ...files]);
  }

  function removeImage(index) {
    setImages(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeOutSoft }}
      className="mx-auto w-full max-w-[720px] rounded-2xl border border-ink-100 bg-white p-6 shadow-card md:p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={labelClass}>
            Event name <span className="text-danger-500">*</span>
          </label>
          <input
            type="text"
            required
            name="name"
            value={name}
            className={inputClass}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Winter clearance — walnut collection"
          />
        </div>

        <div>
          <label className={labelClass}>
            Description <span className="text-danger-500">*</span>
          </label>
          <textarea
            rows="6"
            required
            name="description"
            value={description}
            className={`${inputClass} resize-none leading-relaxed`}
            onChange={e => setDescription(e.target.value)}
            placeholder="What's on offer and why shoppers shouldn't miss it…"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>
              Category <span className="text-danger-500">*</span>
            </label>
            <div className="relative">
              <select
                className={`${inputClass} cursor-pointer appearance-none pr-10`}
                value={category}
                required
                onChange={e => setCategory(e.target.value)}
              >
                <option value="">Choose a category</option>
                {categoriesData &&
                  categoriesData.map((data, i) => (
                    <option value={data.title} key={i}>
                      {data.title}
                    </option>
                  ))}
              </select>
              <HiChevronDown
                size={18}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Tags</label>
            <input
              type="text"
              name="tags"
              value={tags}
              required
              className={inputClass}
              onChange={e => setTags(e.target.value)}
              placeholder="sale, winter, furniture"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Original price</label>
            <input
              type="number"
              required
              name="originalPrice"
              min={0}
              value={originalPrice ?? ""}
              className={inputClass}
              onChange={e => setOriginalPrice(e.target.value)}
              placeholder="0"
            />
          </div>

          <div>
            <label className={labelClass}>
              Event price <span className="text-danger-500">*</span>
            </label>
            <input
              type="text"
              name="discountPrice"
              value={discountPrice ?? ""}
              className={inputClass}
              onChange={e => setDiscountPrice(e.target.value)}
              placeholder="0"
            />
          </div>

          <div>
            <label className={labelClass}>
              Stock <span className="text-danger-500">*</span>
            </label>
            <input
              type="number"
              required
              name="stock"
              min={0}
              value={stock ?? ""}
              className={inputClass}
              onChange={e => setStock(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>
              Start date <span className="text-danger-500">*</span>
            </label>
            <input
              type="date"
              id="start-date"
              name="startDate"
              required
              value={startDate ? startDate.toISOString().slice(0, 10) : ""}
              className={`${inputClass} cursor-pointer`}
              onChange={handleStartDateChange}
              min={today}
            />
          </div>

          <div>
            <label className={labelClass}>
              End date <span className="text-danger-500">*</span>
            </label>
            <input
              type="date"
              required
              id="end-date"
              name="endDate"
              value={endDate ? endDate.toISOString().slice(0, 10) : ""}
              className={`${inputClass} cursor-pointer`}
              onChange={handleEndDateChange}
              min={minEndDate}
            />
            <p className="mt-1.5 text-[12px] text-ink-400">
              Events must run for at least 3 days.
            </p>
          </div>
        </div>

        {/* ---- Images ------------------------------------------- */}
        <div>
          <label className={labelClass}>
            Event images <span className="text-danger-500">*</span>
          </label>

          <input
            type="file"
            name="file"
            required
            id="upload"
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleAddImages}
          />

          <div className="flex flex-wrap gap-3 rounded-xl border border-dashed border-ink-200 bg-ink-50/50 p-4">
            <motion.label
              htmlFor="upload"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="grid h-[110px] w-[110px] cursor-pointer place-items-center rounded-xl border-2 border-dashed border-ink-300 bg-white text-ink-400 transition-colors duration-200 hover:border-brand-400 hover:text-brand-600"
            >
              <div className="flex flex-col items-center gap-1.5">
                <AiOutlinePlusCircle size={26} />
                <span className="text-[11px] font-semibold">Add images</span>
              </div>
            </motion.label>

            <AnimatePresence>
              {images &&
                images.map((img, i) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.24, ease: easeOutSoft }}
                    className="group relative h-[110px] w-[110px] overflow-hidden rounded-xl border border-ink-200 bg-white"
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Event image ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      aria-label="Remove image"
                      className="absolute right-1.5 top-1.5 grid h-6 w-6 cursor-pointer place-items-center rounded-full bg-ink-950/60 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    >
                      <RxCross1 size={11} />
                    </button>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="flex h-[50px] w-full cursor-pointer items-center justify-center rounded-xl bg-brand-600 font-display text-[16px] font-bold text-white shadow-card transition-colors duration-300 hover:bg-brand-700"
        >
          Create event
        </motion.button>
      </form>
    </motion.div>
  );
}

export default CreateEvent;
