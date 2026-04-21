// Model da entidade Session.
// Responsável por criar e validar sessões de estudo sem acessar DOM, storage ou outros módulos.

const SESSION_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;  

function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function isValidDateString(date) {
  if (typeof date !== 'string' || !SESSION_DATE_PATTERN.test(date)) {
    return false;
  }

  const [year, month, day] = date.split('-').map(Number);
  const parsedDate = new Date(Date.UTC(year, month - 1, day));

  return (
    parsedDate.getUTCFullYear() === year &&
    parsedDate.getUTCMonth() === month - 1 &&
    parsedDate.getUTCDate() === day
  );
}

// Cria uma nova session válida a partir dos dados de entrada, sem mutar o objeto recebido.
export function createSession({ skillId, date, duration, notes } = {}) {
  const session = {
    id: generateSessionId(),
    skillId,
    date,
    duration,
  };

  if (notes !== undefined) {
    session.notes = notes;
  }

  return session;
}

// Valida a estrutura de uma session e retorna o resultado com uma lista de erros.
export function validateSession(session) {
  const errors = [];

  if (!session || typeof session !== 'object' || Array.isArray(session)) {
    return {
      isValid: false,
      errors: ['Session must be an object'],
    };
  }

  if (typeof session.id !== 'string' || session.id.trim() === '') {
    errors.push('id is required and must be a string');
  }

  if (typeof session.skillId !== 'string' || session.skillId.trim() === '') {
    errors.push('skillId is required and must be a string');
  }

  if (typeof session.date !== 'string' || session.date.trim() === '') {
    errors.push('date is required and must be a string');
  } else if (!isValidDateString(session.date)) {
    errors.push('date must be a valid YYYY-MM-DD date');
  }

  if (typeof session.duration !== 'number' || Number.isNaN(session.duration)) {
    errors.push('duration is required and must be a number');
  } else if (session.duration <= 0) {
    errors.push('duration must be a positive number');
  }

  if (session.notes !== undefined && typeof session.notes !== 'string') {
    errors.push('notes must be a string when provided');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
