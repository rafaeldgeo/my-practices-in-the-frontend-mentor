// Service de estatísticas 7agregadas para sessões.
// Mantém a lógica pura, sem acessar DOM, store ou outros módulos.

function getFilteredSessions(sessions, skillId) {
  // Quando skillId é informado, mantém apenas as sessões daquela skill; caso contrário, usa todas.
  if (typeof skillId === 'string' && skillId.trim() !== '') {
    return sessions.filter((session) => session && session.skillId === skillId);
  }
    
  return sessions.filter(Boolean); 
}

function getTotalTime(sessions) {
  // Soma a duração de todas as sessões consideradas.
  return sessions.reduce((total, session) => {
    const duration = typeof session.duration === 'number' ? session.duration : 0;
    return total + duration;
  }, 0);
  
}

export function calculateStats(sessions = [], skillId) {
  const consideredSessions = getFilteredSessions(sessions, skillId); 
  const totalSessions = consideredSessions.length; 
  const totalTime = getTotalTime(consideredSessions); 

  // A média é calculada somente quando há sessões; sem registros, retorna 0.
  const averageSessionTime = totalSessions === 0 ? 0 : totalTime / totalSessions;

  return {
    totalTime,
    totalSessions,
    averageSessionTime,
  };
}
