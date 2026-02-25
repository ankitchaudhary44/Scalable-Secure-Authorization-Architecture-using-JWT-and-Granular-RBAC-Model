import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/50 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <ShieldCheck className="text-cyan-400" size={28} />
        <span className="text-white font-bold tracking-widest text-xl">RBAC<span className="text-cyan-400">PRO</span></span>
      </div>
      
      <div className="flex gap-6">
        <Link to="/login" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">Login</Link>
        <Link to="/signup" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;