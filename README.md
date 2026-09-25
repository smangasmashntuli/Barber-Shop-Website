# SMASH BarberShop Website

> **Affordable cuts. Student style. Cape Town.**

SMASH is a modern, student-focused barbershop located in **Observatory, Cape Town**. The website is designed to provide students with an affordable, convenient, and professional way to discover grooming services and book appointments.

The project is being developed as a practical full-stack web application and is intended to demonstrate professional frontend development, responsive design, user experience, booking functionality, and calendar integration.

---

## 1. Project Overview

### Business Name

**SMASH**

### Business Type

Student-focused barbershop

### Location

**Observatory, Cape Town, South Africa**

### Target Audience

The primary target audience is **students living, studying, or spending time in Observatory and surrounding areas**.

SMASH is designed around the idea that students should be able to maintain their appearance without paying premium salon/barbershop prices.

### Core Value Proposition

> **Quality haircuts at student-friendly prices.**

SMASH aims to provide:

- Affordable haircuts
- Convenient online booking
- A modern and welcoming environment
- Straightforward pricing
- Professional barber services
- Convenient appointment management

---

# 2. Project Purpose

The purpose of the SMASH website is to create a realistic digital presence for the barbershop.

The website should allow a potential customer to:

1. Discover SMASH.
2. Understand the services offered.
3. View prices.
4. Learn about the barbershop and its barbers.
5. Find the shop's location and opening hours.
6. Select a service.
7. Select a barber where applicable.
8. Select an appointment date and time.
9. Provide customer information.
10. Complete a booking.
11. Add the appointment to their calendar.

The website should feel like a **real business website that could be launched for an actual barbershop**, rather than a simple academic/demo website.

---

# 3. Brand Identity

## 3.1 Brand Name

**SMASH**

The name is intentionally short, memorable, and easy to recognise.

The brand should communicate:

- Confidence
- Youth
- Energy
- Accessibility
- Modern grooming
- Student culture

---

## 3.2 Brand Positioning

SMASH is positioned as a:

> **Modern, affordable student barbershop in Observatory.**

The brand should avoid presenting itself as an expensive luxury grooming studio.

Instead, SMASH should feel:

- Modern
- Affordable
- Friendly
- Youthful
- Professional
- Accessible
- Local

---

# 4. Target Users

## Primary Users

Students who need affordable grooming services.

Examples include:

- University students
- College students
- Students living in Observatory
- Students commuting through Observatory
- Young adults looking for affordable grooming

## User Needs

The website should make it easy for users to:

- Quickly understand prices
- See available services
- Find the barbershop
- Check opening hours
- Book an appointment
- Select a convenient time
- Add the appointment to their calendar
- Use the website comfortably on a mobile phone

---

# 5. Website Goals

The website should achieve the following goals:

### Business Goals

- Establish SMASH's online presence.
- Present the barbershop professionally.
- Make services and pricing easy to understand.
- Increase appointment bookings.
- Make the booking process convenient.
- Build trust with potential customers.

### User Goals

- Find information quickly.
- Understand pricing before booking.
- Easily select a service.
- Easily select an appointment.
- Receive useful appointment information.
- Add the appointment to their calendar.

---

# 6. Website Pages

The website will contain, at minimum, the following pages.

## Home

The homepage will introduce SMASH and provide a clear path toward booking.

Expected sections:

- Hero section
- Brand introduction
- Featured services
- Student-focused value proposition
- Featured barbers
- Call-to-action
- Location information
- Opening hours
- Footer

Primary CTA:

> **Book Your Cut**

---

## Services

The Services page will display available grooming services and their prices.

Potential services include:

- Classic Haircut
- Fade
- Skin Fade
- Beard Trim
- Haircut + Beard
- Kids Cut
- Student Specials

Final services and prices will be defined as part of the project content.

Pricing should be clearly displayed and easy to understand.

---

## About

The About page will introduce:

- SMASH
- The barbershop's story
- Its student-focused approach
- The barbers
- The shop's philosophy

The content should communicate that SMASH was created to provide students with accessible and professional grooming.

---

## Booking

The Booking page will provide the main appointment workflow.

The customer should be able to select:

1. Service
2. Barber
3. Date
4. Time
5. Customer information

The system should then allow the customer to confirm the appointment.

---

## Contact

The Contact section/page will provide:

- Physical location
- Contact information
- Opening hours
- Social media links
- Map/location information
- Booking CTA

---

## Terms & Conditions

The website will contain a proper Terms & Conditions page.

The page must contain actual business terms and must not be a placeholder.

---

# 7. Booking System

Booking is one of the core features of the SMASH website.

The booking flow should follow:

```text
Select Service
      ↓
Select Barber
      ↓
Select Date
      ↓
Select Time
      ↓
Enter Customer Details
      ↓
Review Appointment
      ↓
Confirm Booking
      ↓
Booking Confirmation
      ↓
Add To Calendar
```

The system should validate the customer's input before completing the booking.

The selected booking information must be retained throughout the process.

---

# 8. Calendar Integration

The website must support adding a customer's appointment to their calendar.

The calendar event should dynamically use the customer's selected appointment.

For example:

```text
Business: SMASH Barbershop
Service: Student Fade
Barber: Selected Barber
Date: Selected Date
Start: Selected Time
End: Calculated End Time
Location: Observatory, Cape Town
```

The calendar integration must not rely on a single hard-coded appointment.

### Supported Calendar Usage

The implementation should support:

- Google Calendar
- Apple Calendar-compatible calendar events

An `.ics` calendar file may be generated for calendar applications that support calendar-event imports.

---

# 9. Popup / Modal

The website will contain at least one purposeful popup/modal.

The popup should support the business experience rather than exist purely to satisfy a technical requirement.

Possible uses:

- Student discount
- First-visit offer
- Booking promotion
- Special offer
- SMASH announcement

Example:

> **STUDENT SPECIAL**
>
> Fresh cut. Student price.
>
> Show your valid student ID when you arrive.
>
> **Book Your Cut**

The popup must be dismissible.

---

# 10. Visual Design

The visual identity should be consistent across the entire website.

## Design Direction

SMASH should feel:

- Modern
- Youthful
- Clean
- Confident
- Affordable
- Urban
- Student-oriented

The design should avoid looking overly corporate or excessively luxurious.

---

## Colour Palette

The final colour palette will be defined during the visual identity phase.

The palette should provide:

- Strong contrast
- Accessible text
- Consistent buttons
- Clear hierarchy
- Consistent branding

Colours should be used deliberately rather than decorating the interface unnecessarily.

---

# 11. Typography

Typography should establish a clear hierarchy between:

- Main headings
- Section headings
- Body text
- Navigation
- Buttons
- Prices
- Booking information

The selected fonts must remain readable across desktop and mobile devices.

---

# 12. Photography & Imagery

The website will use high-quality barber/barbershop imagery.

Images may be:

- AI-generated
- Professionally sourced
- Stock imagery
- Custom-created

AI-generated imagery may be used to establish a consistent fictional SMASH environment.

The imagery should maintain a consistent visual style throughout the website.

Images should not be:

- Stretched
- Pixelated
- Poorly cropped
- Irrelevant
- Visually inconsistent

---

# 13. Responsive Design

The website must be responsive.

It should support:

- Desktop
- Laptop
- Tablet
- Mobile

The mobile experience is especially important because the target audience consists heavily of students who are likely to access the booking system from their phones.

The following must remain usable on smaller screens:

- Navigation
- Buttons
- Forms
- Service cards
- Booking controls
- Images
- Calendar actions
- Footer

Horizontal overflow should be avoided.

---

# 14. Technology Stack

## Frontend

## GitHub Pages Deployment

The Vue app is deployed by `.github/workflows/deploy-pages.yml`. The workflow builds the repository root and publishes `dist` using GitHub Pages artifact deployment.

In the repository on GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**. Do not select **Deploy from a branch** with the repository root, because that serves this README instead of the Vue build.

After pushing to `main`, wait for the deployment workflow to finish. The project URL is `https://<your-github-username>.github.io/Barber-Shop-Website/`.

### React

React will be used for building the application's component-based user interface.

Potential responsibilities include:

- Page structure
- Reusable components
- Booking interface
- Forms
- Interactive elements
- State management
- API communication

### Vue.js

Vue.js is included in the planned technology stack for the project.

Its use must be clearly defined during implementation to avoid unnecessarily duplicating frontend responsibilities with React.

If both technologies are ultimately used, their responsibilities should be separated intentionally rather than using React and Vue interchangeably within the same components.

---

## Styling

Potential technologies:

- CSS
- CSS Modules
- Tailwind CSS

The final styling approach will be selected during implementation.

---

## Backend

A backend may be introduced where required for:

- Booking management
- Appointment data
- Customer information
- API endpoints
- Business logic

The final backend architecture will be determined based on the actual booking requirements.

---

## Database

A database may be used to persist:

- Services
- Barbers
- Appointments
- Customer information
- Availability

The database technology will be selected according to implementation requirements.

---

## Calendar Integration

Calendar functionality will be implemented through dynamically generated calendar events.

Potential approaches include:

- Google Calendar event URLs
- `.ics` calendar files
- Calendar APIs where necessary

---

## Development Tools

The project may use:

- Git
- GitHub
- VS Code
- AI coding assistants
- Browser developer tools
- API testing tools

AI tools may be used during development, but all generated code and functionality must be reviewed, tested, corrected, and understood before deployment.

---

# 15. Project Architecture

The application should follow a modular architecture.

A possible frontend structure:

```text
src/
│
├── components/
│   ├── Navbar/
│   ├── Footer/
│   ├── Button/
│   ├── ServiceCard/
│   ├── BarberCard/
│   ├── BookingForm/
│   ├── CalendarActions/
│   └── Modal/
│
├── pages/
│   ├── Home/
│   ├── Services/
│   ├── About/
│   ├── Booking/
│   ├── Contact/
│   └── Terms/
│
├── data/
│   ├── services
│   ├── barbers
│   └── business
│
├── services/
│   ├── booking
│   └── calendar
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── logo/
│
├── styles/
│
└── App
```

The exact architecture may change during implementation, but components should remain organised and reusable.

---

# 16. Functional Requirements

The following functionality must work:

- Navigation
- Mobile navigation
- Booking buttons
- Service selection
- Barber selection
- Date selection
- Time selection
- Customer form
- Booking confirmation
- Calendar integration
- Popup/modal
- Terms & Conditions navigation
- Contact links
- Social links
- Calls to action

Interactive elements should not exist purely for visual purposes.

---

# 17. Booking Validation

The booking system should handle invalid situations appropriately.

Examples:

- Missing customer name
- Invalid email
- Missing service
- Missing barber
- Missing date
- Missing time
- Invalid appointment time
- Attempted booking outside business hours

Where applicable, the interface should clearly communicate the problem to the user.

---

# 18. User Experience Principles

The website should prioritise:

### Clarity

Users should immediately understand what SMASH is.

### Affordability

Students should quickly understand that SMASH is designed around affordable grooming.

### Convenience

The booking process should require as little unnecessary effort as possible.

### Mobile-first thinking

The booking experience should work particularly well on mobile devices.

### Trust

The website should look like a genuine local business rather than a development project.

---

# 19. Testing Requirements

Before deployment, the complete customer journey must be tested.

Primary test journey:

```text
Homepage
   ↓
Services
   ↓
Booking
   ↓
Select Service
   ↓
Select Barber
   ↓
Select Date
   ↓
Select Time
   ↓
Enter Details
   ↓
Complete Booking
   ↓
Add Appointment To Calendar
```

Testing should also cover:

- Desktop
- Tablet
- Mobile
- Navigation
- Forms
- Booking validation
- Calendar generation
- Popup
- Links
- Images
- Page routes
- Responsive layouts

---

# 20. Production Quality

Before deployment, the website must not contain:

- Broken images
- Broken links
- Missing pages
- JavaScript errors
- Debug information
- Placeholder content
- Unfinished sections
- Non-functional buttons
- Broken mobile layouts

The production website should be treated as a client-facing product.

---

# 21. Deployment

The final website must be publicly accessible.

The reviewer should be able to open the website without:

- Installing dependencies
- Running the project locally
- Downloading files
- Requesting development access
- Logging into a development environment

The final submission will consist of the deployed website URL.

---

# 22. Development Principles

## Build for the actual requirement

Features should be added because they support the SMASH business or assessment requirements.

Avoid unnecessary complexity.

## Reusability

Common UI elements should be implemented as reusable components.

## Maintainability

Code should be organised so that future changes to:

- Services
- Prices
- Barbers
- Opening hours
- Booking rules

can be made without rewriting the entire application.

## Accessibility

The website should provide:

- Sufficient colour contrast
- Readable typography
- Accessible form labels
- Keyboard-friendly interactions
- Clear focus states
- Appropriate button/link semantics

## Performance

Images should be optimised and unnecessary resources should be avoided.

---

# 23. Future Enhancements

The following features are outside the initial core scope but could potentially be introduced later:

- Customer accounts
- Booking history
- Barber availability management
- Admin dashboard
- Online payments
- Student verification
- SMS/email reminders
- Customer reviews
- Loyalty programme
- Promotional codes
- Analytics

These features should not be implemented at the expense of completing the core website requirements.

---

# 24. Definition of Done

The SMASH website will be considered complete when:

- [ ] The brand identity is complete.
- [ ] The website has a professional visual design.
- [ ] Home page is complete.
- [ ] Services page is complete.
- [ ] About page is complete.
- [ ] Booking page is functional.
- [ ] Contact information is available.
- [ ] Terms & Conditions are accessible.
- [ ] Navigation works.
- [ ] Mobile navigation works.
- [ ] Booking works.
- [ ] Booking validation works.
- [ ] Calendar integration works.
- [ ] Generated calendar events contain the selected appointment information.
- [ ] Popup/modal works.
- [ ] Website works on mobile.
- [ ] Website works on tablet.
- [ ] Website works on desktop.
- [ ] Images are high quality.
- [ ] No obvious JavaScript errors exist.
- [ ] No broken links or images exist.
- [ ] Production deployment is publicly accessible.
- [ ] The complete customer booking journey has been tested.

---

# 25. Final Product

The final product is a publicly accessible website for:

> **SMASH Barbershop**
> **Observatory, Cape Town**

with a clear focus on:

> **Affordable, professional haircuts for students.**

The final submission should provide the live website URL.
