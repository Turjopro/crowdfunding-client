import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axiosSecure from '../../utils/axiosSecure';

const SupporterPaymentHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/payments/${user.email}`)
        .then((res) => setPayments(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (loading) return <p className="text-center py-10">Loading payment history...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Payment History</h1>

      {payments.length === 0 ? (
        <p className="text-gray-400">No credit purchases yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Credits</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="px-4 py-3">{new Date(p.paymentDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3 font-semibold">{p.credits}</td>
                  <td className="px-4 py-3">${p.price}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{p.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SupporterPaymentHistory;