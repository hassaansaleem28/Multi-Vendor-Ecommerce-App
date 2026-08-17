/**
 * Shared class strings. Every key that existed before is still here with the
 * same name, so any component importing them keeps working — only the visual
 * language changed (navy/indigo/amber palette, Plus Jakarta Sans headings).
 */
const styles = {
  // ---- layout ----------------------------------------------------------
  custom_container: "w-11/12 hidden sm-black",
  section: "w-11/12 mx-auto max-w-[1480px]",

  // ---- typography ------------------------------------------------------
  heading:
    "text-[26px] md:text-[30px] text-center md:text-start font-display font-bold tracking-tight text-ink-900 pb-5",
  productTitle: "text-[22px] font-display font-bold text-ink-900 leading-snug",
  productDiscountPrice: "font-display font-bold text-[20px] text-ink-900",
  price: "font-medium text-[15px] text-ink-400 pl-2 line-through",
  shop_name:
    "pt-3 text-[13px] font-semibold uppercase tracking-wide text-brand-600 pb-2 hover:text-brand-700 transition-colors",

  // ---- controls --------------------------------------------------------
  active_indicator: "absolute bottom-[-27%] left-0 h-[3px] w-full bg-accent-400",
  button:
    "w-[170px] bg-ink-900 hover:bg-ink-800 h-[50px] my-3 flex items-center justify-center cursor-pointer rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 active:scale-[0.98]",
  cart_button:
    "px-5 h-[40px] rounded-full bg-brand-600 hover:bg-brand-700 flex justify-center items-center cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-300 active:scale-95",
  cart_button_text: "text-white text-[15px] font-semibold",
  input:
    "w-full border border-ink-200 bg-white px-3 py-2 rounded-lg text-ink-800 placeholder:text-ink-400 transition-all duration-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15",
  activeStatus:
    "w-[10px] h-[10px] rounded-full absolute top-0 right-1 bg-success-500 ring-2 ring-white",
  normalFlex: "flex items-center",

  // ---- new primitives (opt-in, nothing depends on them yet) ------------
  card: "bg-white rounded-2xl border border-ink-100 shadow-card transition-all duration-300",
  cardHover: "hover:shadow-card-hover hover:-translate-y-1",
  label: "block text-sm font-medium text-ink-700 mb-1.5",
  pill: "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
  primaryBtn:
    "inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white shadow-card transition-all duration-300 hover:bg-brand-700 hover:shadow-card-hover active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed",
  ghostBtn:
    "inline-flex items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white px-5 py-2.5 font-semibold text-ink-700 transition-all duration-300 hover:border-ink-300 hover:bg-ink-50 active:scale-[0.98]",
  sectionTitle:
    "font-display text-[24px] md:text-[30px] font-bold tracking-tight text-ink-900",
  sectionSub: "text-ink-500 text-[15px] mt-1",
};

export default styles;
