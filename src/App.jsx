import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Submit from './pages/Submit'
import Papers from './pages/Papers'
import Guidelines from './pages/Guidelines'
import Contact from './pages/Contact'
import FAQs from './pages/FAQs'
import Tools from './pages/Tools'
import Ethics from './pages/Ethics'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/papers" element={<Papers />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/ethics" element={<Ethics />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App 