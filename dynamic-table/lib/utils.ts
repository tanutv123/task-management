import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {Comment, CommentWithReplies} from "@/types/comment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buildCommentTree(comments: Comment[]): CommentWithReplies[] {
  const commentMap = new Map<number, CommentWithReplies>()

  // Initialize the map with empty replies
  comments.forEach((comment: Comment) => {
    commentMap.set(comment.id, { ...comment, replies: [] })
  })

  const roots: CommentWithReplies[] = []

  comments.forEach(comment => {
    const current = commentMap.get(comment.id)!
    if (comment.parentId) {
      const parent = commentMap.get(comment.parentId)
      if (parent) {
        parent.replies.push(current)
      }
    } else {
      roots.push(current)
    }
  })

  return roots
}

