describe("ContactListModel", function() {
    var model;

    beforeEach(function() {
        model = ContactListModel();
    });

    it('provides the list of names', function() {
        expect(model.getNames()).toEqual([]);

        model.setContacts([
            {name: 'John Doe'}
        ])
        expect(model.getNames()).toEqual(['John Doe']);

        model.setContacts([
            {name: 'John Doe'},
            {name: 'John Smith'},
            {name: 'John Foobar'}
        ])
        expect(model.getNames()).toEqual([
            'John Doe',
            'John Smith',
            'John Foobar'
        ]);

        model.setContacts([
            { not_name: 'NotName' }
        ]);
        // TODO: what should we do in this case?
        expect(model.getNames()).toEqual([undefined]);
    });

    describe("when contacts changes", function() {
        it('calls listeners', function() {
            // is it the test for model or presenter?
            // we have the same emiter implementation in presenter
            // but those objects are mocks and "emit" triggered on them
            // not as a side effect of "setContacts"
            // ...
            // seems like the model is the right place, also, note we're testing
            // specific event "contactsChanged", we might consider to move
            // 'canEmit' into the model constructor as it is implementation details
            // of model and we can also unit test "canEmit" separately

            listener = jasmine.createSpy('listenerSpy');
            model.when('contactsChanged', listener);

            model.setContacts([]);

            expect(listener).toHaveBeenCalled();
        });
    });

    describe('when selecting contact by index', function() {
        it('triggers event');
        it('marks contact as current');
    });

    describe('when saving contact', function() {
        it('resets contacts');
    })

    function ContactListModel() {
        var model = canEmitEvents({}, ['contactsChanged']);

        model.contacts = [];

        model.getNames = function() {
            var names = [];

            this.contacts.forEach(function(contact) {
                names.push(contact.name);
            });

            return names;
        };

        model.setContacts = function(contacts) {
            this.contacts = contacts;
            this.emit('contactsChanged');
        };

        model.selectByIndex = function(index) {
            // to be implemented in future
        }

        return model;
    };
});