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

  // No mock data needed - all data comes from MongoDB

  useEffect(() => {
    // Check if admin is logged in
    if (!isAdminLoggedIn) {
      navigate('/');
      return;
    }

    // Load papers from MongoDB database
    const loadPapers = async () => {
      setIsLoading(true);
      
      try {
        const response = await fetch('http://localhost:8000/api/papers');
        if (response.ok) {
          const serverPapers = await response.json();
          console.log('📄 Fetched papers from database:', serverPapers.length, 'papers');
          
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
          
          setPapers(formattedServerPapers);
          console.log('✅ Papers loaded successfully from database');
        } else {
          throw new Error('Server not available');
        }
      } catch (error) {
        console.error('❌ Server fetch error:', error);
        setPapers([]);
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
      // Update paper status on server
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
        
        console.log(`✅ Successfully updated paper ${paperId} status to ${newStatus}`);
      } else {
        console.error('❌ Failed to update status on server');
      }
    } catch (error) {
      console.error('❌ Error updating status:', error);
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
              <p className="text-xs text-blue-600 mt-1">
                <i className="fas fa-database mr-1"></i>
                Data Source: MongoDB Database
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setIsLoading(true);
                  loadPapers();
                }}
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center disabled:opacity-50"
              >
                <i className={`fas ${isLoading ? 'fa-spinner fa-spin' : 'fa-sync-alt'} mr-2`}></i>
                {isLoading ? 'Refreshing...' : 'Refresh'}
              </button>
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