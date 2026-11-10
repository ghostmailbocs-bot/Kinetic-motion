import React from 'react';
import { PromptTemplate } from '../data/promptTemplates';
import { CardVisualPreview } from './CardVisualPreview';

import { Trash2, Edit3 } from 'lucide-react';

interface PromptCardProps {
  template: PromptTemplate;
  onOpenPrompt: (template: PromptTemplate) => void;
  onEdit?: (template: PromptTemplate) => void;
  onDelete?: (template: PromptTemplate) => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  template,
  onOpenPrompt,
  onEdit,
  onDelete,
}) => {
  return (
    <article className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group">
      {/* Visual Preview Header */}
      <div
        className="relative w-full border-b border-slate-100 overflow-hidden cursor-pointer"
        onClick={() => onOpenPrompt(template)}
      >
        <CardVisualPreview
          id={template.id}
          title={template.title}
          category={template.category}
          number={template.number}
        />

        {/* Quick action overlay buttons */}
        <div
          className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20"
          onClick={(e) => e.stopPropagation()}
        >
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(template)}
              className="p-1.5 bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 rounded-full shadow-sm backdrop-blur-xs transition cursor-pointer"
              title="Edit prompt blueprint"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(template)}
              className="p-1.5 bg-white/90 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-full shadow-sm backdrop-blur-xs transition cursor-pointer"
              title="Delete this style"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2">
          {/* Category Tag */}
          <div className="flex justify-between items-center text-xs font-semibold text-[#dc4c38] tracking-wide">
            <span>
              {template.number} {template.category}
            </span>
          </div>

          {/* Serif Title */}
          <h3
            onClick={() => onOpenPrompt(template)}
            className="text-xl sm:text-2xl font-editorial font-bold text-[#122033] tracking-tight leading-snug cursor-pointer group-hover:text-[#dc4c38] transition-colors"
          >
            {template.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-[13.5px] text-slate-600 line-clamp-3 leading-relaxed font-sans">
            {template.shortDescription}
          </p>
        </div>

        {/* CTA Button and secondary quick actions */}
        <div className="pt-2 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onOpenPrompt(template)}
            className="w-auto px-5 py-2 sm:py-2.5 bg-[#e5825a] hover:bg-[#d97349] active:scale-95 text-white font-semibold text-xs sm:text-sm rounded-full shadow-2xs hover:shadow-xs transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
          >
            Get the prompt
          </button>

          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(template)}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition cursor-pointer md:opacity-0 group-hover:opacity-100"
              title="Delete style"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
