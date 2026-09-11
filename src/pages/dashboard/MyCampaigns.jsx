import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axiosSecure from '../../utils/axiosSecure';

const MyCampaigns = () => {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [editForm, setEditForm] = useState({ campaign_title: '', campaign_story: '', reward_info: '' });
  const [saving, setSaving] = useState(false);

  const fetchCampaigns = async () => {
    try {
      const res = await axiosSecure.get(`/campaigns/creator/${user.email}`);
      setCampaigns(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchCampaigns();
  }, [user]);

  const openEdit = (campaign) => {
    setEditingCampaign(campaign);
    setEditForm({
      campaign_title: campaign.campaign_title,
      campaign_story: campaign.campaign_story,
      reward_info: campaign.reward_info,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axiosSecure.patch(`/campaigns/${editingCampaign._id}`, editForm);
      setEditingCampaign(null);
      fetchCampaigns();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this campaign? Approved supporters will be refunded.')) {
      return;
    }
    try {
      await axiosSecure.delete(`/campaigns/${id}`);
      fetchCampaigns();
    } catch (err) {
      console.error(err);
    }
  };

  const statusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${colors[status] || 'bg-gray-100'}`}>
        {status}
      </span>
    );
  };

  if (loading) return <p className="text-center py-10">Loading your campaigns...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Campaigns</h1>

      {campaigns.length === 0 ? (
        <p className="text-gray-400">You haven't created any campaigns yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Deadline</th>
                <th className="px-4 py-3">Raised / Goal</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c._id} className="border-t">
                  <td className="px-4 py-3">{c.campaign_title}</td>
                  <td className="px-4 py-3">{new Date(c.deadline).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{c.raised_amount} / {c.funding_goal}</td>
                  <td className="px-4 py-3">{statusBadge(c.status)}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => openEdit(c)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editingCampaign && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-lg font-bold mb-4">Update Campaign</h3>
            <form onSubmit={handleUpdate} className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={editForm.campaign_title}
                  onChange={(e) => setEditForm({ ...editForm, campaign_title: e.target.value })}
                  className="border px-3 py-2 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Story</label>
                <textarea
                  value={editForm.campaign_story}
                  onChange={(e) => setEditForm({ ...editForm, campaign_story: e.target.value })}
                  rows={4}
                  className="border px-3 py-2 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Reward Info</label>
                <input
                  type="text"
                  value={editForm.reward_info}
                  onChange={(e) => setEditForm({ ...editForm, reward_info: e.target.value })}
                  className="border px-3 py-2 rounded w-full"
                  required
                />
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingCampaign(null)}
                  className="flex-1 bg-gray-200 py-2 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCampaigns;