export interface Comment {
  id: number
  projectTaskId: string
  userId: string
  userName: string
  userImage: string
  content: string
  createdAt: Date
  updatedAt: Date
  parentId?: number | null
  commentType?: CommentType
}

export interface CommentWithReplies extends Comment {
  replies: CommentWithReplies[]
}

// Add a new enum for comment types
export enum CommentType {
  GENERAL = "general",
  QUESTION = "question",
  ISSUE = "issue",
  SUGGESTION = "suggestion",
  FEEDBACK = "feedback",
}

// Add a helper for comment type display information
export const commentTypeInfo = {
  [CommentType.GENERAL]: {
    label: "General",
    color: "bg-gray-100 text-gray-800",
  },
  [CommentType.QUESTION]: {
    label: "Question",
    color: "bg-blue-100 text-blue-800",
  },
  [CommentType.ISSUE]: {
    label: "Issue",
    color: "bg-red-100 text-red-800",
  },
  [CommentType.SUGGESTION]: {
    label: "Suggestion",
    color: "bg-green-100 text-green-800",
  },
  [CommentType.FEEDBACK]: {
    label: "Feedback",
    color: "bg-purple-100 text-purple-800",
  },
}
