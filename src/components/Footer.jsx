import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold text-white">CrowdFund</h2>
        <p className="text-sm">&copy; {new Date().getFullYear()} CrowdFund. All rights reserved.</p>
        <div className="flex gap-4 text-xl">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500"><FaFacebook /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-400"><FaLinkedin /></a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-100"><FaGithub /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;