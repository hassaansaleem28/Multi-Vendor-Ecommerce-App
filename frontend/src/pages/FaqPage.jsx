import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlinePlus } from "react-icons/hi";
import Header from "../components/Layouts/Header";
import styles from "../styles/styles";
import Footer from "../components/UserComps/Footer";
import PageHero from "../components/ui/PageHero";
import { easeOutSoft, viewportOnce } from "../lib/motion";

const faqs = [
  {
    id: 2,
    question: "What is your return policy?",
    answer:
      "If you're not satisfied with your purchase, we accept returns within 30 days of delivery. To initiate a return, please email us at support@myecommercestore.com with your order number and a brief explanation of why you're returning the item.",
  },
  {
    id: 3,
    question: "How do I track my order?",
    answer:
      "You can track your order by clicking the tracking link in your shipping confirmation email, or by logging into your account on our website and viewing the order details.",
  },
  {
    id: 4,
    question: "How do I contact customer support?",
    answer:
      "You can contact our customer support team by emailing us at support@myecommercestore.com, or by calling us at (555) 123-4567 between the hours of 9am and 5pm EST, Monday through Friday.",
  },
  {
    id: 5,
    question: "Can I change or cancel my order?",
    answer:
      "Unfortunately, once an order has been placed, we are not able to make changes or cancellations. If you no longer want the items you've ordered, you can return them for a refund within 30 days of delivery.",
  },
  {
    id: 6,
    question: "Do you offer international shipping?",
    answer: "Currently, we only offer shipping within the United States.",
  },
  {
    id: 7,
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, Mastercard and PayPal. We also support cash on delivery.",
  },
];

function FaqPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header activeHeading={5} />

      <PageHero
        eyebrow="Help centre"
        title="Frequently asked questions"
        subtitle="Answers to the things shoppers ask us most. Still stuck? Our support team is one email away."
        crumbs={[{ label: "Home", to: "/" }, { label: "FAQ" }]}
      />

      <main className="flex-1 py-12">
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}

function FAQ() {
  const [activeTab, setActiveTab] = useState(0);

  function toggleTab(tab) {
    if (activeTab === tab) setActiveTab(0);
    else setActiveTab(tab);
  }

  return (
    <div className={`${styles.section} max-w-[860px]`}>
      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = activeTab === faq.id;

          return (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.42, ease: easeOutSoft, delay: i * 0.05 }}
              className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                isOpen
                  ? "border-brand-200 shadow-card"
                  : "border-ink-100 hover:border-ink-200"
              }`}
            >
              <button
                onClick={() => toggleTab(faq.id)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span
                  className={`font-display text-[16px] font-semibold transition-colors duration-200 md:text-[17px] ${
                    isOpen ? "text-brand-700" : "text-ink-900"
                  }`}
                >
                  {faq.question}
                </span>

                <motion.span
                  animate={{ rotate: isOpen ? 135 : 0 }}
                  transition={{ duration: 0.3, ease: easeOutSoft }}
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                    isOpen
                      ? "bg-brand-600 text-white"
                      : "bg-ink-50 text-ink-500"
                  }`}
                >
                  <HiOutlinePlus size={17} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: easeOutSoft }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink-500">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* contact card */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.5, ease: easeOutSoft }}
        className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-ink-100 bg-gradient-to-br from-brand-50 to-white p-8 text-center"
      >
        <h3 className="font-display text-[19px] font-bold text-ink-900">
          Still have a question?
        </h3>
        <p className="max-w-md text-[14px] text-ink-500">
          Our support team replies within one business day.
        </p>
        <a
          href="mailto:support@myecommercestore.com"
          className="mt-2 inline-flex h-[46px] items-center rounded-xl bg-brand-600 px-6 font-semibold text-white shadow-card transition-all duration-300 hover:bg-brand-700 hover:shadow-card-hover active:scale-95"
        >
          Contact support
        </a>
      </motion.div>
    </div>
  );
}

export default FaqPage;
