const User = require("../models/users"); //Not in used
const Item = require("../models/items");

module.exports = {
  //----------a function for retrieving data from the server------------///
  /**
   * This function retrieves all the list items from the server
   */
  items: async () => {
    return Item.find()
      .then(items => {
        return items.map(item => {
          return { ...item._doc };
        });
      })
      .catch(err => {
        console.log("error! - " + err);
        throw err;
      });
  },
  /////////////////////////////////////////////////////////////////////////////
  //-------------the res is for manipulating data on the server ------------///
  /**
   * this function creates a new item
   */
  createItem: async args => {
    const item = new Item({
      value: args.itemInput.value,
      done: false
    });
    return item
      .save()
      .then(res => {
        return { ...res._doc, _id: res.id };
      })
      .catch(err => {
        console.log("error! - " + err);
        throw err;
      });
  },
  /**
   * this function updates a given item in the server
   */
  updateItem: async args => {
    return Item.findById(args.itemInput._id)
      .then(item => {
        item.value = args.itemInput.value;
        item.done = args.itemInput.done;
        return item.save().then(res => {
          console.log(res._id);
          console.log(args.itemInput._id);
          if (res._id == args.itemInput._id) return true;
          return false;
        });
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
  /**
   * this function clears all the data on the server
   */
  clearItems: async args => {
    if (!args.delete) return false;
    return Item.deleteMany({})
      .then(res => {
        return res.ok;
      })
      .catch(err => {
        console.log("There was a problem deleting the collection: " + err);
        return false;
      });
  },
  /**
   * this function delete a given item from the server
   */
  deleteItem: async args => {
    return Item.deleteOne({ _id: args._id })
      .then(res => {
        return res.ok;
      })
      .catch(err => {
        console.log("There was a problem deleting an item: " + err);
        return false;
      });
  }
  /////////////////////////////////////////////////////////////////////////////
};
