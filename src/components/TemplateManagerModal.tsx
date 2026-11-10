import React, { useState } from 'react';
import { PromptTemplate } from '../data/promptTemplates';
import {
  X,
  Save,
  Plus,
  Trash2,
  Check,
  Code,
  Sparkles
} from 'lucide-react';

interface TemplateManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  templates: PromptTemplate[];
  initialSelectedId?: string;
  onSaveTemplates: (updatedTemplates: PromptTemplate[]) => void;
}

export const TemplateManagerModal: React.FC<TemplateManagerModalProps> = ({
  isOpen,
  onClose,
  templates,
  initialSelectedId,
  onSaveTemplates,
}) => {
  const [items, setItems] = useState<PromptTemplate[]>(templates);
  const [selectedId, setSelectedId] = useState<string>(
    initialSelectedId || templates[0]?.id || ''
  );
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [showJsonMode, setShowJsonMode] = useState<boolean>(false);
  const [jsonText, setJsonText] = useState<string>('');
  const [jsonError, setJsonError] = useState<string | null>(null);

  const [isConfirmingDelete, setIsConfirmingDelete] = useState<boolean>(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Keep items and selectedId in sync
  React.useEffect(() => {
    setItems(templates);
    if (initialSelectedId && templates.some((t) => t.id === initialSelectedId)) {
      setSelectedId(initialSelectedId);
    } else if (!templates.some((t) => t.id === selectedId) && templates[0]) {
      setSelectedId(templates[0].id);
    }
    setIsConfirmingDelete(false);
  }, [templates, initialSelectedId, selectedId]);

  if (!isOpen) return null;

  const currentTemplate = items.find((t) => t.id === selectedId) || items[0] || templates[0];

  const handleUpdateCurrent = (field: keyof PromptTemplate, value: any) => {
    if (!currentTemplate) return;
    const updated = items.map((t) =>
      t.id === currentTemplate.id ? { ...t, [field]: value } : t
    );
    setItems(updated);
    onSaveTemplates(updated); // Sync immediately to front page & localStorage
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 1800);
  };

  const handleInsertPlaceholder = (placeholder: string) => {
    if (!currentTemplate) return;
    const existing = currentTemplate.customPromptTemplate || '';
    handleUpdateCurrent('customPromptTemplate', existing + placeholder);
  };

  const handleSaveAll = () => {
    onSaveTemplates(items);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2400);
  };

  const handleAddNewTemplate = () => {
    const newNumber = `#0${items.length + 1}`;
    const newId = `custom-style-${Date.now()}`;
    const newTpl: PromptTemplate = {
      id: newId,
      number: newNumber,
      category: 'Kinetic Type',
      title: `Motion Style ${items.length + 1}`,
      shortDescription: 'Describe the aesthetic, typography, and motion pacing here...',
      howItExplains: 'Describe how ideas and key visual moments land step by step...',
      defaultTopic: 'How to build scalable systems with AI',
      tags: ['Custom', 'Motion'],
      voiceoverPrompt: 'With Voiceover: Clear, energetic narration synchronized with on-screen visual hits.',
      noVoiceoverPrompt: 'No Voiceover: Rich rhythmic sound effects and impacts only. No spoken dialogue.',
      customPromptTemplate: `You are an expert video animator specializing in {{title}}.\n\nTOPIC:\n"{{topic}}"\n\nSTYLE SPECIFICATION:\n{{shortDescription}}\n\nEXPLANATION LOGIC:\n{{howItExplains}}\n\nAUDIO:\n{{audioDirection}}\n\nSTORYBOARD:\n{{storyboardProtocol}}\n\nGenerate complete animation code.`,
    };

    const updated = [...items, newTpl];
    setItems(updated);
    setSelectedId(newId);
    onSaveTemplates(updated); // IMMEDIATELY sync to front page and storage!
    setActionFeedback(`Added "${newTpl.title}"`);
    setTimeout(() => setActionFeedback(null), 2400);
  };

  const handleExecuteDelete = () => {
    if (!currentTemplate) return;
    if (items.length <= 1) {
      setActionFeedback('At least one style must be kept');
      setTimeout(() => setActionFeedback(null), 2400);
      setIsConfirmingDelete(false);
      return;
    }

    const deletedTitle = currentTemplate.title;
    const remaining = items.filter((t) => t.id !== currentTemplate.id);
    setItems(remaining);
    if (remaining.length > 0) {
      setSelectedId(remaining[0].id);
    }
    setIsConfirmingDelete(false);
    onSaveTemplates(remaining); // IMMEDIATELY sync to front page and storage!
    setActionFeedback(`Deleted "${deletedTitle}"`);
    setTimeout(() => setActionFeedback(null), 2400);
  };

  const handleOpenJsonExport = () => {
    setJsonText(JSON.stringify(items, null, 2));
    setJsonError(null);
    setShowJsonMode(true);
  };

  const handleApplyJsonImport = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('JSON must be an array of templates');
      }
      setItems(parsed);
      setSelectedId(parsed[0].id || 'creator-motion-graphics');
      setShowJsonMode(false);
      onSaveTemplates(parsed);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2400);
    } catch (e: any) {
      setJsonError(e.message || 'Invalid JSON format');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className="relative bg-white w-full max-w-5xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[92vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#122033] text-white rounded-xl">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-editorial font-bold text-slate-900 leading-tight">
                Prompt Template Manager
              </h2>
              <p className="text-xs text-slate-500 font-sans">
                Customize, add, or rewrite individual prompt templates and backend instructions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenJsonExport}
              className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5 cursor-pointer"
              title="Export / Import JSON"
            >
              <Code className="w-3.5 h-3.5" />
              <span>JSON Mode</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* JSON Mode Drawer / View */}
        {showJsonMode ? (
          <div className="p-6 flex-1 flex flex-col overflow-y-auto space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Raw JSON Template Data</h3>
                <p className="text-xs text-slate-500">
                  You can edit the JSON directly, export it, or paste new templates.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowJsonMode(false)}
                  className="px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-lg hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApplyJsonImport}
                  className="px-4 py-1.5 text-xs font-semibold bg-[#122033] text-white rounded-lg hover:bg-slate-800"
                >
                  Apply & Save JSON
                </button>
              </div>
            </div>

            {jsonError && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                {jsonError}
              </div>
            )}

            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              className="w-full flex-1 min-h-[400px] p-4 bg-slate-900 text-emerald-300 font-mono text-xs rounded-xl focus:outline-none"
              spellCheck={false}
            />
          </div>
        ) : (
          /* Visual Split Editor */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left Sidebar: List of Templates */}
            <div className="w-full md:w-64 border-r border-slate-200 bg-slate-50/70 p-3 sm:p-4 overflow-y-auto space-y-2 flex-shrink-0">
              <div className="flex justify-between items-center px-1 mb-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Styles ({items.length})
                </span>
                <button
                  type="button"
                  onClick={handleAddNewTemplate}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#dc4c38] hover:text-[#b83827] cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Add Style
                </button>
              </div>

              <div className="space-y-1">
                {items.map((tpl) => {
                  const isSelected = tpl.id === currentTemplate.id;
                  return (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => setSelectedId(tpl.id)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex flex-col gap-0.5 cursor-pointer ${
                        isSelected
                          ? 'bg-white shadow-xs border border-slate-300/80 font-bold text-slate-900'
                          : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-400">
                        <span>{tpl.number}</span>
                        <span className="text-[#dc4c38] font-semibold">{tpl.category}</span>
                      </div>
                      <span className="truncate">{tpl.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Main Editor: Current Template Form */}
            <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-5 bg-white">
              {/* Top controls of current template */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-1 bg-slate-100 rounded text-slate-700">
                    {currentTemplate.number}
                  </span>
                  <input
                    type="text"
                    value={currentTemplate.title}
                    onChange={(e) => handleUpdateCurrent('title', e.target.value)}
                    className="text-lg sm:text-xl font-editorial font-bold text-[#122033] border-b border-transparent hover:border-slate-300 focus:border-[#e5825a] focus:outline-none px-1"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-500 font-semibold">Category:</span>
                    <input
                      type="text"
                      value={currentTemplate.category}
                      onChange={(e) => handleUpdateCurrent('category', e.target.value)}
                      placeholder="e.g. Kinetic Type"
                      className="text-xs bg-slate-50 text-slate-800 font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#e5825a] w-36"
                    />
                  </div>

                  {isConfirmingDelete ? (
                    <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 px-2 py-1 rounded-lg animate-fadeIn">
                      <span className="text-[11px] font-bold text-red-700">Delete style?</span>
                      <button
                        type="button"
                        onClick={handleExecuteDelete}
                        className="px-2 py-0.5 bg-red-600 hover:bg-red-700 text-white rounded text-[11px] font-bold transition cursor-pointer shadow-2xs"
                      >
                        Yes, delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsConfirmingDelete(false)}
                        className="px-2 py-0.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded text-[11px] font-semibold transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (items.length <= 1) {
                          setActionFeedback('At least one style must be kept');
                          setTimeout(() => setActionFeedback(null), 2500);
                          return;
                        }
                        setIsConfirmingDelete(true);
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                      title="Delete this style"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Descriptions & How it explains */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Short Description (Card Subtitle)
                  </label>
                  <textarea
                    rows={3}
                    value={currentTemplate.shortDescription}
                    onChange={(e) => handleUpdateCurrent('shortDescription', e.target.value)}
                    className="w-full p-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#e5825a] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    "How it explains" (Motion Logic Box)
                  </label>
                  <textarea
                    rows={3}
                    value={currentTemplate.howItExplains}
                    onChange={(e) => handleUpdateCurrent('howItExplains', e.target.value)}
                    className="w-full p-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#e5825a] focus:outline-none"
                  />
                </div>
              </div>

              {/* Default Topic */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Default Topic or Script Placeholder
                </label>
                <input
                  type="text"
                  value={currentTemplate.defaultTopic}
                  onChange={(e) => handleUpdateCurrent('defaultTopic', e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#e5825a] focus:outline-none font-sans"
                />
              </div>

              {/* Audio & Voiceover Customization */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    "With Voiceover" Audio Prompt
                  </label>
                  <textarea
                    rows={2}
                    value={currentTemplate.voiceoverPrompt || ''}
                    onChange={(e) => handleUpdateCurrent('voiceoverPrompt', e.target.value)}
                    placeholder="Instructions when voiceover is toggled ON..."
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#e5825a] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    "No Voiceover" Audio Prompt
                  </label>
                  <textarea
                    rows={2}
                    value={currentTemplate.noVoiceoverPrompt || ''}
                    onChange={(e) => handleUpdateCurrent('noVoiceoverPrompt', e.target.value)}
                    placeholder="Instructions when voiceover is toggled OFF..."
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#e5825a] focus:outline-none"
                  />
                </div>
              </div>

              {/* Custom Prompt Blueprint & Placeholders */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-900">
                      Custom Prompt Template (Sent to Backend / AI)
                    </label>
                    <p className="text-[11px] text-slate-500">
                      This is the exact prompt string copied for this style. Click any placeholder below to insert it:
                    </p>
                  </div>
                </div>

                {/* Variable chips */}
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {[
                    '{{topic}}',
                    '{{howItExplains}}',
                    '{{audioDirection}}',
                    '{{storyboardProtocol}}',
                    '{{title}}',
                    '{{shortDescription}}',
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleInsertPlaceholder(chip)}
                      className="px-2 py-0.5 bg-slate-100 hover:bg-[#e5825a]/10 hover:text-[#dc4c38] border border-slate-200 rounded text-slate-700 font-mono transition cursor-pointer"
                    >
                      +{chip}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={10}
                  value={currentTemplate.customPromptTemplate || ''}
                  onChange={(e) => handleUpdateCurrent('customPromptTemplate', e.target.value)}
                  className="w-full p-3 font-mono text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#e5825a]/50 focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            {actionFeedback && (
              <span className="text-xs text-slate-700 font-semibold bg-slate-200/70 px-2.5 py-1.5 rounded-lg inline-block">
                {actionFeedback}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {saveSuccess && (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-4 h-4" /> Changes saved!
              </span>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-xl bg-white hover:bg-slate-100 transition cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleSaveAll}
              className="px-6 py-2 text-xs font-bold text-white bg-[#e5825a] hover:bg-[#d97349] active:scale-95 rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save All Prompts</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
