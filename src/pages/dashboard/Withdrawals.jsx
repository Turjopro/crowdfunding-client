import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axiosSecure from '../../utils/axiosSecure';

const Withdrawals = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    withdrawal_credit: '',
    payment_system: 'Bkash',
    account_number: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const fetchSummary = async () => {
    try {
      const res = await axiosSecure.get(`/withdrawals/summary/${user.email}`);
      setSummary(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchSummary();
  }, [user]);

  const withdrawAmountDollars = formData.withdrawal_credit
    ? (Number(formData.withdrawal_credit) / 20).toFixed(2)
    : '0.00';

  const canWithdraw = summary && summary.availableCredits >= 200;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setSubmitting(true);
    try {
      await axiosSecure.post('/withdrawals', {
        creator_email: user.email,
        creator_name: user.displayName,
        withdrawal_credit: Number(formData.withdrawal_credit),
        payment_system: formData.payment_system,
        account_number: formData.account_number,
      });
      setMessage('Withdrawal request submitted successfully!');
      setFormData({ withdrawal_credit: '', payment_system: 'Bkash', account_number: '' });
      fetchSummary();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Withdrawals</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-500">Available Credits</p>
          <p className="text-2xl font-bold text-blue-600">{summary?.availableCredits ?? 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-500">Available (USD)</p>
          <p className="text-2xl font-bold text-green-600">${summary?.availableDollars?.toFixed(2) ?? '0.00'}</p>
        </div>
      </div>

      {!canWithdraw && (
        <p className="text-sm text-amber-600 mb-4">
          You need at least 200 credits ($10) available to request a withdrawal.
        </p>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Credits To Withdraw</label>
          <input
            type="number"
            min="200"
            max={summary?.availableCredits ?? 0}
            value={formData.withdrawal_credit}
            onChange={(e) => setFormData({ ...formData, withdrawal_credit: e.target.value })}
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Withdraw Amount ($)</label>
          <input
            type="text"
            value={withdrawAmountDollars}
            disabled
            className="border px-3 py-2 rounded w-full bg-gray-100 text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Payment System</label>
          <select
            value={formData.payment_system}
            onChange={(e) => setFormData({ ...formData, payment_system: e.target.value })}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="Bkash">Bkash</option>
            <option value="Rocket">Rocket</option>
            <option value="Nagad">Nagad</option>
            <option value="Stripe">Stripe</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Account Number</label>
          <input
            type="text"
            value={formData.account_number}
            onChange={(e) => setFormData({ ...formData, account_number: e.target.value })}
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>

        {canWithdraw ? (
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Withdraw'}
          </button>
        ) : (
          <p className="text-center text-gray-400 font-medium py-2">Insufficient credit</p>
        )}

        {message && <p className="text-sm text-blue-700">{message}</p>}
      </form>
    </div>
  );
};

export default Withdrawals;