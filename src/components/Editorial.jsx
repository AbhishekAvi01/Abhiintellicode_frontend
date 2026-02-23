import { useState, useRef, useEffect } from 'react';
import { Pause, Play, Maximize, Volume2, RotateCcw, Video, VolumeX, Volume1 } from 'lucide-react';

const Editorial = ({ secureUrl, thumbnailUrl, duration }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [volume, setVolume] = useState(1); // Volume state (0 to 1)
  const [isMuted, setIsMuted] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // FULLSCREEN LOGIC
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.() || 
      containerRef.current.webkitRequestFullscreen?.() || 
      containerRef.current.msRequestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  // VOLUME CONTROL LOGIC
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      if (newMutedState) setVolume(0);
      else {
        videoRef.current.volume = 0.5;
        setVolume(0.5);
      }
    }
  };

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    const handleTimeUpdate = () => { if (video) setCurrentTime(video.currentTime); };
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      return () => video.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-700 font-sans">
      {/* Title Bar */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600 border border-indigo-100 shadow-sm"><Video size={18} /></div>
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Video Editorial</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Neural Logic Visualization</p>
          </div>
        </div>
      </div>

      {/* Player Container */}
      <div 
        ref={containerRef}
        className="relative group w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-black"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <video
          ref={videoRef}
          src={secureUrl}
          poster={thumbnailUrl}
          onClick={togglePlayPause}
          className="w-full h-full object-contain cursor-pointer"
        />

        {!isPlaying && (
          <button onClick={togglePlayPause} className="absolute inset-0 m-auto w-16 h-16 bg-indigo-600/90 text-white rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm transition-transform hover:scale-110 z-20"><Play size={28} fill="currentColor" className="ml-1" /></button>
        )}

        {/* Controls Overlay */}
        <div className={`absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-500 flex flex-col gap-4 ${isHovering || !isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          
          {/* Timeline Seekbar */}
          <div className="relative w-full h-1 bg-white/20 rounded-full cursor-pointer group/seek">
            <div className="absolute left-0 top-0 h-full bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" style={{ width: `${(currentTime / duration) * 100}%` }} />
            <input type="range" min="0" max={duration} value={currentTime} onChange={handleSeek} className="absolute inset-0 w-full opacity-0 cursor-pointer" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button onClick={togglePlayPause} className="text-white hover:text-indigo-400 transition-colors">
                {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
              </button>
              
              {/* VOLUME SECTION */}
              <div className="flex items-center gap-2 group/volume relative">
                <button onClick={toggleMute} className="text-white/80 hover:text-white transition-colors">
                  {isMuted || volume === 0 ? <VolumeX size={20}/> : volume < 0.5 ? <Volume1 size={20}/> : <Volume2 size={20}/>}
                </button>
                <input 
                  type="range" min="0" max="1" step="0.05" value={volume} 
                  onChange={handleVolumeChange}
                  className="w-0 group-hover/volume:w-20 transition-all duration-300 h-1 accent-indigo-500 cursor-pointer bg-white/20 rounded-full appearance-none"
                />
              </div>

              <div className="text-[10px] font-black text-white/90 italic tracking-tighter">
                <span className="text-indigo-400">{formatTime(currentTime)}</span>
                <span className="mx-1 opacity-30">/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center gap-5">
               <button onClick={() => {if(videoRef.current) videoRef.current.currentTime -= 10}} className="text-white/60 hover:text-white transition-colors"><RotateCcw size={18}/></button>
               <button onClick={toggleFullScreen} className="text-white/70 hover:text-white transition-all hover:scale-110 p-1"><Maximize size={20}/></button>
            </div>
          </div>
        </div>
      </div>

      {/* Instructional Tag */}
      <div className="bg-white border-2 border-slate-100 rounded-3xl p-5 flex gap-4 items-center shadow-sm">
         <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-lg shadow-inner">i</div>
         <p className="text-[11px] font-bold text-slate-500 italic leading-relaxed">
           Neural Guide: You can now adjust volume precision or use <span className="text-indigo-600 font-black">'M'</span> to mute during high-intensity coding.
         </p>
      </div>
    </div>
  );
};

export default Editorial;