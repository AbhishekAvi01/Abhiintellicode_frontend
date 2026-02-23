import { useParams, NavLink } from 'react-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import axiosClient from '../utils/axiosClient';
import { 
  UploadCloud, FileVideo, CheckCircle2, AlertCircle, 
  Cpu, ArrowLeft, Clock, ShieldCheck, Zap, ChevronRight 
} from 'lucide-react';

function AdminUpload() {
  const { problemId } = useParams();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedVideo, setUploadedVideo] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setError,
    clearErrors
  } = useForm();

  const selectedFile = watch('videoFile')?.[0];

  const onSubmit = async (data) => {
    const file = data.videoFile[0];
    setUploading(true);
    setUploadProgress(0);
    clearErrors();

    try {
      // Step 1: Initialize Protocol
      const signatureResponse = await axiosClient.get(`/video/create/${problemId}`);
      const { signature, timestamp, public_id, api_key, upload_url } = signatureResponse.data;

      // Step 2: Prepare Binary Stream
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('public_id', public_id);
      formData.append('api_key', api_key);

      // Step 3: Cloud Sync with Progress
      const uploadResponse = await axios.post(upload_url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (p) => setUploadProgress(Math.round((p.loaded * 100) / p.total)),
      });

      const cloudinaryResult = uploadResponse.data;

      // Step 4: Metadata Archiving
      const metadataResponse = await axiosClient.post('/video/save', {
        problemId: problemId,
        cloudinaryPublicId: cloudinaryResult.public_id,
        secureUrl: cloudinaryResult.secure_url,
        duration: cloudinaryResult.duration,
      });

      setUploadedVideo(metadataResponse.data.videoSolution);
      reset(); 
    } catch (err) {
      console.error('Logic Breach:', err);
      setError('root', {
        type: 'manual',
        message: err.response?.data?.message || 'Matrix Upload Failed. Check connection.'
      });
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800">
      
      {/* Dynamic Admin Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <UploadCloud size={20} />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter text-slate-900 uppercase">
                Asset <span className="text-indigo-600">Ingestion</span>
              </h1>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Node ID: {problemId.slice(-6)}</p>
            </div>
          </div>
          <NavLink to="/admin/video" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
            <ArrowLeft size={14} /> Back to Assets
          </NavLink>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16 font-sans">
        <div className="bg-white border-2 border-slate-200 rounded-[3rem] shadow-2xl overflow-hidden">
          
          <div className="p-10 md:p-16">
            <div className="mb-12 text-center">
               <h2 className="text-3xl font-black text-slate-900 uppercase italic mb-3 tracking-tight">Sync <span className="text-indigo-600 font-black italic">Video Logic</span></h2>
               <p className="text-sm font-bold text-slate-400 italic">Upload a high-fidelity video solution to the central matrix.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              {/* INDUSTRIAL DROP ZONE */}
              <div className="group relative">
                <label className={`flex flex-col items-center justify-center w-full h-72 border-4 border-dashed rounded-[3rem] cursor-pointer transition-all duration-300 ${errors.videoFile ? 'border-rose-200 bg-rose-50/30' : 'border-slate-100 bg-slate-50/50 hover:bg-white hover:border-indigo-400 shadow-inner'}`}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className={`p-6 rounded-[2rem] mb-5 shadow-inner transition-transform group-hover:scale-110 ${errors.videoFile ? 'bg-rose-100 text-rose-500' : 'bg-white text-indigo-600 border border-slate-100 shadow-sm'}`}>
                      <FileVideo size={48} strokeWidth={1.5} />
                    </div>
                    <p className="mb-2 text-base font-black text-slate-700 uppercase tracking-widest">
                      {selectedFile ? 'Protocol Detected' : 'Inject Logic Asset'}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] italic">MP4 / WEBM (MAX 100MB)</p>
                  </div>
                  <input 
                    type="file" 
                    accept="video/*" 
                    className="hidden" 
                    {...register('videoFile', {
                      required: 'Target selection required',
                      validate: {
                        isVideo: (f) => f?.[0]?.type.startsWith('video/') || 'Signature Mismatch',
                        fileSize: (f) => f?.[0]?.size <= 100 * 1024 * 1024 || 'Buffer Overflow: 100MB Limit'
                      }
                    })}
                  />
                </label>
                {errors.videoFile && (
                  <div className="absolute -bottom-7 left-8 flex items-center gap-1.5 text-rose-500 font-black text-[10px] uppercase tracking-widest animate-in slide-in-from-left-2">
                    <AlertCircle size={14} /> {errors.videoFile.message}
                  </div>
                )}
              </div>

              {/* METADATA PREVIEW */}
              {selectedFile && !uploading && !uploadedVideo && (
                <div className="bg-indigo-50 border-2 border-indigo-100 rounded-3xl p-6 flex items-center justify-between animate-in zoom-in-95">
                  <div className="flex items-center gap-5">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-50"><Zap size={24}/></div>
                     <div>
                        <p className="text-sm font-black text-slate-900 truncate max-w-[250px] italic">{selectedFile.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Buffer: {formatFileSize(selectedFile.size)}</p>
                     </div>
                  </div>
                  <button type="button" onClick={() => reset()} className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors">Abort</button>
                </div>
              )}

              {/* PROGRESS TERMINAL */}
              {uploading && (
                <div className="space-y-6 p-10 bg-slate-900 rounded-[2.5rem] shadow-2xl animate-in fade-in duration-500 border-b-8 border-indigo-900">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                       <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                       </span>
                       <span className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.4em] italic">Transmitting Logic...</span>
                    </div>
                    <span className="text-3xl font-black text-white italic tracking-tighter italic">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden p-0.5">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-blue-400 h-full transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.6)] rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* VERIFIED SUCCESS CARD */}
              {uploadedVideo && (
                <div className="bg-emerald-50 border-4 border-emerald-100 rounded-[3rem] p-10 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-14 h-14 bg-white rounded-[1.5rem] flex items-center justify-center text-emerald-600 shadow-xl shadow-emerald-200/50">
                      <CheckCircle2 size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-emerald-900 uppercase italic tracking-tight">Sync Complete</h3>
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.3em]">Asset archived in neural matrix</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                     <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-emerald-100 shadow-sm">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic flex items-center gap-1.5"><Clock size={10}/> Duration</p>
                        <p className="text-lg font-black text-slate-900 italic">{formatDuration(uploadedVideo.duration)}</p>
                     </div>
                     <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-emerald-100 shadow-sm">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic flex items-center gap-1.5"><ShieldCheck size={10}/> Status</p>
                        <p className="text-lg font-black text-slate-900 italic uppercase">Secure</p>
                     </div>
                  </div>
                </div>
              )}

              {errors.root && (
                <div className="p-6 bg-rose-50 border-2 border-rose-100 rounded-3xl flex gap-4 items-center text-rose-600 animate-shake">
                  <AlertCircle size={24} />
                  <p className="text-sm font-black italic uppercase tracking-tight">{errors.root.message}</p>
                </div>
              )}

              {/* SUBMIT BUTTON */}
              {!uploadedVideo && (
                <button
                  type="submit"
                  disabled={uploading || !selectedFile}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-300 text-white font-black py-6 rounded-[2rem] transition-all flex items-center justify-center gap-4 shadow-2xl shadow-indigo-200 group active:scale-95 border-b-4 border-indigo-800 active:border-b-0"
                >
                  {uploading ? (
                    <div className="flex items-center gap-3">
                      <span className="loading loading-spinner loading-md text-white"></span>
                      <span className="text-[11px] uppercase tracking-[0.3em] font-black italic">Executing Ingestion...</span>
                    </div>
                  ) : (
                    <>
                      <span className="text-[12px] uppercase tracking-[0.4em] font-black italic">Initialize Link</span>
                      <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminUpload;