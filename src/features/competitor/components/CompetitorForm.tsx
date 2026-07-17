'use client';

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { competitorSchema, CompetitorFormInput, MARKET_POSITIONS } from '../schemas/competitor.schema';
import { Competitor } from '../types/competitor.types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { TagInput } from './TagInput';

interface Props {
  initialData?: Competitor;
  onSubmit: (data: CompetitorFormInput) => void;
  isPending?: boolean;
  submitLabel?: string;
}

export function CompetitorForm({ initialData, onSubmit, isPending, submitLabel = 'Save' }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CompetitorFormInput>({
    resolver: zodResolver(competitorSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      website: initialData?.website ?? '',
      description: initialData?.description ?? '',
      industry: initialData?.industry ?? '',
      logoUrl: initialData?.logoUrl ?? '',
      strengths: initialData?.strengths ?? [],
      weaknesses: initialData?.weaknesses ?? [],
      marketPosition: initialData?.marketPosition ?? undefined,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Row 1: Name + Website */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="competitor-name" className="text-sm font-medium leading-none">
            Name <span className="text-destructive">*</span>
          </label>
          <Input
            id="competitor-name"
            placeholder="e.g. Acme Corp"
            {...register('name')}
            error={!!errors.name}
            disabled={isPending}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="competitor-website" className="text-sm font-medium leading-none">
            Website <span className="text-destructive">*</span>
          </label>
          <Input
            id="competitor-website"
            type="url"
            placeholder="https://acme.com"
            {...register('website')}
            error={!!errors.website}
            disabled={isPending}
          />
          {errors.website && (
            <p className="text-xs text-destructive">{errors.website.message}</p>
          )}
        </div>
      </div>

      {/* Row 2: Industry + Market Position */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="competitor-industry" className="text-sm font-medium leading-none">
            Industry
          </label>
          <Input
            id="competitor-industry"
            placeholder="e.g. SaaS, FinTech, Healthcare"
            {...register('industry')}
            disabled={isPending}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="competitor-market-position" className="text-sm font-medium leading-none">
            Market Position
          </label>
          <Select
            id="competitor-market-position"
            {...register('marketPosition')}
            error={!!errors.marketPosition}
            disabled={isPending}
          >
            <option value="">Select position…</option>
            {MARKET_POSITIONS.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </Select>
          {errors.marketPosition && (
            <p className="text-xs text-destructive">{errors.marketPosition.message}</p>
          )}
        </div>
      </div>

      {/* Logo URL */}
      <div className="space-y-1">
        <label htmlFor="competitor-logo" className="text-sm font-medium leading-none">
          Logo URL
        </label>
        <Input
          id="competitor-logo"
          type="url"
          placeholder="https://acme.com/logo.png"
          {...register('logoUrl')}
          error={!!errors.logoUrl}
          disabled={isPending}
        />
        {errors.logoUrl && (
          <p className="text-xs text-destructive">{errors.logoUrl.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label htmlFor="competitor-description" className="text-sm font-medium leading-none">
          Description
        </label>
        <Textarea
          id="competitor-description"
          placeholder="Brief overview of this competitor…"
          rows={4}
          {...register('description')}
          disabled={isPending}
        />
      </div>

      {/* Strengths */}
      <Controller
        name="strengths"
        control={control}
        render={({ field }) => (
          <TagInput
            id="competitor-strengths"
            label="Strengths"
            values={field.value ?? []}
            onChange={field.onChange}
            placeholder="Add a strength and press Enter"
            colorScheme="green"
            disabled={isPending}
          />
        )}
      />

      {/* Weaknesses */}
      <Controller
        name="weaknesses"
        control={control}
        render={({ field }) => (
          <TagInput
            id="competitor-weaknesses"
            label="Weaknesses"
            values={field.value ?? []}
            onChange={field.onChange}
            placeholder="Add a weakness and press Enter"
            colorScheme="red"
            disabled={isPending}
          />
        )}
      />

      {/* Submit */}
      <div className="flex justify-end gap-3 border-t pt-4">
        <Button type="submit" disabled={isPending} className="min-w-[120px]">
          {isPending ? `${submitLabel.replace('Save', 'Saving').replace('Add', 'Adding').replace('Update', 'Updating')}…` : submitLabel}
        </Button>
      </div>
    </form>
  );
}
