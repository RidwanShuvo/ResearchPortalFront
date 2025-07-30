import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import PaperCard from '../components/PaperCard';

const AdminApproval = () => {
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });
  const navigate = useNavigate();
  const { isAdminLoggedIn, logout } = useAdmin();

  // Mock data for submitted papers
  const mockPapers = [
    {
      id: 1,
      title: "Machine Learning Applications in Healthcare",
      author: "Dr. Sarah Johnson",
      institution: "Stanford University",
      submittedDate: "2025-01-15",
      category: "Computer Science",
      abstract: "This research explores the implementation of machine learning algorithms in healthcare diagnostics, focusing on early disease detection and patient outcome prediction. The study utilizes deep learning models trained on large datasets of medical imaging and patient records to improve diagnostic accuracy and reduce healthcare costs.",
      keywords: ["Machine Learning", "Healthcare", "Diagnostics", "Deep Learning"],
      status: "Pending",
      pdfUrl: "/pdf/advancingExchange.pdf"
    },
    {
      id: 2,
      title: "Renewable Energy Integration in Smart Grids",
      author: "Prof. Michael Chen",
      institution: "MIT",
      submittedDate: "2025-01-10",
      category: "Engineering",
      abstract: "A comprehensive analysis of renewable energy integration challenges in modern smart grid systems. The research examines grid stability, energy storage solutions, and demand response mechanisms for sustainable energy distribution.",
      keywords: ["Renewable Energy", "Smart Grids", "Energy Storage", "Sustainability"],
      status: "Approved",
      pdfUrl: "/pdf/cultural.pdf"
    },
    {
      id: 3,
      title: "Climate Change Impact on Agricultural Productivity",
      author: "Dr. Maria Rodriguez",
      institution: "University of California",
      submittedDate: "2025-01-08",
      category: "Environmental Science",
      abstract: "Long-term study analyzing the effects of climate change on agricultural yields across different regions. The research provides data-driven insights for developing climate-resilient farming practices and food security strategies.",
      keywords: ["Climate Change", "Agriculture", "Food Security", "Sustainability"],
      status: "Pending",
      pdfUrl: "/pdf/motamot.pdf"
    },
    {
      id: 4,
      title: "Blockchain Technology in Supply Chain Management",
      author: "Dr. James Wilson",
      institution: "Harvard Business School",
      submittedDate: "2025-01-05",
      category: "Business",
      abstract: "Investigation of blockchain applications in supply chain transparency and traceability. The study evaluates implementation challenges, cost-benefit analysis, and regulatory considerations for widespread adoption.",
      keywords: ["Blockchain", "Supply Chain", "Transparency", "Traceability"],
      status: "Rejected",
      pdfUrl: "/pdf/advancingExchange.pdf"
    },
    {
      id: 5,
      title: "Neural Network Optimization for Image Recognition",
      author: "Dr. Emily Zhang",
      institution: "Carnegie Mellon University",
      submittedDate: "2025-01-12",
      category: "Computer Science",
      abstract: "Novel approaches to neural network architecture optimization for improved image recognition accuracy. The research introduces new training methodologies and network structures that achieve state-of-the-art performance on benchmark datasets.",
      keywords: ["Neural Networks", "Image Recognition", "Deep Learning", "Optimization"],
      status: "Approved",
      pdfUrl: "/pdf/cultural.pdf"
    },
    {
      id: 6,
      title: "Social Media Influence on Political Discourse",
      author: "Prof. David Thompson",
      institution: "Yale University",
      submittedDate: "2025-01-14",
      category: "Social Sciences",
      abstract: "Analysis of social media's role in shaping political opinions and public discourse. The study examines echo chambers, misinformation spread, and the impact of algorithmic content curation on democratic processes.",
      keywords: ["Social Media", "Politics", "Misinformation", "Democracy"],
      status: "Pending",
      pdfUrl: "/pdf/motamot.pdf"
    }
  ];

  useEffect(() => {
    // Check if admin is logged in
    if (!isAdminLoggedIn) {
      navigate('/');
      return;
    }

    // Load papers from server and localStorage
    const loadPapers = async () => {
      setIsLoading(true);
      
      try {
        // Try to fetch from server first
        const response = await fetch('http://localhost:8000/api/papers');
        if (response.ok) {
          const serverPapers = await response.json();
          const formattedServerPapers = serverPapers.map(paper => ({
            id: paper._id,
            title: paper.paperTitle || 'Untitled',
            author: paper.studentName || 'Unknown Author',
            institution: paper.universityName || 'Unknown Institution',
            submittedDate: paper.submittedAt ? new Date(paper.submittedAt).toLocaleDateString() : 'Unknown Date',
            category: paper.department || 'Unknown Department',
            abstract: paper.abstract || 'No abstract available',
            keywords: paper.keywords ? paper.keywords.split(',').map(k => k.trim()).filter(k => k) : [],
            status: paper.submissionStatus === 'pending' ? 'Pending' : 
                   paper.submissionStatus === 'approved' ? 'Approved' : 
                   paper.submissionStatus === 'rejected' ? 'Rejected' : 'Pending',
            pdfUrl: paper.cloudinaryUrl || null,
            email: paper.email || 'No email provided',
            studentId: paper.studentId || 'No ID provided',
            contactNumber: paper.contactNumber || 'No contact provided',
            batch: paper.batch || 'No batch info',
            level: paper.level || 'No level info',
            semester: paper.semester || 'No semester info',
            publicationStatus: paper.status || 'unpublished',
            publishedLink: paper.publishedLink || null
          }));
          
          // Get submissions from localStorage as fallback
          const submissions = JSON.parse(localStorage.getItem('paperSubmissions') || '[]');
          const papersFromSubmissions = submissions.map(submission => ({
            id: submission.id,
            title: submission.paperTitle,
            author: submission.studentName,
            institution: submission.universityName,
            submittedDate: new Date(submission.submittedDate).toLocaleDateString(),
            category: submission.department,
            abstract: submission.abstract,
            keywords: submission.keywords.split(',').map(k => k.trim()).filter(k => k),
            status: submission.submissionStatus || 'Pending',
            pdfUrl: submission.pdfUrl,
            email: submission.email,
            studentId: submission.studentId,
            contactNumber: submission.contactNumber,
            batch: submission.batch,
            level: submission.level,
            semester: submission.semester,
            publicationStatus: submission.status,
            publishedLink: submission.publishedLink
          }));

          // Combine server papers, localStorage papers, and mock data
          const allPapers = [...mockPapers, ...formattedServerPapers, ...papersFromSubmissions];
          setPapers(allPapers);
        } else {
          throw new Error('Server not available');
        }
      } catch (error) {
        console.error('Server fetch error:', error);
        
        // Fallback to localStorage only
        const submissions = JSON.parse(localStorage.getItem('paperSubmissions') || '[]');
        const papersFromSubmissions = submissions.map(submission => ({
          id: submission.id,
          title: submission.paperTitle,
          author: submission.studentName,
          institution: submission.universityName,
          submittedDate: new Date(submission.submittedDate).toLocaleDateString(),
          category: submission.department,
          abstract: submission.abstract,
          keywords: submission.keywords.split(',').map(k => k.trim()).filter(k => k),
          status: submission.submissionStatus || 'Pending',
          pdfUrl: submission.pdfUrl,
          email: submission.email,
          studentId: submission.studentId,
          contactNumber: submission.contactNumber,
          batch: submission.batch,
          level: submission.level,
          semester: submission.semester,
          publicationStatus: submission.status,
          publishedLink: submission.publishedLink
        }));

        const allPapers = [...mockPapers, ...papersFromSubmissions];
        setPapers(allPapers);
      }
      
      setIsLoading(false);
    };

    loadPapers();
  }, [isAdminLoggedIn, navigate]);

  useEffect(() => {
    // Calculate stats
    const newStats = {
      total: papers.length,
      pending: papers.filter(p => p.status?.toLowerCase() === 'pending').length,
      approved: papers.filter(p => p.status?.toLowerCase() === 'approved').length,
      rejected: papers.filter(p => p.status?.toLowerCase() === 'rejected').length
    };
    setStats(newStats);

    // Filter papers
    let filtered = papers;
    
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(paper => 
        paper.status?.toLowerCase() === selectedStatus.toLowerCase()
      );
    }
    
    if (searchTerm) {
      filtered = filtered.filter(paper => 
        paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.institution.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredPapers(filtered);
  }, [papers, selectedStatus, searchTerm]);

  const handleStatusUpdate = async (paperId, newStatus) => {
    try {
      // Check if this is a mock paper (numeric ID) or real paper (ObjectId)
      const isMockPaper = typeof paperId === 'number' || (typeof paperId === 'string' && /^\d+$/.test(paperId));
      
      if (isMockPaper) {
        // For mock papers, only update local state
        setPapers(prevPapers => 
          prevPapers.map(paper => 
            paper.id === paperId 
              ? { ...paper, status: newStatus }
              : paper
          )
        );
        console.log(`Updated mock paper ${paperId} status to ${newStatus}`);
        return;
      }

      // For real papers, update on server first
      const response = await fetch(`http://localhost:8000/api/papers/${paperId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus.toLowerCase() }),
      });

      if (response.ok) {
        // Update local state
        setPapers(prevPapers => 
          prevPapers.map(paper => 
            paper.id === paperId 
              ? { ...paper, status: newStatus }
              : paper
          )
        );

        // Update localStorage as fallback
        const submissions = JSON.parse(localStorage.getItem('paperSubmissions') || '[]');
        const updatedSubmissions = submissions.map(submission => 
          submission.id === paperId 
            ? { ...submission, submissionStatus: newStatus }
            : submission
        );
        localStorage.setItem('paperSubmissions', JSON.stringify(updatedSubmissions));
        
        console.log(`Successfully updated paper ${paperId} status to ${newStatus}`);
      } else {
        console.error('Failed to update status on server');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
          <p className="text-gray-600">Loading papers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600">Research Paper Approval System</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, Admin
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="bg-blue-600 text-white p-3 rounded-full">
                  <i className="fas fa-file-alt"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Papers</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="bg-yellow-600 text-white p-3 rounded-full">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="bg-green-600 text-white p-3 rounded-full">
                  <i className="fas fa-check"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="bg-red-600 text-white p-3 rounded-full">
                  <i className="fas fa-times"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  selectedStatus === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Papers ({stats.total})
              </button>
              <button
                onClick={() => setSelectedStatus('Pending')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  selectedStatus === 'Pending'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending ({stats.pending})
              </button>
              <button
                onClick={() => setSelectedStatus('Approved')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  selectedStatus === 'Approved'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Approved ({stats.approved})
              </button>
              <button
                onClick={() => setSelectedStatus('Rejected')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  selectedStatus === 'Rejected'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Rejected ({stats.rejected})
              </button>
            </div>
            
            <div className="w-full md:w-1/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search papers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Papers List */}
      <section className="container mx-auto px-6 py-8">
        {filteredPapers.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-inbox text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-600 text-lg">
              {searchTerm || selectedStatus !== 'all' 
                ? 'No papers match your search criteria.'
                : 'No papers found.'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPapers.map(paper => (
              <PaperCard
                key={paper.id}
                paper={paper}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminApproval; 