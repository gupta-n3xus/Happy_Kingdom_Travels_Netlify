import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, TrendingUp, ArrowUpRight, FileText, Users, Eye, MessageCircle, CalendarCheck, BarChart3 } from 'lucide-react'
import api from '../../services/api'

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null)
  const [recentEnquiries, setRecentEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('all')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [enquiriesRes, analyticsRes] = await Promise.allSettled([
        api.get('/enquiries'),
        api.get('/tracking/dashboard'),
      ])

      const enquiries = enquiriesRes.status === 'fulfilled' ? (enquiriesRes.value.data || []) : []

      if (analyticsRes.status === 'fulfilled') {
        setAnalytics(analyticsRes.value.data)
      }

      setRecentEnquiries(enquiries.slice(0, 5))
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const overview = analytics?.overview || {}
  const last30 = analytics?.last30Days || {}
  const active = period === 'all' ? overview : last30

  const statCards = [
    { name: 'Visitors', value: active.visitors ?? '-', icon: Users, color: 'bg-blue-500', link: null },
    { name: 'Sessions', value: active.sessions ?? '-', icon: Eye, color: 'bg-indigo-500', link: null },
    { name: 'Leads', value: active.leads ?? '-', icon: MessageSquare, color: 'bg-green-500', link: '/admin/enquiries' },
    { name: 'WhatsApp', value: active.whatsappClicks ?? '-', icon: MessageCircle, color: 'bg-emerald-500', link: null },
    { name: 'Quotes', value: active.quotes ?? '-', icon: FileText, color: 'bg-amber-500', link: '/admin/enquiries' },
    { name: 'Bookings', value: active.bookings ?? '-', icon: CalendarCheck, color: 'bg-purple-500', link: '/admin/enquiries' },
  ]

  const getStatusStyle = (status) => {
    const styles = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-amber-100 text-amber-800',
      quote_sent: 'bg-purple-100 text-purple-800',
      negotiation: 'bg-orange-100 text-orange-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-gray-100 text-gray-800',
      lost: 'bg-gray-100 text-gray-600',
    }
    return styles[status] || 'bg-gray-100 text-gray-800'
  }

  const formatPath = (path) => {
    if (!path) return ''
    return path
      .replace(/^\//, '')
      .replace(/-/g, ' ')
      .replace(/\//g, ' > ')
      .replace(/\b\w/g, c => c.toUpperCase())
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
        <div>
          <h1 className="text-2xl font-bold text-charcoal">HAPPY KINGDOM TRAVELS</h1>
          <p className="text-muted text-sm mt-1">Analytics Overview</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-charcoal bg-white focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer"
          >
            <option value="all">All Time</option>
            <option value="30days">Last 30 Days</option>
          </select>
          <div className="flex items-center gap-2 text-muted text-sm">
            <BarChart3 className="w-4 h-4" />
            Live Dashboard
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statCards.map((card) => {
          const Wrapper = card.link ? Link : 'div'
          const wrapperProps = card.link ? { to: card.link } : {}
          return (
            <Wrapper key={card.name} {...wrapperProps} className={`bg-white rounded-xl p-5 shadow-sm ${card.link ? 'hover:shadow-md transition-shadow cursor-pointer' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center`}>
                  <card.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-muted text-sm">{card.name}</p>
              <p className="text-2xl font-bold text-charcoal mt-1">{card.value}</p>
            </Wrapper>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b">
            <h2 className="font-bold text-charcoal flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Top Packages
            </h2>
          </div>
          <div className="p-6">
            {analytics?.topPackages?.length > 0 ? (
              <div className="space-y-3">
                {analytics.topPackages.slice(0, 5).map((pkg, i) => (
                  <div key={pkg.path} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-sm text-charcoal font-medium">{formatPath(pkg.title || pkg.path)}</span>
                    </div>
                    <span className="text-sm text-muted font-medium">{pkg.views} views</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted text-sm text-center py-4">No package views yet</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b">
            <h2 className="font-bold text-charcoal flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Top Destinations
            </h2>
          </div>
          <div className="p-6">
            {analytics?.topPages?.filter(p => p._id?.includes('/destinations/')).length > 0 ? (
              <div className="space-y-3">
                {analytics.topPages
                  .filter(p => p._id?.includes('/destinations/'))
                  .slice(0, 5)
                  .map((dest, i) => (
                    <div key={dest._id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </span>
                        <span className="text-sm text-charcoal font-medium">{formatPath(dest.title || dest._id)}</span>
                      </div>
                      <span className="text-sm text-muted font-medium">{dest.views}</span>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-muted text-sm text-center py-4">No destination views yet</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b">
            <h2 className="font-bold text-charcoal flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              Top Pages
            </h2>
          </div>
          <div className="p-6">
            {analytics?.topPages?.length > 0 ? (
              <div className="space-y-3">
                {analytics.topPages.slice(0, 5).map((page, i) => (
                  <div key={page._id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-sm text-charcoal font-medium truncate max-w-[200px]">{formatPath(page.title || page._id)}</span>
                    </div>
                    <span className="text-sm text-muted font-medium">{page.views}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted text-sm text-center py-4">No page views yet</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b">
            <h2 className="font-bold text-charcoal flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Device Breakdown
            </h2>
          </div>
          <div className="p-6">
            {analytics?.deviceBreakdown && Object.keys(analytics.deviceBreakdown).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(analytics.deviceBreakdown)
                  .sort(([, a], [, b]) => b - a)
                  .map(([device, count]) => {
                    const total = Object.values(analytics.deviceBreakdown).reduce((s, v) => s + v, 0)
                    const pct = total > 0 ? Math.round((count / total) * 100) : 0
                    return (
                      <div key={device}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-charcoal font-medium capitalize">{device}</span>
                          <span className="text-sm text-muted">{count} ({pct}%)</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className="bg-primary rounded-full h-2 transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
              </div>
            ) : (
              <p className="text-muted text-sm text-center py-4">No device data yet</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="font-bold text-charcoal">Recent Enquiries</h2>
          <Link to="/admin/enquiries" className="text-primary text-sm font-medium hover:text-primary-light flex items-center">
            View All <ArrowUpRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Travel From</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentEnquiries.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-muted">
                    No enquiries yet
                  </td>
                </tr>
              ) : (
                recentEnquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-charcoal">{enquiry.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted text-sm">
                      <div>{enquiry.phone}</div>
                      <div className="text-xs">{enquiry.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted">{enquiry.travelFrom || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyle(enquiry.status)}`}>
                        {enquiry.status?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted text-sm">
                      {new Date(enquiry.createdAt).toLocaleDateString()}
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

export default AdminDashboard
