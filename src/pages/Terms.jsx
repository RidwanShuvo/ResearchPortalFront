import React from 'react'

const Terms = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">Terms of Use</h1>
        <p className="text-gray-600 mb-8">Last updated: January 2024</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing and using this research portal, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Use License</h2>
            <p className="text-gray-700 mb-4">
              Permission is granted to temporarily access the materials on Research Portal's website for personal, 
              non-commercial transitory viewing only.
            </p>
            <p className="text-gray-700 mb-4">This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">User Responsibilities</h2>
            <p className="text-gray-700 mb-4">As a user of this platform, you agree to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Provide accurate and complete information when submitting research papers</li>
              <li>Ensure all submitted content is original and properly cited</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not engage in any activity that could harm the platform or other users</li>
              <li>Respect intellectual property rights of others</li>
              <li>Maintain the confidentiality of your account credentials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              The content on this website, including but not limited to text, graphics, images, and software, 
              is the property of Research Portal and is protected by copyright laws.
            </p>
            <p className="text-gray-700">
              Research papers submitted to the portal remain the intellectual property of their authors. 
              By submitting a paper, authors grant Research Portal a non-exclusive license to publish and distribute the work.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Disclaimer</h2>
            <p className="text-gray-700 mb-4">
              The materials on Research Portal's website are provided on an 'as is' basis. Research Portal makes no warranties, 
              expressed or implied, and hereby disclaims and negates all other warranties including without limitation, 
              implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement 
              of intellectual property or other violation of rights.
            </p>
            <p className="text-gray-700">
              Further, Research Portal does not warrant or make any representations concerning the accuracy, 
              likely results, or reliability of the use of the materials on its website or otherwise relating 
              to such materials or on any sites linked to this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Limitations</h2>
            <p className="text-gray-700">
              In no event shall Research Portal or its suppliers be liable for any damages (including, without limitation, 
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
              to use the materials on Research Portal's website, even if Research Portal or a Research Portal authorized 
              representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Revisions and Errata</h2>
            <p className="text-gray-700">
              The materials appearing on Research Portal's website could include technical, typographical, or photographic errors. 
              Research Portal does not warrant that any of the materials on its website are accurate, complete, or current. 
              Research Portal may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Links</h2>
            <p className="text-gray-700">
              Research Portal has not reviewed all of the sites linked to its website and is not responsible for the contents 
              of any such linked site. The inclusion of any link does not imply endorsement by Research Portal of the site. 
              Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Modifications</h2>
            <p className="text-gray-700">
              Research Portal may revise these terms of use for its website at any time without notice. By using this website, 
              you are agreeing to be bound by the then current version of these Terms and Conditions of Use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Governing Law</h2>
            <p className="text-gray-700">
              These terms and conditions are governed by and construed in accordance with the laws and you irrevocably 
              submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Use, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> legal@researchportal.edu<br/>
                <strong>Phone:</strong> +1 (555) 123-4567<br/>
                <strong>Address:</strong> Research Portal, University Address
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Terms 