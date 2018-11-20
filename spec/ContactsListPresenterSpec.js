describe("ContactListPresenter", function() {
    var contactListView, contactListModel;

    beforeEach(function() {
        contactListModel = canEmitEvents(
            jasmine.createSpyObj('contactListModelSpy', {
                selectByIndex: undefined,
                getNames: '::names::'
            }),
            ['contactsChanged']
        );
        contactListView = canEmitEvents(
            jasmine.createSpyObj('contactListViewSpy', {
                setNames: undefined,
                getSelectedIndex: '::selectedIndex::'
            }),
            ['selectionChanged']
        );
    });

    describe("when selection changed", function() {
        it('makes contact current', function() {
            ContactListPresenter(contactListModel, contactListView);

            contactListView.emit('selectionChanged');

            expect(contactListModel.selectByIndex).toHaveBeenCalledWith('::selectedIndex::')
        });
    });

    describe("when contacts changed", function() {
        it('refreshes the names', function() {
            ContactListPresenter(contactListModel, contactListView);

            contactListModel.emit('contactsChanged');

            expect(contactListView.setNames).toHaveBeenCalledWith('::names::')
        });
    });

    var ContactListPresenter = function(model, view) {
        view.when('selectionChanged', function() {
            model.selectByIndex(view.getSelectedIndex()); 
        });
        model.when('contactsChanged', function() {
            view.setNames(model.getNames());
        })
    };
});