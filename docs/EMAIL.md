# Transactional Email Notification Specification — ForgeCore Industries

## 1. Sender Identity
- **Configured Sender**: `demo@scalenovasys.com`
- **Authorized Transport**: Google Apps Script MailApp / GmailApp via authorized account

## 2. Dual Notification Paths
### A. Internal Hot Lead Alert (ScaleNova Team)
- **Subject**: `NEW LEAD ALERT: [ForgeCore Industries] {Service} — Ref #{SubmissionID}`
- **Latency**: Dispatched within 60 seconds
- **Features**: Full 23-column data breakdown, direct WhatsApp click-to-chat link.

### B. Branded Customer Confirmation (ForgeCore Industries)
- **Subject**: `Thank You for Contacting ForgeCore Industries — Ref #{SubmissionID}`
- **Features**: Branded header in `#121214`, professional greeting, next steps, link to `https://demo2.scalenovasys.com`.
