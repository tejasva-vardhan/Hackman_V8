export default function Contact() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
              <p className="text-gray-300 mb-6">
                Have questions about Hackman V8? Wed love to hear from you. 
                Send us a message and well respond as soon as possible.
              </p>
              <div className="space-y-4">
                <p className="flex items-center">
                  <span className="mr-3">📧</span>
                  contact@hackmanv8.com
                </p>
                <p className="flex items-center">
                  <span className="mr-3">📱</span>
                  +1 (555) 123-4567
                </p>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
                />
                <textarea 
                  placeholder="Your Message" 
                  rows={4}
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
                />
                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
