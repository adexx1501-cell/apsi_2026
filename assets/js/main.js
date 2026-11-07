
/**
* Template Name: Maxim
* Template URL: https://bootstrapmade.com/maxim-free-onepage-bootstrap-theme/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');

    if (!selectBody || !selectHeader) return;

    if (
      !selectHeader.classList.contains('scroll-up-sticky') &&
      !selectHeader.classList.contains('sticky-top') &&
      !selectHeader.classList.contains('fixed-top')
    ) {
      return;
    }

    window.scrollY > 100
      ? selectBody.classList.add('scrolled')
      : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);


  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    const body = document.querySelector('body');

    if (!body || !mobileNavToggleBtn) return;

    body.classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }


  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (
        document.body.classList.contains('mobile-nav-active') &&
        mobileNavToggleBtn
      ) {
        mobileNavToogle();
      }
    });
  });


  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();

      const parent = this.parentNode;
      const submenu = parent ? parent.nextElementSibling : null;

      if (parent) {
        parent.classList.toggle('active');
      }

      if (submenu) {
        submenu.classList.toggle('dropdown-active');
      }

      e.stopImmediatePropagation();
    });
  });


  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');

  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }


  /**
   * Scroll to top button
   */
  const scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (!scrollTop) return;

    window.scrollY > 100
      ? scrollTop.classList.add('active')
      : scrollTop.classList.remove('active');
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);


  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }

  window.addEventListener('load', aosInit);


  /**
   * Init swiper sliders
   */
  function initSwiper() {
    if (typeof Swiper === 'undefined') return;

    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {

      const configElement = swiperElement.querySelector(".swiper-config");

      if (!configElement) return;

      let config;

      try {
        config = JSON.parse(configElement.innerHTML.trim());
      } catch (error) {
        console.error('Konfigurasi Swiper tidak valid:', error);
        return;
      }

      if (swiperElement.classList.contains("swiper-tab")) {

        if (typeof initSwiperWithCustomPagination === 'function') {
          initSwiperWithCustomPagination(swiperElement, config);
        }

      } else {
        new Swiper(swiperElement, config);
      }

    });
  }

  window.addEventListener("load", initSwiper);



/**
 * Initiate GLightbox
 * Galeri struktur organisasi tetap terpisah.
 * Galeri produk mengikuti filter Portfolio.
 */
if (typeof GLightbox !== 'undefined') {

  GLightbox({
    selector: '.glightbox[data-gallery="organization-gallery"]'
  });

}


/**
 * Init isotope layout and filters
 */
if (
  typeof imagesLoaded !== 'undefined' &&
  typeof Isotope !== 'undefined'
) {

  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {

    const isotopeContainer = isotopeItem.querySelector('.isotope-container');

    if (!isotopeContainer) return;

    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope = null;
    let portfolioLightbox = null;


    /**
     * Buat satu instance GLightbox khusus produk
     * Daftar gambarnya akan diperbarui saat diklik
     */
    if (typeof GLightbox !== 'undefined') {

      portfolioLightbox = GLightbox({
        selector: null,
        loop: true
      });

    }


    /**
     * Klik gambar produk
     */
    isotopeContainer.addEventListener('click', function(e) {

      const link = e.target.closest('a.glightbox');

      if (!link) return;

      e.preventDefault();

      if (!initIsotope || !portfolioLightbox) return;


      /**
       * Ambil semua gambar yang sedang tampil
       * berdasarkan filter Isotope
       */
      const visibleLinks = initIsotope.filteredItems
        .map(function(item) {

          return item.element.querySelector('a.glightbox');

        })
        .filter(function(item) {

          return item !== null;

        });


      /**
       * Susun gambar untuk GLightbox
       */
      const galleryElements = visibleLinks.map(function(item) {

        return {
          href: item.href,
          type: 'image'
        };

      });


      /**
       * Cari posisi gambar yang diklik
       */
      const clickedIndex = visibleLinks.indexOf(link);

      if (clickedIndex === -1) return;


      /**
       * Masukkan gambar sesuai filter aktif
       */
      portfolioLightbox.setElements(galleryElements);


      /**
       * Buka gambar sesuai posisi yang diklik
       */
      portfolioLightbox.openAt(clickedIndex);

    });


    /**
     * Inisialisasi Isotope
     */
    imagesLoaded(isotopeContainer, function() {

      initIsotope = new Isotope(isotopeContainer, {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });

    });


    /**
     * Portfolio filters
     */
    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {

      filters.addEventListener('click', function() {

        const activeFilter = isotopeItem.querySelector(
          '.isotope-filters .filter-active'
        );

        if (activeFilter) {
          activeFilter.classList.remove('filter-active');
        }

        this.classList.add('filter-active');

        if (initIsotope) {

          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });

        }

        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }

      }, false);

    });

  });

}

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {

    faqItem.addEventListener('click', () => {

      const faqParent = faqItem.parentNode;

      if (faqParent) {
        faqParent.classList.toggle('faq-active');
      }

    });

  });


  /**
   * Correct scrolling position upon page load for URLs containing hash links
   */
  window.addEventListener('load', function() {

    if (window.location.hash) {

      const section = document.querySelector(window.location.hash);

      if (section) {

        setTimeout(() => {

          const scrollMarginTop = parseInt(
            getComputedStyle(section).scrollMarginTop
          ) || 0;

          window.scrollTo({
            top: section.offsetTop - scrollMarginTop,
            behavior: 'smooth'
          });

        }, 100);

      }

    }

  });


  /**
   * Navmenu Scrollspy
   */
  const navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {

    navmenulinks.forEach(navmenulink => {

      if (!navmenulink.hash) return;

      let section;

      try {
        section = document.querySelector(navmenulink.hash);
      } catch (error) {
        return;
      }

      if (!section) return;

      const position = window.scrollY + 200;

      if (
        position >= section.offsetTop &&
        position <= (section.offsetTop + section.offsetHeight)
      ) {

        document.querySelectorAll('.navmenu a.active').forEach(link => {
          link.classList.remove('active');
        });

        navmenulink.classList.add('active');

      } else {

        navmenulink.classList.remove('active');

      }

    });

  }

  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
