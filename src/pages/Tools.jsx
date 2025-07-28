import React from 'react'

const Tools = () => {
  const tools = [
    {
      category: "Writing & Formatting",
      items: [
        {
          name: "LaTeX Editor",
          description: "Professional document preparation system for technical and scientific documentation.",
          link: "https://www.overleaf.com/",
          icon: "fas fa-edit"
        },
        {
          name: "Grammarly",
          description: "AI-powered writing assistant to improve grammar, clarity, and style.",
          link: "https://www.grammarly.com/",
          icon: "fas fa-spell-check"
        },
        {
          name: "Zotero",
          description: "Free, easy-to-use tool to help you collect, organize, cite, and share research.",
          link: "https://www.zotero.org/",
          icon: "fas fa-book"
        }
      ]
    },
    {
      category: "Research & Analysis",
      items: [
        {
          name: "Google Scholar",
          description: "Search engine for scholarly literature across many disciplines and sources.",
          link: "https://scholar.google.com/",
          icon: "fas fa-search"
        },
        {
          name: "ResearchGate",
          description: "Professional network for scientists and researchers to share papers.",
          link: "https://www.researchgate.net/",
          icon: "fas fa-network-wired"
        },
        {
          name: "Mendeley",
          description: "Reference manager and academic social network for organizing research.",
          link: "https://www.mendeley.com/",
          icon: "fas fa-folder-open"
        }
      ]
    },
    {
      category: "Data Analysis",
      items: [
        {
          name: "R Studio",
          description: "Integrated development environment for R programming language.",
          link: "https://www.rstudio.com/",
          icon: "fas fa-chart-bar"
        },
        {
          name: "Python Jupyter",
          description: "Web-based interactive development environment for data science.",
          link: "https://jupyter.org/",
          icon: "fas fa-code"
        },
        {
          name: "SPSS",
          description: "Statistical analysis software for data management and analytics.",
          link: "https://www.ibm.com/analytics/spss-statistics-software",
          icon: "fas fa-calculator"
        }
      ]
    },
    {
      category: "Plagiarism Detection",
      items: [
        {
          name: "Turnitin",
          description: "Academic integrity platform for preventing plagiarism.",
          link: "https://www.turnitin.com/",
          icon: "fas fa-shield-alt"
        },
        {
          name: "Grammarly Premium",
          description: "Advanced writing tool with plagiarism detection features.",
          link: "https://www.grammarly.com/premium",
          icon: "fas fa-copy"
        },
        {
          name: "Copyscape",
          description: "Online plagiarism detection service for web content.",
          link: "https://www.copyscape.com/",
          icon: "fas fa-search-plus"
        }
      ]
    }
  ]

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Research Tools & Resources</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover essential tools and resources to enhance your research workflow. 
            From writing assistance to data analysis, these tools can help streamline your academic work.
          </p>
        </div>

        {/* Tools by Category */}
        <div className="space-y-12">
          {tools.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{category.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((tool, toolIndex) => (
                  <div key={toolIndex} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start mb-4">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                        <i className={`${tool.icon} text-lg`}></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{tool.name}</h3>
                        <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                        <a
                          href={tool.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm transition"
                        >
                          Visit Tool →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Writing Resources</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• APA Style Guide (7th Edition)</li>
                <li>• Academic Writing Templates</li>
                <li>• Research Methodology Guides</li>
                <li>• Citation Management Tutorials</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Research Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Literature Review Guidelines</li>
                <li>• Statistical Analysis Resources</li>
                <li>• Data Visualization Tools</li>
                <li>• Research Ethics Guidelines</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Need help finding the right tools for your research?</p>
          <a
            href="/contact"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition"
          >
            Contact Our Team
          </a>
        </div>
      </div>
    </div>
  )
}

export default Tools 