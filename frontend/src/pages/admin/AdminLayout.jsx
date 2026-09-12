import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, MapPin, FileText, MessageSquare, Star, Settings, LogOut, Menu, X, ChevronDown, Database, Image, Users, User, ChevronRight, Activity } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import logo from '../../utils/logo/HKT.png'

const allMenuItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, featureKey: 'dashboard', roles: ['admin', 'sub_admin'] },
  { name: 'Packages', path: '/admin/packages', icon: Package, featureKey: 'packages', roles: ['admin', 'sub_admin'] },
  { name: 'Destinations', path: '/admin/destinations', icon: MapPin, featureKey: 'destinations', roles: ['admin', 'sub_admin'] },
  { name: 'Blog Posts', path: '/admin/blog', icon: FileText, featureKey: 'blog', roles: ['admin', 'sub_admin'] },
  { name: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare, featureKey: 'enquiries', roles: ['admin', 'sub_admin'] },
  { name: 'Reviews', path: '/admin/reviews', icon: Star, featureKey: 'reviews', roles: ['admin', 'sub_admin'] },
  { name: 'Gallery', path: '/admin/gallery', icon: Image, featureKey: 'gallery', roles: ['admin', 'sub_admin'] },
  { name: 'Backup', path: '/admin/backup', icon: Database, featureKey: 'backup', roles: ['admin', 'sub_admin'] },
]

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getFilteredMenuItems = () => {
    if (!user) return []

    if (user.role === 'admin') {
      return allMenuItems.filter((item) => item.roles.includes('admin'))
    }

    if (user.role === 'sub_admin') {
      const perms = user.permissions || []
      return allMenuItems.filter((item) => {
        if (!item.roles.includes('sub_admin')) return false
        return perms.includes(`${item.featureKey}:view`)
      })
    }

    return []
  }

  const filteredMenuItems = getFilteredMenuItems()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  const handleProfileClick = () => {
    setDropdownOpen(false)
    navigate('/admin/profile')
  }

  const roleBadge = user?.role === 'admin' ? 'Administrator' : user?.role === 'sub_admin' ? 'Sub Admin' : 'Editor'

  return (
    <div className="min-h-screen bg-gray-100">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-charcoal transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
          <Link to="/admin" className="flex items-center">
            <img src={logo} alt="Admin" className="h-8 w-auto" />
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-4">
          {filteredMenuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </aside>

      <div className="lg:ml-64">
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-4">
              <Link to="/" target="_blank" className="text-sm text-muted hover:text-primary hidden sm:block">
                View Website
              </Link>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user?.name?.charAt(0) || 'A'}
                  </div>
                  <span className="font-medium text-charcoal hidden sm:block">{user?.name || 'Admin'}</span>
                  <ChevronDown className={`w-4 h-4 text-muted transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border py-2 z-50">
                    <div className="px-4 py-3 border-b">
                      <p className="font-medium text-charcoal text-sm">{user?.name}</p>
                      <p className="text-xs text-muted truncate">{user?.email}</p>
                      <span className="inline-flex items-center mt-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {roleBadge}
                      </span>
                    </div>

                    <button
                      onClick={handleProfileClick}
                      className="flex items-center w-full px-4 py-2.5 text-sm text-charcoal hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-4 h-4 mr-3 text-muted" />
                      My Profile
                      <ChevronRight className="w-4 h-4 ml-auto text-muted" />
                    </button>

                    {user?.role === 'admin' && (
                      <>
                        <Link
                          to="/admin/settings"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center w-full px-4 py-2.5 text-sm text-charcoal hover:bg-gray-50 transition-colors"
                        >
                          <Settings className="w-4 h-4 mr-3 text-muted" />
                          Settings
                          <ChevronRight className="w-4 h-4 ml-auto text-muted" />
                        </Link>
                        <Link
                          to="/admin/sub-admins"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center w-full px-4 py-2.5 text-sm text-charcoal hover:bg-gray-50 transition-colors"
                        >
                          <Users className="w-4 h-4 mr-3 text-muted" />
                          Sub Admins
                          <ChevronRight className="w-4 h-4 ml-auto text-muted" />
                        </Link>
                        <Link
                          to="/admin/activity"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center w-full px-4 py-2.5 text-sm text-charcoal hover:bg-gray-50 transition-colors"
                        >
                          <Activity className="w-4 h-4 mr-3 text-muted" />
                          Activity Log
                          <ChevronRight className="w-4 h-4 ml-auto text-muted" />
                        </Link>
                      </>
                    )}

                    <div className="border-t mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
