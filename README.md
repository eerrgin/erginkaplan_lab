# Ergin Kaplan Lab — Perpetual Calendar

A self-contained, original Gregorian calendar interface for 2026–2045.

## Design principles
- No third-party calendar feeds, APIs, remote JSON, libraries, fonts, analytics, or runtime network requests.
- Dates are calculated locally with the browser's native JavaScript Date implementation.
- Local date and clock are refreshed automatically; the calendar rolls over when the device's local date changes.
- Monday-first month grid, leap-year handling, ISO week number, day-of-year and year selection.
- Responsive night-shift interface with reduced-motion support.

## Run
Open `index.html` in a modern browser or publish this folder as a static site.

## Copyright
Original HTML, CSS, and JavaScript created for Ergin Kaplan Lab. No third-party visual assets or calendar datasets are included. The Gregorian calendar rules and date calculations are implemented using standard built-in language features.

## Important
The displayed "today" follows the visitor device's local date and time. A device with an incorrect clock or timezone will display that device's incorrect local date.
