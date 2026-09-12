export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export const formatResponse = (res, statusCode, data, message = null) => {
  const response = { success: true };
  if (message) response.message = message;
  if (data !== undefined && data !== null) {
    if (data.pagination) {
      response.data = data.data;
      response.pagination = data.pagination;
    } else {
      response.data = data;
    }
  }
  return res.status(statusCode).json(response);
};

export const formatError = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message
  });
};

export const getPagination = (page = 1, limit = 10, total) => {
  const currentPage = Math.max(1, parseInt(page, 10));
  const perPage = Math.min(100, Math.max(1, parseInt(limit, 10)));
  const skip = (currentPage - 1) * perPage;
  const totalPages = Math.ceil(total / perPage);

  return {
    currentPage,
    perPage,
    skip,
    totalPages,
    total
  };
};
