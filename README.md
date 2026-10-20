# Ninho Portugal Homebase

Build NINHO, a polished, responsive, interactive web prototype for an early-stage platform helping international buyers discover property in Portugal and coordinate the property-purchase and relocation journey. Build the actual working frontend, not just a plan or static mockup.

PRODUCT: NINHO connects international buyers with properties and relevant real-estate professionals, then helps them organise the steps, tasks, appointments, documents and communication involved in a purchase. It is not just a property listing website. Demonstrate two connected experiences: public property discovery and a private buyer workspace.

DESIGN: Create a premium, calm, editorial Portuguese real-estate brand. Use warm ivory, white, charcoal, muted forest green and restrained terracotta accents. Use generous whitespace, elegant typography, fine borders, tasteful real photography of Portuguese homes and architecture, and strong visual hierarchy. No gradients, glowing effects, glassmorphism, 3D decorations, excessive shadows, generic AI dashboard aesthetics or oversized rounded cards. Make it feel like a credible European proptech startup. Use real responsive layouts for desktop, tablet and mobile.

BRAND: Name NINHO. The Portuguese word means nest; the product should communicate finding a place, feeling oriented and moving through a complex process with confidence. Use a simple wordmark, not a complicated logo. Voice: clear, reassuring, professional, human and concise. Avoid unsupported promises or fake testimonials.

ROUTES / PAGES:
1. Public landing page at /: strong hero explaining property discovery and purchase coordination in Portugal; search panel; featured properties; how NINHO works in three steps; professional support section; trust/privacy explanation; useful CTA buttons; thoughtful footer.
2. Explore page at /properties: search and filter by location, price range, property type, bedrooms and features; grid/listing layout; property count; clear empty state; working sort and filter behaviour.
3. Property detail at /properties/:id: photo gallery, location, price, bedrooms, bathrooms, area, description, features, neighbourhood summary, save/favourite action and request-information CTA. Use fictional listings and clearly indicate prototype/demo data where appropriate.
4. Buyer dashboard at /dashboard: welcoming overview, current purchase journey stage, progress indicator, next recommended action, upcoming deadlines, task list, saved properties, connected professionals and recent activity. Build a coherent sample buyer scenario.
5. Case workspace at /dashboard/case/:id: milestone timeline; tasks with status and due dates; professionals and roles; appointments; document checklist with illustrative statuses such as Requested, Received and Under Review; activity feed. Task status changes must work locally and visibly update the UI.
6. Professional directory or panel: sample Portuguese real-estate/legal/relocation professionals, service categories and locations. Clearly label all sample professionals as fictional demo profiles. Do not invent real endorsements or credentials.
7. A simple language selector available in the header and dashboard. Support English and European Portuguese (pt-PT), with translated UI labels, navigation, buttons, empty states and core interface copy. This must be a genuine language toggle, not just a changed flag. Preserve the selected locale while navigating in the demo. Use natural European Portuguese, not Brazilian Portuguese. Format sample prices in EUR and localise dates appropriately.

FUNCTIONAL REQUIREMENTS:
- All navigation and prominent CTA buttons must do something meaningful.
- Search and filters must affect the displayed fictional properties.
- Property cards open the matching property details.
- Favourite/save controls toggle and visibly persist during the session.
- A property CTA can lead to a demo request/contact state with a confirmation screen or modal; do not send real messages.
- The dashboard links to the buyer case.
- Tasks can be marked complete/in progress and visibly update progress and activity.
- Language switching translates the core interface across pages.
- Mobile navigation must work.
- Add realistic loading, empty, success and validation states where useful.
- Use sensible accessible contrast, keyboard focus, labels and semantic structure.
- No dead buttons, fake external integrations or misleading claims that an action was sent to a real service.

SAMPLE DATA: Include at least six fictional Portugal properties across Lisbon, Porto, Cascais and the Algarve. Use plausible EUR prices, bedrooms, bathrooms, area and property types. Use good-quality real property imagery from available image sources; avoid broken images. Include one fictional buyer case with a realistic staged workflow, several tasks and deadlines, three fictional professionals and a sample document checklist. Label demo information as illustrative. Keep sample content internally consistent.

TECHNICAL APPROACH: Use React, TypeScript and a maintainable component structure. Use the existing Lovable project stack and conventions where applicable. Prefer reusable components, typed sample data, clean routing and centralised translation dictionaries. Use local state or local mock data for this prototype. Do not add a real authentication flow, payment processing, real document uploads, real client records, e-signature integrations, live chat, or external service integrations. Do not expose secrets or API keys. Do not claim the prototype is production-secure. Do not connect a database unless necessary for a working demo; if a backend is already configured, do not make unnecessary destructive changes.

IMPORTANT SECURITY BOUNDARY: Any document rows and role-based access states in the demo are illustrative UI only. No sensitive files should be stored or transmitted. Production would need server-side authorization, private object storage, audit logging, backups, and a specialist security review.

DELIVERABLE: Build the actual interactive prototype with complete page layouts, cohesive styling, working routes and demo interactions. Start by implementing the public landing page, property discovery/details, and buyer dashboard/case workspace. Then verify that the primary user journey works end to end: landing page → explore properties → property detail → save property/request information → buyer dashboard → case workspace → update task. Ensure the responsive UI and English/European Portuguese toggle work. Prioritise product clarity and a believable buyer journey over unnecessary features. Do not stop after producing a specification; implement the application.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4df72c06-9e4d-4b3e-8334-09c474860a14).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
