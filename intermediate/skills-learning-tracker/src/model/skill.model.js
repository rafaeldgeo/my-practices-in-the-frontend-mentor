// Model da entidade Skill.
// Responsável por criar e validar skills sem acessar DOM, storage ou outros módulos.

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/; 

function generateSkillId() {
  return `skill_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`; 
}

function isValidDateString(date) {
  if (typeof date !== 'string' || !DATE_PATTERN.test(date)) {
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

// Cria uma nova skill a partir dos dados de entrada, sem mutar o objeto recebido.
export function createSkill({ name, startDate, targetHours, color } = {}) {
  const skill = {
    id: generateSkillId(),
    name,
    startDate,
    targetHours,
  };
  

  if (color !== undefined) {
    skill.color = color;
  }
  

  return skill;
  
}

// Valida a estrutura de uma skill e retorna o resultado com uma lista de erros.
export function validateSkill(skill) {
  const errors = [];

  if (!skill || typeof skill !== 'object' || Array.isArray(skill)) {
    return {
      isValid: false,
      errors: ['Skill must be an object'],
    };
  }

  if (typeof skill.id !== 'string' || skill.id.trim() === '') {
    errors.push('id is required and must be a string');
  }

  if (typeof skill.name !== 'string' || skill.name.trim() === '') {
    errors.push('name is required and must be a non-empty string');
  }

  if (typeof skill.startDate !== 'string' || skill.startDate.trim() === '') {
    errors.push('startDate is required and must be a string');
  } else if (!isValidDateString(skill.startDate)) {
    errors.push('startDate must be a valid YYYY-MM-DD date');
  }

  if (
    typeof skill.targetHours !== 'number' ||
    Number.isNaN(skill.targetHours)
  ) {
    errors.push('targetHours is required and must be a number');
  } else if (skill.targetHours <= 0) {
    errors.push('targetHours must be a positive number');
  }

  if (skill.color !== undefined && typeof skill.color !== 'string') {
    errors.push('color must be a string when provided');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };

}

