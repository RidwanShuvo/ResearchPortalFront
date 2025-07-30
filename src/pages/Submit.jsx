import React, { useState, useRef } from 'react'

const Submit = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    email: '',
    department: '',
    universityName: 'Hajee Mohammad Danesh Science and Technology University',
    paperTitle: '',
    abstract: '',
    keywords: '',
    contactNumber: '',
    batch: '',
    level: '',
    semester: ''
  })
  const [file, setFile] = useState(null)
  const [fileInfo, setFileInfo] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [wordCount, setWordCount] = useState(0)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [submissionId, setSubmissionId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [status, setStatus] = useState('unpublished')
  const [publishedLink, setPublishedLink] = useState('')

  
  const fileInputRef = useRef(null)

  const departments = [
    { value: 'computer-science-engineering', label: 'Computer Science and Engineering' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'business', label: 'Business' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'fisheries', label: 'Fisheries' },
    { value: 'ece', label: 'ECE' }
  ]

  const levels = [
    { value: '1', label: 'Level 1' },
    { value: '2', label: 'Level 2' },
    { value: '3', label: 'Level 3' },
    { value: '4', label: 'Level 4' }
  ]

  const semesters = [
    { value: '1st', label: '1st Semester' },
    { value: '2nd', label: '2nd Semester' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (name === 'abstract') {
      const words = value.trim().split(/\s+/).filter(Boolean).length
      setWordCount(words)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (selectedFile) => {
    // Check if file is PDF
    if (selectedFile.type !== 'application/pdf') {
      alert('Please upload a PDF file only.')
      return
    }

    // Check file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit.')
      return
    }

    setFile(selectedFile)
    setFileInfo({
      name: selectedFile.name,
      size: formatFileSize(selectedFile.size)
    })
    simulateUpload()
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes'
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    else return (bytes / 1048576).toFixed(1) + ' MB'
  }

  const simulateUpload = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  const removeFile = () => {
    setFile(null)
    setFileInfo(null)
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const validateForm = () => {
    if (!file) {
      alert('Please upload your research paper.')
      return false
    }

    if (wordCount > 300) {
      alert('Abstract exceeds 300 word limit.')
      return false
    }

    if (status === 'published' && !publishedLink.trim()) {
      alert('Please provide a publication link for published papers.')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Try to submit to server first
      const formDataToSend = new FormData()
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key])
      })
      formDataToSend.append('file', file)
      formDataToSend.append('status', status)
      if (status === 'published') {
        formDataToSend.append('publishedLink', publishedLink)
      }

      const response = await fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        body: formDataToSend
      })

      if (response.ok) {
        // Server submission successful
        const data = await response.json()
        setSubmissionId(data.paper._id || ('SUB-' + Math.floor(10000 + Math.random() * 90000)))
        setShowSuccessModal(true)
        
        // Reset form
        setFormData({
          studentName: '',
          studentId: '',
          email: '',
          department: '',
          universityName: '',
          paperTitle: '',
          abstract: '',
          keywords: '',
          contactNumber: '',
          batch: '',
          level: '',
          semester: ''
        })
        setStatus('unpublished')
        setPublishedLink('')
        setFile(null)
        setFileInfo(null)
        setUploadProgress(0)
        setWordCount(0)
      } else {
        throw new Error('Server submission failed')
      }
    } catch (error) {
      console.error('Server submission error:', error)
      
      // Fallback to localStorage if server is not available
      try {
        // Generate submission ID
        const submissionId = 'SUB-' + Math.floor(10000 + Math.random() * 90000)
        
        // Create submission object
        const submission = {
          id: submissionId,
          ...formData,
          status: status,
          publishedLink: status === 'published' ? publishedLink : '',
          fileName: file.name,
          fileSize: file.size,
          submittedDate: new Date().toISOString(),
          submissionStatus: 'Pending',
          pdfUrl: URL.createObjectURL(file) // Create a blob URL for the file
        }

        // Store submission in localStorage for admin review
        const existingSubmissions = JSON.parse(localStorage.getItem('paperSubmissions') || '[]')
        existingSubmissions.push(submission)
        localStorage.setItem('paperSubmissions', JSON.stringify(existingSubmissions))

        setSubmissionId(submissionId)
        setShowSuccessModal(true)
        
        // Reset form
        setFormData({
          studentName: '',
          studentId: '',
          email: '',
          department: '',
          universityName: '',
          paperTitle: '',
          abstract: '',
          keywords: '',
          contactNumber: '',
          batch: '',
          level: '',
          semester: ''
        })
        setStatus('unpublished')
        setPublishedLink('')
        setFile(null)
        setFileInfo(null)
        setUploadProgress(0)
        setWordCount(0)
      } catch (localError) {
        console.error('Local submission error:', localError)
        alert('Submission failed. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeModal = () => {
    setShowSuccessModal(false)
  }

  return (
    <div className="flex-grow container mx-auto px-4 py-8 bg-blue-50">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Submit Required Information</h2>
          <p className="text-gray-600 mb-2">
            We're excited to see your research contributions! Use the form below to submit your paper. 
            Make sure your file meets the submission guidelines, and don't forget to double-check your abstract and keywords.
          </p>
          <p className="text-gray-600">Please fill in the details below and upload yours HSTU Myinfo profile as a PDF format.</p>
        </section>

        {/* Submission Form */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="student-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Author's Name
                </label>
                <input
                  type="text"
                  id="student-name"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="student-id" className="block text-sm font-medium text-gray-700 mb-1">
                  Student ID
                </label>
                <input
                  type="text"
                  id="student-id"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled>Select your department</option>
                  {departments.map(dept => (
                    <option key={dept.value} value={dept.value}>
                      {dept.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="contact-number" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contact-number"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+880 1XXX XXX XXX"
                  required
                />
              </div>
              <div>
                <label htmlFor="batch" className="block text-sm font-medium text-gray-700 mb-1">
                  Batch
                </label>
                <input
                  type="text"
                  id="batch"
                  name="batch"
                  value={formData.batch}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 2020-21"
                  required
                />
              </div>
              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                  Level
                </label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled>Select your level</option>
                  {levels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">
                  Semester
                </label>
                <select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled>Select your semester</option>
                  {semesters.map(semester => (
                    <option key={semester.value} value={semester.value}>
                      {semester.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* University Name */}
            <div>
              <label htmlFor="university-name" className="block text-sm font-medium text-gray-700 mb-1">
                University Name
              </label>
              <input
                type="text"
                id="university-name"
                name="universityName"
                value={formData.universityName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Paper Information */}
            <div>
              <label htmlFor="paper-title" className="block text-sm font-medium text-gray-700 mb-1">
                Research Paper Title
              </label>
              <input
                type="text"
                id="paper-title"
                name="paperTitle"
                value={formData.paperTitle}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Publication Status */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Status
  </label>
  <div className="flex items-center gap-4">
    <label className="flex items-center space-x-2">
      <input
        type="radio"
        name="status"
        value="published"
        checked={status === 'published'}
        onChange={(e) => setStatus(e.target.value)}
        className="form-radio text-blue-600"
      />
      <span>Published</span>
    </label>
    <label className="flex items-center space-x-2">
      <input
        type="radio"
        name="status"
        value="unpublished"
        checked={status === 'unpublished'}
        onChange={(e) => setStatus(e.target.value)}
        className="form-radio text-blue-600"
      />
      <span>Unpublished</span>
    </label>
  </div>
</div>

{/* Link input if published */}
{status === 'published' && (
  <div className="mt-4">
    <label htmlFor="published-link" className="block text-sm font-medium text-gray-700 mb-1">
      Publication Link
    </label>
    <input
      type="url"
      id="published-link"
      name="publishedLink"
      value={publishedLink}
      onChange={(e) => setPublishedLink(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder="https://yourpaperlink.com"
      required
    />
  </div>
)}


            <div>
              <label htmlFor="abstract" className="block text-sm font-medium text-gray-700 mb-1">
                Abstract (max 300 words)
              </label>
              <textarea
                id="abstract"
                name="abstract"
                rows="4"
                value={formData.abstract}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
              <p className={`text-sm mt-1 ${wordCount > 300 ? 'text-red-600' : 'text-gray-500'}`}>
                {wordCount}/300 words
              </p>
            </div>

            <div>
              <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
                Keywords (comma separated)
              </label>
              <input
                type="text"
                id="keywords"
                name="keywords"
                value={formData.keywords}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., machine learning, data analysis, sustainability"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Research Paper (PDF only)
              </label>
              <div
                className={`upload-area rounded-lg p-8 text-center cursor-pointer ${dragActive ? 'dragover' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-gray-700 mb-2">Drag and drop your file here or</p>
                  <span className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md cursor-pointer transition">
                    Browse Files
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <p className="text-sm text-gray-500 mt-2">Maximum file size: 10MB</p>
                </div>
              </div>

              {fileInfo && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-700">{fileInfo.name}</p>
                        <p className="text-xs text-gray-500">{fileInfo.size}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="progress-bar bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submission */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-6 rounded-md transition"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Paper'}
              </button>
            </div>
          </form>
        </section>

        {/* Guidelines Section */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Submission Guidelines</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Research papers must be submitted in PDF format only.</li>
            <li>Maximum file size is 10MB.</li>
            <li>Include a clear title that accurately reflects your research.</li>
            <li>The abstract should be concise and not exceed 300 words.</li>
            <li>Include 3-5 keywords that best represent your research.</li>
            <li>Ensure your paper follows the university's formatting guidelines.</li>
            <li>Submission deadline: <span className="font-medium">May 15, 2023, 11:59 PM</span></li>
          </ul>
        </section>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative z-10">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Submission Successful!</h3>
              <p className="text-gray-600 mb-6">
                Your research paper has been successfully submitted. You will receive a confirmation email shortly.
              </p>
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <p className="text-sm text-gray-600">
                  Submission ID: <span className="font-medium">{submissionId}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Date: <span className="font-medium">{new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()}</span>
                </p>
              </div>
              <button
                onClick={closeModal}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Submit 