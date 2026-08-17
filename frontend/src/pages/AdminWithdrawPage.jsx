import AdminLayout from "../components/AdminComps/AdminLayout";
import AdminWithdrawRequest from "../components/AdminComps/AdminWithdrawRequest";

function AdminWithdrawPage() {
  return (
    <AdminLayout
      active={7}
      title="Withdraw requests"
      subtitle="Payout requests waiting on your approval."
    >
      <AdminWithdrawRequest />
    </AdminLayout>
  );
}

export default AdminWithdrawPage;
