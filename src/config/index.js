window.DEMO_CONFIG = {
  demoId: 'DEMO-02',
  industry: 'Manufacturing & Industrial',
  clientName: 'ForgeCore Industries',
  appsScriptUrl: window.APPS_SCRIPT_WEB_APP_URL || 'https://script.google.com/macros/s/AKfycby-kC_gnWLAMrKc40yu0TOga5yZDreR50X-2AWw2rHrzCFi3oZp2W9Xqq3KXNoTh6bj/exec'
};

/**
 * ScaleNova Client Demo 02 — ForgeCore Industries
 * Frontend Configuration Module (src/config/index.js)
 */

window.FORGECORE_CONFIG = {
  demoId: 'DEMO-02',
  industry: 'Manufacturing & Industrial SMEs',
  clientName: 'ForgeCore Industries',
  tagline: 'Precision Forging • CNC Machining • Mission-Critical Assemblies',

  brand: {
    phone: '+91 (020) 2712 8800',
    email: 'rfq@forgecore.example.com',
    hq: 'Plot 44, MIDC Bhosari Industrial Area, Pune, Maharashtra 411026',
    facilities: ['Pune Heavy Foundry (Works 1)', 'Coimbatore CNC Facility (Works 2)', 'Chennai Export Hub (Works 3)']
  },

  endpoints: {
    submitUrl: (window.SCALENOVA_GATEWAY && window.SCALENOVA_GATEWAY.submitUrl) || 
               'https://script.google.com/macros/s/AKfycby-kC_gnWLAMrKc40yu0TOga5yZDreR50X-2AWw2rHrzCFi3oZp2W9Xqq3KXNoTh6bj/exec',
    allowSimulationMode: true
  },

  capabilities: [
    'Heavy Forging (Closed & Open Die up to 12 Tons)',
    '5-Axis High-Speed CNC Milling & Turning',
    'Robotic MIG/TIG Fabrications & Laser Profiling',
    'Heat Treatment (Quench, Temper, Nitriding)',
    'CMM Dimensional & NDT Ultrasonic Testing'
  ],

  materials: [
    'Alloy Steels (EN24, EN19, 4140, 4340)',
    'Stainless Steels (SS304, SS316, 17-4PH)',
    'Titanium Grade 5 (Ti-6Al-4V)',
    'Aerospace Aluminum (6061-T6, 7075-T651)',
    'Nickel Alloys (Inconel 625, Monel 400)'
  ]
};
