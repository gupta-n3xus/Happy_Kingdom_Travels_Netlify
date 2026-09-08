import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQAccordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  if (!faqs || faqs.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index

        return (
          <div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full p-5 flex items-center justify-between text-left hover:bg-warmWhite transition-colors"
            >
              <span className="font-medium text-charcoal pr-4">{faq.question}</span>
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-primary shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted shrink-0" />
              )}
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}
            >
              <div className="px-5 pb-5 text-muted leading-relaxed border-t border-gray-100 pt-4">
                {faq.answer}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FAQAccordion
