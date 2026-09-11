# Integration Guide — ForgeCore Industries

## Shared Gateway Specification
- **Demo Identifier:** `DEMO-02`
- **Lead Prefix:** `SN-FOR-`
- **Target Sheet:** `Demo2_Manufacturing`
- **Target Frappe Source:** `ForgeCore Industries Web RFQ`

### Payload Schema
```json
{
  "demoId": "DEMO-02",
  "industry": "Manufacturing",
  "sourceWebsite": "ForgeCore Industries (Demo 02)",
  "leadType": "RFQ",
  "fullName": "Rajesh Singhania",
  "email": "singhania@apexgears.com",
  "phone": "+91 98200 12345",
  "companyName": "Apex Precision Gears Pvt Ltd",
  "city": "Pune",
  "serviceInterest": "Closed-Die Forging",
  "budgetRange": "1,000 - 5,000 units/year",
  "timeline": "30-60 Days",
  "projectDescription": "Forged helical ring gears in 20MnCr5 alloy with rough turning and Charpy test certificates.",
  "submissionId": "SN-FOR-948123"
}
```
All incoming submissions are routed to tab `Demo2_Manufacturing` and automatically synced to Frappe CRM.
