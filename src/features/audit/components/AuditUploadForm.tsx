'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiUploadCloud, FiFile, FiX, FiCheckCircle } from 'react-icons/fi';
import { generateAuditSchema, GenerateAuditInput } from '../schemas/audit.schema';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

interface AuditUploadFormProps {
  onSubmit: (data: GenerateAuditInput) => void;
  isPending: boolean;
  progress?: number;
}

export function AuditUploadForm({ onSubmit, isPending, progress }: AuditUploadFormProps) {
  const [dragActive, setDragActive] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GenerateAuditInput>({
    resolver: zodResolver(generateAuditSchema),
    defaultValues: {
      title: '',
    },
  });

  const selectedFile = watch('file');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setValue('file', e.dataTransfer.files[0], { shouldValidate: true });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setValue('file', e.target.files[0], { shouldValidate: true });
    }
  };

  const removeFile = () => {
    setValue('file', undefined as any, { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title Input */}
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Audit Title
        </label>
        <input
          {...register('title')}
          id="title"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="e.g. Q3 Competitor Analysis - Acme Corp"
          disabled={isPending}
        />
        {errors.title && (
          <p className="text-[0.8rem] font-medium text-destructive">{errors.title.message}</p>
        )}
      </div>

      {/* File Upload Area */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Upload Document</label>
        
        {!selectedFile ? (
          <div
            className={cn(
              "relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 transition-colors",
              dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
              isPending && "pointer-events-none opacity-50"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <FiUploadCloud className="mb-4 h-10 w-10 text-muted-foreground" />
            <p className="mb-1 text-sm font-semibold">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground">PDF or CSV files up to 10MB</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.csv,application/pdf,text/csv,application/vnd.ms-excel"
              onChange={handleChange}
              className="hidden"
              disabled={isPending}
            />
          </div>
        ) : (
          <div className="relative flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <FiFile className="h-5 w-5" />
              </div>
              <div className="overflow-hidden">
                <p className="truncate text-sm font-medium">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            {!isPending && (
              <button
                type="button"
                onClick={removeFile}
                className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <FiX className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
        {errors.file && (
          <p className="text-[0.8rem] font-medium text-destructive">{errors.file.message as string}</p>
        )}
      </div>

      {/* Progress & Submit */}
      <div className="pt-4">
        {isPending ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-primary">
                {progress === 100 ? 'Analyzing document...' : 'Uploading file...'}
              </span>
              <span className="text-muted-foreground">{progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-xs text-muted-foreground">
              This may take a minute while our AI processes the document.
            </p>
          </div>
        ) : (
          <Button type="submit" className="w-full" disabled={isPending || !selectedFile}>
            Generate AI Audit
          </Button>
        )}
      </div>
    </form>
  );
}
