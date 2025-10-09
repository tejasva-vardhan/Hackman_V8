"use client";

import { useEffect, useMemo, useState } from 'react';

type Member = {
  name: string;
  email: string;
  phone: string;
  usn?: string;
  linkedin: string;
  github: string;
};

type SubmissionDetails = {
  githubRepo: string;
  liveDemo: string;
  presentationLink: string;
  additionalNotes: string;
  submittedAt: string | null;
};



type EditFormType = {
  teamName: string;
  collegeName: string;
  projectTitle: string;
  projectDescription: string;
  teamLeadId: number | null;
  teamCode: string;
  submissionStatus: string;
  selectionStatus: string;
  paymentStatus: 'unpaid' | 'paid' | 'verified';
  reviewComments: string;
  finalScore: number | null;
  submissionDetails: SubmissionDetails;
  members: Member[];
};

type Registration = {
  _id: string;
  teamName: string;
  collegeName: string;
  projectTitle: string;
  projectDescription: string;
  teamLeadId?: number;
  teamCode: string;
  submissionStatus: string;
  selectionStatus: string;
  paymentStatus?: 'unpaid' | 'paid' | 'verified';
  members: Member[];
  createdAt?: string;
  updatedAt?: string;
  submissionDetails?: {
    githubRepo?: string;
    liveDemo?: string;
    presentationLink?: string;
    additionalNotes?: string;
    submittedAt?: string | null;
  };
  reviewComments?: string;
  finalScore?: number | null;
};

