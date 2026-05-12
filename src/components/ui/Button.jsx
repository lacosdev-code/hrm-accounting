import React from 'react';

const Button = ({ children, onClick, className = '', variant = 'primary' }) => {
  const variants = {
    primary: 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/10',
    secondary: 'bg-white border border-emerald-100 text-emerald-600 hover:bg-emerald-50',
    danger: 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/10',
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg active:scale-95 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
