import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { SettingsProvider } from './context/SettingsContext'
import ScrollToTop from './components/ScrollToTop'
import { useTracking } from './hooks/useAnalytics'

const Navbar = lazy(() => import('./components/Navbar'))
const Footer = lazy(() => import('./components/Footer'))
const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'))
const Home = lazy(() => import('./pages/Home'))
const BhutanPackages = lazy(() => import('./pages/BhutanPackages'))
const PackageDetails = lazy(() => import('./pages/PackageDetails'))
const HoneymoonPackages = lazy(() => import('./pages/HoneymoonPackages'))
const FamilyPackages = lazy(() => import('./pages/FamilyPackages'))
const GroupPackages = lazy(() => import('./pages/GroupPackages'))
const CustomTrip = lazy(() => import('./pages/CustomTrip'))
const Destination = lazy(() => import('./pages/Destination'))
const ParoDestination = lazy(() => import('./pages/destinations/Paro'))
const ThimphuDestination = lazy(() => import('./pages/destinations/Thimphu'))
const PunakhaDestination = lazy(() => import('./pages/destinations/Punakha'))
const PhuentsholingDestination = lazy(() => import('./pages/destinations/Phuentsholing'))
const HaaValleyDestination = lazy(() => import('./pages/destinations/HaaValley'))
const BumthangDestination = lazy(() => import('./pages/destinations/Bumthang'))
const CityLandingPage = lazy(() => import('./pages/CityLandingPage'))
const TravelGuide = lazy(() => import('./pages/TravelGuide'))
const BhutanTripCost = lazy(() => import('./pages/guide/BhutanTripCost'))
const HowToReachBhutan = lazy(() => import('./pages/guide/HowToReachBhutan'))
const BestTimeToVisit = lazy(() => import('./pages/guide/BestTimeToVisit'))
const EntryRequirements = lazy(() => import('./pages/guide/EntryRequirements'))
const BlogDetails = lazy(() => import('./pages/BlogDetails'))
const About = lazy(() => import('./pages/About'))
const Reviews = lazy(() => import('./pages/Reviews'))
const Contact = lazy(() => import('./pages/Contact'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const CancellationPolicy = lazy(() => import('./pages/CancellationPolicy'))
const Gallery = lazy(() => import('./pages/Gallery'))
const FAQs = lazy(() => import('./pages/Faqs'))
const NotFound = lazy(() => import('./pages/NotFound'))

const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminPackages = lazy(() => import('./pages/admin/AdminPackages'))
const AdminPackageEditor = lazy(() => import('./pages/admin/AdminPackageEditor'))
const AdminDestinations = lazy(() => import('./pages/admin/AdminDestinations'))
const AdminBlogPosts = lazy(() => import('./pages/admin/AdminBlogPosts'))
const AdminBlogEditor = lazy(() => import('./pages/admin/AdminBlogEditor'))
const AdminEnquiries = lazy(() => import('./pages/admin/AdminEnquiries'))
const AdminReviews = lazy(() => import('./pages/admin/AdminReviews'))
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery'))
const AdminBackup = lazy(() => import('./pages/admin/AdminBackup'))
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'))
const AdminSubAdmins = lazy(() => import('./pages/admin/AdminSubAdmins'))
const AdminSubAdminEditor = lazy(() => import('./pages/admin/AdminSubAdminEditor'))
const AdminProfile = lazy(() => import('./pages/admin/AdminProfile'))
const AdminActivityLog = lazy(() => import('./pages/admin/AdminActivityLog'))

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-warmWhite">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
)

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main className="min-h-screen">{children}</main>
    <Footer />
    <WhatsAppButton />
  </>
)

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}

const PermissionRoute = ({ permission, children }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/admin/login" replace />
  }
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (user.role === 'admin') return children
  if (user.permissions && user.permissions.includes(permission)) return children
  return <Navigate to="/admin/profile" replace />
}

function App() {
  useTracking()

  return (
    <SettingsProvider>
    <AuthProvider>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />
          <Route
            path="/bhutan-tour-packages"
            element={
              <PublicLayout>
                <BhutanPackages />
              </PublicLayout>
            }
          />
          <Route
            path="/packages/:slug"
            element={
              <PublicLayout>
                <PackageDetails />
              </PublicLayout>
            }
          />
          <Route
            path="/bhutan-honeymoon-packages"
            element={
              <PublicLayout>
                <HoneymoonPackages />
              </PublicLayout>
            }
          />
          <Route
            path="/bhutan-family-packages"
            element={
              <PublicLayout>
                <FamilyPackages />
              </PublicLayout>
            }
          />
          <Route
            path="/bhutan-group-packages"
            element={
              <PublicLayout>
                <GroupPackages />
              </PublicLayout>
            }
          />
          <Route
            path="/customize-your-trip"
            element={
              <PublicLayout>
                <CustomTrip />
              </PublicLayout>
            }
          />
          <Route
            path="/destinations/paro"
            element={
              <PublicLayout>
                <ParoDestination />
              </PublicLayout>
            }
          />
          <Route
            path="/destinations/thimphu"
            element={
              <PublicLayout>
                <ThimphuDestination />
              </PublicLayout>
            }
          />
          <Route
            path="/destinations/punakha"
            element={
              <PublicLayout>
                <PunakhaDestination />
              </PublicLayout>
            }
          />
          <Route
            path="/destinations/phuentsholing"
            element={
              <PublicLayout>
                <PhuentsholingDestination />
              </PublicLayout>
            }
          />
          <Route
            path="/destinations/haa-valley"
            element={
              <PublicLayout>
                <HaaValleyDestination />
              </PublicLayout>
            }
          />
          <Route
            path="/destinations/bumthang"
            element={
              <PublicLayout>
                <BumthangDestination />
              </PublicLayout>
            }
          />
          <Route
            path="/destinations/:slug"
            element={
              <PublicLayout>
                <Destination />
              </PublicLayout>
            }
          />
          <Route
            path="/bhutan-tour-from-mumbai"
            element={
              <PublicLayout>
                <CityLandingPage city="Mumbai" />
              </PublicLayout>
            }
          />
          <Route
            path="/bhutan-tour-from-delhi"
            element={
              <PublicLayout>
                <CityLandingPage city="Delhi" />
              </PublicLayout>
            }
          />
          <Route
            path="/bhutan-tour-from-kolkata"
            element={
              <PublicLayout>
                <CityLandingPage city="Kolkata" />
              </PublicLayout>
            }
          />
          <Route
            path="/bhutan-tour-from-bangalore"
            element={
              <PublicLayout>
                <CityLandingPage city="Bangalore" />
              </PublicLayout>
            }
          />
          <Route
            path="/bhutan-tour-from-hyderabad"
            element={
              <PublicLayout>
                <CityLandingPage city="Hyderabad" />
              </PublicLayout>
            }
          />
          <Route
            path="/bhutan-tour-from-chennai"
            element={
              <PublicLayout>
                <CityLandingPage city="Chennai" />
              </PublicLayout>
            }
          />
          <Route
            path="/travel-guide"
            element={
              <PublicLayout>
                <TravelGuide />
              </PublicLayout>
            }
          />
          <Route
            path="/travel-guide/bhutan-trip-cost"
            element={
              <PublicLayout>
                <BhutanTripCost />
              </PublicLayout>
            }
          />
          <Route
            path="/travel-guide/how-to-reach-bhutan"
            element={
              <PublicLayout>
                <HowToReachBhutan />
              </PublicLayout>
            }
          />
          <Route
            path="/travel-guide/best-time-to-visit-bhutan"
            element={
              <PublicLayout>
                <BestTimeToVisit />
              </PublicLayout>
            }
          />
          <Route
            path="/travel-guide/bhutan-entry-requirements"
            element={
              <PublicLayout>
                <EntryRequirements />
              </PublicLayout>
            }
          />
          <Route
            path="/travel-guide/:slug"
            element={
              <PublicLayout>
                <BlogDetails />
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout>
                <About />
              </PublicLayout>
            }
          />
          <Route
            path="/reviews"
            element={
              <PublicLayout>
                <Reviews />
              </PublicLayout>
            }
          />
          <Route
            path="/gallery"
            element={
              <PublicLayout>
                <Gallery />
              </PublicLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicLayout>
                <Contact />
              </PublicLayout>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <PublicLayout>
                <Privacy />
              </PublicLayout>
            }
          />
          <Route
            path="/terms-and-conditions"
            element={
              <PublicLayout>
                <Terms />
              </PublicLayout>
            }
          />
          <Route
            path="/cancellation-policy"
            element={
              <PublicLayout>
                <CancellationPolicy />
              </PublicLayout>
            }
          />
          <Route
            path="/faqs"
            element={
              <PublicLayout>
                <FAQs />
              </PublicLayout>
            }
          />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/packages"
            element={
              <PermissionRoute permission="packages:view">
                <AdminLayout><AdminPackages /></AdminLayout>
              </PermissionRoute>
            }
          />
          <Route
            path="/admin/packages/new"
            element={
              <PermissionRoute permission="packages:create">
                <AdminLayout><AdminPackageEditor /></AdminLayout>
              </PermissionRoute>
            }
          />
          <Route
            path="/admin/packages/:id/edit"
            element={
              <PermissionRoute permission="packages:edit">
                <AdminLayout><AdminPackageEditor /></AdminLayout>
              </PermissionRoute>
            }
          />
          <Route
            path="/admin/destinations"
            element={
              <PermissionRoute permission="destinations:view">
                <AdminLayout><AdminDestinations /></AdminLayout>
              </PermissionRoute>
            }
          />
          <Route
            path="/admin/blog"
            element={
              <PermissionRoute permission="blog:view">
                <AdminLayout><AdminBlogPosts /></AdminLayout>
              </PermissionRoute>
            }
          />
          <Route
            path="/admin/blog/new"
            element={
              <PermissionRoute permission="blog:create">
                <AdminLayout><AdminBlogEditor /></AdminLayout>
              </PermissionRoute>
            }
          />
          <Route
            path="/admin/blog/:id/edit"
            element={
              <PermissionRoute permission="blog:edit">
                <AdminLayout><AdminBlogEditor /></AdminLayout>
              </PermissionRoute>
            }
          />
          <Route
            path="/admin/enquiries"
            element={
              <PermissionRoute permission="enquiries:view">
                <AdminLayout><AdminEnquiries /></AdminLayout>
              </PermissionRoute>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <PermissionRoute permission="reviews:view">
                <AdminLayout><AdminReviews /></AdminLayout>
              </PermissionRoute>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <PermissionRoute permission="gallery:view">
                <AdminLayout><AdminGallery /></AdminLayout>
              </PermissionRoute>
            }
          />
          <Route
            path="/admin/backup"
            element={
              <PermissionRoute permission="backup:export">
                <AdminLayout><AdminBackup /></AdminLayout>
              </PermissionRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <PermissionRoute permission="settings:view">
                <AdminLayout><AdminSettings /></AdminLayout>
              </PermissionRoute>
            }
          />
          <Route
            path="/admin/sub-admins"
            element={
              <PermissionRoute permission="subadmins:view">
                <AdminLayout><AdminSubAdmins /></AdminLayout>
              </PermissionRoute>
            }
          />
          <Route
            path="/admin/sub-admins/new"
            element={
              <PermissionRoute permission="subadmins:create">
                <AdminLayout><AdminSubAdminEditor /></AdminLayout>
              </PermissionRoute>
            }
          />
          <Route
            path="/admin/sub-admins/:id/edit"
            element={
              <PermissionRoute permission="subadmins:edit">
                <AdminLayout><AdminSubAdminEditor /></AdminLayout>
              </PermissionRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminProfile />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/activity"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminActivityLog />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/sub-admins/:id/activity"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminActivityLog />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AuthProvider>
    </SettingsProvider>
  )
}

export default App
