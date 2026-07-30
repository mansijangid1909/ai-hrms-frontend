'use client';

import { motion } from 'framer-motion';
import { Plus, BookOpen, Award, Clock, Star, GraduationCap, CheckCircle, PlayCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { PageHeader } from '@/components/dashboard/PageHeader';
import { mockCourses } from '@/services/mock/data';

const levelColors: Record<string, string> = {
  BEGINNER: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300',
  INTERMEDIATE: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300',
  ADVANCED: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300',
};

export default function LearningPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Learning & Development"
        description="Courses, certifications, and skill development."
        action={<Button className="bg-blue-600 hover:bg-blue-700"><Plus className="mr-2 h-4 w-4" /> Create Course</Button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Courses', value: mockCourses.length, icon: BookOpen, color: 'bg-blue-500' },
          { label: 'Enrolled', value: mockCourses.reduce((s, c) => s + c.enrolled, 0), icon: GraduationCap, color: 'bg-cyan-500' },
          { label: 'Completed', value: mockCourses.reduce((s, c) => s + c.completed, 0), icon: CheckCircle, color: 'bg-green-500' },
          { label: 'Avg Rating', value: '4.7', icon: Star, color: 'bg-yellow-500' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="flex items-center gap-3 pt-6">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.color} text-white`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockCourses.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-card-hover">
              <div className="h-32 bg-gradient-to-br from-blue-500 to-cyan-500 p-4">
                <GraduationCap className="h-8 w-8 text-white" />
                <div className="mt-2 flex items-center gap-2">
                  <Badge className={levelColors[c.level]} variant="secondary">{c.level}</Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white">{c.category}</Badge>
                </div>
              </div>
              <CardContent className="pt-4">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {c.duration}</span>
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {c.rating}</span>
                </div>
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{c.completed}/{c.enrolled} completed</span>
                    <span className="text-muted-foreground">{Math.round((c.completed / c.enrolled) * 100)}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-blue-500" style={{ width: `${(c.completed / c.enrolled) * 100}%` }} /></div>
                </div>
                <Button className="mt-4 w-full" variant="outline">
                  <PlayCircle className="mr-2 h-4 w-4" /> Enroll
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
