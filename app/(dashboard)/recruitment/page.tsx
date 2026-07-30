'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Star, Mail, Phone, Calendar, MoreVertical, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { mockCandidates, mockJobs, mockInterviews } from '@/services/mock/data';
import { useDebounce } from '@/hooks';
import { getInitials } from '@/utils';

const stages = ['APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'HIRED', 'REJECTED'] as const;
const stageColors: Record<string, string> = {
  APPLIED: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
  SCREENING: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300',
  INTERVIEW: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300',
  OFFER: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300',
  HIRED: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300',
  REJECTED: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300',
};

export default function RecruitmentPage() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const filtered = mockCandidates.filter((c) =>
    `${c.firstName} ${c.lastName} ${c.position} ${c.skills.join(' ')}`
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Recruitment"
        description="Manage candidates, job postings, and interviews."
        action={
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> Post a Job
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Open Positions', value: mockJobs.filter((j) => j.status === 'OPEN').length },
          { label: 'Total Candidates', value: mockCandidates.length },
          { label: 'In Interview', value: mockCandidates.filter((c) => c.stage === 'INTERVIEW').length },
          { label: 'Hired This Month', value: mockCandidates.filter((c) => c.stage === 'HIRED').length },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Job Postings */}
      <Card>
        <CardHeader>
          <CardTitle>Open Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {mockJobs.filter((j) => j.status === 'OPEN').map((job) => (
              <div key={job.id} className="rounded-xl border border-border p-4 transition-all hover:shadow-card-hover">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{job.department} • {job.location}</p>
                  </div>
                  <Badge variant="outline">{job.applicants} applicants</Badge>
                </div>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Posted {job.postedDate}</span>
                  <Button size="sm" variant="outline">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Candidates Pipeline */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Candidates Pipeline</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search candidates..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 sm:w-64" />
              </div>
              <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
            {stages.map((stage) => {
              const candidates = filtered.filter((c) => c.stage === stage);
              return (
                <div key={stage} className="rounded-xl border border-border bg-muted/30 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <Badge className={stageColors[stage]} variant="secondary">{stage}</Badge>
                    <span className="text-xs text-muted-foreground">{candidates.length}</span>
                  </div>
                  <div className="space-y-2">
                    {candidates.map((c) => (
                      <div key={c.id} className="rounded-lg border border-border bg-card p-3 transition-all hover:shadow-card-hover">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={c.avatar} />
                            <AvatarFallback>{getInitials(`${c.firstName} ${c.lastName}`)}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">{c.firstName} {c.lastName}</p>
                            <p className="truncate text-xs text-muted-foreground">{c.position}</p>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < Math.round(c.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`} />
                          ))}
                          <span className="ml-1 text-xs text-muted-foreground">{c.rating}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {c.skills.slice(0, 2).map((s) => (
                            <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                          ))}
                          {c.skills.length > 2 && <Badge variant="outline" className="text-xs">+{c.skills.length - 2}</Badge>}
                        </div>
                      </div>
                    ))}
                    {candidates.length === 0 && (
                      <div className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                        No candidates
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Interviews */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockInterviews.map((iv) => (
              <div key={iv.id} className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Avatar><AvatarFallback>{getInitials(iv.candidateName)}</AvatarFallback></Avatar>
                  <div>
                    <p className="font-medium">{iv.candidateName}</p>
                    <p className="text-sm text-muted-foreground">{iv.position} • {iv.round}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" /> {iv.date} at {iv.time}
                  </div>
                  <Badge variant="outline">{iv.type}</Badge>
                  <Button size="sm" variant="ghost"><MoreVertical className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
