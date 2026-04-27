'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface EnrollmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EnrollmentFormModal({ isOpen, onClose, onSuccess }: EnrollmentFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [students, setStudents] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      studentId: '',
      courseId: '',
      paymentStatus: 'paid',
      paymentAmount: 0,
      paymentMethod: 'Manual/Direct Bank Transfer',
    }
  });

  useEffect(() => {
    if (isOpen) {
      // Fetch students and courses for dropdowns
      const fetchData = async () => {
        try {
          const [studentsRes, coursesRes] = await Promise.all([
            fetch('/api/admin/students?limit=1000'), // simplified fetch all for now
            fetch('/api/admin/courses')
          ]);
          
          if (studentsRes.ok) {
            const data = await studentsRes.json();
            setStudents(data.students || []);
          }
          
          if (coursesRes.ok) {
            const data = await coursesRes.json();
            setCourses(data.courses || []);
          }
        } catch (err) {
          console.error("Failed to load options", err);
        }
      };
      fetchData();
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      const selectedStudent = students.find(s => s._id === data.studentId);
      const selectedCourse = courses.find(c => c._id === data.courseId);

      if (!selectedStudent || !selectedCourse) {
        throw new Error("Please select valid Student and Course");
      }

      const payload = {
        studentId: selectedStudent._id,
        courseId: selectedCourse._id,
        courseName: selectedCourse.title,
        studentName: selectedStudent.name,
        studentEmail: selectedStudent.email,
        paymentStatus: data.paymentStatus,
        paymentAmount: Number(data.paymentAmount),
        paymentMethod: data.paymentMethod,
        enrollmentStatus: data.paymentStatus === 'paid' ? 'confirmed' : 'pending',
        paymentDate: data.paymentStatus === 'paid' ? new Date().toISOString() : null,
      };

      const res = await fetch('/api/admin/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to create enrollment');
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Submit error:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-ink border-white/5 max-w-xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-black text-white uppercase tracking-tighter">
            Manual Enrollment Allocation
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono uppercase tracking-widest rounded-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Select Entity (Student) *</Label>
              <Select value={watch('studentId')} onValueChange={(v) => setValue('studentId', v)}>
                <SelectTrigger className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono h-10">
                  <SelectValue placeholder="Select Student..." />
                </SelectTrigger>
                <SelectContent>
                  {students.map((s) => (
                    <SelectItem key={s._id} value={s._id} className="text-[10px] font-mono tracking-widest">
                      {s.name} ({s.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Select Module (Course) *</Label>
              <Select value={watch('courseId')} onValueChange={(v) => {
                setValue('courseId', v);
                const c = courses.find(course => course._id === v);
                if (c) setValue('paymentAmount', c.price);
              }}>
                <SelectTrigger className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono h-10">
                  <SelectValue placeholder="Select Course..." />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c._id} value={c._id} className="text-[10px] font-mono uppercase tracking-widest">
                      {c.title} - ₹{c.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Payment Status</Label>
                <Select value={watch('paymentStatus')} onValueChange={(v) => setValue('paymentStatus', v)}>
                  <SelectTrigger className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid" className="text-[10px] font-mono uppercase tracking-widest">Paid</SelectItem>
                    <SelectItem value="pending" className="text-[10px] font-mono uppercase tracking-widest">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Amount Paid (₹)</Label>
                <Input type="number" {...register('paymentAmount')} className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Payment Method / Note</Label>
              <Input {...register('paymentMethod')} className="bg-black/40 border-white/5 focus:border-acid-green/50 text-sm font-mono" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
            <Button type="button" variant="ghost" onClick={onClose} className="text-[10px] font-mono uppercase tracking-widest hover:bg-white/5 hover:text-white">
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !watch('studentId') || !watch('courseId')} className="bg-acid-green text-black hover:bg-acid-green/90 text-[10px] font-mono font-bold uppercase tracking-widest px-8 disabled:opacity-50">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Create Allocation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}