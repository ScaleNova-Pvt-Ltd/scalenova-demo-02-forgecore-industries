# ForgeCore Industries — ScaleNova EliteOS Demo 02

![ScaleNova Demo 02](https://img.shields.io/badge/ScaleNova-EliteOS_Demo_02-amber)
![Industry](https://img.shields.io/badge/Industry-Manufacturing_&_Heavy_Engineering-orange)
![Integration](https://img.shields.io/badge/Integration-GAS_•_Google_Sheets_•_Frappe_CRM-green)

A production-grade demonstration website representing ScaleNova's **EliteOS Tier** for Indian and international manufacturing SMEs, forging companies, and precision machine shops.

## Features
- **Industry Design System**: Industrial Graphite (`#0C0D0F`), Slate Grids, and Forged Amber (`#F59E0B`) highlights.
- **Interactive 3D Blueprint Canvas**: Continuous geometric isometric animation with mouse interaction.
- **11 Rich Content & Operational Pages**:
  - `index.html` (Hero, capabilities, plant stats, client testimonials)
  - `about.html` (History, facility layout, executive leadership)
  - `capabilities.html` (Press capacities, CNC envelopes, metallurgical grades)
  - `manufacturing.html` (Process workflow from billet to heat treatment)
  - `engineering.html` (DEFORM-3D grain simulation, toolroom, DFM)
  - `industries.html` (Aerospace, Energy, Mining, Heavy Automotive)
  - `projects.html` (Case studies, subsea manifolds, planetary rings)
  - `quality-certifications.html` (AS9100 Rev D, IATF 16949, ISO 9001, NABL lab)
  - `insights.html` (Metallurgical whitepapers and design guides)
  - `request-quote.html` (Full RFQ form with CAD link & alloy selector)
  - `contact.html` & `privacy.html`
- **One Shared Integration Gateway**: Routes directly to Google Apps Script `DEMO-02`, updating Google Sheet `Demo2_Manufacturing` and Frappe CRM (`demo.scalenovasys.com`).

## Quick Start
```bash
npm install # optional
npm run dev # runs serve at port 3002
npm test    # runs 22-point system validation test
```
