import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axiosSecure from '../../utils/axiosSecure';

const categories = ['Technology', 'Art', 'Community', 'Health', 'Education', 'Environment'];

const AddCampaign = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    campaign_title: '',
    campaign_story: '',
    category: categories[0],
    funding_goal: '',
    minimum_Contribution: '',
    deadline: '',
    reward_info: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const uploadImage = async () => {
    const imgbbAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;
    const data = new FormData();
    data.append('image', imageFile);

    const res = await fetch(imgbbAPI, { method: 'POST', body: data });
    const result = await res.json();
    return result.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!imageFile) {
      setMessage('Please select a campaign image.');
      return;
    }

    setSubmitting(true);
    try {
      const imageUrl = await uploadImage();

      await axiosSecure.post('/campaigns', {
        ...formData,
        funding_goal: Number(formData.funding_goal),
        minimum_Contribution: Number(formData.minimum_Contribution),
        campaign_image_url: imageUrl,
        creator_email: user.email,
        creator_name: user.displayName,
      });

      setMessage('Campaign submitted successfully! Waiting for admin approval.');
      setFormData({
        campaign_title: '',
        campaign_story: '',
        category: categories[0],
        funding_goal: '',
        minimum_Contribution: '',
        deadline: '',
        reward_info: '',
      });
      setImageFile(null);
      e.target.reset();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Add New Campaign</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Campaign Title</label>
          <input
            type="text"
            name="campaign_title"
            value={formData.campaign_title}
            onChange={handleChange}
            placeholder="Help us build a solar-powered water pump"
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Campaign Story</label>
          <textarea
            name="campaign_story"
            value={formData.campaign_story}
            onChange={handleChange}
            rows={4}
            placeholder="Describe your campaign in detail..."
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Funding Goal (credits)</label>
            <input
              type="number"
              name="funding_goal"
              value={formData.funding_goal}
              onChange={handleChange}
              min="1"
              className="border px-3 py-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Minimum Contribution</label>
            <input
              type="number"
              name="minimum_Contribution"
              value={formData.minimum_Contribution}
              onChange={handleChange}
              min="1"
              className="border px-3 py-2 rounded w-full"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Reward Info</label>
          <input
            type="text"
            name="reward_info"
            value={formData.reward_info}
            onChange={handleChange}
            placeholder="What supporters receive for contributing"
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Campaign Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Add Campaign'}
        </button>

        {message && <p className="text-sm text-blue-700">{message}</p>}
      </form>
    </div>
  );
};

export default AddCampaign;