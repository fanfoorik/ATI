import events from 'utils/events';

const createStore = function () {
  let store = [];

  const addItem = (data) => {
    if (!store.some(item => item.id === data.id)) {
      store = [...store, data];
      events.trigger('addItem', data);
    }
  };

  const getItemById = id => store.filter(item => item.id === id);

  const getAllItems = () => store;

  const removeItem = (itemToRemove) => {
    store = store.filter(item => item.id !== itemToRemove.id );
    events.trigger('removeItem', itemToRemove);
  };

  return { getAllItems, getItemById, addItem, removeItem };
};

export default createStore();
