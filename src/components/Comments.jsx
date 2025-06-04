import React, { useState, useEffect } from 'react'
import { getCommentsById } from '../services/api'
import { formatDistanceToNow } from 'date-fns'
import { BiLike, BiDislike } from 'react-icons/bi'
import { FiMoreVertical } from 'react-icons/fi'

function Comments({ id }) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommentsById(id)
        setComments(data.data || [])
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchComments()
    }
  }, [id]);

  return (
    <div className="mt-2">
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-red-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex-shrink-0 flex items-center justify-center text-white font-bold">
                  {comment.username?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <h4 className="font-medium text-sm">{comment.username}</h4>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(comment?.date), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  
                  <p className="mt-1 text-sm">{comment.comment}</p>
                  
                  <div className="flex items-center mt-2 gap-2">
                    <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                      <BiLike className="text-base" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <BiDislike className="text-base" />
                    </button>
                    <button className="text-xs text-gray-600 hover:text-gray-900 ml-4">Reply</button>
                    <button className="ml-auto text-gray-600 hover:text-gray-900">
                      <FiMoreVertical />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">No comments yet. Be the first to comment!</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Comments