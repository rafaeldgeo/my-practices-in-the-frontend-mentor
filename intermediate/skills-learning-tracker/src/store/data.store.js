const DATA_URL = '../data/sample-skills.json'; // CAMINHO DO ARQUIVO JSON
let cachedData = null

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

    cachedData = await response.json(); 
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

export async function saveSkill(skill) {
  const data = await fetchData()
  const currentSkills = Array.isArray(data.skills) ? data.skills : []

  cachedData = {
    ...data,
    skills: [...currentSkills, skill],
  }

  return skill
}
