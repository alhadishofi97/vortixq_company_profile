"use client";
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemeToggleProps {
  variant?: 'fixed' | 'navbar';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'fixed' }) => {
  const { theme, toggleTheme } = useTheme();

  const baseClasses = "p-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl";
  const fixedClasses = variant === 'fixed' ? "fixed top-4 right-4 z-50" : "";
  
  return (
    <button
      onClick={toggleTheme}
      className={`${baseClasses} ${fixedClasses}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className="flex items-center gap-2">
        {theme === 'light' ? (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m6.364-6.364l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
