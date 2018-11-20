describe('ContactEditorPresenter', function() {
    var contactEditorView, contactEditorModel;

    beforeEach(function() {
        contactEditorView = canEmitEvents(jasmine.createSpyObj(
            'contactEditorViewSpy',
            {
                setName: undefined,
                setEmail: undefined,
                getName: '::VIEW NAME::',
                getEmail: '::VIEW EMAIL::'
            }
        ), ['userSaved']);

        contactEditorModel = canEmitEvents(jasmine.createSpyObj(
        'contactEditorModelSpy',
        {
            getContactName: '::MODEL NAME::',
            getContactEmail: '::MODEL EMAIL::',
            setName: undefined,
            setEmail: undefined,
            save: undefined
        }), ['contactInfoChanged']);

        ContactEditorPresenter(contactEditorModel, contactEditorView);
    });

    describe('when contact info changed', function() {
        it('prepopulates view with new contact info', function() {
            contactEditorModel.emit('contactInfoChanged');

            expect(contactEditorView.setName).toHaveBeenCalledWith('::MODEL NAME::');
            expect(contactEditorView.setEmail).toHaveBeenCalledWith('::MODEL EMAIL::');
        });
    });

    describe('when user saved', function() {
        it('updates contact info attributes', function() {
            contactEditorView.emit('userSaved');

            expect(contactEditorModel.setName).toHaveBeenCalledWith('::VIEW NAME::');
            expect(contactEditorModel.setEmail).toHaveBeenCalledWith('::VIEW EMAIL::');
        });

        it('requests saving contact info', function() {
            contactEditorView.emit('userSaved');

            // TODO: it is important to request saving after attributes
            // has been updated

            expect(contactEditorModel.save).toHaveBeenCalled();
        });
    });

    function ContactEditorPresenter(model, view) {
        model.when('contactInfoChanged', function() {
            view.setName(model.getContactName());
            view.setEmail(model.getContactEmail());
        });

        view.when('userSaved', function() {
            model.setName(view.getName());
            model.setEmail(view.getEmail());
            model.save()
        });
    }
});