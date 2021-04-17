const FORM_ID = 'configForm'

const onSave = () => {
    const form = document.forms[FORM_ID];
    const { server, user, password } = form;
    
    eel.edit_config({
        server: server.value,
        user: user.value,
        password: password.value,
    })().then(() => {
      const alertEl = document.createElement('div');
      alertEl.classList = 'alert alert-success'
      alertEl.setAttribute('role', 'alert')
      alertEl.innerHTML = '<strong>The config was edited successfully</strong>'
      root.insertAdjacentElement('afterbegin', alertEl);
  
      setTimeout(() => root.removeChild(alertEl), 1500);
    });
}

const getConfigForm = (config) => {
    const inputs = Object.keys(config).map(key => {
        return `
          <div>
            <label for="${key}" class="form-label">${key}</label>
            <input class="form-control" name="${key}" id="${key}" value="${config[key]}">
          </div>
        `
      }).join('');

    return `
      <div>
          <h2>Config</h2>
          <form id="${FORM_ID}" onsubmit="event.preventDefault(); onSave()">
          ${inputs}
          <button type="submit" class="btn btn-primary mt-1">Save</button>
          </form>
      </div>
    `
}