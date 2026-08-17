import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineSparkles, HiOutlineExclamation } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { easeOutSoft, staggerContainer, listItem } from "../../lib/motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EXAMPLES = [
  "Do you have any jeans in stock?",
  "What's the cheapest thing you sell?",
  "Show me something under $1500",
  "What are people buying most?",
];

/** One result, laid out as a compact row rather than a full product card. */
function ResultRow({ product }) {
  const outOfStock = product?.stock < 1;

  return (
    <motion.div variants={listItem}>
      <Link
        to={`/product/${product._id}`}
        className="group flex items-center gap-4 rounded-xl border border-ink-100 bg-white p-3 transition-all duration-300 hover:border-brand-200 hover:shadow-card"
      >
        <img
          src={product?.images?.[0]?.url}
          alt={product.name}
          loading="lazy"
          className="h-[62px] w-[62px] shrink-0 rounded-lg border border-ink-100 bg-ink-50 object-contain p-1"
        />

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-600">
            {product?.shop?.name}
          </p>
          <h4 className="mt-0.5 line-clamp-1 font-display text-[14px] font-semibold text-ink-900 transition-colors group-hover:text-brand-700">
            {product.name}
          </h4>
          <div className="mt-1 flex items-center gap-2">
            <span className="font-display text-[15px] font-bold text-ink-900">
              ${product.discountPrice}
            </span>
            <span
              className={`text-[12px] font-medium ${
                outOfStock ? "text-danger-600" : "text-success-600"
              }`}
            >
              {outOfStock ? "Out of stock" : `${product.stock} in stock`}
            </span>
          </div>
        </div>

        <IoIosArrowForward
          size={18}
          className="shrink-0 text-ink-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-600"
        />
      </Link>
    </motion.div>
  );
}

function AiSearch() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function ask(question) {
    const q = (question ?? query).trim();
    if (!q || loading) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/v2/ai/product-search`, {
        query: q,
      });
      setResult(data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Couldn't reach the assistant. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setQuery("");
    setResult(null);
    setError("");
  }

  // Citations like [1] tie the prose to the cards below; strip them from the
  // rendered text since the cards already carry the mapping visually.
  const answerText = result?.answer?.replace(/\s*\[\d{1,2}\]/g, "") || "";

  return (
    <section className="relative overflow-hidden bg-ink-950 py-14">
      {/* ambient colour */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow absolute -left-24 top-0 h-[340px] w-[340px] rounded-full bg-brand-600/25 blur-[110px]" />
        <div
          className="animate-float-slow absolute -bottom-28 right-0 h-[300px] w-[300px] rounded-full bg-accent-500/15 blur-[110px]"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className={`${styles.section} relative z-10`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.5, ease: easeOutSoft }}
          className="mx-auto max-w-[780px] text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/85 backdrop-blur-md">
            <HiOutlineSparkles size={15} className="text-accent-400" />
            AI assistant
          </span>

          <h2 className="mt-5 font-display text-[28px] font-extrabold tracking-tight text-white md:text-[36px]">
            Ask anything about our catalogue
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] text-white/60">
            Availability, prices, comparisons — ask in your own words and get a
            straight answer.
          </p>
        </motion.div>

        {/* ---- Ask box ------------------------------------------- */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.5, ease: easeOutSoft, delay: 0.1 }}
          onSubmit={e => {
            e.preventDefault();
            ask();
          }}
          className="mx-auto mt-9 max-w-[720px]"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <HiOutlineSparkles
                size={20}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type="text"
                value={query}
                maxLength={300}
                onChange={e => setQuery(e.target.value)}
                placeholder="e.g. is there a hoodie in stock under $1500?"
                aria-label="Ask about our products"
                className="h-[56px] w-full rounded-xl border border-white/15 bg-white/10 pl-12 pr-11 text-[15px] text-white backdrop-blur-md transition-all duration-300 placeholder:text-white/40 focus:border-accent-400 focus:bg-white/15 focus:ring-4 focus:ring-accent-400/15"
              />
              <AnimatePresence>
                {query && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    onClick={reset}
                    aria-label="Clear"
                    className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <RxCross1 size={13} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              type="submit"
              disabled={loading || !query.trim()}
              whileHover={loading ? undefined : { scale: 1.03 }}
              whileTap={loading ? undefined : { scale: 0.97 }}
              className="flex h-[56px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent-400 px-8 font-display text-[15px] font-bold text-ink-900 shadow-panel transition-colors duration-300 hover:bg-accent-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-900/25 border-t-ink-900" />
                  Thinking…
                </>
              ) : (
                "Ask"
              )}
            </motion.button>
          </div>

          {/* example chips */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {EXAMPLES.map(example => (
              <button
                key={example}
                type="button"
                disabled={loading}
                onClick={() => {
                  setQuery(example);
                  ask(example);
                }}
                className="rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[12px] text-white/60 transition-colors duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white disabled:opacity-40"
              >
                {example}
              </button>
            ))}
          </div>
        </motion.form>

        {/* ---- Result -------------------------------------------- */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mx-auto mt-7 flex max-w-[720px] items-start gap-3 rounded-2xl border border-danger-500/25 bg-danger-500/10 p-5 backdrop-blur-md"
            >
              <HiOutlineExclamation
                size={20}
                className="mt-0.5 shrink-0 text-danger-500"
              />
              <p className="text-[14px] leading-relaxed text-white/80">{error}</p>
            </motion.div>
          )}

          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: easeOutSoft }}
              className="mx-auto mt-7 max-w-[720px]"
            >
              {answerText && (
                <div className="rounded-2xl border border-white/12 bg-white/[0.07] p-6 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <HiOutlineSparkles size={16} className="text-accent-400" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">
                      Answer
                    </span>
                  </div>
                  <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-white/90">
                    {answerText}
                  </p>
                </div>
              )}

              {result.products?.length > 0 && (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="mt-4 space-y-2.5"
                >
                  {result.products.map((product, i) => (
                    <ResultRow key={product._id || i} product={product} />
                  ))}
                </motion.div>
              )}

              <p className="mt-4 text-center text-[12px] text-white/35">
                AI-generated — double-check price and stock on the product page.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default AiSearch;
