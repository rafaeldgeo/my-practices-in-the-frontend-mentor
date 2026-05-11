function generateActivityId() {
  return `activity_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== ''
}

function normalizeId(value) {
  if (typeof value === 'string') {
    return value
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value)
  }

  return ''
}

function getTimestamp(session) {
  if (isNonEmptyString(session?.createdAt)) {
    return session.createdAt
  }

  if (isNonEmptyString(session?.date)) {
    return `${session.date}T00:00:00Z`
  }

  return new Date().toISOString()
}

export function createActivityFromSession({ session, skillName } = {}) {
  if (!session || typeof session !== 'object' || Array.isArray(session)) {
    throw new Error('session is required')
  }

  if (!isNonEmptyString(skillName)) {
    throw new Error('skillName is required')
  }

  const timestamp = getTimestamp(session)
  const date = isNonEmptyString(session.date) ? session.date : timestamp.slice(0, 10)

  return {
    id: isNonEmptyString(session.id) ? session.id : generateActivityId(),
    type: 'session',
    message: `Practiced ${skillName}`,
    timestamp,
    skillId: normalizeId(session.skillId),
    skillName,
    date,
    duration:
      typeof session.durationMinutes === 'number' && !Number.isNaN(session.durationMinutes)
        ? session.durationMinutes
        : typeof session.duration === 'number' && !Number.isNaN(session.duration)
          ? session.duration
          : 0,
  }
}
