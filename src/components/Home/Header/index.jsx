function Header() {
  return (
    <header className="p-4 shadow-md flex justify-between items-center px-6 fixed top-0 left-0 w-full bg-white/30 backdrop-blur-md z-50">
      {/* Logo & Brand Name */}
      <a href="/" className="flex items-center space-x-2">
        <img src="/logo.svg" alt="TripWise Logo" className="h-9" />
        <span className="text-xl font-semibold text-gray-800 tracking-wide">TripWise</span>
      </a>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6 text-gray-700 text-sm font-medium">
       <a href="#features" className="hover:text-[#DE3163] transition">Highlights</a>
       <a href="#faq" className="hover:text-[#DE3163] transition">FAQ</a>
       <a href="#testimonials" className="hover:text-[#DE3163] transition">Stories</a>
       <a href="#gallery" className="hover:text-[#DE3163] transition">Gallery</a>
      </nav>

      {/* CTA or Menu Icon (for mobile) */}
      <div className="md:hidden">
        {/* Placeholder for hamburger menu */}
        <button className="text-gray-700 hover:text-blue-600 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
