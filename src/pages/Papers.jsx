import React, { useState, useEffect } from 'react'

const Papers = () => {
  const [papers, setPapers] = useState([])
  const [filteredPapers, setFilteredPapers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentFilter, setCurrentFilter] = useState('all')
  const [currentSort, setCurrentSort] = useState('newest')
  const [selectedPaper, setSelectedPaper] = useState(null)
  const [showModal, setShowModal] = useState(false)
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [papersPerPage] = useState(4) // Changed to 4 papers per page

  // Paper data matching the original HTML exactly
  const paperData = {
    1: {
      id: 1,
      title: "Advances in Gene Therapy for Rare Diseases",
      authors: "Dr. Fatima Rahman (Department of Genetic Engineering, DU), Dr. Arif Hassan (Bangabandhu Sheikh Mujib Medical University), Dr.Nusrat Jahan (Sylhet MAG Osmani Medical College)",
      institution: "Chittagong Medical College",
      date: "June 15, 2025",
      status: "Published",
      category: "biology",
      abstract: "A groundbreaking study on novel gene therapy approaches for treating rare genetic disorders, focusing on delivery mechanisms and clinical outcomes.",
      keywords: ["Gene Therapy", "Rare Diseases", "Clinical Trials"],
      views: 1245,
      downloads: 328,
      citations: 42,
      pdfUrl: "http://localhost:5000/uploads/Myinfo-HSTU.pdf",
      ieeeLink: "https://ieeexplore.ieee.org/document/8660780"
    },
    2: {
      id: 2,
      title: "Advancing Exchange Rate Forecasting: Leveraging Machine Learning and AI for Enhanced Accuracy in Global Financial Markets",
      authors: "Md. Yeasin Rahat, Rajan Das Gupta, Nur Raisa Rahman, Sudipto Roy Pritom, Samiur Rahman Shakir, Md Imrul Hasan Showmick, Md. Jakir Hossen",
      institution: "American International University-Bangladesh, Dhaka, Bangladesh",
      date: "11 June, 2025",
      status: "Unpublished",
      category: "statistical-finance",
      abstract: "The prediction of foreign exchange rates, such as the US Dollar (USD) to Bangladeshi Taka (BDT), plays a pivotal role in global financial markets, influencing trade, investments, and economic stability. This study leverages historical USD/BDT exchange rate data from 2018 to 2023, sourced from Yahoo Finance, to develop advanced machine learning models for accurate forecasting. A Long Short-Term Memory (LSTM) neural network is employed, achieving an exceptional accuracy of 99.449%, a Root Mean Square Error (RMSE) of 0.9858, and a test loss of 0.8523, significantly outperforming traditional methods like ARIMA (RMSE 1.342). Additionally, a Gradient Boosting Classifier (GBC) is applied for directional prediction, with backtesting on a 20,653.25 over 49 trades. The study analyzes historical trends, showing a decline in BDT/USD rates from 0.012 to 0.009, and incorporates normalized daily returns to capture volatility. These findings highlight the potential of deep learning in forex forecasting, offering traders and policymakers robust tools to mitigate risks. Future work could integrate sentiment analysis and real-time economic indicators to further enhance model adaptability in volatile markets.",
      keywords: ["Exchange Rate Forecasting", "Machine Learning", "AI"],
      views: 876,
      downloads: 0,
      citations: 0,
      pdfUrl: "/pdf/advancingExchange.pdf"
    },
    3: {
      id: 3,
      title: "The Impact of Social Media on Mental Health",
      authors: "Dr. Mohammad Ali (Bangabandhu Sheikh Mujibur Rahman Agricultural University), Prof. Salma Begum (Khulna University), Dr. Anika Tabassum (Patuakhali Science and Technology University)",
      institution: "Stanford University",
      date: "May 22, 2023",
      status: "Published",
      category: "social-sciences",
      abstract: "A comprehensive analysis of how social media usage affects psychological well-being, with a focus on adolescents and young adults.",
      keywords: ["Social Media", "Mental Health", "Psychology"],
      views: 2103,
      downloads: 567,
      citations: 31,
      pdfUrl: "/sample-pdfs/paper3.pdf",
      ieeeLink: "https://ieeexplore.ieee.org/document/example2"
    },
    4: {
      id: 4,
      title: "Cultural Impact on Requirements Engineering Activities: Bangladeshi Practitioners' View",
      authors: "Chowdhury Shahriar Muzammel, Maria Spichkova, James Harland",
      institution: "RMIT University, Australia",
      date: "20 July, 2025",
      status: "Unpublished",
      category: "computer-science",
      abstract: "Requirements Engineering (RE) is one of the most interaction-intensive phases of software development. This means that RE activities might be especially impacted by stakeholders' national culture. Software development projects increasingly have a very diverse range of stakeholders. To future-proof RE activities, we need to help RE practitioners avoid misunderstandings and conflicts that might arise from not understanding potential Cultural Influences (CIs). Moreover, an awareness of CIs supports diversity and inclusion in the IT profession. Bangladesh has a growing IT sector with some unique socio-cultural characteristics, and has been largely overlooked in this research field. In this study, we aim to investigate how the RE process is adopted in the context of Bangladeshi culture and what cultural influences impact overall RE activities.",
      keywords: ["Cultural Influences", "Requirements Engineering", "Bangladesh Software Industry"],
      views: 203,
      downloads: 87,
      citations: 5,
      pdfUrl: "/pdf/cultural.pdf"
    },
    5: {
      id: 5,
      title: "Implementing AI in Bangladeshi Healthcare: Challenges & Opportunities",
      authors: "Dr. Sabrina Ahmed (DU), Dr. Rashed Khan (MIST)",
      institution: "Dhaka University Computer Science Department",
      date: "April 5, 2023",
      status: "Published",
      category: "computer-science",
      abstract: "Case studies from Bangabandhu Sheikh Mujib Medical University on implementing AI diagnostic tools in resource-constrained settings, addressing data scarcity and cultural acceptance.",
      keywords: ["AI Implementation", "Global South", "Medical Ethics"],
      views: 2450,
      downloads: 512,
      citations: 27,
      pdfUrl: "/sample-pdfs/paper5.pdf",
      ieeeLink: "https://ieeexplore.ieee.org/document/example3"
    },
    6: {
      id: 6,
      title: "Motamot: A Dataset for Revealing the Supremacy of Large Language Models over Transformer Models in Bengali Political Sentiment Analysis",
      authors: "Fatema Tuj Johora Faria, Mukaffi Bin Moin, Rabeya Islam Mumu, Md Mahabubul Alam Abir, Abrar Nawar Alfy, Mohammad Shafiul Alam",
      institution: "Ahsanullah University of Science and Technology (AUST), Dhaka, Bangladesh",
      date: "28 July, 2024",
      status: "Unpublished",
      category: "human-computer-interaction",
      abstract: "The paper presents a comprehensive dataset, 'Motamot,' aimed at enhancing the performance of large language models in analyzing political sentiment in Bengali text. It includes a diverse range of annotated examples, addressing the unique linguistic and cultural aspects of the Bengali language.",
      keywords: ["Political Sentiment Analysis", "Large Language Models (LLMs)", "Bengali Language Dataset"],
      views: 897,
      downloads: 0,
      citations: 0,
      pdfUrl: "/pdf/motamot.pdf"
    }
  }

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'biology', label: 'Biology & Medicine' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'statistical-finance', label: 'Statistical Finance' },
    { value: 'social-sciences', label: 'Social Sciences' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'human-computer-interaction', label: 'Human Computer Interaction' },
    { value: 'environmental', label: 'Environmental Science' }
  ]

  const statuses = [
    { value: 'all', label: 'All Papers' },
    { value: 'published', label: 'Published' },
    { value: 'unpublished', label: 'unpublished' }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'az', label: 'A-Z' },
    { value: 'za', label: 'Z-A' },
    { value: 'citations', label: 'Most Cited' }
  ]

  const loadPapers = () => {
    // Load approved submissions from localStorage
    const submissions = JSON.parse(localStorage.getItem('paperSubmissions') || '[]');
    const approvedSubmissions = submissions
      .filter(submission => submission.submissionStatus === 'approved' || submission.submissionStatus === 'Approved')
      .map(submission => ({
        id: submission.id,
        title: submission.paperTitle,
        authors: submission.studentName,
        institution: submission.universityName,
        date: new Date(submission.submittedDate).toLocaleDateString(),
        status: submission.publicationStatus === 'published' ? 'Published' : 'Unpublished',
        category: submission.department,
        abstract: submission.abstract,
        keywords: submission.keywords.split(',').map(k => k.trim()).filter(k => k),
        views: Math.floor(Math.random() * 1000) + 100,
        downloads: Math.floor(Math.random() * 100),
        citations: Math.floor(Math.random() * 20),
        pdfUrl: submission.pdfUrl,
        contactNumber: submission.contactNumber,
        batch: submission.batch,
        level: submission.level,
        semester: submission.semester,
        publishedLink: submission.publishedLink
      }));

    // Combine with existing paper data
    const papersArray = [...Object.values(paperData), ...approvedSubmissions];
    setPapers(papersArray);
    setFilteredPapers(papersArray);
  };

  useEffect(() => {
    loadPapers();
  }, []);

  // Listen for localStorage changes to reload papers when admin approves/rejects
  useEffect(() => {
    const handleStorageChange = () => {
      loadPapers();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    filterPapers()
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, selectedCategory, currentFilter, currentSort, papers])

  const filterPapers = () => {
    let filtered = papers.filter(paper => {
      // Filter by status
      if (currentFilter !== 'all' && paper.status.toLowerCase() !== currentFilter) {
        return false
      }

      // Filter by category
      if (selectedCategory !== 'all' && paper.category !== selectedCategory) {
        return false
      }

      // Filter by search term
      if (searchTerm) {
        const title = paper.title.toLowerCase()
        const authors = paper.authors.toLowerCase()
        const keywords = paper.keywords.join(' ').toLowerCase()
        if (!title.includes(searchTerm.toLowerCase()) && 
            !authors.includes(searchTerm.toLowerCase()) && 
            !keywords.includes(searchTerm.toLowerCase())) {
          return false
        }
      }

      return true
    })

    // Sort papers
    filtered.sort((a, b) => {
      switch (currentSort) {
        case 'newest':
          return new Date(b.date) - new Date(a.date)
        case 'oldest':
          return new Date(a.date) - new Date(b.date)
        case 'az':
          return a.title.localeCompare(b.title)
        case 'za':
          return b.title.localeCompare(a.title)
        case 'citations':
          return b.citations - a.citations
        default:
          return 0
      }
    })

    setFilteredPapers(filtered)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  const handleStatusChange = (status) => {
    setCurrentFilter(status)
  }

  const handleSortChange = (e) => {
    setCurrentSort(e.target.value)
  }

  const handlePaperClick = (paper) => {
    setSelectedPaper(paper)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedPaper(null)
  }

  const handleDownload = () => {
    if (selectedPaper.status === "Published" && selectedPaper.ieeeLink) {
      window.open(selectedPaper.ieeeLink, '_blank')
    } else {
      // For unpublished papers, download the PDF directly
      const link = document.createElement('a')
      link.href = selectedPaper.pdfUrl
      link.download = selectedPaper.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf'
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const getStatusBadge = (status) => {
    const baseClasses = "status-badge"
    if (status === 'Published') {
      return `${baseClasses} status-published`
    } else {
      return `${baseClasses} status-unpublished`
    }
  }

  // Pagination calculations
  const indexOfLastPaper = currentPage * papersPerPage
  const indexOfFirstPaper = indexOfLastPaper - papersPerPage
  const currentPapers = filteredPapers.slice(indexOfFirstPaper, indexOfLastPaper)
  const totalPages = Math.ceil(filteredPapers.length / papersPerPage)

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Go to previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Go to next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

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
            <h1 className="text-4xl font-bold text-blue-800 mb-6">Submitted Research Papers</h1>
            <p className="text-xl text-gray-700">Browse through our collection of submitted research papers across various academic disciplines.</p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-10 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Search Bar */}
            <div className="w-full md:w-1/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search papers by title, author, or keywords"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="search-input w-full px-4 py-3 pl-12 border border-gray-300 rounded-md focus:outline-none"
                />
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {statuses.map(status => (
                <button
                  key={status.value}
                  onClick={() => handleStatusChange(status.value)}
                  className={`filter-button px-4 py-2 rounded-md text-sm font-medium transition ${
                    currentFilter === status.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
            
            {/* Sort By */}
            <div className="w-full md:w-auto">
              <select
                value={currentSort}
                onChange={handleSortChange}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Papers List Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Category Tabs */}
          <div className="mb-10 border-b border-gray-200 overflow-x-auto whitespace-nowrap pb-2">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => handleCategoryChange(category.value)}
                className={`category-tab inline-block px-6 py-3 font-medium transition ${
                  selectedCategory === category.value
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          {/* Papers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {currentPapers.length > 0 ? (
              currentPapers.map(paper => (
              <div
                key={paper.id}
                className="paper-card bg-white p-6 rounded-lg shadow-sm"
                data-status={paper.status.toLowerCase()}
                data-category={paper.category}
                data-title={paper.title}
                data-date={paper.date}
                data-citations={paper.citations}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-blue-800">{paper.title}</h3>
                  <span className={getStatusBadge(paper.status)}>
                    {paper.status}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600 mb-2"><strong>Authors:</strong> {paper.authors}</p>
                  <p className="text-gray-600 mb-2"><strong>Institution:</strong> {paper.institution}</p>
                  <p className="text-gray-600"><strong>Date Submitted:</strong> {paper.date}</p>
                </div>
                <p className="text-gray-700 mb-4">{paper.abstract}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {paper.keywords.map((keyword, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
                                 <div className="flex justify-end">
                   <button
                     onClick={() => handlePaperClick(paper)}
                     className="view-paper-btn bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                     data-paper-id={paper.id}
                   >
                     View Paper
                   </button>
                 </div>
              </div>
            ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <div className="text-gray-500">
                  <i className="fas fa-search text-4xl mb-4"></i>
                  <h3 className="text-xl font-semibold mb-2">No papers found</h3>
                  <p>No papers match your current filters. Try adjusting your search criteria.</p>
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <nav className="inline-flex space-x-1">
                <button 
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded transition ${
                    currentPage === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                
                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => {
                  // Show first page, last page, current page, and pages around current page
                  if (
                    number === 1 ||
                    number === totalPages ||
                    (number >= currentPage - 1 && number <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded transition ${
                          currentPage === number
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {number}
                      </button>
                    )
                  } else if (
                    number === currentPage - 2 ||
                    number === currentPage + 2
                  ) {
                    return (
                      <span key={number} className="w-10 h-10 flex items-center justify-center text-gray-500">
                        ...
                      </span>
                    )
                  }
                  return null
                })}
                
                <button 
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded transition ${
                    currentPage === totalPages 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>

      {/* Paper View Modal */}
      {showModal && selectedPaper && (
        <div className="modal active">
          <div className="modal-content p-0">
            <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
              <h3 className="text-xl font-bold" id="modal-title">{selectedPaper.title}</h3>
              <button onClick={closeModal} className="text-white hover:text-blue-200">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="p-6">
              {/* Author Information */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3 text-blue-800">Author Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 mb-1"><strong>Author's Name:</strong></p>
                    <p className="text-gray-800">{selectedPaper.studentName || selectedPaper.authors}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1"><strong>Student ID:</strong></p>
                    <p className="text-gray-800">{selectedPaper.studentId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1"><strong>Email Address:</strong></p>
                    <p className="text-gray-800">{selectedPaper.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1"><strong>Contact Number:</strong></p>
                    <p className="text-gray-800">{selectedPaper.contactNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1"><strong>Department:</strong></p>
                    <p className="text-gray-800">{selectedPaper.department}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1"><strong>Batch:</strong></p>
                    <p className="text-gray-800">{selectedPaper.batch}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1"><strong>Level:</strong></p>
                    <p className="text-gray-800">{selectedPaper.level}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1"><strong>Semester:</strong></p>
                    <p className="text-gray-800">{selectedPaper.semester}</p>
                  </div>
                </div>
              </div>

                             {/* University Information */}
               <div className="mb-6">
                 <h4 className="text-lg font-semibold mb-3 text-blue-800">University Information</h4>
                 <div>
                   <p className="text-gray-600 mb-1"><strong>University Name:</strong></p>
                   <p className="text-gray-800">{selectedPaper.universityName || selectedPaper.institution || 'HSTU'}</p>
                 </div>
               </div>

              {/* Paper Information */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3 text-blue-800">Paper Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600 mb-1"><strong>Paper Title:</strong></p>
                    <p className="text-gray-800">{selectedPaper.paperTitle || selectedPaper.title}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1"><strong>Status:</strong></p>
                    <p className="text-gray-800">{selectedPaper.status}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1"><strong>Date Submitted:</strong></p>
                    <p className="text-gray-800">{selectedPaper.date || selectedPaper.submittedDate}</p>
                  </div>
                  {selectedPaper.publishedLink && (
                    <div>
                      <p className="text-gray-600 mb-1"><strong>Publication Link:</strong></p>
                      <a href={selectedPaper.publishedLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                        {selectedPaper.publishedLink}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Abstract</h4>
                <p className="text-gray-700" id="modal-abstract">{selectedPaper.abstract}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Keywords</h4>
                <div className="flex flex-wrap gap-2" id="modal-keywords">
                  {selectedPaper.keywords && selectedPaper.keywords.length > 0 ? (
                    selectedPaper.keywords.map((keyword, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No keywords provided</p>
                  )}
                </div>
              </div>
              

              
                             <div className="flex justify-end">
                 {selectedPaper.status === "Published" && (
                   <button
                     id="download-pdf-btn"
                     onClick={handleDownload}
                     className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center"
                   >
                     <i className="fas fa-external-link-alt mr-2"></i> View on IEEE
                   </button>
                 )}
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Papers 