import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useBusinessContact } from '../../context/SettingsContext'
import toast from 'react-hot-toast'
import logo from '../../utils/logo/HKT.png'

const AdminLogin = () => {
  const BUSINESS_CONTACT = useBusinessContact();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await login(email, password)
      toast.success('Login successful!')
      if (data?.data?.role === 'sub_admin') {
        const perms = data?.data?.permissions || []
        if (perms.includes('dashboard:view')) {
          navigate('/admin', { replace: true })
        } else if (perms.includes('packages:view')) {
          navigate('/admin/packages', { replace: true })
        } else if (perms.includes('destinations:view')) {
          navigate('/admin/destinations', { replace: true })
        } else if (perms.includes('blog:view')) {
          navigate('/admin/blog', { replace: true })
        } else if (perms.includes('enquiries:view')) {
          navigate('/admin/enquiries', { replace: true })
        } else if (perms.includes('reviews:view')) {
          navigate('/admin/reviews', { replace: true })
        } else if (perms.includes('gallery:view')) {
          navigate('/admin/gallery', { replace: true })
        } else if (perms.includes('settings:view')) {
          navigate('/admin/settings', { replace: true })
        } else if (perms.includes('subadmins:view')) {
          navigate('/admin/sub-admins', { replace: true })
        } else {
          navigate('/admin/profile', { replace: true })
        }
      } else {
        navigate('/admin', { replace: true })
      }
    } catch (error) {
      toast.error(error.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin Login | {BUSINESS_CONTACT.companyName}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-warmWhite flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src={logo} alt={BUSINESS_CONTACT.companyName} className="h-16 w-auto mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold text-charcoal">Admin Portal</h1>
            <p className="text-muted mt-2">Sign in to manage your website</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    type="email"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="admin@bhutantravels.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-charcoal"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-light transition-colors flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLogin
