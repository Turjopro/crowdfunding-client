import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axiosSecure from '../../utils/axiosSecure';

const CreatorPaymentHistory = () => {
  const { user } = useAuth();
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/withdrawals/creator/${user.email}`)
        .then((res) => setWithdrawals(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const statusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-green-100 text-green-700',
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${colors[status] || 'bg-gray-100'}`}>
        {status}
      </span>
    );
  };

  if (loading) return <p className="text-center py-10">Loading payment history...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Payment History</h1>

      {withdrawals.length === 0 ? (
        <p className="text-gray-400">No withdrawal requests yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Credits</th>
                <th className="px-4 py-3">Amount ($)</th>
                <th className="px-4 py-3">Payment System</th>
                <th className="px-4 py-3">Account</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((w) => (
                <tr key={w._id} className="border-t">
                  <td className="px-4 py-3">{new Date(w.withdraw_date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{w.withdrawal_credit}</td>
                  <td className="px-4 py-3">${w.withdrawal_amount.toFixed(2)}</td>
                  <td className="px-4 py-3">{w.payment_system}</td>
                  <td className="px-4 py-3">{w.account_number}</td>
                  <td className="px-4 py-3">{statusBadge(w.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CreatorPaymentHistory;