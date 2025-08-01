import React, { useState } from 'react'

const Guidelines = () => {
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', label: 'General Guidelines' },
    { id: 'format', label: 'Formatting Requirements' },
    { id: 'ethics', label: 'Ethics & Standards' }
  ]

  const generalGuidelines = [
    {
      id: 'originality',
      title: '1. Originality',
      content: 'All submissions must be original work that has not been published elsewhere or is not under consideration for publication.'
    },
    {
      id: 'language',
      title: '2. Language',
      content: 'Manuscripts must be written in clear, concise English. Authors whose native language is not English are encouraged to have their manuscripts checked by a native English speaker or a professional editing service.'
    },
    {
      id: 'submission',
      title: '3. Submission Process',
      content: 'All submissions must be made through the online submission system. Email submissions will not be accepted. Authors must register and create an account to submit their work.'
    }
  ]

  const formattingRequirements = [
    {
      id: 'file-format',
      title: '1. File Format',
      content: 'Manuscripts should be submitted as Microsoft Word (.docx) or PDF files. LaTeX files are also acceptable with accompanying PDF versions.'
    },
    {
      id: 'structure',
      title: '2. Structure',
      content: 'Research papers should include: Title, Abstract, Keywords, Introduction, Literature Review, Methodology, Results, Discussion, Conclusion, and References.'
    },
    {
      id: 'length',
      title: '3. Length',
      content: 'Full papers should be between 5,000-8,000 words including references. Short communications should not exceed 3,000 words.'
    },
    {
      id: 'figures',
      title: '4. Figures and Tables',
      content: 'All figures and tables must be numbered consecutively and cited in the text. They should have descriptive captions and be of high resolution (minimum 300 dpi).'
    },
    {
      id: 'citations',
      title: '5. Citation Style',
      content: 'Authors should follow APA 7th edition for citations and references. All sources cited in the text must appear in the reference list and vice versa.'
    }
  ]

  const ethicsStandards = [
    {
      id: 'research-ethics',
      title: '1. Research Ethics',
      content: 'All research involving human participants or animals must have been approved by the appropriate ethics committee. A statement confirming this approval must be included in the manuscript.'
    },
    {
      id: 'conflicts',
      title: '2. Conflict of Interest',
      content: 'Authors must disclose any financial or personal relationships that could inappropriately influence their work. A conflict of interest statement must be included in the manuscript.'
    },
    {
      id: 'plagiarism',
      title: '3. Plagiarism',
      content: 'All submissions are checked for plagiarism. Authors must ensure their work is entirely original, and any work or words from others are appropriately cited.'
    },
    {
      id: 'data-sharing',
      title: '4. Data Sharing',
      content: 'Authors are encouraged to share their data, code, and materials. For research involving sensitive or confidential data, authors should explain any restrictions on data availability.'
    }
  ]

  const faqs = [
    {
      question: "Can I submit a paper that has been presented at a conference?",
      answer: "Yes, papers previously presented at conferences can be submitted if they have been substantially expanded or revised. You must disclose the previous presentation in your cover letter and explain how the current submission differs from the conference version."
    },
    {
      question: "Can I suggest or exclude specific reviewers?",
      answer: "Yes, authors may suggest up to three potential reviewers or request the exclusion of specific individuals from the review process. The editor will consider these suggestions but is not obligated to follow them."
    }
  ]

  const getTabContent = () => {
    switch (activeTab) {
      case 'general':
        return generalGuidelines
      case 'format':
        return formattingRequirements
      case 'ethics':
        return ethicsStandards
      default:
        return generalGuidelines
    }
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">Research Submission Guidelines</h1>
        <p className="text-lg text-gray-700 mb-10">
          To ensure the quality and integrity of research submissions, please follow these guidelines carefully. 
          Adherence to these standards helps maintain the academic excellence of our research portal.
        </p>

        {/* Guidelines Tabs */}
        <div className="mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px" id="guideline-tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-button py-4 px-6 font-medium transition ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  data-tab={tab.id}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="py-8">
            <div className="space-y-6">
              {getTabContent().map(guideline => (
                <div key={guideline.id} className="guideline-card bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 text-blue-700">{guideline.title}</h3>
                  <p className="text-gray-700">{guideline.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8">Frequently Asked Questions</h2>
          
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
        
        {/* Download Guidelines */}
        <div className="mt-16 bg-blue-50 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">Need a Printable Version?</h3>
          <p className="text-lg text-gray-700 mb-6">Download our complete guidelines document for offline reference.</p>
          <a 
            href="https://drive.google.com/file/d/1lHKgvN521y2IWQoe3tPUrcMHKFZzeAwZ/view?usp=drivesdk" 
            className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 transition shadow-lg inline-flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-file-pdf mr-2"></i> Download PDF Guidelines
          </a>
        </div>
      </div>
    </div>
  )
}

export default Guidelines 