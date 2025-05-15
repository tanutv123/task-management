"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Paperclip, AtSign, Send } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CommentType, commentTypeInfo } from "@/types/comment"

interface CommentFormProps {
  onSubmit: (content: string, commentType: CommentType) => void
  onCancel?: () => void
  placeholder?: string
  submitLabel?: string
  showCancel?: boolean
}

export function CommentForm({
  onSubmit,
  onCancel,
  placeholder = "Write a comment...",
  submitLabel = "Post",
  showCancel = false,
}: CommentFormProps) {
  const [content, setContent] = useState("")
  const [commentType, setCommentType] = useState<CommentType>(CommentType.GENERAL)
  const [isAttaching, setIsAttaching] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      onSubmit(content, commentType)
      setContent("")
      setIsAttaching(false)
    }
  }

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-3 items-start">
        <Select value={commentType} onValueChange={(value) => setCommentType(value as CommentType)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Comment type" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(commentTypeInfo).map(([type, info]) => (
              <SelectItem key={type} value={type}>
                <span className={`px-2 py-0.5 rounded text-xs ${info.color}`}>{info.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative flex-1">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            className="min-h-[80px] pr-12"
          />
          <div className="absolute right-3 bottom-3 flex gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500"
              onClick={handleFileClick}
            >
              <Paperclip className="h-4 w-4" />
              <span className="sr-only">Attach file</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500"
              onClick={() => setContent((prev) => prev + "@")}
            >
              <AtSign className="h-4 w-4" />
              <span className="sr-only">Mention</span>
            </Button>
          </div>
        </div>
      </div>

      {isAttaching && (
        <div className="text-sm text-gray-500">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => {
              // Handle file attachment logic here
              console.log(e.target.files)
            }}
          />
          <div className="p-2 border rounded bg-gray-50">
            Drag and drop files here, or click the paperclip icon to browse
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2">
        {showCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={!content.trim()} className="gap-1">
          {submitLabel}
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
