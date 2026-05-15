import { normalizeSkill } from '../services/skill.service.js'
import { transformDemoDataset } from '../utils/demo-temporal.js'

const DATA_URL = '../data/sample-skills.json'; // CAMINHO DO ARQUIVO JSON
let cachedData = null

function getCollection(data, key) {
  return Array.isArray(data?.[key]) ? data[key] : []
}

// Carrega o JSON completo da fonte de dados e retorna o conteúdo cru.
export async function fetchData() {
  if (cachedData) {
    return cachedData
  }

  try {
    const response = await fetch(DATA_URL); 

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const rawData = await response.json(); 
    const transformedData = transformDemoDataset(rawData)
    cachedData = {
      ...transformedData,
      skills: Array.isArray(transformedData?.skills)
        ? transformedData.skills.map((skill) => normalizeSkill(skill)).filter(Boolean)
        : [],
    }
    return cachedData
  } catch (error) {
    throw new Error(`Failed to fetch skills data: ${error.message}`);
  }
}

// Retorna apenas a lista de skills presente no JSON bruto.
export async function getSkills() {
  const data = await fetchData(); // CHAMA A FUNÇÃO QUE RETORNA O JSON

  return data.skills; 
}


// Retorna apenas a lista de sessions presente no JSON bruto.
export async function getSessions() {
  const data = await fetchData(); 

  return data.sessions; 
}

export async function getActivities() {
  const data = await fetchData()

  return getCollection(data, 'activities')
}

export async function saveSkill(skill) {
  const data = await fetchData()
  const currentSkills = getCollection(data, 'skills')
  const normalizedSkill = normalizeSkill(skill)

  cachedData = {
    ...data,
    skills: normalizedSkill ? [...currentSkills, normalizedSkill] : currentSkills,
  }

  return normalizedSkill
}

export async function updateSkill(skill) {
  const data = await fetchData()
  const currentSkills = getCollection(data, 'skills')
  const normalizedSkill = normalizeSkill(skill)

  if (!normalizedSkill) {
    return null
  }

  const hasExistingSkill = currentSkills.some((currentSkill) => currentSkill?.id === normalizedSkill.id)

  cachedData = {
    ...data,
    skills: hasExistingSkill
      ? currentSkills.map((currentSkill) =>
          currentSkill?.id === normalizedSkill.id ? normalizedSkill : currentSkill
        )
      : [...currentSkills, normalizedSkill],
  }

  return normalizedSkill
}

export async function saveSession(session) {
  const data = await fetchData()
  const currentSessions = getCollection(data, 'sessions')

  cachedData = {
    ...data,
    sessions: [...currentSessions, session],
  }

  return session
}

export async function saveActivity(activity) {
  const data = await fetchData()
  const currentActivities = getCollection(data, 'activities')

  cachedData = {
    ...data,
    activities: [...currentActivities, activity],
  }

  return activity
}
