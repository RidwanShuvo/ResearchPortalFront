import React, { useState } from 'react';

const PaperCard = ({ paper, onStatusUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showFullAbstract, setShowFullAbstract] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleStatusUpdate = async (newStatus) => {
    setIsLoading(true);
    try {
      // Use paper.id (which is set in AdminApproval from either _id or localStorage id)
      await onStatusUpdate(paper.id, newStatus);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      alert('Failed to update status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    const statusLower = status?.toLowerCase() || '';
    switch (statusLower) {
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'approved':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const truncateAbstract = (abstract, maxLength = 150) => {
    if (abstract.length <= maxLength) return abstract;
    return abstract.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800 flex-1 mr-4">
          {paper.title}
        </h3>
        <div className="flex flex-col items-end space-y-1">
          <span className={getStatusBadge(paper.status)}>
            {paper.status ? paper.status.charAt(0).toUpperCase() + paper.status.slice(1).toLowerCase() : 'Unknown'}
          </span>
        </div>
      </div>

      <div className="mb-4 space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600"><strong>Author:</strong> {paper.author}</p>
            <p className="text-gray-600"><strong>Student ID:</strong> {paper.studentId}</p>
            <p className="text-gray-600"><strong>Email:</strong> {paper.email}</p>
            <p className="text-gray-600"><strong>Contact:</strong> {paper.contactNumber}</p>
          </div>
          <div>
            <p className="text-gray-600"><strong>Department:</strong> {paper.category}</p>
            <p className="text-gray-600"><strong>Batch:</strong> {paper.batch}</p>
            <p className="text-gray-600"><strong>Level:</strong> {paper.level}</p>
            <p className="text-gray-600"><strong>Semester:</strong> {paper.semester}</p>
          </div>
        </div>
        <p className="text-gray-600"><strong>Submitted:</strong> {paper.submittedDate}</p>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2">Abstract:</h4>
        <p className="text-gray-600">
          {showFullAbstract ? paper.abstract : truncateAbstract(paper.abstract)}
        </p>
        {paper.abstract.length > 150 && (
          <button
            onClick={() => setShowFullAbstract(!showFullAbstract)}
            className="text-blue-600 hover:text-blue-800 text-sm mt-1"
          >
            {showFullAbstract ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2">Keywords:</h4>
        <div className="flex flex-wrap gap-2">
          {paper.keywords.map((keyword, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2">Publication Status:</h4>
        <div className="flex items-center space-x-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            paper.publicationStatus === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {paper.publicationStatus === 'published' ? 'Published' : 'Unpublished'}
          </span>
          {paper.publishedLink && (
            <a
              href={paper.publishedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
            >
              <i className="fas fa-external-link-alt mr-1"></i>
              View Publication
            </a>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">PDF:</h4>
        <div className="flex items-center space-x-4">
          {paper.pdfUrl && paper.pdfUrl.trim() !== '' ? (
            <>
              <a
                href={paper.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center"
                onClick={(e) => {
                  if (!paper.pdfUrl.startsWith('http')) {
                    e.preventDefault();
                    alert('PDF URL is not accessible. Please check the file upload.');
                  }
                }}
              >
                <i className="fas fa-file-pdf mr-2"></i>
                View PDF
              </a>
              <a
                href={paper.pdfUrl}
                download={`${paper.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`}
                className="text-green-600 hover:text-green-800 flex items-center"
                onClick={(e) => {
                  if (!paper.pdfUrl.startsWith('http')) {
                    e.preventDefault();
                    alert('PDF URL is not accessible. Please check the file upload.');
                  }
                }}
              >
                <i className="fas fa-download mr-2"></i>
                Download
              </a>
            </>
          ) : (
            <span className="text-gray-500 text-sm">PDF not available</span>
          )}
        </div>
      </div>

      {paper.status?.toLowerCase() === 'pending' && (
        <div className="flex space-x-3">
          <button
            onClick={() => handleStatusUpdate('Approved')}
            disabled={isLoading}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : <><i className="fas fa-check mr-2"></i>Approve</>}
          </button>
          <button
            onClick={() => handleStatusUpdate('Rejected')}
            disabled={isLoading}
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : <><i className="fas fa-times mr-2"></i>Reject</>}
          </button>
        </div>
      )}

      {paper.status?.toLowerCase() === 'approved' && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3">
          <p className="text-green-700 text-sm flex items-center">
            <i className="fas fa-check-circle mr-2"></i>
            This paper has been approved and is now visible to users.
          </p>
        </div>
      )}

      {paper.status?.toLowerCase() === 'rejected' && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-700 text-sm flex items-center">
            <i className="fas fa-times-circle mr-2"></i>
            This paper has been rejected and is not visible to users.
          </p>
        </div>
      )}

      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50">
          <p className="flex items-center">
            <i className="fas fa-check-circle mr-2"></i>
            Status updated successfully!
          </p>
        </div>
      )}
    </div>
  );
};

export default PaperCard;
