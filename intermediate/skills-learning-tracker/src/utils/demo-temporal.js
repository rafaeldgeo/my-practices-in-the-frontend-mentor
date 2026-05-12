const MS_PER_DAY = 24 * 60 * 60 * 1000

function isValidDateString(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function isValidTimestamp(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)
}

function parseDateString(dateString) {
  if (!isValidDateString(dateString)) {
    return null
  }

  const [year, month, day] = dateString.split('-').map((part) => Number(part))

  if (!year || !month || !day) {
    return null
  }

  return Date.UTC(year, month - 1, day)
}

function formatDateString(timestamp) {
  const date = new Date(timestamp)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function shiftDateString(dateString, dayOffset) {
  const timestamp = parseDateString(dateString)

  if (timestamp === null) {
    return dateString
  }

  return formatDateString(timestamp + dayOffset * MS_PER_DAY)
}

function shiftTimestamp(timestamp, dayOffset) {
  const parsedTimestamp = Date.parse(timestamp)

  if (Number.isNaN(parsedTimestamp)) {
    return timestamp
  }

  return new Date(parsedTimestamp + dayOffset * MS_PER_DAY).toISOString().replace('.000Z', 'Z')
}

function getLocalDateKey(referenceDate = new Date()) {
  const date = referenceDate instanceof Date ? referenceDate : new Date(referenceDate)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getDemoDayOffset(referenceDate, anchorDate) {
  const referenceTimestamp = parseDateString(getLocalDateKey(referenceDate))
  const anchorTimestamp = parseDateString(anchorDate)

  if (referenceTimestamp === null || anchorTimestamp === null) {
    return 0
  }

  return Math.round((referenceTimestamp - anchorTimestamp) / MS_PER_DAY)
}

function shiftTemporalValue(value, dayOffset) {
  if (isValidDateString(value)) {
    return shiftDateString(value, dayOffset)
  }

  if (isValidTimestamp(value)) {
    return shiftTimestamp(value, dayOffset)
  }

  return value
}

function shiftRecordDates(record, dayOffset) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) {
    return record
  }

  return Object.entries(record).reduce((accumulator, [key, value]) => {
    if (typeof value === 'string' && (key === 'date' || key === 'createdAt' || key === 'timestamp')) {
      accumulator[key] = shiftTemporalValue(value, dayOffset)
      return accumulator
    }

    accumulator[key] = value
    return accumulator
  }, {})
}

function shiftCollection(collection, dayOffset) {
  if (!Array.isArray(collection)) {
    return collection
  }

  return collection.map((item) => shiftRecordDates(item, dayOffset))
}

export function transformDemoDataset(data, referenceDate = new Date()) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return data
  }

  const anchorDate = data?.demoTimeline?.anchorDate

  if (!isValidDateString(anchorDate)) {
    return data
  }

  const dayOffset = getDemoDayOffset(referenceDate, anchorDate)
  const transformed = { ...data }

  if (Array.isArray(data.skills)) {
    transformed.skills = shiftCollection(data.skills, dayOffset)
  }

  if (Array.isArray(data.sessions)) {
    transformed.sessions = shiftCollection(data.sessions, dayOffset)
  }

  if (Array.isArray(data.activities)) {
    transformed.activities = shiftCollection(data.activities, dayOffset)
  }

  return transformed
}
