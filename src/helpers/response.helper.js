const statusCodes = {
  OK: 200,
  CREATED: 201,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
};

// Arrow function to send a 200 OK response
const sendOK = (res, message = 'OK', description = 'Request was successful', body = null) => {
  message = message || 'OK';
  return res.status(statusCodes.OK).json({ message, description, body });
};

// Arrow function to send a 201 Created response
const sendCreated = (res, message = 'Created', description = 'Resource successfully created', body = null) => {
  return res.status(statusCodes.CREATED).json({ message, description, body });
};

// Arrow function to send a 401 Unauthorized response
const sendUnauthorized = (res, message = 'Unauthorized', description = 'Authentication required', body = null) => {
  return res.status(statusCodes.UNAUTHORIZED).json({ message, description, body });
};

// Arrow function to send a 403 Forbidden response
const sendForbidden = (res, message = 'Forbidden', description = 'Access to the resource is denied', body = null) => {
  return res.status(statusCodes.FORBIDDEN).json({ message, description, body });
};

// Arrow function to send a 404 Not Found response
const sendNotFound = (res, message = 'Not Found', description = 'Resource not found', body = null) => {
  return res.status(statusCodes.NOT_FOUND).json({ message, description, body });
};

module.exports = {sendCreated, sendForbidden, sendNotFound, sendOK, sendUnauthorized};
