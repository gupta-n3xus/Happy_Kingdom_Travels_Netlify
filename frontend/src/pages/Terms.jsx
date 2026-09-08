import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import { useBusinessContact } from '../context/SettingsContext'

const Terms = () => {
  const BUSINESS_CONTACT = useBusinessContact();
  return (
    <>
      <SEO
        title="Terms & Conditions | Happy Kingdom Travels"
        description="Terms and Conditions for using Happy Kingdom Travels website and travel planning, quotation, booking, and related services."
      />

      <section className="relative h-48 bg-gradient-to-r from-primary to-secondary flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <Breadcrumbs items={[{ label: 'Terms & Conditions' }]} />
          <h1 className="font-display text-4xl font-bold">Terms & Conditions</h1>
        </div>
      </section>

      <section className="py-16 bg-warmWhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm prose prose-lg max-w-none">
            <p className="text-muted text-sm">Last Updated: September 3, 2026</p>

            <p>
              Welcome to <strong>Happy Kingdom Travels</strong> ("Happy Kingdom Travels", "we", "us", "our").
            </p>
            <p>
              These Terms & Conditions ("Terms") govern your use of the Happy Kingdom Travels website and our
              travel planning, quotation, booking, and related services.
            </p>
            <p>
              By accessing our website, submitting an enquiry, requesting a quotation, making a booking, or
              using our services, you agree to these Terms.
            </p>
            <p>
              If you do not agree with these Terms, please do not use our website or services.
            </p>

            <h2>1. About Our Services</h2>
            <p>Happy Kingdom Travels provides travel planning and related services, initially focused on Bhutan travel.</p>
            <p>Our services may include:</p>
            <ul>
              <li>Bhutan tour packages</li>
              <li>Customized Bhutan itineraries</li>
              <li>Honeymoon packages</li>
              <li>Family tours</li>
              <li>Group tours</li>
              <li>Transportation arrangements</li>
              <li>Hotel and accommodation arrangements</li>
              <li>Sightseeing arrangements</li>
              <li>Travel assistance</li>
              <li>Permit and documentation assistance</li>
              <li>Travel quotations</li>
              <li>Other travel-related services</li>
            </ul>
            <p>We may expand our destinations and services in the future.</p>

            <h2>2. Website Information</h2>
            <p>We make reasonable efforts to ensure that information displayed on our website is accurate and up to date.</p>
            <p>However, travel-related information can change due to factors outside our control, including:</p>
            <ul>
              <li>Government regulations</li>
              <li>Immigration requirements</li>
              <li>Permit requirements</li>
              <li>SDF or other government charges</li>
              <li>Hotel availability</li>
              <li>Road conditions</li>
              <li>Weather</li>
              <li>Transportation availability</li>
              <li>Flight schedules</li>
              <li>Local regulations</li>
              <li>Attraction opening hours</li>
              <li>Seasonal restrictions</li>
            </ul>
            <p>Therefore, information shown on the website should not be considered a permanent guarantee of availability, pricing, or travel conditions.</p>
            <p>We reserve the right to correct errors, update information, or modify website content when necessary.</p>

            <h2>3. Tour Packages</h2>
            <p>Our website may display predefined Bhutan tour packages.</p>
            <p>A package may include some or all of the following:</p>
            <ul>
              <li>Accommodation</li>
              <li>Transportation</li>
              <li>Pickup and drop-off</li>
              <li>Sightseeing</li>
              <li>Meals</li>
              <li>Travel assistance</li>
              <li>Permit assistance</li>
              <li>Guide services</li>
              <li>Other services specifically mentioned in the quotation</li>
            </ul>
            <p>The exact inclusions and exclusions applicable to your trip will be those stated in your final quotation and booking confirmation.</p>
            <p>Website package descriptions are provided for general information and may not constitute a final booking agreement.</p>

            <h2>4. Customized Trips</h2>
            <p>Customers may request customized itineraries.</p>
            <p>A customized trip may involve changes to:</p>
            <ul>
              <li>Travel dates</li>
              <li>Number of travellers</li>
              <li>Hotels</li>
              <li>Vehicle type</li>
              <li>Destinations</li>
              <li>Number of nights</li>
              <li>Sightseeing</li>
              <li>Activities</li>
              <li>Meal plans</li>
              <li>Travel style</li>
              <li>Transportation arrangements</li>
            </ul>
            <p>The final price and itinerary for a customized trip will depend on the services selected and availability at the time of booking.</p>
            <p>A customized itinerary becomes confirmed only after the customer accepts the quotation and completes the required payment.</p>

            <h2>5. Quotations</h2>
            <p>A quotation provided by Happy Kingdom Travels is based on the information available to us at the time it is prepared.</p>
            <p>Unless otherwise specified in writing:</p>
            <ul>
              <li>Quotations are subject to availability.</li>
              <li>Hotel availability is not guaranteed until confirmed.</li>
              <li>Transportation availability is not guaranteed until confirmed.</li>
              <li>Government charges may change.</li>
              <li>Permit requirements may change.</li>
              <li>Prices may change before confirmation.</li>
              <li>Additional services requested after quotation may result in additional charges.</li>
            </ul>
            <p>A quotation does not constitute a confirmed booking.</p>
            <p>The final booking price and inclusions will be confirmed in the booking confirmation issued by Happy Kingdom Travels.</p>

            <h2>6. Pricing</h2>
            <p>Package prices may depend on:</p>
            <ul>
              <li>Number of travellers</li>
              <li>Travel dates</li>
              <li>Number of nights</li>
              <li>Hotel category</li>
              <li>Room configuration</li>
              <li>Vehicle type</li>
              <li>Meal plan</li>
              <li>Seasonal demand</li>
              <li>Government charges</li>
              <li>Permit requirements</li>
              <li>Activities</li>
              <li>Exchange rates, where applicable</li>
              <li>Other third-party costs</li>
            </ul>
            <p>Unless explicitly stated, the package price does not automatically include every expense associated with a trip.</p>
            <p>Customers should carefully review the "Inclusions" and "Exclusions" sections of their quotation before making payment.</p>

            <h2>7. Taxes and Government Charges</h2>
            <p>Where applicable, taxes, government fees, permits, tourism charges, Sustainable Development Fee (SDF), immigration charges, or other mandatory government charges may be included in or excluded from the quoted price.</p>
            <p>The applicable treatment will be specified in your quotation or booking confirmation.</p>
            <p>Government charges may change without prior notice.</p>
            <p>If a mandatory government charge changes after quotation but before travel, the customer may be required to pay the applicable additional amount where such charge is legally required.</p>

            <h2>8. Booking Confirmation</h2>
            <p>A booking is considered confirmed only after:</p>
            <ol>
              <li>The customer has accepted the quotation or booking proposal;</li>
              <li>The required advance payment has been received;</li>
              <li>Required documents have been provided;</li>
              <li>Relevant suppliers or travel arrangements have been confirmed; and</li>
              <li>Happy Kingdom Travels has issued a booking confirmation.</li>
            </ol>
            <p>Submitting an enquiry or communicating through WhatsApp does not by itself create a confirmed booking.</p>

            <h2>9. Advance Payment</h2>
            <p>The advance amount required for a booking will be communicated in the quotation or booking confirmation.</p>
            <p>Depending on the package, the advance may be required to secure:</p>
            <ul>
              <li>Hotels</li>
              <li>Transportation</li>
              <li>Permits</li>
              <li>Guides</li>
              <li>Other travel arrangements</li>
            </ul>
            <p>The remaining balance must be paid according to the payment schedule specified in the booking confirmation.</p>
            <p>Failure to pay the balance by the specified deadline may result in cancellation of some or all travel arrangements.</p>

            <h2>10. Payment Methods</h2>
            <p>We may accept payments through payment methods made available by Happy Kingdom Travels.</p>
            <p>These may include:</p>
            <ul>
              <li>Bank transfer</li>
              <li>UPI</li>
              <li>Online payment gateway</li>
              <li>Other payment methods communicated by our authorized team</li>
            </ul>
            <p>Customers should make payments only through payment details officially provided by Happy Kingdom Travels.</p>
            <p>We will not be responsible for payments made to unauthorized persons or unofficial accounts.</p>

            <h2>11. Payment Receipts</h2>
            <p>Customers should retain payment receipts, transaction references, invoices, quotations, and booking confirmations.</p>
            <p>If you believe a payment has been made but has not been reflected in your booking, please contact us promptly and provide the relevant transaction details.</p>

            <h2>12. Travel Documents</h2>
            <p>Customers are responsible for providing accurate and valid travel documents.</p>
            <p>Depending on the traveller and itinerary, these may include:</p>
            <ul>
              <li>Passport</li>
              <li>Government-issued identification</li>
              <li>Passport photographs</li>
              <li>Travel documents</li>
              <li>Permit-related information</li>
              <li>Other documents required by relevant authorities</li>
            </ul>
            <p>Customers must ensure that the information provided to Happy Kingdom Travels is accurate.</p>
            <p>Incorrect or incomplete information may result in delays, additional charges, refusal of entry, permit issues, or cancellation.</p>

            <h2>13. Bhutan Entry and Immigration Requirements</h2>
            <p>Bhutan entry, immigration, permit, visa, SDF, identification, and other travel requirements are determined by the relevant Bhutanese authorities and may change.</p>
            <p>Happy Kingdom Travels may assist customers with travel documentation and permit-related processes where included in the selected service.</p>
            <p>However, final approval or entry into Bhutan is determined by the relevant government and immigration authorities.</p>
            <p>Happy Kingdom Travels cannot guarantee entry approval where the decision is made by a government authority.</p>
            <p>Customers are responsible for providing correct documents and information within the required time.</p>

            <h2>14. Sustainable Development Fee and Government Regulations</h2>
            <p>Where applicable, the Bhutan Sustainable Development Fee (SDF) and other mandatory government charges may form part of the travel cost.</p>
            <p>Government authorities may change:</p>
            <ul>
              <li>SDF rates</li>
              <li>Eligibility</li>
              <li>Exemptions</li>
              <li>Permit requirements</li>
              <li>Immigration procedures</li>
              <li>Entry requirements</li>
              <li>Travel regulations</li>
            </ul>
            <p>If such requirements change, the customer may be required to pay additional mandatory charges where applicable.</p>

            <h2>15. Accommodation</h2>
            <p>Hotels and accommodation are provided according to the category and specifications stated in the customer's confirmed booking.</p>
            <p>Hotel names may be changed due to:</p>
            <ul>
              <li>Availability</li>
              <li>Operational reasons</li>
              <li>Seasonal closure</li>
              <li>Maintenance</li>
              <li>Government restrictions</li>
              <li>Force majeure</li>
              <li>Supplier-related circumstances</li>
            </ul>
            <p>Where a hotel must be changed, we will make reasonable efforts to provide accommodation of a similar category and standard, subject to availability.</p>
            <p>Specific room views, floor locations, bed configurations, early check-in, late check-out, connecting rooms, or special requests are subject to hotel availability.</p>

            <h2>16. Transportation</h2>
            <p>Transportation services are provided according to the vehicle and itinerary specified in the booking confirmation.</p>
            <p>Vehicle allocation may depend on:</p>
            <ul>
              <li>Number of passengers</li>
              <li>Luggage</li>
              <li>Road conditions</li>
              <li>Availability</li>
              <li>Weather</li>
              <li>Local regulations</li>
              <li>Safety requirements</li>
            </ul>
            <p>Travel times shown in itineraries are approximate and may vary due to road conditions, traffic, weather, checkpoints, construction, or other circumstances.</p>

            <h2>17. Sightseeing</h2>
            <p>Sightseeing listed in an itinerary is subject to:</p>
            <ul>
              <li>Weather</li>
              <li>Road conditions</li>
              <li>Government restrictions</li>
              <li>Attraction operating hours</li>
              <li>Local conditions</li>
              <li>Seasonal accessibility</li>
              <li>Safety considerations</li>
            </ul>
            <p>If an attraction becomes inaccessible, Happy Kingdom Travels may attempt to arrange a reasonable alternative where practical.</p>
            <p>Entrance fees are included only when specifically mentioned in the quotation.</p>

            <h2>18. Activities and Adventure Experiences</h2>
            <p>Certain activities may involve inherent risks.</p>
            <p>Examples may include:</p>
            <ul>
              <li>Hiking</li>
              <li>Trekking</li>
              <li>Rafting</li>
              <li>Mountain activities</li>
              <li>Outdoor excursions</li>
              <li>Adventure activities</li>
            </ul>
            <p>Participation may be subject to:</p>
            <ul>
              <li>Weather</li>
              <li>Physical ability</li>
              <li>Age restrictions</li>
              <li>Safety requirements</li>
              <li>Local operator rules</li>
              <li>Government restrictions</li>
            </ul>
            <p>Customers should inform us about relevant limitations or special requirements before booking.</p>
            <p>Happy Kingdom Travels may decline or modify an activity where it reasonably believes participation would create a significant safety concern.</p>

            <h2>19. Tiger's Nest / Taktsang Hike</h2>
            <p>The Tiger's Nest / Taktsang Monastery hike involves substantial walking and elevation gain.</p>
            <p>Customers are responsible for determining whether they are physically capable of participating.</p>
            <p>The hike may be modified, postponed, or cancelled due to:</p>
            <ul>
              <li>Weather</li>
              <li>Trail conditions</li>
              <li>Government restrictions</li>
              <li>Safety concerns</li>
              <li>Health or physical limitations</li>
            </ul>
            <p>Alternative sightseeing may be considered where reasonably possible.</p>

            <h2>20. Meals</h2>
            <p>Meals are included only where explicitly stated in the booking confirmation.</p>
            <p>Specific restaurants, menus, meal choices, dietary requirements, and meal timings may be subject to availability.</p>
            <p>Customers with dietary restrictions, allergies, or special food requirements should notify us before travel.</p>
            <p>While we may communicate such requests to suppliers, we cannot guarantee that every supplier can accommodate every dietary requirement.</p>

            <h2>21. Travel Delays</h2>
            <p>Travel schedules are estimates and may be affected by:</p>
            <ul>
              <li>Weather</li>
              <li>Road closures</li>
              <li>Traffic</li>
              <li>Natural events</li>
              <li>Vehicle breakdowns</li>
              <li>Flight delays</li>
              <li>Government restrictions</li>
              <li>Immigration procedures</li>
              <li>Political or civil disruptions</li>
              <li>Other circumstances outside our reasonable control</li>
            </ul>
            <p>We will make reasonable efforts to assist customers when disruptions occur.</p>
            <p>Additional costs caused by circumstances outside our control may be payable by the customer unless otherwise agreed or required by applicable law.</p>

            <h2>22. Flight Arrangements</h2>
            <p>If flights are included in a particular package or separately arranged by Happy Kingdom Travels, the flight terms of the relevant airline or booking provider may also apply.</p>
            <p>Flight schedules, delays, cancellations, baggage rules, and refunds are subject to the airline's policies.</p>
            <p>Unless explicitly included, airfare is not included in the tour package.</p>

            <h2>23. Travel Insurance</h2>
            <p>Customers are strongly encouraged to obtain appropriate travel insurance before travelling.</p>
            <p>Depending on the policy, travel insurance may provide protection against:</p>
            <ul>
              <li>Medical emergencies</li>
              <li>Trip cancellation</li>
              <li>Trip interruption</li>
              <li>Lost baggage</li>
              <li>Travel delays</li>
              <li>Other unforeseen circumstances</li>
            </ul>
            <p>Unless explicitly stated in writing, Happy Kingdom Travels does not provide insurance coverage for customers.</p>

            <h2>24. Customer Responsibilities</h2>
            <p>Customers agree to:</p>
            <ul>
              <li>Provide accurate information</li>
              <li>Provide valid travel documents</li>
              <li>Follow applicable laws and regulations</li>
              <li>Follow immigration procedures</li>
              <li>Follow hotel rules</li>
              <li>Follow transportation safety requirements</li>
              <li>Follow guide and driver instructions</li>
              <li>Respect local customs and cultural practices</li>
              <li>Behave responsibly during the trip</li>
              <li>Make required payments on time</li>
              <li>Inform us promptly of relevant changes</li>
              <li>Take reasonable care of personal belongings</li>
            </ul>
            <p>Customers may be responsible for costs arising from damage, misconduct, lost property, or violations caused by them.</p>

            <h2>25. Personal Belongings</h2>
            <p>Customers are responsible for their personal belongings during the trip.</p>
            <p>Happy Kingdom Travels is not responsible for loss, theft, damage, or misplacement of personal belongings unless caused by our proven negligence or as otherwise required by applicable law.</p>
            <p>Customers should avoid carrying unnecessary valuables during travel.</p>

            <h2>26. Health and Medical Conditions</h2>
            <p>Customers are responsible for determining whether they are medically and physically fit to participate in their chosen itinerary and activities.</p>
            <p>Customers should inform us before booking about any condition or requirement that may reasonably affect travel arrangements.</p>
            <p>We may recommend medical or travel advice where appropriate, but Happy Kingdom Travels does not provide medical advice.</p>
            <p>Emergency medical decisions should be made with qualified medical professionals.</p>

            <h2>27. Changes Requested by Customers</h2>
            <p>After booking confirmation, customers may request changes to:</p>
            <ul>
              <li>Travel dates</li>
              <li>Hotels</li>
              <li>Number of travellers</li>
              <li>Vehicle</li>
              <li>Itinerary</li>
              <li>Activities</li>
              <li>Room configuration</li>
              <li>Other services</li>
            </ul>
            <p>Changes are subject to availability and may result in additional charges.</p>
            <p>Any applicable cancellation or supplier charges may also apply.</p>
            <p>Changes are confirmed only after Happy Kingdom Travels provides written confirmation.</p>

            <h2>28. Cancellation by Customer</h2>
            <p>Customers may request cancellation of a booking by contacting Happy Kingdom Travels through our official communication channels.</p>
            <p>Cancellation charges may apply depending on:</p>
            <ul>
              <li>Date of cancellation</li>
              <li>Hotel cancellation policies</li>
              <li>Transportation cancellation policies</li>
              <li>Permit costs</li>
              <li>Government charges</li>
              <li>Supplier penalties</li>
              <li>Activities booked</li>
              <li>Payment gateway charges</li>
              <li>Other non-refundable expenses</li>
            </ul>
            <p>The cancellation and refund terms applicable to a particular booking will be communicated in the quotation, booking confirmation, or applicable Cancellation & Refund Policy.</p>

            <h2>29. Cancellation by Happy Kingdom Travels</h2>
            <p>We reserve the right to cancel or modify a booking where reasonably necessary due to circumstances including:</p>
            <ul>
              <li>Supplier failure</li>
              <li>Government restrictions</li>
              <li>Natural disasters</li>
              <li>Severe weather</li>
              <li>Road closures</li>
              <li>Political or civil disturbances</li>
              <li>Safety concerns</li>
              <li>Operational reasons</li>
              <li>Force majeure</li>
              <li>Other circumstances beyond our reasonable control</li>
            </ul>
            <p>Where we cancel a booking for reasons within our reasonable control, we will communicate the available options to the customer and process applicable refunds in accordance with the agreed booking terms and applicable law.</p>

            <h2>30. Refunds</h2>
            <p>Where a refund is applicable, the amount may depend on:</p>
            <ul>
              <li>Amount actually paid</li>
              <li>Supplier refund received</li>
              <li>Cancellation charges</li>
              <li>Government fees</li>
              <li>Permit charges</li>
              <li>Payment processing charges</li>
              <li>Non-refundable bookings</li>
              <li>Applicable terms of the confirmed booking</li>
            </ul>
            <p>Refund processing times may vary depending on banks, payment providers, hotels, airlines, and other third parties.</p>
            <p>We will communicate applicable refund information to the customer.</p>

            <h2>31. Force Majeure</h2>
            <p>Happy Kingdom Travels will not be responsible for failure or delay in providing services where such failure or delay results from circumstances beyond our reasonable control.</p>
            <p>Such circumstances may include:</p>
            <ul>
              <li>Natural disasters</li>
              <li>Earthquakes</li>
              <li>Floods</li>
              <li>Landslides</li>
              <li>Severe weather</li>
              <li>Epidemics or pandemics</li>
              <li>Government restrictions</li>
              <li>Border closures</li>
              <li>War</li>
              <li>Terrorism</li>
              <li>Civil unrest</li>
              <li>Strikes</li>
              <li>Road closures</li>
              <li>Major transportation disruptions</li>
              <li>Government decisions</li>
              <li>Changes in immigration requirements</li>
              <li>Other extraordinary events</li>
            </ul>
            <p>Where possible, we will make reasonable efforts to assist customers and identify practical alternatives.</p>

            <h2>32. Third-Party Suppliers</h2>
            <p>Travel services may involve independent third-party providers such as:</p>
            <ul>
              <li>Hotels</li>
              <li>Vehicle operators</li>
              <li>Drivers</li>
              <li>Guides</li>
              <li>Activity operators</li>
              <li>Airlines</li>
              <li>Restaurants</li>
              <li>Payment providers</li>
              <li>Government or permit service providers</li>
            </ul>
            <p>These providers may have their own terms, policies, cancellation rules, and operating procedures.</p>
            <p>Happy Kingdom Travels will make reasonable efforts to work with reliable service providers but cannot control every action or decision made by an independent third party.</p>
            <p>Nothing in these Terms excludes rights or remedies that cannot legally be excluded.</p>

            <h2>33. Website Availability</h2>
            <p>We aim to keep our website available and functional.</p>
            <p>However, we do not guarantee that the website will always be:</p>
            <ul>
              <li>Available</li>
              <li>Error-free</li>
              <li>Uninterrupted</li>
              <li>Free from technical problems</li>
              <li>Free from malicious software or security vulnerabilities</li>
            </ul>
            <p>Website availability may be affected by maintenance, hosting problems, internet outages, cyber incidents, or other technical issues.</p>

            <h2>34. Website Content</h2>
            <p>Content on the website may include:</p>
            <ul>
              <li>Package descriptions</li>
              <li>Travel guides</li>
              <li>Images</li>
              <li>Itineraries</li>
              <li>Destination information</li>
              <li>Travel advice</li>
              <li>Pricing information</li>
              <li>Blog articles</li>
            </ul>
            <p>Such content is provided for general information.</p>
            <p>Travel conditions, government regulations, prices, hotel availability, and other information may change.</p>
            <p>Customers should rely on their final quotation and booking confirmation for the terms applicable to their particular trip.</p>

            <h2>35. Images and Representation</h2>
            <p>Images displayed on our website may be used to represent destinations, hotels, activities, landscapes, or experiences.</p>
            <p>Images are intended for illustrative purposes unless explicitly stated otherwise.</p>
            <p>Actual hotels, rooms, vehicles, landscapes, activities, or experiences may differ from photographs displayed on the website.</p>

            <h2>36. Intellectual Property</h2>
            <p>Unless otherwise stated, the content of the Happy Kingdom Travels website, including:</p>
            <ul>
              <li>Logo</li>
              <li>Branding</li>
              <li>Text</li>
              <li>Graphics</li>
              <li>Website design</li>
              <li>Original photographs</li>
              <li>Illustrations</li>
              <li>Icons</li>
              <li>Software</li>
              <li>Layout</li>
              <li>Other original content</li>
            </ul>
            <p>is owned by or licensed to Happy Kingdom Travels.</p>
            <p>You may not reproduce, copy, modify, distribute, sell, publish, or commercially exploit our website content without prior written permission, except where permitted by applicable law.</p>

            <h2>37. Prohibited Use</h2>
            <p>You agree not to use the website to:</p>
            <ul>
              <li>Submit false information</li>
              <li>Impersonate another person</li>
              <li>Attempt unauthorized access</li>
              <li>Introduce malicious software</li>
              <li>Interfere with website operation</li>
              <li>Scrape or copy website content for unauthorized commercial use</li>
              <li>Abuse enquiry or communication systems</li>
              <li>Attempt to access another customer's information</li>
              <li>Engage in fraudulent activity</li>
              <li>Use the website for unlawful purposes</li>
            </ul>
            <p>We reserve the right to restrict access where misuse is suspected.</p>

            <h2>38. Privacy</h2>
            <p>Your use of our website is also governed by our <Link to="/privacy-policy" className="text-primary">Privacy Policy</Link>.</p>
            <p>Our Privacy Policy explains how we collect, use, store, and process personal information.</p>
            <p>By using our website and submitting information, you acknowledge that you have reviewed the Privacy Policy.</p>

            <h2>39. WhatsApp Communication</h2>
            <p>Happy Kingdom Travels may provide WhatsApp communication as a convenient method for enquiries and customer support.</p>
            <p>When using WhatsApp:</p>
            <ul>
              <li>You are responsible for reviewing information before sending it.</li>
              <li>WhatsApp's own terms and privacy policies may apply.</li>
              <li>Messages may contain information you entered into our website forms.</li>
              <li>We cannot guarantee uninterrupted availability of WhatsApp.</li>
            </ul>
            <p>Communication through WhatsApp does not automatically constitute a confirmed booking.</p>
            <p>A booking is confirmed only after the applicable booking process has been completed.</p>

            <h2>40. Email Communication</h2>
            <p>Customers may communicate with Happy Kingdom Travels through:</p>
            <p>
              <a href={`mailto:${BUSINESS_CONTACT.email}`} className="text-primary">{BUSINESS_CONTACT.email}</a>
            </p>
            <p>Email communication may be used for:</p>
            <ul>
              <li>Enquiries</li>
              <li>Quotations</li>
              <li>Booking confirmations</li>
              <li>Travel information</li>
              <li>Customer support</li>
              <li>Other travel-related communications</li>
            </ul>
            <p>Customers should ensure that they provide an accurate email address.</p>

            <h2>41. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites or services.</p>
            <p>These may include:</p>
            <ul>
              <li>Google Maps</li>
              <li>WhatsApp</li>
              <li>Payment providers</li>
              <li>Travel providers</li>
              <li>Social media</li>
              <li>Other external websites</li>
            </ul>
            <p>We do not control these third-party websites and are not responsible for their content, availability, terms, or privacy practices.</p>
            <p>Customers should review the applicable third-party terms before using those services.</p>

            <h2>42. Limitation of Liability</h2>
            <p>To the extent permitted by applicable law, Happy Kingdom Travels will not be responsible for losses arising from circumstances outside our reasonable control, including third-party service failures, weather conditions, government restrictions, transportation disruptions, or other force majeure events.</p>
            <p>Nothing in these Terms is intended to exclude or limit liability where such exclusion or limitation is prohibited by applicable law.</p>

            <h2>43. No Guarantee of Specific Experiences</h2>
            <p>Travel experiences may vary due to circumstances outside our control.</p>
            <p>We do not guarantee:</p>
            <ul>
              <li>Specific weather conditions</li>
              <li>Wildlife sightings</li>
              <li>Specific scenic views</li>
              <li>Exact travel times</li>
              <li>Availability of a particular hotel room</li>
              <li>Specific restaurant seating</li>
              <li>Uninterrupted sightseeing</li>
              <li>Exact attraction operating hours</li>
              <li>Particular local events</li>
              <li>Particular experiences that depend on external circumstances</li>
            </ul>
            <p>We will make reasonable efforts to deliver the confirmed itinerary.</p>

            <h2>44. Complaints</h2>
            <p>If you experience a problem during your trip, please notify Happy Kingdom Travels as soon as reasonably possible.</p>
            <p>Where appropriate, we will attempt to resolve the issue while the trip is ongoing.</p>
            <p>Complaints made after the trip should include:</p>
            <ul>
              <li>Booking reference</li>
              <li>Customer name</li>
              <li>Travel dates</li>
              <li>Details of the issue</li>
              <li>Supporting documents or photographs where applicable</li>
            </ul>
            <p>Prompt notification gives us a better opportunity to investigate and resolve the issue.</p>

            <h2>45. Communication and Notices</h2>
            <p>Official communication may be provided through:</p>
            <ul>
              <li>Email</li>
              <li>WhatsApp</li>
              <li>Telephone</li>
              <li>Written booking documentation</li>
            </ul>
            <p>Customers are responsible for providing accurate contact information and checking important travel communications.</p>

            <h2>46. Changes to These Terms</h2>
            <p>Happy Kingdom Travels may update these Terms from time to time.</p>
            <p>Changes may be made because of:</p>
            <ul>
              <li>Changes to our services</li>
              <li>Changes to booking procedures</li>
              <li>Changes to technology</li>
              <li>Changes to travel regulations</li>
              <li>Changes to applicable laws</li>
              <li>Expansion into new destinations</li>
            </ul>
            <p>The updated version will be published on this page with a revised <strong>Last Updated</strong> date.</p>
            <p>For existing confirmed bookings, the Terms applicable to the booking may be determined by the booking documentation and applicable law.</p>

            <h2>47. Governing Law</h2>
            <p>These Terms shall be governed by the laws applicable in India, subject to applicable consumer protection and other mandatory legal requirements.</p>
            <p>Any dispute will be subject to the jurisdiction of the courts having appropriate jurisdiction over Happy Kingdom Travels, subject to applicable law.</p>

            <h2>48. Severability</h2>
            <p>If any provision of these Terms is determined to be invalid, unlawful, or unenforceable, that provision will be interpreted or modified to the extent necessary to make it enforceable where legally permitted.</p>
            <p>The remaining provisions will continue to remain in effect.</p>

            <h2>49. Entire Agreement</h2>
            <p>The applicable booking confirmation, quotation, package inclusions/exclusions, cancellation policy, Privacy Policy, and these Terms together form the understanding governing the customer's use of our services, subject to applicable law.</p>
            <p>If there is a conflict between general website information and a confirmed booking document, the confirmed booking document will generally govern the specific travel arrangement, subject to applicable law.</p>

            <h2>50. Contact Us</h2>
            <p>If you have questions about these Terms & Conditions, please contact us.</p>
            <h3>Happy Kingdom Travels</h3>
            <p>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${BUSINESS_CONTACT.email}`} className="text-primary">{BUSINESS_CONTACT.email}</a>
            </p>
            <p>
              <strong>WhatsApp:</strong> Available through the WhatsApp contact option on our website
            </p>
            <p>
              <strong>Phone:</strong> Use the official contact number displayed on our website.
            </p>
            <p>For booking-related questions, please include your booking reference or relevant travel details where available.</p>

            <h2>Customer Acknowledgement</h2>
            <p>
              By submitting a booking request, accepting a quotation, making a payment, or proceeding with a
              confirmed trip, you acknowledge that you have had an opportunity to review these Terms &
              Conditions and the applicable booking information.
            </p>
            <p>
              You agree to comply with the applicable terms of your booking, subject to your rights under
              applicable law.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Terms
