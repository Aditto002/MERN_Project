import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.send('service_tkmhkto', 'template_mlnvq1d', formData, '_IH4Due-KhM-yNs9i')
      .then((response) => {
        console.log('Success:', response);
        setSuccessMessage('Your message has been sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('Failed to send your message. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Hide the success message after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className="bg-green-50 font-[sans-serif] h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Get In Touch</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Have a specific inquiry or looking to explore new opportunities? Contact us!
        </p>

        {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 text-center mb-4">{errorMessage}</p>}

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-md h-12 px-6 bg-[#f0f1f2] text-sm outline-none border border-gray-300 shadow-sm"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md h-12 px-6 bg-[#f0f1f2] text-sm outline-none border border-gray-300 shadow-sm"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full rounded-md h-12 px-6 bg-[#f0f1f2] text-sm outline-none border border-gray-300 shadow-sm"
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full rounded-md px-6 bg-[#f0f1f2] text-sm pt-3 outline-none border border-gray-300 shadow-sm"
            required
          ></textarea>
          <button
            type="submit"
            className={`text-gray-800 ${isSubmitting ? 'bg-gray-300' : 'bg-green-200 hover:bg-green-300'} font-semibold rounded-md text-sm px-6 py-3 block w-full transition-colors duration-300`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
