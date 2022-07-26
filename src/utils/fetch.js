export const setFilterParam = (filterColumns, searchValue) => {
  const filterParam = {}

  if (searchValue) {
    filterParam.$or = []

    filterColumns.forEach((column) => {
      filterParam.$or.push({
        [column]: { $regex: searchValue, $options: 'i' }
      })
    })
  }

  return JSON.stringify(filterParam)
}

export const setSortParam = (sortBy, sortOrder) => {
  let sortParam = ''

  if (sortBy) {
    sortParam = sortBy + ':' + (sortOrder ? 'desc' : 'asc')
  }

  return sortParam
}

export const setPageParam = (oldLimit, newLimit, currentPage) => {
  const rowPivot = ((currentPage - 1) * oldLimit) + 1
  const newPage = Math.trunc(((rowPivot - 1) / newLimit) + 1)
  return newPage > 0 ? newPage : 1
}
