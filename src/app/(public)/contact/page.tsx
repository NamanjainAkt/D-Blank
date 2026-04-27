'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import Footer2 from "@/components/Footer2";
import { 
  Mail, 
  MessageCircle, 
  Smartphone,
  Send,
  MapPin,
  Clock,
  Terminal,
  ShieldAlert,
  Fingerprint,
  Globe
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ParticleField } from '@/components/ui/ParticleField';
import { GlowButton } from '@/components/ui/GlowButton';
import { CrystalButton } from '@/components/ui/CrystalButton';
import { MorphingBlobs } from '@/components/ui/MorphingBlobs';
import { MagneticCursor } from '@/components/ui/MagneticCursor';
import AnimatedContent from '@/components/AnimatedContent';
import GlareHover from '@/components/GlareHover';
import { cn } from '@/lib/utils';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isMethodsVisible, setIsMethodsVisible] = useState(false);
  const methodsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMethodsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (methodsRef.current) {
      observer.observe(methodsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message');

      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      title: "Email",
      description: "Send us an email",
      value: "arshgupta723@gmail.com",
      icon: Mail,
      color: "text-primary"
    },
    {
      title: "Discord",
      description: "Join our community",
      value: "discord.gg/dblanks",
      icon: MessageCircle,
      color: "text-accent"
    },
    {
      title: "Phone",
      description: "Call us anytime",
      value: "+91 9340576811",
      icon: Smartphone,
      color: "text-blue-500"
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white relative isolate selection:bg-primary/30">
      <MagneticCursor />
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <MorphingBlobs 
          colors={['rgba(168, 85, 247, 0.12)', 'rgba(56, 189, 248, 0.08)']} 
          className="opacity-40"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168, 85, 247, 0.05),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
      </div>

      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedContent>
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.3em] border-primary/40 bg-primary/5 text-primary">
              <Fingerprint className="w-4 h-4 mr-2 animate-pulse" />
              Contact Us
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-8 uppercase italic leading-[0.95] px-4">
              <span className="bg-gradient-to-r from-primary via-blue-500 to-primary bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h1>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto mb-10 font-mono text-[13px] uppercase tracking-[0.2em] leading-relaxed px-4">
              Have questions? We'd love to hear from you. We'll get back to you within 24 hours.
            </p>
          </AnimatedContent>
        </div>
      </section>

      {/* Contact Methods - Node Matrix */}
      <section className="pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={methodsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div 
                key={method.title}
                className={`transition-all duration-700 ease-out transform ${isMethodsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <GlareHover
                  background="linear-gradient(135deg, rgba(39, 39, 42, 0.4) 0%, rgba(9, 9, 11, 0.8) 100%)"
                  borderColor="rgba(255, 255, 255, 0.05)"
                  className="w-full h-full !rounded-[2rem] border relative group overflow-hidden"
                >
                  <div className="p-8 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center mb-8 group-hover:border-primary/40 transition-colors shadow-inner">
                      <method.icon className={cn("w-7 h-7", method.color)} />
                    </div>
                    <h3 className="text-xl font-black italic uppercase tracking-tighter mb-2 group-hover:text-primary transition-colors">{method.title}</h3>
                    <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-6">
                      {method.description}
                    </p>
                    <p className="font-mono text-xs text-white tracking-widest break-all">
                      {method.value}
                    </p>
                  </div>
                  {/* Background Detail */}
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Terminal className="w-20 h-20" />
                  </div>
                </GlareHover>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form - Secure Uplink Terminal */}
      <section className="py-24 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedContent>
            <div className="relative p-1 rounded-[3rem] bg-gradient-to-b from-white/10 to-transparent border border-white/5 overflow-hidden shadow-2xl">
              <div className="bg-zinc-950/80 backdrop-blur-2xl rounded-[2.8rem] p-8 md:p-12 relative overflow-hidden">
                {/* Scanline Effect Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] opacity-[0.03]" />
                
                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/5">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <Terminal className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">Send Us a Message</h2>
                    <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.3em]">We'll respond within 24 hours</p>
                  </div>
                </div>

                {success && (
                  <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] uppercase tracking-widest text-center animate-fade-up">
                    Operation Successful // Message Dispatched
                  </div>
                )}

                {error && (
                  <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-[10px] uppercase tracking-widest text-center animate-fade-up">
                    Critical Error // {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary/80 ml-1">Your Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-12 bg-zinc-900/50 border-white/5 focus:border-primary/50 text-[11px] font-mono uppercase tracking-widest rounded-xl transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary/80 ml-1">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-12 bg-zinc-900/50 border-white/5 focus:border-primary/50 text-[11px] font-mono uppercase tracking-widest rounded-xl transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="subject" className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary/80 ml-1">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="h-12 bg-zinc-900/50 border-white/5 focus:border-primary/50 text-[11px] font-mono uppercase tracking-widest rounded-xl transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary/80 ml-1">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-zinc-900/50 border-white/5 focus:border-primary/50 text-[11px] font-mono uppercase tracking-[0.2em] rounded-2xl resize-none transition-all"
                    />
                  </div>
                  
                  <div className="flex justify-center pt-4">
                    <div data-magnetic>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary font-black italic uppercase tracking-widest px-10 py-4 rounded-xl transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? 'Dispatching...' : 'Send Message'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* Location & Hours - Refined Matrix Cards */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedContent>
              <div className="group p-10 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 hover:border-primary/20 transition-all duration-500 h-full relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-zinc-950 border border-white/10 group-hover:border-primary/30 transition-colors">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tighter italic">Our Location</h3>
                  </div>
                  <div className="space-y-4 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors leading-relaxed">
                    <p className="text-white font-black italic">D-Blanks Gaming Studio</p>
                    <p>Sindhya Nagar, Durg 491001</p>
                    <p>Chhattisgarh, India</p>
                  </div>
                </div>
                {/* Background Detail */}
                <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                  <Globe className="w-60 h-60" />
                </div>
              </div>
            </AnimatedContent>

            <AnimatedContent delay={0.1}>
              <div className="group p-10 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 hover:border-primary/20 transition-all duration-500 h-full relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-zinc-950 border border-white/10 group-hover:border-primary/30 transition-colors">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tighter italic">Business Hours</h3>
                  </div>
                  <div className="space-y-6 font-mono text-[10px] uppercase tracking-[0.25em]">
                    {[
                      { days: "Mon - Fri", hours: "09:00 - 18:00 IST", active: true },
                      { days: "Saturday", hours: "10:00 - 16:00 IST", active: true },
                      { days: "Sunday", hours: "OFFLINE", active: false }
                    ].map((slot, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-zinc-500">{slot.days}</span>
                        <span className={cn(slot.active ? "text-white" : "text-red-500/60")}>{slot.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Background Detail */}
                <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                  <ShieldAlert className="w-60 h-60" />
                </div>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </section>

      <Footer />
      <Footer2 />
    </main>
  );
}
