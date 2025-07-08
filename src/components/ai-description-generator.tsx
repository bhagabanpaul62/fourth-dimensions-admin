'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles } from 'lucide-react';
import { suggestCategoryDescription } from '@/ai/flows/suggest-category-description';
import { useToast } from '@/hooks/use-toast';

interface AiDescriptionGeneratorProps {
  onGenerate: (description: string) => void;
  disabled?: boolean;
}

export function AiDescriptionGenerator({ onGenerate, disabled }: AiDescriptionGeneratorProps) {
  const [open, setOpen] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!keywords.trim()) {
        toast({
            title: 'Error',
            description: 'Please enter some keywords.',
            variant: 'destructive',
        });
        return;
    }
    
    startTransition(async () => {
      const result = await suggestCategoryDescription({ keywords });
      if (result.description) {
        onGenerate(result.description);
        toast({
          title: 'Success',
          description: 'Description suggestion generated successfully.',
        });
        setOpen(false);
      } else {
        toast({
            title: 'Error',
            description: 'Failed to generate suggestion.',
            variant: 'destructive',
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm" disabled={disabled}>
          <Sparkles className="mr-2 h-4 w-4" />
          Suggest with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Suggest Description with AI</DialogTitle>
          <DialogDescription>
            Enter some keywords to guide the AI in suggesting a compelling category description.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="keywords">Keywords</Label>
            <Textarea
              id="keywords"
              placeholder="e.g., modern, minimalist, kitchen, wood finish"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleGenerate} disabled={isPending}>
            {isPending ? 'Suggesting...' : 'Suggest'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
