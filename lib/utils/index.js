function formatParams(params) {
  console.log(params.limit)
  const limit = params.limit ? params.limit : 1000;
  let offset = params.offset ? params.offset : 0;
  const page = params.page ? params.page : 1;
  if (page > 1) {
    offset = (page - 1) * limit + offset;
  }
  return {
    limit,
    offset,
    page,
  }
}
module.exports = formatParams;