export default function AdminPage() {
  const [token, setToken] = useState<string>("");
  const [inputToken, setInputToken] = useState<string>("");
  const [data, setData] = useState<Registration[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  const [editTarget, setEditTarget] = useState<Registration | null>(null);
  const [editForm, setEditForm] = useState<EditFormType | null>(null);
  const [savingEdit, setSavingEdit] = useState<boolean>(false);
  const [selectionFilter, setSelectionFilter] = useState<string>('all');
  const [submissionFilter, setSubmissionFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    if (saved) {
      setToken(saved);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError("");
    fetch('/api/admin/registrations', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text().catch(() => '');
          throw new Error(text || 'Failed to fetch');
        }
        return res.json();
      })
      .then((json) => setData(json.data || []))
      .catch((e) => setError(e.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, [token]);

  const filtered = useMemo(() => {
    if (!data) return [] as Registration[];
    const text = query.trim().toLowerCase();
    return data.filter((r) => {
      const matchesText = !text || [
        r.teamName,
        r.collegeName,
        r.projectTitle,
        r.teamCode,
        r.selectionStatus,
        r.submissionStatus,
        r.paymentStatus,
        ...r.members.flatMap((m) => [m.name, m.email, m.phone]),
      ].filter(Boolean).some((field) => String(field).toLowerCase().includes(text));

      const matchesSelection = selectionFilter === 'all' || r.selectionStatus === selectionFilter;
      const matchesSubmission = submissionFilter === 'all' || r.submissionStatus === submissionFilter;
      const matchesPayment = paymentFilter === 'all' || (r.paymentStatus || 'unpaid') === paymentFilter;

      return matchesText && matchesSelection && matchesSubmission && matchesPayment;
    });
  }, [data, query, selectionFilter, submissionFilter, paymentFilter]);

  function handleSubmitToken(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = inputToken.trim();
    if (!trimmed) return;
    localStorage.setItem('admin_token', trimmed);
    setToken(trimmed);
  }

  function handleLogout() {
    localStorage.removeItem('admin_token');
    setToken("");
    setData(null);
  }

  function openEdit(reg: Registration) {
    setEditTarget(reg);
    setEditForm({
      teamName: reg.teamName,
      collegeName: reg.collegeName,
      projectTitle: reg.projectTitle,
      projectDescription: reg.projectDescription,
      teamLeadId: reg.teamLeadId ?? null,
      teamCode: reg.teamCode,
      submissionStatus: reg.submissionStatus,
      selectionStatus: reg.selectionStatus,
      paymentStatus: reg.paymentStatus || 'unpaid',
      reviewComments: reg.reviewComments ?? '',
      finalScore: reg.finalScore ?? null,
      submissionDetails: {
        githubRepo: reg.submissionDetails?.githubRepo || '',
        liveDemo: reg.submissionDetails?.liveDemo || '',
        presentationLink: reg.submissionDetails?.presentationLink || '',
        additionalNotes: reg.submissionDetails?.additionalNotes || '',
        submittedAt: reg.submissionDetails?.submittedAt || null,
      },
      members: reg.members.map(m => ({
        name: m.name,
        email: m.email,
        phone: m.phone,
        usn: m.usn || '',
        linkedin: m.linkedin,
        github: m.github,
      })),
    });
  }

  

  function updateEditField(path: string, value: string | number | null) {
    setEditForm((prev: EditFormType | null) => {
      if (!prev) return prev;
      const next = { ...prev };
      const parts = path.split('.');

      // Handle top-level updates
      if (parts.length === 1) {
        return { ...next, [path]: value };
      }

      // Handle submissionDetails updates
      if (parts[0] === 'submissionDetails') {
        return {
          ...next,
          submissionDetails: {
            ...next.submissionDetails,
            [parts[1]]: value
          }
        };
      }

      // Handle members updates
      if (parts[0] === 'members') {
        const index = parseInt(parts[1]);
        const field = parts[2];
        const updatedMembers = [...next.members];
        if (updatedMembers[index]) {
          updatedMembers[index] = {
            ...updatedMembers[index],
            [field]: value
          };
        }
        return { ...next, members: updatedMembers };
      }

      return next;
    });
  }

  function addMember() {
    setEditForm((prev: EditFormType | null) => {
      if (!prev) return prev;
      return {
        ...prev,
        members: [
          ...prev.members,
          { name: '', email: '', phone: '', usn: '', linkedin: '', github: '' },
        ],
      };
    });
  }

  function removeMember(index: number) {
    setEditForm((prev: EditFormType | null) => {
      if (!prev) return prev;
      return {
        ...prev,
        members: prev.members.filter((_, i) => i !== index),
      };
    });
  }

  async function saveEdit() {
    if (!editTarget || !token) {
      setError('Admin token required to save edits.');
      return;
    }
    try {
      setSavingEdit(true);
      const res = await fetch(`/api/admin/registrations/${editTarget._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });
      if (res.status === 401) {
        throw new Error('Unauthorized');
      }
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || 'Failed to save');
      }
      const json = await res.json();
      const updated: Registration = json.data;
      setData(prev => (prev || []).map(r => r._id === updated._id ? updated : r));
      setEditTarget(null);
      setEditForm(null);
    } catch (e) {
      if ((e as Error).message === 'Unauthorized') {
        setError('Admin token invalid. Please login again.');
        localStorage.removeItem('admin_token');
        setToken("");
      } else {
        setError((e as Error).message || 'Failed to save');
      }
    } finally {
      setSavingEdit(false);
    }
  }

  async function handleDelete(registrationId: string) {
    if (!window.confirm('Are you sure you want to delete this team? This action cannot be undone.')) {
      return;
    }

    if (!token) {
      setError('Admin token required to delete.');
      return;
    }

    try {
      const res = await fetch(`/api/admin/registrations/${registrationId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        throw new Error('Unauthorized');
      }
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || 'Failed to delete');
      }

      setData(prev => (prev || []).filter(r => r._id !== registrationId));
    } catch (e) {
      if ((e as Error).message === 'Unauthorized') {
        setError('Admin token invalid. Please login again.');
        localStorage.removeItem('admin_token');
        setToken("");
      } else {
        setError((e as Error).message || 'Failed to delete');
      }
    }
  }

  if (!token) {
    return (
      <div style={{ maxWidth: 420, margin: '64px auto', padding: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Admin Login</h2>
        <p style={{ color: '#666', marginBottom: 16 }}>Enter the admin access token.</p>
        <form onSubmit={handleSubmitToken} style={{ display: 'flex', gap: 8 }}>
          <input
            type="password"
            placeholder="Admin token"
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
            style={{ flex: 1, padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8 }}
          />
          <button type="submit" style={{ padding: '10px 16px', borderRadius: 8, background: 'black', color: 'white' }}>Continue</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, color: '#000000ff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginRight: 'auto', color: '#FF0000' }}>Admin Dashboard</h2>
        <input
          placeholder="Search teams, members, codes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '8px 10px', border: '1px solid #000000ff', borderRadius: 8, minWidth: 260, color: '#fff', background: '#111' }}
        />
        <select value={selectionFilter} onChange={(e) => setSelectionFilter(e.target.value)} style={{ padding: '8px 10px', border: '1px solid #ddd', borderRadius: 8, color: '#fff', background: '#111' }}>
          <option value="all">All Selections</option>
          <option value="pending">pending</option>
          <option value="selected">selected</option>
          <option value="waitlisted">waitlisted</option>
          <option value="rejected">rejected</option>
        </select>
        <select value={submissionFilter} onChange={(e) => setSubmissionFilter(e.target.value)} style={{ padding: '8px 10px', border: '1px solid #ddd', borderRadius: 8, color: '#fff', background: '#111' }}>
          <option value="all">All Submissions</option>
          <option value="not_submitted">not_submitted</option>
          <option value="submitted">submitted</option>
          <option value="under_review">under_review</option>
          <option value="accepted">accepted</option>
          <option value="rejected">rejected</option>
        </select>
        <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} style={{ padding: '8px 10px', border: '1px solid #ddd', borderRadius: 8, color: '#fff', background: '#111' }}>
          <option value="all">All Payments</option>
          <option value="unpaid">unpaid</option>
          <option value="paid">paid</option>
          <option value="verified">verified</option>
        </select>
        <button onClick={handleLogout} style={{ padding: '8px 12px', borderRadius: 8, background: '#eee' }}>Logout</button>
      </div>


      {loading && <p style={{ color: 'white' }}>Loading...</p>}
      {error && (
        <div style={{ color: 'crimson', marginBottom: 12 }}>
          {error}
        </div>
      )}

      {editTarget && editForm && (
        <div
          role="dialog"
          aria-modal="true"
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
          onClick={() => { if (!savingEdit) { setEditTarget(null); setEditForm(null); } }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(980px, 98%)', background: '#0b0b0b', color: '#fff', borderRadius: 12, border: '1px solid #222', padding: 20, maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginRight: 'auto' }}>Edit Team: {editTarget.teamName}</h3>
              <button onClick={() => { if (!savingEdit) { setEditTarget(null); setEditForm(null); } }} style={{ padding: '6px 10px', borderRadius: 6, background: '#111', color: '#fff', border: '1px solid #333' }}>Close</button>
              <button onClick={saveEdit} disabled={savingEdit} style={{ padding: '6px 10px', borderRadius: 6, background: '#2563eb', color: '#fff', border: '1px solid #1d4ed8' }}>{savingEdit ? 'Saving...' : 'Save'}</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ border: '1px solid #1f1f1f', borderRadius: 10, padding: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Team Info</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <input placeholder="Team Name" value={editForm.teamName} onChange={(e) => updateEditField('teamName', e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#0f0f0f', color: '#fff' }} />
                  <input placeholder="College Name" value={editForm.collegeName} onChange={(e) => updateEditField('collegeName', e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#0f0f0f', color: '#fff' }} />
                  <input placeholder="Team Code" value={editForm.teamCode} onChange={(e) => updateEditField('teamCode', e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#0f0f0f', color: '#fff' }} />
                  <input 
                    placeholder="Team Lead ID" 
                    type="number" 
                    value={editForm.teamLeadId ?? ''} 
                    onChange={(e) => updateEditField('teamLeadId', e.target.value ? Number(e.target.value) : null)} 
                    style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#0f0f0f', color: '#fff' }} 
                  />
                </div>
              </div>

              <div style={{ border: '1px solid #1f1f1f', borderRadius: 10, padding: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Project</div>
                <input placeholder="Project Title" value={editForm.projectTitle} onChange={(e) => updateEditField('projectTitle', e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#0f0f0f', color: '#fff', marginBottom: 8 }} />
                <textarea placeholder="Project Description" value={editForm.projectDescription} onChange={(e) => updateEditField('projectDescription', e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#0f0f0f', color: '#fff', minHeight: 100 }} />
              </div>

              <div style={{ border: '1px solid #1f1f1f', borderRadius: 10, padding: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Statuses</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  <select value={editForm.submissionStatus} onChange={(e) => updateEditField('submissionStatus', e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#0f0f0f', color: '#fff' }}>
                    <option value="not_submitted">not_submitted</option>
                    <option value="submitted">submitted</option>
                    <option value="under_review">under_review</option>
                    <option value="accepted">accepted</option>
                    <option value="rejected">rejected</option>
                  </select>
                  <select value={editForm.selectionStatus} onChange={(e) => updateEditField('selectionStatus', e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#0f0f0f', color: '#fff' }}>
                    <option value="pending">pending</option>
                    <option value="selected">selected</option>
                    <option value="waitlisted">waitlisted</option>
                    <option value="rejected">rejected</option>
                  </select>
                  <select value={editForm.paymentStatus} onChange={(e) => updateEditField('paymentStatus', e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#0f0f0f', color: '#fff' }}>
                    <option value="unpaid">unpaid</option>
                    <option value="paid">paid</option>
                    <option value="verified">verified</option>
                  </select>
                  <input placeholder="Final Score (optional)" type="number" value={editForm.finalScore ?? ''} onChange={(e) => updateEditField('finalScore', e.target.value === '' ? null : Number(e.target.value))} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#0f0f0f', color: '#fff' }} />
                </div>
                <textarea placeholder="Review Comments" value={editForm.reviewComments} onChange={(e) => updateEditField('reviewComments', e.target.value)} style={{ marginTop: 8, padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#0f0f0f', color: '#fff', minHeight: 80 }} />
              </div>

              <div style={{ border: '1px solid #1f1f1f', borderRadius: 10, padding: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Submission Links</div>
                <input placeholder="GitHub Repo" value={editForm.submissionDetails.githubRepo} onChange={(e) => updateEditField('submissionDetails.githubRepo', e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#0f0f0f', color: '#fff', marginBottom: 8 }} />
                <input placeholder="Live Demo" value={editForm.submissionDetails.liveDemo} onChange={(e) => updateEditField('submissionDetails.liveDemo', e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#0f0f0f', color: '#fff', marginBottom: 8 }} />
                <input placeholder="Presentation Link" value={editForm.submissionDetails.presentationLink} onChange={(e) => updateEditField('submissionDetails.presentationLink', e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#0f0f0f', color: '#fff', marginBottom: 8 }} />
                <input placeholder="Submitted At (ISO)" value={editForm.submissionDetails.submittedAt ?? ''} onChange={(e) => updateEditField('submissionDetails.submittedAt', e.target.value || null)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#0f0f0f', color: '#fff' }} />
                <textarea placeholder="Additional Notes" value={editForm.submissionDetails.additionalNotes} onChange={(e) => updateEditField('submissionDetails.additionalNotes', e.target.value)} style={{ marginTop: 8, padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#0f0f0f', color: '#fff', minHeight: 80 }} />
              </div>

              <div style={{ border: '1px solid #1f1f1f', borderRadius: 10, padding: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontWeight: 700, marginBottom: 8, marginRight: 'auto' }}>Members</div>
                  <button onClick={addMember} style={{ padding: '6px 10px', borderRadius: 6, background: '#111', color: '#fff', border: '1px solid #333' }}>Add</button>
                </div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {editForm.members.map((m: Member, idx: number) => (
                    <div key={idx} style={{ border: '1px solid #2a2a2a', borderRadius: 8, padding: 8 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        <input placeholder="Name" value={m.name} onChange={(e) => updateEditField(`members.${idx}.name`, e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#0f0f0f', color: '#fff' }} />
                        <input placeholder="Email" value={m.email} onChange={(e) => updateEditField(`members.${idx}.email`, e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#0f0f0f', color: '#fff' }} />
                        <input placeholder="Phone" value={m.phone} onChange={(e) => updateEditField(`members.${idx}.phone`, e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#0f0f0f', color: '#fff' }} />
                        <input placeholder="USN" value={m.usn} onChange={(e) => updateEditField(`members.${idx}.usn`, e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#0f0f0f', color: '#fff' }} />
                        <input placeholder="LinkedIn URL" value={m.linkedin} onChange={(e) => updateEditField(`members.${idx}.linkedin`, e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#0f0f0f', color: '#fff' }} />
                        <input placeholder="GitHub URL" value={m.github} onChange={(e) => updateEditField(`members.${idx}.github`, e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#0f0f0f', color: '#fff' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 8, gap: 8 }}>
                        {editForm.teamLeadId === idx ? (
                          <span style={{ marginRight: 'auto', fontWeight: 'bold' }}>⭐ Leader</span>
                        ) : (
                          <button
                            onClick={() => updateEditField('teamLeadId', idx)}
                            style={{ marginRight: 'auto', padding: '6px 10px', borderRadius: 6, background: '#333', color: '#fff', border: '1px solid #555' }}
                          >
                            Set as Leader
                          </button>
                        )}
                        <button onClick={() => removeMember(idx)} style={{ padding: '6px 10px', borderRadius: 6, background: '#3a0e00', color: '#fff', border: '1px solid #663300' }}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!loading && !error && (
        <div style={{ overflowX: 'auto', border: '1px solid #eee', borderRadius: 8 }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, color: '#000' }}>
            <thead>
              <tr style={{ background: '#fafafa' }}>
                <th style={{ textAlign: 'left', padding: 12, color: '#000000' }}>Team</th>
                <th style={{ textAlign: 'left', padding: 12, color: '#000000' }}>College</th>
                <th style={{ textAlign: 'left', padding: 12, color: '#000000' }}>Project</th>
                <th style={{ textAlign: 'left', padding: 12, color: '#000000' }}>Team Code</th>
                <th style={{ textAlign: 'left', padding: 12, color: '#000000' }}>Submission</th>
                <th style={{ textAlign: 'left', padding: 12, color: '#000000' }}>Selection</th>
                <th style={{ textAlign: 'left', padding: 12, color: '#000000' }}>Payment</th>
                <th style={{ textAlign: 'left', padding: 12, color: '#000000' }}>Members</th>
                <th style={{ textAlign: 'left', padding: 12, whiteSpace: 'nowrap', color: '#000000' }}>Created</th>
                <th style={{ textAlign: 'left', padding: 12, color: '#000000' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r._id} style={{ background: '#1c1c1c', color: '#ffffff' }}>
                  <td style={{ padding: 12, borderTop: '1px solid #333' }}>
                    <div style={{ fontWeight: 600 }}>{r.teamName}</div>
                  </td>
                  <td style={{ padding: 12, borderTop: '1px solid #333' }}>{r.collegeName}</td>
                  <td style={{ padding: 12, borderTop: '1px solid #333' }}>
                    <div style={{ fontWeight: 600 }}>{r.projectTitle}</div>
                    <div style={{ color: '#ccc', maxWidth: 420, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{r.projectDescription}</div>
                  </td>
                  <td style={{ padding: 12, borderTop: '1px solid #333' }}>{r.teamCode}</td>
                  <td style={{ padding: 12, borderTop: '1px solid #333' }}>{r.submissionStatus}</td>
                  <td style={{ padding: 12, borderTop: '1px solid #333' }}>{r.selectionStatus}</td>
                  <td style={{ padding: 12, borderTop: '1px solid #333' }}>{r.paymentStatus || 'unpaid'}</td>
                  <td style={{ padding: 12, borderTop: '1px solid #333' }}>
                    <ul style={{ margin: 0, paddingLeft: 16 }}>
                      {r.members.map((m, idx) => (
                        <li key={idx}>
                          <span style={{ fontWeight: 600 }}>{m.name}</span>
                          {idx === r.teamLeadId && ' ⭐'} — {m.email}, {m.phone}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td style={{ padding: 12, borderTop: '1px solid #333' }}>
                    {r.createdAt ? new Date(r.createdAt).toLocaleString() : '-'}
                  </td>
                  <td style={{ padding: 12, borderTop: '1px solid #333' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => openEdit(r)}
                        style={{ padding: '6px 10px', borderRadius: 6, background: '#ddffdd', color: '#050', border: '1px solid #aaffaa', opacity: !token ? 0.6 : 1 }}
                        disabled={!token}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(r._id)}
                        style={{ padding: '6px 10px', borderRadius: 6, background: '#ffdddd', color: '#c00', border: '1px solid #fbb', opacity: !token ? 0.6 : 1 }}
                        disabled={!token}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}