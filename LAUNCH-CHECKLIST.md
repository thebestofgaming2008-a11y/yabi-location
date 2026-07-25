# YABI Location — Production Launch Checklist

Last updated: 23 July 2026

## 1. What this product is

YABI Location is currently a French-language lead-generation website for a
Belgian commercial-vehicle rental company. It is not yet an instant booking,
payment, fleet-management, or customer-account platform.

The public journey is:

1. A visitor discovers the available vehicle categories and monthly prices.
2. The visitor sees the 15% discount for rentals longer than three months.
3. The visitor submits a quote request.
4. Convex validates, rate-limits, deduplicates, and stores the request.
5. Staff review the lead and contact the visitor.

Current active development architecture:

- Development preview and CDN: Cloudflare Pages
- Development database and API: Convex, Europe (Ireland)
- Transactional email: planned with Resend, not configured
- Bot challenge: planned with Cloudflare Turnstile, not configured
- Staff administration: Convex dashboard for now; a dedicated staff portal is
  recommended

The separate production deployments are retained as rollback infrastructure but
are not referenced by the active development preview.

## 2. Current implementation status

### Completed

- [x] Cloudflare Pages project created: `yabi-location`
- [x] Development preview URL:
  `https://development.yabi-location.pages.dev`
- [x] HTTPS and Cloudflare CDN enabled
- [x] Production Convex project created: `monz/yabi-location`
- [x] Separate Convex development and production deployments
- [x] Active form points only to the Convex development deployment
- [x] Production deployment located in Europe (Ireland)
- [x] Real quote-submission API connected to the public form
- [x] Server-side input validation and length limits
- [x] Exact CORS origin allow-list
- [x] Idempotency protection against duplicate submissions
- [x] Per-visitor, per-email, and global application rate limits
- [x] Bot honeypot and minimum form-completion time
- [x] Request IP/user-agent pseudonymized with SHA-256; raw IP is not stored
- [x] Consent timestamp stored with each quote request
- [x] Quote reference returned to the visitor
- [x] Production health endpoint
- [x] Security headers: CSP, HSTS, frame blocking, MIME sniffing protection,
  referrer policy, and restrictive browser permissions
- [x] Responsive mobile and desktop layouts
- [x] Sitemap, robots file, favicon, canonical metadata, Open Graph, and social
  sharing metadata
- [x] Responsive WebP hero images
- [x] Client-supplied vehicle photos optimized and displayed in the fleet
  catalogue
- [x] Live end-to-end production submission test
- [x] Duplicate retry test
- [x] TypeScript and Convex production deployment checks
- [x] Lighthouse: 93 performance, 96 accessibility, 100 best practices,
  100 SEO in the performance-focused mobile audit

### Not complete — launch blockers

- [ ] Final custom domain supplied and connected
- [ ] Cloudflare Turnstile enabled on the public form
- [ ] Resend configured and the sending domain authenticated
- [ ] New-lead notifications delivered to the real operational inbox
- [ ] Visitor confirmation email implemented
- [ ] Complete Belgian legal business identity supplied
- [ ] Privacy policy completed with the real legal entity and retention policy
- [ ] Legal notices completed
- [ ] CGV reviewed and approved by a Belgian legal professional
- [ ] Exact vehicle data, prices, insurance claims, availability, and discount
  terms signed off by the client
- [ ] Real production inbox tested by the client
- [ ] Staff lead-handling owner and response process agreed
- [ ] Production monitoring and alert recipients configured
- [ ] Git repository and repeatable deployment pipeline configured

The development preview is blocked from search engines and should be used only
for testing until every launch blocker above is closed.

## 3. Mandatory business information

The client must supply and approve:

- [ ] Full registered legal company name
- [ ] Trading name, if different
- [ ] Belgian enterprise/VAT number
- [ ] Registered business address
- [ ] Operational pickup/return address or service area
- [ ] Legal representative or responsible contact
- [ ] Official customer-support email
- [ ] Official quote-notification email
- [ ] Official telephone numbers
- [ ] Opening hours and holiday coverage
- [ ] Bank/payment identity if deposits or payments will later be accepted
- [ ] Insurer details where legally required
- [ ] Correct legal definition of the service: rental, long-term rental, lease,
  or another regulated product

Do not publish fabricated legal data or use a personal address without explicit
approval.

## 4. Mandatory commercial content approval

The client must sign off on every claim that can create a contractual
expectation:

