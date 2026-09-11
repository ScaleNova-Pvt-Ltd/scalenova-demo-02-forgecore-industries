# ForgeCore Industries — Technical Architecture

ForgeCore Industries is part of ScaleNova's **EliteOS Tier** designed specifically for precision manufacturing SMEs, custom forging plants, and heavy industrial exporters.

## System Topology

```
[Industrial Client Web Browser]
         │ (HTTPS / TLS 1.3)
         ▼
[ForgeCore Static Web Engine] (Cloudflare Pages CDN Edge)
   - Industrial Palette: Solid Graphite (#0C0D0F) + Forged Amber (#F59E0B)
   - Dynamic 3D Blueprint Canvas: Real-time isometric schematic rendering
   - Specialized RFQ Workflow: Alloy selector, annual volume, tolerances, CAD links
         │
         │ POST JSON (Zero-Secret Client API)
         ▼
[ScaleNova Master Integration Gateway] (Google Apps Script Web App)
   - Request routing via `demoId = "DEMO-02"`
   - Deduplication & ISO payload schema validation
         ├──> [Master Google Sheet CRM] -> Tab: `Demo2_Manufacturing` (22 Standardized Columns)
         ├──> [Dual Transactional Email via Gmail Service]
         │       ├── Plant Director / RFQ notification with technical specs
         │       └── Client confirmation with quotation ticket ID (`SN-FOR-XXXXXX`)
         └──> [ScaleNova Frappe CRM / ERPNext]
                 └── POST https://demo.scalenovasys.com/api/resource/Lead
                 └── Fail-safe asynchronous logging
```

## Security & Privacy
- **Zero-Secret Frontend**: No Frappe API keys or Google service credentials exist in client-side code.
- **Fail-Safe Capture**: If Frappe CRM is unreachable, the lead is safely recorded in Google Sheets and flagged for background retry.
- **Simulation Fallback**: If the live Google Apps Script endpoint is unconfigured, the client code runs a deterministic simulation mode for sales walkthroughs.
