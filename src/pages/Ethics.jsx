import React from 'react'

const Ethics = () => {
  const ethicsGuidelines = [
    {
      title: "Plagiarism Policy",
      description: "Plagiarism in any form is strictly prohibited and will result in immediate rejection of the submission.",
      details: [
        "All submissions must be original work",
        "Proper citation of all sources is mandatory",
        "Self-plagiarism is also considered a violation",
        "All papers undergo plagiarism detection screening"
      ]
    },
    {
      title: "Authorship Standards",
      description: "Authorship should be limited to those who have made significant contributions to the research.",
      details: [
        "All authors must have contributed substantially to the work",
        "Authorship order should reflect contribution level",
        "All authors must approve the final manuscript",
        "Corresponding author must be clearly identified"
      ]
    },
    {
      title: "Data Integrity",
      description: "All data presented must be accurate, verifiable, and honestly reported.",
      details: [
        "Data must be collected and analyzed honestly",
        "Original data must be retained for verification",
        "Statistical analyses must be appropriate and accurate",
        "Negative results should be reported when relevant"
      ]
    },
    {
      title: "Conflicts of Interest",
      description: "Authors must disclose any potential conflicts of interest that could influence the research.",
      details: [
        "Financial relationships with commercial entities",
        "Personal relationships that could bias the work",
        "Institutional affiliations that may create bias",
        "Any other interests that could affect objectivity"
      ]
    },
    {
      title: "Human Subjects Research",
      description: "Research involving human participants must follow ethical guidelines and obtain proper approval.",
      details: [
        "Institutional Review Board (IRB) approval required",
        "Informed consent must be obtained from participants",
        "Privacy and confidentiality must be protected",
        "Research must minimize harm to participants"
      ]
    },
    {
      title: "Animal Research",
      description: "Research involving animals must follow ethical guidelines and obtain proper approval.",
      details: [
        "Institutional Animal Care and Use Committee approval",
        "Minimize animal suffering and distress",
        "Use appropriate sample sizes",
        "Follow 3Rs principles (Replace, Reduce, Refine)"
      ]
    }
  ]

  const reportingViolations = [
    "Submit detailed report with evidence",
    "Include specific details about the violation",
    "Provide supporting documentation",
    "Maintain confidentiality during investigation"
  ]

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Publication Ethics</h1>
          <p className="text-lg text-gray-600">
            Our commitment to maintaining the highest standards of academic integrity and ethical research practices.
          </p>
        </div>

        {/* Ethics Guidelines */}
        <div className="space-y-8">
          {ethicsGuidelines.map((guideline, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-blue-800 mb-3">{guideline.title}</h2>
              <p className="text-gray-700 mb-4">{guideline.description}</p>
              <ul className="space-y-2">
                {guideline.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start">
                    <i className="fas fa-check-circle text-green-600 mt-1 mr-3 flex-shrink-0"></i>
                    <span className="text-gray-600">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Reporting Violations */}
        <div className="mt-12 bg-red-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Reporting Ethical Violations</h2>
          <p className="text-gray-700 mb-4">
            If you suspect an ethical violation in any published work, please report it to our ethics committee. 
            All reports will be investigated thoroughly and confidentially.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How to Report:</h3>
              <ul className="space-y-1 text-gray-600">
                {reportingViolations.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <i className="fas fa-arrow-right text-red-600 mt-1 mr-2 flex-shrink-0"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Contact Ethics Committee:</h3>
              <div className="space-y-2 text-gray-600">
                <p><i className="fas fa-envelope mr-2"></i> ethics@researchportal.edu</p>
                <p><i className="fas fa-phone mr-2"></i> +1 (555) 123-4567</p>
                <p><i className="fas fa-clock mr-2"></i> Response within 48 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Consequences */}
        <div className="mt-8 bg-yellow-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-yellow-800 mb-4">Consequences of Violations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-yellow-100 text-yellow-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-exclamation-triangle text-2xl"></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Immediate Rejection</h3>
              <p className="text-gray-600 text-sm">Papers with ethical violations will be rejected immediately</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 text-yellow-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-ban text-2xl"></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Author Ban</h3>
              <p className="text-gray-600 text-sm">Authors may be banned from future submissions</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 text-yellow-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-gavel text-2xl"></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Legal Action</h3>
              <p className="text-gray-600 text-sm">Serious violations may result in legal consequences</p>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Ethics Guidelines:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• COPE Guidelines</li>
                <li>• ICMJE Recommendations</li>
                <li>• WAME Ethics Guidelines</li>
                <li>• Institutional Ethics Policies</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Training Resources:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Research Ethics Training</li>
                <li>• Plagiarism Prevention</li>
                <li>• Data Management Ethics</li>
                <li>• Publication Ethics Workshops</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Questions about publication ethics?</p>
          <a
            href="/contact"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition"
          >
            Contact Ethics Committee
          </a>
        </div>
      </div>
    </div>
  )
}

export default Ethics 