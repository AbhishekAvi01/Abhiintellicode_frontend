import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient'
import { NavLink } from 'react-router';
import { 
  Video, UploadCloud, Trash2, ChevronRight, 
  Search, Cpu, ArrowLeft, AlertCircle, Layers 
} from 'lucide-react';

const AdminVideo = () => {
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
      setError('Failed to fetch system problems');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('PROTOCOL ALERT: Are you sure you want to permanently delete this video asset?')) return;
    
    try {
      await axiosClient.delete(`/video/delete/${id}`);
      setProblems(problems.filter(problem => problem._id !== id));
    } catch (err) {
      setError(err?.response?.data?.error || 'Deletion Breach Failed');
    }
  };

  const getDiffColor = (d) => {
    switch (d?.toLowerCase()) {
      case 'easy': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'hard': return 'text-rose-600 bg-rose-50 border-rose-100';
      default: return 'text-slate-500 bg-slate-50 border-slate-100';
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
      <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Scanning Video Nodes...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800">
      
      {/* Refined Admin Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <Video size={20} />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter text-slate-900 uppercase">
                Video <span className="text-indigo-600">Management</span>
              </h1>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Matrix Asset Terminal</p>
            </div>
          </div>
          <NavLink to="/admin" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
            <ArrowLeft size={14} /> Back to Command
          </NavLink>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-12">
        
        {error && (
          <div className="mb-8 p-4 bg-rose-50 border-2 border-rose-100 rounded-2xl flex items-center gap-4 text-rose-600 animate-in fade-in slide-in-from-top-2">
            <AlertCircle size={20} />
            <span className="text-xs font-black uppercase italic tracking-tighter">{error}</span>
          </div>
        )}

        {/* List Header with Statistics */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-indigo-600 rounded-full" />
            <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">Active Problem List</h2>
          </div>
          <div className="relative group w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search assets..." 
              className="w-full bg-white border-2 border-slate-200 focus:border-indigo-400 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Professional Asset Grid */}
        <div className="bg-white border-2 border-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b-2 border-slate-100">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ID</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Asset Title</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Complexity</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Logical Tags</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {problems.map((problem, index) => (
                  <tr key={problem._id} className="group hover:bg-slate-50/50 transition-all">
                    <td className="px-8 py-6">
                      <span className="text-xs font-black text-slate-300 italic tracking-tighter">#0{index + 1}</span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-slate-900 italic tracking-tight group-hover:text-indigo-600 transition-colors">
                        {problem.title}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getDiffColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <Layers size={14} className="text-slate-300" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{problem.tags}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-3">
                        <NavLink 
                          to={`/admin/upload/${problem._id}`}
                          className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-slate-200 hover:border-indigo-600 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm hover:shadow-indigo-100 active:scale-95"
                        >
                          <UploadCloud size={14} /> Upload
                        </NavLink>
                        <button 
                          onClick={() => handleDelete(problem._id)}
                          className="flex items-center justify-center w-10 h-10 bg-white border-2 border-slate-200 hover:border-rose-500 text-rose-500 rounded-xl transition-all shadow-sm hover:shadow-rose-100 active:scale-95"
                          title="Purge Asset"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {problems.length === 0 && (
            <div className="p-20 text-center flex flex-col items-center justify-center">
               <Cpu size={48} className="text-slate-100 mb-4" />
               <p className="text-sm font-black text-slate-300 uppercase tracking-widest italic">No problem nodes detected in the local matrix.</p>
            </div>
          )}
        </div>
        
        {/* Footer Info */}
        <div className="mt-8 flex justify-between items-center px-4">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
             Total Assets Scanned: {problems.length}
           </p>
           <div className="h-[1px] flex-1 mx-8 bg-slate-200 hidden md:block" />
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">System v2.0 &bull; Secure Auth</p>
        </div>
      </main>
    </div>
  );
};

export default AdminVideo;