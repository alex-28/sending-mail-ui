function resizeIframe(obj) {
  obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
}

const getTemplates = (data) => {
    const iframes = data.map(template => `
      <div class="text-center">
        <p>${template.name}</p>
        <iframe src="${template.path}" frameborder="0" onload="resizeIframe(this)" scrolling="no"></iframe>
      </div>
    `,
    ).join('');
    
    return `<div class="mt-3 d-flex justify-content-between">${iframes}</div>`;
};
