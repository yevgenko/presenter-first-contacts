describe('CurrentContactCoordinator', function() {
    var editorModel, listModel;

    beforeEach(function() {
        // TODO: implement new contract on the models
        editorModel = canEmitEvents(
            jasmine.createSpyObj('contactEditorModelSpy', {
                changeContact: undefined,
                getContactInfo: '::CONTACT_INFO::'
            }),
            ['saveRequested']
        );

        listModel = canEmitEvents(
            jasmine.createSpyObj('contactListModelSpy', {
                getCurrentContact: '::CURRENT_CONTACT::',
                save: undefined
            }),
            ['contactSelected']
        );

        CurrentContactCoordinator(listModel, editorModel);
    })

    describe('when contact selected', function() {
        it('changes contact info', function() {
            listModel.emit('contactSelected');

            expect(editorModel.changeContact).toHaveBeenCalledWith('::CURRENT_CONTACT::');
        });
    });

    describe('when save requested', function() {
        it('saves contact info', function() {
            editorModel.emit('saveRequested');

            expect(listModel.save).toHaveBeenCalledWith('::CONTACT_INFO::');
        });
    });

    var CurrentContactCoordinator = function(listModel, editorModel) {
        listModel.when('contactSelected', function() {
            editorModel.changeContact(listModel.getCurrentContact())
        });

        editorModel.when('saveRequested', function() {
            listModel.save(editorModel.getContactInfo())
        })
    };
});