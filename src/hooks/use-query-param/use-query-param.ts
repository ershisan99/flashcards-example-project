import { useCallback } from 'react'

import { isNil } from 'remeda'

export function useQueryParam<T extends boolean | number | string>(
  searchParams: URLSearchParams,
  setSearchParams: (searchParams: URLSearchParams) => void,
  param: string,
  defaultValue?: T
): [T | null, (value: T | null) => void] {
  const paramValue = searchParams.get(param)
  const convertedValue = getConvertedValue<T>(paramValue, defaultValue)

  const setParamValue = useCallback(
    (value: T | null): void => {
      if (isNil(value) || value === '') {
        searchParams.delete(param)
      } else {
        searchParams.set(param, String(value))
      }
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  return [convertedValue, setParamValue]
}

function getConvertedValue<T>(value: null | string, defaultValue: T | undefined): T | null {
  if (value === null) {
    return defaultValue ?? null
  }
  if (value === 'true' || value === 'false') {
    return (value === 'true') as unknown as T
  }
  if (!isNaN(Number(value))) {
    return Number(value) as unknown as T
  }

  return value as unknown as T
}
