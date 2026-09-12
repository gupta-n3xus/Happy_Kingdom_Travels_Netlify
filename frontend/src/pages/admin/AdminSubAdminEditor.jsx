import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, Package, MapPin, FileText, MessageSquare, Star, Image, Database, Settings, Users, Check, ChevronsUpDown } from 'lucide-react'
import subAdminService from '../../services/subAdminService'
import { PERMISSIONS_CONFIG } from '../../constants'
import toast from 'react-hot-toast'

const FEATURE_ICONS = {
  packages: Package,
  destinations: MapPin,
  blog: FileText,
  enquiries: MessageSquare,
  reviews: Star,
  gallery: Image,
  backup: Database,
  settings: Settings,
  subadmins: Users,
}

const AdminSubAdminEditor = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [permissions, setPermissions] = useState({})
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEditing)

  useEffect(() => {
    if (isEditing) {
      fetchSubAdmin()
    }
  }, [id])

  const fetchSubAdmin = async () => {
    try {
      const data = await subAdminService.getById(id)
      const user = data.data
      setFormData({ name: user.name, email: user.email, password: '' })

      const permMap = {}
      PERMISSIONS_CONFIG.forEach((feature) => {
        feature.actions.forEach((action) => {
          const permKey = `${feature.key}:${action.key}`
          permMap[permKey] = user.permissions?.includes(permKey) || false
        })
      })
      setPermissions(permMap)
    } catch (error) {
      toast.error('Failed to load sub-admin details')
      navigate('/admin/sub-admins')
    } finally {
      setFetching(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePermissionToggle = (permKey) => {
    setPermissions((prev) => ({ ...prev, [permKey]: !prev[permKey] }))
  }

  const handleFeatureToggle = (feature) => {
    const allPerms = feature.actions.map((a) => `${feature.key}:${a.key}`)
    const allChecked = allPerms.every((p) => permissions[p])
    const updated = { ...permissions }
    allPerms.forEach((p) => { updated[p] = !allChecked })
    setPermissions(updated)
  }

  const handleToggleAll = () => {
    const allPerms = PERMISSIONS_CONFIG.flatMap((f) => f.actions.map((a) => `${f.key}:${a.key}`))
    const allChecked = allPerms.every((p) => permissions[p])
    const updated = {}
    allPerms.forEach((p) => { updated[p] = !allChecked })
    setPermissions(updated)
  }

  const getFeatureCheckedCount = (feature) => {
    return feature.actions.filter((a) => permissions[`${feature.key}:${a.key}`]).length
  }

  const isFeatureFullyChecked = (feature) => {
    return feature.actions.every((a) => permissions[`${feature.key}:${a.key}`])
  }

  const isFeaturePartiallyChecked = (feature) => {
    const count = getFeatureCheckedCount(feature)
    return count > 0 && count < feature.actions.length
  }

  const allPermissions = PERMISSIONS_CONFIG.flatMap((f) => f.actions.map((a) => `${f.key}:${a.key}`))
  const allChecked = allPermissions.every((p) => permissions[p])
  const someChecked = allPermissions.some((p) => permissions[p])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email) {
      toast.error('Name and email are required')
      return
    }

    if (!isEditing && !formData.password) {
      toast.error('Password is required for new sub-admin')
      return
    }

    const grantedPermissions = Object.entries(permissions)
      .filter(([_, checked]) => checked)
      .map(([key]) => key)

    const payload = {
      name: formData.name,
      email: formData.email,
      permissions: grantedPermissions,
    }

    if (isEditing && formData.password) {
      payload.password = formData.password
    } else if (!isEditing) {
      payload.password = formData.password
    }

    setLoading(true)
    try {
      if (isEditing) {
        await subAdminService.update(id, payload)
        toast.success('Sub-admin updated successfully')
      } else {
        await subAdminService.create(payload)
        toast.success('Sub-admin created successfully')
      }
      navigate('/admin/sub-admins')
    } catch (error) {
      toast.error(error.message || 'Failed to save sub-admin')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <div className="bg-white rounded-xl p-6 space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/admin/sub-admins')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-3"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-charcoal">
            {isEditing ? 'Edit Sub Admin' : 'Create Sub Admin'}
          </h1>
          <p className="text-muted text-sm mt-1">
            {isEditing ? 'Update account details and permissions' : 'Set up a new sub-admin account with specific permissions'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-charcoal mb-4">Account Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Password {isEditing && <span className="text-muted font-normal">(leave blank to keep current)</span>}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required={!isEditing}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder={isEditing ? '••••••••' : 'Enter password'}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-charcoal mb-2">Permissions Summary</h2>
              <p className="text-sm text-muted mb-4">
                {allPermissions.filter((p) => permissions[p]).length} of {allPermissions.length} permissions granted
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${(allPermissions.filter((p) => permissions[p]).length / allPermissions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-charcoal">Feature Permissions</h2>
                <button
                  type="button"
                  onClick={handleToggleAll}
                  className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    allChecked
                      ? 'bg-primary text-white'
                      : someChecked
                      ? 'bg-primary/20 text-primary'
                      : 'bg-gray-100 text-muted hover:bg-gray-200'
                  }`}
                >
                  <ChevronsUpDown className="w-4 h-4 mr-1.5" />
                  {allChecked ? 'Deselect All' : someChecked ? 'Select All' : 'Select All'}
                </button>
              </div>

              <div className="space-y-4">
                {PERMISSIONS_CONFIG.map((feature) => {
                  const Icon = FEATURE_ICONS[feature.key] || Package
                  const featureChecked = isFeatureFullyChecked(feature)
                  const featurePartial = isFeaturePartiallyChecked(feature)
                  const checkedCount = getFeatureCheckedCount(feature)

                  return (
                    <div key={feature.key} className="border rounded-xl p-4 hover:border-primary/30 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center mr-3 ${
                            featureChecked ? 'bg-primary text-white' : featurePartial ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-muted'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-charcoal">{feature.label}</h3>
                            <p className="text-xs text-muted">
                              {checkedCount} of {feature.actions.length} actions
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleFeatureToggle(feature)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            featureChecked ? 'bg-primary' : featurePartial ? 'bg-primary/40' : 'bg-gray-300'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            featureChecked || featurePartial ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 ml-12">
                        {feature.actions.map((action) => {
                          const permKey = `${feature.key}:${action.key}`
                          const isChecked = permissions[permKey]
                          return (
                            <label
                              key={permKey}
                              className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                                isChecked ? 'bg-primary/5 border border-primary/20' : 'bg-gray-50 border border-transparent hover:bg-gray-100'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded flex items-center justify-center mr-2 flex-shrink-0 ${
                                isChecked ? 'bg-primary' : 'border-2 border-gray-300'
                              }`}>
                                {isChecked && <Check className="w-3 h-3 text-white" />}
                              </div>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handlePermissionToggle(permKey)}
                                className="sr-only"
                              />
                              <span className={`text-sm ${isChecked ? 'text-primary font-medium' : 'text-charcoal'}`}>
                                {action.label}
                              </span>
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => navigate('/admin/sub-admins')}
            className="px-4 py-2 text-muted hover:text-charcoal border rounded-lg transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : isEditing ? 'Update Sub Admin' : 'Create Sub Admin'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminSubAdminEditor
