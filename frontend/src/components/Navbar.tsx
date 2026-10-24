import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { LogOut, Users, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/80 sticky top-0 z-50 px-4 sm:px-6 lg:px-10 py-3.5 flex justify-between items-center transition-all">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl text-white shadow-lg shadow-blue-500/25 ring-1 ring-white/10">
          <Users size={20} />
        </div>
        <span className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          UltraCRM
        </span>
      </div>

      {user && (
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-sm font-semibold text-slate-200">{user.name}</span>
            <span className="text-xs text-blue-400 font-medium flex items-center gap-1 justify-end">
              <ShieldCheck size={13} /> {user.role}
            </span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800/80 hover:bg-red-500/10 text-slate-300 hover:text-red-400 rounded-xl border border-slate-700/60 hover:border-red-500/30 transition-all text-sm font-medium shadow-sm active:scale-95"
            title="Logout"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};