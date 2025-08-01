import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Research Portal</h3>
            <p className="text-blue-100 mb-4">
              Advancing knowledge through collaborative research and academic excellence.
            </p>
            <div className="flex space-x-4">
              <a href="https://x.com/" className="text-white hover:text-blue-200 transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.linkedin.com/" className="text-white hover:text-blue-200 transition">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://www.facebook.com/" className="text-white hover:text-blue-200 transition">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com/accounts/login/?hl=en" className="text-white hover:text-blue-200 transition">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-100 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-100 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/submit" className="text-blue-100 hover:text-white transition">
                  Submit Research
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/guidelines" className="text-blue-100 hover:text-white transition">
                  Guidelines
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-blue-100 hover:text-white transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-blue-100 hover:text-white transition">
                  Research Tools
                </Link>
              </li>
              <li>
                <Link to="/ethics" className="text-blue-100 hover:text-white transition">
                  Publication Ethics
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-2"></i>
                <span className="text-blue-100">
                  Kazi Nazrul Islam Bhaban (2nd Floor)<br />
                  Hajee Mohammad Danesh Science and Technology University (HSTU)<br />
                  Dinajpur Sadar, Dinajpur-5200.
                </span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2"></i>
                <a 
                  href="mailto:ridwanshuvo38@gmail.com" 
                  title="Send Email" 
                  aria-label="Send Email" 
                  className="text-blue-100 hover:text-white transition"
                >
                  ridwanshuvo38@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone mr-2"></i>
                <span className="text-blue-100">01894154618</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-500 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; HSTU Research Portal.</p>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <Link to="/privacy" className="text-blue-200 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-blue-200 hover:text-white transition">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-200 hover:text-white transition">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 