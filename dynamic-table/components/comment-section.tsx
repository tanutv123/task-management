"use client"

import { useState } from "react"
import { CommentItem } from "./comment-item"
import { CommentForm } from "./comment-form"
import {buildCommentTree} from "@/lib/utils";
import { type Comment, type CommentWithReplies} from "@/types/comment";
import {observer} from "mobx-react-lite";

// Define CommentType enum
enum CommentType {
  GENERAL = "general",
  FEEDBACK = "feedback",
  SUGGESTION = "suggestion",
}
// Mock data for demonstration
//@ts-ignore
const flatComments: Comment[] = [
  {
    id: 1,
    projectTaskId: "task-123",
    userId: "user1",
    userName: "Jane Cooper",
    userImage: "/placeholder.svg",
    content: "Started working on the wireframes.",
    createdAt: new Date(),
    updatedAt: new Date(),
    commentType: CommentType.GENERAL,
    parentId: null, // Explicitly add undefined for optional property
  },
  {
    id: 2,
    projectTaskId: "task-123",
    userId: "user2",
    userName: "Alex Morgan",
    userImage: "/placeholder.svg",
    content: "Make sure to include the new product categories.",
    createdAt: new Date(),
    updatedAt: new Date(),
    commentType: CommentType.FEEDBACK,
    parentId: null, // Explicitly add undefined
  },
  {
    id: 3,
    projectTaskId: "task-123",
    userId: "user1",
    userName: "Jane Cooper",
    userImage: "/placeholder.svg",
    content: "Got it, will include those!",
    createdAt: new Date(),
    updatedAt: new Date(),
    commentType: CommentType.GENERAL,
    parentId: 2, // Correctly assigned
  }
];

const MOCK_COMMENTS = buildCommentTree(flatComments)

function CommentSection({ taskId }: { taskId: string }) {
  const [comments, setComments] = useState<CommentWithReplies[]>(MOCK_COMMENTS)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)



  const handleAddComment = (content: string, commentType: CommentType) => {
    const newComment: Comment = {
      id: `new-${Date.now()}`,
      taskId,
      userId: "current-user",
      userName: "You",
      userImage: "/placeholder.svg?height=40&width=40",
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      commentType
    }

    setComments([...comments, { ...newComment, replies: [] }])
  }

  const handleAddReply = (parentId: number, content: string, commentType: CommentType) => {
    const newReply: Comment = {
      id: `new-reply-${Date.now()}`,
      taskId,
      userId: "current-user",
      userName: "You",
      userImage: "/placeholder.svg?height=40&width=40",
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      parentId,
      commentType,
    }

    setComments(
      comments.map((comment) =>
        comment.id === parentId ? { ...comment, replies: [...comment.replies, newReply] } : comment,
      ),
    )

    setReplyingTo(null)
  }

  const handleEditComment = (id: number, content: string) => {
    setComments(
      comments.map((comment) => {
        // Check if this is the comment to edit
        if (comment.id === id) {
          return { ...comment, content, updatedAt: new Date() }
        }

        // Check if the comment to edit is in replies
        const updatedReplies = comment.replies.map((reply) =>
          reply.id === id ? { ...reply, content, updatedAt: new Date() } : reply,
        )

        return { ...comment, replies: updatedReplies }
      }),
    )

    setEditingCommentId(null)
  }

  const handleDeleteComment = (id: string) => {
    // First check if it's a top-level comment
    if (comments.some((comment) => comment.id === id)) {
      setComments(comments.filter((comment) => comment.id !== id))
      return
    }

    // Otherwise, it must be a reply
    setComments(
      comments.map((comment) => ({
        ...comment,
        replies: comment.replies.filter((reply) => reply.id !== id),
      })),
    )
  }

  return (
    <div className="border rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Comments</h2>
      </div>

      <div className="divide-y">
        {comments.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No comments yet. Be the first to comment!</div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-4">
              <CommentItem
                comment={comment}
                isEditing={editingCommentId === comment.id}
                onEdit={() => setEditingCommentId(comment.id)}
                onCancelEdit={() => setEditingCommentId(null)}
                onSaveEdit={(content) => handleEditComment(comment.id, content)}
                onDelete={() => handleDeleteComment(comment.id)}
                onReply={() => setReplyingTo(comment.id)}
              />

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="ml-12 mt-3 space-y-3">
                  {comment.replies.map((reply) => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      isReply
                      isEditing={editingCommentId === reply.id}
                      onEdit={() => setEditingCommentId(reply.id)}
                      onCancelEdit={() => setEditingCommentId(null)}
                      onSaveEdit={(content) => handleEditComment(reply.id, content)}
                      onDelete={() => handleDeleteComment(reply.id)}
                    />
                  ))}
                </div>
              )}

              {/* Reply form */}
              {replyingTo === comment.id && (
                <div className="ml-12 mt-3">
                  <CommentForm
                    onSubmit={(content) => handleAddReply(comment.id, content)}
                    onCancel={() => setReplyingTo(null)}
                    placeholder="Write a reply..."
                    submitLabel="Reply"
                    showCancel
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t">
        <CommentForm onSubmit={handleAddComment} placeholder="Write a comment..." submitLabel="Post" />
      </div>
    </div>
  )
}

export default observer(CommentSection);
