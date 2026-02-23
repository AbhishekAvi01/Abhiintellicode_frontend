import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient'
import { NavLink } from 'react-router';
import { 
  Trash2, Search, Cpu, ArrowLeft, 
  Layers, AlertOctagon, ShieldAlert, LayoutGrid 
} from 'lucide-react';

const AdminDelete = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get('/problem/getAllProblem');
      setProblems(data);
    } catch (err) {
      setError('Failed to sync system problems');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // PROTOCOL VERIFICATION
    const confirmation = window.confirm('SYSTEM ALERT: Are you sure you want to PERMANENTLY PURGE this problem node? This action cannot be reversed.');
    if (!confirmation) return;
    
    try {
      await axiosClient.delete(`/problem/delete/${id}`);
      setProblems(problems.filter(problem => problem._id !== id));
    } catch (err) {
      setError('Administrative Breach: Deletion Protocol Failed');
      console.error(err);
    }
  };

  const getDiffColor = (d) => {
    switch (d?.toLowerCase()) {
      case 'easy': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'medium': return 'text-amber-700 bg-amber-100 border-amber-200';
      case 'hard': return 'text-rose-700 bg-rose-50 border-rose-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
      <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Initializing Purge Interface...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800">
      
      {/* Executive Command Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b-2 border-slate-200 px-8 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-200">
              <ShieldAlert size={20} />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter text-slate-900 uppercase">
                Node <span className="text-rose-600 font-black">Cleanup</span>
              </h1>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Matrix Maintenance Mode</p>
            </div>
          </div>
          <NavLink to="/admin" className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border border-slate-200 shadow-sm">
            <ArrowLeft size={14} /> System Exit
          </NavLink>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-12">
        
        {/* Error Alert Buffer */}
        {error && (
          <div className="mb-10 p-5 bg-rose-50 border-2 border-rose-100 rounded-3xl flex items-center gap-4 text-rose-600 animate-in fade-in slide-in-from-top-2">
            <AlertOctagon size={24} />
            <span className="text-sm font-black uppercase italic tracking-tighter">{error}</span>
          </div>
        )}

        {/* Search & Filter Hub */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-2 h-10 bg-rose-600 rounded-full" />
            <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Target Identification</h2>
          </div>
          <div className="relative group w-full md:w-96 shadow-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search problem signature..." 
              className="w-full bg-white border-2 border-slate-200 focus:border-rose-400 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none transition-all"
            />
          </div>
        </div>

        {/* Professional Asset Table */}
        <div className="bg-white border-2 border-slate-200 rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b-2 border-slate-200">
                  <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Module #</th>
                  <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Logical Title</th>
                  <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Tier</th>
                  <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Meta Tags</th>
                  <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] text-center">Execute Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-100">
                {problems.map((problem, index) => (
                  <tr key={problem._id} className="group hover:bg-rose-50/30 transition-all">
                    <td className="px-10 py-8">
                      <span className="text-xs font-black text-slate-300 italic tracking-tighter uppercase">ID_UNIT_0{index + 1}</span>
                    </td>
                    <td className="px-10 py-8">
                      <p className="text-base font-black text-slate-900 italic tracking-tight group-hover:text-rose-600 transition-colors uppercase">
                        {problem.title}
                      </p>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border-2 shadow-sm ${getDiffColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-2">
                        <Layers size={14} className="text-slate-300" />
                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 px-4 py-1.5 rounded-full border-2 border-slate-200 italic">{problem.tags}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-center">
                       <button 
                         onClick={() => handleDelete(problem._id)}
                         className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 hover:border-rose-600 text-rose-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm hover:shadow-rose-100 active:scale-95 group/btn"
                       >
                         <Trash2 size={16} className="group-hover/btn:animate-bounce" /> Purge Logic
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {problems.length === 0 && (
            <div className="p-24 text-center flex flex-col items-center justify-center">
               <LayoutGrid size={64} className="text-slate-100 mb-6" />
               <p className="text-sm font-black text-slate-300 uppercase tracking-[0.4em] italic">No logical targets found in the current sector.</p>
            </div>
          )}
        </div>
        
        {/* Verification Matrix Footer */}
        <div className="mt-12 flex justify-between items-center px-6">
           <div className="flex items-center gap-4">
             <div className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">
               Total Neural Units Analyzed: {problems.length}
             </p>
           </div>
           <div className="h-[2px] flex-1 mx-12 bg-slate-200 hidden md:block" />
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Maintenance v2.0 &bull; Secure Sector Access</p>
        </div>
      </main>
    </div>
  );
};

export default AdminDelete;