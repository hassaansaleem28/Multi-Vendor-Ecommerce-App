import { DataGrid } from "@mui/x-data-grid";
import { motion } from "framer-motion";
import { easeOutSoft } from "../../lib/motion";

/**
 * Every table in the app — user orders, seller dashboard, admin panels —
 * renders through here so they share one look: a soft card shell, an
 * optional header, and a DataGrid restyled to the app's palette.
 */

const dataGridSx = {
  border: "none",
  fontFamily: "Inter, system-ui, sans-serif",
  color: "#2a3a5c",

  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#f6f8fb",
    borderBottom: "1px solid #dde3ec",
  },
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "#f6f8fb",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
    fontWeight: 700,
    fontSize: "13px",
    letterSpacing: "0.02em",
    color: "#46567c",
    textTransform: "uppercase",
  },
  "& .MuiDataGrid-columnSeparator": { display: "none" },

  "& .MuiDataGrid-cell": {
    borderBottom: "1px solid #edf1f6",
    fontSize: "14px",
    outline: "none !important",
  },
  "& .MuiDataGrid-row": {
    transition: "background-color .18s ease",
  },
  "& .MuiDataGrid-row:hover": {
    backgroundColor: "#f6f8fb",
  },

  "& .MuiDataGrid-footerContainer": {
    borderTop: "1px solid #dde3ec",
    backgroundColor: "#f6f8fb",
  },
  "& .MuiTablePagination-root": {
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "13px",
    color: "#46567c",
  },

  "& .MuiDataGrid-overlay": {
    fontFamily: "Inter, system-ui, sans-serif",
    color: "#94a1bc",
    fontSize: "14px",
  },

  "& .MuiButton-root": {
    color: "#4f46e5",
    minWidth: "auto",
  },

  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
    background: "#bfc8da",
    borderRadius: "999px",
  },
};

function DataTable({
  title,
  subtitle,
  action,
  rows = [],
  columns = [],
  pageSize = 10,
  height = 560,
  className = "",
  ...gridProps
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeOutSoft }}
      className={`overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card ${className}`}
    >
      {(title || action) && (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 px-6 py-5">
          <div>
            {title && (
              <h2 className="font-display text-[18px] font-bold text-ink-900">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-0.5 text-[13px] text-ink-500">{subtitle}</p>
            )}
          </div>
          {action}
        </header>
      )}

      <div style={{ height, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[pageSize]}
          initialState={{
            pagination: { paginationModel: { pageSize, page: 0 } },
          }}
          disableRowSelectionOnClick
          sx={dataGridSx}
          {...gridProps}
        />
      </div>
    </motion.section>
  );
}

export default DataTable;
