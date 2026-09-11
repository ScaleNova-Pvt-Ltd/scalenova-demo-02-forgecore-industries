# Testing Guide — ForgeCore Industries

## Automated System Test
Run the comprehensive test suite to verify code structure, navigation integrity, and form fields:
```bash
npm test
# or
node test/validate-system.js
```

## Form Submissions
1. Visit `http://localhost:3002/request-quote.html`.
2. Fill out the RFQ form with sample industrial part specifications.
3. Open Developer Tools -> Console:
   - Observe the pre-flight payload logging.
   - Inspect the formatted JSON with submission ID `SN-FOR-XXXXXX`.
   - Verify that the receipt modal renders cleanly with all details.
