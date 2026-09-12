import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, X } from 'lucide-react'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const AdminDestinations = () => {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const { user } = useAuth()

  const canEdit = user?.role === 'admin' || user?.permissions?.includes('destinations:edit')
  const canDelete = user?.role === 'admin' || user?.permissions?.includes('destinations:delete')
  const canCreate = user?.role === 'admin' || user?.permissions?.includes('destinations:create')
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    description: '',
    image: '',
    howToReach: '',
    bestTime: '',
    thingsToDo: '',
    seo: { title: '', description: '' },
    published: true,
  })

  useEffect(() => {
    fetchDestinations()
  }, [])

  const fetchDestinations = async () => {
    try {
      const data = await api.get('/destinations')
      setDestinations(data.data || [])
    } catch (error) {
      console.error('Failed to fetch destinations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await api.put(`/destinations/${editingId}`, formData)
        toast.success('Destination updated')
      } else {
        await api.post('/destinations', formData)
        toast.success('Destination created')
      }
      setShowModal(false)
      setEditingId(null)
      resetForm()
      fetchDestinations()
    } catch (error) {
      toast.error(error.message || 'Failed to save destination')
    }
  }

  const handleEdit = (dest) => {
    setFormData({
      name: dest.name || '',
      shortDescription: dest.shortDescription || '',
      description: dest.description || '',
      image: dest.image || '',
      howToReach: dest.howToReach || '',
      bestTime: dest.bestTime || '',
      thingsToDo: dest.thingsToDo || '',
      seo: dest.seo || { title: '', description: '' },
      published: dest.published !== false,
    })
    setEditingId(dest._id)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this destination?')) return
    try {
      await api.delete(`/destinations/${id}`)
      toast.success('Destination deleted')
      fetchDestinations()
    } catch (error) {
      toast.error('Failed to delete destination')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      shortDescription: '',
      description: '',
      image: '',
      howToReach: '',
      bestTime: '',
      thingsToDo: '',
      seo: { title: '', description: '' },
      published: true,
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-charcoal">Destinations</h1>
        {canCreate && (
          <button
            onClick={() => { setEditingId(null); resetForm(); setShowModal(true); }}
            className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-light transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Destination
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Best Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </td>
                </tr>
              ) : destinations.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-muted">
                    No destinations found
                  </td>
                </tr>
              ) : (
                destinations.map((dest) => (
                  <tr key={dest._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img src={dest.image || 'https://via.placeholder.com/40'} alt={dest.name} className="w-10 h-10 rounded-lg object-cover mr-3" />
                        <span className="font-medium text-charcoal">{dest.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted">{dest.slug}</td>
                    <td className="px-6 py-4 text-muted">{dest.bestTime || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${dest.published !== false ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {dest.published !== false ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {canEdit && (
                          <button onClick={() => handleEdit(dest)} className="p-2 text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        {canDelete && (
                          <button onClick={() => handleDelete(dest._id)} className="p-2 text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white">
              <div className="flex justify-between items-center">
                <h2 className="font-display text-xl font-bold text-charcoal">{editingId ? 'Edit Destination' : 'New Destination'}</h2>
                <button onClick={() => setShowModal(false)} className="text-muted hover:text-charcoal"><X className="w-5 h-5" /></button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Name</label>
                <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Short Description</label>
                <textarea rows="2" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Full Description</label>
                <textarea rows="4" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Image URL</label>
                <input type="url" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">How to Reach</label>
                <textarea rows="2" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.howToReach} onChange={(e) => setFormData({ ...formData, howToReach: e.target.value })}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Best Time to Visit</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.bestTime} onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Things to Do</label>
                <textarea rows="2" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.thingsToDo} onChange={(e) => setFormData({ ...formData, thingsToDo: e.target.value })}></textarea>
              </div>
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} />
                <span className="ml-2 text-sm text-charcoal">Published</span>
              </label>
              <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-light transition-colors">
                {editingId ? 'Update Destination' : 'Create Destination'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDestinations
