import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import { useBusinessContact } from '../context/SettingsContext'
import { createWhatsAppUrl } from '../utils/createWhatsAppUrl'
import { createGuideMessage } from '../utils/createWhatsAppMessage'

const faqs = [
  {
    category: 'Planning & Booking',
    items: [
      {
        q: 'How can I travel to Bhutan from India?',
        a: 'Indian travellers can reach Bhutan by road or air. For road-based tours, we can arrange pickup from NJP Railway Station or Bagdogra Airport and take care of the onward travel arrangements towards the Bhutan border. Our team can coordinate transportation, accommodation, sightseeing, permits and other services according to your selected package.',
      },
      {
        q: 'Which documents are required for Indians travelling to Bhutan?',
        a: 'Indian travellers should carry valid original identification/travel documents as required for Bhutan entry. Depending on the traveller\'s age and current regulations, accepted documents may include a valid Indian passport or Voter ID. We recommend carrying the original documents rather than relying only on photocopies or digital copies.',
      },
      {
        q: 'Is Aadhaar Card accepted for Bhutan travel?',
        a: 'Travellers should not assume that Aadhaar alone is sufficient for Bhutan entry. We recommend carrying an accepted travel document such as a valid Indian Passport or Voter ID, according to the latest applicable Bhutan entry requirements. Our team can guide you through the documentation process before your trip.',
      },
      {
        q: 'Can you pick me up from NJP or Bagdogra Airport?',
        a: 'Yes. Happy Kingdom Travels can arrange pickup from NJP Railway Station or Bagdogra Airport for applicable Bhutan packages. You can provide your train or flight details while making your enquiry so that we can plan the pickup and onward transfer accordingly.',
      },
      {
        q: 'Can I start my Bhutan trip from Mumbai, Delhi, Kolkata or another Indian city?',
        a: 'Yes. You can travel from your home city to NJP Railway Station or Bagdogra Airport, depending on your package and transportation plan. We can help you plan the Bhutan portion of your journey after you reach the designated pickup point. Our trip-planning team can also guide you regarding suitable arrival and departure timings.',
      },
      {
        q: 'How far in advance should I book my Bhutan trip?',
        a: 'We recommend booking as early as practical, particularly during popular travel seasons and holidays. Early booking gives you a better chance of securing preferred hotels, vehicle, travel dates, suitable room categories, and preferred itinerary. For customized or larger group trips, earlier planning is especially recommended.',
      },
      {
        q: 'How can I book my Bhutan tour with Happy Kingdom Travels?',
        a: 'Booking is simple: Step 1 — Send your travel dates, starting city, number of travellers and preferred duration. Step 2 — Our team will prepare a suitable Bhutan itinerary and quotation. Step 3 — Review the inclusions, exclusions, payment terms and cancellation conditions. Step 4 — Pay the applicable advance amount to confirm your booking. Step 5 — Our team will coordinate the applicable arrangements and provide the information you need before your journey.',
      },
      {
        q: 'Can I get a Bhutan tour quotation on WhatsApp?',
        a: 'Yes. You can contact Happy Kingdom Travels through WhatsApp and provide your travel city, travel dates, number of adults, number of children, preferred duration, preferred hotel category, and private/shared preference. Our team can use these details to prepare a suitable Bhutan tour quotation.',
      },
    ],
  },
  {
    category: 'Packages & Customization',
    items: [
      {
        q: 'What is included in a Bhutan tour package?',
        a: 'Depending on the package you select, your Bhutan tour may include hotel accommodation, daily breakfast and/or dinner, pickup and drop, transportation during the tour, sightseeing according to the itinerary, Bhutan travel permits, driver services, guide services (where included), applicable government charges (where specifically mentioned), tourist SIM (where included), and other services mentioned in your package. The exact inclusions and exclusions will always be mentioned in your quotation or booking confirmation.',
      },
      {
        q: 'What is usually not included in a Bhutan tour package?',
        a: 'Depending on your selected package, exclusions may include flights or train tickets to the starting point, lunch, personal expenses, shopping, additional sightseeing, optional activities, entry fees where not included, medical expenses, travel expenses outside the agreed itinerary, additional hotel nights, and services not specifically mentioned in the package. Always check the final quotation before making your booking.',
      },
      {
        q: 'Can I customize my Bhutan tour package?',
        a: 'Yes. We can create a customized Bhutan itinerary according to your travel dates, budget, number of travellers, hotel preference, number of nights, preferred destinations, transportation requirements, honeymoon requirements, family requirements, group requirements, and sightseeing preferences. If our standard packages do not match your requirements, contact us and we can prepare a customized quotation.',
      },
      {
        q: 'Do you provide customized Bhutan tour packages?',
        a: 'Yes. If you have a specific budget, hotel preference, travel duration or list of places you want to visit, contact us. We can prepare a customized itinerary based on your requirements and available services.',
      },
      {
        q: 'Can I add extra sightseeing to my package?',
        a: 'Yes, additional sightseeing can usually be added if it is practical within your itinerary. Additional transportation, entry fees, activity charges or other costs may apply. Please request the addition before the trip whenever possible.',
      },
      {
        q: 'Can I upgrade my hotel?',
        a: 'Yes, hotel upgrades may be available depending on the destination and hotel availability. You can request higher-category hotels, premium rooms, better room views, resort stays, or luxury accommodation. Any additional cost will be included in your revised quotation.',
      },
    ],
  },
  {
    category: 'Itinerary & Destinations',
    items: [
      {
        q: 'How many days are enough for a Bhutan trip?',
        a: 'It depends on how much of Bhutan you want to explore. Popular durations include 4 Nights / 5 Days for a shorter holiday, 5 Nights / 6 Days for a balanced trip, 6 Nights / 7 Days for exploring major destinations, 7 Nights / 8 Days for more relaxed travel, and 8+ Nights for a longer and deeper experience. For first-time visitors, a 6 Nights / 7 Days Bhutan tour can provide a good balance between sightseeing and travel time.',
      },
      {
        q: 'Which places are covered in your Bhutan tour packages?',
        a: 'The exact destinations depend on the package. Popular Bhutan destinations include Phuentsholing, Thimphu, Punakha, Paro, Dochula Pass, Chele La Pass, Tiger\'s Nest, and other attractions depending on the itinerary. Your selected itinerary will clearly show the destinations and sightseeing points included.',
      },
      {
        q: 'Is Tiger\'s Nest included in the Bhutan tour?',
        a: 'Tiger\'s Nest Monastery, also known as Paro Taktsang, is one of Bhutan\'s most popular attractions. Whether the visit is included depends on the selected itinerary. If included, the itinerary will mention the Tiger\'s Nest visit and any applicable transportation or activity details.',
      },
      {
        q: 'What is the best time to visit Bhutan?',
        a: 'Bhutan can be visited throughout the year, but the experience varies by season. Spring (March to May) is excellent for pleasant weather and blooming flowers. Summer/Monsoon (June to August) brings lush greenery but rain can affect travel. Autumn (September to November) is popular for clear mountain views. Winter (December to February) offers fewer tourists and a quieter experience. The best time depends on your preferred activities and travel style.',
      },
    ],
  },
  {
    category: 'SDF & Government Charges',
    items: [
      {
        q: 'What is the Sustainable Development Fee (SDF) in Bhutan?',
        a: 'The Sustainable Development Fee (SDF) is a government-imposed fee applicable to visitors to Bhutan according to the rules in force at the time of travel. Whether the SDF is included in your package depends on the package selected and the applicable government regulations. Our team will clearly explain the applicable SDF amount and whether it is included in your quotation before booking.',
      },
      {
        q: 'Do Indian citizens need a visa to visit Bhutan?',
        a: 'Indian citizens generally do not require a conventional tourist visa to enter Bhutan, but they must carry the required valid travel documents and obtain the applicable entry permit. The documentation requirements can change, so we recommend confirming the current requirements with our travel team before your journey.',
      },
    ],
  },
  {
    category: 'Hotels & Transportation',
    items: [
      {
        q: 'What type of hotels do you provide?',
        a: 'Hotel category depends on the package selected. Depending on availability and your budget, packages may include standard, deluxe, premium or other suitable accommodation categories. You can also request a hotel upgrade at an additional cost, subject to availability. The final hotel or equivalent property will be mentioned in your quotation or booking confirmation.',
      },
      {
        q: 'Is transportation included in the Bhutan package?',
        a: 'For packages where transportation is included, transportation is arranged according to the itinerary and group size. Depending on the package, vehicles may include suitable cars, SUVs or larger vehicles for groups. The vehicle category and transportation arrangement will be specified in your package quotation.',
      },
      {
        q: 'Is the Bhutan tour private or shared?',
        a: 'It depends on the package you choose. We can offer private Bhutan tours, group tours, family tours, honeymoon tours, and customized tours. If you prefer a completely private trip, tell us when requesting your quotation.',
      },
      {
        q: 'What currency is used in Bhutan?',
        a: 'Bhutan\'s official currency is the Ngultrum (BTN). Indian Rupees are also commonly used in Bhutan, although acceptance can vary depending on the establishment and denomination. We recommend carrying sufficient cash and checking with our travel team about current payment conditions before travelling.',
      },
      {
        q: 'Are ATMs available in Bhutan?',
        a: 'ATMs are available in Bhutan, particularly in major towns, but travellers should not rely entirely on ATM availability. We recommend carrying sufficient emergency cash for your journey. Your travel consultant can provide updated practical advice before departure.',
      },
    ],
  },
  {
    category: 'Rooms & Accommodation',
    items: [
      {
        q: 'How are rooms arranged for couples?',
        a: 'Couples normally receive a private room on double occupancy, subject to the selected hotel and package. There is no requirement for a couple to share their room with another traveller. The exact room category will be specified in your booking confirmation.',
      },
      {
        q: 'How are rooms arranged for solo travellers?',
        a: 'Room arrangements for solo travellers depend on the selected package. For group departures, shared accommodation may be arranged according to the package conditions. If a private room is required, an additional single-room supplement may apply. We will explain the applicable room arrangement before confirming your booking.',
      },
    ],
  },
  {
    category: 'Group & Family Travel',
    items: [
      {
        q: 'Do you offer Bhutan honeymoon packages?',
        a: 'Yes. We can create Bhutan honeymoon packages with suitable accommodation, private transportation, sightseeing and romantic experiences depending on your requirements. You can also customize the number of nights, hotel category and itinerary.',
      },
      {
        q: 'Do you offer Bhutan family tour packages?',
        a: 'Yes. Our Bhutan trips can be planned for families with children, parents and senior travellers. We can consider comfortable hotels, private transportation, suitable sightseeing, relaxed itineraries, room requirements, and travel pace. Tell us the age and number of travellers while requesting a quotation so that we can suggest a suitable itinerary.',
      },
      {
        q: 'Can solo travellers visit Bhutan?',
        a: 'Yes. Solo travellers can travel to Bhutan, subject to the applicable entry and travel regulations. A solo trip may have a higher per-person cost because transportation and accommodation costs are shared among fewer travellers. We can provide a separate quotation based on your requirements.',
      },
      {
        q: 'Is Bhutan suitable for families with children?',
        a: 'Yes. Bhutan can be a wonderful family destination. However, Bhutan has mountainous roads and some attractions involve walking or hiking. We recommend discussing the ages of children and the physical requirements of planned activities before finalizing the itinerary.',
      },
      {
        q: 'Is Bhutan suitable for senior citizens?',
        a: 'Yes, but the itinerary should be planned carefully. We can design a more comfortable itinerary with less strenuous sightseeing, comfortable hotels, suitable transportation, additional rest time, and reduced hiking where possible. Please inform us about any mobility requirements before booking.',
      },
      {
        q: 'Do larger groups get a lower per-person price?',
        a: 'Often, yes. Transportation and other shared costs can be distributed across more travellers, which may reduce the per-person cost. The final price depends on the group size, hotel category, vehicle and itinerary.',
      },
    ],
  },
  {
    category: 'Payment & Pricing',
    items: [
      {
        q: 'How much does a Bhutan tour package cost?',
        a: 'There is no single fixed price for a Bhutan trip. The total cost depends on number of travellers, travel dates, number of nights, hotel category, private or shared transportation, package type, SDF and applicable government charges, guide requirements, activities, and customizations. Contact us with your travel dates and number of travellers for an exact quotation.',
      },
      {
        q: 'What payment is required to confirm a Bhutan tour?',
        a: 'A booking advance is required to confirm your trip. The exact advance amount and payment schedule will be mentioned in your quotation or booking confirmation. The remaining balance must be paid according to the payment terms communicated for your specific booking.',
      },
    ],
  },
  {
    category: 'Changes & Cancellation',
    items: [
      {
        q: 'Can I change my travel dates after booking?',
        a: 'Date changes may be possible depending on hotel availability, transportation availability, permit requirements, government regulations, supplier cancellation policies, and seasonal pricing. Additional charges may apply. Contact us as early as possible if you need to change your travel dates.',
      },
      {
        q: 'What happens if I cancel my Bhutan trip?',
        a: 'Cancellation charges depend on how early the cancellation is made, hotel cancellation policies, transportation cancellation policies, government charges, permits, non-refundable bookings, and other supplier costs. Please refer to our Cancellation & Refund Policy and your individual booking confirmation for the applicable terms.',
      },
    ],
  },
  {
    category: 'Why Happy Kingdom Travels',
    items: [
      {
        q: 'Why should I book my Bhutan trip with Happy Kingdom Travels?',
        a: 'Our goal is to make your Bhutan journey simple and well organized. Depending on your selected package, we can help with Bhutan tour planning, hotel booking, transportation, sightseeing, travel documentation guidance, permit-related assistance, customized itineraries, family and honeymoon trips, group tours, pre-trip support, and assistance during your journey. Instead of managing multiple bookings yourself, you can coordinate your Bhutan trip through one travel team.',
      },
      {
        q: 'Can you arrange everything from NJP/Bagdogra to Bhutan and back?',
        a: 'Yes. For applicable packages, Happy Kingdom Travels can coordinate the Bhutan travel experience from the designated pickup point, including Pickup, Border/Entry Formalities, Bhutan Transportation, Hotels, Sightseeing, and Return Transfer. The exact services included will depend on your selected package.',
      },
      {
        q: 'Do you provide a Bhutan travel guide?',
        a: 'Yes. Our travel team can help you understand Bhutan entry requirements, travel documents, route planning, hotel options, sightseeing, packing, transportation, approximate trip costs, and important travel information. You can contact us before booking for guidance about planning your Bhutan holiday.',
      },
    ],
  },
]

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left hover:text-forest transition-colors"
      >
        <span className="font-medium text-charcoal pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-forest shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-muted leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  )
}

const FAQs = () => {
  const BUSINESS_CONTACT = useBusinessContact();

  return (
    <>
      <SEO
        title="Frequently Asked Questions — Bhutan Tour Packages | Happy Kingdom Travels"
        description="Answers to common questions about Bhutan tour packages, visa, documents, SDF, hotels, transportation, payment, cancellation, and more. Plan your Bhutan trip with Happy Kingdom Travels."
      />

      <section className="relative h-48 bg-gradient-to-r from-primary to-secondary flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <Breadcrumbs items={[{ label: 'FAQs' }]} />
          <h1 className="font-display text-4xl font-bold">Frequently Asked Questions</h1>
        </div>
      </section>

      <section className="py-16 bg-warmWhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-muted text-center mb-12 max-w-2xl mx-auto">
            Planning your Bhutan trip for the first time? Here are answers to some of the most common
            questions travellers ask before booking a Bhutan tour with Happy Kingdom Travels.
          </p>

          <div className="space-y-8">
            {faqs.map((group, groupIndex) => (
              <div key={groupIndex} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-forest/5 border-b border-gray-100">
                  <h2 className="font-display text-lg font-semibold text-charcoal">
                    {group.category}
                  </h2>
                </div>
                <div className="px-6">
                  {group.items.map((faq, faqIndex) => (
                    <FAQItem
                      key={faqIndex}
                      question={faq.q}
                      answer={faq.a}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm text-center">
            <h3 className="font-display text-xl font-semibold text-charcoal mb-3">
              Still Have Questions?
            </h3>
            <p className="text-muted mb-6">
              Every traveller has different requirements. If you cannot find the answer to your
              question here, contact Happy Kingdom Travels and our team will help you plan your
              Bhutan journey.
            </p>
            <a
              href={createWhatsAppUrl(createGuideMessage('Bhutan FAQs'))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-forest text-white px-6 py-3 rounded-lg font-medium hover:bg-forest/90 transition-colors"
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

export default FAQs
