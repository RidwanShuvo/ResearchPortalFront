import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
    privacyPolicy: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
        privacyPolicy: false
      })

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000)
    }, 2000)
  }

  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Visit Us',
      content: 'Kazi Nazrul Islam Bhaban (2nd Floor)<br/>Hajee Mohammad Danesh Science and Technology University (HSTU)<br/>Dinajpur Sadar, Dinajpur-5200.'
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email Us',
      content: 'General Inquiries:<br/><a href="mailto:ridwanshuvo38@gmail.com" class="text-blue-600 hover:underline">ridwanshuvo38@gmail.com</a><br/>Support:<br/><a href="mailto:alhasnain2093@gmail.com" class="text-blue-600 hover:underline">alhasnain2093@gmail.com</a>'
    },
    {
      icon: 'fas fa-phone',
      title: 'Call Us',
      content: 'Main Office:<br/>01787092968<br/>Technical Support:<br/>01894154618'
    }
  ]

  const faqs = [
    {
      question: "What is the best way to contact for urgent inquiries?",
      answer: "For urgent inquiries, we recommend calling our main office at 01787092968 during business hours. For technical emergencies related to the submission system, please email support@researchportal.edu with 'URGENT' in the subject line."
    },
    {
      question: "How long does it typically take to receive a response?",
      answer: "We strive to respond to all inquiries within 1-2 business days. For complex issues or during peak submission periods, response times may be slightly longer. Rest assured that all messages are important to us and will be addressed as soon as possible."
    },
    {
      question: "Can I schedule an appointment to discuss my research?",
      answer: "Yes, we offer consultations for researchers who would like to discuss their work before submission. Please email editorial@researchportal.edu with a brief description of your research and preferred meeting times. Virtual meetings are available for those unable to visit our office in person."
    },
    {
      question: "How can I provide feedback about the Research Portal?",
      answer: "We value your feedback! You can share your thoughts and suggestions by filling out the contact form on this page or by emailing feedback@researchportal.edu. Your input helps us improve our services and better meet the needs of the research community."
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="absolute inset-0 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
              <circle id="pattern-circle" cx="10" cy="10" r="2" fill="#3b82f6"></circle>
            </pattern>
            <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
          </svg>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-blue-800 mb-6">Contact Us</h1>
            <p className="text-xl text-gray-700">Have questions or need assistance? Our team is here to help you with any inquiries related to research submissions, the review process, or general information.</p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card bg-blue-50 p-8 rounded-lg text-center">
                <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  <i className={`${info.icon} text-2xl`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-4">{info.title}</h3>
                <div
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: info.content }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-blue-800 mb-8">Send Us a Message</h2>
              <form className="contact-form bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="first-name" className="block text-gray-700 font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      id="first-name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-gray-700 font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      id="last-name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none bg-white"
                    required
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="submission">Research Submission</option>
                    <option value="review">Review Process</option>
                    <option value="technical">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none resize-none"
                    required
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="privacyPolicy"
                      checked={formData.privacyPolicy}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-blue-600"
                      required
                    />
                    <span className="ml-2 text-gray-700">I agree to the <a href="#" className="text-blue-600 hover:underline">privacy policy</a></span>
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition w-full md:w-auto disabled:bg-blue-400"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
            
            {/* Map */}
            <div className="rounded-lg overflow-hidden shadow">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3633.004579265552!2d88.63742977530538!3d25.700317977392624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e3e2c5c7e68e4d%3A0x441e10ae8f1df2d2!2sHajee%20Mohammad%20Danesh%20Science%20%26%20Technology%20University%20(HSTU)!5e0!3m2!1sen!2sbd!4v1695389646997!5m2!1sen!2sbd" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '400px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="HSTU Location"
              >
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <button className="accordion-button w-full text-left p-6 font-medium flex justify-between items-center">
                    <span>{faq.question}</span>
                    <i className="fas fa-chevron-down text-blue-600 transition-transform"></i>
                  </button>
                  <div className="accordion-content px-6 pb-6">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Connect With Us</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">Follow us on social media to stay updated with the latest research publications, events, and announcements.</p>
          
          <div className="flex justify-center space-x-6">
            <a href="https://x.com/" className="social-icon bg-white text-blue-600 hover:bg-blue-50">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="https://www.facebook.com/" className="social-icon bg-white text-blue-600 hover:bg-blue-50">
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a href="https://www.linkedin.com/" className="social-icon bg-white text-blue-600 hover:bg-blue-50">
              <i className="fab fa-linkedin-in text-xl"></i>
            </a>
            <a href="https://www.instagram.com/accounts/login/?hl=en" className="social-icon bg-white text-blue-600 hover:bg-blue-50">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="https://www.youtube.com/" className="social-icon bg-white text-blue-600 hover:bg-blue-50">
              <i className="fab fa-youtube text-xl"></i>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact 