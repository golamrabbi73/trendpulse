'use client';

import * as React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending?: boolean;
  competitorName?: string;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isPending,
  competitorName,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Competitor"
      description={
        competitorName
          ? `Are you sure you want to delete "${competitorName}"? This action cannot be undone.`
          : 'Are you sure you want to delete this competitor? This action cannot be undone.'
      }
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isPending}>
            {isPending ? 'Deleting…' : 'Delete'}
          </Button>
        </>
      }
    >
      <p className="text-sm text-muted-foreground">
        All data associated with this competitor will be permanently removed from the platform.
      </p>
    </Modal>
  );
}
