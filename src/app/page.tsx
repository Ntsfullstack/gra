'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Clock, Code, Terminal, Cpu, Mail, Phone, Zap, Binary, Server, Sparkles, Radio } from 'lucide-react';

export default function GraduationInvite() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  type Particle = { id: number; x: number; y: number; speed: number; size: number };
  type Ripple = { id: number; x: number; y: number };
  const [particles, setParticles] = useState<Particle[]>([]);
  const [hackText, setHackText] = useState('INITIALIZING...');
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [glitchActive, setGlitchActive] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [loading, setLoading] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const w = typeof window !== 'undefined' ? window.innerWidth : 0;
  const h = typeof window !== 'undefined' ? window.innerHeight : 0;
  const tiltX = h ? ((mousePos.y - h / 2) / h) * 4 : 0;
  const tiltY = w ? ((mousePos.x - w / 2) / w) * -4 : 0;
  type BootStep = { text: string; status: 'ok' | 'warn' | 'info' };
  const bootSteps: BootStep[] = [
    { text: 'Initializing kernel...', status: 'info' },
    { text: 'Mounting file systems...', status: 'ok' },
    { text: 'Starting network services...', status: 'ok' },
    { text: 'Entropy low, reseeding RNG...', status: 'warn' },
    { text: 'Loading graphics driver...', status: 'ok' },
    { text: 'Calibrating sensors...', status: 'info' },
    { text: 'Starting matrix renderer...', status: 'ok' },
    { text: 'Decrypting invitation payload...', status: 'ok' },
    { text: 'Verifying RSVP channel...', status: 'warn' },
    { text: 'Boot sequence complete', status: 'ok' }
  ];

  // Countdown timer
  useEffect(() => {
    const targetDate = new Date('2026-01-24T09:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMounted(true);
    
    // Hack text animation
    const texts = ['LOADING...', 'DECRYPTING...', 'SCANNING...', 'ACCESS GRANTED', 'WELCOME', 'INITIALIZING...'];
    let index = 0;
    const hackInterval = setInterval(() => {
      setHackText(texts[index % texts.length]);
      index++;
    }, 1200);

    // Glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 4000);

    // Particle generation
    const particleInterval = setInterval(() => {
      setParticles(prev => [...prev.slice(-30), {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: -10,
        speed: Math.random() * 3 + 1,
        size: Math.random() * 3 + 1
      }]);
    }, 200);

    // Canvas animation for matrix effect
    const canvas = canvasRef.current;
    if (canvas) {
      const c = canvas as HTMLCanvasElement;
      const ctx = c.getContext('2d');
      if (!ctx) return;
      const context = ctx!;
      c.width = window.innerWidth;
      c.height = window.innerHeight;

      const chars = '01アイウエオカキクケコサシスセソABCDEF♦♣♠♥';
      const fontSize = 14;
      const columns = canvas.width / fontSize;
      const drops = Array(Math.floor(columns)).fill(1);

      function draw() {
        context.fillStyle = 'rgba(0, 0, 0, 0.05)';
        context.fillRect(0, 0, c.width, c.height);
        
        context.fillStyle = '#0F0';
        context.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          context.fillText(text, i * fontSize, drops[i] * fontSize);
          
          if (drops[i] * fontSize > c.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }

      const matrixInterval = setInterval(draw, 33);
      
      return () => {
        clearInterval(hackInterval);
        clearInterval(particleInterval);
        clearInterval(matrixInterval);
        clearInterval(glitchInterval);
      };
    }

    return () => {
      clearInterval(hackInterval);
      clearInterval(particleInterval);
      clearInterval(glitchInterval);
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setStepIndex(prev => {
        const next = Math.min(prev + 1, bootSteps.length);
        setProgress(Math.floor((next / bootSteps.length) * 100));
        if (next === bootSteps.length) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 600);
        }
        return next;
      });
    }, 180);
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples(prev => [...prev, newRipple]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  const eventDetails = {
    title: "GRADUATION.EXE",
    degree: "INFORMATION TECHNOLOGY",
    studentName: "NGUUYỄN TRƯỜNG SƠN",
    studentId: "ID: #2121050703",
    date: "24.01.2026",
    time: "10:00 AM",
    venue: "HANOI UNIVERSITY OF MINING AND GEOLOGY AUDITORIUM",
    address: "18 P. Viên, Đông Ngạc, Bắc Từ Liêm, Hà Nội",
 
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
          <div className="bg-black border-2 border-cyan-400 rounded-xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/50 w-[90%] max-w-xl">
            <div className="flex items-center gap-2 justify-center text-cyan-400 font-mono text-sm mb-4">
              <Terminal className="w-5 h-5 animate-pulse" />
              <span>BOOTING SYSTEM</span>
            </div>
            <div className="bg-gray-900/80 border border-cyan-400/50 rounded p-4 font-mono text-xs text-cyan-300 h-40 overflow-hidden">
              <div className="h-full overflow-y-hidden">
              {Array.from({ length: stepIndex }).map((_, i) => {
                const s = bootSteps[i];
                const label =
                  s.status === 'ok' ? '[OK]' : s.status === 'warn' ? '[WARN]' : '[INFO]';
                const color =
                  s.status === 'ok' ? 'text-green-400' : s.status === 'warn' ? 'text-yellow-400' : 'text-cyan-400';
                return (
                  <div key={i} className="flex items-center gap-2">
                    <span className={color}>{label}</span>
                    <span>{s.text}</span>
                  </div>
                );
              })}
              </div>
            </div>
            <div className="mt-4">
              <div className="relative h-2 w-full bg-gray-900 rounded overflow-hidden">
                <div className="h-2 bg-cyan-400 rounded" style={{ width: `${progress}%`, transition: 'width 0.18s linear' }} />
              </div>
              <div className="mt-2 text-center text-cyan-400 font-mono text-xs">{progress}%</div>
            </div>
          </div>
        </div>
      )}
      {/* Matrix canvas background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 opacity-20"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20" />
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{animationDuration: '5s'}}></div>
        <div className="absolute -bottom-1/4 left-1/3 w-1/2 h-1/2 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{animationDuration: '6s'}}></div>
      </div>

      {/* Floating particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute bg-cyan-400 rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `fall ${particle.speed}s linear infinite`,
            boxShadow: '0 0 10px rgba(0,255,255,0.8)'
          }}
        />
      ))}

      {/* Click ripples */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute border-2 border-cyan-400 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            animation: 'ripple 1s ease-out'
          }}
        />
      ))}

      {/* Mouse glow effect */}
      <div 
        className="pointer-events-none fixed w-96 h-96 rounded-full opacity-30 blur-3xl transition-all duration-200"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,255,0.4) 0%, rgba(168,85,247,0.4) 50%, transparent 70%)',
          left: mousePos.x - 192,
          top: mousePos.y - 192,
        }}
      />

      {/* Laser grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            style={{
              top: `${i * 10}%`,
              animation: `slideRight ${2 + i * 0.3}s linear infinite`
            }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-purple-400 to-transparent"
            style={{
              left: `${i * 10}%`,
              animation: `slideDown ${2 + i * 0.3}s linear infinite`
            }}
          />
        ))}
      </div>

      <div className={`relative z-10 min-h-screen p-4 sm:p-8 transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        {/* Top status bar */}
          <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-black/70 border border-cyan-400/30 rounded-xl p-4 backdrop-blur-md font-mono shadow">
            <div className="flex flex-wrap items-center justify-between gap-4 text-cyan-200">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5" />
                <span className="text-sm">STATUS: <span className="text-green-400">ONLINE</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                <span className="text-sm">{hackText}</span>
              </div>
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">BROADCASTING: <span className="text-yellow-400">LIVE</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Main container */}
        <div className="max-w-6xl mx-auto">
          {/* Holographic title */}
          <div className="text-center mb-12 relative">
            <div className="relative inline-block">
              <Sparkles className="absolute -top-8 -left-8 w-12 h-12 text-yellow-400 animate-spin" style={{animationDuration: '3s'}} />
              <Sparkles className="absolute -top-8 -right-8 w-12 h-12 text-pink-400 animate-spin" style={{animationDuration: '4s'}} />
              
              <h1 className={`text-6xl sm:text-9xl font-black mb-4 relative transition-all duration-150 ${glitchActive ? 'glitch' : ''}`}>
                <span className="absolute inset-0 blur-3xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-70 animate-pulse"></span>
                <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                  {eventDetails.title}
                </span>
              </h1>
              <div className="flex items-center justify-center gap-3 text-cyan-400 text-2xl font-mono mb-6">
                <Binary className="w-8 h-8 animate-spin" style={{animationDuration: '4s'}} />
                <span className="tracking-widest font-bold">{eventDetails.degree}</span>
                <Binary className="w-8 h-8 animate-spin" style={{animationDuration: '4s', animationDirection: 'reverse'}} />
              </div>

              {/* COUNTDOWN TIMER */}
              <div className="relative mt-8">
                <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-50 animate-pulse"></div>
                <div className="relative bg-black/80 border-2 border-cyan-400 rounded-2xl p-6 backdrop-blur-xl inline-block shadow-2xl shadow-purple-500/50">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
                    <p className="text-cyan-400 font-mono text-sm tracking-widest">EVENT COUNTDOWN</p>
                    <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
                  </div>
                  <div className="grid grid-cols-4 gap-4 sm:gap-6">
                    {[
                      { value: countdown.days, label: 'DAYS' },
                      { value: countdown.hours, label: 'HOURS' },
                      { value: countdown.minutes, label: 'MINS' },
                      { value: countdown.seconds, label: 'SECS' }
                    ].map((item, index) => (
                      <div key={index} className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative bg-gradient-to-br from-gray-900 to-black border border-purple-400 rounded-lg p-3 sm:p-4">
                          <div className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-400 tabular-nums">
                            {String(item.value).padStart(2, '0')}
                          </div>
                          <div className="text-xs sm:text-sm text-purple-300 font-mono mt-1 tracking-wider">
                            {item.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main card with 3D effect */}
          <div className="relative mt-12">
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur opacity-70"></div>
            <div className="relative bg-black/50 border border-cyan-400/30 rounded-2xl overflow-hidden shadow-xl" style={{ transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`, transition: 'transform 0.1s linear' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent" style={{backgroundSize: '100% 200%', animation: 'scan 6s linear infinite'}}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/10 to-transparent" style={{animation: 'sweep 10s linear infinite'}}></div>
              <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: 'linear-gradient(rgba(0,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.4) 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>

              <div className="relative p-8 sm:p-12">
                {/* Terminal header */}
                <div className="bg-black/60 border border-cyan-400/30 rounded-lg p-4 mb-8 backdrop-blur-sm shadow">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50"></div>
                        <div className="w-4 h-4 rounded-full bg-yellow-500 animate-pulse shadow-lg shadow-yellow-500/50" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" style={{animationDelay: '0.4s'}}></div>
                      </div>
                      <span className="text-cyan-400 font-mono text-sm">root@graduation:~$</span>
                    </div>
                    <div className="text-pink-400 font-mono text-sm flex items-center gap-2">
                      <Cpu className="w-5 h-5" />
                      <span>INVITATION PROTOCOL v3.0</span>
                    </div>
                  </div>
                </div>

                {/* Student info with holographic effect */}
                <div className="text-center mb-12 relative">
                  <div className="inline-block relative">
                    <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-cyan-500 to-purple-500 opacity-60 animate-pulse"></div>
                    <h2 className={`relative text-4xl sm:text-4xl font-black text-white mb-3 tracking-tight ${glitchActive ? 'glitch' : ''}`}>
                      {eventDetails.studentName}
                    </h2>
                  </div>
                  <p className="text-cyan-400 font-mono text-lg mb-3 animate-pulse">{eventDetails.studentId}</p>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-900/70 to-pink-900/70 px-8 py-3 rounded-full border-2 border-purple-400 shadow-lg shadow-purple-500/50">
                    <Code className="w-6 h-6 text-purple-400 animate-pulse" />
                    <span className="text-purple-300 font-mono font-bold tracking-widest">CLASS OF 2026</span>
                  </div>
                </div>

                {/* Event details grid */}
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  {[
                    { icon: Calendar, label: 'DATE', value: eventDetails.date, color: 'cyan' },
                    { icon: Clock, label: 'TIME', value: eventDetails.time, color: 'purple' },
                    { icon: MapPin, label: 'VENUE', value: eventDetails.venue, color: 'pink', sub: eventDetails.address },
                    
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="group relative bg-black/50 border border-cyan-400/30 rounded-xl p-5 backdrop-blur-md hover:scale-[1.02] transition-all duration-300 shadow overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-purple-500/10 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative flex items-start gap-4">
                        <div className="p-2.5 bg-black/40 rounded-lg border border-cyan-400/30">
                          <item.icon className="w-7 h-7 text-cyan-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-cyan-300 font-mono text-xs mb-1 tracking-widest">{item.label}</p>
                          <p className="text-white font-semibold text-lg leading-tight">{item.value}</p>
                          {item.sub && <p className="text-cyan-200/70 text-sm mt-2">{item.sub}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* RSVP Section */}
                <div className="relative bg-black/60 border border-cyan-400/30 rounded-xl p-8 backdrop-blur-md shadow">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                    <div className="bg-black px-8 py-3 border border-cyan-400/30 rounded-full shadow">
                      <span className="text-cyan-300 font-mono font-bold tracking-widest text-lg">RSVP REQUIRED</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <div className="flex items-center gap-3 bg-black/50 px-8 py-4 rounded-lg border border-purple-400/30 hover:border-purple-400/50 transition-all shadow hover:scale-[1.02]">
                      <Phone className="w-6 h-6 text-purple-400" />
                      <span className="text-white font-mono font-bold text-lg">0329442505</span>
                    </div>
                    <div className="flex items-center gap-3 bg-black/50 px-8 py-4 rounded-lg border border-pink-400/30 hover:border-pink-400/50 transition-all shadow hover:scale-[1.02]">
                      <Mail className="w-6 h-6 text-pink-400" />
                      <span className="text-white font-mono font-bold text-lg">nts.dev03@gmail.com</span>
                    </div>
                  </div>
                </div>

                {/* Footer quote */}
                <div className="mt-8 text-center">
                  <div className="relative inline-block">
                    <p className="text-gray-300 italic text-xl mb-4 relative z-10">
                      "Code is poetry, and today we publish our masterpiece"
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-3 text-cyan-400 font-mono text-lg animate-pulse">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span>{'>'}</span>
                    <span>Your presence will be our greatest achievement</span>
                    <span>{'<'}</span>
                    <Zap className="w-5 h-5 text-yellow-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom status bar */}
          <div className="mt-8 bg-black/70 border border-cyan-400/30 rounded-lg p-4 backdrop-blur-md shadow">
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-cyan-200">
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                SYSTEM ONLINE
              </div>
              <div className="text-cyan-300">ENCRYPTION: AES-256</div>
              <div className="text-purple-300">PROTOCOL: HTTPS</div>
              <div className="flex items-center gap-2 text-pink-300">
                <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                STATUS: INVITATION SENT
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        @keyframes scan {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 0% 200%;
          }
        }
        @keyframes sweep {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          50% { transform: translateX(50%) translateY(50%) rotate(45deg); }
          100% { transform: translateX(200%) translateY(200%) rotate(45deg); }
        }
        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
            margin: 0;
          }
          100% {
            width: 200px;
            height: 200px;
            opacity: 0;
            margin: -100px;
          }
        }
        @keyframes slideRight {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes slideDown {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        .glitch {
          animation: glitch 0.3s linear;
        }
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
        @keyframes loader {
          0% { width: 0% }
          50% { width: 60% }
          100% { width: 100% }
        }
      `}</style>
    </div>
  );
}