- [ ] L1H1 price: 1,200 EUR excluding VAT per month
- [ ] Renault Master L2H2 2023 price: 1,950 EUR excluding VAT per month
- [ ] Citroën Jumper L2H2 2019 price: 1,500 EUR excluding VAT per month
- [ ] All L3H2 price: 2,340 EUR excluding VAT per month
- [ ] 15% discount applies only when rental duration is more than three months
- [ ] Whether the discount applies to every listed vehicle
- [ ] Whether the discount applies for the entire contract or only certain
  months
- [ ] Whether prices are “from” prices or fixed prices
- [ ] VAT rate and whether VAT is charged in every customer scenario
- [ ] Included monthly kilometres
- [ ] Excess-kilometre fee
- [ ] Security deposit/caution amount
- [ ] Insurance coverage and excess/franchise
- [ ] Driver minimum age and licence requirements
- [ ] Geographic travel restrictions
- [ ] Maintenance, tyre, roadside-assistance, and replacement-vehicle promises
- [ ] Fuel and charging rules
- [ ] Cancellation, early termination, late return, damage, cleaning, and
  immobilisation charges
- [ ] Vehicle dimensions, payloads, and cargo volumes
- [ ] Vehicle model years, transmissions, fuel types, and emission classes
- [ ] Availability wording and substitution rights
- [ ] Whether consumers, businesses, or both may rent
- [ ] Whether credit checks or application approval are required

Every price should state “HTVA / hors TVA” consistently. Any discount should
show its exact eligibility conditions beside the price and again in the CGV.

## 5. Mandatory legal and privacy work

This section needs review by a Belgian legal professional; the website team
should not invent legal terms.

- [ ] Complete legal notices/mentions légales
- [ ] Complete GDPR privacy policy
- [ ] Identify the data controller using the registered legal entity
- [ ] List the purpose and legal basis for processing quote requests
- [ ] List every collected field
- [ ] State retention periods for submitted and rejected leads
- [ ] State processors/sub-processors: Cloudflare, Convex, Resend, and any
  analytics, CRM, telephone, or support provider
- [ ] Explain international data transfers and safeguards where applicable
- [ ] Explain access, correction, deletion, objection, restriction, and
  portability rights
- [ ] Provide the correct privacy contact
- [ ] Explain the right to complain to the Belgian Data Protection Authority
- [ ] Document the lawful basis and retention period for fraud/security logs
- [ ] Create an internal data-deletion procedure
- [ ] Create a data-export/access-request procedure
- [ ] Create a breach-response procedure and 72-hour GDPR assessment process
- [ ] Review the CGV for enforceability, consumer law, jurisdiction, insurance,
  cancellation, deposits, penalties, GPS tracking, and WhatsApp evidence
- [ ] Version and date all legal documents
- [ ] Record acceptance of the applicable legal version when a contract is
  concluded

Cookie consent is mandatory only if non-essential cookies or tracking are
added. Do not add a decorative cookie banner when there are no optional
cookies. If analytics, advertising pixels, chat widgets, or embedded media are
added:

- [ ] Block optional scripts before consent
- [ ] Offer accept, reject, and granular settings with equal prominence
- [ ] Store consent evidence and policy version
- [ ] Provide a permanent way to change consent
- [ ] Document cookie names, providers, purposes, and lifetimes

## 6. Mandatory domain and DNS work

- [ ] Client chooses or supplies the owned domain
- [ ] Confirm domain ownership in the correct Cloudflare account
- [ ] Connect the apex domain to Cloudflare Pages
- [ ] Connect the `www` hostname
- [ ] Choose one canonical hostname
- [ ] Redirect the other hostname to the canonical hostname
- [ ] Update canonical, Open Graph, Twitter, sitemap, CORS, and Resend links
- [ ] Verify automatic HTTPS certificate issuance
- [ ] Enforce HTTPS
- [ ] Keep HSTS enabled only after every required subdomain supports HTTPS
- [ ] Configure DNSSEC
- [ ] Configure CAA records if the client has certificate restrictions
- [ ] Add domain-expiry and DNS-change ownership/alerts
- [ ] Verify the domain in Google Search Console and Bing Webmaster Tools
- [ ] Submit the final sitemap
- [ ] Test redirects with and without `www`, HTTP, trailing slashes, and common
  misspellings

## 7. Mandatory quote-form backend work

Already implemented:

- [x] Strict server-side validation
- [x] Stable enum values for vehicles and durations
- [x] Payload-size limits
- [x] Origin enforcement
- [x] Idempotent retry handling
- [x] Private database writes
- [x] Consent timestamp
- [x] Status field for lead workflow
- [x] Source and page attribution
- [x] Privacy-safe request fingerprint
- [x] Global and keyed rate limits
- [x] Friendly success reference

Still mandatory:

- [ ] Create Cloudflare Turnstile widget for the final and temporary domains
- [ ] Add the Turnstile site key to the browser
- [ ] Add the Turnstile secret only to Convex production environment variables
- [ ] Make Turnstile verification fail closed in production
- [ ] Test challenge success, expiry, replay, missing token, and automation
- [ ] Configure Resend webhook signing secret
- [ ] Schedule email outside the database mutation
- [ ] Retry transient email failures with bounded backoff
- [ ] Prevent duplicate staff or visitor email on HTTP retry
- [ ] Record email provider ID, status, attempt count, and last error
- [ ] Send staff notification with a link/reference and all relevant fields
- [ ] Send a plain-language confirmation to the visitor
- [ ] Escape all customer text in HTML email
- [ ] Add plain-text versions of every email
- [ ] Never include unnecessary sensitive data in subject lines
- [ ] Define lead retention and automatic deletion/anonymisation
- [ ] Add operational alerts for repeated form failures or email failures

The current Cloudflare OAuth token lacks `challenge-widgets.write`. Re-authorize
Wrangler before creating the Turnstile widget.

## 8. Mandatory email deliverability with Resend

- [ ] Create or select the Resend account owned by the client
- [ ] Verify the final sending domain
- [ ] Use a branded sender such as `devis@domain.be`
- [ ] Add Resend DKIM records
- [ ] Add or update SPF without creating multiple SPF records
- [ ] Add DMARC, initially with reporting and later an enforcement policy
- [ ] Configure a real reply-to address monitored by staff
- [ ] Decide whether inbound replies go to Gmail, Microsoft 365, or another
  mailbox
- [ ] Store `RESEND_API_KEY` only in Convex production environment variables
- [ ] Use separate development and production API keys
- [ ] Rotate keys and remove unused keys
- [ ] Process delivery, bounce, complaint, and rejection webhooks
- [ ] Suppress repeated sending to hard-bounced or complaining recipients
- [ ] Test Gmail, Outlook, Apple Mail, mobile, plain text, and dark mode
- [ ] Add an internal alert when staff notification delivery fails
- [ ] Avoid marketing content in transactional quote confirmations
- [ ] Add unsubscribe handling before sending any marketing email

## 9. Mandatory security controls

Already implemented:

- [x] HTTPS through Cloudflare
- [x] Content Security Policy
- [x] HSTS
- [x] Anti-framing policy
- [x] MIME sniffing protection
- [x] Restrictive browser permissions
- [x] Origin allow-list
- [x] Server-side validation
- [x] Pseudonymized request fingerprint
- [x] Application rate limiting
- [x] Secrets excluded from Git
- [x] Temporary production deploy key revoked after use

Still required:

- [ ] Turnstile
- [ ] Cloudflare WAF managed rules appropriate to the plan
- [ ] Cloudflare bot protection/rate rules for abnormal API and page traffic
- [ ] Alerts for traffic spikes, 4xx/5xx increases, and origin failures
- [ ] Separate least-privilege accounts for each operator
- [ ] Multi-factor authentication on Cloudflare, Convex, Resend, registrar,
  source control, and mailbox accounts
- [ ] Recovery codes stored securely
- [ ] Remove shared/personal credentials from production ownership
- [ ] Quarterly access review
- [ ] Secret rotation schedule
- [ ] Dependency update and vulnerability-review process
- [ ] Security contact and incident-response owner
- [ ] Data breach decision tree
- [ ] No customer data in browser analytics, URLs, console logs, or error tools
- [ ] Test CSP after every third-party integration
- [ ] Annual penetration test or independent security review if the platform
  expands to accounts, identity documents, contracts, or payments

Never collect identity documents, driving licences, payment cards, or bank
details through the current quote form.

## 10. Mandatory reliability, monitoring, and operations

