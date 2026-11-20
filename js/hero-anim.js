/**
 * ZEE EATERY — HERO ANIMATION ENGINE
 * Transforms the luxury hero headline into delicately staggered letter animations
 * with subtle perpetual floating movement on selected characters, and adds subtle
 * ambient floating motion to featured editorial imagery.
 */

function initHeroAnim() {
  const headline = document.querySelector('.hero-letter-anim');
  if (headline && !headline.dataset.animInitialized) {
    headline.dataset.animInitialized = 'true';

    // Preserve screen reader accessibility
    const fullText = headline.textContent.trim();
    headline.setAttribute('aria-label', fullText);

    // Parse words and letters
    const rawWords = fullText.split(' ');
    headline.innerHTML = '';
    headline.setAttribute('aria-hidden', 'true');

    let letterIndex = 0;
    // Selected letter indices that get a subtle continuous float
    const floatIndices = new Set([3, 8, 14, 22, 28, 35]);

    rawWords.forEach((wordText, wIdx) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'anim-word';

      const letters = Array.from(wordText);
      letters.forEach((char) => {
        const letterSpan = document.createElement('span');
        letterSpan.className = 'anim-letter';
        letterSpan.textContent = char;

        // Staggered reveal timing: 38ms per letter, starting after a 0.2s initial pause
        const delay = 0.2 + (letterIndex * 0.038);
        letterSpan.style.animationDelay = `${delay.toFixed(3)}s`;

        // Check if this letter should have subtle perpetual floating motion
        if (floatIndices.has(letterIndex)) {
          letterSpan.classList.add('float-subtle');
          const floatDelay = delay + 0.85 + (letterIndex * 0.08);
          letterSpan.style.animationDelay = `${delay.toFixed(3)}s, ${floatDelay.toFixed(3)}s`;
        }

        wordSpan.appendChild(letterSpan);
        letterIndex++;
      });

      headline.appendChild(wordSpan);

      // Add space between words
      if (wIdx < rawWords.length - 1) {
        const space = document.createTextNode(' ');
        headline.appendChild(space);
      }
    });
  }

  // Subtle perpetual floating animation on featured editorial images
  const featuredImages = document.querySelectorAll('.editorial-frame img, .signature-card img, .hero-experience-badge');
  featuredImages.forEach((img, idx) => {
    if (!img.classList.contains('float-subtle-image')) {
      img.classList.add('float-subtle-image');
      img.style.animationDelay = `${(idx * 0.4).toFixed(2)}s`;
    }
  });
}

// Guarantee execution regardless of when DOM loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroAnim);
} else {
  initHeroAnim();
}
