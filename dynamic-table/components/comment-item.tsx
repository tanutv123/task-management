"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { formatDistanceToNow } from "date-fns"
import { Edit, Trash2, Reply } from "lucide-react"
import type { Comment } from "@/types/comment"
import { CommentType, commentTypeInfo } from "@/types/comment"

interface CommentItemProps {
  comment: Comment
  isReply?: boolean
  isEditing?: boolean
  onEdit?: () => void
  onCancelEdit?: () => void
  onSaveEdit?: (content: string) => void
  onDelete?: () => void
  onReply?: () => void
}

export function CommentItem({
  comment,
  isReply = false,
  isEditing = false,
  onEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
  onReply,
}: CommentItemProps) {
  const [editContent, setEditContent] = useState(comment.content)
  const isCurrentUser = comment.userId === "current-user"

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Get comment type info
  const typeInfo = comment.commentType ? commentTypeInfo[comment.commentType] : commentTypeInfo[CommentType.GENERAL]

  return (
    <div className="flex gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={comment.userImage || "/placeholder.svg"} alt={comment.userName} />
        <AvatarFallback>{getInitials(comment.userName)}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex justify-between items-start mb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium">{comment.userName}</span>
              {comment.commentType && (
                <span className={`px-2 py-0.5 rounded text-xs ${typeInfo.color}`}>{typeInfo.label}</span>
              )}
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
              </span>
              {comment.updatedAt > comment.createdAt && <span className="text-xs text-gray-500">(edited)</span>}
            </div>

            {isCurrentUser && !isEditing && (
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onEdit}>
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500" onClick={onDelete}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-2">
              <Textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} className="min-h-[80px]" />
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={onCancelEdit}>
                  Cancel
                </Button>
                <Button size="sm" onClick={() => onSaveEdit?.(editContent)} disabled={!editContent.trim()}>
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className="whitespace-pre-wrap">{comment.content}</div>
          )}
        </div>

        {!isReply && !isEditing && onReply && (
          <Button variant="ghost" size="sm" className="mt-1 h-7 text-gray-500" onClick={onReply}>
            <Reply className="h-3 w-3 mr-1" />
            Reply
          </Button>
        )}
      </div>
    </div>
  )
}
