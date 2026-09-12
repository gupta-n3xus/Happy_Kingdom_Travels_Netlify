import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, FileCheck, AlertTriangle, CheckCircle, ClipboardList, Shield } from 'lucide-react'
import SEO from '../../components/SEO'
import Breadcrumbs from '../../components/Breadcrumbs'
import FAQAccordion from '../../components/FAQAccordion'
import { useBusinessContact } from '../../context/SettingsContext'
import { createWhatsAppUrl } from '../../utils/createWhatsAppUrl'
import { createGuideMessage } from '../../utils/createWhatsAppMessage'

const documents = [
  {
    icon: FileCheck,
    title: 'Valid Indian Passport',
    description: 'A valid Indian passport is one of the primary accepted travel documents for Bhutan entry. Ensure your passport is valid for the duration of your stay.',
  },
  {
    icon: FileCheck,
    title: 'Voter ID (Where Currently Accepted)',
    description: 'Voter ID has been accepted for Bhutan entry in the past. Verify current acceptance with official sources before travelling.',
  },
]

const checklistItems = [
  'Valid travel document (Passport or currently accepted identification)',
  'Required identification documents',
  'Child documentation if travelling with minors',
  'Applicable Bhutan entry permit',
  'Applicable Sustainable Development Fee (SDF)',
  'Hotel or booking information',
  'Travel itinerary details',
  'Emergency contact information',
  'Copies of important documents (digital and physical)',
]

