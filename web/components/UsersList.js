const getFormId = (id) => `user-${id}`

const onSubmit = (id) => {
    const form = document.forms[getFormId(id)];
    const root = document.getElementById('root');
  
    eel.send({
      template: form.template.value,
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      email: form.email.value,
      id,
    })().then(() => {
      const alertEl = document.createElement('div');
      alertEl.classList = 'alert alert-success'
      alertEl.setAttribute('role', 'alert')
      alertEl.innerHTML = '<strong>The email was sent successfully</strong>'
      root.insertAdjacentElement('afterbegin', alertEl);
  
      setTimeout(() => root.removeChild(alertEl), 1500);
    });
}

const getUsersList = (data, html_templates) => {
    const select = `
        <select name="template" class="form-select" style="width:auto; margin-right: 5px">
            ${html_templates.map((item) => `<option value="${item.name}">${item.name}</option>`).join('')}
        </select>
    `;
    
    const userItems = data.map((item) => {
      const inputs = Object.keys(item).map(key => {
        if (key === 'id') {
          return ''
        }

        return `
        <div>
          <label class="form-label">${key}</label>
          <input type="text" name="${key}" class="form-control" placeholder="${key}" value="${item[key]}" style="width:auto; margin-right: 5px">
        </div>`
      }).join('');

        return `
        <li class="list-group-item">
          <form id="${getFormId(item.id)}" class="d-flex" onsubmit="event.preventDefault(); onSubmit(${item.id})">
            ${inputs}
            <div class="d-flex align-self-end" style="margin-left: auto">
              ${select}
              <button type="submit" class="btn btn-primary">
                Save & Send
              </button>
            </div>
          </form>
        </li>
        `;
      }).join('');

    return `<ul class="mt-3 list-group">${userItems}</ul>`;
};
