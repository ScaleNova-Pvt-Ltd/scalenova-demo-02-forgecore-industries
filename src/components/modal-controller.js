/**
 * Accessible Modal Window & Drawer Controller
 * Demo 02: ForgeCore Industries (src/components/modal-controller.js)
 */

(function () {
  'use strict';

  class ModalController {
    constructor() {
      this.activeModal = null;
      this.init();
    }

    init() {
      // Listen for click on modal triggers: [data-open-modal="modal-id"]
      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-open-modal]');
        if (trigger) {
          e.preventDefault();
          const targetId = trigger.getAttribute('data-open-modal');
          this.open(targetId);
        }

        // Listen for close buttons: [data-close-modal]
        const closeBtn = e.target.closest('[data-close-modal]');
        if (closeBtn) {
          e.preventDefault();
          this.close();
        }

        // Click outside on backdrop
        if (e.target.classList.contains('modal-overlay')) {
          this.close();
        }
      });

      // Listen for Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.activeModal) {
          this.close();
        }
      });
    }

    open(modalId) {
      const modal = document.getElementById(modalId);
      if (!modal) return;

      this.close(); // Close any currently open modal
      this.activeModal = modal;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Focus first focusable element
      const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable) {
        setTimeout(() => focusable.focus(), 50);
      }
    }

    close() {
      if (!this.activeModal) return;
      this.activeModal.classList.remove('active');
      document.body.style.overflow = '';
      this.activeModal = null;
    }
  }

  window.forgeModalController = new ModalController();
})();
