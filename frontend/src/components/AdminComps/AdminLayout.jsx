import { motion } from "framer-motion";
import AdminHeader from "../Layouts/AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { easeOutSoft } from "../../lib/motion";

/** Shell shared by every admin route. */
function AdminLayout({ active, title, subtitle, action, children, wide }) {
  return (
    <div className="min-h-screen bg-ink-50">
      <AdminHeader />

      <div className="flex w-full items-start">
        <aside className="w-[80px] shrink-0 width-at-800px">
          <AdminSidebar activeHeading={active} />
        </aside>

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className={wide ? "w-full" : "mx-auto w-full max-w-[1200px]"}>
            {(title || action) && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: easeOutSoft }}
                className="mb-7 flex flex-wrap items-end justify-between gap-4"
              >
                <div>
                  {title && (
                    <h1 className="font-display text-[26px] font-bold tracking-tight text-ink-900">
                      {title}
                    </h1>
                  )}
                  {subtitle && (
                    <p className="mt-1 text-[14px] text-ink-500">{subtitle}</p>
                  )}
                </div>
                {action}
              </motion.div>
            )}

            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
