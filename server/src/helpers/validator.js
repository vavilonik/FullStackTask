
const ValidationSource = {
  BODY: 'body',
  HEADER: 'headers',
  QUERY: 'query',
  PARAM: 'params',
}

module.exports = (schema, source = ValidationSource.BODY) => (
  req,
  res,
  next
) => {
  try {
    const { error } = schema.validate(req[source]);

    if (!error) return next();

    const { details } = error;
    const message = details.map((i) => i.message.replace(/['"]+/g, '')).join(',');
    return res.status(400).send(message);
  } catch (error) {
    next(error);
  }
};