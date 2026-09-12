import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BlogPost } from '../types';
import {
  BookOpen,
  Search,
  Clock,
  Calendar,
  ArrowRight,
  Share2,
  X,
  UserCheck
} from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { blogs, navigate, openAppointmentModal, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [readingArticle, setReadingArticle] = useState<BlogPost | null>(null);

  const categories = [
    'All',
    'Asthma',
    'COPD',
    'Sleep Apnea',
    'Lung Infections',
    'Air Pollution & Health',
    'Interventional Pulmonology'
  ];

  const filteredBlogs = blogs.filter((b) => {
    if (b.status === 'draft') return false;
    const matchesCategory =
      selectedCategory === 'All' ||
      b.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleShare = (article: BlogPost) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard');
    }
  };

  return (
    <section id="blog-section" className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Patient Education
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mt-3">
              Respiratory Health Articles &amp; Guides
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mt-2 md:mt-0 leading-relaxed">
            Medically reviewed articles by Dr. Kritarth explaining lung physiology, practical inhaler advice, and sleep apnea insights.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Categories Pill Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, symptoms..."
              className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-teal-600 shadow-2xs"
            />
          </div>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm">
            No articles found matching &quot;{searchQuery}&quot;. Try adjusting your search query.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => setReadingArticle(blog)}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-teal-200 shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="aspect-[16/9] bg-slate-100 overflow-hidden relative">
                    <img
                      src={blog.featuredImage || "/src/assets/images/clinic_suite_interior_1789018639524.jpg"}
                      alt={blog.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-md text-[10px] font-bold text-teal-800 shadow-xs">
                      {blog.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium mb-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {blog.publishedDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {blog.readTime}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-slate-900 text-lg group-hover:text-teal-700 transition-colors mb-2 leading-snug">
                      {blog.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {blog.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-semibold text-teal-700 group-hover:text-teal-800 border-t border-slate-100">
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Article Reader Modal */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md">
                  {readingArticle.category}
                </span>
                <span className="text-xs text-slate-400">{readingArticle.readTime}</span>
              </div>
              <button
                onClick={() => setReadingArticle(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6">
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mb-3 leading-tight">
                {readingArticle.title}
              </h1>

              <div className="flex items-center gap-3 text-xs text-slate-500 pb-4 border-b border-slate-100 mb-6">
                <UserCheck className="w-4 h-4 text-teal-600" />
                <span>Reviewed by <strong>{readingArticle.author}</strong></span>
                <span>•</span>
                <span>{readingArticle.publishedDate}</span>
              </div>

              {/* Featured Image */}
              {readingArticle.featuredImage && (
                <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-slate-100">
                  <img
                    src={readingArticle.featuredImage}
                    alt={readingArticle.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content formatted with clean typography */}
              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                {readingArticle.content.split('\n\n').map((para, idx) => {
                  if (para.startsWith('### ')) {
                    return (
                      <h3 key={idx} className="text-lg font-heading font-bold text-slate-900 pt-2">
                        {para.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (para.startsWith('## ')) {
                    return (
                      <h2 key={idx} className="text-xl font-heading font-bold text-slate-900 pt-4">
                        {para.replace('## ', '')}
                      </h2>
                    );
                  }
                  return <p key={idx}>{para}</p>;
                })}
              </div>

              {/* Tags */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                {readingArticle.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Modal CTA */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => handleShare(readingArticle)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Guide</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setReadingArticle(null)}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setReadingArticle(null);
                    openAppointmentModal({ concern: `Enquiry from article: ${readingArticle.title}` });
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-xs"
                >
                  Book Appointment with Specialist
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
