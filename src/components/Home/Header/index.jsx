import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "@/service/backendApi";
import { useAuth } from "@/context/AuthContext";

function Header() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await authApi.googleLogin(credentialResponse.credential);
      login(res.data);
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <header className="p-4 shadow-md flex justify-between items-center px-6 fixed top-0 left-0 w-full bg-white/30 backdrop-blur-md z-50">
      {/* Logo & Brand Name */}
      <a href="/" className="flex items-center space-x-2">
        <img src="/logo.svg" alt="TripWise Logo" className="h-9" />
        <span className="text-xl font-semibold text-gray-800 tracking-wide">
          TripWise
        </span>
      </a>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6 text-gray-700 text-sm font-medium">
        <a href="#features" className="hover:text-[#DE3163] transition">
          Highlights
        </a>
        <a href="#faq" className="hover:text-[#DE3163] transition">
          FAQ
        </a>
        <a href="#testimonials" className="hover:text-[#DE3163] transition">
          Stories
        </a>
        <a href="#gallery" className="hover:text-[#DE3163] transition">
          Gallery
        </a>
        {user && (
          <Link to="/my-trips" className="hover:text-[#DE3163] transition">
            My Trips
          </Link>
        )}
      </nav>

      {/* Auth */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div className="hidden md:flex items-center gap-2">
              {user.picture && (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
              <span className="text-sm font-medium text-gray-700">
                {user.name}
              </span>
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="text-sm font-medium text-gray-600 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-red-50 hover:text-[#DE3163] hover:border-[#DE3163] transition"
            >
              Sign out
            </button>
          </>
        ) : (
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Login failed. Please try again.")}
            size="medium"
            shape="rectangular"
            text="signin_with"
          />
        )}

        {/* Mobile hamburger placeholder */}
        <div className="md:hidden">
          <button className="text-gray-700 hover:text-blue-600 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
