let currentIndex = 0;
let visibleImages = [];

const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

// Update visible images array
function updateVisibleImages() {
  visibleImages = Array.from(document.querySelectorAll('.gallery-item'))
    .filter(item => item.style.display !== 'none')
    .map(item => item.querySelector('img'));
}

// Open lightbox
galleryItems.forEach(item => {
  const img = item.querySelector('img');
  img.addEventListener('click', () => {
    updateVisibleImages();
    currentIndex = visibleImages.findIndex(vi => vi === img);
    if (currentIndex >= 0) {
      lightbox.style.display = 'flex';
      lightboxImg.src = img.src;
    }
  });
});

// Close lightbox
function closeLightbox() {
  lightbox.style.display = 'none';
}

// Navigate through lightbox
function changeImage(direction) {
  updateVisibleImages();
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = visibleImages.length - 1;
  if (currentIndex >= visibleImages.length) currentIndex = 0;
  lightboxImg.src = visibleImages[currentIndex].src;
}

// Filter gallery by category
function filterGallery(category) {
  galleryItems.forEach(item => {
    const match = category === 'all' || item.classList.contains(category);
    item.style.display = match ? 'block' : 'none';
  });
  updateVisibleImages();
}

// Search by title
function searchImages() {
  const query = document.getElementById('searchBox').value.toLowerCase();
  galleryItems.forEach(item => {
    const title = item.getAttribute('data-title').toLowerCase();
    item.style.display = title.includes(query) ? 'block' : 'none';
  });
  updateVisibleImages();
}

// Hide loader
window.onload = () => {
  document.getElementById('loader').style.display = 'none';
};
