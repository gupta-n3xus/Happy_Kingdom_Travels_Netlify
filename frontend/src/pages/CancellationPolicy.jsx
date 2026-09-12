import { Link } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import { useBusinessContact } from '../context/SettingsContext'

const cancellationTerms = [
  { period: 'More than 45 days before departure', charge: '20% of the booking value', status: 'favorable' },
  { period: '30–45 days before departure', charge: '30% of the booking value', status: 'moderate' },
  { period: '15–29 days before departure', charge: '50% of the booking value', status: 'moderate' },
  { period: '7–14 days before departure', charge: '75% of the booking value', status: 'strict' },
  { period: '0–6 days before departure', charge: '100% of the booking value', status: 'unfavorable' },
  { period: 'No-show', charge: '100% of the booking value', status: 'unfavorable' },
]

const CancellationPolicy = () => {
  const BUSINESS_CONTACT = useBusinessContact();
  return (
    <>
      <SEO
        title={`Cancellation & Refund Policy | ${BUSINESS_CONTACT.companyName}`}
        description={`Cancellation and refund policy for Bhutan tour packages booked with ${BUSINESS_CONTACT.companyName}. Understand our cancellation terms, refund process, and important conditions.`}
      />

      <section className="relative h-48 bg-gradient-to-r from-primary to-secondary flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <Breadcrumbs items={[{ label: 'Cancellation Policy' }]} />
          <h1 className="font-display text-4xl font-bold">Cancellation & Refund Policy</h1>
        </div>
      </section>

      <section className="py-16 bg-warmWhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm prose prose-lg max-w-none">
            <p className="text-muted text-sm">Last Updated: September 3, 2026</p>

            <p>
              This Cancellation & Refund Policy explains the cancellation, modification, and refund terms
              applicable to travel services booked through <strong>{BUSINESS_CONTACT.companyName}</strong> ("Happy
              Kingdom Travels", "we", "us", or "our").
            </p>
            <p>
              This policy applies to Bhutan tour packages, customized trips, accommodation, transportation,
              sightseeing arrangements, and other travel services unless different terms are specifically
              stated in the customer's quotation or booking confirmation.
            </p>
            <p>
              By making a booking with {BUSINESS_CONTACT.companyName}, you acknowledge and agree to the applicable
              cancellation terms.
            </p>

            <h2>1. General Cancellation Principles</h2>
            <p>
              Travel bookings involve commitments to hotels, transportation providers, guides, government
              authorities, permit services, and other third-party suppliers.
            </p>
            <p>Once a booking is confirmed, some amounts may become non-refundable.</p>
            <p>Cancellation charges therefore depend on:</p>
            <ul>
              <li>Date of cancellation</li>
              <li>Travel date</li>
              <li>Hotel cancellation policy</li>
              <li>Transportation cancellation policy</li>
              <li>Permit and government charges</li>
              <li>Guide bookings</li>
              <li>Activity bookings</li>
              <li>Supplier penalties</li>
              <li>Payment processing charges</li>
              <li>Non-refundable reservations</li>
              <li>Other costs already incurred for the booking</li>
            </ul>
            <p>
              The exact refund amount will be calculated based on the confirmed booking and the actual
              cancellation costs applicable to the services booked.
            </p>

            <h2>2. Cancellation Request</h2>
            <p>
              Customers wishing to cancel a booking must contact {BUSINESS_CONTACT.companyName} through an official
              communication channel.
            </p>
            <p>Cancellation requests may be submitted through:</p>
            <p>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${BUSINESS_CONTACT.email}`} className="text-primary">
                {BUSINESS_CONTACT.email}
              </a>
            </p>
            <p>
              or through the official WhatsApp/contact channel provided on our website.
            </p>
            <p>Where possible, cancellation requests should include:</p>
            <ul>
              <li>Customer name</li>
              <li>Booking reference</li>
              <li>Travel dates</li>
              <li>Package name</li>
              <li>Reason for cancellation</li>
              <li>Payment/transaction reference</li>
            </ul>
            <p>
              The effective cancellation date will generally be the date on which the cancellation request is
              received and acknowledged by {BUSINESS_CONTACT.companyName}.
            </p>
            <p>
              A WhatsApp message or email requesting cancellation does not automatically guarantee that a
              refund is available.
            </p>

            <h2>3. Recommended Cancellation Schedule</h2>
            <p>
              Unless your quotation or booking confirmation specifies different supplier-specific terms, the
              following cancellation schedule may apply to the <strong>eligible refundable portion</strong> of
              a booking:
            </p>

            <div className="not-prose mt-8">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="px-6 py-4 text-left font-medium">Cancellation Period</th>
                      <th className="px-6 py-4 text-right font-medium">Cancellation Charge</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cancellationTerms.map((term, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-warmWhite' : 'bg-white'}
                      >
                        <td className="px-6 py-4 border-b font-medium text-charcoal">
                          {term.period}
                        </td>
                        <td className="px-6 py-4 border-b text-right">
                          <span
                            className={`font-medium ${
                              term.status === 'favorable'
                                ? 'text-green-600'
                                : term.status === 'moderate'
                                ? 'text-amber-600'
                                : 'text-red-600'
                            }`}
                          >
                            {term.charge}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              <strong>Important:</strong> These percentages are subject to the actual non-refundable costs
              already incurred.
            </p>
            <p>
              If actual supplier or government cancellation charges are higher than the percentages above, the
              actual applicable charges may be deducted from the amount refundable to the customer, subject to
              applicable law and the booking confirmation.
            </p>

            <h2>4. Government Fees, Permits and SDF</h2>
            <p>Government-related charges may include, where applicable:</p>
            <ul>
              <li>Bhutan Sustainable Development Fee (SDF)</li>
              <li>Immigration charges</li>
              <li>Permit fees</li>
              <li>Documentation charges</li>
              <li>Other mandatory government fees</li>
            </ul>
            <p>
              Government charges that are non-refundable under the applicable rules may be deducted from any
              refund.
            </p>
            <p>
              If government authorities change their refund or cancellation rules, those rules may apply to the
              relevant portion of the booking.
            </p>

            <h2>5. Hotel Cancellation</h2>
            <p>Hotels may have their own cancellation and refund policies.</p>
            <p>If a hotel reservation has already been confirmed, the refund may depend on:</p>
            <ul>
              <li>Hotel cancellation deadline</li>
              <li>Room category</li>
              <li>Seasonal restrictions</li>
              <li>Special promotional rates</li>
              <li>Non-refundable booking conditions</li>
              <li>Number of rooms booked</li>
              <li>Supplier-specific rules</li>
            </ul>
            <p>
              If the hotel does not provide a refund, the corresponding amount may not be refundable to the
              customer.
            </p>

            <h2>6. Transportation Cancellation</h2>
            <p>
              Transportation arrangements may include private vehicles, shared vehicles, airport transfers, or
              other transport services.
            </p>
            <p>
              Cancellation charges may apply depending on the transport provider's terms and the time of
              cancellation.
            </p>
            <p>
              Where the transportation provider has already been paid and the payment is non-refundable, that
              amount may be deducted from the customer's refund.
            </p>

            <h2>7. Guide and Activity Cancellation</h2>
            <p>
              Guide services, sightseeing activities, adventure activities, excursions, and other experiences
              may have separate cancellation conditions.
            </p>
            <p>
              If a guide, activity operator, or local service provider charges a cancellation fee, that amount
              may be deducted from the refundable amount.
            </p>

            <h2>8. Non-Refundable Services</h2>
            <p>
              Certain services may be explicitly identified as <strong>non-refundable</strong> at the time of
              booking.
            </p>
            <p>These may include:</p>
            <ul>
              <li>Non-refundable hotel rates</li>
              <li>Certain permits</li>
              <li>Government charges</li>
              <li>Special activity bookings</li>
              <li>Advance supplier payments</li>
              <li>Promotional rates</li>
              <li>Certain transportation arrangements</li>
              <li>Payment gateway or transaction charges where applicable</li>
              <li>Other services specifically identified as non-refundable</li>
            </ul>
            <p>
              Customers will be informed of material non-refundable components where reasonably practicable
              before confirmation.
            </p>

            <h2>9. No-Show</h2>
            <p>
              If a customer fails to arrive for a confirmed booking without providing prior notice, the
              booking may be treated as a <strong>no-show</strong>.
            </p>
            <p>A no-show may result in:</p>
            <ul>
              <li>Loss of the booking</li>
              <li>Loss of advance payment</li>
              <li>Non-refundable hotel charges</li>
              <li>Non-refundable transportation charges</li>
              <li>Other supplier charges</li>
            </ul>
            <p>
              No refund will generally be provided for a no-show, subject to applicable law and any refund
              received from suppliers.
            </p>

            <h2>10. Late Arrival</h2>
            <p>
              If a customer arrives late and is unable to use part of the confirmed itinerary,
              accommodation, transportation, sightseeing, or other services, the unused portion may not be
              refundable.
            </p>
            <p>
              Customers should contact {BUSINESS_CONTACT.companyName} as soon as possible if they expect to arrive
              late.
            </p>

            <h2>11. Early Departure</h2>
            <p>
              If a customer voluntarily leaves a trip before the scheduled completion date, unused services
              are generally non-refundable unless the relevant supplier provides a refund.
            </p>
            <p>Examples include:</p>
            <ul>
              <li>Leaving Bhutan early</li>
              <li>Leaving a hotel before the scheduled checkout date</li>
              <li>Skipping sightseeing</li>
              <li>Not using arranged transportation</li>
              <li>Not participating in an included activity</li>
            </ul>
            <p>Unused services do not automatically qualify for a refund.</p>

            <h2>12. Cancellation Due to Medical Reasons</h2>
            <p>
              If a customer cancels because of illness, injury, or another medical reason, the standard
              cancellation terms may still apply.
            </p>
            <p>
              Customers are strongly encouraged to obtain travel insurance that covers trip cancellation and
              interruption.
            </p>
            <p>
              Where a supplier provides a refund due to a documented medical situation, {BUSINESS_CONTACT.companyName}
              may pass the applicable refundable amount to the customer after deducting permitted charges.
            </p>

            <h2>13. Cancellation Due to Personal Reasons</h2>
            <p>Cancellation due to personal circumstances may include:</p>
            <ul>
              <li>Change of plans</li>
              <li>Family commitments</li>
              <li>Work-related reasons</li>
              <li>Financial reasons</li>
              <li>Personal emergencies</li>
              <li>Change of mind</li>
            </ul>
            <p>
              Such cancellations are subject to the applicable cancellation schedule and supplier terms.
            </p>

            <h2>14. Date Changes</h2>
            <p>
              Instead of cancelling a trip, customers may request a change of travel dates.
            </p>
            <p>Date changes are subject to:</p>
            <ul>
              <li>Hotel availability</li>
              <li>Vehicle availability</li>
              <li>Permit requirements</li>
              <li>Government regulations</li>
              <li>Seasonal pricing</li>
              <li>Supplier policies</li>
              <li>Availability of guides and activities</li>
            </ul>
            <p>
              Additional charges may apply if the new travel dates have higher rates.
            </p>
            <p>
              Any date change is valid only after written confirmation from {BUSINESS_CONTACT.companyName}.
            </p>
            <p>
              A date change may be treated as a cancellation and rebooking if required by a supplier.
            </p>

            <h2>15. Changes to Number of Travellers</h2>
            <p>
              Customers may request to add or remove travellers from a booking.
            </p>
            <p>Changing the number of travellers may affect:</p>
            <ul>
              <li>Hotel rooms</li>
              <li>Vehicle category</li>
              <li>Per-person pricing</li>
              <li>SDF or government charges</li>
              <li>Meals</li>
              <li>Guide requirements</li>
              <li>Other services</li>
            </ul>
            <p>The revised price will be communicated before the change is confirmed.</p>
            <p>Removing travellers may result in cancellation charges.</p>

            <h2>16. Package Modification</h2>
            <p>
              Customers may request modifications to a confirmed itinerary, including:
            </p>
            <ul>
              <li>Hotel upgrades</li>
              <li>Hotel changes</li>
              <li>Additional nights</li>
              <li>Additional sightseeing</li>
              <li>Vehicle upgrades</li>
              <li>Additional activities</li>
              <li>Route changes</li>
              <li>Room changes</li>
            </ul>
            <p>Additional costs may apply.</p>
            <p>
              Previously paid amounts relating to removed services may not always be refundable because
              supplier cancellation conditions may apply.
            </p>

            <h2>17. Cancellation by {BUSINESS_CONTACT.companyName}</h2>
            <p>
              In exceptional circumstances, {BUSINESS_CONTACT.companyName} may need to cancel or substantially modify
              a booking.
            </p>
            <p>Reasons may include:</p>
            <ul>
              <li>Government restrictions</li>
              <li>Border closures</li>
              <li>Major natural disasters</li>
              <li>Severe weather</li>
              <li>Road closures</li>
              <li>Safety concerns</li>
              <li>Supplier failure</li>
              <li>Transportation disruption</li>
              <li>Political or civil disturbance</li>
              <li>Force majeure</li>
              <li>Other circumstances beyond our reasonable control</li>
            </ul>
            <p>
              Where we cancel a booking for reasons within our reasonable control, we will communicate the
              available options to the customer and process applicable refunds in accordance with the booking
              terms and applicable law.
            </p>
            <p>
              Where cancellation results from circumstances beyond our reasonable control, refunds may depend
              on amounts recoverable from hotels, transport providers, government authorities, and other
              suppliers.
            </p>

            <h2>18. Force Majeure</h2>
            <p>
              Force majeure events may include circumstances beyond the reasonable control of {BUSINESS_CONTACT.companyName}
              , including:
            </p>
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
            <p>
              If a trip is affected by a force majeure event, {BUSINESS_CONTACT.companyName} will make reasonable
              efforts to assist customers and explore alternatives where practical.
            </p>
            <p>
              Refunds will depend on the amounts recoverable from relevant suppliers and authorities, subject
              to applicable law.
            </p>

            <h2>19. Weather-Related Cancellation</h2>
            <p>
              Bhutan is a mountainous destination and travel may be affected by weather conditions.
            </p>
            <p>Examples include:</p>
            <ul>
              <li>Heavy rainfall</li>
              <li>Snowfall</li>
              <li>Landslides</li>
              <li>Road closures</li>
              <li>Fog</li>
              <li>Poor visibility</li>
              <li>Severe storms</li>
            </ul>
            <p>
              If weather conditions prevent part of an itinerary from taking place, we may attempt to arrange
              an alternative where practical.
            </p>
            <p>
              Unused services are not automatically refundable where the supplier has already incurred the
              cost.
            </p>

            <h2>20. Road Closures and Travel Disruptions</h2>
            <p>
              If roads are closed or transportation becomes unavailable due to circumstances outside our
              control, we will make reasonable efforts to modify the itinerary.
            </p>
            <p>
              Additional transportation, accommodation, or other costs may arise.
            </p>
            <p>
              Where such costs are not covered by suppliers or insurance, the customer may be responsible for
              applicable additional expenses, subject to applicable law.
            </p>

            <h2>21. Flight Cancellation or Delay</h2>
            <p>
              If flights are booked separately or included as part of a specific package, the airline's
              cancellation and refund rules will apply to the flight component.
            </p>
            <p>Airline refunds are generally subject to:</p>
            <ul>
              <li>Airline fare rules</li>
              <li>Cancellation charges</li>
              <li>Taxes</li>
              <li>Fare conditions</li>
              <li>No-show rules</li>
              <li>Airline processing timelines</li>
            </ul>
            <p>
              {BUSINESS_CONTACT.companyName} cannot guarantee an airline refund where the airline does not provide one.
            </p>

            <h2>22. Refund Calculation</h2>
            <p>When a refund is applicable, the refundable amount may be calculated as:</p>
            <p><strong>Amount Paid</strong></p>
            <p>minus</p>
            <p><strong>Applicable Cancellation Charges</strong></p>
            <p>minus</p>
            <p><strong>Non-Refundable Supplier Costs</strong></p>
            <p>minus</p>
            <p><strong>Government/Permit Charges that are Non-Refundable</strong></p>
            <p>minus</p>
            <p><strong>Applicable Payment/Transaction Charges</strong></p>
            <p>equals</p>
            <p><strong>Refund Amount</strong></p>
            <p>The exact calculation will depend on the customer's booking.</p>

            <h2>23. Refund Processing Time</h2>
            <p>
              Once a refund is approved, {BUSINESS_CONTACT.companyName} will initiate the refund through the applicable
              payment method or process.
            </p>
            <p>
              The time taken for the funds to reach the customer's account may depend on:
            </p>
            <ul>
              <li>Bank processing</li>
              <li>Payment gateway</li>
              <li>Card issuer</li>
              <li>UPI provider</li>
              <li>Supplier refund timelines</li>
              <li>International payment systems, where applicable</li>
            </ul>
            <p>Third-party processing delays may therefore affect the final credit date.</p>

            <h2>24. Refund Method</h2>
            <p>
              Where reasonably possible, refunds will be made to the original payment method used for the
              booking.
            </p>
            <p>
              We may request additional information where necessary to process the refund securely.
            </p>
            <p>
              We will not knowingly process a refund to an unrelated third party unless appropriate
              authorization and verification have been completed.
            </p>

            <h2>25. Partial Refunds</h2>
            <p>
              If only part of a booking is cancelled or a particular service is removed, the refund will be
              calculated based on the refundable value of the affected service.
            </p>
            <p>Examples include:</p>
            <ul>
              <li>Removing one hotel night</li>
              <li>Removing an excursion</li>
              <li>Reducing the number of travellers</li>
              <li>Removing a vehicle upgrade</li>
              <li>Removing an optional activity</li>
            </ul>
            <p>
              A partial cancellation does not necessarily result in a proportional refund because supplier
              cancellation policies may apply.
            </p>

            <h2>26. Unused Services</h2>
            <p>
              No automatic refund will generally be provided for services that a customer voluntarily chooses
              not to use after the trip has commenced.
            </p>
            <p>This includes:</p>
            <ul>
              <li>Unused hotel nights</li>
              <li>Missed sightseeing</li>
              <li>Unused meals</li>
              <li>Unused transportation</li>
              <li>Optional activities not taken</li>
              <li>Early departure</li>
            </ul>
            <p>
              If a supplier provides a refund for an unused service, we may pass the refundable amount to the
              customer after applicable deductions.
            </p>

            <h2>27. Special Promotional Packages</h2>
            <p>
              Promotional, discounted, seasonal, or special-rate packages may have different cancellation
              conditions.
            </p>
            <p>
              Where different cancellation conditions apply, they will be communicated in the relevant
              quotation or booking confirmation.
            </p>
            <p>
              In the event of a conflict between this general policy and a clearly stated special booking
              condition, the specific booking condition may apply, subject to applicable law.
            </p>

            <h2>28. Customer Disputes Regarding Refunds</h2>
            <p>
              If you believe a refund has been incorrectly calculated, please contact us with:
            </p>
            <ul>
              <li>Booking reference</li>
              <li>Customer name</li>
              <li>Payment details</li>
              <li>Cancellation date</li>
              <li>Relevant communication</li>
              <li>Reason for the dispute</li>
            </ul>
            <p>We will review the booking and applicable supplier terms.</p>

            <h2>29. Consumer Rights</h2>
            <p>
              Nothing in this Cancellation & Refund Policy is intended to remove, restrict, or waive any
              rights or remedies that cannot legally be excluded under applicable law.
            </p>
            <p>
              Where applicable law provides a customer with rights that are more favorable than the terms
              stated in this policy, those legal rights will apply.
            </p>

            <h2>30. Changes to This Policy</h2>
            <p>
              {BUSINESS_CONTACT.companyName} may update this Cancellation & Refund Policy from time to time.
            </p>
            <p>Updates may be made due to:</p>
            <ul>
              <li>Changes in our services</li>
              <li>Changes in supplier policies</li>
              <li>Changes in government regulations</li>
              <li>Changes in booking procedures</li>
              <li>Changes in applicable law</li>
              <li>Expansion into additional destinations</li>
            </ul>
            <p>
              The latest version will be published on this page with an updated <strong>Last Updated</strong>{' '}
              date.
            </p>
            <p>
              For an existing confirmed booking, the cancellation terms communicated in the applicable booking
              confirmation may also apply.
            </p>

            <h2>31. Contact Us</h2>
            <p>
              For cancellation, modification, or refund-related questions, contact:
            </p>
            <h3>{BUSINESS_CONTACT.companyName}</h3>
            <p>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${BUSINESS_CONTACT.email}`} className="text-primary">
                {BUSINESS_CONTACT.email}
              </a>
            </p>
            <p>
              <strong>WhatsApp:</strong> Available through the official WhatsApp option on our website.
            </p>
            <p>
              When contacting us, please provide your booking reference and relevant travel details.
            </p>

            <h2>Customer Acknowledgement</h2>
            <p>Before making a booking, customers should carefully review:</p>
            <ul>
              <li>Tour package inclusions</li>
              <li>Tour package exclusions</li>
              <li>Payment terms</li>
              <li>Cancellation terms</li>
              <li>Refund terms</li>
              <li>Travel documentation requirements</li>
              <li>Applicable government charges</li>
              <li>Any special conditions stated in the quotation</li>
            </ul>
            <p>
              By making a payment toward a booking, the customer acknowledges that they have had an
              opportunity to review the applicable cancellation and refund conditions, subject to applicable
              law.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default CancellationPolicy
