import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import { useBusinessContact } from '../context/SettingsContext'

const Privacy = () => {
  const BUSINESS_CONTACT = useBusinessContact();
  return (
    <>
      <SEO
        title={`Privacy Policy | ${BUSINESS_CONTACT.companyName}`}
        description={`Privacy Policy for ${BUSINESS_CONTACT.companyName}. Learn how we collect, use, store, disclose, and protect information when you visit our website or use our travel services.`}
      />

      <section className="relative h-48 bg-gradient-to-r from-primary to-secondary flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
          <h1 className="font-display text-4xl font-bold">Privacy Policy</h1>
        </div>
      </section>

      <section className="py-16 bg-warmWhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm prose prose-lg max-w-none">
            <p className="text-muted text-sm">Last Updated: September 1, 2026</p>

            <p>
              Welcome to <strong>{BUSINESS_CONTACT.companyName}</strong> ("{BUSINESS_CONTACT.companyName}", "we", "us", or "our").
            </p>
            <p>
              This Privacy Policy explains how we collect, use, store, disclose, and protect information when you
              visit or use our website, submit an enquiry, request a Bhutan travel quotation, contact us through
              email or WhatsApp, or otherwise interact with our travel services.
            </p>
            <p>
              By using our website, you acknowledge that you have read and understood this Privacy Policy.
            </p>

            <h2>1. About {BUSINESS_CONTACT.companyName}</h2>
            <p>
              {BUSINESS_CONTACT.companyName} is a travel service provider initially focused on planning and assisting
              customers with trips to Bhutan.
            </p>
            <p>Our services may include:</p>
            <ul>
              <li>Bhutan tour packages</li>
              <li>Honeymoon packages</li>
              <li>Family tours</li>
              <li>Group tours</li>
              <li>Customized trips</li>
              <li>Transportation arrangements</li>
              <li>Hotel accommodation arrangements</li>
              <li>Sightseeing arrangements</li>
              <li>Travel assistance</li>
              <li>Trip planning and quotation services</li>
            </ul>
            <p>As our business grows, we may expand our services to additional destinations.</p>

            <h2>2. Information We Collect</h2>
            <p>We may collect information that you voluntarily provide when you use our website or contact us.</p>

            <h3>A. Contact Information</h3>
            <p>This may include:</p>
            <ul>
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>WhatsApp contact information</li>
              <li>Other contact details you choose to provide</li>
            </ul>

            <h3>B. Trip Information</h3>
            <p>When you request a quotation or plan a trip, we may collect:</p>
            <ul>
              <li>City or location you are travelling from</li>
              <li>Preferred travel date</li>
              <li>Number of adults</li>
              <li>Number of children</li>
              <li>Preferred trip duration</li>
              <li>Preferred travel style</li>
              <li>Preferred destination</li>
              <li>Selected tour package</li>
              <li>Travel preferences</li>
              <li>Special requests</li>
              <li>Additional information included in your message</li>
            </ul>

            <h3>C. Communication Information</h3>
            <p>
              If you contact us through our website, email, WhatsApp, telephone, or other communication channels,
              we may retain information contained in those communications for the purpose of responding to you
              and managing your enquiry.
            </p>

            <h3>D. Technical Information</h3>
            <p>
              When you visit our website, certain technical information may automatically be collected, depending
              on the technologies and services enabled on the website.
            </p>
            <p>This may include:</p>
            <ul>
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device type</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Referring website</li>
              <li>Approximate location derived from technical information</li>
              <li>Date and time of visits</li>
              <li>Website interaction information</li>
            </ul>
            <p>We use this information primarily to operate, secure, maintain, and improve our website.</p>

            <h2>3. How We Collect Information</h2>
            <p>We may collect information through:</p>
            <ul>
              <li>Contact forms</li>
              <li>Trip planning forms</li>
              <li>Quote request forms</li>
              <li>Package enquiry forms</li>
              <li>Customize Your Trip forms</li>
              <li>Email communications</li>
              <li>WhatsApp communications</li>
              <li>Telephone communications</li>
              <li>Website analytics</li>
              <li>Cookies and similar technologies</li>
              <li>Other interactions with our website</li>
            </ul>
            <p>
              You are not required to provide information that is not necessary for the particular service or
              enquiry you are requesting.
            </p>

            <h2>4. How We Use Your Information</h2>
            <p>We may use the information we collect for legitimate business and service-related purposes, including:</p>

            <h3>Providing Travel Services</h3>
            <p>To:</p>
            <ul>
              <li>Prepare travel quotations</li>
              <li>Recommend suitable packages</li>
              <li>Customize itineraries</li>
              <li>Coordinate travel arrangements</li>
              <li>Respond to enquiries</li>
              <li>Arrange accommodation</li>
              <li>Coordinate transportation</li>
              <li>Assist with sightseeing arrangements</li>
              <li>Provide travel-related assistance</li>
              <li>Process bookings where applicable</li>
            </ul>

            <h3>Communication</h3>
            <p>We may use your contact information to:</p>
            <ul>
              <li>Respond to your enquiry</li>
              <li>Send requested quotations</li>
              <li>Confirm travel details</li>
              <li>Provide booking-related information</li>
              <li>Contact you regarding changes to your trip</li>
              <li>Answer questions</li>
              <li>Provide customer support</li>
            </ul>

            <h3>WhatsApp Communication</h3>
            <p>
              If you choose to communicate with us through WhatsApp, your enquiry details may be transferred to
              or used with WhatsApp so that you can communicate with our team.
            </p>
            <p>
              For certain forms, such as our <strong>Plan Your Bhutan Trip</strong> form, the information you
              enter may be used to create a pre-filled WhatsApp message.
            </p>
            <p>For example, the message may contain:</p>
            <ul>
              <li>Your travel-from city</li>
              <li>Travel date</li>
              <li>Number of adults</li>
              <li>Number of children</li>
              <li>Preferred duration</li>
              <li>Travel style</li>
              <li>Selected package</li>
            </ul>
            <p>
              The WhatsApp message is generated to make it easier for you to contact {BUSINESS_CONTACT.companyName}.
            </p>
            <p>You remain responsible for reviewing the message before sending it through WhatsApp.</p>
            <p>
              WhatsApp is operated by a third party and its own privacy policy and terms may apply to your use
              of that service.
            </p>

            <h3>Website Improvement</h3>
            <p>We may use technical and usage information to:</p>
            <ul>
              <li>Improve website performance</li>
              <li>Understand how visitors use our website</li>
              <li>Fix technical problems</li>
              <li>Improve our packages and content</li>
              <li>Improve user experience</li>
              <li>Prevent fraud and abuse</li>
              <li>Maintain website security</li>
            </ul>

            <h2>5. Enquiry and Quote Information</h2>
            <p>
              When you submit an enquiry through our website, your information may be stored in our business
              systems so that we can process and respond to your request.
            </p>
            <p>For example, a Bhutan trip enquiry may contain:</p>
            <ul>
              <li>Customer name</li>
              <li>Email</li>
              <li>Phone number</li>
              <li>Travel-from city</li>
              <li>Travel date</li>
              <li>Number of travellers</li>
              <li>Children</li>
              <li>Preferred duration</li>
              <li>Travel style</li>
              <li>Selected package</li>
              <li>Message</li>
              <li>Enquiry source</li>
              <li>Enquiry status</li>
              <li>Date and time of submission</li>
            </ul>
            <p>
              This information may be stored in our database and used by authorized members of {BUSINESS_CONTACT.companyName}
              for customer service and travel planning.
            </p>

            <h2>6. Email Communications</h2>
            <p>
              When you submit certain forms on our website, we may send the enquiry information to our business email:
            </p>
            <p>
              <a href={`mailto:${BUSINESS_CONTACT.email}`} className="text-primary">{BUSINESS_CONTACT.email}</a>
            </p>
            <p>Email may be used for:</p>
            <ul>
              <li>Receiving customer enquiries</li>
              <li>Responding to quotation requests</li>
              <li>Managing bookings</li>
              <li>Providing customer support</li>
              <li>Maintaining business records</li>
            </ul>
            <p>Email communications may be processed through third-party email infrastructure.</p>

            <h2>7. WhatsApp Communications</h2>
            <p>
              Our website may provide links to WhatsApp to allow customers to contact {BUSINESS_CONTACT.companyName}.
            </p>
            <p>Our WhatsApp contact link may be:</p>
            <p>
              <a href={BUSINESS_CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-primary">https://wa.me/message/3LIJPTDSII3IF1</a>
            </p>
            <p>
              Some forms may generate a dynamic WhatsApp message containing information entered by you.
            </p>
            <p>When you choose to use WhatsApp, information you send through WhatsApp is subject to WhatsApp's own terms and privacy practices.</p>
            <p>We recommend reviewing WhatsApp's privacy policy before using the service.</p>

            <h2>8. Cookies and Similar Technologies</h2>
            <p>Our website may use cookies and similar technologies.</p>
            <p>Cookies may be used for purposes such as:</p>
            <ul>
              <li>Website functionality</li>
              <li>Security</li>
              <li>Remembering preferences</li>
              <li>Understanding website traffic</li>
              <li>Improving user experience</li>
              <li>Analytics</li>
              <li>Advertising and marketing measurement</li>
            </ul>
            <p>Some cookies may be provided by third-party services.</p>
            <p>You may be able to control or disable certain cookies through your browser settings.</p>
            <p>Disabling some cookies may affect the functionality of parts of the website.</p>

            <h2>9. Google Analytics and Advertising</h2>
            <p>
              We may use Google services, including analytics and advertising technologies, to understand
              website traffic, measure marketing performance, and improve our advertising campaigns.
            </p>
            <p>
              If Google Analytics, Google Ads, conversion tracking, remarketing, or similar technologies are
              enabled on the website, those services may collect information about your interaction with our
              website in accordance with Google's applicable policies.
            </p>
            <p>We may use this information to understand:</p>
            <ul>
              <li>Which pages receive visitors</li>
              <li>How visitors reach our website</li>
              <li>Which advertising campaigns generate enquiries</li>
              <li>How visitors interact with our website</li>
              <li>How our website and advertising can be improved</li>
            </ul>
            <p>
              We will configure such services in accordance with applicable requirements and available privacy controls.
            </p>

            <h2>10. Google Search and SEO</h2>
            <p>
              {BUSINESS_CONTACT.companyName} may use search-engine optimization and structured website information to
              help our pages appear in search results.
            </p>
            <p>
              Search engines such as Google may independently collect information when you visit or interact
              with our website.
            </p>
            <p>Our Privacy Policy does not control how third-party search engines process information.</p>

            <h2>11. Information Sharing</h2>
            <p>We do not sell your personal information as a standalone product.</p>
            <p>
              We may share information when reasonably necessary to provide our services, operate our business,
              comply with legal obligations, or protect our rights.
            </p>
            <p>
              Depending on the service requested, information may be shared with appropriate service providers such as:
            </p>
            <ul>
              <li>Hotels and accommodation providers</li>
              <li>Transportation providers</li>
              <li>Local travel partners</li>
              <li>Guides or activity providers</li>
              <li>Permit or travel documentation service providers</li>
              <li>Technology service providers</li>
              <li>Email service providers</li>
              <li>Database/cloud infrastructure providers</li>
              <li>Website analytics providers</li>
              <li>Advertising platforms</li>
              <li>Payment service providers, where applicable</li>
              <li>Professional advisers where reasonably necessary</li>
            </ul>
            <p>We aim to share only information that is reasonably necessary for the relevant purpose.</p>

            <h2>12. Third-Party Services</h2>
            <p>Our website may contain links or integrations with third-party services.</p>
            <p>These may include:</p>
            <ul>
              <li>WhatsApp</li>
              <li>Google services</li>
              <li>Google Maps</li>
              <li>Google Analytics</li>
              <li>Google Ads</li>
              <li>Email services</li>
              <li>Payment providers</li>
              <li>Social media platforms</li>
              <li>Hotel or travel service providers</li>
              <li>Other technology or travel service providers</li>
            </ul>
            <p>These third parties may have their own privacy policies and terms.</p>
            <p>
              {BUSINESS_CONTACT.companyName} is not responsible for the privacy practices of third-party websites or
              services that we do not control.
            </p>
            <p>We recommend reviewing their respective privacy policies before providing personal information to them.</p>

            <h2>13. Google Maps</h2>
            <p>
              Our Contact page may display a Google Maps map or embedded map.
            </p>
            <p>
              Google Maps may process technical information when the map is loaded or interacted with.
            </p>
            <p>
              Your use of Google Maps is also subject to Google's applicable terms and privacy practices.
            </p>

            <h2>14. Data Storage</h2>
            <p>
              We may store enquiry and customer information using secure cloud-based infrastructure,
              including our business database.
            </p>
            <p>
              Our website backend may use <strong>MongoDB Atlas</strong> or another secure database provider
              to store enquiry information.
            </p>
            <p>The information stored may include:</p>
            <ul>
              <li>Customer information</li>
              <li>Contact information</li>
              <li>Travel requirements</li>
              <li>Package information</li>
              <li>Enquiry status</li>
              <li>Communication-related information</li>
            </ul>
            <p>
              We take reasonable measures to protect stored information against unauthorized access, alteration,
              disclosure, or destruction.
            </p>

            <h2>15. Data Security</h2>
            <p>We use reasonable technical and organizational measures designed to protect personal information.</p>
            <p>These measures may include:</p>
            <ul>
              <li>Secure server-side processing</li>
              <li>Environment variables for sensitive credentials</li>
              <li>Access controls</li>
              <li>Authentication mechanisms where applicable</li>
              <li>Secure database connections</li>
              <li>HTTPS</li>
              <li>Restricted access to customer information</li>
              <li>Server-side validation</li>
              <li>Security monitoring and maintenance</li>
            </ul>
            <p>
              However, no internet transmission or electronic storage system can be guaranteed to be completely secure.
            </p>
            <p>
              Therefore, while we take reasonable precautions, we cannot guarantee absolute security.
            </p>

            <h2>16. Payment Information</h2>
            <p>
              If online payments are introduced on our website, payment information may be processed by a
              third-party payment service provider.
            </p>
            <p>
              Unless expressly stated otherwise, {BUSINESS_CONTACT.companyName} does not intend to store complete
              payment card numbers, CVV numbers, or similar sensitive payment credentials on its own servers.
            </p>
            <p>
              Payment providers may process payment information according to their own terms and privacy policies.
            </p>

            <h2>17. Data Retention</h2>
            <p>
              We retain personal information only for as long as reasonably necessary for the purposes
              described in this Privacy Policy, including:
            </p>
            <ul>
              <li>Responding to enquiries</li>
              <li>Managing bookings</li>
              <li>Providing travel services</li>
              <li>Maintaining business records</li>
              <li>Resolving disputes</li>
              <li>Preventing fraud</li>
              <li>Meeting legal, accounting, tax, or regulatory obligations</li>
            </ul>
            <p>
              The retention period may vary depending on the nature of the information and the purpose for
              which it was collected.
            </p>
            <p>
              When information is no longer reasonably required, we may delete, anonymize, or securely dispose
              of it, subject to applicable legal requirements.
            </p>

            <h2>18. Your Rights</h2>
            <p>
              Subject to applicable law, you may have rights regarding your personal information, including
              rights relating to:
            </p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Withdrawal of consent where consent is the basis for processing</li>
              <li>Requesting deletion where applicable</li>
              <li>Raising concerns about our processing of personal information</li>
              <li>Requesting information about how your personal information is being used</li>
            </ul>
            <p>
              If you wish to exercise an applicable right, contact us using the details provided below.
            </p>
            <p>We may need to verify your identity before processing certain requests.</p>
            <p>Some requests may be subject to legal or contractual limitations.</p>

            <h2>19. Withdrawal of Consent</h2>
            <p>
              Where we process your personal information based on your consent, you may request to withdraw
              that consent.
            </p>
            <p>
              Withdrawal of consent does not affect the lawfulness of processing that occurred before the
              withdrawal.
            </p>
            <p>
              Please note that certain information may still need to be retained or processed where required
              or permitted by applicable law, or where necessary to provide services that you have requested.
            </p>

            <h2>20. Children's Privacy</h2>
            <p>Our website is intended primarily for adults planning travel.</p>
            <p>
              We do not knowingly collect personal information directly from children for independent use
              of our services.
            </p>
            <p>
              If you are a parent or legal guardian and believe that a child has provided personal information
              to us without appropriate authorization, please contact us so that we can review and take
              appropriate action.
            </p>

            <h2>21. International Data Transfers</h2>
            <p>
              Because we may use cloud-based technology and third-party service providers, personal information
              may be processed or stored in locations outside your state, region, or country.
            </p>
            <p>
              Where applicable, we will take reasonable steps to ensure that such processing is carried out in
              accordance with applicable legal requirements and appropriate safeguards.
            </p>

            <h2>22. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time.</p>
            <p>Changes may be made when:</p>
            <ul>
              <li>Our services change</li>
              <li>We introduce new website features</li>
              <li>We introduce new technologies</li>
              <li>Our data practices change</li>
              <li>Applicable laws or regulations change</li>
            </ul>
            <p>
              When we update the policy, we will revise the <strong>"Last Updated"</strong> date at the top of
              this page.
            </p>
            <p>We encourage you to review this page periodically.</p>

            <h2>23. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, want to request information about your personal
              data, or have a privacy-related concern, please contact us.
            </p>
            <h3>{BUSINESS_CONTACT.companyName}</h3>
            <p>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${BUSINESS_CONTACT.email}`} className="text-primary">{BUSINESS_CONTACT.email}</a>
            </p>
            <p>
              <strong>WhatsApp:</strong> Available through our website WhatsApp contact link
            </p>
            <p>
              <strong>Website:</strong> {BUSINESS_CONTACT.companyName}
            </p>
            <p>
              For privacy-related requests, please include sufficient information for us to understand and
              process your request.
            </p>

            <h2>24. Important Notice</h2>
            <p>
              This Privacy Policy is intended to explain the general privacy practices of {BUSINESS_CONTACT.companyName}
              and how information is handled through our website and services.
            </p>
            <p>It does not replace professional legal advice.</p>
            <p>
              As our business expands, we may update this policy to reflect additional destinations, payment
              systems, booking systems, advertising platforms, analytics tools, travel partners, or other
              services.
            </p>
            <p>
              <strong>By using our website or submitting information through our forms, you acknowledge that
              you have read this Privacy Policy.</strong>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Privacy
