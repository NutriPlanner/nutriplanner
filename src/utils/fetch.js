import axios from 'axios'
import escapeStringRegexp from 'escape-string-regexp'

const CancelToken = axios.CancelToken

export const setFilterParam = (filterColumns, searchValue) => {
    const filterParam = {}

    if (searchValue) {
        filterParam.$or = []
        const escapedValue = escapeStringRegexp(searchValue.trim())

        filterColumns.forEach((column) => {
            if (column !== 'id') {
                filterParam.$or.push( {
                    [column]: { $regex: escapedValue, $options: 'i' },
                } )
            }
            else {
                filterParam.$or.push( {
                    ['_id']: searchValue.trim(),
                } )
            }
        } )
    }

    return JSON.stringify(filterParam)
}

export const setSortParam = (sortBy, sortOrder) => {
    let sortParam = ''

    if (sortBy)
        sortParam = sortBy + ':' + (sortOrder ? 'desc' : 'asc')

    return sortParam
}

export const setPageParam = (oldLimit, newLimit, currentPage) => {
    const rowPivot = (currentPage - 1) * oldLimit + 1
    const newPage = Math.trunc((rowPivot - 1) / newLimit + 1)

    return newPage > 0 ? newPage : 1
}

export const abortPreviousRequest = (source) => {
    const cancelMemory = { oldSource: source, newSource: CancelToken.source() }

    // this timeout is important to await the source is injected in the axios instance
    setTimeout(() => {
        cancelMemory.oldSource.cancel('Operation cancelled.')
    }, 100)

    return cancelMemory.newSource
}

export default {
    setFilterParam,
    setSortParam,
    setPageParam,
    abortPreviousRequest,
}
