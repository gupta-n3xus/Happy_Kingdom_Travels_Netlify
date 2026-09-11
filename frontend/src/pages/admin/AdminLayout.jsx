import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, MapPin, FileText, MessageSquare, Star, Settings, LogOut, Menu, X, ChevronDown, Database, Image } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import logo from '../../utils/logo/HKT.png'

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const allMenuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, roles: ['admin'] },
    { name: 'Packages', path: '/admin/packages', icon: Package, roles: ['admin', 'sub_admin'] },
    { name: 'Destinations', path: '/admin/destinations', icon: MapPin, roles: ['admin'] },
    { name: 'Blog Posts', path: '/admin/blog', icon: FileText, roles: ['admin'] },
    { name: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare, roles: ['admin'] },
    { name: 'Reviews', path: '/admin/reviews', icon: Star, roles: ['admin', 'sub_admin'] },
    { name: 'Gallery', path: '/admin/gallery', icon: Image, roles: ['admin', 'sub_admin'] },
    { name: 'Backup', path: '/admin/backup', icon: Database, roles: ['admin'] },
    { name: 'Settings', path: '/admin/settings', icon: Settings, roles: ['admin'] },
  ]

  const filteredMenuItems = allMenuItems.filter(item => item.roles.includes(user?.role || 'admin'))

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

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

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
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
              <Link to="/" target="_blank" className="text-sm text-muted hover:text-primary">
                View Website
              </Link>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <span className="ml-2 font-medium text-charcoal hidden sm:block">
                  {user?.name || 'Admin'}
                </span>
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
