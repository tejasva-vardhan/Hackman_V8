export default function FAQ() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">When is Hackman V8?</h3>
              <p className="text-gray-700">Hackman V8 will be held on [Date TBD]. The event will run for 48 hours.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Who can participate?</h3>
              <p className="text-gray-700">Anyone with a passion for coding and innovation can participate in Hackman V8.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">What should I bring?</h3>
              <p className="text-gray-700">Bring your laptop, charger, and enthusiasm for coding!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
