const loader = document.getElementById('loader');
const container = document.getElementById('unsplash');

// api
const apiKey = "jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek";
const count = 20;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

let ready = false;
let imagesLoaded = 0;

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function imageReady() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function showImages(data) {
  imagesLoaded = 0;
  totalImages = data.length;
  data.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank"
    });
    const image = document.createElement('img');
    setAttributes(image, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.description,
    });
    image.addEventListener('load', imageReady);
    item.appendChild(image);
    container.appendChild(item);
  });
}

async function getPhoto () {
  try {
    await fetch(apiUrl)
    .then((res) => res.json())
    .then(data => {
      showImages(data)
    })
  } catch (err) {
    console.log(err)
  }
}

window.addEventListener('scroll', () => {
  if (window.scrollY >= document.body.offsetHeight + 10000 && ready) {
    ready = false;
    getPhoto();
  }
});

getPhoto();