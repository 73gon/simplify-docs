# SimpTrack showcase videos

Drop the feature screencasts referenced by `<Showcase>` in the manual here.

## Where

`apps/web/public/videos/simptrack/` → served at `/videos/simptrack/<file>`.

## Naming

`<feature>.<lang>.mp4` — language matters because the UI text in the recording
is German or English.

Currently referenced by the manual (create these files):

| File                        | Shows                              |
| --------------------------- | ---------------------------------- |
| `ueberblick.mp4`            | Overview of the widget             |
| `sortieren-verschieben.mp4` | Sorting + drag-and-drop reordering |
| `aktionen.mp4`              | Row actions (history/invoice/log)  |
| `filtern.mp4`               | Filtering processes                |
| `filter-zuruecksetzen.mp4`  | Resetting filters                  |

## Format

- Container: **MP4 (H.264 + AAC)**, also add `.webm` (VP9) if you want smaller files.
- Resolution: record at **1920×1080**, export at **1280×720** (sharp, light).
- Keep each clip **5–15 s**, no audio needed (they autoplay muted + looped).
- Aim for **< 3 MB** per clip (these load on the page).

## Free tools

- **OBS Studio** (free, Win/Mac/Linux) — record the screen region.
- **ScreenToGif** (free, Windows) — quick capture + trim, export MP4.
- **Shotcut** or **DaVinci Resolve** (free) — trim, crop, add zoom/highlights, export.
- **HandBrake** (free) — compress/convert to a small web-ready MP4.

A missing file renders a tidy "Showcase coming soon" placeholder, so you can add
recordings incrementally.
