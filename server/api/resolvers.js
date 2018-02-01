module.exports = ({
  postgresResource: { getTags, getItem, getItems, getSharedItems },
  firebaseResource: { getUser, getUsers }
}) => ({
  Query: {
    items() {
      return getItems();
    },
    item(root, { id }) {
      return getItem(id);
    },
    users() {
      return getUsers();
    },
    user(root, { id }) {
      return getUser(id);
    }
  },
  Mutation: {
    addItem(root, payload) {
      return { title: payload.newItem.title };
    },
    updateItem(root, payload) {
      return { id: payload.updatedItem.id };
    }
  },
  Item: {
    itemowner(item) {
      return getUser(item.itemowner);
    },
    borrower(item) {
      return item.borrower ? getUser(item.borrower) : null;
    },
    tags(item) {
      return getTags(item.id);
    }
  },
  User: {
    shareditems(user) {
      return getSharedItems(user.id);
    }
  }
});
