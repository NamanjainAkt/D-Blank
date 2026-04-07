'use client';

import { useState } from 'react';
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
  Gamepad2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ParticleField } from '@/components/ui/ParticleField';
import { GlitchText } from '@/components/ui/GlitchText';
import { GlowButton } from '@/components/ui/GlowButton';
import { HoverScale } from '@/components/ui/HoverScale';
import AnimatedContent from '@/components/AnimatedContent';
import GlareHover from '@/components/GlareHover';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const contactMethods = [
    {
      title: "Email Us",
      description: "Send us an email anytime",
      value: "arshgupta723@gmail.com",
      icon: Mail
    },
    {
      title: "Join Discord",
      description: "Connect with our community",
      value: "discord.gg/dblanks",
      icon: MessageCircle
    },
    {
      title: "Call Us",
      description: "Mon-Fri, 9am-6pm IST",
      value: "+91 9340576811",
      icon: Smartphone
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Particle Field Background */}
        <ParticleField 
          particleCount={30} 
          color="rgba(176, 38, 255, 0.2)" 
          className="z-0" 
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/30 via-black to-black" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[128px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedContent>
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm font-medium border-violet-500/50 bg-violet-500/10 text-violet-400">
              Contact Us
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <GlitchText textClassName="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                Get in Touch
              </GlitchText>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10">
              Have questions? We would love to hear from you. Reach out and we will respond as soon as possible.
            </p>
          </AnimatedContent>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <AnimatedContent key={method.title} delay={index * 0.1}>
                <HoverScale scale={1.05} className="h-full">
                  <GlareHover
                    background="linear-gradient(135deg, rgba(88, 28, 135, 0.2) 0%, rgba(30, 10, 60, 0.4) 100%)"
                    borderColor="rgba(139, 92, 246, 0.2)"
                    className="w-full h-full !rounded-xl border p-6"
                  >
                    <Card className="bg-transparent border-0 shadow-none w-full">
                      <CardHeader className="p-0 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-violet-500/20 flex items-center justify-center mb-4">
                          <method.icon className="w-6 h-6 text-violet-400" />
                        </div>
                        <CardTitle className="text-lg">{method.title}</CardTitle>
                        <CardDescription className="text-zinc-400">
                          {method.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <p className="text-violet-400 font-medium">{method.value}</p>
                      </CardContent>
                    </Card>
                  </GlareHover>
                </HoverScale>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 bg-zinc-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent>
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we will get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-zinc-800 border-zinc-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-zinc-800 border-zinc-700 resize-none"
                    />
                  </div>
                  <GlowButton type="submit" variant="primary" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </GlowButton>
                </form>
              </CardContent>
            </Card>
          </AnimatedContent>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedContent>
              <Card className="bg-zinc-900/50 border-zinc-800 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-violet-400" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400 mb-4">
                    Visit our studio to see what we are working on.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-white">D-Blanks Studio</p>
                    <p className="text-zinc-500">Sindhya nagar, Durg 491001</p>
                    <p className="text-zinc-500">India</p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedContent>

            <AnimatedContent delay={0.1}>
              <Card className="bg-zinc-900/50 border-zinc-800 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-violet-400" />
                    Working Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400 mb-4">
                    We are available during these hours.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Monday - Friday</span>
                      <span className="text-white">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Saturday</span>
                      <span className="text-white">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Sunday</span>
                      <span className="text-red-400">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedContent>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <Footer2 />
    </main>
  );
}
