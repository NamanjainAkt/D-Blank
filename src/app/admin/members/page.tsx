'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Edit, Loader2, Users, Trash2, CheckCircle2 } from 'lucide-react';
import { MemberFormModal } from '@/components/admin/members/MemberFormModal';

interface Member {
  _id: string;
  name: string;
  designation: string;
  bio: string;
  skills: string[];
  image: string;
  handle: string;
  type: 'founder' | 'team';
  status: 'active' | 'inactive';
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  createdAt: string;
}

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (filterType !== 'all') params.set('type', filterType);
      if (filterStatus !== 'all') params.set('status', filterStatus);
      
      const res = await fetch(`/api/admin/members?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch members');
      const data = await res.json();
      setMembers(data.members || []);
    } catch (err) {
      console.error('Error fetching members:', err);
      setError('Failed to load members. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [filterType, filterStatus]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleToggleStatus = async (member: Member) => {
    try {
      const nextStatus = member.status === 'active' ? 'inactive' : 'active';
      const res = await fetch(`/api/admin/members/${member._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');
      fetchMembers();
      showSuccess(`Member ${nextStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
    } catch (err) {
      console.error('Error toggling status:', err);
      alert('Failed to update member status');
    }
  };

  const handleDelete = async (member: Member) => {
    if (!confirm(`Are you sure you want to delete ${member.name}?`)) return;
    
    try {
      const res = await fetch(`/api/admin/members/${member._id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete member');
      fetchMembers();
      showSuccess('Member deleted successfully');
    } catch (err) {
      console.error('Error deleting member:', err);
      alert('Failed to delete member');
    }
  };

  const filteredMembers = members.filter(member => {
    const searchLower = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(searchLower) ||
      member.designation.toLowerCase().includes(searchLower) ||
      member.handle.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-10 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-4xl font-display font-black text-white tracking-tighter uppercase">
            Team <span className="text-cyber-pink shadow-cyber-pink">Command</span>
          </h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-pink shadow-[0_0_8px_#FF10F0]" />
            Active Crew: {members.filter(m => m.status === 'active').length} // Total Members: {members.length}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            className="border-white/5 bg-white/5 hover:bg-white/10 hover:border-cyber-pink/50 text-cyber-pink text-[10px] font-mono uppercase tracking-widest h-9 shadow-[0_0_15px_rgba(255,16,240,0.1)]"
            onClick={() => {
              setEditingMember(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="w-3.5 h-3.5 mr-2" />
            Recruit Member
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-ink/40 p-4 border border-white/5 rounded-sm backdrop-blur-sm">
        <Input 
          placeholder="Search by name, designation, or handle..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:w-80 bg-black/40 border-white/5 text-zinc-200 font-mono text-[11px] placeholder:text-zinc-600 h-10 uppercase tracking-widest"
        />
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="md:w-40 bg-black/40 border-white/5 text-zinc-200 font-mono text-[10px] uppercase tracking-widest h-10">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent className="bg-ink border-white/5">
            <SelectItem value="all" className="font-mono text-[10px] uppercase tracking-widest">All Types</SelectItem>
            <SelectItem value="founder" className="font-mono text-[10px] uppercase tracking-widest">Founder</SelectItem>
            <SelectItem value="team" className="font-mono text-[10px] uppercase tracking-widest">Team</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="md:w-40 bg-black/40 border-white/5 text-zinc-200 font-mono text-[10px] uppercase tracking-widest h-10">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-ink border-white/5">
            <SelectItem value="all" className="font-mono text-[10px] uppercase tracking-widest">All Status</SelectItem>
            <SelectItem value="active" className="font-mono text-[10px] uppercase tracking-widest">Active</SelectItem>
            <SelectItem value="inactive" className="font-mono text-[10px] uppercase tracking-widest">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {successMessage && (
        <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] uppercase tracking-widest animate-fade-up" role="status" aria-live="polite">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          {successMessage}
        </div>
      )}

      {/* Main Table */}
      <Card className="bg-ink/40 border-white/5 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-pink/50 to-transparent" />
        <CardContent className="p-0">
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4 px-6">Member</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Handle</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Type</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Skills</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4">Status</TableHead>
                  <TableHead className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 py-4 text-right px-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && members.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin text-cyber-pink" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">Scanning Crew...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="w-6 h-6 text-zinc-700" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">No Members Found</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMembers.map((member) => (
                    <TableRow key={member._id} className="border-white/5 hover:bg-white/[0.02] transition-colors group/row">
                      <TableCell className="py-5 px-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-zinc-200 group-hover/row:text-white transition-colors uppercase">{member.name}</span>
                          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-tight">{member.designation}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-5 font-mono text-sm text-cyber-pink">
                        {member.handle}
                      </TableCell>
                      <TableCell className="py-5">
                        <Badge 
                          variant="outline"
                          className={cn(
                            "text-[9px] font-mono uppercase tracking-widest border",
                            member.type === 'founder' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                          )}
                        >
                          {member.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-5">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {member.skills?.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="text-[9px] font-mono text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded">
                              {skill}
                            </span>
                          ))}
                          {member.skills?.length > 3 && (
                            <span className="text-[9px] font-mono text-zinc-600">+{member.skills.length - 3}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <button
                          onClick={() => handleToggleStatus(member)}
                          className="hover:scale-105 transition-transform"
                        >
                          <Badge 
                            variant="outline"
                            className={cn(
                              "text-[9px] font-mono uppercase tracking-widest border px-2 py-0.5",
                              member.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
                            )}
                          >
                            {member.status}
                          </Badge>
                        </button>
                      </TableCell>
                      <TableCell className="text-right py-5 px-6">
                        <div className="flex items-center justify-end gap-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            title="Edit Crew"
                            className="h-9 w-9 p-0 border-white/5 bg-white/5 hover:border-cyber-pink/50 text-cyber-pink transition-all"
                            onClick={() => handleEdit(member)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            title="Delete Crew"
                            className="h-9 w-9 p-0 border-white/5 bg-white/5 hover:border-red-500/50 text-red-400 transition-all"
                            onClick={() => handleDelete(member)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <MemberFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={editingMember} 
        onSuccess={fetchMembers} 
      />
    </div>
  );
}
