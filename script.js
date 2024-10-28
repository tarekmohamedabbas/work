const imageNamesKG = [];
for (let i = 1; i <= 143; i++) {
    const formattedNumber = i.toString().padStart(3, '0');
    imageNamesKG.push(`i${formattedNumber}.jpg`);
}



const imageNamesGrade = [];
// أضف أسماء الصور لمجلد Grade هنا بنفس الطريقة، كمثال:
for (let i = 1; i <= 645; i++) {
    const formattedNumber = i.toString().padStart(3, '0');
    imageNamesGrade.push(`i${formattedNumber}.jpg`); // مثال على أسماء الصور في مجلد Grade
}

const gallery = document.getElementById('gallery');
const showKGImagesButton = document.getElementById('showKGImagesButton');
const showGradeImagesButton = document.getElementById('showGradeImagesButton');

showKGImagesButton.addEventListener('click', () => {
    displayImages(imageNamesKG, 'kg');
});

showGradeImagesButton.addEventListener('click', () => {
    displayImages(imageNamesGrade, 'grade');
});

function displayImages(imageNames, folder) {
    gallery.innerHTML = ''; // مسح الصور السابقة
    gallery.style.display = 'block';

    imageNames.forEach(imageName => {
        const img = document.createElement('img');
        img.src = `photo/${folder}/${imageName}`;
        img.alt = imageName;

        img.addEventListener('click', () => {
            const activeImage = document.querySelector('.active');
            if (activeImage) {
                activeImage.classList.remove('active');
            }

            img.classList.add('active');

            // Create and show close, zoom in, zoom out, prev, next buttons
            createButtons(img, imageNames, folder);
        });

        gallery.appendChild(img);
    });
}

function createButtons(img, imageNames, folder) {
    const currentIndex = imageNames.indexOf(img.alt); // حفظ الفهرس الحالي للصورة

    // زر "X" للإغلاق
    let closeButton = document.createElement('button');
    closeButton.innerText = '✖';
    closeButton.className = 'close-btn';
    document.body.appendChild(closeButton);

    closeButton.addEventListener('click', () => {
        img.classList.remove('active');
        document.body.removeChild(closeButton);
        if (zoomInButton) document.body.removeChild(zoomInButton);
        if (zoomOutButton) document.body.removeChild(zoomOutButton);
        if (prevButton) document.body.removeChild(prevButton);
        if (nextButton) document.body.removeChild(nextButton);
    });

    // زر تكبير الصورة
    let zoomInButton = document.createElement('button');
    zoomInButton.innerText = '🔍 +';
    zoomInButton.className = 'zoom-in-btn';
    document.body.appendChild(zoomInButton);

    zoomInButton.addEventListener('click', () => {
        const currentWidth = img.clientWidth;
        img.style.width = `${currentWidth + 20}px`; // زيادة الحجم
    });

    // زر تصغير الصورة
    let zoomOutButton = document.createElement('button');
    zoomOutButton.innerText = '🔍 -';
    zoomOutButton.className = 'zoom-out-btn';
    document.body.appendChild(zoomOutButton);

    zoomOutButton.addEventListener('click', () => {
        const currentWidth = img.clientWidth;
        img.style.width = `${Math.max(currentWidth - 20, 100)}px`; // تقليل الحجم
    });

    // زر الصورة السابقة
    let prevButton = document.createElement('button');
    prevButton.innerText = '◀';
    prevButton.className = 'prev-btn';
    document.body.appendChild(prevButton);

    prevButton.addEventListener('click', () => {
        const prevIndex = (currentIndex === 0) ? imageNames.length - 1 : currentIndex - 1;
        img.src = `photo/${folder}/${imageNames[prevIndex]}`;
        img.alt = imageNames[prevIndex];
    });

    // زر الصورة التالية
    let nextButton = document.createElement('button');
    nextButton.innerText = '▶';
    nextButton.className = 'next-btn';
    document.body.appendChild(nextButton);

    nextButton.addEventListener('click', () => {
        const nextIndex = (currentIndex === imageNames.length - 1) ? 0 : currentIndex + 1;
        img.src = `photo/${folder}/${imageNames[nextIndex]}`;
        img.alt = imageNames[nextIndex];
    });

    
}
