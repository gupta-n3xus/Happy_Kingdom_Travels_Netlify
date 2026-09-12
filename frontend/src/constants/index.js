export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Bhutan Tours', path: '/bhutan-tour-packages' },
  { name: 'Travel Guide', path: '/travel-guide' },
  { name: 'Customize Trip', path: '/customize-your-trip' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

export const CITIES = [
  { name: 'Mumbai', slug: 'mumbai' },
  { name: 'Delhi', slug: 'delhi' },
  { name: 'Kolkata', slug: 'kolkata' },
  { name: 'Bangalore', slug: 'bangalore' },
  { name: 'Hyderabad', slug: 'hyderabad' },
  { name: 'Chennai', slug: 'chennai' },
]

export const TRAVEL_STYLES = [
  { value: 'budget', label: 'Budget' },
  { value: 'comfort', label: 'Comfort' },
  { value: 'premium', label: 'Premium' },
  { value: 'luxury', label: 'Luxury' },
]

export const DURATIONS = [
  { value: '4N/5D', label: '4N/5D' },
  { value: '5N/6D', label: '5N/6D' },
  { value: '6N/7D', label: '6N/7D' },
  { value: '7N/8D', label: '7N/8D' },
  { value: 'custom', label: 'Custom' },
]

export const HOTEL_CATEGORIES = [
  { value: 'budget', label: 'Budget' },
  { value: 'standard', label: 'Standard' },
  { value: 'deluxe', label: 'Deluxe' },
  { value: 'premium', label: 'Premium' },
  { value: 'luxury', label: 'Luxury' },
]

export const PACKAGE_TYPES = [
  { value: 'standard', label: 'Standard' },
  { value: 'honeymoon', label: 'Honeymoon' },
  { value: 'family', label: 'Family' },
  { value: 'group', label: 'Group' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'budget', label: 'Budget' },
]

export const BUDGET_RANGES = [
  'Under ₹25,000',
  '₹25,000 - ₹50,000',
  '₹50,000 - ₹1,00,000',
  '₹1,00,000 - ₹2,00,000',
  'Above ₹2,00,000',
]

export const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'quote_sent', label: 'Quote Sent' },
  { value: 'negotiation', label: 'Negotiation' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'completed', label: 'Completed' },
  { value: 'lost', label: 'Lost' },
]

export const WHATSAPP_DEFAULT_MESSAGE =
  'Hi, I am interested in a Bhutan tour package. I would like help planning my trip.'

export const INTERESTS = [
  'Nature',
  'Culture',
  'Photography',
  'Adventure',
  'Relaxation',
  'Family',
  'Honeymoon',
]

export const PERMISSIONS_CONFIG = [
  {
    key: 'packages',
    label: 'Packages',
    actions: [
      { key: 'view', label: 'View Packages' },
      { key: 'create', label: 'Create Packages' },
      { key: 'edit', label: 'Edit Packages' },
      { key: 'delete', label: 'Delete Packages' }
    ]
  },
  {
    key: 'destinations',
    label: 'Destinations',
    actions: [
      { key: 'view', label: 'View Destinations' },
      { key: 'create', label: 'Create Destinations' },
      { key: 'edit', label: 'Edit Destinations' },
      { key: 'delete', label: 'Delete Destinations' }
    ]
  },
  {
    key: 'blog',
    label: 'Blog Posts',
    actions: [
      { key: 'view', label: 'View Blog Posts' },
      { key: 'create', label: 'Create Blog Posts' },
      { key: 'edit', label: 'Edit Blog Posts' },
      { key: 'delete', label: 'Delete Blog Posts' }
    ]
  },
  {
    key: 'enquiries',
    label: 'Enquiries',
    actions: [
      { key: 'view', label: 'View Enquiries' },
      { key: 'edit', label: 'Edit Enquiries' },
      { key: 'delete', label: 'Delete Enquiries' }
    ]
  },
  {
    key: 'reviews',
    label: 'Reviews',
    actions: [
      { key: 'view', label: 'View Reviews' },
      { key: 'approve', label: 'Approve Reviews' },
      { key: 'edit', label: 'Edit Reviews' },
      { key: 'delete', label: 'Delete Reviews' }
    ]
  },
  {
    key: 'gallery',
    label: 'Gallery',
    actions: [
      { key: 'view', label: 'View Gallery' },
      { key: 'upload', label: 'Upload to Gallery' },
      { key: 'approve', label: 'Approve Gallery Items' },
      { key: 'edit', label: 'Edit Gallery Items' },
      { key: 'delete', label: 'Delete Gallery Items' }
    ]
  },
  {
    key: 'backup',
    label: 'Backup',
    actions: [
      { key: 'export', label: 'Export Backup' },
      { key: 'import', label: 'Import Backup' }
    ]
  },
  {
    key: 'settings',
    label: 'Settings',
    actions: [
      { key: 'view', label: 'View Settings' },
      { key: 'edit', label: 'Edit Settings' }
    ]
  },
  {
    key: 'subadmins',
    label: 'Sub Admins',
    actions: [
      { key: 'view', label: 'View Sub Admins' },
      { key: 'create', label: 'Create Sub Admins' },
      { key: 'edit', label: 'Edit Sub Admins' },
      { key: 'delete', label: 'Delete Sub Admins' }
    ]
  }
]