export default function EntryRequirements() {
  const BUSINESS_CONTACT = useBusinessContact();

  const faqs = [
    {
      question: 'Do Indians need a visa for Bhutan?',
      answer: 'Indian nationals have specific entry requirements for Bhutan. Please verify current requirements with official sources before travel.',
    },
    {
      question: 'What documents do Indians need to visit Bhutan?',
      answer: 'Accepted documents may include a valid Indian passport or Voter ID. Requirements can change so verify before travel.',
    },
    {
      question: 'Is a passport required?',
      answer: 'A valid passport is one of the accepted travel documents. Check current requirements for the most up-to-date information.',
    },
    {
      question: 'Is Voter ID accepted?',
      answer: 'Voter ID has been accepted for Bhutan entry in the past. Verify current acceptance with official sources.',
    },
    {
      question: 'Is Aadhaar accepted for Bhutan travel?',
      answer: 'Do not rely on Aadhaar alone unless current official requirements specifically confirm its acceptance.',
    },
    {
      question: 'What documents are required for children?',
      answer: 'Children may need birth certificates, passports and parent/guardian identification. Requirements can differ from adults.',
    },
    {
      question: 'What is the Bhutan entry permit?',
      answer: 'Indian travellers must complete applicable Bhutan entry and immigration formalities.',
    },
    {
      question: 'What is SDF?',
      answer: 'The Sustainable Development Fee is part of Bhutan\'s tourism framework. The amount and rules can change per government policy.',
    },
    {
      question: `Can ${BUSINESS_CONTACT.companyName} help with entry formalities?`,
      answer: 'Yes, we provide guidance and assistance with applicable documentation and permit processes as part of relevant packages.',
    },
    {
      question: 'Can Bhutan entry requirements change?',
      answer: 'Yes, immigration and tourism regulations may change. Always verify current requirements before travelling.',
    },
  ]

  return (
    <>
      <SEO
        title={`Bhutan Entry Requirements for Indians – Documents & Permit Guide | ${BUSINESS_CONTACT.companyName}`}
        description="Complete guide to Bhutan entry requirements for Indian travellers. Learn about required documents, permits, SDF, and everything you need for a smooth entry into Bhutan."
        keywords="bhutan entry requirements, bhutan visa for indians, bhutan permit, bhutan documents required, bhutan entry permit, indian nationals bhutan, sustainable development fee"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-forest/95 to-forest text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: 'Travel Guide', path: '/travel-guide' },
              { label: 'Entry Requirements' },
            ]}
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Bhutan Entry Requirements for Indian Travellers
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mb-8">
            Everything you need to know about documents, permits and requirements for Indian nationals travelling to Bhutan. Stay informed and travel with confidence.
          </p>
        </div>
      </section>

      {/* Documents Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-8 bg-gold rounded-full" />
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Documents for Indian Travellers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {documents.map((doc, index) => {
            const Icon = doc.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{doc.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{doc.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Aadhaar Warning */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 lg:p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-yellow-800 mb-2">Important Note About Aadhaar</h3>
              <p className="text-yellow-700 leading-relaxed">
                Travellers should not rely on Aadhaar alone as their Bhutan entry document unless the latest official Bhutanese requirements specifically confirm its acceptance. We recommend carrying an accepted travel document such as a valid passport or other currently accepted identification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Children / Minors Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 bg-gold rounded-full" />
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Children / Minors</h2>
          </div>
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
            <p className="text-gray-600 leading-relaxed mb-4">
              Documentation requirements for children and minors travelling to Bhutan may differ from those for adults. Parents and guardians should be prepared with the following:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-forest mt-0.5 shrink-0" />
                <span className="text-gray-600">Birth certificate of the child</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-forest mt-0.5 shrink-0" />
                <span className="text-gray-600">Valid passport for the child (if applicable)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-forest mt-0.5 shrink-0" />
                <span className="text-gray-600">Parent or guardian identification documents</span>
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Requirements can vary based on the child's age and current regulations. Always verify the latest requirements before travelling with minors.
            </p>
          </div>
        </div>
      </section>

      {/* Passport Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-8 bg-gold rounded-full" />
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Passport</h2>
        </div>
        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-forest mt-0.5 shrink-0" />
              <span className="text-gray-600">Always carry your original passport — do not rely solely on photocopies or digital copies for entry formalities.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-forest mt-0.5 shrink-0" />
              <span className="text-gray-600">Verify that your passport is valid for the entire duration of your stay in Bhutan.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-forest mt-0.5 shrink-0" />
              <span className="text-gray-600">Do not rely on photocopies alone for immigration purposes — original documents are typically required.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-forest mt-0.5 shrink-0" />
              <span className="text-gray-600">Keep digital backups of your passport and important documents stored securely (cloud storage or email) in case of emergency.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Entry Permit Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 bg-gold rounded-full" />
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Bhutan Entry Permit</h2>
          </div>
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
            <p className="text-gray-600 leading-relaxed mb-4">
              Indian travellers must complete applicable Bhutan entry and immigration formalities before or upon arrival in Bhutan. The entry permit process may involve submitting required documents and completing formalities at the designated entry points.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Entry permit requirements can change based on government regulations. It is essential to verify the current requirements before your travel dates.
            </p>
            <p className="text-gray-600 leading-relaxed">
              {BUSINESS_CONTACT.companyName} provides guidance and assistance with the applicable documentation and permit processes as part of our relevant tour packages. Our team can help you understand what is needed for a smooth entry into Bhutan.
            </p>
          </div>
        </div>
      </section>

      {/* SDF Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-8 bg-gold rounded-full" />
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Sustainable Development Fee (SDF)</h2>
        </div>
        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
          <p className="text-gray-600 leading-relaxed mb-4">
            The Sustainable Development Fee (SDF) is part of Bhutan's tourism framework. It contributes to:
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-forest mt-0.5 shrink-0" />
              <span className="text-gray-600">Environmental conservation efforts</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-forest mt-0.5 shrink-0" />
              <span className="text-gray-600">Cultural preservation initiatives</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-forest mt-0.5 shrink-0" />
              <span className="text-gray-600">Infrastructure development</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-forest mt-0.5 shrink-0" />
              <span className="text-gray-600">Sustainable tourism practices</span>
            </li>
          </ul>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
              <p className="text-yellow-700 text-sm leading-relaxed">
                The applicable SDF amount and rules can change. Your quotation should clearly state whether applicable SDF charges are included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 bg-gold rounded-full" />
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Entry Requirements Checklist</h2>
          </div>
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
            <p className="text-gray-600 mb-6">Use this checklist to ensure you have everything ready for your Bhutan trip:</p>
            <div className="space-y-4">
              {checklistItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 border-2 border-forest rounded shrink-0 mt-0.5" />
                  <span className="text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Government Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 lg:p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-800 mb-2">Important Government Disclaimer</h3>
              <p className="text-blue-700 leading-relaxed">
                Bhutan's immigration, entry, permit and tourism regulations may change. The information provided is general travel guidance. Travellers should verify the latest requirements with relevant Bhutanese authorities before travelling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <ClipboardList className="w-8 h-8 text-forest" />
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Confused about Bhutan entry requirements?</h2>
          </div>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our team can help you understand the documentation and requirements for your specific trip. Contact us for personalized guidance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={createWhatsAppUrl(createGuideMessage('Bhutan Entry Requirements', BUSINESS_CONTACT.companyName))}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-green-700 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
            <a
              href={BUSINESS_CONTACT.phoneLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest text-white px-8 py-3.5 rounded-xl font-bold hover:bg-forest/90 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-8 bg-gold rounded-full" />
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
        </div>
        <div className="max-w-4xl mx-auto">
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-br from-forest/95 to-forest text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Plan Your Bhutan Trip?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Let {BUSINESS_CONTACT.companyName} help you plan a memorable journey to Bhutan. We can guide you through the documentation and planning process.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/bhutan-tour-packages"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold text-forest px-8 py-3.5 rounded-xl font-bold hover:bg-gold/90 transition-all"
            >
              Explore Packages
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/customize-your-trip"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-forest px-8 py-3.5 rounded-xl font-bold hover:bg-white/90 transition-all"
            >
              Customize Trip
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={createWhatsAppUrl(createGuideMessage('Bhutan Entry Requirements', BUSINESS_CONTACT.companyName))}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-green-700 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
