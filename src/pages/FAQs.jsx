import React, { useState } from 'react'

const FAQs = () => {
  const [openFAQs, setOpenFAQs] = useState({})

  const toggleFAQ = (id) => {
    setOpenFAQs(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const faqs = [
    {
      id: 1,
      question: "How do I submit a research paper?",
      answer: "To submit a research paper, navigate to the Submit page, fill out the submission form with your paper details, and upload your PDF file. Make sure your paper meets all the formatting requirements outlined in our guidelines."
    },
    {
      id: 2,
      question: "What file formats are accepted for submission?",
      answer: "We only accept PDF files for research paper submissions. The maximum file size is 10MB. Please ensure all fonts are embedded in the PDF to maintain proper formatting."
    },
    {
      id: 3,
      question: "How long does the review process take?",
      answer: "The initial review process typically takes 2-3 weeks. You will receive email notifications about the status of your submission throughout the process."
    },
    {
      id: 4,
      question: "Can I submit multiple papers?",
      answer: "Yes, you can submit multiple papers. Each submission should be made separately through the submission form. Each paper will be reviewed independently."
    },
    {
      id: 5,
      question: "What are the formatting requirements?",
      answer: "Papers should be between 3,000 and 8,000 words, use A4 page size with 1-inch margins, 12-point Times New Roman or Arial font, and double-spaced text. Please refer to our detailed guidelines for complete formatting requirements."
    },
    {
      id: 6,
      question: "How do I track my submission status?",
      answer: "You will receive email notifications about your submission status. You can also contact our support team for updates on your submission."
    },
    {
      id: 7,
      question: "What citation style should I use?",
      answer: "We require APA (7th edition) citation style for all submissions. All sources must be properly cited in the text and listed in the references section. Include DOI numbers when available."
    },
    {
      id: 8,
      question: "Is there a submission fee?",
      answer: "Currently, there is no submission fee for research papers. However, this policy may be subject to change, and any updates will be communicated through our website."
    },
    {
      id: 9,
      question: "Can I withdraw my submission?",
      answer: "Yes, you can withdraw your submission by contacting our support team. Please provide your submission ID and reason for withdrawal. Withdrawals are typically processed within 2-3 business days."
    },
    {
      id: 10,
      question: "What happens if my paper is rejected?",
      answer: "If your paper is rejected, you will receive detailed feedback explaining the reasons for rejection. You are welcome to revise your paper based on the feedback and resubmit it for consideration."
    }
  ]

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our research portal and submission process.
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          {faqs.map(faq => (
            <div key={faq.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                <i className={`fas fa-chevron-down transition-transform ${
                  openFAQs[faq.id] ? 'rotate-180' : ''
                }`}></i>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                openFAQs[faq.id] ? 'max-h-96' : 'max-h-0'
              }`}>
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6">
            If you couldn't find the answer you're looking for, our support team is here to help.
          </p>
          <a
            href="/contact"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}

export default FAQs 