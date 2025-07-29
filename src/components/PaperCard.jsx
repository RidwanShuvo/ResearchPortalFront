import React, { useState } from 'react';

const PaperCard = ({ paper, onStatusUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showFullAbstract, setShowFullAbstract] = useState(false);

  const handleStatusUpdate = async (newStatus) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onStatusUpdate(paper.id, newStatus);
    setIsLoading(false);
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'Pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Approved':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Rejected':
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
        <span className={getStatusBadge(paper.status)}>
          {paper.status}
        </span>
      </div>

      <div className="mb-4 space-y-2">
        <p className="text-gray-600">
          <strong>Author:</strong> {paper.author}
        </p>
        <p className="text-gray-600">
          <strong>Institution:</strong> {paper.institution}
        </p>
        <p className="text-gray-600">
          <strong>Submitted:</strong> {paper.submittedDate}
        </p>
        <p className="text-gray-600">
          <strong>Category:</strong> {paper.category}
        </p>
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
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">PDF:</h4>
        <div className="flex items-center space-x-4">
          <a
            href={paper.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <i className="fas fa-file-pdf mr-2"></i>
            View PDF
          </a>
          <a
            href={paper.pdfUrl}
            download
            className="text-green-600 hover:text-green-800 flex items-center"
          >
            <i className="fas fa-download mr-2"></i>
            Download
          </a>
        </div>
      </div>

      {paper.status === 'Pending' && (
        <div className="flex space-x-3">
          <button
            onClick={() => handleStatusUpdate('Approved')}
            disabled={isLoading}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <>
                <i className="fas fa-check mr-2"></i>
                Approve
              </>
            )}
          </button>
          <button
            onClick={() => handleStatusUpdate('Rejected')}
            disabled={isLoading}
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <>
                <i className="fas fa-times mr-2"></i>
                Reject
              </>
            )}
          </button>
        </div>
      )}

      {paper.status === 'Approved' && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3">
          <p className="text-green-700 text-sm flex items-center">
            <i className="fas fa-check-circle mr-2"></i>
            This paper has been approved and is now visible to users.
          </p>
        </div>
      )}

      {paper.status === 'Rejected' && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-700 text-sm flex items-center">
            <i className="fas fa-times-circle mr-2"></i>
            This paper has been rejected and is not visible to users.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaperCard; 