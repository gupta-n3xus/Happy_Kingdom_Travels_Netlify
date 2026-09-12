import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, Plus, Edit2, Trash2, Search, Shield, Clock, Activity } from 'lucide-react'
import subAdminService from '../../services/subAdminService'
import { formatDate } from '../../utils/helpers'
import toast from 'react-hot-toast'

const AdminSubAdmins = () => {
  const [subAdmins, setSubAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchSubAdmins()
  }, [])

  const fetchSubAdmins = async () => {
    try {
      const data = await subAdminService.getAll()
      setSubAdmins(data.data || [])
    } catch (error) {
      console.error('Failed to fetch sub-admins:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete sub-admin "${name}"?`)) return
    try {
      await subAdminService.delete(id)
      toast.success('Sub-admin deleted successfully')
      fetchSubAdmins()
    } catch (error) {
      toast.error(error.message || 'Failed to delete sub-admin')
    }
  }

  const filteredSubAdmins = subAdmins.filter((sa) => {
    const query = search.toLowerCase()
    return sa.name?.toLowerCase().includes(query) || sa.email?.toLowerCase().includes(query)
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Sub Admins</h1>
          <p className="text-muted text-sm mt-1">Manage sub-admin accounts and their permissions</p>
        </div>
        <Link
          to="/admin/sub-admins/new"
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Sub Admin
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Permissions</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Last Login</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Created</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="border-b animate-pulse">
                    <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                    <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-48"></div></td>
                    <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
                    <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
                    <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-20 ml-auto"></div></td>
                  </tr>
                ))
              ) : filteredSubAdmins.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-12 text-center">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-muted">
                      {search ? 'No sub-admins match your search' : 'No sub-admins found. Create your first sub-admin!'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredSubAdmins.map((sa) => (
                  <tr key={sa._id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                          <span className="text-primary font-semibold text-sm">{sa.name?.charAt(0)?.toUpperCase()}</span>
                        </div>
                        <span className="font-medium text-charcoal">{sa.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted">{sa.email}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        <Shield className="w-3 h-3 mr-1" />
                        {sa.permissions?.length || 0} permissions
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted">
                      {sa.lastLogin ? (
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatDate(sa.lastLogin)}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">Never</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm text-muted">{formatDate(sa.createdAt)}</td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Link
                          to={`/admin/sub-admins/${sa._id}/activity`}
                          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Activity"
                        >
                          <Activity className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/sub-admins/${sa._id}/edit`}
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(sa._id, sa.name)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
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

export default AdminSubAdmins
