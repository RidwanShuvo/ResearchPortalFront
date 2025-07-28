document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('submission-form');
    const fileUpload = document.getElementById('file-upload');
    const uploadArea = document.getElementById('upload-area');
    const fileInfo = document.getElementById('file-info');
    const fileName = document.getElementById('file-name');
    const fileSize = document.getElementById('file-size');
    const removeFile = document.getElementById('remove-file');
    const progressBar = document.getElementById('progress-bar');
    const submitBtn = document.getElementById('submit-btn');
    const abstract = document.getElementById('abstract');
    const wordCount = document.getElementById('word-count');

    let selectedFile = null;

    // Word count for abstract
    abstract.addEventListener('input', function() {
        const words = this.value.trim().split(/\s+/).filter(word => word.length > 0);
        const count = words.length;
        wordCount.textContent = count;
        
        if (count > 300) {
            wordCount.classList.add('text-red-500');
            wordCount.classList.remove('text-gray-500');
        } else {
            wordCount.classList.remove('text-red-500');
            wordCount.classList.add('text-gray-500');
        }
    });

    // File upload handling
    fileUpload.addEventListener('change', handleFileSelect);
    
    // Drag and drop functionality
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('border-blue-500', 'bg-blue-50');
    });

    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('border-blue-500', 'bg-blue-50');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('border-blue-500', 'bg-blue-50');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileUpload.files = files;
            handleFileSelect();
        }
    });

    function handleFileSelect() {
        const file = fileUpload.files[0];
        if (file) {
            // Validate file type
            if (file.type !== 'application/pdf') {
                alert('Please select a PDF file only.');
                return;
            }

            // Validate file size (10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert('File size must be less than 10MB.');
                return;
            }

            selectedFile = file;
            fileName.textContent = file.name;
            fileSize.textContent = formatFileSize(file.size);
            fileInfo.classList.remove('hidden');
            uploadArea.classList.add('hidden');
        }
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Remove file
    removeFile.addEventListener('click', () => {
        selectedFile = null;
        fileUpload.value = '';
        fileInfo.classList.add('hidden');
        uploadArea.classList.remove('hidden');
    });

    // Form submission
    let isSubmitting = false; // Flag to prevent multiple submissions
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Prevent multiple submissions
        if (isSubmitting) {
            console.log('Form is already being submitted, ignoring duplicate submission');
            return;
        }

        if (!selectedFile) {
            alert('Please select a PDF file to upload.');
            return;
        }

        // Validate abstract word count
        const abstractWords = abstract.value.trim().split(/\s+/).filter(word => word.length > 0);
        if (abstractWords.length > 300) {
            alert('Abstract must not exceed 300 words.');
            return;
        }

        // Set submitting flag
        isSubmitting = true;

        // Disable submit button and show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Submitting...';

        // Create FormData
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('studentName', document.getElementById('student-name').value);
        formData.append('studentId', document.getElementById('student-id').value);
        formData.append('email', document.getElementById('email').value);
        formData.append('department', document.getElementById('department').value);
        formData.append('universityName', document.getElementById('university-name').value);
        formData.append('paperTitle', document.getElementById('paper-title').value);
        formData.append('abstract', document.getElementById('abstract').value);
        formData.append('keywords', document.getElementById('keywords').value);

        try {
            console.log('Starting form submission...');
            
            // Simulate progress
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress > 90) progress = 90;
                progressBar.style.width = progress + '%';
            }, 200);

            console.log('Sending request to server...');
            const response = await fetch('http://localhost:5000/submit', {
                method: 'POST',
                body: formData
            });
            console.log('Response received:', response.status);

            clearInterval(progressInterval);
            progressBar.style.width = '100%';

            if (response.ok) {
                const result = await response.json();
                console.log('Submission successful:', result);
                showSuccessModal(result.paperId);
                form.reset();
                selectedFile = null;
                fileInfo.classList.add('hidden');
                uploadArea.classList.remove('hidden');
                wordCount.textContent = '0';
            } else {
                const error = await response.json();
                console.log('Submission failed:', error);
                throw new Error(error.error || 'Submission failed');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Submission failed: ' + error.message);
        } finally {
            // Reset submitting flag and re-enable submit button
            isSubmitting = false;
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Submit Paper';
        }
    });

    function showSuccessModal(paperId) {
        const modal = document.getElementById('success-modal');
        const submissionId = document.getElementById('submission-id');
        const submissionDate = document.getElementById('submission-date');
        const closeBtn = document.getElementById('close-modal');

        submissionId.textContent = paperId;
        submissionDate.textContent = new Date().toLocaleDateString();

        modal.classList.remove('hidden');

        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }
}); 