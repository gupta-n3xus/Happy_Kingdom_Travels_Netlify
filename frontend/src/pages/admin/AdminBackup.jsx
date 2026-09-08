import { useState, useRef } from 'react'
import { Download, Upload, Database, AlertTriangle, CheckCircle, FileJson } from 'lucide-react'
import api from '../../services/api'
import toast from 'react-hot-toast'

const AdminBackup = () => {
  const [importing, setImporting] = useState(false)
  const [importResult, setImportResult] = useState(null)
  const [exporting, setExporting] = useState(false)
  const fileInputRef = useRef(null)

  const handleExport = async () => {
    setExporting(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${api.baseUrl}/backup/export`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) throw new Error('Export failed')

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `backup-${new Date().toISOString().slice(0, 10)}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      toast.success('Backup exported successfully!')
    } catch (err) {
      console.error('Export failed:', err)
      toast.error('Failed to export backup')
    } finally {
      setExporting(false)
    }
  }

  const handleImport = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!window.confirm('⚠️ This will REPLACE ALL existing data with the backup. This action cannot be undone. Are you sure?')) {
      fileInputRef.current.value = ''
      return
    }

    setImporting(true)
    setImportResult(null)
    try {
      const text = await file.text()
      const backup = JSON.parse(text)

      if (!backup.data) {
        throw new Error('Invalid backup file format')
      }

      const res = await api.post('/backup/import', { data: backup.data })
      setImportResult(res.data.data)
      toast.success('Backup imported successfully!')
    } catch (err) {
      console.error('Import failed:', err)
      toast.error(err.response?.data?.message || 'Failed to import backup')
    } finally {
      setImporting(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const collectionLabels = {
    packages: 'Packages',
    destinations: 'Destinations',
    blogPosts: 'Blog Posts',
    enquiries: 'Enquiries',
    reviews: 'Reviews',
    faqs: 'FAQs',
    settings: 'Settings',
    users: 'Users',
    pageViews: 'Page Views',
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-charcoal mb-6">Backup & Restore</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Export Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Download className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-charcoal">Export Backup</h2>
              <p className="text-sm text-muted">Download all data as JSON</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Exports all packages, destinations, blog posts, enquiries, reviews, FAQs, settings, and users into a single JSON file.
          </p>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {exporting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            {exporting ? 'Exporting...' : 'Download Backup'}
          </button>
        </div>

        {/* Import Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <Upload className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-charcoal">Import Backup</h2>
              <p className="text-sm text-muted">Restore data from JSON file</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-800">Warning</p>
                <p className="text-sm text-amber-700">This will completely replace all existing data. Make sure to export a backup first.</p>
              </div>
            </div>
          </div>

          <label className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-600 transition-all cursor-pointer disabled:opacity-50">
            {importing ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
            {importing ? 'Importing...' : 'Choose Backup File'}
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              disabled={importing}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Import Results */}
      {importResult && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-bold text-charcoal">Import Complete</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {Object.entries(importResult).map(([key, count]) => (
              <div key={key} className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-charcoal">{count}</p>
                <p className="text-xs text-muted">{collectionLabels[key] || key}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What's Included */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-charcoal">What's Included</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {Object.entries(collectionLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2 text-sm text-gray-600">
              <FileJson className="w-4 h-4 text-gray-400" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminBackup
