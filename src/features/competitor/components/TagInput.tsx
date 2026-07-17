'use client';

import * as React from 'react';
import { FiX, FiPlus } from 'react-icons/fi';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

interface Props {
  id?: string;
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  colorScheme?: 'green' | 'red';
}

export function TagInput({
  id,
  label,
  values,
  onChange,
  placeholder = 'Add item…',
  className,
  disabled,
  colorScheme = 'green',
}: Props) {
  const [draft, setDraft] = React.useState('');
  const inputId = id ?? `tag-input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const add = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onChange([...values, trimmed]);
    setDraft('');
  };

  const remove = (idx: number) => {
    onChange(values.filter((_, i) => i !== idx));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      add();
    }
  };

  const tagClass =
    colorScheme === 'green'
      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';

  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-sm font-medium leading-none" htmlFor={inputId}>
        {label}
      </label>

      {/* Tag list */}
      {values.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {values.map((tag, idx) => (
            <span
              key={idx}
              className={cn(
                'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
                tagClass,
              )}
            >
              {tag}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  aria-label={`Remove ${tag}`}
                  className="ml-0.5 rounded-full p-0.5 hover:opacity-70"
                >
                  <FiX className="h-2.5 w-2.5" />
                </button>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Add row */}
      {!disabled && (
        <div className="flex gap-2">
          <Input
            id={inputId}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button type="button" variant="outline" size="sm" onClick={add} disabled={!draft.trim()}>
            <FiPlus className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
