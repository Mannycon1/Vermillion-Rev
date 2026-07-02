---
name: calendar-dashboard-template
description: >-
  Build an interactive, self-contained HTML monthly-calendar dashboard from a
  calendar/schedule/list of activities — marketing calendars, event schedules,
  project plans, editorial/content calendars, campaign timelines. Produces a
  single calendar.html (no build step, no dependencies, works offline) with a
  monthly day-grid, clickable activity pages (editable Activity / Description /
  Details, multiple milestone dates plotted on the calendar, Status dropdown,
  and add/edit/delete Comments), an agenda list, browser-saved edits, and
  print + download (JSON/CSV). Use when someone wants to turn activities or a
  schedule into a clickable monthly calendar, or to create/customize/rebrand
  such a dashboard.
---

# Calendar Dashboard Template

A reusable, single-file calendar dashboard. Everything (markup, CSS, logic,
and data) lives in one `calendar.html`. To make a new dashboard you copy the
template and edit one `CONFIG` block — no framework, no build, no network.

## What it produces

- **Monthly calendar grid** (Sun–Sat) with prev/next + month tabs + “Today”.
  Tabs are derived automatically from the dates present in the data.
- **Every activity plotted by date.** An activity can have **multiple dates
  (milestones)** — it appears on the grid once per date, each with an optional
  label (e.g. *Kickoff*, *Completion*) and a “done” toggle (strikethrough).
- **Clickable activity page** (modal/route, deep-linkable via `#activity/<id>`)
  with editable fields: **Activity, Description, Details, Timeline (date list),
  Status (dropdown), Comments (add/edit/delete)**. Activities can be added and
  deleted; every field supports edit/add/delete.
- **Agenda** list under the grid (date-sorted, one row per milestone).
- **Colour tags** — optional per-activity pastel colour (Post=red, Event=yellow, Presentation=green, Material=blue, Others=white by default) rendered as the event fill, with a legend above the grid. Set `color` on an activity to one of `post|event|presentation|material|others`.
- **Printable** (print / save-as-PDF styles for the month and for a single
  activity page) and **Downloadable** (JSON backup + CSV spreadsheet), with
  **Import** and **Reset to original**.
- **Persistence** in `localStorage` (per `storageKey`), so edits survive
  reloads on that browser.

## When to use

Use this skill whenever the user wants to turn a set of dated (or month-bucketed)
activities into a clickable, editable monthly calendar they can share, print, or
download — for example: “turn this calendar of activities into a monthly
calendar”, “make a campaign/editorial/event calendar dashboard”, “rebrand /
re-skin the calendar for X”, or “add these activities to the calendar”.

## How to build a dashboard

1. **Copy the template** `template/calendar.html` to the destination (e.g. the
   site root as `calendar.html`, or a new file name).
2. **Gather the activities.** If the source is a `.docx`/`.xlsx`/PDF/paste,
   extract it into a flat list of activities. For `.docx`, unzip and read
   `word/document.xml` (tables are `<w:tr>` rows / `<w:tc>` cells; text is in
   `<w:t>`). Map each activity to a category, a title, and one or more dates.
3. **Edit the `CONFIG` block** near the top of the `<script>` (it is clearly
   fenced with a `CONFIG — edit this block` banner). Replace:
   - `brand` — `title`, `subtitle`, `mark` (1–2 letters), and accent colours
     (`primary`, `primaryDark`, `primaryLight`).
   - `storageKey` — a unique string so multiple dashboards don’t share storage.
   - `defaultYear` — the year used when an activity is given a `month` but no
     explicit date.
   - `categories` — a `name → colour` map (drives the coloured dots/bars).
   - `statuses` — the dropdown options (first is the default).
   - `activities` — the data (schema below).
4. **Validate** by opening the file in a browser (or headless Chromium): confirm
   the month tabs, that activities land on the right days, that an activity page
   opens and edits/saves, and that print/download work. There are no runtime
   dependencies, so a syntax check (`node --check` on the extracted script) plus
   a quick load is enough.
5. **Deliver / deploy.** It’s a static file: open locally, host on any static
   host (e.g. Netlify), or send it to the user to double-click.

## Activity data schema (`CONFIG.activities[]`)

```js
{
  category: "CAMPAIGN",          // must be a key in CONFIG.categories
  title:    "Spring Brand Refresh",
  status:   "In Progress",        // optional; defaults to statuses[0]
  description: "…",               // optional
  details:     "…",               // optional
  // Either give explicit milestone dates …
  dates: [
    { date: "2026-03-02", label: "Kickoff",    done: true  },
    { date: "2026-03-31", label: "Launch",     done: false }
  ]
  // … or, for a month-only item, give `month: 1..12` and omit `dates`
  // (it is auto-placed into that month of CONFIG.defaultYear; the user can
  //  then set a real date from the activity page).
}
```

Notes:
- Dates are ISO `YYYY-MM-DD`. An activity with no valid date shows in an
  **Unscheduled** tray until a date is added.
- Multiple activities can share a title across months — each `(activity, date)`
  is its own calendar entry, so recurring/ongoing campaigns are fine.
- The engine below the `CONFIG` banner normally needs no edits. It also
  migrates older single-`date` backups (`date` → `dates[0]`) on import/load.

## Customization tips

- **Re-skin**: change `brand.primary*`. The whole accent (buttons, today
  marker, focus rings, active tab) follows the `--primary*` CSS variables.
- **More categories / statuses**: just extend the `categories` / `statuses`
  lists; status pill colours exist for the common set (Not Started, Planning,
  In Progress, On Hold, Completed, Cancelled) — add a `.st-<slug>` CSS rule if
  you introduce a brand-new status and want a custom colour.
- **Multiple dashboards on one site**: give each its own file name **and** a
  distinct `storageKey`.

## Files

- `template/calendar.html` — the parameterized single-file dashboard. Copy it,
  edit `CONFIG`, ship it.
