import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import axiosSecure from '../utils/axiosSecure'; // তোমার existing axiosSecure ইনস্ট্যান্স
import { AuthContext } from '../contexts/AuthProvider'; // path তোমার প্রজেক্ট অনুযায়ী ঠিক করো

const CampaignDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext); // logged-in supporter এর info

  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axiosPublic.get(`/campaigns/${id}`).then((res) => setCampaign(res.data));
  }, [axiosPublic, id]);

  const handleContribute = async (e) => {
    e.preventDefault();
    setMessage('');

    if (Number(amount) < campaign.minimum_Contribution) {
      setMessage(`Minimum contribution is ${campaign.minimum_Contribution} credits.`);
      return;
    }

    setSubmitting(true);
    try {
      await axiosSecure.post('/contributions', {
        campaign_id: campaign._id,
        campaign_title: campaign.campaign_title,
        Contribution_amount: Number(amount),
        Supporter_email: user.email,
        Supporter_name: user.displayName,
        creator_email: campaign.creator_email,
        creator_name: campaign.creator_name,
      });
      setMessage('Contribution submitted successfully! Waiting for creator approval.');
      setAmount('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!campaign) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <img
        src={campaign.campaign_image_url}
        alt={campaign.campaign_title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h1 className="text-3xl font-bold mt-4">{campaign.campaign_title}</h1>
      <p className="text-gray-600 mt-1">By {campaign.creator_name} • {campaign.category}</p>

      <p className="mt-4 text-gray-700">{campaign.campaign_story}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-sm">
        <div>
          <p className="text-gray-500">Goal</p>
          <p className="font-semibold">{campaign.funding_goal} credits</p>
        </div>
        <div>
          <p className="text-gray-500">Raised</p>
          <p className="font-semibold text-blue-600">{campaign.raised_amount} credits</p>
        </div>
        <div>
          <p className="text-gray-500">Min. Contribution</p>
          <p className="font-semibold">{campaign.minimum_Contribution} credits</p>
        </div>
        <div>
          <p className="text-gray-500">Deadline</p>
          <p className="font-semibold">{new Date(campaign.deadline).toLocaleDateString()}</p>
        </div>
      </div>

      <p className="mt-4 italic text-gray-600">🎁 Reward: {campaign.reward_info}</p>

      <form onSubmit={handleContribute} className="mt-8 border-t pt-6 flex flex-col sm:flex-row gap-3">
        <input
          type="number"
          min={campaign.minimum_Contribution}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={`Min ${campaign.minimum_Contribution} credits`}
          className="border px-3 py-2 rounded flex-1"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Contribute'}
        </button>
      </form>

      {message && <p className="mt-3 text-sm text-blue-700">{message}</p>}
    </div>
  );
};

export default CampaignDetails;