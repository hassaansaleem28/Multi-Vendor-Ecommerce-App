import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineSparkles, HiOutlineExclamation } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineSend } from "react-icons/ai";
import { easeOutSoft } from "../../lib/motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EXAMPLES = [
  "Any jeans in stock?",
  "What's your cheapest item?",
  "Something under $1500",
  "What sells best?",
];

/** Routes where a shopping assistant would be noise, not help. */
const HIDDEN_PREFIXES = [
  "/dashboard",
  "/admin",
  "/shop/",
  "/shop-create",
  "/shop-login",
  "/login",
  "/sign-up",
  "/inbox",
  "/payment",
  "/order/success",
  "/activation",
];

/**
 * Tidy up an answer for display.
 *
 * The system prompt asks for plain prose, but open models leak markdown and
 * citation artefacts often enough that the UI shouldn't depend on it
 * behaving. Strips citations, renders `**bold**`, and drops the stray
 * literal "(ref)" the model sometimes writes instead of a number.
 */
function renderAnswer(text = "") {
  const cleaned = text
    .replace(/\s*\[\d{1,2}\]/g, "")
    .replace(/\s*[[(]\s*ref\s*[\])]/gi, "")
    .replace(/[ \t]{2,}/g, " ")
    .trim();

  return cleaned
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i} className="font-semibold text-ink-900">
          {part.slice(2, -2)}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
}

/** Compact product row shown beneath an answer. */
function ResultRow({ product, onNavigate }) {
  const outOfStock = product?.stock < 1;

  return (
    <Link
      to={`/product/${product._id}`}
      onClick={onNavigate}
      className="group flex items-center gap-3 rounded-xl border border-ink-100 bg-white p-2.5 transition-all duration-300 hover:border-brand-200 hover:shadow-card"
    >
      <img
        src={product?.images?.[0]?.url}
        alt={product.name}
        loading="lazy"
        className="h-[46px] w-[46px] shrink-0 rounded-lg border border-ink-100 bg-ink-50 object-contain p-1"
      />
      <div className="min-w-0 flex-1">
        <h4 className="line-clamp-1 font-display text-[13px] font-semibold text-ink-900 transition-colors group-hover:text-brand-700">
          {product.name}
        </h4>
        <div className="mt-0.5 flex items-center gap-2">
          <span className="font-display text-[13px] font-bold text-ink-900">
            ${product.discountPrice}
          </span>
          <span
            className={`text-[11px] font-medium ${
              outOfStock ? "text-danger-600" : "text-success-600"
            }`}
          >
            {outOfStock ? "Out of stock" : `${product.stock} left`}
          </span>
        </div>
      </div>
      <IoIosArrowForward
        size={15}
        className="shrink-0 text-ink-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-brand-600"
      />
    </Link>
  );
}

