import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
  const [papers, setPapers] = useState([])

  // Fetch papers from backend
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/papers') // adjust if deployed
        setPapers(res.data)
      } catch (err) {
        console.error('Error fetching papers:', err)
      }
    }
    fetchPapers()
  }, [])

  const stats = [
    { number: `${papers.length}+`, label: 'Research Papers' },
    { number: '1,200+', label: 'Researchers' },
    { number: '85+', label: 'Universities' },
    { number: '120+', label: 'Research Fields' }
  ]

  const features = [
    {
      icon: 'fas fa-upload',
      title: 'Submit Research',
      description: 'Upload your research papers and manuscripts through our streamlined submission process.'
    },
    {
      icon: 'fas fa-search',
      title: 'Peer Review',
      description: 'Get valuable feedback from experts in your field through our blind peer review system.'
    },
    {
      icon: 'fas fa-book-open',
      title: 'Publish & Share',
      description: 'Publish your approved research and share it with the global academic community.'
    }
  ]

  const testimonials = [
    {
      name: 'Dr. Mahmud Hossain',
      position: 'Professor, HSTU',
      comment: 'The Research Portal has transformed how our students publish and collaborate. Excellent platform!'
    },
    {
      name: 'Fatema Tuj Johora',
      position: 'Research Student',
      comment: 'Thanks to this portal, I’ve shared my research and gained recognition in the academic community.'
    }
  ]

  const news = papers.slice(0, 2).map(paper => ({
    image: '/image/banner.jpg',
    category: 'Research',
    date: new Date(paper.submittedAt).toLocaleDateString(),
    title: paper.paperTitle,
    description: paper.abstract?.slice(0, 100) + '...',
    link: paper.cloudinaryUrl || '#'
  }))

  return (
    <div className="text-gray-800">
      {/* Hero */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Empowering Academic Excellence</h1>
          <p className="text-lg mb-8">
            A platform for students and researchers to share, publish, and explore groundbreaking research.
          </p>
          <Link
            to="/submit"
            className="bg-white text-blue-900 font-semibold py-3 px-6 rounded-full hover:bg-blue-100 transition"
          >
            Submit Your Paper
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <h3 className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                <div className="text-blue-600 text-4xl mb-4">
                  <i className={feature.icon}></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Papers */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-blue-800">
            Latest Submitted Papers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {news.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Paper →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-12">What People Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {testimonials.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <p className="text-gray-700 italic mb-4">“{item.comment}”</p>
                <h4 className="text-blue-700 font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
