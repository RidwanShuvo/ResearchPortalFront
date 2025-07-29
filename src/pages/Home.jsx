import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative text-center py-28 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="absolute inset-0 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
              <circle id="pattern-circle" cx="10" cy="10" r="2" fill="#3b82f6"></circle>
            </pattern>
            <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
          </svg>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-bold mb-6 text-blue-800">Welcome to the University Research Portal</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">Submit, review, and manage your research papers with ease. Join our community of academic excellence.</p>
          <div className="flex justify-center space-x-4">
            <Link to="/submit" className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 transition shadow-lg flex items-center">
              <i className="fas fa-paper-plane mr-2"></i> Submit Your Research
            </Link>
            <a href="#learn-more" className="bg-white text-blue-600 border border-blue-600 py-3 px-8 rounded-md hover:bg-blue-50 transition shadow-lg flex items-center">
              <i className="fas fa-info-circle mr-2"></i> Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="stats-item p-6">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">5,000+</h3>
              <p className="text-gray-600">Research Papers</p>
            </div>
            <div className="stats-item p-6">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">1,200+</h3>
              <p className="text-gray-600">Researchers</p>
            </div>
            <div className="stats-item p-6">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">85+</h3>
              <p className="text-gray-600">Universities</p>
            </div>
            <div className="stats-item p-6">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">120+</h3>
              <p className="text-gray-600">Research Fields</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="learn-more" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-blue-800">How Our Portal Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="feature-card bg-white p-8 rounded-lg shadow-md transition duration-300">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-upload text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Submit Research</h3>
              <p className="text-gray-600 text-center">Upload your research papers and manuscripts through our streamlined submission process.</p>
            </div>
            <div className="feature-card bg-white p-8 rounded-lg shadow-md transition duration-300">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-search text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Peer Review</h3>
              <p className="text-gray-600 text-center">Get valuable feedback from experts in your field through our blind peer review system.</p>
            </div>
            <div className="feature-card bg-white p-8 rounded-lg shadow-md transition duration-300">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-book-open text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Publish & Share</h3>
              <p className="text-gray-600 text-center">Publish your approved research and share it with the global academic community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-blue-800">News & Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="news-card rounded-lg overflow-hidden shadow-md">
              <div className="h-48 overflow-hidden">
                <img src="/image/banner.jpg" alt="Summer Symposium 2025" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">Conference</span>
                  <span className="text-gray-500 text-sm">July 18-19, 2025</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">IEEE CS BDC Summer Symposium 2025</h3>
                <p className="text-gray-600 mb-4">Join us for our flagship event featuring keynote speakers from leading research institutions around the world.</p>
                <a href="https://ss25.ieeecsbdc.org/" className="text-blue-600 hover:text-blue-800 font-medium">Learn more →</a>
              </div>
            </div>
            <div className="news-card rounded-lg overflow-hidden shadow-md">
              <div className="h-48 overflow-hidden">
                <img src="/image/ieeCompus.png" height="50%" width="50%" alt="Summer Symposium 2025" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">Conference</span>
                  <span className="text-gray-500 text-sm">October 17-18, 2025</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">IEEE 2nd INTERNATIONAL CONFERENCE ON COMPUTING, APPLICATIONS AND SYSTEMS (COMPAS 2025)</h3>
                <p className="text-gray-600 mb-4">Digital technologies for the future world emerging science and technology</p>
                <a href="https://www.compasconf.org/" className="text-blue-600 hover:text-blue-800 font-medium">Learn More →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-blue-800">What Researchers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="testimonial-card p-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold">Dr.Abdullah AL Mamun</h4>
                  <p className="text-sm text-gray-600">Professor of Physics</p>
                </div>
              </div>
              <p className="text-gray-600">"This research portal has revolutionized how I collaborate with peers across institutions. The submission process is seamless and the feedback system is invaluable."</p>
              <div className="mt-4 text-yellow-400">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
            <div className="testimonial-card p-8">
              <div className="flex items-center mb-4">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="font-bold">AS</span>
                </div>
                <div>
                  <h4 className="font-semibold">Dr.Mohammad Hossain</h4>
                  <p className="text-sm text-gray-600">Neuroscience Researcher</p>
                </div>
              </div>
              <p className="text-gray-600">"The visibility my research has gained through this portal is remarkable. I've connected with collaborators from around the world that I wouldn't have met otherwise."</p>
              <div className="mt-4 text-yellow-400">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
            </div>
            <div className="testimonial-card p-8">
              <div className="flex items-center mb-4">
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="font-bold">RK</span>
                </div>
                <div>
                  <h4 className="font-semibold">Dr.Asif Nazrul islam</h4>
                  <p className="text-sm text-gray-600">Environmental Scientist</p>
                </div>
              </div>
              <p className="text-gray-600">"The analytics provided on my published papers have helped me understand my research impact in ways I never could before. Highly recommended for all academics."</p>
              <div className="mt-4 text-yellow-400">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
