import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Monitor, Smartphone, Tablet, Globe, Shield, UserPlus, Edit2, Trash2, LogIn, LogOut, Key, CheckCircle, Activity, ChevronDown, ChevronRight, Clock, Wifi, WifiOff } from 'lucide-react'
import activityService from '../../services/activityService'
import subAdminService from '../../services/subAdminService'
import { formatDateTime } from '../../utils/helpers'

const ACTION_CONFIG = {
  login: { icon: LogIn, color: 'text-green-600', bg: 'bg-green-50', label: 'Login' },
  logout: { icon: LogOut, color: 'text-gray-600', bg: 'bg-gray-50', label: 'Logout' },
  password_change: { icon: Key, color: 'text-orange-600', bg: 'bg-orange-50', label: 'Password Change' },
  profile_update: { icon: Edit2, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Profile Update' },
  create: { icon: UserPlus, color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Created' },
  update: { icon: Edit2, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Updated' },
  delete: { icon: Trash2, color: 'text-red-600', bg: 'bg-red-50', label: 'Deleted' },
  approve: { icon: CheckCircle, color: 'text-purple-600', bg: 'bg-purple-50', label: 'Approved' },
  export: { icon: Activity, color: 'text-cyan-600', bg: 'bg-cyan-50', label: 'Exported' },
  import: { icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50', label: 'Imported' },
}

const getDeviceIcon = (device) => {
  if (device === 'Mobile') return Smartphone
  if (device === 'Tablet') return Tablet
  return Monitor
}

const SessionCard = ({ session }) => {
  const [expanded, setExpanded] = useState(false)
  const isActive = !session.logoutTime
  const duration = session.logoutTime
    ? Math.round((new Date(session.logoutTime) - new Date(session.loginTime)) / 60000)
    : Math.round((Date.now() - new Date(session.loginTime)) / 60000)
  const DeviceIcon = getDeviceIcon(session.device)
  const actionCounts = {}
  session.activities.forEach(a => {
    actionCounts[a.action] = (actionCounts[a.action] || 0) + 1
  })

  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${isActive ? 'border-green-200 bg-green-50/30' : 'border-gray-200 bg-white'}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-green-100' : 'bg-gray-100'}`}>
          {isActive ? <Wifi className="w-4 h-4 text-green-600" /> : <WifiOff className="w-4 h-4 text-gray-400" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-charcoal text-sm">
              {new Date(session.loginTime).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
            <span className="text-muted text-sm">
              {new Date(session.loginTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
            </span>
            {session.logoutTime && (
              <>
                <span className="text-muted text-xs">to</span>
                <span className="text-muted text-sm">
                  {new Date(session.logoutTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
                </span>
              </>
            )}
            {isActive && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Active
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              <DeviceIcon className="w-3 h-3" />
              {session.device}
            </span>
            <span>{session.browser}</span>
            <span>{session.os}</span>
            <span className="font-mono">{session.ip}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {duration < 1 ? '<1m' : duration < 60 ? `${duration}m` : `${Math.floor(duration / 60)}h ${duration % 60}m`}
            </span>
            <span>{session.activityCount} action{session.activityCount !== 1 ? 's' : ''}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {Object.entries(actionCounts).map(([action, count]) => {
            const config = ACTION_CONFIG[action]
            if (!config) return null
            const Icon = config.icon
            return (
              <span key={action} className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs ${config.bg} ${config.color}`} title={`${config.label}: ${count}`}>
                <Icon className="w-3 h-3" />
                {count > 1 && <span className="ml-0.5">{count}</span>}
              </span>
            )
          })}
        </div>
        {expanded ? <ChevronDown className="w-4 h-4 text-muted" /> : <ChevronRight className="w-4 h-4 text-muted" />}
      </button>

      {expanded && (
        <div className="border-t bg-gray-50/50">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="text-left px-4 py-2 text-xs font-semibold text-muted uppercase">Action</th>
                <th className="text-left px-4 py-2 text-xs font-semibold text-muted uppercase">Details</th>
                <th className="text-left px-4 py-2 text-xs font-semibold text-muted uppercase">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {session.activities.map((activity) => {
                const config = ACTION_CONFIG[activity.action] || ACTION_CONFIG.update
                const Icon = config.icon
                return (
                  <tr key={activity._id} className="border-b last:border-b-0 hover:bg-white transition-colors">
                    <td className="px-4 py-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                        <Icon className="w-3 h-3 mr-1" />
                        {config.label}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <p className="text-sm text-charcoal">{activity.details || '—'}</p>
                      {activity.entity && (
                        <p className="text-xs text-muted capitalize">{activity.entity.replace(/_/g, ' ')}</p>
                      )}
                    </td>
                    <td className="px-4 py-2 text-sm text-muted whitespace-nowrap">
                      {formatDateTime(activity.createdAt)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const AdminActivityLog = () => {
  const { id } = useParams()
  const [sessions, setSessions] = useState([])
  const [logs, setLogs] = useState([])
  const [viewMode, setViewMode] = useState('sessions')
  const [loading, setLoading] = useState(true)
  const [subAdmin, setSubAdmin] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (id) fetchSubAdmin()
    fetchData()
  }, [id, page, viewMode])

  const fetchSubAdmin = async () => {
    try {
      const data = await subAdminService.getById(id)
      setSubAdmin(data.data)
    } catch (error) {
      console.error('Failed to fetch sub-admin:', error)
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      if (viewMode === 'sessions') {
        const params = { page, limit: 20 }
        if (id) params.userId = id
        const response = await activityService.getSessions(params)
        setSessions(response.data || [])
        setTotalPages(response.totalPages || 1)
        setTotal(response.total || 0)
      } else {
        const response = id
          ? await activityService.getBySubAdmin(id, { page, limit: 20 })
          : await activityService.getAll({ page, limit: 20 })
        setLogs(response.data || [])
        setTotalPages(response.totalPages || 1)
        setTotal(response.total || 0)
      }
    } catch (error) {
      console.error('Failed to fetch activity logs:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            {id && (
              <Link to="/admin/sub-admins" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-4 h-4 text-muted" />
              </Link>
            )}
            <h1 className="text-2xl font-bold text-charcoal">Activity Log</h1>
          </div>
          <p className="text-muted text-sm mt-1">
            {subAdmin
              ? `Activity history for ${subAdmin.name} (${subAdmin.email})`
              : 'All admin and sub-admin activity'
            }
            {!loading && <span className="ml-2 text-xs">({total} {viewMode === 'sessions' ? 'sessions' : 'entries'})</span>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setViewMode('sessions'); setPage(1) }}
            className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${viewMode === 'sessions' ? 'bg-primary text-white' : 'bg-gray-100 text-muted hover:bg-gray-200'}`}
          >
            <Shield className="w-4 h-4 inline mr-1" />
            Sessions
          </button>
          <button
            onClick={() => { setViewMode('timeline'); setPage(1) }}
            className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${viewMode === 'timeline' ? 'bg-primary text-white' : 'bg-gray-100 text-muted hover:bg-gray-200'}`}
          >
            <Activity className="w-4 h-4 inline mr-1" />
            Timeline
          </button>
        </div>
      </div>

      {subAdmin && (
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-primary font-bold text-lg">{subAdmin.name?.charAt(0)?.toUpperCase()}</span>
          </div>
          <div>
            <p className="font-semibold text-charcoal">{subAdmin.name}</p>
            <p className="text-sm text-muted">{subAdmin.email}</p>
          </div>
          <div className="ml-auto flex gap-2">
            <Link
              to={`/admin/sub-admins/${id}/edit`}
              className="px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
            >
              Edit Account
            </Link>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm">
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-xl p-4 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                    <div className="h-3 bg-gray-200 rounded w-72"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : viewMode === 'sessions' ? (
          <div className="p-4 space-y-2">
            {sessions.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-muted">No sessions recorded yet</p>
              </div>
            ) : (
              sessions.map((session) => (
                <SessionCard key={session._id} session={session} />
              ))
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Action</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">User</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Details</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Device</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Browser / OS</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">IP Address</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-12 text-center">
                      <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-muted">No activity recorded yet</p>
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => {
                    const config = ACTION_CONFIG[log.action] || ACTION_CONFIG.update
                    const ActionIcon = config.icon
                    const DeviceIcon = getDeviceIcon(log.device)

                    return (
                      <tr key={log._id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                            <ActionIcon className="w-3 h-3 mr-1" />
                            {config.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {log.user ? (
                            <div>
                              <p className="text-sm font-medium text-charcoal">{log.user.name}</p>
                              <p className="text-xs text-muted">{log.user.email}</p>
                            </div>
                          ) : (
                            <span className="text-sm text-muted italic">Deleted user</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-charcoal max-w-xs truncate">{log.details || '—'}</p>
                          {log.entity && (
                            <p className="text-xs text-muted mt-0.5 capitalize">{log.entity.replace(/_/g, ' ')}</p>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center text-sm text-muted">
                            <DeviceIcon className="w-4 h-4 mr-1" />
                            {log.device || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-muted">{log.browser || 'Unknown'}</p>
                          <p className="text-xs text-muted">{log.os || ''}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center text-sm text-muted font-mono">
                            <Globe className="w-3 h-3 mr-1" />
                            {log.ip || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted whitespace-nowrap">
                          {formatDateTime(log.createdAt)}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-muted">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminActivityLog
