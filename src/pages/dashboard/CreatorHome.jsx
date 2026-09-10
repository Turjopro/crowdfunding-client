import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axiosSecure from '../../utils/axiosSecure';

const CreatorHome = () => {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [pendingContributions, setPendingContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [selectedContribution, setSelectedContribution] = useState(null);

  const fetchData = async () => {
    try {
      const [campaignsRes, contributionsRes] = await Promise.all([
        axiosSecure.get(`/campaigns/creator/${user.email}`),
        axiosSecure.get(`/contributions/creator/${user.email}`),
      ]);
      setCampaigns(campaignsRes.data);
      setPendingContributions(contributionsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchData();
  }, [user]);

  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(
    (c) => new Date(c.deadline) >= new Date()
  ).length;
  const totalRaised = campaigns.reduce((sum, c) => sum + (c.raised_amount || 0), 0);

  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      await axiosSecure.patch(`/contributions/approve/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    setActionLoading(id);
    try {
      await axiosSecure.patch(`/contributions/reject/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <p className="text-center py-10">Loading dashboard...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Creator Home</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-500">Total Campaigns</p>
          <p className="text-3xl font-bold text-blue-600">{totalCampaigns}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-500">Active Campaigns</p>
          <p className="text-3xl font-bold text-green-600">{activeCampaigns}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-500">Total Raised</p>
          <p className="text-3xl font-bold text-purple-600">{totalRaised} credits</p>
        </div>
      </div>

      {/* Contributions To Review */}
      <h2 className="text-xl font-semibold mb-4">Contributions To Review</h2>

      {pendingContributions.length === 0 ? (
        <p className="text-gray-400">No pending contributions right now.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3">Supporter</th>
                <th className="px-4 py-3">Campaign</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Details</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingContributions.map((c) => (
                <tr key={c._id} className="border-t">
                  <td className="px-4 py-3">{c.Supporter_name}</td>
                  <td className="px-4 py-3">{c.campaign_title}</td>
                  <td className="px-4 py-3 font-semibold">{c.Contribution_amount}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedContribution(c)}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleApprove(c._id)}
                      disabled={actionLoading === c._id}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(c._id)}
                      disabled={actionLoading === c._id}
                      className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      {selectedContribution && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-3">Contribution Details</h3>
            <p><span className="font-semibold">Supporter:</span> {selectedContribution.Supporter_name}</p>
            <p><span className="font-semibold">Email:</span> {selectedContribution.Supporter_email}</p>
            <p><span className="font-semibold">Campaign:</span> {selectedContribution.campaign_title}</p>
            <p><span className="font-semibold">Amount:</span> {selectedContribution.Contribution_amount} credits</p>
            <p><span className="font-semibold">Date:</span> {new Date(selectedContribution.current_date).toLocaleString()}</p>
            <button
              onClick={() => setSelectedContribution(null)}
              className="mt-4 w-full bg-gray-200 py-2 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorHome;