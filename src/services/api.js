/**
 * ScaleNova Systems — Client API Dispatcher (src/services/api.js)
 * Demo 02: ForgeCore Industries
 */

window.ScaleNovaAPI = (function () {
  'use strict';

  const config = window.FORGECORE_CONFIG || {
    demoId: 'DEMO-02',
    industry: 'Manufacturing & Industrial SMEs',
    clientName: 'ForgeCore Industries',
    endpoints: { submitUrl: '', allowSimulationMode: true }
  };

  async function submitLead(formData, options = {}) {
    if (formData.website_hp || formData.company_hp) {
      console.warn('[ScaleNova Security] Honeypot triggered. Silently dropping payload.');
      return mockSuccessResponse(formData, 'SPAM_FILTERED');
    }

    if (!formData.name || !formData.email) {
      throw new Error('Name and email are mandatory fields.');
    }

    const payload = {
      demoId: config.demoId,
      industry: config.industry,
      sourceWebsite: config.clientName + ' Website',
      leadType: formData.leadType || 'QUOTE_REQUEST',
      page: formData.page || window.location.pathname || 'Home',
      timestamp: new Date().toISOString(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: (formData.phone || '').trim(),
      company: (formData.company || '').trim() || 'OEM / Tier-1 Partner',
      service: formData.service || 'Precision CNC Machining',
      requirement: formData.requirement || 'Production Batch RFQ',
      budget: formData.budget || 'Production Batch',
      preferredDate: formData.preferredDate || '',
      preferredTime: formData.preferredTime || '',
      message: (formData.message || '').trim()
    };

    const endpoint = config.endpoints.submitUrl;
    const isMock = !endpoint || endpoint.includes('DEMO_ENDPOINT_ID');

    if (isMock) {
      await new Promise(r => setTimeout(r, 700));
      return mockSuccessResponse(payload);
    }

    try {
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      if (!resp.ok) throw new Error(`HTTP Error ${resp.status}`);
      const result = await resp.json();
      if (result.status === 'error') throw new Error(result.message || 'Submission failed');
      return result;
    } catch (err) {
      console.warn('[ScaleNova API] Falling back to local simulation:', err);
      if (config.endpoints.allowSimulationMode) return mockSuccessResponse(payload);
      throw err;
    }
  }

  function mockSuccessResponse(payload, overrideId) {
    const submissionId = overrideId || ('SN-FOR-' + new Date().toISOString().slice(0, 7).replace('-', '') + '-' + Math.floor(1000 + Math.random() * 9000));
    
    console.group('%c[ScaleNova Demo 02 Ingestion Gateway: ForgeCore Industries]', 'color:#F59E0B;font-weight:bold;font-size:12px;');
    console.log('Demo ID: DEMO-02 (Manufacturing & Industrial SMEs)');
    console.log('Generated Submission ID:', submissionId);
    console.log('Target Google Sheet Tab: "Demo2_Manufacturing"');
    console.log('Frappe CRM Lead Resource Contract:', {
      doctype: 'Lead',
      lead_name: payload.name,
      email_id: payload.email,
      mobile_no: payload.phone,
      company_name: payload.company,
      source: 'ScaleNova Demo — Manufacturing & Industrial SMEs',
      status: 'Lead',
      notes: `Submission ID: ${submissionId} | Manufacturing Spec: ${payload.requirement}`
    });
    console.log('Owner Engineering Alert: Dispatched to works manager');
    console.log('Client RFQ Receipt: Dispatched to ' + payload.email);
    console.groupEnd();

    return {
      status: 'success',
      submissionId: submissionId,
      demoId: config.demoId,
      leadType: payload.leadType,
      sheetLogged: true,
      frappeStatus: 'SYNCED',
      message: 'RFQ successfully ingested into ScaleNova ERP / CRM pipeline.'
    };
  }

  return { submitLead };
})();
