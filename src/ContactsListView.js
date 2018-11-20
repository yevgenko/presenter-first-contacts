function ContactListView() {
    var view = canEmitEvents({}, ['selectionChanged']);

    var contactsList = document.querySelector('.contactsList');
    contactsList.addEventListener('change', function() {
        view.emit('selectionChanged');
    });

    view.getSelectedIndex = function() {
        return contactsList.selectedIndex;
    };

    view.setNames = function(names) {
        for(var i = contactsList.options.length - 1; i >= 0; i--) {
            contactsList.options.remove(i);
        };

        names.forEach(function(name) {
            var option = document.createElement("option");
            option.text = name;
            contactsList.add(option);
        });

        contactsList.selectedIndex = 0;
    };

    return view;
};