- [ ] Define an uptime target
- [ ] Define incident severity levels
- [ ] Name a primary and backup incident owner
- [ ] Add external uptime checks for the public page and API health endpoint
- [ ] Add alerts for Cloudflare deployment failures
- [ ] Add alerts for Convex function errors and elevated latency
- [ ] Add alerts for Resend delivery failures and complaints
- [ ] Monitor quote volume against historic baseline
- [ ] Monitor rate-limit denials and Turnstile failures
- [ ] Create a public fallback contact path when the form is down
- [ ] Keep telephone and email links functional without JavaScript
- [ ] Define RPO and RTO
- [ ] Schedule Convex exports/backups according to the selected plan
- [ ] Test restoration into a non-production deployment
- [ ] Document rollback for Cloudflare and Convex
- [ ] Keep production, development, and future preview data separate
- [ ] Maintain a status/incident communication template
- [ ] Create an on-call escalation route if “7j/7” is advertised

## 11. Mandatory source control and deployment process

- [ ] Create a private GitHub/GitLab repository owned by the business or agreed
  agency account
- [ ] Commit the current source without `.env` files or private attachments
- [ ] Protect the production branch
- [ ] Require review for production changes
- [ ] Add automated checks for TypeScript, Convex codegen/typecheck, HTML,
  broken links, accessibility, and security headers
- [ ] Use short-lived or platform-managed deployment credentials
- [ ] Configure Cloudflare preview deployments for pull requests
- [ ] Configure Convex preview or development deployments for changes
- [ ] Require manual production approval for schema or legal changes
- [ ] Record deployment author, commit, and timestamp
- [ ] Keep at least one known-good rollback version
- [ ] Document emergency rollback without deleting production data

## 12. Mandatory quality assurance before launch

### Functional

- [ ] Every navigation link works
- [ ] Every phone link dials the intended number
- [ ] Every email link targets the intended mailbox
- [ ] Every vehicle “choose” control preselects the correct category
- [ ] Every price and discount is consistent across the page and email
- [ ] Start date cannot be in the past
- [ ] Required fields, validation errors, server errors, and rate limits are
  understandable in French
- [ ] Successful quote appears in production Convex exactly once
- [ ] Staff receives exactly one notification
- [ ] Visitor receives exactly one confirmation
- [ ] Form works with slow networks and a retried request
- [ ] Form has a non-JavaScript fallback or clearly visible phone/email fallback

### Browser and device

- [ ] Current Chrome, Edge, Firefox, and Safari
- [ ] iOS Safari and Android Chrome
- [ ] 320 px, 375 px, 768 px, 1024 px, 1440 px, and large desktop widths
- [ ] Touch, mouse, and keyboard-only operation
- [ ] 200% and 400% browser zoom
- [ ] Reduced-motion preference
- [ ] High-contrast/forced-colours mode where practical
- [ ] Slow 3G/4G and offline/error behaviour

### Accessibility

- [ ] Logical heading order
- [ ] Visible keyboard focus
- [ ] Skip link
- [ ] Every control has an accessible name
- [ ] Errors are associated with their fields
- [ ] Status updates are announced
- [ ] Colour contrast meets WCAG 2.2 AA
- [ ] Images have appropriate alternative text
- [ ] Decorative images have empty alternative text
- [ ] No keyboard traps
- [ ] Motion can be reduced
- [ ] Legal and pricing text remains readable on small screens
- [ ] Manual screen-reader test with NVDA or VoiceOver

### Performance

- [x] Responsive modern-format hero image
- [x] Static CDN delivery
- [x] Zero layout shift in current audit
- [x] Zero total blocking time in current audit
- [ ] Test final domain after DNS is connected
- [ ] Keep mobile LCP under 2.5 seconds where practical
- [ ] Keep CLS under 0.1
- [ ] Keep INP under 200 ms
- [ ] Set performance budgets for page weight, fonts, scripts, and images
- [ ] Re-run Lighthouse and real-user monitoring after third-party scripts

## 13. Mandatory scale planning for very large traffic

The public page can scale efficiently because Cloudflare serves static files at
the edge. Convex receives only quote/API traffic, not every asset request.

Before a campaign expected to reach millions:

- [ ] Confirm Cloudflare and Convex billing plans and hard limits
- [ ] Set billing alerts and spend thresholds
- [ ] Estimate page views, form starts, form submissions, and peak requests per
  second separately
