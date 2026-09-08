import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav className="flex items-center text-sm text-muted py-4" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-primary transition-colors flex items-center">
        <Home className="w-4 h-4" />
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-2" />
          {item.path && index < items.length - 1 ? (
            <Link to={item.path} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-charcoal font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

export default Breadcrumbs
