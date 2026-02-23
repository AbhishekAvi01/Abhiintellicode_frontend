import React from 'react';
import { 
  Plus, Edit, Trash2, Video, Cpu, 
  ChevronRight, ArrowRight, ShieldAlert 
} from 'lucide-react';
import { NavLink } from 'react-router';

function Admin() {
  // Essential Admin Options without the complex stats logic
  const adminOptions = [
    { 
      id: 'create', 
      title: 'Create Problem', 
      description: 'Architect new DSA challenges for the matrix.', 
      icon: Plus, 
      color: 'text-emerald-600', 
      bgColor: 'bg-emerald-50', 
      route: '/admin/create' 
    },
    { 
      id: 'update', 
      title: 'Update Module', 
      description: 'Refine logic and instructions of existing problems.', 
      icon: Edit, 
      color: 'text-amber-600', 
      bgColor: 'bg-amber-50', 
      route: '/admin/update' 
    },
    { 
      id: 'delete', 
      title: 'Cleanup Matrix', 
      description: 'Remove redundant or obsolete coding problems.', 
      icon: Trash2, 
      color: 'text-rose-600', 
      bgColor: 'bg-rose-50', 
      route: '/admin/delete' 
    },
    { 
      id: 'video', 
      title: 'Video Assets', 
      description: 'Manage high-quality video explanations and tutorials.', 
      icon: Video, 
      color: 'text-indigo-600', 
      bgColor: 'bg-indigo-50', 
      route: '/admin/video' 
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800">
      
      {/* Executive Admin Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 transition-transform hover:scale-110">
              <Cpu className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter text-slate-900 uppercase">
                Abhi <span className="text-indigo-600 font-black">IntelliCode</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Admin Control Center</span>
            </div>
          </div>
          <NavLink to="/" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-all">
            Return to Platform <ChevronRight size={14} />
          </NavLink>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-20 text-center">
        {/* Simplified Header for the Operation Management */}
        <div className="mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic mb-4">
            Operation <span className="text-indigo-600">Management</span>
          </h2>
          <p className="text-slate-500 font-medium italic">Execute administrative tasks and manage the **AI-Integrated Coding Platform** infrastructure.</p>
        </div>

        {/* Action Grid - High Focus */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {adminOptions.map((option) => {
            const Icon = option.icon;
            return (
              <NavLink 
                key={option.id} 
                to={option.route} 
                className="group bg-white border border-slate-200 hover:border-indigo-400 rounded-[2.5rem] p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5 flex flex-col items-center"
              >
                <div className={`${option.bgColor} ${option.color} p-6 rounded-3xl mb-8 transition-transform duration-500 group-hover:scale-110 shadow-inner`}>
                  <Icon size={40} strokeWidth={2.5} />
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight italic">
                  {option.title}
                </h3>
                
                <p className="text-xs font-medium text-slate-400 leading-relaxed italic mb-8">
                  {option.description}
                </p>
                
                <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  Access Terminal <ArrowRight size={12} strokeWidth={3} />
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
      
      {/* Footer Branding */}
      <footer className="fixed bottom-8 w-full text-center">
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">System Version 2026.1 &bull; Secure Admin Access</p>
      </footer>
    </div>
  );
}

export default Admin;