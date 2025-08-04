import React, { useState, useEffect } from 'react'
import { API_ENDPOINTS } from '../config/api'

const Papers = () => {
  const [papers, setPapers] = useState([])
  const [filteredPapers, setFilteredPapers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentFilter, setCurrentFilter] = useState('all')
  const [currentSort, setCurrentSort] = useState('newest')
  const [selectedPaper, setSelectedPaper] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [adminData, setAdminData] = useState(null)
  const [isLoadingAdminData, setIsLoadingAdminData] = useState(false)
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [papersPerPage] = useState(4) // Changed to 4 papers per page

  // Paper data matching the original HTML exactly
  const paperData = {
    // 1: {
    //   id: 1,
    //   title: "Advances in Gene Therapy for Rare Diseases",
    //   authors: "Dr. Fatima Rahman (Department of Genetic Engineering, DU), Dr. Arif Hassan (Bangabandhu Sheikh Mujib Medical University), Dr.Nusrat Jahan (Sylhet MAG Osmani Medical College)",
    //   institution: "Chittagong Medical College",
    //   date: "June 15, 2025",
    //   status: "Published",
    //   category: "biology",
    //   abstract: "A groundbreaking study on novel gene therapy approaches for treating rare genetic disorders, focusing on delivery mechanisms and clinical outcomes.",
    //   keywords: ["Gene Therapy", "Rare Diseases", "Clinical Trials"],
    //   pdfUrl: "/pdf/Myinfo-HSTU.pdf",
    //   ieeeLink: "https://ieeexplore.ieee.org/document/8660780"
    // },
    // 2: {
    //   id: 2,
    //   title: "Advancing Exchange Rate Forecasting: Leveraging Machine Learning and AI for Enhanced Accuracy in Global Financial Markets",
    //   authors: "Md. Yeasin Rahat, Rajan Das Gupta, Nur Raisa Rahman, Sudipto Roy Pritom, Samiur Rahman Shakir, Md Imrul Hasan Showmick, Md. Jakir Hossen",
    //   institution: "American International University-Bangladesh, Dhaka, Bangladesh",
    //   date: "11 June, 2025",
    //   status: "Unpublished",
    //   category: "statistical-finance",
    //   abstract: "The prediction of foreign exchange rates, such as the US Dollar (USD) to Bangladeshi Taka (BDT), plays a pivotal role in global financial markets, influencing trade, investments, and economic stability. This study leverages historical USD/BDT exchange rate data from 2018 to 2023, sourced from Yahoo Finance, to develop advanced machine learning models for accurate forecasting. A Long Short-Term Memory (LSTM) neural network is employed, achieving an exceptional accuracy of 99.449%, a Root Mean Square Error (RMSE) of 0.9858, and a test loss of 0.8523, significantly outperforming traditional methods like ARIMA (RMSE 1.342). Additionally, a Gradient Boosting Classifier (GBC) is applied for directional prediction, with backtesting on a 20,653.25 over 49 trades. The study analyzes historical trends, showing a decline in BDT/USD rates from 0.012 to 0.009, and incorporates normalized daily returns to capture volatility. These findings highlight the potential of deep learning in forex forecasting, offering traders and policymakers robust tools to mitigate risks. Future work could integrate sentiment analysis and real-time economic indicators to further enhance model adaptability in volatile markets.",
    //   keywords: ["Exchange Rate Forecasting", "Machine Learning", "AI"],
      
    //   pdfUrl: "/pdf/advancingExchange.pdf"
    // },
    // 3: {
    //   id: 3,
    //   title: "The Impact of Social Media on Mental Health",
    //   authors: "Dr. Mohammad Ali (Bangabandhu Sheikh Mujibur Rahman Agricultural University), Prof. Salma Begum (Khulna University), Dr. Anika Tabassum (Patuakhali Science and Technology University)",
    //   institution: "Stanford University",
    //   date: "May 22, 2023",
    //   status: "Published",
    //   category: "social-sciences",
    //   abstract: "A comprehensive analysis of how social media usage affects psychological well-being, with a focus on adolescents and young adults.",
    //   keywords: ["Social Media", "Mental Health", "Psychology"],
    //   pdfUrl: "/sample-pdfs/paper3.pdf",
    //   ieeeLink: "https://ieeexplore.ieee.org/document/example2"
    // },
    // 4: {
    //   id: 4,
    //   title: "Cultural Impact on Requirements Engineering Activities: Bangladeshi Practitioners' View",
    //   authors: "Chowdhury Shahriar Muzammel, Maria Spichkova, James Harland",
    //   institution: "RMIT University, Australia",
    //   date: "20 July, 2025",
    //   status: "Unpublished",
    //   category: "computer-science",
    //   abstract: "Requirements Engineering (RE) is one of the most interaction-intensive phases of software development. This means that RE activities might be especially impacted by stakeholders' national culture. Software development projects increasingly have a very diverse range of stakeholders. To future-proof RE activities, we need to help RE practitioners avoid misunderstandings and conflicts that might arise from not understanding potential Cultural Influences (CIs). Moreover, an awareness of CIs supports diversity and inclusion in the IT profession. Bangladesh has a growing IT sector with some unique socio-cultural characteristics, and has been largely overlooked in this research field. In this study, we aim to investigate how the RE process is adopted in the context of Bangladeshi culture and what cultural influences impact overall RE activities.",
    //   keywords: ["Cultural Influences", "Requirements Engineering", "Bangladesh Software Industry"],
      
    //   pdfUrl: "/pdf/cultural.pdf"
    // },
    // 5: {
    //   id: 5,
    //   title: "Implementing AI in Bangladeshi Healthcare: Challenges & Opportunities",
    //   authors: "Dr. Sabrina Ahmed (DU), Dr. Rashed Khan (MIST)",
    //   institution: "Dhaka University Computer Science Department",
    //   date: "April 5, 2023",
    //   status: "Published",
    //   category: "computer-science",
    //   abstract: "Case studies from Bangabandhu Sheikh Mujib Medical University on implementing AI diagnostic tools in resource-constrained settings, addressing data scarcity and cultural acceptance.",
    //   keywords: ["AI Implementation", "Global South", "Medical Ethics"],
    //   pdfUrl: "/sample-pdfs/paper5.pdf",
    //   ieeeLink: "https://ieeexplore.ieee.org/document/example3"
    // },
    // 6: {
    //   id: 6,
    //   title: "Motamot: A Dataset for Revealing the Supremacy of Large Language Models over Transformer Models in Bengali Political Sentiment Analysis",
    //   authors: "Fatema Tuj Johora Faria, Mukaffi Bin Moin, Rabeya Islam Mumu, Md Mahabubul Alam Abir, Abrar Nawar Alfy, Mohammad Shafiul Alam",
    //   institution: "Bangladesh University of Engineering and Technology",
    //   date: "15 August, 2025",
    //   status: "Unpublished",
    //   category: "computer-science",
    //   abstract: "This study introduces Motamot, a comprehensive dataset for Bengali political sentiment analysis, demonstrating the superior performance of Large Language Models (LLMs) over traditional Transformer models. The research addresses the scarcity of high-quality Bengali language resources for sentiment analysis in political contexts.",
    //   keywords: ["Bengali NLP", "Sentiment Analysis", "Large Language Models"],
      
    //   pdfUrl: "/pdf/motamot.pdf"
    // }
  }

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'az', label: 'A-Z' },
    { value: 'za', label: 'Z-A' },
    { value: 'citations', label: 'Most Cited' }
  ]

  const loadPapers = async () => {
    setIsLoading(true);
    try {
      // Fetch papers from backend API
      const response = await fetch(API_ENDPOINTS.PAPERS);
      if (response.ok) {
        const serverPapers = await response.json();
        console.log('Fetched papers from backend:', serverPapers);
        
        let papersData = [];
        if (serverPapers.success && serverPapers.data) {
          papersData = serverPapers.data;
        } else if (Array.isArray(serverPapers)) {
          papersData = serverPapers;
        }

        // Filter only approved papers and format them
        const approvedSubmissions = papersData
          .filter(paper => paper.submissionStatus === 'approved')
          .map(paper => ({
            id: paper._id,
            title: paper.paperTitle || 'Untitled',
            authors: paper.studentName || 'Unknown Author',
            institution: paper.universityName || 'Unknown Institution',
            date: paper.submittedAt ? new Date(paper.submittedAt).toLocaleDateString() : 'Unknown Date',
            status: paper.status === 'published' ? 'Published' : 'Unpublished',
            category: paper.department || 'general',
            abstract: paper.abstract || 'No abstract available',
            keywords: paper.keywords ? paper.keywords.split(',').map(k => k.trim()).filter(k => k) : [],
            views: Math.floor(Math.random() * 1000) + 100,
            downloads: Math.floor(Math.random() * 100),
            citations: Math.floor(Math.random() * 20),
            pdfUrl: paper.cloudinaryUrl || null,
            contactNumber: paper.contactNumber || 'No contact provided',
            batch: paper.batch || 'No batch info',
            level: paper.level || 'No level info',
            semester: paper.semester || 'No semester info',
            publishedLink: paper.publishedLink || null
          }));

        // Combine with existing paper data
        const papersArray = [...Object.values(paperData), ...approvedSubmissions];
        setPapers(papersArray);
        setFilteredPapers(papersArray);
      } else {
        console.error('Failed to fetch papers from backend');
        // Fallback to localStorage if backend fails
        loadFromLocalStorage();
      }
    } catch (error) {
      console.error('Error fetching papers:', error);
      // Fallback to localStorage if backend fails
      loadFromLocalStorage();
    } finally {
      setIsLoading(false);
    }
  };

  const loadFromLocalStorage = () => {
    // Load approved submissions from localStorage as fallback
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

  const fetchAdminData = async (paperId) => {
    setIsLoadingAdminData(true)
    try {
      const response = await fetch(`${API_ENDPOINTS.PAPERS}/${paperId}`)
      if (response.ok) {
        const result = await response.json()
        if (result.success && result.data) {
          setAdminData(result.data)
        }
      }
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setIsLoadingAdminData(false)
    }
  }

  const handlePaperClick = async (paper) => {
    setSelectedPaper(paper)
    setShowModal(true)
    setAdminData(null) // Reset admin data
    
    // Fetch admin data if paper has an ID (from server)
    if (paper.id && typeof paper.id === 'string' && paper.id.length > 10) {
      await fetchAdminData(paper.id)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedPaper(null)
    setAdminData(null)
  }

  const handleDownload = () => {
    if (selectedPaper && selectedPaper.pdfUrl) {
      const link = document.createElement('a')
      link.href = selectedPaper.pdfUrl
      link.download = `${selectedPaper.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium"
    switch (status.toLowerCase()) {
      case 'published':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'unpublished':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  // Pagination logic
  const indexOfLastPaper = currentPage * papersPerPage
  const indexOfFirstPaper = indexOfLastPaper - papersPerPage
  const currentPapers = filteredPapers.slice(indexOfFirstPaper, indexOfLastPaper)
  const totalPages = Math.ceil(filteredPapers.length / papersPerPage)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-3xl text-blue-600"></i>
          <p className="mt-2 text-gray-500">Loading papers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Research Papers</h1>
          <p className="text-gray-600">Explore the latest research contributions from our academic community</p>
        </div>
      </header>

      {/* Filters and Search */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search papers by title, authors, or keywords..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="biology">Biology</option>
                  <option value="social-sciences">Social Sciences</option>
                  <option value="statistical-finance">Statistical Finance</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={currentFilter}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Papers</option>
                  <option value="published">Published</option>
                  <option value="unpublished">Unpublished</option>
                </select>
              </div>

              {/* Sort */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  value={currentSort}
                  onChange={handleSortChange}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        </div>
      </section>

      {/* Papers Grid */}
      <section className="container mx-auto px-6 py-8">
        {filteredPapers.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-medium text-gray-600 mb-2">No papers found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {currentPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handlePaperClick(paper)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 flex-1 mr-4">
                      {paper.title}
                    </h3>
                    <span className={getStatusBadge(paper.status)}>
                      {paper.status}
                    </span>
                  </div>

                  <div className="mb-4 space-y-2">
                    <p className="text-gray-600"><strong>Authors:</strong> {paper.authors}</p>
                    <p className="text-gray-600"><strong>Institution:</strong> {paper.institution}</p>
                    <p className="text-gray-600"><strong>Date:</strong> {paper.date}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 line-clamp-3">
                      {paper.abstract}
                    </p>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {paper.keywords.slice(0, 3).map((keyword, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {keyword}
                        </span>
                      ))}
                      {paper.keywords.length > 3 && (
                        <span className="text-gray-500 text-xs">+{paper.keywords.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-500">
                    
                    <span className="text-blue-600 hover:text-blue-800">Read More →</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-4 py-2 border rounded-md ${
                      currentPage === number
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {number}
                  </button>
                ))}
                
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Paper Detail Modal */}
      {showModal && selectedPaper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex-1 mr-4">
                  {selectedPaper.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-gray-600 mb-2"><strong>Authors:</strong></p>
                  <p className="text-gray-800">{selectedPaper.authors}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-2"><strong>Institution:</strong></p>
                  <p className="text-gray-800">{selectedPaper.institution}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-2"><strong>Date:</strong></p>
                  <p className="text-gray-800">{selectedPaper.date}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-2"><strong>Status:</strong></p>
                  <span className={getStatusBadge(selectedPaper.status)}>
                    {selectedPaper.status}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Abstract</h3>
                <p className="text-gray-700 leading-relaxed">{selectedPaper.abstract}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPaper.keywords.map((keyword, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Admin Data Section */}
              {isLoadingAdminData && (
                <div className="mb-6">
                  <div className="flex items-center justify-center py-4">
                    <i className="fas fa-spinner fa-spin text-blue-600 text-xl mr-2"></i>
                    <span className="text-gray-600">Loading admin information...</span>
                  </div>
                </div>
              )}

              {adminData && !isLoadingAdminData && (
                <div className="mb-6 border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <i className="fas fa-user-shield mr-2 text-blue-600"></i>
                    Author's Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Submission Details */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-700 border-b pb-2">Submission Details</h4>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium text-gray-600">Student ID:</span>
                          <span className="ml-2 text-gray-800">{adminData.studentId || 'Not provided'}</span>
                        </p>
                        <p className="text-sm">
                          <span className="font-medium text-gray-600">Email:</span>
                          <span className="ml-2 text-gray-800">{adminData.email || 'Not provided'}</span>
                        </p>
                        <p className="text-sm">
                          <span className="font-medium text-gray-600">Contact:</span>
                          <span className="ml-2 text-gray-800">{adminData.contactNumber || 'Not provided'}</span>
                        </p>
                        <p className="text-sm">
                          <span className="font-medium text-gray-600">Department:</span>
                          <span className="ml-2 text-gray-800">{adminData.department || 'Not specified'}</span>
                        </p>
                      </div>
                    </div>

                    {/* Academic Details */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-700 border-b pb-2">Academic Details</h4>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium text-gray-600">Batch:</span>
                          <span className="ml-2 text-gray-800">{adminData.batch || 'Not specified'}</span>
                        </p>
                        <p className="text-sm">
                          <span className="font-medium text-gray-600">Level:</span>
                          <span className="ml-2 text-gray-800">{adminData.level || 'Not specified'}</span>
                        </p>
                        <p className="text-sm">
                          <span className="font-medium text-gray-600">Semester:</span>
                          <span className="ml-2 text-gray-800">{adminData.semester || 'Not specified'}</span>
                        </p>
                        <p className="text-sm">
                          <span className="font-medium text-gray-600">University:</span>
                          <span className="ml-2 text-gray-800">{adminData.universityName || 'Not specified'}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Approval Status */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-3">Approval Status</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          adminData.submissionStatus === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : adminData.submissionStatus === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          <i className={`fas ${
                            adminData.submissionStatus === 'approved' ? 'fa-check-circle' :
                            adminData.submissionStatus === 'rejected' ? 'fa-times-circle' :
                            'fa-clock'
                          } mr-1`}></i>
                          {adminData.submissionStatus ? adminData.submissionStatus.charAt(0).toUpperCase() + adminData.submissionStatus.slice(1) : 'Pending'}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Submission Status</p>
                      </div>
                      
                      <div className="text-center">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          adminData.status === 'published' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <i className={`fas ${
                            adminData.status === 'published' ? 'fa-globe' : 'fa-file-alt'
                          } mr-1`}></i>
                          {adminData.status === 'published' ? 'Published' : 'Unpublished'}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Publication Status</p>
                      </div>

                      <div className="text-center">
                        <div className="text-sm text-gray-600">
                          <i className="fas fa-calendar mr-1"></i>
                          {adminData.submittedAt ? new Date(adminData.submittedAt).toLocaleDateString() : 'Unknown'}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Submitted Date</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Admin Notes or Comments */}
                  {adminData.adminNotes && (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                        <i className="fas fa-sticky-note mr-2 text-blue-600"></i>
                        Admin Notes
                      </h4>
                      <p className="text-sm text-gray-700">{adminData.adminNotes}</p>
                    </div>
                  )}

                  {/* Published Link */}
                  {adminData.publishedLink && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                        <i className="fas fa-external-link-alt mr-2 text-green-600"></i>
                        Publication Link
                      </h4>
                      <a 
                        href={adminData.publishedLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm break-all"
                      >
                        {adminData.publishedLink}
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Fallback message when no admin data is available */}
              {!adminData && !isLoadingAdminData && selectedPaper && selectedPaper.id && typeof selectedPaper.id === 'string' && selectedPaper.id.length > 10 && (
                <div className="mb-6 border-t pt-6">
                  <div className="text-center py-4">
                    <i className="fas fa-info-circle text-gray-400 text-xl mb-2"></i>
                    <p className="text-gray-500 text-sm">Admin information not available for this paper.</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-4">
                {selectedPaper.pdfUrl && (
                  <button
                    onClick={handleDownload}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    <i className="fas fa-download mr-2"></i>
                    Download PDF
                  </button>
                )}
                {selectedPaper.publishedLink && (
                  <a
                    href={selectedPaper.publishedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                  >
                    <i className="fas fa-external-link-alt mr-2"></i>
                    View Publication
                  </a>
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
