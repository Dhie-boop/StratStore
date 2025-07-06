import React, { useState } from 'react'
import { FaHeadset, FaEnvelope, FaPhone, FaQuestionCircle, FaPaperPlane } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

const CustomerSupport: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement support ticket submission
    toast.success('Support ticket submitted successfully!')
    setContactForm({ subject: '', message: '', priority: 'medium' })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setContactForm(prev => ({ ...prev, [name]: value }))
  }

  const supportOptions = [
    {
      icon: <FaHeadset className="text-3xl text-blue-600" />,
      title: 'Live Chat',
      description: 'Chat with our support team',
      status: 'Available 24/7',
      action: 'Start Chat'
    },
    {
      icon: <FaEnvelope className="text-3xl text-green-600" />,
      title: 'Email Support',
      description: 'Send us an email',
      status: 'Response within 24h',
      action: 'Send Email'
    },
    {
      icon: <FaPhone className="text-3xl text-purple-600" />,
      title: 'Phone Support',
      description: 'Call our support line',
      status: 'Mon-Fri 9AM-6PM',
      action: 'Call Now'
    }
  ]

  const faqs = [
    {
      question: 'How do I track my order?',
      answer: 'You can track your order in the "My Orders" section of your dashboard.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all items in original condition.'
    },
    {
      question: 'How do I change my shipping address?',
      answer: 'You can update your shipping address in your profile settings.'
    },
    {
      question: 'How do I cancel my order?',
      answer: 'Orders can be cancelled within 1 hour of placement through your order history.'
    }
  ]

  return (
    <div className="w-full h-full space-y-6 bg-gray-50">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center space-x-3">
          <FaHeadset className="text-3xl text-blue-600" />
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Customer Support</h1>
            <p className="text-gray-600">We're here to help you with any questions or issues</p>
          </div>
        </div>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportOptions.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              {option.icon}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{option.title}</h3>
                <p className="text-gray-600">{option.description}</p>
                <p className="text-sm text-green-600 font-medium">{option.status}</p>
              </div>
              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {option.action}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Submit a Support Ticket</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={contactForm.subject}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of your issue"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                name="priority"
                value={contactForm.priority}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Please describe your issue in detail..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaPaperPlane />
              <span>Submit Ticket</span>
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex items-start space-x-3">
                  <FaQuestionCircle className="text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Can't find what you're looking for?{' '}
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Contact our support team
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerSupport
