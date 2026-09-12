import { useState, useEffect, useRef } from 'react'
import { Eye, X, Trash2, Image, Download, ChevronLeft, ChevronRight } from 'lucide-react'
import * as XLSX from 'xlsx'
import enquiryService from '../../services/enquiryService'
import { useAuth } from '../../context/AuthContext'
import { formatDate, formatDateTime } from '../../utils/helpers'
import { STATUS_OPTIONS } from '../../constants'
import toast from 'react-hot-toast'

const PAGE_SIZE = 10

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedEnquiry, setSelectedEnquiry] = useState(null)
  const [filter, setFilter] = useState('all')
  const [savingImage, setSavingImage] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const modalRef = useRef(null)
  const { user } = useAuth()

  const canDelete = user?.role === 'admin' || user?.permissions?.includes('enquiries:delete')

  useEffect(() => {
    setPage(1)
    fetchEnquiries(1, filter)
  }, [filter])

  useEffect(() => {
    fetchEnquiries(page, filter)
  }, [page])

  const fetchEnquiries = async (pageNum, status) => {
    setLoading(true)
    try {
      const params = { page: pageNum, limit: PAGE_SIZE }
      if (status && status !== 'all') params.status = status
      const data = await enquiryService.getAllEnquiries(params)
      setEnquiries(data.data || [])
      setTotalPages(data.pagination?.totalPages || 1)
      setTotal(data.pagination?.total || 0)
    } catch (error) {
      console.error('Failed to fetch enquiries:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id, status) => {
    try {
      await enquiryService.updateEnquiryStatus(id, status)
      toast.success('Status updated')
      fetchEnquiries(page, filter)
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return
    try {
      await enquiryService.deleteEnquiry(id)
      toast.success('Enquiry deleted')
      setSelectedEnquiry(null)
      if (enquiries.length === 1 && page > 1) {
        setPage(page - 1)
      } else {
        fetchEnquiries(page, filter)
      }
    } catch (error) {
      toast.error('Failed to delete enquiry')
    }
  }

  const exportToExcel = async () => {
    setExporting(true)
    try {
      const params = { page: 1, limit: 10000 }
      if (filter && filter !== 'all') params.status = filter
      const data = await enquiryService.getAllEnquiries(params)
      const allEnquiries = data.data || []

      const rows = allEnquiries.map((e) => ({
        Name: e.fullName,
        Phone: e.phone,
        Email: e.email || '',
        'Travel From': e.travelFrom || '',
        'Travel Date': e.travelDate ? formatDate(e.travelDate) : '',
        Adults: e.adults || 0,
        Children: e.children || 0,
        'Preferred Duration': e.preferredDuration || '',
        'Travel Style': e.travelStyle || '',
        'Preferred Package': e.preferredPackage?.title || e.preferredPackage || '',
        Message: e.message || '',
        Status: e.status || '',
        'Submitted': e.createdAt ? formatDateTime(e.createdAt) : '',
        'IP Address': e.ipAddress || '',
        'City': e.location?.city || '',
        'Country': e.location?.country || '',
        'ISP': e.location?.isp || '',
        'Browser': e.browser?.name || '',
        'OS': e.os?.name || '',
        'Device': e.device || '',
        'Referrer': e.referrer || '',
        'Language': e.language || '',
      }))

      const ws = XLSX.utils.json_to_sheet(rows)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Enquiries')

      ws['!cols'] = [
        { wch: 20 }, { wch: 15 }, { wch: 25 }, { wch: 15 },
        { wch: 15 }, { wch: 8 }, { wch: 8 }, { wch: 15 },
        { wch: 15 }, { wch: 25 }, { wch: 30 }, { wch: 12 }, { wch: 15 },
        { wch: 18 }, { wch: 20 }, { wch: 15 }, { wch: 25 },
        { wch: 15 }, { wch: 12 }, { wch: 12 }, { wch: 40 }, { wch: 15 },
      ]

      XLSX.writeFile(wb, `enquiries-${new Date().toISOString().slice(0, 10)}.xlsx`)
      toast.success(`Exported ${allEnquiries.length} enquiries!`)
    } catch (error) {
      toast.error('Failed to export enquiries')
    } finally {
      setExporting(false)
    }
  }

  const saveScreenshot = async (enquiry) => {
    if (!modalRef.current) return
    setSavingImage(true)
    try {
      const container = modalRef.current.closest('.max-h-\\[90vh\\]') || modalRef.current.parentElement
      const prevMaxHeight = container.style.maxHeight
      const prevOverflow = container.style.overflow
      container.style.maxHeight = 'none'
      container.style.overflow = 'visible'

      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(modalRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
      })

      container.style.maxHeight = prevMaxHeight
      container.style.overflow = prevOverflow

      const link = document.createElement('a')
      link.download = `enquiry_${(enquiry.fullName || 'contact').replace(/\s+/g, '_')}_${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast.success('Screenshot saved!')
    } catch (err) {
      console.error('Screenshot failed:', err)
      toast.error('Failed to save screenshot')
    } finally {
      setSavingImage(false)
    }
  }

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

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-charcoal">Enquiries</h1>
        <button
          onClick={exportToExcel}
          disabled={exporting}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {exporting ? 'Exporting...' : `Export All (${total})`}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        {['all', 'new', 'contacted', 'quote_sent', 'confirmed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === status
                ? 'bg-primary text-white'
                : 'bg-white text-muted hover:bg-gray-100'
            }`}
          >
            {status === 'all' ? 'All' : status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Travel From</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Travel Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Travellers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </td>
                </tr>
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-muted">
                    No enquiries found
                  </td>
                </tr>
              ) : (
                enquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-charcoal">{enquiry.fullName}</p>
                    </td>
                    <td className="px-6 py-4 text-muted text-sm">
                      <div>{enquiry.phone}</div>
                      {enquiry.email && <div className="text-xs">{enquiry.email}</div>}
                    </td>
                    <td className="px-6 py-4 text-muted">{enquiry.travelFrom || '-'}</td>
                    <td className="px-6 py-4 text-muted text-sm">{enquiry.travelDate ? formatDate(enquiry.travelDate) : '-'}</td>
                    <td className="px-6 py-4 text-muted text-sm">{enquiry.adults || 0}A{enquiry.children ? `/${enquiry.children}C` : ''}</td>
                    <td className="px-6 py-4">
                      <select
                        value={enquiry.status}
                        onChange={(e) => handleStatusUpdate(enquiry._id, e.target.value)}
                        className={`px-2 py-1 text-xs font-medium rounded-full border-0 focus:ring-2 focus:ring-primary cursor-pointer ${getStatusStyle(enquiry.status)}`}
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-muted text-sm">{formatDate(enquiry.createdAt)}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedEnquiry(enquiry)}
                        className="p-2 text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t flex items-center justify-between">
            <p className="text-sm text-muted">
              Page {page} of {totalPages} ({total} total)
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className="px-3 py-2 text-sm font-medium text-muted hover:text-charcoal hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                &laquo;
              </button>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 text-muted hover:text-charcoal hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (page <= 3) {
                  pageNum = i + 1
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = page - 2 + i
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-9 h-9 text-sm font-medium rounded-lg transition-colors ${
                      page === pageNum
                        ? 'bg-primary text-white'
                        : 'text-muted hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 text-muted hover:text-charcoal hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className="px-3 py-2 text-sm font-medium text-muted hover:text-charcoal hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                &raquo;
              </button>
            </div>
          </div>
        )}
      </div>

      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div ref={modalRef} className="bg-white rounded-2xl">
            <div className="p-6 border-b sticky top-0 bg-white z-10">
              <div className="flex justify-between items-center">
                <h2 className="font-display text-xl font-bold text-charcoal">Enquiry Details</h2>
                <button onClick={() => setSelectedEnquiry(null)} className="text-muted hover:text-charcoal p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-muted">Full Name</p>
                <p className="font-medium text-charcoal">{selectedEnquiry.fullName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted">Phone</p>
                  <p className="font-medium text-charcoal">{selectedEnquiry.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">Email</p>
                  <p className="font-medium text-charcoal">{selectedEnquiry.email || '-'}</p>
                </div>
              </div>
              {selectedEnquiry.whatsappNumber && (
                <div>
                  <p className="text-sm text-muted">WhatsApp</p>
                  <p className="font-medium text-charcoal">{selectedEnquiry.whatsappNumber}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted">Travel From</p>
                  <p className="font-medium text-charcoal">{selectedEnquiry.travelFrom || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">Travel Date</p>
                  <p className="font-medium text-charcoal">{selectedEnquiry.travelDate ? formatDate(selectedEnquiry.travelDate) : '-'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted">Adults</p>
                  <p className="font-medium text-charcoal">{selectedEnquiry.adults || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">Children</p>
                  <p className="font-medium text-charcoal">{selectedEnquiry.children || '-'}</p>
                </div>
              </div>
              {selectedEnquiry.preferredDuration && (
                <div>
                  <p className="text-sm text-muted">Preferred Duration</p>
                  <p className="font-medium text-charcoal">{selectedEnquiry.preferredDuration}</p>
                </div>
              )}
              {selectedEnquiry.preferredPackage && (
                <div>
                  <p className="text-sm text-muted">Preferred Package</p>
                  <p className="font-medium text-charcoal">{selectedEnquiry.preferredPackage?.title || selectedEnquiry.preferredPackage}</p>
                </div>
              )}
              {selectedEnquiry.budgetRange && (
                <div>
                  <p className="text-sm text-muted">Budget Range</p>
                  <p className="font-medium text-charcoal">{selectedEnquiry.budgetRange}</p>
                </div>
              )}
              {selectedEnquiry.travelStyle && (
                <div>
                  <p className="text-sm text-muted">Travel Style</p>
                  <p className="font-medium text-charcoal capitalize">{selectedEnquiry.travelStyle}</p>
                </div>
              )}
              {selectedEnquiry.specialRequirements && (
                <div>
                  <p className="text-sm text-muted">Special Requirements</p>
                  <p className="text-charcoal">{selectedEnquiry.specialRequirements}</p>
                </div>
              )}
              {selectedEnquiry.message && (
                <div>
                  <p className="text-sm text-muted">Message</p>
                  <p className="text-charcoal">{selectedEnquiry.message}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted">Status</p>
                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle(selectedEnquiry.status)}`}>
                  {selectedEnquiry.status?.replace('_', ' ')}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted">Submitted</p>
                <p className="font-medium text-charcoal">{formatDateTime(selectedEnquiry.createdAt)}</p>
              </div>
              {(selectedEnquiry.ipAddress || selectedEnquiry.userAgent) && (
                <div className="p-3 bg-gray-50 rounded-lg space-y-2">
                  <p className="text-sm font-medium text-muted">User Info</p>
                  {selectedEnquiry.location?.city && (
                    <p className="text-sm text-charcoal">
                      📍 {selectedEnquiry.location.city}{selectedEnquiry.location.region ? `, ${selectedEnquiry.location.region}` : ''}{selectedEnquiry.location.country ? `, ${selectedEnquiry.location.country}` : ''}
                    </p>
                  )}
                  {selectedEnquiry.location?.isp && (
                    <p className="text-xs text-muted">ISP: {selectedEnquiry.location.isp}</p>
                  )}
                  {selectedEnquiry.browser?.name && (
                    <p className="text-sm text-charcoal">
                      🌐 {selectedEnquiry.browser.name}{selectedEnquiry.browser.version ? ` ${selectedEnquiry.browser.version}` : ''}
                      {selectedEnquiry.os?.name ? ` on ${selectedEnquiry.os.name}${selectedEnquiry.os.version ? ` ${selectedEnquiry.os.version}` : ''}` : ''}
                    </p>
                  )}
                  {selectedEnquiry.device && (
                    <p className="text-sm text-charcoal">
                      📱 {selectedEnquiry.device.charAt(0).toUpperCase() + selectedEnquiry.device.slice(1)}
                    </p>
                  )}
                  {selectedEnquiry.ipAddress && (
                    <p className="text-xs text-muted">IP: {selectedEnquiry.ipAddress}</p>
                  )}
                  {selectedEnquiry.referrer && (
                    <p className="text-xs text-muted break-all">Referrer: {selectedEnquiry.referrer}</p>
                  )}
                  {selectedEnquiry.language && (
                    <p className="text-xs text-muted">Language: {selectedEnquiry.language}</p>
                  )}
                </div>
              )}
            </div>
            <div className="p-6 border-t flex gap-3">
              <button
                onClick={() => saveScreenshot(selectedEnquiry)}
                disabled={savingImage}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                {savingImage ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                ) : (
                  <Image className="w-4 h-4" />
                )}
                {savingImage ? 'Saving...' : 'Save as Image'}
              </button>
              {canDelete && (
                <button
                  onClick={() => handleDelete(selectedEnquiry._id)}
                  className="inline-flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-xl font-semibold hover:bg-red-100 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              )}
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminEnquiries
