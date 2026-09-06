import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const heroSlides = [
  {
    title: "Fund Ideas That Matter",
    subtitle: "Support creators and bring bold projects to life.",
    bg: "bg-gradient-to-r from-blue-600 to-indigo-700",
  },
  {
    title: "Turn Dreams Into Reality",
    subtitle: "Every contribution brings a campaign closer to its goal.",
    bg: "bg-gradient-to-r from-purple-600 to-pink-600",
  },
  {
    title: "Be Part of Something Bigger",
    subtitle: "Join thousands of supporters backing amazing causes.",
    bg: "bg-gradient-to-r from-emerald-600 to-teal-700",
  },
];

const dummyTopCampaigns = [
  {
    id: 1,
    title: "Solar Water Pump for Rural Village",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500",
    raised: 4200,
  },
  {
    id: 2,
    title: "Community Library Renovation",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=500",
    raised: 3800,
  },
  {
    id: 3,
    title: "Clean Water for Coastal Families",
    image: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=500",
    raised: 3500,
  },
  {
    id: 4,
    title: "Art Supplies for Underfunded Schools",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500",
    raised: 2900,
  },
  {
    id: 5,
    title: "Emergency Shelter for Flood Victims",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500",
    raised: 2600,
  },
  {
    id: 6,
    title: "Tech Lab for Girls in STEM",
    image: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=500",
    raised: 2300,
  },
];

const testimonials = [
  {
    name: "Ayesha Rahman",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "I raised enough funds for my community project within weeks. This platform made it so easy to connect with real supporters.",
  },
  {
    name: "Kamal Hossain",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "Supporting causes I care about has never been this simple. I love tracking my contributions and seeing real impact.",
  },
  {
    name: "Nusrat Jahan",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "The transparency of this platform gave me confidence to fund multiple campaigns. Highly recommend it to everyone.",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Create or Explore",
    desc: "Launch your own campaign or browse causes you care about.",
  },
  {
    step: "2",
    title: "Contribute Credits",
    desc: "Support campaigns by contributing credits toward their goal.",
  },
  {
    step: "3",
    title: "Track & Celebrate",
    desc: "Follow campaign progress and celebrate when goals are reached.",
  },
];

const categories = [
  { name: "Technology", icon: "💻" },
  { name: "Art & Design", icon: "🎨" },
  { name: "Community", icon: "🤝" },
  { name: "Health", icon: "🏥" },
  { name: "Education", icon: "📚" },
  { name: "Environment", icon: "🌱" },
];

const impactStats = [
  { label: "Campaigns Funded", value: "1,200+" },
  { label: "Active Supporters", value: "8,500+" },
  { label: "Credits Contributed", value: "2.4M+" },
  { label: "Success Rate", value: "87%" },
];

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3500 }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full"
      >
        {heroSlides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className={`${slide.bg} text-white flex flex-col justify-center items-center text-center h-[420px] px-4`}
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl max-w-xl">{slide.subtitle}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Top Funded Campaigns */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-2">
          Top Funded Campaigns
        </h2>
        <p className="text-gray-500 text-center mb-10">
          These campaigns have raised the most support from our community
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyTopCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">
                  {campaign.title}
                </h3>
                <p className="text-blue-600 font-bold">
                  {campaign.raised} credits raised
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Extra Section 1: How It Works */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Section 2: Explore by Category */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explore by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="flex flex-col items-center justify-center bg-white shadow rounded-lg py-6 hover:shadow-lg transition cursor-pointer"
            >
              <span className="text-3xl mb-2">{cat.icon}</span>
              <p className="font-medium text-sm text-center">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Extra Section 3: Platform Impact in Numbers */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Platform Impact in Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {impactStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-blue-400 mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            What Our Supporters Say
          </h2>

          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000 }}
            pagination={{ clickable: true }}
            loop={true}
          >
            {testimonials.map((t, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white rounded-lg shadow p-8 text-center mb-10">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                  />
                  <p className="text-gray-600 italic mb-4">"{t.quote}"</p>
                  <h4 className="font-semibold">{t.name}</h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default Home;