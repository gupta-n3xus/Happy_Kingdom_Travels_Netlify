import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2 } from 'lucide-react'
import blogService from '../../services/blogService'
import { formatDate } from '../../utils/helpers'
import toast from 'react-hot-toast'

const AdminBlogPosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const data = await blogService.getAllPosts()
      setPosts(data.data || [])
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return
    try {
      await blogService.deletePost(id)
      toast.success('Post deleted')
      fetchPosts()
    } catch (error) {
      toast.error('Failed to delete post')
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-charcoal">Blog Posts</h1>
        <Link
          to="/admin/blog/new"
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-light transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Post
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-muted">
                    No blog posts found
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={post.featuredImage || 'https://via.placeholder.com/40'}
                          alt={post.title}
                          className="w-10 h-10 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <p className="font-medium text-charcoal">{post.title}</p>
                          <p className="text-sm text-muted truncate max-w-xs">{post.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                        {post.category || 'General'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted">{post.author || 'Admin'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted text-sm">{formatDate(post.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/admin/blog/${post._id}/edit`}
                          className="p-2 text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="p-2 text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminBlogPosts
