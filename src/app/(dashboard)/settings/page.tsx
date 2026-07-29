'use client';

import { motion } from 'framer-motion';
import { User, Bell, Shield, Palette, Globe, Database, Key } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { useAuth } from '@//hooks';
import { getInitials } from '@//utils';

const sections = [
  { icon: User, title: 'Profile', description: 'Update your personal information' },
  { icon: Bell, title: 'Notifications', description: 'Manage notification preferences' },
  { icon: Shield, title: 'Security', description: 'Password and 2FA settings' },
  { icon: Palette, title: 'Appearance', description: 'Theme and display preferences' },
  { icon: Globe, title: 'Language', description: 'Language and region settings' },
  { icon: Database, title: 'Data & Privacy', description: 'Manage your data' },
  { icon: Key, title: 'API Keys', description: 'Manage API access' },
];

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your account and preferences." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader><CardTitle>Navigation</CardTitle></CardHeader>
          <CardContent className="space-y-1">
            {sections.map((s) => (
              <div key={s.title} className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer hover:bg-muted">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                  <s.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.description}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader><CardTitle>Profile Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user ? getInitials(user.name) : 'U'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="mt-1 text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input defaultValue={user?.name} className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input defaultValue={user?.email} className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Department</Label>
                    <Input defaultValue={user?.department} className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Position</Label>
                    <Input defaultValue={user?.position} className="mt-1.5" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader><CardTitle>Notification Preferences</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Email notifications', description: 'Receive emails about your account' },
                  { label: 'Push notifications', description: 'Get push alerts on your devices' },
                  { label: 'Weekly digest', description: 'Summary of your week every Monday' },
                  { label: 'Product updates', description: 'News about new features' },
                ].map((n) => (
                  <div key={n.label} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{n.label}</div>
                      <div className="text-xs text-muted-foreground">{n.description}</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
