function ContactEditorView() {
    var view = canEmitEvents({}, ['userSaved']);
    var contactNameField = document.querySelector('.contactsEditor input[name="name"]');
    var contactEmailField = document.querySelector('.contactsEditor input[name="email"]');
    var contactSaveBtn = document.querySelector('.contactsEditor button');

    contactSaveBtn.addEventListener("click", function() {
        view.emit('userSaved');
    });

    view.setName = function(name) {
        contactNameField.value = name;
    }
    view.setEmail = function(email) {
        contactEmailField.value = email;
    }

    view.getName = function(name) {
        return contactNameField.value;
    }
    view.getEmail = function(email) {
        return contactEmailField.value;
    }

    return view;
};