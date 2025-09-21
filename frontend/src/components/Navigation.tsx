export default function Navigation() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hackman V8</h1>
        <ul className="flex space-x-6">
          <li><a href="#hero" className="hover:text-blue-200">Home</a></li>
          <li><a href="#about" className="hover:text-blue-200">About</a></li>
          <li><a href="#faq" className="hover:text-blue-200">FAQ</a></li>
          <li><a href="#sponsors" className="hover:text-blue-200">Sponsors</a></li>
          <li><a href="#contact" className="hover:text-blue-200">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
