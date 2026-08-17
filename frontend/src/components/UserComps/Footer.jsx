import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  footerSupportLinks,
  footercompanyLinks,
  footerProductLinks,
} from "../../static/data";
import Logo from "../ui/Logo";
import { staggerContainer, listItem, viewportAny } from "../../lib/motion";

const socials = [
  { Icon: AiFillFacebook, label: "Facebook" },
  { Icon: AiOutlineTwitter, label: "Twitter" },
  { Icon: AiFillInstagram, label: "Instagram" },
  { Icon: AiFillYoutube, label: "YouTube" },
];

function LinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="mb-4 font-display text-[15px] font-bold text-white">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link, i) => (
          <li key={i}>
            <Link
              to={link.link}
              className="text-[14px] text-white/50 transition-colors duration-200 hover:text-accent-400"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-ink-950 text-white">
      {/* ---- Newsletter ------------------------------------------- */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-float-slow absolute -left-20 top-0 h-[320px] w-[320px] rounded-full bg-brand-600/25 blur-[100px]" />
          <div
            className="animate-float-slow absolute -bottom-24 right-10 h-[280px] w-[280px] rounded-full bg-accent-500/15 blur-[100px]"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportAny}
          transition={{ duration: 0.55 }}
          className="relative z-10 mx-auto flex w-11/12 max-w-[1480px] flex-col items-start justify-between gap-8 py-14 lg:flex-row lg:items-center"
        >
          <div>
            <h2 className="max-w-md font-display text-[26px] font-bold leading-tight tracking-tight text-white lg:text-[32px]">
              Get news, events and{" "}
              <span className="bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
                exclusive offers
              </span>
            </h2>
            <p className="mt-2 text-[15px] text-white/50">
              One email a week. No spam, unsubscribe any time.
            </p>
          </div>

          <form
            onSubmit={e => e.preventDefault()}
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="h-[50px] flex-1 rounded-xl border border-white/15 bg-white/10 px-4 text-[15px] text-white backdrop-blur transition-all duration-300 placeholder:text-white/40 focus:border-accent-400 focus:bg-white/15 focus:ring-4 focus:ring-accent-400/15"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex h-[50px] cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-accent-400 px-7 font-semibold text-ink-900 shadow-card transition-colors duration-300 hover:bg-accent-300"
            >
              Subscribe
              <IoIosArrowForward className="transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* ---- Link columns ----------------------------------------- */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportAny}
        className="mx-auto grid w-11/12 max-w-[1480px] grid-cols-2 gap-10 py-16 lg:grid-cols-4"
      >
        <motion.div variants={listItem} className="col-span-2 lg:col-span-1">
          <Logo variant="light" />
          <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-white/50">
            The home and elements needed to create beautiful products — from
            hundreds of independent sellers.
          </p>

          <div className="mt-6 flex items-center gap-3">
            {socials.map(({ Icon, label }) => (
              <motion.a
                key={label}
                href="#"
                aria-label={label}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors duration-300 hover:border-accent-400/40 hover:bg-accent-400/15 hover:text-accent-400"
              >
                <Icon size={19} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div variants={listItem}>
          <LinkColumn title="Company" links={footerProductLinks} />
        </motion.div>
        <motion.div variants={listItem}>
          <LinkColumn title="Shop" links={footercompanyLinks} />
        </motion.div>
        <motion.div variants={listItem}>
          <LinkColumn title="Support" links={footerSupportLinks} />
        </motion.div>
      </motion.div>

      {/* ---- Legal bar -------------------------------------------- */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-11/12 max-w-[1480px] flex-col items-center justify-between gap-5 py-7 text-center sm:flex-row sm:text-left">
          <span className="text-[13px] text-white/40">
            &copy; {new Date().getFullYear()} ShopO. All rights reserved.
          </span>

          <div className="flex items-center gap-5 text-[13px] text-white/40">
            <a href="#" className="transition-colors hover:text-white/70">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-white/70">
              Privacy Policy
            </a>
          </div>

          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt="Accepted payment methods"
            loading="lazy"
            className="h-6 opacity-60 transition-opacity duration-300 hover:opacity-100"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
