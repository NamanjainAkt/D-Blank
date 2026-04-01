'use client';

import Link from 'next/link';
import { 
  BookOpen, 
  Users, 
  Trophy,
  Star,
  ArrowRight,
  CheckCircle2,
  Code2,
  Clock,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import AnimatedContent from '@/components/AnimatedContent';
import GlareHover from '@/components/GlareHover';
import { courses, courseCategories, teamMembers, testimonials } from '@/lib/placeholder-data';
import { useState } from 'react';

const outcomes = [
  {
    title: "Real-World Projects",
    description: "Build a portfolio of 3+ fully playable games published on Steam or Play Store.",
    icon: Code2
  },
  {
    title: "Industry Portfolio",
    description: "Create professional-grade 3D assets and animations ready for AAA studios.",
    icon: Trophy
  },
  {
    title: "Placement Support",
    description: "Resume building, interview prep, and direct referrals to our partner studios.",
    icon: Users
  }
];

const processSteps = [
  { step: 1, title: 'Browse', description: 'Find your course' },
  { step: 2, title: 'Enroll', description: 'Sign up instantly' },
  { step: 3, title: 'Learn', description: 'Live sessions' },
  { step: 4, title: 'Certificate', description: 'Get certified' }
];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCourses = activeCategory === 'all'
    ? courses
    : courses.filter(c => c.category === activeCategory);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/30 via-black to-black" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[128px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedContent>
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm font-medium border-emerald-500/50 bg-emerald-500/10 text-emerald-400">
              <Sparkles className="w-4 h-4 mr-2" />
              AICTE Approved Training
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                Build Your Career in
              </span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
                Game Development
              </span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10">
              From zero to pro. Master the tools used by world-class studios with hands-on training from industry experts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-emerald-600 hover:from-violet-500 hover:to-emerald-500" asChild>
                <Link href="#courses">
                  Explore Courses
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-zinc-700 hover:bg-zinc-800" asChild>
                <Link href="/contact">
                  Talk to Advisor
                </Link>
              </Button>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="py-8 bg-zinc-950 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-violet-400">98%</div>
              <div className="text-sm text-zinc-500">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-emerald-400">50K+</div>
              <div className="text-sm text-zinc-500">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-violet-400">100%</div>
              <div className="text-sm text-zinc-500">Verified Content</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-emerald-400">Global</div>
              <div className="text-sm text-zinc-500">Certification</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedContent>
              <Badge variant="outline" className="mb-4 text-emerald-400 border-emerald-500/50">
                Outcomes
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                What You Will Achieve
              </h2>
              <div className="space-y-6">
                {outcomes.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-zinc-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedContent>

            <AnimatedContent delay={0.2}>
              <GlareHover
                background="linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.3) 100%)"
                borderColor="rgba(16, 185, 129, 0.3)"
                className="w-full !rounded-2xl border p-8 min-h-[400px]"
              >
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-600 to-violet-600 flex items-center justify-center mb-6">
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Career Ready</h3>
                  <p className="text-emerald-400 font-medium mb-4">12 Weeks to Transformation</p>
                  <p className="text-zinc-400 max-w-sm">
                    Transform from a beginner to a professional game developer with real-world projects and industry mentorship.
                  </p>
                </div>
              </GlareHover>
            </AnimatedContent>
          </div>
        </div>
      </section>

      <section className="py-16 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-violet-400 border-violet-500/50">
              Process
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">How It Works</h2>
          </AnimatedContent>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {processSteps.map((step, index) => (
              <AnimatedContent key={step.step} delay={index * 0.1}>
                <div className="relative p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-emerald-600 flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-1">{step.title}</h3>
                    <p className="text-sm text-zinc-500">{step.description}</p>
                  </div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section id="courses" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <Badge variant="outline" className="mb-4 text-violet-400 border-violet-500/50">
                  Courses
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Available Programs
                </h2>
              </div>
            </div>
          </AnimatedContent>

          <AnimatedContent delay={0.1} className="mb-8">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="bg-zinc-900">
                {courseCategories.map((cat) => (
                  <TabsTrigger 
                    key={cat.id} 
                    value={cat.id}
                    className="data-[state=active]:bg-violet-600 data-[state=active]:text-white"
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </AnimatedContent>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <AnimatedContent key={course.id} delay={index * 0.1}>
                <Card className="bg-zinc-900/50 border-zinc-800 hover:border-violet-500/50 transition-all group overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-violet-600 to-emerald-600" />
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="secondary" className="bg-violet-500/20 text-violet-400">
                        {course.category}
                      </Badge>
                      <Badge variant="outline" className="text-zinc-400">
                        {course.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-violet-400 transition-colors line-clamp-2">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-zinc-400 mt-2 line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <Users className="w-4 h-4" />
                        <span>{course.students} students</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span>{course.rating} rating</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-zinc-500 mb-1">Learning Outcomes:</div>
                      <ul className="space-y-1">
                        {course.outcomes.slice(0, 2).map((outcome, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator className="my-4 bg-zinc-800" />

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold">Rs{(course.price / 100).toLocaleString()}</span>
                      </div>
                      <Button className="bg-gradient-to-r from-violet-600 to-emerald-600 hover:from-violet-500 hover:to-emerald-500" asChild>
                        <Link href={`/enroll/${course.id}`}>
                          Enroll Now
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-violet-400 border-violet-500/50">
              Team
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">Our Instructors</h2>
          </AnimatedContent>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {teamMembers.slice(0, 4).map((member, index) => (
              <AnimatedContent key={member.id} delay={index * 0.1}>
                <Card className="bg-zinc-900/50 border-zinc-800 hover:border-violet-500/50 transition-colors text-center">
                  <CardContent className="pt-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-emerald-600 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white/80">
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <h3 className="font-semibold mb-1">{member.name}</h3>
                    <p className="text-sm text-violet-400 mb-2">{member.role}</p>
                    <p className="text-xs text-zinc-500 line-clamp-2">{member.bio}</p>
                  </CardContent>
                </Card>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-violet-400 border-violet-500/50">
              Success Stories
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">What Our Students Say</h2>
          </AnimatedContent>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.slice(0, 4).map((testimonial, index) => (
              <AnimatedContent key={testimonial.id} delay={index * 0.1}>
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-1 text-amber-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-zinc-300 mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-emerald-600 flex items-center justify-center text-white font-bold">
                        {testimonial.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-sm text-zinc-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-zinc-950 to-black border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedContent>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to <span className="text-violet-400">Level Up</span>?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Seats are limited for the next cohort. Secure your spot in the studio today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-emerald-600 hover:from-violet-500 hover:to-emerald-500" asChild>
                <Link href="/enroll">
                  Enroll Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-zinc-700 hover:bg-zinc-800" asChild>
                <Link href="/contact">
                  Talk to Advisor
                </Link>
              </Button>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <footer className="py-8 border-t border-zinc-800 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">D<span className="text-violet-500">Blanks</span></span>
            </div>
            <p className="text-sm text-zinc-500">
              2026 D-Blanks. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
