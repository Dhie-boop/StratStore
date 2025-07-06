import { useState } from 'react'
import type { FC } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

const ContactPage: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Add form validation
    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }
    
    if (formData.message.length < 10) {
      toast.error('Message must be at least 10 characters long');
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Thank you! Your message has been sent successfully.');
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  // Framer motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-12 w-full bg-gradient-to-b from-gray-50 to-gray-100 overflow-x-hidden">
      {/* Hero Banner */}
      <section className="relative w-full bg-blue-600 text-white py-10 md:py-16 lg:py-20 mb-8 md:mb-12 lg:mb-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-indigo-800 opacity-90"></div>
          
          {/* Animated shapes */}
          <motion.div
            className="absolute -bottom-32 -right-32 w-64 h-64 bg-blue-500 rounded-full opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute top-16 -left-16 w-48 h-48 bg-blue-400 rounded-full opacity-20"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-32 h-32 bg-indigo-400 rounded-full opacity-20"
            animate={{
              scale: [1, 1.3, 1],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 via-transparent to-transparent"></div>
        </div>
        <div className="relative w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Get in <span className="text-blue-200">Touch</span>
          </motion.h1>
          <motion.p 
            className="mt-3 md:mt-4 lg:mt-6 text-center text-blue-100 max-w-3xl mx-auto text-sm md:text-base lg:text-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Have questions about our products or services? Our team is here to help you.
          </motion.p>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-6 md:py-10 lg:py-14">
        <div className="w-full max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 xl:gap-16 w-full">
            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
                Send Us a Message
              </motion.h2>
              
              {submitted ? (
                <motion.div 
                  className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 flex items-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Thank you! Your message has been sent successfully.</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full min-w-0">
                  <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe" 
                      className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full bg-gray-50 hover:bg-white transition-colors duration-200" 
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com" 
                      className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full bg-gray-50 hover:bg-white transition-colors duration-200" 
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full bg-gray-50 hover:bg-white transition-colors duration-200"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Product Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="partnership">Partnership Opportunity</option>
                    </select>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="How can we help you?" 
                      className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full min-h-[150px] resize-y bg-gray-50 hover:bg-white transition-colors duration-200" 
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="flex justify-end mt-2">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className={`relative bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-base transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center min-w-[150px] ${isSubmitting ? 'opacity-90' : ''}`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : 'Send Message'}
                    </button>
                  </motion.div>
                </form>
              )}
            </motion.div>
            
            {/* Contact Info */}
            <motion.div 
              className="lg:col-span-2 flex flex-col gap-5 w-full min-w-0"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div 
                variants={itemVariants} 
                className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-2 transform hover:-translate-y-1 transition-all duration-300 border border-gray-100/50"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white/50 rounded-2xl"></div>
                <h3 className="relative text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Contact Information</h3>
                <p className="relative text-gray-600 mb-6">Please feel free to reach out to us using any of the contact methods below.</p>
                
                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="bg-blue-100 p-3 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-base">Email</h4>
                      <a href="mailto:info@stratstore.com" className="text-blue-600 hover:text-blue-800 transition-colors">info@stratstore.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="bg-green-100 p-3 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-base">Phone</h4>
                      <a href="tel:+256787927092" className="text-gray-600 hover:text-gray-800 transition-colors">+256787927092</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="bg-yellow-100 p-3 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-base">Address</h4>
                      <p className="text-gray-600">Kavule<br />Business Center<br />Makerere</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Business Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center border-b pb-2 border-gray-200">
                    <span className="text-gray-600">Monday - Friday:</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center border-b pb-2 border-gray-200">
                    <span className="text-gray-600">Saturday:</span>
                    <span className="font-medium">Closed</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Sunday:</span>
                    <span className="font-medium text-red-600">10:00 AM - 4:00 PM</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="w-full max-w-screen-xl mx-auto">
          <motion.div 
            className="overflow-hidden rounded-2xl shadow-lg h-[300px] md:h-[400px] w-full relative bg-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7537356606223!2d32.5699361!3d0.3293088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb0931f4b093%3A0x3e4388056450c291!2sMakerere%20University%20Business%20School!5e0!3m2!1sen!2sug!4v1688379547959!5m2!1sen!2sug"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
            <div className="absolute bottom-4 right-4">
              <a
                href="https://goo.gl/maps/YOUR_LOCATION"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center space-x-2 text-gray-700 hover:text-blue-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Open in Google Maps</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-gray-100">
        <div className="w-full max-w-screen-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-800">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {[
              {
                q: "How quickly do you respond to inquiries?",
                a: "We typically respond to all inquiries within 24 business hours. For urgent matters, please contact us by phone."
              },
              {
                q: "Do you offer international shipping?",
                a: "Yes, we ship to most countries worldwide. Shipping rates and delivery times vary by location."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal including Mobile Money (MTN, Airtel), and bank transfers for orders."
              },
              {
                q: "Can I schedule a video consultation?",
                a: "Absolutely! You can schedule a video consultation through our booking system or by contacting our support team."
              }
            ].map((faq, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>      
      </section>
    </div>
  );
}

export default ContactPage
