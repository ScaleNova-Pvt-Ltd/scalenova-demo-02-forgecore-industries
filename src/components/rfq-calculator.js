/**
 * ForgeCore Industries — Precision Engineering RFQ & DFM Cost Calculator
 * Demo 02: ForgeCore Industries (src/components/rfq-calculator.js)
 * Real-time engineering pricing model based on alloy density, machining cycle time, and tolerance tiers.
 */

window.ForgeCoreRFQ = (function () {
  'use strict';

  // Material alloy cost factors per kg
  const MATERIAL_FACTORS = {
    'carbon-steel': { name: 'Carbon Steel (EN8 / EN9)', baseRate: 1.0, machinability: 1.0, leadBase: 7 },
    'alloy-steel': { name: 'Alloy Steel (AISI 4140 / 4340)', baseRate: 1.45, machinability: 1.25, leadBase: 10 },
    'titanium': { name: 'Titanium Ti-6Al-4V (Grade 5)', baseRate: 4.80, machinability: 2.80, leadBase: 16 },
    'inconel': { name: 'Superalloy Inconel 718', baseRate: 5.60, machinability: 3.20, leadBase: 21 },
    'aluminum': { name: 'Aerospace Aluminum (7075-T6)', baseRate: 1.85, machinability: 0.75, leadBase: 6 }
  };

  // Process tooling and hourly machining rates
  const PROCESS_RATES = {
    'forging': { setup: 12000, cycleRate: 35 },
    'machining-5axis': { setup: 8500, cycleRate: 75 },
    'turn-mill': { setup: 6000, cycleRate: 55 },
    'edm': { setup: 9500, cycleRate: 90 }
  };

  // Tolerance multiplier
  const TOLERANCE_MULTIPLIERS = {
    'standard': 1.0,     // ±0.025 mm
    'precision': 1.35,   // ±0.010 mm
    'aerospace': 1.85    // ±0.005 mm (AS9100D Class)
  };

  function calculateEstimate(config) {
    const qty = Math.max(1, parseInt(config.quantity || 100, 10));
    const mat = MATERIAL_FACTORS[config.material] || MATERIAL_FACTORS['carbon-steel'];
    const proc = PROCESS_RATES[config.process] || PROCESS_RATES['forging'];
    const tolMult = TOLERANCE_MULTIPLIERS[config.tolerance] || 1.0;

    // Fixed setup amortized over quantity
    const setupPerUnit = proc.setup / qty;
    // Base unit machining & raw material component
    const unitMaterialCost = 140 * mat.baseRate;
    const unitMachiningCost = proc.cycleRate * mat.machinability * tolMult;

    const unitTotal = Math.round(setupPerUnit + unitMaterialCost + unitMachiningCost);
    const minUnit = Math.round(unitTotal * 0.92);
    const maxUnit = Math.round(unitTotal * 1.08);

    // Lead time calculation
    const leadDays = Math.ceil(mat.leadBase + (qty > 1000 ? 5 : 0) + (config.tolerance === 'aerospace' ? 4 : 0));

    return {
      quantity: qty,
      materialName: mat.name,
      estimatedMinUnit: minUnit,
      estimatedMaxUnit: maxUnit,
      estimatedLotTotal: (minUnit * qty).toLocaleString('en-IN'),
      leadDays: `${leadDays}–${leadDays + 4} Business Days`,
      complianceTier: config.tolerance === 'aerospace' ? 'AS9100D Aerospace Certified' : 'ISO 9001:2015 Industrial'
    };
  }

  function initCalculator() {
    const calcContainer = document.getElementById('rfq-calculator-widget');
    if (!calcContainer) return;

    const matSelect = calcContainer.querySelector('[data-rfq-material]');
    const procSelect = calcContainer.querySelector('[data-rfq-process]');
    const tolSelect = calcContainer.querySelector('[data-rfq-tolerance]');
    const qtySlider = calcContainer.querySelector('[data-rfq-quantity]');
    const qtyDisplay = calcContainer.querySelector('[data-rfq-qty-display]');

    const outUnit = calcContainer.querySelector('[data-rfq-unit-price]');
    const outLead = calcContainer.querySelector('[data-rfq-lead-time]');
    const outCompliance = calcContainer.querySelector('[data-rfq-compliance]');

    function update() {
      const config = {
        material: matSelect ? matSelect.value : 'carbon-steel',
        process: procSelect ? procSelect.value : 'forging',
        tolerance: tolSelect ? tolSelect.value : 'precision',
        quantity: qtySlider ? qtySlider.value : 500
      };

      if (qtyDisplay && qtySlider) {
        qtyDisplay.textContent = parseInt(qtySlider.value, 10).toLocaleString('en-IN') + ' Units';
      }

      const res = calculateEstimate(config);

      if (outUnit) {
        outUnit.textContent = `₹${res.estimatedMinUnit.toLocaleString('en-IN')} – ₹${res.estimatedMaxUnit.toLocaleString('en-IN')} / unit`;
      }
      if (outLead) {
        outLead.textContent = res.leadDays;
      }
      if (outCompliance) {
        outCompliance.textContent = res.complianceTier;
      }
    }

    [matSelect, procSelect, tolSelect, qtySlider].forEach(el => {
      if (el) {
        el.addEventListener('input', update);
        el.addEventListener('change', update);
      }
    });

    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalculator);
  } else {
    initCalculator();
  }

  return {
    calculate: calculateEstimate
  };
})();
