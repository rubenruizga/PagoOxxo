import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

var expect = require('expect');
var actions = require('actions');

var createMockStore = configureMockStore([thunk]);
describe('Actions', () => {

  it('should generate add new data action', () => {
    var action = {
      type: 'ADD_DATA',
      data: {
        text: "Text",
        completed: false,
        createdAt: "Moment",
        completedAt: "MomentsAfter"
      }
    };
    var res = actions.addData(action.data)

    expect(res).toEqual(action);
  });

  it('should create data and dispatch ADD_DATA', (done) => {
    const store = createMockStore({});
    const dataText = 'My text from test';

    store.dispatch(actions.startWriting(dataText)).then(() => {
      const actions = store.getActions();
      expect(actions[0].toInclude({
        type: 'ADD_DATA'
      }));
      expect(actions[0].data).toInclude({
        text: dataText
      })
      done();
    }).catch(done);
  });
});

describe('Tests with firebase todos', () => {
  var testDataRef;
  var uid;
  var dataRef;

  beforeEach((done) => {
    firebase.auth().signInAnonymously().then((user) => {
      uid = user.uid;
      dataRef = firebaseRef.child(`users/${uid}/data`);

      return dataRef.remove();
    }).then(() => {
      testDataRef = dataRef.push();

      return testDataRef.set({
        text: 'Something to do',
        completed: false,
        createdAt: 23453453
      });
    })
    .then(() => done())
    .catch(done);
  });

  afterEach((done) => {
    dataRef.remove().then(() => done());
  });

  it('should create data and dispatch ADD_TODO', (done) => {
    const store = createMockStore({auth: {uid}});
    const dataText = 'My data item';

    store.dispatch(actions.startAddData(todoText)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toInclude({
        type: 'ADD_DATA'
      });
      expect(actions[0].data).toInclude({
        text: dataText
      });
      done();
    }).catch(done);
  });
});
