
class Submit {
    constructor(name,email,department,message) {
        this.name = name;
        this.email = email;
        this.department = department;
        this.message = message;
    }
}

class UI {
    static displaySubmited() {
        const submited = Store.getSubmit();
        submited.forEach((submit) => UI.addSubmitToList(submit));
    }
    //add submited
    static addSubmitToList(submit) {
        const list = document.querySelector('#submit-list');
        const row = document.createElement('table');

        row.innerHTML = `
        <hr>
        <tr><td>Name: ${submit.name}</td></tr>
        <tr><td>Email: ${submit.email}</td></tr>
        <tr><td>Department: ${submit.department}</td></tr>
        <tr><td>Message: ${submit.message}</td></tr>
        <tr><th><input type='button' class="btn-sm delete" style="backgrond-color:red" value='Remove'></th></tr>
        `;
        list.appendChild(row);
    }

    //delete submited
    static deleteSubmit(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.parentElement.parentElement.remove();
        }
    }

    //show alert
    
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.spotlight');
        const form = document.querySelector('#submit-form');
        console.log(container);
        console.log(form);
        container.insertBefore(div, form);
    
        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
      }
  
    //clear fields
    static clearField() {
        document.querySelector('#name').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#department').value = '';
        document.querySelector('#message').value = '';

    }
}

class Store {
    static getSubmit() {
        let submited;
        if (localStorage.getItem('submited') === null) {
            submited = [];
        } else {
            submited = JSON.parse(localStorage.getItem('submited'));
        }
        return submited;
    }
    static addsubmit(submit) {
        const submited = Store.getSubmit();
        submited.push(submit);
        localStorage.setItem('submited', JSON.stringify(submited));
    }
    static removeSubmit(message) {
        const submited = Store.getSubmit();
        submited.forEach((submit, index) => {
            if (submit.message === message) {
                submited.splice(index, 1);
            }
        });
        localStorage.setItem('submited', JSON.stringify(submited));
    }
}

// Event: Displat submit
document.addEventListener('DOMContentLoaded', UI.displaySubmited);

// Event: Add submit
document.querySelector('#submit-form').addEventListener('submit', (e) => {
    e.preventDefault();

    //get value
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const department = document.querySelector('#department').value;
    const message = document.querySelector('#message').value;
    //validate
    if (name === '' || email === '' || message === '' || department == '') {
        UI.showAlert('Plase fill in all field', 'danger');
    } else {
        //creat submit class
        const submit = new Submit(name,email,department,message);

        //add to UI
        UI.addSubmitToList(submit);

        //add to store
        Store.addsubmit(submit);

        //show submission
        UI.showAlert('Your submission are added', 'success');

        //UI clear fields
        UI.clearField();
    }
});

//remove this submission
document.querySelector('#submit-list').addEventListener('click', (e) => {
    UI.deleteSubmit(e.target);
    Store.removeSubmit(e.target.parentElement.textContent);
    UI.showAlert('Submission removed', 'success');
});
