"use client"

import {useEffect, useState} from "react"
import {buildCommentTree} from "@/lib/utils";
import { type Comment, type CommentWithReplies} from "@/types/comment";
import {observer} from "mobx-react-lite";
import {CommentType} from "@/types/comment"
import {useStore} from "@/store/useStore";
import agent from "@/api/agent";
import CommentItem from "@/components/comment-section/comment-item";
import {CommentForm} from "@/components/comment-section/comment-form";


// // Define CommentType enum
// enum CommentType {
//   GENERAL = "general",
//   FEEDBACK = "feedback",
//   SUGGESTION = "suggestion",
// }
// Mock data for demonstration
// const flatComments: Comment[] = [
//   {
//     id: 1,
//     projectTaskId: 111,
//     userId: "user1",
//     userName: "Jane Cooper",
//     userImage: "",
//     content: "Started working on the wireframes.",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     commentType: CommentType.ISSUE,
//     parentId: null, // Explicitly add undefined for optional property
//   },
//   {
//     id: 2,
//     projectTaskId: 222,
//     userId: "user2",
//     userName: "Alex Morgan",
//     userImage: "",
//     content: "Make sure to include the new product categories.",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     commentType: CommentType.FEEDBACK,
//     parentId: null, // Explicitly add undefined
//   },
//   {
//     id: 3,
//     projectTaskId: 333,
//     userId: "user1",
//     userName: "Jane Cooper",
//     userImage: "",
//     content: "Got it, will include those!",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     commentType: CommentType.GENERAL,
//     parentId: 2, // Correctly assigned
//   }
// ];
//
// const MOCK_COMMENTS = buildCommentTree(flatComments)

function CommentSection({ projectTaskId }: { projectTaskId: number }) {
  const { projectTaskStore } = useStore();
  const { selectedProjectId } = projectTaskStore;
  const [comments, setComments] = useState<CommentWithReplies[]>([])
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)

  useEffect(() => {
    agent.Comments.list(selectedProjectId!).then((res ) => setComments(buildCommentTree(res)));
  }, [ selectedProjectId ]);

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);   // round up
    max = Math.floor(max);  // round down
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const handleAddComment = (content: string, commentType: CommentType) => {
    let newComment: Comment = {
      id: getRandomInt(1, 100),
      projectTaskId,
      userId: "current-user",
      userName: "You",
      userImage: "?height=40&width=40",
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      commentType
    }

    agent.Comments.post(projectTaskId, newComment).then((res: Comment) => newComment =  res);

    setComments([...comments, { ...newComment, replies: [] }])
  }

  const handleAddReply = (parentId: number, content: string, commentType: CommentType) => {
    let newReply: Comment = {
      id: getRandomInt(1, 100),
      projectTaskId,
      userId: "current-user",
      userName: "You",
      userImage: "?height=40&width=40",
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      parentId,
      commentType,
    }

    agent.Comments.post(projectTaskId, newReply).then((res: Comment) => newReply =  res);

    let newComments = comments.map((comment) => {
      return comment.id === parentId ? { ...comment, replies: [...comment.replies, newReply] } : comment
    });

    setComments(newComments);

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

  const handleDeleteComment = (id: number) => {
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
                    onSubmit={(content, commentType) => handleAddReply(comment.id, content, commentType)}
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
