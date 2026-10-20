# Fluent in German

A responsive, trilingual website for Memoona Abbas's German language school.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`.

## Update school information

- Course levels and formats, schedule, social links, contact details, portrait and logo are configured in `src/data/siteConfig.js`. Schedule entries can include `level`, `days`, `startTime`, `duration` and `availability`. Testimonials are loaded from the root `reviews.json` file and displayed with five stars.
- English, German and Urdu copy is in `src/data/translations.js`. Urdu automatically switches the page to right-to-left layout.
- The validated enquiry form opens an email draft to the configured school address for review and sending; it does not submit to a server. The WhatsApp link opens a chat with the configured phone number.
- Add actual course times to the schedule configuration when supplied. Empty schedules are intentionally displayed as placeholders rather than invented information.