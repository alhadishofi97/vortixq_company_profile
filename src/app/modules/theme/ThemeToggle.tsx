"use client";
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemeToggleProps {
  variant?: 'fixed' | 'navbar';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'fixed' }) => {
  const { theme, toggleTheme } = useTheme();

  const baseClasses = "p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl";
  const fixedClasses = variant === 'fixed' ? "fixed top-4 right-4 z-50" : "";
  
  return (
    <button
      onClick={toggleTheme}
      className={`${baseClasses} ${fixedClasses}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* <span className="flex items-center gap-2">
        <span className="text-lg">{theme === 'light' ? '🌙' : '☀️'}</span>
        <span className="text-sm font-medium">{theme === 'light' ? 'Dark' : 'Light'}</span>
      </span> */}
    </button>
  );
};

export default ThemeToggle;
