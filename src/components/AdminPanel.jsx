import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../utils/axiosClient';
import { useNavigate, NavLink } from 'react-router';
import { 
  Plus, Trash2, Cpu, ChevronRight, Layout, Beaker, 
  Code2, Sparkles, ArrowLeft, Terminal, Save, CheckCircle 
} from 'lucide-react';

const problemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.enum(['array', 'linkedList', 'graph', 'dp']),
  visibleTestCases: z.array(z.object({
    input: z.string().min(1, 'Input required'),
    output: z.string().min(1, 'Output required'),
    explanation: z.string().min(1, 'Explanation required')
  })).min(1, 'Min 1 visible case required'),
  hiddenTestCases: z.array(z.object({
    input: z.string().min(1, 'Input required'),
    output: z.string().min(1, 'Output required')
  })).min(1, 'Min 1 hidden case required'),
  startCode: z.array(z.object({
    language: z.enum(['C++', 'Java', 'JavaScript']),
    initialCode: z.string().min(1, 'Initial code required')
  })).length(3),
  referenceSolution: z.array(z.object({
    language: z.enum(['C++', 'Java', 'JavaScript']),
    completeCode: z.string().min(1, 'Reference code required')
  })).length(3)
});

function AdminPanel() {
  const navigate = useNavigate();
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      startCode: [
        { language: 'C++', initialCode: '' },
        { language: 'Java', initialCode: '' },
        { language: 'JavaScript', initialCode: '' }
      ],
      referenceSolution: [
        { language: 'C++', completeCode: '' },
        { language: 'Java', completeCode: '' },
        { language: 'JavaScript', completeCode: '' }
      ]
    }
  });

  const { fields: visibleFields, append: appendVisible, remove: removeVisible } = useFieldArray({ control, name: 'visibleTestCases' });
  const { fields: hiddenFields, append: appendHidden, remove: removeHidden } = useFieldArray({ control, name: 'hiddenTestCases' });

  const onSubmit = async (data) => {
    try {
      await axiosClient.post('/problem/create', data);
      alert('✓ Matrix Successfully Updated');
      navigate('/admin/update');
    } catch (error) {
      alert(`Breach Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800 pb-20">
      
      {/* Dynamic Command Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b-2 border-slate-200 px-8 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <Plus size={20} strokeWidth={3} />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter text-slate-900 uppercase">
                Create <span className="text-indigo-600">Problem</span>
              </h1>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Logical Architect Mode</p>
            </div>
          </div>
          <NavLink to="/admin" className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border border-slate-200 shadow-sm active:scale-95">
            <ArrowLeft size={14} /> Abort Operation
          </NavLink>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 py-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          
          {/* Section 1: Basic Logic Configuration */}
          <div className="bg-white border-2 border-slate-200 rounded-[3rem] p-10 md:p-14 shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600"><Layout size={20}/></div>
              <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">Logic Parameters</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="form-control space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Problem Designation (Title)</label>
                <input {...register('title')} placeholder="Enter Matrix Designation" className={`w-full bg-slate-50 border-2 border-slate-200 focus:border-indigo-500 rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all ${errors.title && 'border-rose-400 bg-rose-50'}`} />
                {errors.title && <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest ml-2 italic">{errors.title.message}</span>}
              </div>

              <div className="form-control space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Problem Description (Objective)</label>
                <textarea {...register('description')} rows={5} placeholder="Define the logical objective..." className={`w-full bg-slate-50 border-2 border-slate-200 focus:border-indigo-500 rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all italic leading-relaxed ${errors.description && 'border-rose-400 bg-rose-50'}`} />
                {errors.description && <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest ml-2 italic">{errors.description.message}</span>}
              </div>

              <div className="form-control space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Difficulty Tier</label>
                <select {...register('difficulty')} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-indigo-500 rounded-2xl py-4 px-6 text-sm font-bold outline-none appearance-none cursor-pointer uppercase tracking-widest">
                  <option value="easy">Easy (Linear)</option>
                  <option value="medium">Medium (Algorithmic)</option>
                  <option value="hard">Hard (Advanced DP)</option>
                </select>
              </div>

              <div className="form-control space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Logical Tags</label>
                <select {...register('tags')} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-indigo-500 rounded-2xl py-4 px-6 text-sm font-bold outline-none appearance-none cursor-pointer uppercase tracking-widest text-indigo-600">
                  <option value="array">Array Structure</option>
                  <option value="linkedList">Linked Data</option>
                  <option value="graph">Network Graph</option>
                  <option value="dp">Dynamic Strategy</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Validation Scenarios */}
          <div className="bg-white border-2 border-slate-200 rounded-[3rem] p-10 md:p-14 shadow-xl shadow-slate-200/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-50 rounded-2xl text-amber-600"><Beaker size={20}/></div>
                <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">Validation Units</h2>
              </div>
              <button type="button" onClick={() => appendVisible({ input: '', output: '', explanation: '' })} className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:scale-105 transition-transform active:scale-95">
                <Plus size={14}/> Add Visible Case
              </button>
            </div>

            <div className="space-y-6">
              {visibleFields.map((field, index) => (
                <div key={field.id} className="relative bg-[#F8FAFC] border-2 border-slate-200 rounded-[2rem] p-8 group transition-all hover:bg-white hover:border-indigo-400 animate-in fade-in zoom-in-95">
                   <button type="button" onClick={() => removeVisible(index)} className="absolute top-6 right-8 p-2 text-rose-300 hover:text-rose-500 transition-colors"><Trash2 size={18}/></button>
                   <p className="text-[10px] font-black text-indigo-400 uppercase mb-6 tracking-widest">Visible Module_0{index + 1}</p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input {...register(`visibleTestCases.${index}.input`)} placeholder="Input Logic" className="bg-white border-2 border-slate-200 py-3 px-5 rounded-xl font-mono text-xs focus:border-indigo-500 outline-none" />
                      <input {...register(`visibleTestCases.${index}.output`)} placeholder="Expected Matrix" className="bg-white border-2 border-slate-200 py-3 px-5 rounded-xl font-mono text-xs focus:border-indigo-500 outline-none" />
                      <textarea {...register(`visibleTestCases.${index}.explanation`)} placeholder="Reasoning Trace" className="md:col-span-2 bg-white border-2 border-slate-200 py-3 px-5 rounded-xl font-medium text-xs italic h-20 outline-none" />
                   </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-10 border-t-2 border-slate-100">
               <div className="flex justify-between items-center mb-8">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] italic">Hidden Core Scenarios</h3>
                  <button type="button" onClick={() => appendHidden({ input: '', output: '' })} className="text-[10px] font-black text-indigo-600 uppercase underline underline-offset-4 hover:text-indigo-800 transition-colors">Append Hidden Block</button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hiddenFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl items-center group">
                       <span className="text-[9px] font-black text-slate-300">#{index+1}</span>
                       <input {...register(`hiddenTestCases.${index}.input`)} placeholder="In" className="bg-transparent text-xs font-mono w-full outline-none" />
                       <input {...register(`hiddenTestCases.${index}.output`)} placeholder="Out" className="bg-transparent text-xs font-mono w-full outline-none border-l pl-3 border-slate-200" />
                       <button type="button" onClick={() => removeHidden(index)} className="opacity-0 group-hover:opacity-100 text-rose-400 hover:text-rose-600 transition-all"><Trash2 size={14}/></button>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Section 3: Code Templates */}
          <div className="bg-white border-2 border-slate-200 rounded-[3rem] p-10 md:p-14 shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-4 mb-12">
              <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600"><Code2 size={20}/></div>
              <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">Source Templates</h2>
            </div>
            
            <div className="space-y-12">
              {['C++', 'Java', 'JavaScript'].map((lang, index) => (
                <div key={lang} className="border-b-2 border-slate-50 pb-12 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-6">
                    <CheckCircle size={16} className="text-indigo-500" />
                    <h3 className="text-base font-black text-slate-800 uppercase tracking-widest">{lang} Environment</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Neural Start Code</label>
                       <div className="rounded-2xl overflow-hidden border-2 border-slate-200 bg-[#1E1E1E] shadow-lg">
                          <textarea {...register(`startCode.${index}.initialCode`)} placeholder="Code snippet to initialize student editor..." className="w-full bg-[#1E1E1E] text-slate-200 p-6 font-mono text-xs outline-none focus:ring-1 focus:ring-indigo-500/50" rows={8} />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Final Logic Solution</label>
                       <div className="rounded-2xl overflow-hidden border-2 border-slate-200 bg-[#1E1E1E] shadow-lg">
                          <textarea {...register(`referenceSolution.${index}.completeCode`)} placeholder="Internal reference solution for validation..." className="w-full bg-[#1E1E1E] text-emerald-400 p-6 font-mono text-xs outline-none focus:ring-1 focus:ring-emerald-500/50" rows={8} />
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Trigger */}
          <div className="pt-6">
            <button type="submit" className="group w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-6 rounded-[2.5rem] transition-all shadow-2xl flex items-center justify-center gap-4 active:scale-[0.98] border-b-8 border-black hover:border-indigo-800">
               <span className="text-sm uppercase tracking-[0.4em] italic">Commit Matrix Problem</span>
               <Save size={20} className="group-hover:animate-pulse" />
            </button>
            <p className="text-center mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
               <Cpu size={12} /> Authenticated Secure Admin Authorization Access ONLY
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}

export default AdminPanel;