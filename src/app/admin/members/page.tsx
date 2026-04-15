'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, AlertCircle, CheckCircle2, Loader2, Users, X, Trash2 } from 'lucide-react';

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

interface MemberFormData {
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
}

const initialFormData: MemberFormData = {
  name: '',
  designation: '',
  bio: '',
  skills: [],
  image: '',
  handle: '',
  type: 'team',
  status: 'active',
  socials: {
    twitter: '',
    linkedin: '',
    github: '',
  },
};

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [formData, setFormData] = useState<MemberFormData>(initialFormData);
  const [skillInput, setSkillInput] = useState('');

  const fetchMembers = useCallback(async () => {
    try {
      setError(null);
      const params = new URLSearchParams();
      if (filterType !== 'all') params.set('type', filterType);
      if (filterStatus !== 'all') params.set('status', filterStatus);
      
      const res = await fetch(`/api/members?${params.toString()}`);
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

  const handleInputChange = (field: keyof MemberFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (field: 'twitter' | 'linkedin' | 'github', value: string) => {
    setFormData(prev => ({
      ...prev,
      socials: { ...prev.socials, [field]: value }
    }));
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError(null);

    try {
      const url = editingMember 
        ? `/api/members/${editingMember._id}`
        : '/api/members';
      
      const method = editingMember ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save member');
      }

      setIsModalOpen(false);
      setEditingMember(null);
      setFormData(initialFormData);
      fetchMembers();
      showSuccess(editingMember ? 'Member updated successfully' : 'Member created successfully');
    } catch (err) {
      console.error('Error saving member:', err);
      setError(err instanceof Error ? err.message : 'Failed to save member');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      designation: member.designation,
      bio: member.bio,
      skills: member.skills || [],
      image: member.image || '',
      handle: member.handle,
      type: member.type,
      status: member.status,
      socials: member.socials || { twitter: '', linkedin: '', github: '' },
    });
    setIsModalOpen(true);
  };

  const handleToggleStatus = async (member: Member) => {
    try {
      const nextStatus = member.status === 'active' ? 'inactive' : 'active';
      const res = await fetch(`/api/members/${member._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');
      fetchMembers();
      showSuccess(`Member ${nextStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
    } catch (err) {
      console.error('Error toggling status:', err);
      setError('Failed to update member status');
    }
  };

  const handleDelete = async (member: Member) => {
    if (!confirm(`Are you sure you want to delete ${member.name}?`)) return;
    
    try {
      const res = await fetch(`/api/members/${member._id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete member');
      fetchMembers();
      showSuccess('Member deleted successfully');
    } catch (err) {
      console.error('Error deleting member:', err);
      setError('Failed to delete member');
    }
  };

  const resetForm = () => {
    setEditingMember(null);
    setFormData(initialFormData);
    setSkillInput('');
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
          <Dialog open={isModalOpen} onOpenChange={(open) => {
            if (!open) resetForm();
            setIsModalOpen(open);
          }}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="border-white/5 bg-white/5 hover:bg-white/10 hover:border-cyber-pink/50 text-cyber-pink text-[10px] font-mono uppercase tracking-widest h-9 shadow-[0_0_15px_rgba(255,16,240,0.1)]"
                onClick={() => {
                  setEditingMember(null);
                  setFormData(initialFormData);
                }}
              >
                <Plus className="w-3.5 h-3.5 mr-2" />
                Recruit Member
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-ink border-white/5 max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
              <DialogHeader className="border-b border-white/5 pb-4 mb-6">
                <DialogTitle className="text-xl font-display font-black text-white uppercase tracking-tighter">
                  {editingMember ? 'Reconfigure Member' : 'Recruit New Member'}
                </DialogTitle>
                <DialogDescription className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-2">
                  Team Parameters // Member Configuration
                </DialogDescription>
              </DialogHeader>
              
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-mono uppercase tracking-widest mb-6" role="alert">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  {error}
                </div>
              )}
              
              <div className="space-y-6">
                {/* Name & Handle */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Name</Label>
                    <Input 
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="John Doe"
                      className="bg-white/5 border-white/5 text-zinc-200 font-mono text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Handle</Label>
                    <Input 
                      value={formData.handle}
                      onChange={(e) => handleInputChange('handle', e.target.value)}
                      placeholder="@username"
                      className="bg-white/5 border-white/5 text-zinc-200 font-mono text-sm"
                    />
                  </div>
                </div>

                {/* Designation & Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Designation</Label>
                    <Input 
                      value={formData.designation}
                      onChange={(e) => handleInputChange('designation', e.target.value)}
                      placeholder="Full Stack Developer"
                      className="bg-white/5 border-white/5 text-zinc-200 font-mono text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Type</Label>
                    <Select value={formData.type} onValueChange={(val) => handleInputChange('type', val as 'founder' | 'team')}>
                      <SelectTrigger className="bg-white/5 border-white/5 text-zinc-200 font-mono text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-ink border-white/5">
                        <SelectItem value="founder" className="font-mono text-zinc-200">Founder</SelectItem>
                        <SelectItem value="team" className="font-mono text-zinc-200">Team</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Bio</Label>
                  <Textarea 
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Brief bio about the member..."
                    rows={3}
                    className="bg-white/5 border-white/5 text-zinc-200 font-mono text-sm resize-none"
                  />
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Image URL</Label>
                  <Input 
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    placeholder="https://..."
                    className="bg-white/5 border-white/5 text-zinc-200 font-mono text-sm"
                  />
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Skills</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                      placeholder="Add a skill..."
                      className="bg-white/5 border-white/5 text-zinc-200 font-mono text-sm"
                    />
                    <Button 
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddSkill}
                      className="border-white/5 bg-white/5 text-zinc-400 hover:text-cyber-pink hover:border-cyber-pink/50"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {formData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.skills.map((skill, idx) => (
                        <Badge 
                          key={idx}
                          variant="outline"
                          className="bg-white/5 border-white/10 text-zinc-300 font-mono text-[10px] pr-1"
                        >
                          {skill}
                          <button 
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-1 hover:text-red-400"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Socials */}
                <div className="space-y-2">
                  <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Social Links</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <Input 
                      value={formData.socials.twitter}
                      onChange={(e) => handleSocialChange('twitter', e.target.value)}
                      placeholder="Twitter URL"
                      className="bg-white/5 border-white/5 text-zinc-200 font-mono text-sm"
                    />
                    <Input 
                      value={formData.socials.linkedin}
                      onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                      placeholder="LinkedIn URL"
                      className="bg-white/5 border-white/5 text-zinc-200 font-mono text-sm"
                    />
                    <Input 
                      value={formData.socials.github}
                      onChange={(e) => handleSocialChange('github', e.target.value)}
                      placeholder="GitHub URL"
                      className="bg-white/5 border-white/5 text-zinc-200 font-mono text-sm"
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-3">
                  <Switch 
                    id="status"
                    checked={formData.status === 'active'}
                    onCheckedChange={(checked: boolean) => handleInputChange('status', checked ? 'active' : 'inactive')}
                  />
                  <Label htmlFor="status" className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                    Active Status
                  </Label>
                </div>

                {/* Submit Button */}
                <Button 
                  onClick={handleSubmit}
                  disabled={saving}
                  className="w-full bg-cyber-pink/20 hover:bg-cyber-pink/30 border border-cyber-pink/50 text-cyber-pink font-mono text-xs uppercase tracking-widest"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    editingMember ? 'Update Member' : 'Recruit Member'
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input 
          placeholder="Search by name, designation, or handle..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:w-80 bg-white/5 border-white/5 text-zinc-200 font-mono text-sm placeholder:text-zinc-600"
        />
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="md:w-40 bg-white/5 border-white/5 text-zinc-200 font-mono text-sm">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent className="bg-ink border-white/5">
            <SelectItem value="all" className="font-mono text-zinc-200">All Types</SelectItem>
            <SelectItem value="founder" className="font-mono text-zinc-200">Founder</SelectItem>
            <SelectItem value="team" className="font-mono text-zinc-200">Team</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="md:w-40 bg-white/5 border-white/5 text-zinc-200 font-mono text-sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-ink border-white/5">
            <SelectItem value="all" className="font-mono text-zinc-200">All Status</SelectItem>
            <SelectItem value="active" className="font-mono text-zinc-200">Active</SelectItem>
            <SelectItem value="inactive" className="font-mono text-zinc-200">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] uppercase tracking-widest animate-fade-up" role="status" aria-live="polite">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          {successMessage}
        </div>
      )}

      {/* Main Content */}
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
                          <span className="text-sm font-medium text-zinc-200 group-hover/row:text-white transition-colors">{member.name}</span>
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
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 w-8 p-0 border-white/5 bg-white/5 hover:border-cyber-pink/50 text-cyber-pink transition-all"
                            onClick={() => handleEdit(member)}
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 w-8 p-0 border-white/5 bg-white/5 hover:border-red-500/50 text-red-400 transition-all"
                            onClick={() => handleDelete(member)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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
    </div>
  );
}
