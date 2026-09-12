import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Image as ImageIcon,
  FileText,
  Settings as SettingsIcon,
  Video,
  MessageSquare,
  ShieldCheck,
  Plus,
  Trash2,
  Edit,
  Download,
  Upload,
  Check,
  CheckCircle2,
  Link as LinkIcon,
  X,
  ExternalLink,
  Search,
  Eye,
  LogOut,
  Calendar,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import { BlogPost, ConditionService, Testimonial, DoctorVideo, MediaItem, AppointmentLead } from '../../types';
import { HeroSectionAdmin } from './HeroSectionAdmin';

export const AdminDashboard: React.FC = () => {
  const {
    adminAuth,
    loginAdmin,
    logoutAdmin,
    settings,
    updateSettings,
    services,
    saveService,
    deleteService,
    blogs,
    saveBlog,
    deleteBlog,
    testimonials,
    saveTestimonial,
    deleteTestimonial,
    videos,
    saveVideo,
    deleteVideo,
    media,
    uploadMedia,
    addMediaByUrl,
    updateMedia,
    deleteMedia,
    appointments,
    updateAppointmentStatus,
    deleteAppointment,
    navigate,
    showToast
  } = useApp();

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'appointments' | 'media' | 'home' | 'doctor' | 'services' | 'blogs' | 'testimonials' | 'videos' | 'settings'
  >('overview');

  // Quick Image Upload Modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [modalUploadMode, setModalUploadMode] = useState<'file' | 'url'>('file');
  const [modalSelectedFile, setModalSelectedFile] = useState<File | null>(null);
  const [modalFilePreview, setModalFilePreview] = useState<string | null>(null);
  const [modalUrlInput, setModalUrlInput] = useState('');
  const [modalCategory, setModalCategory] = useState('Doctor Photos');
  const [modalAltText, setModalAltText] = useState('');
  const [modalCaption, setModalCaption] = useState('');
  const [modalIsUploading, setModalIsUploading] = useState(false);
  const [modalUploadedItem, setModalUploadedItem] = useState<MediaItem | null>(null);
  const [isDragOverModal, setIsDragOverModal] = useState(false);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@drkritarth.com');
  const [loginPassword, setLoginPassword] = useState('pulmo2026!');
  const [loginError, setLoginError] = useState('');

  // Media Library tab in-page upload state
  const [mediaCategoryFilter, setMediaCategoryFilter] = useState('All');
  const [uploadCategory, setUploadCategory] = useState('Doctor Photos');
  const [uploadAltText, setUploadAltText] = useState('');
  const [uploadCaption, setUploadCaption] = useState('');
  const [tabUploadMode, setTabUploadMode] = useState<'file' | 'url'>('file');
  const [tabUrlInput, setTabUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isTabDragOver, setIsTabDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Editing items state
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
  const [blogImageFile, setBlogImageFile] = useState<File | null>(null);
  const [blogImagePreview, setBlogImagePreview] = useState<string>('');
  const [editingService, setEditingService] = useState<Partial<ConditionService> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [editingVideo, setEditingVideo] = useState<Partial<DoctorVideo> | null>(null);

  // Doctor profile form state
  const [doctorForm, setDoctorForm] = useState({ ...settings });

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        loginAdmin(data.token, data.user);
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch {
      // Offline fallback login for verification preview
      if (loginEmail === 'admin@drkritarth.com' && loginPassword === 'pulmo2026!') {
        loginAdmin('demo_token', { email: loginEmail, name: 'Dr. Kritarth Admin' });
      } else {
        setLoginError('Incorrect credentials. Default is admin@drkritarth.com / pulmo2026!');
      }
    }
  };

  // Export Appointments to CSV
  const exportAppointmentsCsv = () => {
    if (appointments.length === 0) {
      showToast('No appointment leads to export.');
      return;
    }
    const headers = ['ID', 'Date Submitted', 'Status', 'Patient Name', 'Phone', 'Email', 'Age', 'Location', 'Concern', 'Message'];
    const rows = appointments.map((a) => [
      a.id,
      new Date(a.createdAt).toLocaleString(),
      a.status,
      `"${a.fullName.replace(/"/g, '""')}"`,
      `"${a.phone}"`,
      `"${a.email || ''}"`,
      `"${a.age || ''}"`,
      `"${a.preferredLocation}"`,
      `"${a.concern}"`,
      `"${(a.message || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dr_kritarth_appointments_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    showToast('CSV export downloaded');
  };

  // Handle Media File Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploaded = await uploadMedia(file, uploadCategory, uploadAltText, uploadCaption);
    setIsUploading(false);

    if (uploaded) {
      setUploadAltText('');
      setUploadCaption('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Handle Tab URL upload
  const handleTabUrlUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tabUrlInput.trim()) {
      showToast('Please provide an image URL');
      return;
    }
    setIsUploading(true);
    const uploaded = await addMediaByUrl(tabUrlInput.trim(), uploadCategory, uploadAltText, uploadCaption);
    setIsUploading(false);
    if (uploaded) {
      setTabUrlInput('');
      setUploadAltText('');
      setUploadCaption('');
    }
  };

  // Handle Modal File Select
  const handleModalFileSelect = (file: File) => {
    setModalSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setModalFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    if (!modalAltText) {
      setModalAltText(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
    }
  };

  // Handle Modal Upload Submit
  const handleModalUploadSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setModalIsUploading(true);
    let result: MediaItem | null = null;
    if (modalUploadMode === 'file') {
      if (!modalSelectedFile) {
        showToast('Please select an image file to upload.');
        setModalIsUploading(false);
        return;
      }
      result = await uploadMedia(modalSelectedFile, modalCategory, modalAltText, modalCaption);
    } else {
      if (!modalUrlInput.trim()) {
        showToast('Please enter an image URL.');
        setModalIsUploading(false);
        return;
      }
      result = await addMediaByUrl(modalUrlInput.trim(), modalCategory, modalAltText, modalCaption);
    }
    setModalIsUploading(false);
    if (result) {
      setModalUploadedItem(result);
    }
  };

  const resetUploadModal = () => {
    setModalSelectedFile(null);
    setModalFilePreview(null);
    setModalUrlInput('');
    setModalAltText('');
    setModalCaption('');
    setModalUploadedItem(null);
    setShowUploadModal(false);
  };

  // If not logged in, show Login Screen
  if (!adminAuth.isAuthenticated) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-slate-900 text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-800/90 rounded-3xl p-8 border border-slate-700 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto mb-3 border border-teal-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-white">
              Doctor &amp; Clinic Portal
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Secure administrative access for Dr. Kritarth &amp; clinic management team.
            </p>
          </div>

          {loginError && (
            <div className="p-3 mb-4 rounded-xl bg-rose-950/60 border border-rose-600/50 text-rose-300 text-xs text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-teal-500 text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-teal-500 text-xs"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 text-[11px] text-slate-400">
              <strong>Pre-configured Demo Credentials:</strong><br />
              Email: <code className="text-teal-400">admin@drkritarth.com</code><br />
              Password: <code className="text-teal-400">pulmo2026!</code>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-heading font-bold text-xs text-slate-950 bg-teal-400 hover:bg-teal-300 transition-all shadow-md shadow-teal-500/20"
            >
              Sign In to Management Portal
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('home')}
              className="text-xs text-slate-400 hover:text-white"
            >
              ← Return to Main Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Logged-in Admin View
  const newAppointmentsCount = appointments.filter((a) => a.status === 'New').length;

  return (
    <div className="min-h-screen pt-20 pb-20 bg-slate-100 text-slate-900">
      
      {/* Admin Top Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800 py-3.5 px-4 sm:px-8 sticky top-14 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500 text-white flex items-center justify-center font-bold text-sm">
              DK
            </div>
            <div>
              <div className="font-heading font-bold text-sm text-white flex items-center gap-2">
                <span>Dr. Kritarth Management Console</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-teal-900 text-teal-200 border border-teal-700">
                  Livasa Pulmonology
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Logged in as {adminAuth.user?.email}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setShowUploadModal(true);
                setModalUploadedItem(null);
              }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 shadow-sm flex items-center gap-1.5 transition-all hover:scale-[1.02]"
              title="Upload new doctor photo or clinic image"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Image</span>
            </button>

            <button
              onClick={() => navigate('home')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Live Site</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-300 bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800 flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 border-b border-slate-200 scrollbar-none">
          {[
            { id: 'overview' as const, label: 'Overview', icon: <Users className="w-4 h-4" /> },
            { id: 'hero' as const, label: 'Hero Section', icon: <ImageIcon className="w-4 h-4" /> },
            {
              id: 'appointments' as const,
              label: `Appointments (${appointments.length})`,
              icon: <Calendar className="w-4 h-4" />,
              badge: newAppointmentsCount > 0 ? `${newAppointmentsCount} New` : undefined
            },
            { id: 'media' as const, label: `Images & Uploads (${media.length})`, icon: <ImageIcon className="w-4 h-4" /> },
            { id: 'home' as const, label: 'Home Page Images', icon: <FolderOpen className="w-4 h-4" /> },
            { id: 'doctor' as const, label: 'Doctor Profile & Hours', icon: <SettingsIcon className="w-4 h-4" /> },
            { id: 'services' as const, label: `Lung Conditions (${services.length})`, icon: <FileText className="w-4 h-4" /> },
            { id: 'blogs' as const, label: `Articles (${blogs.length})`, icon: <FileText className="w-4 h-4" /> },
            { id: 'testimonials' as const, label: `Testimonials (${testimonials.length})`, icon: <MessageSquare className="w-4 h-4" /> },
            { id: 'videos' as const, label: `Videos (${videos.length})`, icon: <Video className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* Metric Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-xs text-slate-500 font-medium">New Enquiries</div>
                <div className="font-heading font-extrabold text-2xl text-teal-700 mt-1">
                  {newAppointmentsCount}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-xs text-slate-500 font-medium">Total Enquiries</div>
                <div className="font-heading font-extrabold text-2xl text-slate-900 mt-1">
                  {appointments.length}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-xs text-slate-500 font-medium">Media Assets</div>
                <div className="font-heading font-extrabold text-2xl text-cyan-700 mt-1">
                  {media.length}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-xs text-slate-500 font-medium">Lung Specialities</div>
                <div className="font-heading font-extrabold text-2xl text-slate-900 mt-1">
                  {services.length}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-xs text-slate-500 font-medium">Active Articles</div>
                <div className="font-heading font-extrabold text-2xl text-slate-900 mt-1">
                  {blogs.length}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-xs text-slate-500 font-medium">Doctor Videos</div>
                <div className="font-heading font-extrabold text-2xl text-slate-900 mt-1">
                  {videos.length}
                </div>
              </div>
            </div>

            {/* Quick Action Banner for Image Uploads & Management */}
            <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center shrink-0">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-white">
                    Need to upload or change website images?
                  </h4>
                  <p className="text-xs text-teal-200/80">
                    Upload doctor portraits, clinic photos, bronchoscopy visuals, or blog banners directly from your device.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 w-full md:w-auto">
                <button
                  onClick={() => {
                    setShowUploadModal(true);
                    setModalUploadedItem(null);
                  }}
                  className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl font-heading font-bold text-xs bg-teal-400 hover:bg-teal-300 text-slate-950 flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Image</span>
                </button>
                <button
                  onClick={() => setActiveTab('media')}
                  className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl font-heading font-semibold text-xs bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-1.5 transition-all"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Browse Media</span>
                </button>
                <button
                  onClick={() => setActiveTab('home')}
                  className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl font-heading font-semibold text-xs bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-1.5 transition-all"
                >
                  <FolderOpen className="w-4 h-4" />
                  <span>Home Images</span>
                </button>
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-900">
                    Latest Consultation Enquiries
                  </h3>
                  <p className="text-xs text-slate-500">
                    Recent appointment requests booked through website forms
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="text-xs font-semibold text-teal-700 hover:text-teal-800"
                >
                  Manage All Leads →
                </button>
              </div>

              {appointments.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No appointment leads logged yet. When patients book online, they appear here instantly.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[10px]">
                        <th className="py-2.5 px-3">Patient</th>
                        <th className="py-2.5 px-3">Phone</th>
                        <th className="py-2.5 px-3">Location</th>
                        <th className="py-2.5 px-3">Concern</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {appointments.slice(0, 5).map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/80">
                          <td className="py-3 px-3 font-semibold text-slate-900">
                            {lead.fullName}
                          </td>
                          <td className="py-3 px-3 text-slate-600">
                            <a href={`tel:${lead.phone}`} className="text-teal-700 font-medium hover:underline">
                              {lead.phone}
                            </a>
                          </td>
                          <td className="py-3 px-3 text-slate-600">{lead.preferredLocation}</td>
                          <td className="py-3 px-3 text-slate-600">{lead.concern}</td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                lead.status === 'New'
                                  ? 'bg-rose-100 text-rose-800'
                                  : lead.status === 'Appointment Scheduled'
                                  ? 'bg-teal-100 text-teal-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {lead.status}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <button
                              onClick={() => setActiveTab('appointments')}
                              className="text-xs text-teal-700 font-medium hover:underline"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quick Website Customizer Shortcuts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                onClick={() => setActiveTab('doctor')}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-300 shadow-2xs hover:shadow-md transition-all cursor-pointer"
              >
                <div className="font-heading font-bold text-slate-900 text-sm mb-1">
                  Update OPD Hours &amp; Locations
                </div>
                <p className="text-xs text-slate-500">
                  Quickly change Mohali or Dhillon Medical Center consultation timings and contact phone numbers.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('media')}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-300 shadow-2xs hover:shadow-md transition-all cursor-pointer"
              >
                <div className="font-heading font-bold text-slate-900 text-sm mb-1">
                  Change Doctor Photos &amp; Assets
                </div>
                <p className="text-xs text-slate-500">
                  Upload new clinic photos, hero images, or lung illustrations to the permanent media library.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('blogs')}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-300 shadow-2xs hover:shadow-md transition-all cursor-pointer"
              >
                <div className="font-heading font-bold text-slate-900 text-sm mb-1">
                  Publish New Health Article
                </div>
                <p className="text-xs text-slate-500">
                  Share educational insights about air pollution, seasonal asthma triggers, or sleep hygiene.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* TAB HERO: HERO SECTION MANAGEMENT */}
        {activeTab === 'hero' && (
          <HeroSectionAdmin
            settings={settings}
            updateSettings={updateSettings}
            uploadMedia={uploadMedia}
            showToast={showToast}
            navigate={navigate}
          />
        )}

        {/* TAB 2: APPOINTMENT LEADS MANAGEMENT */}
        {activeTab === 'appointments' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  Appointment Enquiries &amp; Patient Leads
                </h3>
                <p className="text-xs text-slate-500">
                  Manage lead statuses, patient concerns, and export consultation records to CSV.
                </p>
              </div>

              <button
                onClick={exportAppointmentsCsv}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 shadow-2xs"
              >
                <Download className="w-4 h-4 text-teal-600" />
                <span>Export to CSV</span>
              </button>
            </div>

            {appointments.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm">
                No appointments received yet. Form submissions will appear here instantly.
              </div>
            ) : (
              <div className="space-y-3">
                {appointments.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-heading font-bold text-slate-900 text-base">
                          {lead.fullName}
                        </span>
                        {lead.age && (
                          <span className="text-xs text-slate-400">({lead.age} yrs)</span>
                        )}
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            lead.status === 'New'
                              ? 'bg-rose-100 text-rose-800'
                              : lead.status === 'Contacted'
                              ? 'bg-amber-100 text-amber-800'
                              : lead.status === 'Appointment Scheduled'
                              ? 'bg-teal-100 text-teal-800'
                              : lead.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {lead.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-teal-600" />
                          <a href={`tel:${lead.phone}`} className="hover:underline font-semibold">
                            {lead.phone}
                          </a>
                        </span>
                        {lead.email && (
                          <span className="flex items-center gap-1 text-slate-500">
                            <Mail className="w-3.5 h-3.5" />
                            {lead.email}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                          {lead.preferredLocation}
                        </span>
                        <span className="text-slate-400">
                          Submitted: {new Date(lead.createdAt).toLocaleDateString()} {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <div className="text-xs text-slate-700 pt-1">
                        <strong>Clinical Concern:</strong> {lead.concern}
                        {lead.preferredDate && (
                          <span className="ml-3 text-slate-500">
                            (Preferred Date: {lead.preferredDate})
                          </span>
                        )}
                      </div>

                      {lead.message && (
                        <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl mt-1 border border-slate-100 italic">
                          &quot;{lead.message}&quot;
                        </div>
                      )}
                    </div>

                    {/* Status update buttons */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      <select
                        value={lead.status}
                        onChange={(e) => updateAppointmentStatus(lead.id, e.target.value as AppointmentLead['status'])}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white font-medium shadow-2xs"
                      >
                        <option value="New">Status: New</option>
                        <option value="Contacted">Status: Contacted</option>
                        <option value="Appointment Scheduled">Status: Scheduled</option>
                        <option value="Completed">Status: Completed</option>
                        <option value="Cancelled">Status: Cancelled</option>
                      </select>

                      <a
                        href={`tel:${lead.phone}`}
                        className="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 text-xs font-semibold hover:bg-teal-100 border border-teal-200 flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Call Patient
                      </a>

                      <button
                        onClick={() => {
                          if (confirm(`Delete appointment lead for ${lead.fullName}?`)) {
                            deleteAppointment(lead.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MEDIA LIBRARY WITH REAL UPLOADS */}
        {activeTab === 'media' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* Header & Upload Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-heading font-bold text-xl text-slate-900">
                    Media Library &amp; Asset Management
                  </h3>
                  <p className="text-xs text-slate-500">
                    Upload and manage high-resolution photos, lung visuals, and certificates stored permanently.
                  </p>
                </div>
              </div>

              {/* Mode Toggle & Upload Zone */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setTabUploadMode('file')}
                    className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                      tabUploadMode === 'file'
                        ? 'bg-teal-700 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image File</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTabUploadMode('url')}
                    className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                      tabUploadMode === 'url'
                        ? 'bg-teal-700 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Add via Image URL</span>
                  </button>
                  <div className="ml-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setShowUploadModal(true);
                        setModalUploadedItem(null);
                      }}
                      className="text-xs text-teal-700 hover:text-teal-800 font-semibold underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Full Upload Assistant</span>
                    </button>
                  </div>
                </div>

                {tabUploadMode === 'file' ? (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsTabDragOver(true);
                    }}
                    onDragLeave={() => setIsTabDragOver(false)}
                    onDrop={async (e) => {
                      e.preventDefault();
                      setIsTabDragOver(false);
                      const file = e.dataTransfer.files?.[0];
                      if (!file) return;
                      setIsUploading(true);
                      await uploadMedia(
                        file,
                        uploadCategory,
                        uploadAltText || file.name.replace(/\.[^/.]+$/, ''),
                        uploadCaption
                      );
                      setIsUploading(false);
                    }}
                    className={`p-6 sm:p-8 border-2 border-dashed rounded-2xl flex flex-col items-center text-center transition-all ${
                      isTabDragOver
                        ? 'border-teal-500 bg-teal-50/80 scale-[1.005]'
                        : 'border-slate-300 bg-slate-50/60'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
                      <Upload className="w-6 h-6" />
                    </div>
                    <h4 className="font-heading font-bold text-slate-900 text-sm mb-1">
                      Drag and drop image file here, or browse
                    </h4>
                    <p className="text-xs text-slate-500 mb-4 max-w-sm">
                      Supports JPG, PNG, WebP, SVG. Stored permanently on server for live website.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-lg mb-4 text-xs">
                      <select
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800"
                      >
                        <option value="Doctor Photos">Category: Doctor Photos</option>
                        <option value="Hero Images">Category: Hero Images</option>
                        <option value="Lung Conditions">Category: Lung Conditions</option>
                        <option value="Blog Images">Category: Blog Images</option>
                        <option value="Certificates">Category: Certificates</option>
                        <option value="Hospital">Category: Hospital</option>
                        <option value="Testimonials">Category: Testimonials</option>
                      </select>

                      <input
                        type="text"
                        value={uploadAltText}
                        onChange={(e) => setUploadAltText(e.target.value)}
                        placeholder="Image description / Alt text"
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 min-w-[180px]"
                      />
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="media-file-input"
                    />

                    <label
                      htmlFor="media-file-input"
                      className={`px-6 py-2.5 rounded-xl font-heading font-bold text-xs text-white bg-teal-700 hover:bg-teal-800 cursor-pointer shadow-sm transition-all ${
                        isUploading ? 'opacity-50 pointer-events-none' : ''
                      }`}
                    >
                      {isUploading ? 'Uploading & Saving...' : 'Select File from Device'}
                    </label>
                  </div>
                ) : (
                  <form
                    onSubmit={handleTabUrlUpload}
                    className="p-6 sm:p-8 border border-slate-200 rounded-2xl bg-slate-50/60 space-y-4 text-xs"
                  >
                    <div className="max-w-xl">
                      <h4 className="font-heading font-bold text-slate-900 text-sm mb-1">
                        Add Image by Web URL
                      </h4>
                      <p className="text-slate-500">
                        Paste a direct URL to a photo (e.g. from hospital CDN, Google Photos, Unsplash, or Cloud Storage).
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
                        <input
                          type="url"
                          required
                          value={tabUrlInput}
                          onChange={(e) => setTabUrlInput(e.target.value)}
                          placeholder="https://example.com/doctor-photo.jpg"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Category</label>
                        <select
                          value={uploadCategory}
                          onChange={(e) => setUploadCategory(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800"
                        >
                          <option value="Doctor Photos">Doctor Photos</option>
                          <option value="Hero Images">Hero Images</option>
                          <option value="Lung Conditions">Lung Conditions</option>
                          <option value="Blog Images">Blog Images</option>
                          <option value="Certificates">Certificates</option>
                          <option value="Hospital">Hospital</option>
                          <option value="Testimonials">Testimonials</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Alt Text</label>
                        <input
                          type="text"
                          value={uploadAltText}
                          onChange={(e) => setUploadAltText(e.target.value)}
                          placeholder="Alt description"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isUploading}
                        className="px-6 py-2.5 rounded-xl font-heading font-bold text-xs text-white bg-teal-700 hover:bg-teal-800 disabled:opacity-50 shadow-sm"
                      >
                        {isUploading ? 'Saving...' : 'Add Image to Media Library'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Media Gallery Filters */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
                {['All', 'Doctor Photos', 'Hero Images', 'Lung Conditions', 'Blog Images', 'Certificates', 'Hospital'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setMediaCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                      mediaCategoryFilter === cat
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <span className="text-xs text-slate-500 font-medium shrink-0">
                {media.length} Total Assets
              </span>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {media
                .filter((m) => mediaCategoryFilter === 'All' || m.category === mediaCategoryFilter)
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs flex flex-col justify-between group"
                  >
                    <div>
                      <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                        <img
                          src={item.url}
                          alt={item.altText}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[10px] font-bold text-white">
                          {item.category}
                        </div>
                      </div>

                      <div className="p-3.5">
                        <div className="font-heading font-semibold text-slate-900 text-xs truncate">
                          {item.altText || item.filename}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                          {item.caption || item.filename}
                        </div>
                      </div>
                    </div>

                    {/* Quick Assignment Actions */}
                    <div className="p-3 pt-0 border-t border-slate-100 flex flex-col gap-1.5">
                      <div className="grid grid-cols-2 gap-1 text-[10px]">
                        <button
                          onClick={() => {
                            updateSettings({ heroDoctorImage: item.url });
                            showToast('Set as Hero Doctor Portrait');
                          }}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 font-medium truncate text-left"
                        >
                          Hero Photo
                        </button>
                        <button
                          onClick={() => {
                            updateSettings({ aboutDoctorImage: item.url });
                            showToast('Set as About Doctor Portrait');
                          }}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 font-medium truncate text-left"
                        >
                          About Photo
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => {
                            updateSettings({ lungsVisualImage: item.url });
                            showToast('Set as 3D Lungs Visualizer');
                          }}
                          className="text-[10px] text-teal-700 font-semibold hover:underline"
                        >
                          Use as Lungs Visual
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Delete this media asset?')) {
                              deleteMedia(item.id);
                            }
                          }}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded"
                          title="Delete image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        )}

        {/* TAB: HOME PAGE IMAGES CONTROLLER */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-xl text-slate-900">
                    Home Page Images &amp; Visual Identity
                  </h3>
                  <p className="text-xs text-slate-500">
                    Directly change and upload images displayed in the public homepage sections.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(true);
                    setModalUploadedItem(null);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading font-bold text-xs text-white bg-teal-700 hover:bg-teal-800 shadow-sm transition-all"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload New Image</span>
                </button>
              </div>
            </div>

            {/* Grid of Key Homepage Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Hero Doctor Portrait */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-heading font-bold text-slate-900 text-sm">
                      1. Hero Section Doctor Portrait
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                      Hero Banner
                    </span>
                  </div>
                  <div className="aspect-[4/3] rounded-2xl bg-slate-100 overflow-hidden relative mb-4 border border-slate-200">
                    <img
                      src={settings.heroDoctorImage}
                      alt="Hero Doctor Portrait"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Current Image URL
                      </label>
                      <input
                        type="text"
                        value={settings.heroDoctorImage}
                        onChange={(e) => updateSettings({ heroDoctorImage: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setModalCategory('Doctor Photos');
                      setModalAltText('Dr. Kritarth Pulmonologist Hero Photo');
                      setShowUploadModal(true);
                      setModalUploadedItem(null);
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload &amp; Replace</span>
                  </button>

                  <div className="text-[11px] text-slate-400">
                    Click any doctor photo in Media Library to assign
                  </div>
                </div>
              </div>

              {/* Card 2: About Doctor Portrait */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-heading font-bold text-slate-900 text-sm">
                      2. About Section Doctor Photo
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                      About Profile
                    </span>
                  </div>
                  <div className="aspect-[4/3] rounded-2xl bg-slate-100 overflow-hidden relative mb-4 border border-slate-200">
                    <img
                      src={settings.aboutDoctorImage}
                      alt="About Doctor Portrait"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Current Image URL
                      </label>
                      <input
                        type="text"
                        value={settings.aboutDoctorImage}
                        onChange={(e) => updateSettings({ aboutDoctorImage: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setModalCategory('Doctor Photos');
                      setModalAltText('Dr. Kritarth Clinical Profile Photo');
                      setShowUploadModal(true);
                      setModalUploadedItem(null);
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload &amp; Replace</span>
                  </button>

                  <div className="text-[11px] text-slate-400">
                    Shown in Doctor Profile &amp; Bio section
                  </div>
                </div>
              </div>

              {/* Card 3: 3D Pulmonary Lungs Visualizer */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-heading font-bold text-slate-900 text-sm">
                      3. Interactive 3D Lungs Visualizer
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                      3D Visualizer
                    </span>
                  </div>
                  <div className="aspect-[4/3] rounded-2xl bg-slate-950 overflow-hidden relative mb-4 border border-slate-800 flex items-center justify-center p-2">
                    <img
                      src={settings.lungsVisualImage}
                      alt="3D Lungs Visualizer"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Current Image URL
                      </label>
                      <input
                        type="text"
                        value={settings.lungsVisualImage}
                        onChange={(e) => updateSettings({ lungsVisualImage: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setModalCategory('Hero Images');
                      setModalAltText('Human Respiratory Lungs Visual');
                      setShowUploadModal(true);
                      setModalUploadedItem(null);
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Lungs Visual</span>
                  </button>

                  <div className="text-[11px] text-slate-400">
                    Used in the interactive bronchial anatomy explorer
                  </div>
                </div>
              </div>

              {/* Card 4: Livasa Hospital Mohali & Clinic Suite */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-heading font-bold text-slate-900 text-sm">
                      4. Clinic &amp; Hospital Reception Visual
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      Facilities
                    </span>
                  </div>
                  <div className="aspect-[4/3] rounded-2xl bg-slate-100 overflow-hidden relative mb-4 border border-slate-200">
                    <img
                      src={settings.clinicSuiteImage}
                      alt="Clinic & Hospital Reception Visual"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Current Image URL
                      </label>
                      <input
                        type="text"
                        value={settings.clinicSuiteImage}
                        onChange={(e) => updateSettings({ clinicSuiteImage: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setModalCategory('Hospital');
                      setModalAltText('Livasa Hospital Mohali Pulmonology Suite');
                      setShowUploadModal(true);
                      setModalUploadedItem(null);
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Clinic Photo</span>
                  </button>

                  <div className="text-[11px] text-slate-400">
                    Shown in Contact &amp; Locations section
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Pick from Library Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
              <h4 className="font-heading font-bold text-base text-slate-900 mb-1">
                Quick Assign from Media Library
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                Click on any thumbnail to instantly set it to one of your homepage sections:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {media.slice(0, 12).map((item) => (
                  <div
                    key={item.id}
                    className="group border border-slate-200 rounded-xl overflow-hidden bg-slate-50 relative flex flex-col"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.altText}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-1.5 bg-white flex flex-col gap-1 text-[9px]">
                      <button
                        type="button"
                        onClick={() => {
                          updateSettings({ heroDoctorImage: item.url });
                          showToast('Updated Hero Image');
                        }}
                        className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-teal-50 hover:text-teal-800 font-medium truncate text-left"
                      >
                        Set as Hero
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          updateSettings({ aboutDoctorImage: item.url });
                          showToast('Updated About Image');
                        }}
                        className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-teal-50 hover:text-teal-800 font-medium truncate text-left"
                      >
                        Set as About
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: DOCTOR PROFILE & CLINIC HOURS */}
        {activeTab === 'doctor' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6 animate-in fade-in duration-150">
            <div>
              <h3 className="font-heading font-bold text-xl text-slate-900">
                Doctor Profile, Clinical Roles &amp; Timings
              </h3>
              <p className="text-xs text-slate-500">
                Changes saved here reflect across the hero, about, header, and contact sections.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateSettings(doctorForm);
              }}
              className="space-y-6 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Doctor Name</label>
                  <input
                    type="text"
                    value={doctorForm.doctorName}
                    onChange={(e) => setDoctorForm({ ...doctorForm, doctorName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    value={doctorForm.doctorDesignation}
                    onChange={(e) => setDoctorForm({ ...doctorForm, doctorDesignation: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Primary Hospital</label>
                  <input
                    type="text"
                    value={doctorForm.primaryHospital}
                    onChange={(e) => setDoctorForm({ ...doctorForm, primaryHospital: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs"
                  />
                </div>
              </div>

              {/* Contact numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Primary OPD Phone</label>
                  <input
                    type="text"
                    value={doctorForm.phonePrimary}
                    onChange={(e) => setDoctorForm({ ...doctorForm, phonePrimary: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={doctorForm.whatsappNumber}
                    onChange={(e) => setDoctorForm({ ...doctorForm, whatsappNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Emergency 24x7 Helpline</label>
                  <input
                    type="text"
                    value={doctorForm.emergencyPhone}
                    onChange={(e) => setDoctorForm({ ...doctorForm, emergencyPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs"
                  />
                </div>
              </div>

              {/* Timings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mohali OPD Timings</label>
                  <input
                    type="text"
                    value={doctorForm.opdHoursMohali}
                    onChange={(e) => setDoctorForm({ ...doctorForm, opdHoursMohali: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Dhillon Medical Center Timings</label>
                  <input
                    type="text"
                    value={doctorForm.opdHoursNawanshahr}
                    onChange={(e) => setDoctorForm({ ...doctorForm, opdHoursNawanshahr: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs"
                  />
                </div>
              </div>

              {/* Hero Headline & Subtitle */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="font-heading font-bold text-slate-900 text-sm">
                  Hero Section Text
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Hero Badge</label>
                    <input
                      type="text"
                      value={doctorForm.heroBadge}
                      onChange={(e) => setDoctorForm({ ...doctorForm, heroBadge: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Hero Subtitle</label>
                    <input
                      type="text"
                      value={doctorForm.heroSubtitle}
                      onChange={(e) => setDoctorForm({ ...doctorForm, heroSubtitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Medical Disclaimer Text */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block font-semibold text-slate-700 mb-1">
                  Medical Disclaimer Notice
                </label>
                <textarea
                  rows={3}
                  value={doctorForm.disclaimerText}
                  onChange={(e) => setDoctorForm({ ...doctorForm, disclaimerText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-heading font-bold text-xs text-white bg-teal-700 hover:bg-teal-800 shadow-sm"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 5: SERVICES / LUNG CONDITIONS */}
        {activeTab === 'services' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  Pulmonary Conditions &amp; Services
                </h3>
                <p className="text-xs text-slate-500">
                  Add, edit, or customize condition details and FAQ accordions.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingService({
                    title: '',
                    slug: '',
                    shortDescription: '',
                    detailedOverview: '',
                    commonSymptoms: ['Cough', 'Shortness of breath'],
                    possibleCauses: ['Airway inflammation'],
                    whenToConsult: ['Symptoms last over 3 weeks'],
                    diagnosisApproach: ['Spirometry'],
                    treatmentApproach: ['Inhaled therapy'],
                    faqs: [{ question: 'Is this condition curable?', answer: 'It is highly manageable with proper care.' }]
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800"
              >
                <Plus className="w-4 h-4" />
                <span>Add Condition</span>
              </button>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((serv) => (
                <div
                  key={serv.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-heading font-bold text-slate-900 text-base">
                        {serv.title}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">/{serv.slug}</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                      {serv.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => navigate('condition', serv.slug)}
                      className="text-teal-700 font-medium hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Live Page</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingService(serv)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete condition ${serv.title}?`)) {
                            deleteService(serv.id);
                          }
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Edit Modal */}
            {editingService && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
                <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <h3 className="font-heading font-bold text-lg text-slate-900">
                      {editingService.id ? 'Edit Condition' : 'New Condition'}
                    </h3>
                    <button onClick={() => setEditingService(null)} className="p-1 text-slate-400">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await saveService(editingService);
                      setEditingService(null);
                    }}
                    className="space-y-4 text-xs"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Title</label>
                        <input
                          type="text"
                          required
                          value={editingService.title || ''}
                          onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Slug (URL)</label>
                        <input
                          type="text"
                          required
                          value={editingService.slug || ''}
                          onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Short Description</label>
                      <textarea
                        rows={2}
                        value={editingService.shortDescription || ''}
                        onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Detailed Overview</label>
                      <textarea
                        rows={4}
                        value={editingService.detailedOverview || ''}
                        onChange={(e) => setEditingService({ ...editingService, detailedOverview: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setEditingService(null)}
                        className="px-4 py-2 rounded-xl text-slate-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl font-semibold text-white bg-teal-700"
                      >
                        Save Condition
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: BLOG ARTICLES */}
        {activeTab === 'blogs' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  Patient Health Articles &amp; Blog Posts
                </h3>
                <p className="text-xs text-slate-500">
                  Publish educational guides, edit drafts, or remove outdated articles.
                </p>
              </div>
              <button
                onClick={() => {
                  setBlogImageFile(null);
                  setBlogImagePreview('');
                  setEditingBlog({
                    title: '',
                    slug: '',
                    category: 'Asthma',
                    readTime: '4 min read',
                    publishedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    author: 'Dr. Kritarth',
                    summary: '',
                    content: '## Overview\n\nExplain key insights for patients here...',
                    tags: ['respiratory', 'health'],
                    status: 'published'
                  });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800"
              >
                <Plus className="w-4 h-4" />
                <span>Write Article</span>
              </button>
            </div>

            {/* Blogs List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blogs.map((b) => (
                <div
                  key={b.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                        {b.category}
                      </span>
                      <span className="text-[10px] text-slate-400">{b.publishedDate}</span>
                    </div>

                    {b.featuredImage && (
                      <div className="w-full h-32 rounded-xl overflow-hidden mb-3 bg-slate-100 border border-slate-200 shrink-0">
                        <img 
                          src={b.featuredImage} 
                          alt={b.title} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    <h4 className="font-heading font-bold text-slate-900 text-base mb-1">
                      {b.title}
                    </h4>

                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                      {b.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => navigate('blog-detail', b.slug)}
                      className="text-teal-700 font-semibold hover:underline"
                    >
                      Read Preview →
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setBlogImageFile(null);
                          setBlogImagePreview('');
                          setEditingBlog(b);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete article ${b.title}?`)) {
                            deleteBlog(b.id);
                          }
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Blog Edit Modal */}
            {editingBlog && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
                <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <h3 className="font-heading font-bold text-lg text-slate-900">
                      {editingBlog.id ? 'Edit Article' : 'Compose New Article'}
                    </h3>
                    <button onClick={() => setEditingBlog(null)} className="p-1 text-slate-400">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      
                      let finalImageUrl = editingBlog.featuredImage;

                      if (blogImageFile) {
                        showToast('Uploading image...');
                        const uploaded = await uploadMedia(
                          blogImageFile, 
                          'Blog Images', 
                          `Blog: ${editingBlog.title || 'Untitled'}`
                        );
                        if (uploaded && uploaded.url) {
                          finalImageUrl = uploaded.url;
                        } else {
                          showToast('Failed to upload image, keeping existing.');
                        }
                      }

                      await saveBlog({ ...editingBlog, featuredImage: finalImageUrl });
                      setEditingBlog(null);
                      setBlogImageFile(null);
                      setBlogImagePreview('');
                    }}
                    className="space-y-4 text-xs"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Title</label>
                        <input
                          type="text"
                          required
                          value={editingBlog.title || ''}
                          onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Category</label>
                        <select
                          value={editingBlog.category || 'Asthma'}
                          onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                        >
                          <option value="Asthma">Asthma</option>
                          <option value="COPD">COPD</option>
                          <option value="Sleep Apnea">Sleep Apnea</option>
                          <option value="Lung Infections">Lung Infections</option>
                          <option value="Air Pollution & Health">Air Pollution &amp; Health</option>
                          <option value="Interventional Pulmonology">Interventional Pulmonology</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Featured Image</label>
                      
                      {blogImagePreview || editingBlog.featuredImage ? (
                        <div className="relative mb-2 w-full max-w-sm rounded-xl overflow-hidden border border-slate-200 aspect-[16/9] bg-slate-100 group">
                          <img 
                            src={blogImagePreview || editingBlog.featuredImage} 
                            alt="Featured" 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setBlogImageFile(null);
                                setBlogImagePreview('');
                                setEditingBlog({ ...editingBlog, featuredImage: '' });
                              }}
                              className="px-3 py-1.5 bg-rose-600 text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-lg hover:bg-rose-700 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2 mb-2 w-full max-w-sm">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 hover:border-teal-400 transition-colors cursor-pointer text-center p-4">
                            <Upload className="w-6 h-6 text-slate-400 mb-2" />
                            <span className="text-xs font-semibold text-slate-700">Click to upload image</span>
                            <span className="text-[10px] text-slate-500 mt-1">Recommended: 16:9 ratio</span>
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                
                                if (!file.type.startsWith("image/")) {
                                  alert("Please select a valid image file.");
                                  return;
                                }

                                setBlogImageFile(file);
                                setBlogImagePreview(URL.createObjectURL(file));
                                e.target.value = ''; // Reset input
                              }} 
                            />
                          </label>
                        </div>
                      )}
                      
                      <div className="text-[10px] text-slate-500 flex items-center gap-1 mb-4">
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>This image appears on the blog cards and at the top of the article.</span>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Short Summary</label>
                      <textarea
                        rows={2}
                        value={editingBlog.summary || ''}
                        onChange={(e) => setEditingBlog({ ...editingBlog, summary: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Full Content (Markdown format supported)
                      </label>
                      <textarea
                        rows={8}
                        value={editingBlog.content || ''}
                        onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setEditingBlog(null)}
                        className="px-4 py-2 rounded-xl text-slate-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl font-semibold text-white bg-teal-700"
                      >
                        Publish Article
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 7: TESTIMONIALS */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  Patient Feedback Management
                </h3>
                <p className="text-xs text-slate-500">
                  Add verified patient reviews while adhering to medical compliance standards.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingTestimonial({
                    patientName: '',
                    conditionTreated: 'Asthma Management',
                    review: '',
                    rating: 5,
                    date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800"
              >
                <Plus className="w-4 h-4" />
                <span>Add Review</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {testimonials.map((test) => (
                <div
                  key={test.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="font-heading font-bold text-slate-900 text-sm mb-1">
                      {test.patientName}
                    </div>
                    <div className="text-xs text-teal-700 mb-2">{test.conditionTreated}</div>
                    <p className="text-xs text-slate-600 italic line-clamp-4 leading-relaxed mb-4">
                      &quot;{test.review}&quot;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">{test.date}</span>
                    <button
                      onClick={() => {
                        if (confirm(`Remove review for ${test.patientName}?`)) {
                          deleteTestimonial(test.id);
                        }
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Modal */}
            {editingTestimonial && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
                  <h3 className="font-heading font-bold text-lg text-slate-900 mb-4">
                    Add Patient Review
                  </h3>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await saveTestimonial(editingTestimonial);
                      setEditingTestimonial(null);
                    }}
                    className="space-y-3 text-xs"
                  >
                    <div>
                      <label className="block font-semibold mb-1">Patient Name / Initials</label>
                      <input
                        type="text"
                        required
                        value={editingTestimonial.patientName || ''}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, patientName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Condition Treated</label>
                      <input
                        type="text"
                        required
                        value={editingTestimonial.conditionTreated || ''}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, conditionTreated: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Feedback</label>
                      <textarea
                        rows={3}
                        required
                        value={editingTestimonial.review || ''}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, review: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingTestimonial(null)}
                        className="px-4 py-2 rounded-xl text-slate-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl text-white bg-teal-700 font-semibold"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 8: VIDEOS */}
        {activeTab === 'videos' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  Doctor Explains Video Entries
                </h3>
                <p className="text-xs text-slate-500">
                  Manage patient education videos and demonstrations.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingVideo({
                    title: '',
                    category: 'Inhaler Technique',
                    duration: '4:15',
                    videoUrl: '',
                    description: ''
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800"
              >
                <Plus className="w-4 h-4" />
                <span>Add Video</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {videos.map((v) => (
                <div
                  key={v.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                      {v.category}
                    </span>
                    <h4 className="font-heading font-bold text-slate-900 text-sm mt-2 mb-1">
                      {v.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {v.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
                    <span className="text-slate-400">{v.duration}</span>
                    <button
                      onClick={() => {
                        if (confirm(`Remove video ${v.title}?`)) {
                          deleteVideo(v.id);
                        }
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Video Modal */}
            {editingVideo && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
                  <h3 className="font-heading font-bold text-lg text-slate-900 mb-4">
                    Add Educational Video
                  </h3>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await saveVideo(editingVideo);
                      setEditingVideo(null);
                    }}
                    className="space-y-3 text-xs"
                  >
                    <div>
                      <label className="block font-semibold mb-1">Video Title</label>
                      <input
                        type="text"
                        required
                        value={editingVideo.title || ''}
                        onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Category</label>
                      <input
                        type="text"
                        value={editingVideo.category || ''}
                        onChange={(e) => setEditingVideo({ ...editingVideo, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Duration (e.g. 5:20)</label>
                      <input
                        type="text"
                        value={editingVideo.duration || ''}
                        onChange={(e) => setEditingVideo({ ...editingVideo, duration: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Video URL (YouTube/Vimeo/MP4)</label>
                      <input
                        type="text"
                        value={editingVideo.videoUrl || ''}
                        onChange={(e) => setEditingVideo({ ...editingVideo, videoUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={editingVideo.description || ''}
                        onChange={(e) => setEditingVideo({ ...editingVideo, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingVideo(null)}
                        className="px-4 py-2 rounded-xl text-slate-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl text-white bg-teal-700 font-semibold"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* UNIVERSAL IMAGE UPLOAD MODAL */}
        {showUploadModal && (
          <div
            id="image-upload-modal-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
          >
            <div
              id="image-upload-modal-container"
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 my-8 overflow-hidden relative"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-3 mb-5 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
                      <Upload className="w-4 h-4" />
                    </span>
                    <h3 className="font-heading font-bold text-lg text-slate-900">
                      Upload Medical Image
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Upload doctor portraits, clinic visual assets, bronchoscopy photos, or certificates.
                  </p>
                </div>
                <button
                  type="button"
                  id="close-upload-modal-btn"
                  onClick={resetUploadModal}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Upload Success State */}
              {modalUploadedItem ? (
                <div className="space-y-5 text-center py-2 animate-in zoom-in-95 duration-150">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-base">
                      Image Uploaded &amp; Saved Successfully!
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      The image has been stored permanently on the server and added to your Media Library.
                    </p>
                  </div>

                  {/* Uploaded Image Preview */}
                  <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 flex items-center gap-3 text-left">
                    <div className="w-16 h-16 rounded-xl bg-slate-200 overflow-hidden shrink-0 border border-slate-300">
                      <img
                        src={modalUploadedItem.url}
                        alt={modalUploadedItem.altText}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1 text-xs">
                      <div className="font-heading font-bold text-slate-900 truncate">
                        {modalUploadedItem.altText || modalUploadedItem.filename}
                      </div>
                      <div className="text-slate-400 text-[11px] truncate font-mono">
                        {modalUploadedItem.url}
                      </div>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700">
                        {modalUploadedItem.category}
                      </span>
                    </div>
                  </div>

                  {/* One-Click Slot Assignment */}
                  <div className="space-y-2 text-left pt-2 border-t border-slate-100">
                    <span className="block text-[11px] font-semibold text-slate-700">
                      Instantly use this image on public website:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          updateSettings({ heroDoctorImage: modalUploadedItem.url });
                          showToast('Updated Hero Doctor Portrait');
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 font-semibold text-center transition-colors"
                      >
                        Set as Hero Doctor
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          updateSettings({ aboutDoctorImage: modalUploadedItem.url });
                          showToast('Updated About Section Photo');
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 font-semibold text-center transition-colors"
                      >
                        Set as About Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          updateSettings({ lungsVisualImage: modalUploadedItem.url });
                          showToast('Updated 3D Lungs Visualizer');
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 font-semibold text-center transition-colors"
                      >
                        Set as 3D Lungs Visual
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          updateSettings({ clinicSuiteImage: modalUploadedItem.url });
                          showToast('Updated Clinic Suite Image');
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 font-semibold text-center transition-colors"
                      >
                        Set as Clinic Photo
                      </button>
                    </div>
                  </div>

                  {/* Modal Footer Controls */}
                  <div className="flex items-center justify-between gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setModalUploadedItem(null);
                        setModalSelectedFile(null);
                        setModalFilePreview(null);
                        setModalUrlInput('');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100"
                    >
                      Upload Another Image
                    </button>
                    <button
                      type="button"
                      onClick={resetUploadModal}
                      className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800"
                    >
                      Done &amp; Close
                    </button>
                  </div>
                </div>
              ) : (
                /* Upload Form */
                <form onSubmit={handleModalUploadSubmit} className="space-y-4 text-xs">
                  {/* Mode Switcher */}
                  <div className="flex items-center p-1 bg-slate-100 rounded-xl">
                    <button
                      type="button"
                      id="upload-mode-file-btn"
                      onClick={() => setModalUploadMode('file')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        modalUploadMode === 'file'
                          ? 'bg-white text-slate-900 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload from Device</span>
                    </button>
                    <button
                      type="button"
                      id="upload-mode-url-btn"
                      onClick={() => setModalUploadMode('url')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        modalUploadMode === 'url'
                          ? 'bg-white text-slate-900 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                      <span>Import from Web URL</span>
                    </button>
                  </div>

                  {/* Mode 1: File Dropzone */}
                  {modalUploadMode === 'file' ? (
                    <div
                      id="modal-dropzone"
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragOverModal(true);
                      }}
                      onDragLeave={() => setIsDragOverModal(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragOverModal(false);
                        const file = e.dataTransfer.files?.[0];
                        if (file) handleModalFileSelect(file);
                      }}
                      className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                        isDragOverModal
                          ? 'border-teal-500 bg-teal-50/70 scale-[1.01]'
                          : 'border-slate-300 bg-slate-50/70 hover:bg-slate-100/60'
                      }`}
                    >
                      {modalFilePreview ? (
                        <div className="flex flex-col items-center">
                          <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm mb-3 border border-slate-200">
                            <img
                              src={modalFilePreview}
                              alt="Upload preview"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-semibold text-slate-900 text-xs">
                            {modalSelectedFile?.name}
                          </span>
                          <span className="text-[10px] text-slate-400 mb-3">
                            {modalSelectedFile && (modalSelectedFile.size / 1024).toFixed(0)} KB
                          </span>
                          <button
                            type="button"
                            onClick={() => modalFileInputRef.current?.click()}
                            className="text-xs text-teal-700 hover:underline font-semibold"
                          >
                            Change Selected Image
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-2.5">
                            <Upload className="w-6 h-6" />
                          </div>
                          <span className="font-heading font-bold text-slate-800 text-xs mb-1">
                            Drag &amp; drop your image here, or browse
                          </span>
                          <span className="text-[11px] text-slate-400 mb-3">
                            JPG, PNG, WebP, SVG supported
                          </span>
                          <button
                            type="button"
                            id="browse-files-btn"
                            onClick={() => modalFileInputRef.current?.click()}
                            className="px-4 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs shadow-2xs"
                          >
                            Browse Files
                          </button>
                        </div>
                      )}

                      <input
                        ref={modalFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleModalFileSelect(file);
                        }}
                        className="hidden"
                        id="modal-file-input"
                      />
                    </div>
                  ) : (
                    /* Mode 2: Web URL input */
                    <div className="space-y-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Image Web URL (HTTPS)
                        </label>
                        <input
                          type="url"
                          required
                          value={modalUrlInput}
                          onChange={(e) => setModalUrlInput(e.target.value)}
                          placeholder="https://images.unsplash.com/... or cloud link"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs"
                        />
                      </div>
                      {modalUrlInput.trim() && (
                        <div className="aspect-[16/9] rounded-xl bg-slate-100 overflow-hidden border border-slate-200 max-h-36">
                          <img
                            src={modalUrlInput}
                            alt="Preview"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Metadata Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Category</label>
                      <select
                        value={modalCategory}
                        onChange={(e) => setModalCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs"
                      >
                        <option value="Doctor Photos">Doctor Photos</option>
                        <option value="Hero Images">Hero Images</option>
                        <option value="Lung Conditions">Lung Conditions</option>
                        <option value="Blog Images">Blog Images</option>
                        <option value="Certificates">Certificates</option>
                        <option value="Hospital">Hospital &amp; Clinic</option>
                        <option value="Testimonials">Testimonials</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Alt Description
                      </label>
                      <input
                        type="text"
                        value={modalAltText}
                        onChange={(e) => setModalAltText(e.target.value)}
                        placeholder="e.g. Dr. Kritarth Pulmonologist"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Caption / Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={modalCaption}
                      onChange={(e) => setModalCaption(e.target.value)}
                      placeholder="e.g. Bronchoscopy Suite Mohali"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={resetUploadModal}
                      className="px-4 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      id="modal-submit-upload-btn"
                      disabled={modalIsUploading || (modalUploadMode === 'file' && !modalSelectedFile) || (modalUploadMode === 'url' && !modalUrlInput.trim())}
                      className="px-6 py-2.5 rounded-xl font-heading font-bold text-xs text-white bg-teal-700 hover:bg-teal-800 disabled:opacity-40 disabled:pointer-events-none shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      {modalIsUploading ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload &amp; Save to Library</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
