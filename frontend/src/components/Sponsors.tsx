export default function Sponsors() {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Sponsors</h2>
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-8">
            Were grateful to our amazing sponsors who make Hackman V8 possible.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-500">Sponsor 1</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-500">Sponsor 2</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-500">Sponsor 3</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-500">Sponsor 4</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
