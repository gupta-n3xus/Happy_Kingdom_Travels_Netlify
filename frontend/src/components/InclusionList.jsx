import { CheckCircle } from 'lucide-react'

const InclusionList = ({ inclusions }) => {
  if (!inclusions || inclusions.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {inclusions.map((item, index) => (
        <div key={index} className="flex items-start">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 shrink-0" />
          <span className="text-charcoal">{item.text || item}</span>
        </div>
      ))}
    </div>
  )
}

export default InclusionList
