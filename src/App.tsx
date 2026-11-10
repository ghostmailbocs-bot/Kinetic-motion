import React, { useState, useMemo, useEffect } from 'react';
import {
  loadStoredTemplates,
  saveStoredTemplates,
  PromptTemplate
} from './data/promptTemplates';
import { PromptCard } from './components/PromptCard';
import { PromptModal } from './components/PromptModal';
import { TemplateManagerModal } from './components/TemplateManagerModal';
import { Sparkles, Search, SlidersHorizontal, Settings2, Plus, Trash2, AlertCircle } from 'lucide-react';

export default function App() {
  const [allTemplates, setAllTemplates] = useState<PromptTemplate[]>(() => loadStoredTemplates());
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [isManagerOpen, setIsManagerOpen] = useState<boolean>(false);

  // Categories with counts (dynamic when templates are added or deleted)
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    allTemplates.forEach((tpl) => {
      const cat = tpl.category || 'General';
      counts[cat] = (counts[cat] || 0) + 1;
    });

    const standardOrder = [
      'Kinetic Type',
      'Hand-Drawn',
      'Screen and UI',
      'Data',
      'Talking Head',
      'Illustrated',
    ];

    // Get all categories in standard order first, then any custom ones
    const sortedCategories = [
      ...standardOrder.filter((c) => counts[c] !== undefined),
      ...Object.keys(counts).filter((c) => !standardOrder.includes(c)),
    ];

    return [
      { label: 'All', count: allTemplates.length },
      ...sortedCategories.map((cat) => ({
        label: cat,
        count: counts[cat],
      })),
    ];
  }, [allTemplates]);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return allTemplates.filter((tpl) => {
      const matchesCategory =
        activeCategory === 'All' || tpl.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.number.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Handle modal navigation between items in the current filtered list
  const currentTemplateIndex = useMemo(() => {
    if (!selectedTemplate) return -1;
    return filteredTemplates.findIndex((t) => t.id === selectedTemplate.id);
  }, [selectedTemplate, filteredTemplates]);

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (currentTemplateIndex === -1) return;
    if (direction === 'prev' && currentTemplateIndex > 0) {
      setSelectedTemplate(filteredTemplates[currentTemplateIndex - 1]);
    } else if (
      direction === 'next' &&
      currentTemplateIndex < filteredTemplates.length - 1
    ) {
      setSelectedTemplate(filteredTemplates[currentTemplateIndex + 1]);
    }
  };

  const [managerSelectedId, setManagerSelectedId] = useState<string | undefined>(undefined);
  const [deletingTemplate, setDeletingTemplate] = useState<PromptTemplate | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Direct delete style from front page or card
  const handleDirectDeleteStyle = (tpl: PromptTemplate) => {
    if (allTemplates.length <= 1) {
      setToastMessage('At least one style must be kept.');
      setTimeout(() => setToastMessage(null), 2500);
      return;
    }
    setDeletingTemplate(tpl);
  };

  const handleConfirmDelete = () => {
    if (!deletingTemplate) return;
    const deletedTitle = deletingTemplate.title;
    const remaining = allTemplates.filter((t) => t.id !== deletingTemplate.id);
    setAllTemplates(remaining);
    saveStoredTemplates(remaining);
    if (selectedTemplate?.id === deletingTemplate.id) {
      setSelectedTemplate(null);
    }
    setDeletingTemplate(null);
    setToastMessage(`Deleted "${deletedTitle}"`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Direct add style from front page
  const handleDirectAddStyle = () => {
    const newNumber = `#0${allTemplates.length + 1}`;
    const newId = `custom-style-${Date.now()}`;
    const newTpl: PromptTemplate = {
      id: newId,
      number: newNumber,
      category: activeCategory !== 'All' ? (activeCategory as any) : 'Kinetic Type',
      title: `Motion Style ${allTemplates.length + 1}`,
      shortDescription: 'Describe the aesthetic, typography, and motion pacing here...',
      howItExplains: 'Describe how ideas and key visual moments land step by step...',
      defaultTopic: 'How to build scalable systems with AI',
      tags: ['Custom', 'Motion'],
      thumbnailUrl: '',
      voiceoverPrompt: 'With Voiceover: Clear, energetic narration synchronized with on-screen visual hits.',
      noVoiceoverPrompt: 'No Voiceover: Rich rhythmic sound effects and impacts only. No spoken dialogue.',
      customPromptTemplate: `You are an expert video animator specializing in {{title}}.\n\nTOPIC:\n"{{topic}}"\n\nSTYLE SPECIFICATION:\n{{shortDescription}}\n\nEXPLANATION LOGIC:\n{{howItExplains}}\n\nAUDIO:\n{{audioDirection}}\n\nSTORYBOARD:\n{{storyboardProtocol}}\n\nGenerate complete animation code.`,
    };

    const updated = [...allTemplates, newTpl];
    setAllTemplates(updated);
    saveStoredTemplates(updated);
    setManagerSelectedId(newId);
    setIsManagerOpen(true);
  };

  const handleEditTemplate = (tpl: PromptTemplate) => {
    setManagerSelectedId(tpl.id);
    setIsManagerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f0f4f9] text-[#1a2233] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header / Branding */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200/90 text-[11px] font-semibold text-[#dc4c38] shadow-2xs mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Prompt Motion Studio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-[#122033] tracking-tight">
              Video & Motion Graphic Prompts
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl font-sans">
              Choose an aesthetic, customize your topic or script, and copy tailored prompts
              designed to generate code-driven animations and explainers with Claude.
            </p>
          </div>

          {/* Actions & Search */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={handleDirectAddStyle}
              className="px-3.5 py-2 text-xs sm:text-sm font-bold bg-[#e5825a] hover:bg-[#d97349] text-white rounded-full shadow-2xs transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95"
              title="Add a new motion style"
            >
              <Plus className="w-4 h-4" />
              <span>Add Style</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setManagerSelectedId(undefined);
                setIsManagerOpen(true);
              }}
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 rounded-full shadow-2xs transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95"
              title="Manage and edit individual prompt templates"
            >
              <Settings2 className="w-4 h-4 text-[#e5825a]" />
              <span>Manage Prompts</span>
            </button>

            {/* Quick Search */}
            <div className="relative min-w-[180px] sm:w-56">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search styles..."
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-200/90 rounded-full focus:outline-none focus:ring-2 focus:ring-[#e5825a]/50 text-slate-800 placeholder-slate-400 shadow-2xs font-sans"
              />
            </div>
          </div>
        </header>

        {/* Filter Pills (Matching Screenshot 1) */}
        <nav className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" aria-label="Style filters">
          {categoriesWithCounts.map((cat) => {
            const isActive = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => setActiveCategory(cat.label)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#14233c] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                {cat.label} {cat.count}
              </button>
            );
          })}
        </nav>

        {/* Cards Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
        {filteredTemplates.length > 0 ? (
          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredTemplates.map((template) => (
              <PromptCard
                key={template.id}
                template={template}
                onOpenPrompt={(tpl) => setSelectedTemplate(tpl)}
                onEdit={handleEditTemplate}
                onDelete={handleDirectDeleteStyle}
              />
            ))}

            {/* Quick Add Style Card in Grid */}
            <div
              onClick={handleDirectAddStyle}
              className="border-2 border-dashed border-slate-300 hover:border-[#e5825a] rounded-2xl sm:rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/70 transition-all duration-200 group min-h-[260px] bg-slate-50/50"
            >
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 group-hover:bg-[#e5825a]/10 group-hover:border-[#e5825a]/30 flex items-center justify-center text-slate-400 group-hover:text-[#dc4c38] transition-colors mb-3 shadow-2xs">
                <Plus className="w-6 h-6" />
              </div>
              <h4 className="font-editorial text-lg font-bold text-slate-800 group-hover:text-[#dc4c38] transition-colors">
                Create New Style
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Add a custom motion graphic style with your own prompt blueprint and instructions.
              </p>
            </div>
          </main>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <SlidersHorizontal className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-editorial text-xl font-bold text-slate-800">No styles found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              No prompt templates matched "{searchQuery}". Try searching for another term or
              switch back to "All".
            </p>
            <div className="flex justify-center gap-2 pt-2">
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-full hover:bg-slate-800 transition cursor-pointer"
              >
                Reset filters
              </button>
              <button
                onClick={handleDirectAddStyle}
                className="px-4 py-2 bg-[#e5825a] text-white text-xs font-semibold rounded-full hover:bg-[#d97349] transition cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Style</span>
              </button>
            </div>
          </div>
        )}

        {/* Interactive Modal Popup */}
        <PromptModal
          template={selectedTemplate}
          isOpen={!!selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
          onNavigate={handleNavigate}
          hasPrev={currentTemplateIndex > 0}
          hasNext={
            currentTemplateIndex >= 0 &&
            currentTemplateIndex < filteredTemplates.length - 1
          }
        />

        {/* Template Manager Modal */}
        <TemplateManagerModal
          isOpen={isManagerOpen}
          initialSelectedId={managerSelectedId}
          onClose={() => {
            setIsManagerOpen(false);
            setManagerSelectedId(undefined);
          }}
          templates={allTemplates}
          onSaveTemplates={(updated) => {
            setAllTemplates(updated);
            saveStoredTemplates(updated);
            if (selectedTemplate) {
              const refreshed = updated.find((t) => t.id === selectedTemplate.id);
              if (refreshed) {
                setSelectedTemplate(refreshed);
              } else {
                setSelectedTemplate(null);
              }
            }
          }}
        />
        {/* In-App Delete Confirmation Dialog (No window.confirm) */}
        {deletingTemplate && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
            <div
              className="relative bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-scaleUp text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-editorial text-xl font-bold text-slate-900">
                  Delete Motion Style?
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Are you sure you want to remove <span className="font-bold text-slate-900">"{deletingTemplate.title}"</span>? This will immediately remove it from the cards and category filters.
                </p>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDeletingTemplate(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:scale-95 rounded-xl shadow-xs transition cursor-pointer"
                >
                  Delete Style
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Global Action Toast Message */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm animate-slideUp border border-slate-800">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Footer info note */}
        <footer className="pt-8 pb-4 border-t border-slate-200/80 text-center text-xs text-slate-500 space-y-1">
          <p>
            Interactive Video Style & Motion Prompt Generator. Click any card to customize and copy prompts.
          </p>
          <p className="text-[11px] text-slate-400">
            Works with Claude 3.7 Sonnet, Remotion, Canvas, and modern video generation models.
          </p>
        </footer>
      </div>
    </div>
  );
}
