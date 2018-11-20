describe("ContactEditorModel", function() {
    var model;

    beforeEach(function() {
        model = ContactEditorModel();
    });

    describe('when contact info changes', function() {
        it('notifies listeners', function() {
            var listener = jasmine.createSpy('listenerSpy');
            model.when('contactInfoChanged', listener);

            model.setContactInfo({});

            expect(listener).toHaveBeenCalled();
        });

        it('holds new contact info', function() {
            model.setContactInfo({name: '::NAME::'});
            expect(model.contactInfo).toEqual({name: '::NAME::'});
        });
    });

    describe('when saving contact info', function() {
        it('triggers saveRequested event');
    });

    function ContactEditorModel() {
        var model;

        model = canEmitEvents({}, ['contactInfoChanged']);

        model.setContactInfo = function(contact) {
            this.contactInfo = contact;
            this.emit('contactInfoChanged');
        };

        model.getName = function() {
            return this.contactInfo.name;
        };
        model.getEmail = function() {
            return this.contactInfo.email;
        };

        model.setName = function(name) {
            this.contactInfo.name = name;
        };
        model.setEmail = function(email) {
            this.contactInfo.email = email;
        };

        model.save = function() {
            // to be implemented
        };

        return model;
    }
});