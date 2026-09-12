import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2, Search, Eye } from 'lucide-react'
import packageService from '../../services/packageService'
import { formatPrice } from '../../utils/helpers'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const AdminPackages = () => {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const { user } = useAuth()

  const canEdit = user?.role === 'admin' || user?.permissions?.includes('packages:edit')
  const canDelete = user?.role === 'admin' || user?.permissions?.includes('packages:delete')
  const canCreate = user?.role === 'admin' || user?.permissions?.includes('packages:create')

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const data = await packageService.getAllPackages()
      setPackages(data.data || [])
    } catch (error) {
      console.error('Failed to fetch packages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return
    try {
      await packageService.deletePackage(id)
      toast.success('Package deleted successfully')
      fetchPackages()
    } catch (error) {
      toast.error('Failed to delete package')
    }
  }

  const filteredPackages = packages.filter(pkg =>
    pkg.title?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-charcoal">Packages</h1>
        {canCreate && (
          <Link
            to="/admin/packages/new"
            className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-light transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Package
          </Link>
        )}
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            placeholder="Search packages..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Package</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
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
              ) : filteredPackages.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-muted">
                    No packages found
                  </td>
                </tr>
              ) : (
                filteredPackages.map((pkg) => (
                  <tr key={pkg._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={({'/images/bhutan-5n6d.jpg':'/images/pkg-highlights.jpg','/images/bhutan-6n7d.jpg':'/images/pkg-classic.jpg','/images/bhutan-7n8d.jpg':'/images/pkg-grand-explorer.jpg','/images/bhutan-honeymoon.jpg':'/images/pkg-royal.jpg','/images/bhutan-family.jpg':'/images/pkg-family-escape.jpg','/images/bhutan-group.jpg':'/images/pkg-classic.jpg'})[pkg.heroImage] || pkg.heroImage || 'https://via.placeholder.com/40'}
                          alt={pkg.title}
                          className="w-10 h-10 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <p className="font-medium text-charcoal">{pkg.title}</p>
                          <p className="text-sm text-muted">{pkg.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted">
                      {pkg.duration?.nights}N/{pkg.duration?.days}D
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-charcoal">
                      {pkg.pricing?.showPrice ? formatPrice(pkg.pricing?.startingFrom || pkg.startingPrice) : <span className="text-gray-400 italic">Contact</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary capitalize">
                        {pkg.category || pkg.packageType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${pkg.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {pkg.status === 'active' ? 'Published' : pkg.status || 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/packages/${pkg.slug}`}
                          target="_blank"
                          className="p-2 text-muted hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        {canEdit && (
                          <Link
                            to={`/admin/packages/${pkg._id}/edit`}
                            className="p-2 text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                        )}
                        {canDelete && (
                          <button
                            onClick={() => handleDelete(pkg._id)}
                            className="p-2 text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
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
    </div>
  )
}

export default AdminPackages
