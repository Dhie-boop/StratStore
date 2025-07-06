import { useRef } from 'react';
import type { FC } from 'react';
import { motion, useInView } from 'framer-motion';

const AboutPage: FC = () => {
  // References for scroll animations
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  
  // Track if sections are in view
  const heroInView = useInView(heroRef, { once: true, margin: "0px 0px -200px 0px" });
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" });

  // Motion variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };
  
  // Team members data
  const teamMembers = [
    {
      name: 'Dhieu David',
      role: 'CEO & Founder',
      image: 'https://placehold.co/300x300/eee/ccc?text=Jane',
      bio: 'Visionary leader with over 15 years of industry experience.'
    },
    {
      name: 'Dhieu David',
      role: 'CTO',
      image: 'https://placehold.co/300x300/eee/ccc?text=John',
      bio: 'Tech innovator driving our product development and digital strategy.'
    },
    {
      name: 'Dhieu David',
      role: 'Design Director',
      image: 'https://placehold.co/300x300/eee/ccc?text=David',
      bio: 'Award-winning designer with passion for user-centric experiences.'
    },
    {
      name: 'Dhieu David',
      role: 'Marketing Manager',
      image: 'https://placehold.co/300x300/eee/ccc?text=Sarah',
      bio: 'Creative strategist leading our brand growth and customer engagement.'
    }
  ];
  
  // Company values
  const values = [
    {
      title: 'Quality',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      description: 'We never compromise on quality, ensuring every product meets our high standards.'
    },
    {
      title: 'Innovation',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      description: 'We constantly seek new ideas and technologies to improve our products and services.'
    },
    {
      title: 'Sustainability',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: "We're committed to environmentally friendly practices throughout our business operations."
    },
    {
      title: 'Customer Focus',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: 'We put our customers first, striving to exceed expectations with every interaction.'
    }
  ];

  return (
    <div className="min-h-screen pt-16 pb-12 w-full bg-gradient-to-b from-gray-50 to-gray-100 overflow-x-hidden">
      {/* Hero Banner */}
      <section 
        ref={heroRef}
        className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 md:py-20 lg:py-24 mb-12 md:mb-16 lg:mb-20 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-800/30 to-transparent"></div>
          <div className="absolute inset-0">
            <div className="absolute w-full h-full opacity-30">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="absolute top-0 bottom-0" style={{ left: `${i * 20}%`, width: '1px' }}>
                  <div className="h-full w-px bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500 rounded-full opacity-30 blur-[100px] animate-pulse"></div>
          <div className="absolute top-16 -left-16 w-72 h-72 bg-indigo-500 rounded-full opacity-30 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="relative w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            Our <span className="text-blue-200">Journey</span> of Excellence
          </motion.h1>
          <motion.p 
            className="mt-4 md:mt-6 text-center text-blue-100 max-w-3xl mx-auto text-base md:text-lg lg:text-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Designing and delivering premium products since 2025, with a commitment to quality, innovation, and customer satisfaction.
          </motion.p>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section 
        ref={storyRef}
        className="w-full px-4 sm:px-6 py-12 md:py-16 lg:py-20"
      >
        <div className="w-full max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 xl:gap-16 items-center w-full">
            {/* About Content */}
            <motion.div 
              className="flex flex-col justify-center w-full min-w-0"
              initial={{ opacity: 0, x: -30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Our Story</h2>
              <div className="w-20 h-1 bg-blue-600 mb-5 md:mb-7"></div>
              <p className="mb-4 text-gray-700">We started with a simple vision in 2025: create premium products that combine functionality, style, and sustainability. What began as a small team with big dreams has grown into a thriving company serving customers worldwide.</p>
              <p className="mb-4 text-gray-700">Our journey has been one of continuous growth and learning. We've expanded our product lines, refined our processes, and built strong relationships with suppliers and customers alike.</p>
              <p className="mb-6 md:mb-8 text-gray-700">Today, we remain committed to the core values that guided us from the beginning: quality craftsmanship, exceptional design, and outstanding customer service.</p>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a href="#team" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all">
                  Meet Our Team
                </a>
              </motion.div>
            </motion.div>
            
            {/* About Image */}
            <motion.div 
              className="w-full min-w-0 relative"
              initial={{ opacity: 0, x: 30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative z-10">
                <img 
                  src="https://placehold.co/600x400/eee/ccc?text=Our+Story" 
                  alt="Our Story" 
                  className="w-full h-auto object-cover object-center rounded-2xl shadow-xl" 
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full border-4 border-blue-600 rounded-2xl z-0"></div>
              <div className="absolute -bottom-4 -left-4 bg-blue-100 w-32 h-32 rounded-xl z-0"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="w-full px-4 sm:px-6 py-12 md:py-16 lg:py-20 bg-blue-600 text-white"
      >
        <div className="w-full max-w-screen-xl mx-auto">
          <motion.div 
            className="text-center mb-10 md:mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Our Impact in Numbers</h2>
            <p className="mt-3 text-blue-100 max-w-2xl mx-auto">The metrics that showcase our journey and growth over the years</p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: '10+', label: 'Years of Experience', delay: 0 },
              { value: '5000+', label: 'Happy Customers', delay: 0.1 },
              { value: '200+', label: 'Products', delay: 0.2 },
              { value: '20+', label: 'Countries Served', delay: 0.3 }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="group relative bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 text-center transition-all duration-300 hover:bg-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: stat.delay }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 
                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="relative z-10">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                    {stat.value}
                    <span className="absolute top-0 right-0 h-2 w-2 bg-blue-400 rounded-full"></span>
                  </div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section 
        ref={valuesRef}
        className="w-full px-4 sm:px-6 py-12 md:py-16 lg:py-20"
      >
        <div className="w-full max-w-screen-xl mx-auto">
          <motion.div 
            className="text-center mb-10 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The guiding principles that drive everything we do</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
          >
            {values.map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-md p-6 md:p-8 hover:shadow-lg transition-shadow"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-5">
                  {value.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Team Section */}
      <section 
        id="team"
        ref={teamRef}
        className="w-full px-4 sm:px-6 py-12 md:py-16 lg:py-20 bg-gray-100"
      >
        <div className="w-full max-w-screen-xl mx-auto">
          <motion.div 
            className="text-center mb-10 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The talented individuals behind our success</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all group"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex justify-center space-x-3">
                      {[
                        { 
                          icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>,
                          color: 'bg-[#1877f2] hover:bg-[#1865d3]'
                        },
                        {
                          icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>,
                          color: 'bg-[#1da1f2] hover:bg-[#1a8cd8]'
                        },
                        {
                          icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                          color: 'bg-[#0077b5] hover:bg-[#006396]'
                        }
                      ].map((social, idx) => (
                        <a 
                          key={idx} 
                          href="#" 
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white transform hover:scale-110 transition-all duration-300 ${social.color}`}
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full px-4 sm:px-6 py-16 md:py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="w-full max-w-screen-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Ready to Experience the Difference?</h2>
            <p className="mb-8 md:mb-10 text-blue-100 max-w-2xl mx-auto">Join thousands of satisfied customers who have chosen our premium products for their lifestyle needs.</p>
            <motion.div 
              className="inline-flex"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <a href="#" className="inline-block px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-bold transition-colors shadow-lg">
                Shop Now
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
