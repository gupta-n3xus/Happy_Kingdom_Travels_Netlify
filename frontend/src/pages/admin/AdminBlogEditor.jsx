import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Save, ArrowLeft, X } from 'lucide-react'
import blogService from '../../services/blogService'
import api from '../../services/api'
import toast from 'react-hot-toast'

const AdminBlogEditor = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    author: '',
    category: '',
    tags: [],
    published: false,
  })
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    if (id) fetchPost()
  }, [id])

  const fetchPost = async () => {
    setLoading(true)
    try {
      const data = await api.get(`/blog/${id}`)
      const post = data.data
      setFormData({
        title: post.title || '',
        slug: post.slug || '',
        metaTitle: post.metaTitle || '',
        metaDescription: post.metaDescription || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        featuredImage: post.featuredImage || '',
        author: post.author || '',
        category: post.category || '',
        tags: post.tags || [],
        published: post.published || false,
      })
    } catch (error) {
      toast.error('Failed to fetch post')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (id) {
        await blogService.updatePost(id, formData)
        toast.success('Post updated')
      } else {
        await blogService.createPost(formData)
        toast.success('Post created')
      }
      navigate('/admin/blog')
    } catch (error) {
      toast.error(error.message || 'Failed to save post')
    } finally {
      setSaving(false)
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] })
      setTagInput('')
    }
  }

  const removeTag = (tag) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button onClick={() => navigate('/admin/blog')} className="mr-4 text-muted hover:text-charcoal">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-charcoal">{id ? 'Edit Post' : 'New Post'}</h1>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-light transition-colors flex items-center disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Post'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-charcoal mb-4">Content</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Title</label>
                <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Excerpt</label>
                <textarea rows="2" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Content</label>
                <textarea rows="15" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary font-mono text-sm" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })}></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-charcoal mb-4">Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Author</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Category</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Featured Image URL</label>
                <input type="url" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.featuredImage} onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })} />
              </div>
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} />
                <span className="ml-2 text-sm text-charcoal">Published</span>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-charcoal mb-4">SEO</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Meta Title</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.metaTitle} onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Meta Description</label>
                <textarea rows="2" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.metaDescription} onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-charcoal mb-4">Tags</h2>
            <div className="flex gap-2 mb-3">
              <input type="text" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary text-sm" placeholder="Add tag" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} />
              <button type="button" onClick={addTag} className="bg-primary text-white px-3 py-2 rounded-lg text-sm hover:bg-primary-light">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="ml-2 hover:text-red-500"><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AdminBlogEditor
