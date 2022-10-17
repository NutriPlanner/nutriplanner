import axios from 'axios'
import escapeStringRegexp from 'escape-string-regexp'
import { ObjectId } from '@/utils'

const CancelToken = axios.CancelToken

export const setFilterParam = (filterColumns, searchValue) => {
    const filterParam = {}

    if (searchValue) {
        const escapedValue = escapeStringRegexp(searchValue.trim())

        filterColumns.forEach((column) => {
            let filter

            if (column !== 'id') {
                filter = {
                    [column]: { $regex: escapedValue, $options: 'i' },
                }
            }
            else if (ObjectId.isObjectId(searchValue.trim())) {
                filter = {
                    ['_id']: searchValue.trim(),
                }
            }

            if (filter && !filterParam.$or) filterParam.$or = []
            if (filter) filterParam.$or.push(filter)
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
