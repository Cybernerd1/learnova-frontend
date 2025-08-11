import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 w-full">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Column 1 - Brand */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-2">LearnOva</h2>
          <p className="text-sm mb-4">
            Empowering education through technology since 2025.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaYoutube /></a>
          </div>
        </div>

        {/* Column 2 - Product */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-2">Product</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Features</a></li>
            <li><a href="#" className="hover:text-white">Pricing</a></li>
            <li><a href="#" className="hover:text-white">For Teachers</a></li>
            <li><a href="#" className="hover:text-white">For Students</a></li>
            <li><a href="#" className="hover:text-white">For Schools</a></li>
          </ul>
        </div>

        {/* Column 3 - Support */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-2">Support</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">Community</a></li>
            <li><a href="#" className="hover:text-white">Tutorials</a></li>
            <li><a href="#" className="hover:text-white">Webinars</a></li>
          </ul>
        </div>

        {/* Column 4 - Subscribe */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-2">Subscribe</h2>
          <p className="text-sm mb-4">Get the latest updates and news.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-l bg-gray-800 text-gray-200 focus:outline-none"
            />
            <button className="px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-r">
              ➤
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-6">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p>© 2025 LearnOva. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
