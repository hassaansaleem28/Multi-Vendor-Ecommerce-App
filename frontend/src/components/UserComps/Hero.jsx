import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlineTruck, HiOutlineShieldCheck, HiOutlineRefresh } from "react-icons/hi";
import { easeOutSoft, staggerContainer, fadeUp } from "../../lib/motion";

const trust = [
  { icon: HiOutlineTruck, label: "Free shipping over $100" },
  { icon: HiOutlineShieldCheck, label: "Secure payments" },
  { icon: HiOutlineRefresh, label: "30-day returns" },
];

function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-ink-950">
      {/* ---- Background ------------------------------------------- */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: easeOutSoft }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
          }}
        />
        {/* readability wash — dark on the left, clear on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />

        {/* ambient colour blobs */}
        <div className="animate-float-slow pointer-events-none absolute -left-32 top-0 h-[460px] w-[460px] rounded-full bg-brand-600/25 blur-[130px]" />
        <div
          className="animate-float-slow pointer-events-none absolute -bottom-40 left-1/3 h-[380px] w-[380px] rounded-full bg-accent-500/15 blur-[130px]"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* ---- Content ---------------------------------------------- */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex min-h-[72vh] w-11/12 max-w-[1480px] flex-col justify-center py-20 lg:min-h-[82vh] lg:py-28"
      >
        {/* Split promo tag — solid amber label + translucent offer chip */}
        <motion.div variants={fadeUp} className="mb-7">
          <div className="inline-flex items-stretch overflow-hidden rounded-lg shadow-panel">
            <span className="flex items-center bg-accent-400 px-4 py-2.5 font-display text-[12px] font-extrabold uppercase tracking-[0.14em] text-ink-950">
              New season
            </span>

            <span className="flex items-center gap-2 border-y border-r border-white/15 bg-white/10 px-4 py-2.5 text-[13px] font-medium text-white/80 backdrop-blur-md">
              Up to
              <strong className="font-display text-[15px] font-extrabold text-accent-300">
                40% off
              </strong>
              sitewide
            </span>
          </div>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="max-w-2xl font-display text-[40px] font-extrabold leading-[1.06] tracking-tight text-white sm:text-[54px] lg:text-[64px]"
        >
          The best collection for{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-accent-300 via-accent-400 to-accent-500 bg-clip-text text-transparent">
              home decoration
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: easeOutSoft, delay: 0.7 }}
              style={{ transformOrigin: "left" }}
              className="absolute -bottom-1 left-0 h-[4px] w-full rounded-full bg-gradient-to-r from-accent-400 to-transparent"
            />
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/65 sm:text-[17px]"
        >
          Thousands of hand-picked pieces from independent sellers — furniture,
          lighting, textiles and more. Find something you love, delivered fast
          and backed by buyer protection.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/products"
              className="group inline-flex h-[54px] items-center gap-2 rounded-full bg-white px-8 font-display text-[16px] font-bold text-ink-900 shadow-panel transition-all duration-300 hover:bg-accent-400"
            >
              Shop now
              <IoIosArrowForward className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/best-selling"
              className="inline-flex h-[54px] items-center rounded-full border border-white/25 px-8 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/10"
            >
              Best sellers
            </Link>
          </motion.div>
        </motion.div>

        {/* trust row */}
        <motion.ul
          variants={fadeUp}
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-7"
        >
          {trust.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2.5 text-[13px] font-medium text-white/60"
            >
              <Icon size={20} className="text-accent-400" />
              {label}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#categories"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-label="Scroll to categories"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-1.5"
        >
          <span className="h-1.5 w-1 rounded-full bg-white/70" />
        </motion.span>
      </motion.a>
    </section>
  );
}

export default Hero;
