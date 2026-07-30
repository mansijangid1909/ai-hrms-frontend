'use client';

import { useState } from 'react';
import { Building2, Bell, Palette, Clock, Save, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/utils';

const tabs = [
  { id: 'organization', label: 'Organization', icon: Building2 },
  { id: 'theme', label: 'Theme', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('organization');
  const [orgForm, setOrgForm] = useState({
    companyName: 'Acme Corp',
    logo: '',
    address: '123 Main St, San Francisco, CA',
    timezone: 'America/Los_Angeles',
    businessHours: '9:00 AM - 6:00 PM',
  });
  const [notifSettings, setNotifSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    leaveApprovals: true,
    payrollAlerts: true,
  });

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Settings" description="Manage your organization and system preferences" />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs Sidebar */}
        <div className="lg:w-56 shrink-0">
          <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all whitespace-nowrap',
                    activeTab === tab.id ? 'bg-indigo-gradient text-white shadow-glow-sm' : 'text-white/60 hover:bg-white/5 hover:text-white',
                  )}
                >
                  <Icon className="h-4 w-4" /> {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          {activeTab === 'organization' && (
            <div className="space-y-5 max-w-2xl">
              <h3 className="text-base font-semibold text-white">Company Information</h3>

              <div>
                <Label className="text-white/70 mb-2 block text-xs">Company Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02]">
                    <Upload className="h-6 w-6 text-white/30" />
                  </div>
                  <div>
                    <button className="text-xs text-indigo-400 hover:text-indigo-300">Upload logo</button>
                    <p className="text-[10px] text-white/30 mt-1">PNG, SVG up to 2MB</p>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-white/70 mb-1.5 block text-xs">Company Name</Label>
                <Input value={orgForm.companyName} onChange={(e) => setOrgForm({ ...orgForm, companyName: e.target.value })} className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <Label className="text-white/70 mb-1.5 block text-xs">Address</Label>
                <Input value={orgForm.address} onChange={(e) => setOrgForm({ ...orgForm, address: e.target.value })} className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-white/70 mb-1.5 block text-xs">Timezone</Label>
                  <select value={orgForm.timezone} onChange={(e) => setOrgForm({ ...orgForm, timezone: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                    <option value="America/Los_Angeles" className="bg-slate-900">Pacific Time</option>
                    <option value="America/New_York" className="bg-slate-900">Eastern Time</option>
                    <option value="Europe/London" className="bg-slate-900">London</option>
                    <option value="Asia/Kolkata" className="bg-slate-900">India</option>
                  </select>
                </div>
                <div>
                  <Label className="text-white/70 mb-1.5 block text-xs">Business Hours</Label>
                  <Input value={orgForm.businessHours} onChange={(e) => setOrgForm({ ...orgForm, businessHours: e.target.value })} className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>
              <Button onClick={handleSave} className="bg-indigo-gradient hover:opacity-90"><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-5 max-w-2xl">
              <h3 className="text-base font-semibold text-white">Theme Preferences</h3>
              <p className="text-sm text-white/50">Customize the appearance of your admin panel.</p>
              <div className="grid grid-cols-2 gap-4">
                {['Dark', 'Light'].map((theme) => (
                  <div key={theme} className={cn('rounded-xl border-2 p-4 cursor-pointer transition-all', theme === 'Dark' ? 'border-indigo-500 bg-indigo-500/5' : 'border-white/10 hover:border-white/20')}>
                    <div className={cn('h-24 rounded-lg mb-3', theme === 'Dark' ? 'bg-[#0b1120]' : 'bg-white border border-slate-200')} />
                    <div className="text-sm font-medium text-white">{theme} Mode</div>
                  </div>
                ))}
              </div>
              <Button onClick={handleSave} className="bg-indigo-gradient hover:opacity-90"><Save className="h-4 w-4 mr-2" /> Save Theme</Button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-5 max-w-2xl">
              <h3 className="text-base font-semibold text-white">Notification Preferences</h3>
              <div className="space-y-3">
                {(Object.keys(notifSettings) as (keyof typeof notifSettings)[]).map((key) => (
                  <div key={key} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <Checkbox
                      id={key}
                      checked={notifSettings[key]}
                      onCheckedChange={(checked) => setNotifSettings({ ...notifSettings, [key]: checked === true })}
                    />
                    <label htmlFor={key} className="text-sm text-white/70 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                  </div>
                ))}
              </div>
              <Button onClick={handleSave} className="bg-indigo-gradient hover:opacity-90"><Save className="h-4 w-4 mr-2" /> Save Preferences</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
