const loadingBg = document.createElement('div');

export const loadingStart = () => {
  loadingBg.classList.add('loading_bg');
  loadingBg.innerHTML = `
    <div class="loading"></div>
  `
  document.body.appendChild(loadingBg);
}

export const loadingEnd = () => {
  document.body.removeChild(loadingBg);
}