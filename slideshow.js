// Slideshow-like full-page fade transitions for each era-section
// Only one .era-section is visible at a time, with fade effect on scroll

document.addEventListener('DOMContentLoaded', function () {
    const sections = Array.from(document.querySelectorAll('.era-section'));
    let current = 0;
    let isScrolling = false;

    function showSection(idx) {
        sections.forEach((sec, i) => {
            if (i === idx) {
                sec.classList.add('active');
            } else {
                sec.classList.remove('active');
            }
        });
    }

    function scrollToSection(idx) {
        if (idx < 0 || idx >= sections.length || idx === current) return;
        isScrolling = true;
        showSection(idx);
        current = idx;
        setTimeout(() => { isScrolling = false; }, 900);
    }

    // Initial state
    showSection(current);

    // Listen for wheel events for slide navigation
    window.addEventListener('wheel', function (e) {
        if (isScrolling) return;
        if (e.deltaY > 0) {
            scrollToSection(current + 1);
        } else if (e.deltaY < 0) {
            scrollToSection(current - 1);
        }
    }, { passive: false });

    // Keyboard navigation (optional)
    window.addEventListener('keydown', function (e) {
        if (isScrolling) return;
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            scrollToSection(current + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            scrollToSection(current - 1);
        }
    });

    // Touch navigation for mobile
    let touchStartY = null;
    window.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) {
            touchStartY = e.touches[0].clientY;
        }
    });
    window.addEventListener('touchend', function (e) {
        if (touchStartY === null) return;
        let touchEndY = e.changedTouches[0].clientY;
        let deltaY = touchStartY - touchEndY;
        if (Math.abs(deltaY) > 50 && !isScrolling) {
            if (deltaY > 0) {
                scrollToSection(current + 1);
            } else {
                scrollToSection(current - 1);
            }
        }
        touchStartY = null;
    });
});
