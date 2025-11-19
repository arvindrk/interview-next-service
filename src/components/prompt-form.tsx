'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { promptSchema, type PromptFormData } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { PROMPT_CONFIG } from '@/lib/constants'
import { useState } from 'react'

export function PromptForm({ initialValue = '' }: { initialValue?: string }) {
  const [isSaving, setIsSaving] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<PromptFormData>({
    resolver: zodResolver(promptSchema),
    defaultValues: { prompt: initialValue }
  })

  const promptValue = watch('prompt')
  const characterCount = promptValue?.length || 0

  const onSubmit = async (data: PromptFormData) => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/questionnaire-prompt-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Failed to save')

      toast.success('Prompt saved successfully!')
    } catch (error) {
      toast.error('Failed to save prompt')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="prompt">Interview Instructions</Label>
            <span className="text-sm text-muted-foreground">
              {characterCount} / {PROMPT_CONFIG.MAX_LENGTH}
            </span>
          </div>
          <Textarea
            id="prompt"
            rows={15}
            placeholder={PROMPT_CONFIG.PLACEHOLDER}
            {...register('prompt')}
            className="mt-2"
          />
          {errors.prompt && (
            <p className="text-sm text-red-500 mt-1">{errors.prompt.message}</p>
          )}
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving}>
            Save Prompt
          </Button>
        </div>
      </form>
    </Card>
  )
}

