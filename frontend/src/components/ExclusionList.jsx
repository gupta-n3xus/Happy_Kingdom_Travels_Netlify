import { XCircle } from 'lucide-react'

const ExclusionList = ({ exclusions }) => {
  if (!exclusions || exclusions.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {exclusions.map((item, index) => (
        <div key={index} className="flex items-start">
          <XCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 shrink-0" />
          <span className="text-charcoal">{item.text || item}</span>
        </div>
      ))}
    </div>
  )
}

export default ExclusionList
