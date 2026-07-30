'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactInput } from '@/utils/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function Contact() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Message sent! We will get back to you within 24 hours.');
    reset();
    setLoading(false);
  };

  return (
    <section className="py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Contact Us
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Let's talk about your HR needs
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Whether you're a team of 10 or 10,000, we'll help you find the right plan.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'hello@aihrms.com' },
                { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
                { icon: MapPin, label: 'Office', value: 'San Francisco, CA' },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{c.label}</div>
                    <div className="font-medium">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Name</label>
                <Input {...register('name')} placeholder="Jane Doe" />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Email</label>
                <Input type="email" {...register('email')} placeholder="jane@company.com" />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Company (optional)</label>
                <Input {...register('company')} placeholder="Company Inc." />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Message</label>
                <Textarea {...register('message')} placeholder="Tell us about your HR needs..." rows={4} />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
                {loading ? 'Sending...' : 'Send message'}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
