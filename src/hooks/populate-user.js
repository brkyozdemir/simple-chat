// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { app, method, result, params } = context;

    const addUser = async message => {
      const user = await app.service('users').get(message.userId, params);
      return {
        ...message,
        user
      };
    };

    if (method === 'find') {
      context.result.data = await Promise.all(result.data.map(addUser));
    } else {
      context.result = await addUser(result);
    }

    return context;
  };
};