function AiAssistant() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [turns, setTurns] = useState([]); // {role, content, products?, error?}
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const hidden = HIDDEN_PREFIXES.some(prefix => pathname.startsWith(prefix));

  // Keep the newest turn in view.
  useEffect(
    function () {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    },
    [turns, loading]
  );

  // Escape closes; focus the input when it opens.
  useEffect(
    function () {
      if (!open) return;
      function onKey(e) {
        if (e.key === "Escape") setOpen(false);
      }
      window.addEventListener("keydown", onKey);
      const t = setTimeout(() => inputRef.current?.focus(), 250);
      return () => {
        window.removeEventListener("keydown", onKey);
        clearTimeout(t);
      };
    },
    [open]
  );

  async function ask(question) {
    const q = (question ?? query).trim();
    if (!q || loading) return;

    // Prior turns give follow-ups ("how much is it?") something to resolve
    // against. Only the text is sent — product data comes fresh each time.
    const history = turns
      .filter(t => !t.error)
      .slice(-4)
      .map(t => ({ role: t.role, content: t.content }));

    setTurns(prev => [...prev, { role: "user", content: q }]);
    setQuery("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/v2/ai/product-search`,
        { query: q, history }
      );
      setTurns(prev => [
        ...prev,
        {
          role: "assistant",
          content: data.answer || "",
          products: data.products || [],
        },
      ]);
    } catch (err) {
      setTurns(prev => [
        ...prev,
        {
          role: "assistant",
          error: true,
          content:
            err?.response?.data?.message ||
            "Couldn't reach the assistant — check that the server is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (hidden) return null;

  return (
    <>
      {/* ---- Launcher ------------------------------------------- */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
            onClick={() => setOpen(true)}
            aria-label="Open shopping assistant"
            className="group fixed bottom-6 right-6 z-40 flex h-[58px] cursor-pointer items-center gap-2.5 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 pl-4 pr-5 shadow-panel ring-1 ring-white/10"
          >
            {/* soft pulse to draw the eye without shouting */}
            <span className="pointer-events-none absolute inset-0 rounded-full">
              <motion.span
                animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-brand-500"
              />
            </span>

            <HiOutlineSparkles
              size={22}
              className="relative z-10 shrink-0 text-accent-300"
            />
            <span className="relative z-10 hidden font-display text-[14px] font-bold text-white sm:block">
              Ask AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ---- Panel ---------------------------------------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: easeOutSoft }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-0 right-0 z-40 flex h-[100dvh] w-full flex-col overflow-hidden bg-white shadow-panel sm:bottom-6 sm:right-6 sm:h-[min(640px,calc(100dvh-3rem))] sm:w-[400px] sm:rounded-2xl sm:ring-1 sm:ring-ink-900/5"
          >
            {/* header */}
            <header className="relative shrink-0 overflow-hidden bg-ink-950 px-5 py-4">
              <div className="pointer-events-none absolute inset-0">
                <div className="animate-float-slow absolute -left-10 -top-14 h-[180px] w-[180px] rounded-full bg-brand-600/30 blur-[60px]" />
                <div
                  className="animate-float-slow absolute -bottom-16 right-0 h-[160px] w-[160px] rounded-full bg-accent-500/20 blur-[60px]"
                  style={{ animationDelay: "2s" }}
                />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 backdrop-blur">
                    <HiOutlineSparkles size={18} className="text-accent-400" />
                  </span>
                  <div>
                    <h2 className="font-display text-[15px] font-bold text-white">
                      Shopping assistant
                    </h2>
                    <p className="text-[11px] text-white/50">
                      Ask about any product
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {turns.length > 0 && (
                    <button
                      onClick={() => setTurns([])}
                      className="rounded-lg px-2.5 py-1 text-[12px] font-medium text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close assistant"
                    className="grid h-8 w-8 cursor-pointer place-items-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <RxCross1 size={15} />
                  </button>
                </div>
              </div>
            </header>

            {/* conversation */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto bg-ink-50 px-4 py-5"
            >
              {turns.length === 0 && (
                <div className="pt-4 text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-card">
                    <HiOutlineSparkles size={26} className="text-brand-600" />
                  </div>
                  <h3 className="mt-4 font-display text-[16px] font-bold text-ink-900">
                    What are you looking for?
                  </h3>
                  <p className="mx-auto mt-1.5 max-w-[260px] text-[13px] leading-relaxed text-ink-500">
                    Ask about availability, prices or what we have in a
                    category.
                  </p>

                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {EXAMPLES.map(example => (
                      <button
                        key={example}
                        onClick={() => ask(example)}
                        className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-[12px] font-medium text-ink-600 transition-all duration-200 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {turns.map((turn, i) =>
                turn.role === "user" ? (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end"
                  >
                    <p className="max-w-[85%] rounded-2xl rounded-br-md bg-brand-600 px-4 py-2.5 text-[14px] leading-relaxed text-white">
                      {turn.content}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2.5"
                  >
                    <div
                      className={`max-w-[90%] rounded-2xl rounded-bl-md px-4 py-2.5 text-[14px] leading-relaxed ${
                        turn.error
                          ? "border border-danger-200 bg-danger-50 text-danger-700"
                          : "border border-ink-100 bg-white text-ink-800"
                      }`}
                    >
                      {turn.error && (
                        <HiOutlineExclamation
                          size={16}
                          className="mb-1 inline-block text-danger-500"
                        />
                      )}
                      <span className="whitespace-pre-line">
                        {turn.error ? turn.content : renderAnswer(turn.content)}
                      </span>
                    </div>

                    {turn.products?.length > 0 && (
                      <div className="space-y-2">
                        {turn.products.map((product, k) => (
                          <ResultRow
                            key={product._id || k}
                            product={product}
                            onNavigate={() => setOpen(false)}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                )
              )}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md border border-ink-100 bg-white px-4 py-3"
                >
                  {[0, 1, 2].map(i => (
                    <motion.span
                      key={i}
                      animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                      transition={{
                        duration: 1.1,
                        repeat: Infinity,
                        delay: i * 0.16,
                        ease: "easeInOut",
                      }}
                      className="h-1.5 w-1.5 rounded-full bg-brand-500"
                    />
                  ))}
                </motion.div>
              )}
            </div>

            {/* composer */}
            <form
              onSubmit={e => {
                e.preventDefault();
                ask();
              }}
              className="shrink-0 border-t border-ink-100 bg-white px-4 py-3"
            >
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  maxLength={300}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Ask about a product…"
                  aria-label="Ask about a product"
                  className="h-[46px] w-full rounded-full border border-ink-200 bg-ink-50 pl-4 pr-12 text-[14px] text-ink-900 transition-all duration-200 placeholder:text-ink-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                />
                <motion.button
                  type="submit"
                  disabled={loading || !query.trim()}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Send"
                  className="absolute right-1.5 top-1/2 grid h-9 w-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-brand-600 text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <AiOutlineSend size={16} />
                </motion.button>
              </div>
              <p className="mt-2 text-center text-[11px] text-ink-400">
                AI-generated — confirm price and stock on the product page.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AiAssistant;
