import { motion } from "framer-motion";
import styles from "../../styles/styles";
import { staggerContainer, listItem, viewportOnce } from "../../lib/motion";

const sponsors = [
  {
    name: "Sony",
    src: "https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png",
    width: 120,
  },
  {
    name: "Dell",
    src: "https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png",
    width: 110,
  },
  {
    name: "LG",
    src: "https://images.squarespace-cdn.com/content/v1/502a8efb84ae42cbccf920c4/1585574686746-VCDIHSO21O76WR72WIAD/LG-Logo.png",
    width: 110,
  },
  {
    name: "Apple",
    src: "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.jpg",
    width: 95,
  },
  {
    name: "Microsoft",
    src: "https://static.vecteezy.com/system/resources/previews/014/018/578/non_2x/microsoft-logo-on-transparent-background-free-vector.jpg",
    width: 150,
  },
];

function Sponsors() {
  return (
    <section className={`${styles.section} mb-16 hidden sm:block`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-ink-100 bg-white px-8 py-10 shadow-card"
      >
        <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-400">
          Trusted by leading brands
        </p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8 lg:justify-between"
        >
          {sponsors.map(sponsor => (
            <motion.div
              key={sponsor.name}
              variants={listItem}
              whileHover={{ scale: 1.06, y: -3 }}
              transition={{ duration: 0.25 }}
              className="flex items-center"
            >
              <img
                src={sponsor.src}
                alt={sponsor.name}
                loading="lazy"
                style={{ width: sponsor.width }}
                className="object-contain opacity-55 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Sponsors;