- [ ] Load-test a non-production endpoint with realistic payloads
- [ ] Never load-test production without written approval and monitoring
- [ ] Tune Convex global rate-limit shards for expected peak write throughput
- [ ] Confirm email-provider rate limits and daily quotas
- [ ] Queue or schedule email; do not make database success depend on email
- [ ] Protect against retry storms with exponential backoff and jitter
- [ ] Test graceful degradation when Convex or Resend is unavailable
- [ ] Configure WAF/bot protections before paid campaigns
- [ ] Pre-warm operational staff for expected lead volume
- [ ] Ensure staff capacity and response-time claims match expected demand
- [ ] Define lead prioritisation and duplicate/customer matching rules
- [ ] Track error rate, p95 latency, conversion, and notification delay
- [ ] Review support and enterprise options if sustained traffic justifies them

“Millions-ready” is an operational promise as well as a technical one. CDN
capacity alone is not enough if the business cannot process the resulting leads.

## 14. Recommended additions

- [ ] Authenticated staff dashboard
- [ ] Role-based access for admin, sales, and read-only users
- [ ] Lead status workflow: new, contacted, qualified, won, lost, spam
- [ ] Lead notes and assignment history
- [ ] Audit log for every staff change
- [ ] Search by reference, email, phone, vehicle, and status
- [ ] Paginated lead lists; never load the whole table
- [ ] CSV export restricted to authorised staff
- [ ] CRM integration if the client already uses one
- [ ] Privacy-friendly analytics such as Cloudflare Web Analytics
- [ ] Conversion events that never contain personal data
- [ ] Search Console and Bing Webmaster Tools
- [ ] Structured data after final business identity and domain are known
- [ ] Branded 404 and error pages
- [ ] FAQ covering eligibility, documents, deposit, VAT, kilometres, insurance,
  delivery/pickup, and discount terms
- [x] Real vehicle photography integrated with model-level captions
- [ ] Client approval of every model/year caption
- [ ] Image release/ownership records
- [ ] French copy edit by a native professional
- [ ] Dutch version for the Belgian market
- [ ] English version if commercially useful
- [ ] `hreflang` metadata after translated pages exist
- [ ] Automated dead-link and uptime checks
- [ ] Monthly content/price review owner

## 15. Good-to-have additions

- [ ] WhatsApp contact button with approved business number and privacy notice
- [ ] Click-to-call tracking without personal data
- [ ] Availability calendar maintained by staff
- [ ] Vehicle comparison tool
- [ ] Downloadable specification sheets
- [ ] Testimonials with written permission
- [ ] Google Business Profile and map only after address/privacy approval
- [ ] Customer FAQ chatbot only if answers are constrained and reviewed
- [ ] Saved quote links with expiry
- [ ] E-signature and contract workflow
- [ ] Secure document upload with authentication and retention controls
- [ ] Customer accounts and contract history
- [ ] Online deposits/payments through a PCI-compliant provider
- [ ] Automated reminders and rental lifecycle messages
- [ ] Fleet availability and maintenance integration
- [ ] Referral/campaign attribution
- [ ] A/B testing with an approved analytics/consent design
- [ ] Content management system for non-technical staff
- [ ] Incident/status page

These features should be added only when the business process requires them.
Accounts, identity documents, contracts, GPS data, and payments materially
increase security, privacy, legal, and support obligations.

## 16. Definition of ready for public launch

The site is ready for official promotion only when:

- [ ] The final domain is live with correct redirects and metadata
- [ ] Legal identity, privacy policy, legal notices, and approved CGV are live
- [ ] The client has approved every price and commercial promise
- [ ] Turnstile is active and verified server-side
- [ ] Resend is authenticated and both staff/visitor email tests pass
- [ ] Production monitoring and alert recipients are active
- [ ] The source is backed by a private repository and rollback process
- [ ] Browser, accessibility, form, security, and performance QA pass
- [ ] The client has completed a written launch acceptance
- [ ] A lead owner is ready to respond to real customers

## 17. Information required from the client now

1. Final domain name, or confirmation that a new domain must be purchased.
2. Registered company name.
3. Belgian enterprise/VAT number.
4. Registered and operational addresses.
5. Final quote-notification inbox.
6. Final branded sending domain/inbox for Resend.
7. Confirmation that the two published telephone numbers are correct.
8. Written approval of all vehicles, prices, discounts, specs, and service
   promises.
9. Final approved CGV and privacy/legal text, or the lawyer responsible for it.
10. Names/email addresses of the people who need Cloudflare, Convex, Resend,
    source-control, monitoring, and lead-dashboard access.
