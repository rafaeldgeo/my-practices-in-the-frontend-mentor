// Store de dados do projeto.
// Responsável apenas por buscar o JSON bruto e expor recortes simples para o Controller.

const DATA_URL = '../data/sample-skills.json'; // CAMINHO DO ARQUIVO JSON

// Carrega o JSON completo da fonte de dados e retorna o conteúdo cru.
export async function fetchData() {
  try {
    const response = await fetch(DATA_URL); 

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json(); 
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
