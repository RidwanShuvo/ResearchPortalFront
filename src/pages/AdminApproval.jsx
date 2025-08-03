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
    published: 0,
    unpublished: 0,
    rejected: 0
  });
  const navigate = useNavigate();
  const { isAdminLoggedIn, logout } = useAdmin();

  const loadPapers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/papers', {
        credentials: 'include',
      });
      if (response.ok) {
        const serverPapers = await response.json();
        console.log(serverPapers);
        
        // Handle the data structure
        let papersData = [];
        if (serverPapers.success && serverPapers.data) {
          papersData = serverPapers.data;
        } else if (Array.isArray(serverPapers)) {
          papersData = serverPapers;
        }

        const formatted = papersData.map(paper => ({
          id: paper._id,
          title: paper.paperTitle || 'Untitled',
          author: paper.studentName || 'Unknown Author',
          institution: paper.universityName || 'Unknown Institution',
          submittedDate: paper.submittedAt ? new Date(paper.submittedAt).toLocaleDateString() : 'Unknown Date',
          category: paper.department || 'Unknown Department',
          abstract: paper.abstract || 'No abstract available',
          keywords: paper.keywords ? paper.keywords.split(',').map(k => k.trim()).filter(k => k) : [],
          status: paper.submissionStatus === 'pending' ? 'Pending'
            : paper.submissionStatus === 'approved' ? 'Approved'
            : paper.submissionStatus === 'rejected' ? 'Rejected'
            : 'Pending',
          publicationStatus: paper.status || 'unpublished',
          pdfUrl: paper.cloudinaryUrl || null,
          email: paper.email || 'No email provided',
          studentId: paper.studentId || 'No ID provided',
          contactNumber: paper.contactNumber || 'No contact provided',
          batch: paper.batch || 'No batch info',
          level: paper.level || 'No level info',
          semester: paper.semester || 'No semester info',
          publishedLink: paper.publishedLink || null
        }));
        setPapers(formatted);
      } else {
        throw new Error('Server not responding');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setPapers([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate('/');
      return;
    }
    loadPapers();
  }, [isAdminLoggedIn, navigate]);

  useEffect(() => {
    const newStats = {
      total: papers.length,
      pending: papers.filter(p => p.status?.toLowerCase() === 'pending').length,
      published: papers.filter(p => p.publicationStatus === 'published').length,
      unpublished: papers.filter(p => p.publicationStatus === 'unpublished').length,
      rejected: papers.filter(p => p.status?.toLowerCase() === 'rejected').length
    };
    setStats(newStats);

    let filtered = papers;

    if (selectedStatus !== 'all') {
      if (selectedStatus === 'Published') {
        filtered = filtered.filter(paper => paper.publicationStatus === 'published');
      } else if (selectedStatus === 'Unpublished') {
        filtered = filtered.filter(paper => paper.publicationStatus === 'unpublished');
      } else {
        filtered = filtered.filter(paper =>
          paper.status?.toLowerCase() === selectedStatus.toLowerCase()
        );
      }
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

  // Updated Status update function with publication type:
  const handleStatusUpdate = async (paperId, newStatus, publicationType = null) => {
    try {
      const requestBody = { status: newStatus.toLowerCase() };
      
      // Add publicationType for approved papers
      if (newStatus.toLowerCase() === 'approved' && publicationType) {
        requestBody.publicationType = publicationType;
      }

      const response = await fetch(`http://localhost:5000/api/papers/${paperId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Reload full papers list from backend after updating status
        await loadPapers();

        // Reset filter so updated list shows properly
        setSelectedStatus('all');

        console.log(`✅ Updated ${paperId} to ${newStatus}${publicationType ? ` (${publicationType})` : ''}`);
      } else {
        console.error('❌ Server did not update status');
      }
    } catch (error) {
      console.error('❌ Status update failed:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-blue-600">Research Paper Approval System</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={loadPapers}
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Filter Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-6 py-4 flex flex-wrap justify-between gap-4">
          <div className="flex gap-2 flex-wrap">
            {['all', 'Pending', 'Published', 'Unpublished', 'Rejected'].map(status => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedStatus === status
                    ? status === 'Pending' ? 'bg-yellow-600 text-white'
                    : status === 'Published' ? 'bg-green-600 text-white'
                    : status === 'Unpublished' ? 'bg-orange-600 text-white'
                    : status === 'Rejected' ? 'bg-red-600 text-white'
                    : 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status} ({stats[status.toLowerCase()] || stats.total})
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search papers..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
      </section>

      {/* Paper List */}
      <section className="container mx-auto px-6 py-8">
        {filteredPapers.length === 0 ? (
          <div className="text-center text-gray-500">No papers found.</div>
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
