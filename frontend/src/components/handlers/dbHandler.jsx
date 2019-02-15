import { ADDRESS } from "./ServerAddress";
const serverAdder = ADDRESS; //Change to the address of the server e.g. "http://localserver:8080/graphql" (http://address:port/graphql)
const requestItemsBody = {
  query: `query{
    items{
      _id
      value
      done
    }
  }`
};

const requestClearItems = {
  query: `
    mutation{
      clearItems(delete:true)
    }
  `
};

export const getItems = async () => {
  const data = await sendCommand(requestItemsBody);
  return data.items.map(item => {
    return {
      _id: item._id,
      value: item.value,
      done: item.done
    };
  });
};

export const createNewItem = async text => {
  let mutation = {
    query: `mutation{
                      createItem(itemInput:{
                        value:"${text}"
                        done:false
                      })
                      {
                        _id
                        value
                        done
                      }
                    }
                  `
  };
  return sendCommand(mutation).then(data => {
    if (data === null) return null;
    return { ...data.createItem };
  });
};
export const sendCommand = async command => {
  const jsonCommand = JSON.stringify(command);
  const res = await fetch(serverAdder, {
    method: "POST",
    body: jsonCommand,
    headers: {
      "Content-Type": "application/json"
    }
  });
  const resData = await res.json();
  if (resData.data === undefined) return null;
  return resData.data;
};
export const clearItems = async () => {
  return sendCommand(requestClearItems).then(data => {
    if (data === null || data === undefined) return false;
    return data.clearItems;
  });
};
export const deleteItem = async id => {
  const mutation = {
    query: `
      mutation{
        deleteItem(_id:"${id}")
      }
    `
  };
  return sendCommand(mutation).then(data => {
    if (data === null || data === undefined) return false;
    return data.deleteItem;
  });
};
export const updateItem = async item => {
  const mutation = {
    query: `
      mutation{
        updateItem(itemInput:{
          _id:"${item._id}"
          value:"${item.value}"
          done:${item.done}
        })
      }
    `
  };
  return sendCommand(mutation).then(data => {
    if (data === null || data === undefined) return false;
    return data.updateItem;
  });
};
