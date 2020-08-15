module.exports = (options = {}) => {
  return async context => {
    const { data } = context;

    if (!data.text) throw new Error('A message must have text!');

    const { user } = context.params;

    const text = context.data.text.substring(0, 400);

    context.data = {
      text,
      userId: user._id,
      createdAt: new Date().getTime()
    }

    return context;
  };
};
