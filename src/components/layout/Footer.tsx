import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer component loaded');

  const footerLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'Contact Support', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Privacy Policy', path: '/privacy' },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6" aria-label="Footer">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-center text-xs text-slate-500 dark:text-slate-500">
          &copy; {new Date().getFullYear()} GourmetGo. All rights reserved.
        </p>
        <p className="text-center text-xs text-slate-500 dark:text-slate-500 mt-1">
          Crafted for an exquisite dining experience.
        </p>
      </div>
    </footer>
  );
};

export default Footer;