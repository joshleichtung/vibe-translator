import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface VibeInputFormProps {
  onSubmit: (vibe: string) => void;
  isLoading?: boolean;
}

export function VibeInputForm({ onSubmit, isLoading = false }: VibeInputFormProps) {
  const [vibe, setVibe] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedVibe = vibe.trim();

    if (!trimmedVibe) {
      setError('Please describe a vibe or emotion');
      return;
    }

    setError('');
    onSubmit(trimmedVibe);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVibe(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-4">
      <div className="space-y-2">
        <Input
          type="text"
          value={vibe}
          onChange={handleInputChange}
          placeholder="rainy Sunday after a breakup"
          disabled={isLoading}
          aria-invalid={!!error}
          aria-describedby={error ? 'vibe-error' : undefined}
          className="bg-horror-mint border-horror-sage text-horror-charcoal placeholder:text-horror-shadow/60 focus-visible:border-horror-coral focus-visible:ring-horror-coral/30 disabled:bg-horror-slate disabled:cursor-not-allowed text-base h-11 px-4"
        />
        {error && (
          <p
            id="vibe-error"
            className="text-horror-coral text-sm font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-horror-peach text-horror-charcoal hover:bg-horror-coral border-2 border-horror-rust shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:hover:bg-horror-peach disabled:cursor-not-allowed font-semibold h-11"
      >
        {isLoading ? 'Generating...' : 'Generate Music'}
      </Button>
    </form>
  );
}
