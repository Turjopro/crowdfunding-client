import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';

const ExploreCampaigns = () => {
  const axiosPublic = useAxiosPublic();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic.get('/campaigns')
      .then(res => {
        setCampaigns(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosPublic]);

  if (loading) return <p className="text-center py-20">Loading campaigns...</p>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">Explore Campaigns</h1>
      <p className="text-gray-500 mb-8">Discover active campaigns and support the causes you care about</p>

      {campaigns.length === 0 ? (
        <p className="text-center text-gray-400 py-10">No active campaigns available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {campaigns.map((c) => (
            <div key={c._id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
              <img
                src={c.campaign_image_url}
                alt={c.campaign_title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{c.campaign_title}</h3>
                <p className="text-sm text-gray-500 mb-1">By {c.creator_name}</p>
                <p className="text-sm text-gray-500 mb-2">
                  Deadline: {new Date(c.deadline).toLocaleDateString()}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${Math.min((c.raised_amount / c.funding_goal) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm mb-3">
                  <span className="font-semibold text-blue-600">{c.raised_amount}</span> raised of {c.funding_goal} credits
                </p>
                <Link
                  to={`/campaign/${c._id}`}
                  className="inline-block w-full text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreCampaigns;