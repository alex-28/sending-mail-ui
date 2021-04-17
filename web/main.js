window.addEventListener('load', () => {
  const root = document.getElementById('root');

  Promise.all([eel.get_users()(), eel.get_templates()(), eel.get_config()()]).then(([csv_data, html_templates, config]) => {
    root.innerHTML = `
    <h1 class="display-4">Sending email</h1>
    <ul class="nav nav-tabs mt-1">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="tab" href="#home">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#config">Config</a>
      </li>
    </ul>
    <div class="tab-content">
      <div id="home" class="tab-pane active">
        ${getUsersList(csv_data, html_templates)}
        ${getTemplates(html_templates)}
      </div>
      <div id="config" class="tab-pane fade">${getConfigForm(config)}</div>
    </div>
    `
  });
});
