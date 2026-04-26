import { calculateStats } from './stats.service.js';
import { calculateStreak } from './streak.service.js';
// IMPORTOU AS FUNÇÕES DO SERVICES

const GLOBAL_SKILL_ID = '__global__'; //??? PRECISO DE AJUDA, NÃO ENTENDI. PRECISARIA DE ALGO TÃO AVANÇADO AQUI? 
const FEATURED_MINUTES_THRESHOLD = 60; // CRIOU UMA CONSTANTE PARA RETORNAR A CLASSIFICAÇÃO DO STATUS

// FPR FUNÇÃO VALIDA SE É UM ARRAY E SE EXISTE CONTEUDO E RETORNA O PRIMEIRO VALOR DO ARRAY SENDO UM SKILL 
function getFirstSkill(skills) {
  if (!Array.isArray(skills) || skills.length === 0) {
    return null;
  }

  return skills[0];
}

// FPR FUNÇÃO VALIDA SE FOI DEFINIDA UMA SESSÃO E SE ELA UM OBJETO
function getSessionDuration(session) {
  if (!session || typeof session !== 'object') {
    return 0;
  }

  // VALIDA SE É NUMERO E SE NÃO É NULO
  if (typeof session.duration === 'number' && !Number.isNaN(session.duration)) {
    return session.duration;
  }

  if (
    typeof session.durationMinutes === 'number' &&
    !Number.isNaN(session.durationMinutes)
  ) {
    return session.durationMinutes;
  }

  return 0;
}

// FPR VALIDA A ENTRADA DA DATA
function isValidDateString(date) {
  return typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date);
}

// RETORNA VALIDA E RETORNA A DATA
function getSessionDate(session) {
  if (!session || typeof session !== 'object' || !isValidDateString(session.date)) {
    return null;
  }

  return session.date;
}

// FPR RETORNA OS STATS NORMALIZADOS PARA CALCULAR O STERAK 
function normalizeSessionsForStats(sessions) {
  if (!Array.isArray(sessions)) {
    return [];
  }

  return sessions
    .filter(Boolean)
    .map((session) => ({
      skillId: GLOBAL_SKILL_ID,
      duration: getSessionDuration(session),
    }));
}

// FPR RETORNA OS STREAK NORMALIZADOS PARA CALCULAR O STERAK
function normalizeSessionsForStreak(sessions) {
  if (!Array.isArray(sessions)) {
    return [];
  }

  return sessions
    .filter(Boolean)
    .map((session) => ({
      skillId: GLOBAL_SKILL_ID,
      date: getSessionDate(session),
    }));
}

// RETORNA A SKILL
function getSkillSessions(sessions, skillId) {
  if (!Array.isArray(sessions)) {
    return [];
  }

  return sessions.filter((session) => session && session.skillId === skillId);
}

// RETORNA O TOTALTIME PARA CALCULO DO STATUS
function getSkillStatus(totalTime) {
  return totalTime < FEATURED_MINUTES_THRESHOLD ? 'behind' : 'onTrack';
}

// RETORNA O LABEL DO STATUS
function getStatusLabel(type) {
  return type === 'behind' ? 'Behind' : 'On track';
}

// FPR RETORNA A FUNÇÃO DE CALCULO DOS STATS APOS NORMALIZAÇÃO
function getSkillStats(sessions, skillId) {
  const normalizedSessions = getSkillSessions(sessions, skillId).map((session) => ({
    skillId,
    duration: getSessionDuration(session),
  }));

  return calculateStats(normalizedSessions, skillId);
}

// FPR RETORNA OS DADOS PARA O HEADMAP
function getConsistencyByDate(sessions) {
  const totalsByDate = new Map();
  // CRIA OBJETO MAP

  if (!Array.isArray(sessions)) {
    return [];
  }

  // INTERA PELO ARRAY VALIDADO E REALIZANDO CALCULO
  sessions.forEach((session) => {
    const date = getSessionDate(session);

    if (!date) {
      return;
    }

    const currentTotal = totalsByDate.get(date) || 0;
    totalsByDate.set(date, currentTotal + getSessionDuration(session));
  });

  // RETORNA UM ARRAY AGREGANDO OS DADOS E INSERIDO DATA E TEMPOS EM MINUTOS
  return [...totalsByDate.entries()]
    .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
    .map(([date, totalMinutes]) => ({
      date,
      totalMinutes,
    }));
}

// FPR RETORNA O NOME DA SKILL A PARTIR BUSCA DO ID NA LISTA SKILLS
function getSkillNameById(skills, skillId) {
  if (!Array.isArray(skills)) {
    return undefined;
  }

  const skill = skills.find((item) => item && item.id === skillId);
  return skill ? skill.name : undefined;
}

// FPR RETORNA UM ARRAY FILTRADO COM AS ULTIMAS 5 SKILLS ESTUDADAS
function getRecentActivity(sessions, skills) {
  if (!Array.isArray(sessions)) {
    return [];
  }

  return sessions
    .filter((session) => session && typeof session.skillId === 'string' && getSessionDate(session))
    .map((session) => ({
      skillId: session.skillId,
      skillName: getSkillNameById(skills, session.skillId),
      duration: getSessionDuration(session),
      date: session.date,
    }))
    .sort((activityA, activityB) => activityB.date.localeCompare(activityA.date))
    .slice(0, 5);
    // NO BLOCO É USADO FILTER NA SESSION PARA VALIDAR E EXTRAIR AS SKILLS QUE SEREM DE BASE PARA CONSTRUIR A ESTRUTURA USANDO MAP, DEPOIS O ARRAY É ORDENADO, PELA DATA E LIMITADO A 5 SKILLS
}

// FPR RETORNA UM ARRAY CONTENDO UM OBJETO ESTRUTURADO A PARTIR DAS FUNÇÕES
function mapSkills(skills, sessions) {
  if (!Array.isArray(skills)) {
    return [];
  }

  return skills.map((skill) => {
    const skillStats = getSkillStats(sessions, skill.id);
    const statusType = getSkillStatus(skillStats.totalTime);

    return {
      skillId: skill.id,
      skillName: skill.name,
      totalTime: skillStats.totalTime,
      status: { type: statusType },
    };
  });
}

// FPU CRIA UM SNAPSHOT CONTENDO OS DADOS A SEREM UTILIZADOS NA VIEW
export function createDashboardData({ skills = [], sessions = [] } = {}) {
  // RECEBE OBEJTO QUE DEVE CONTER A PROPRIEDADE SKILL COM UM ARRAY E SESSOES COM CONTEUDO, SENÃO RECEBE ARRAYS VAZIOS
  const firstSkill = getFirstSkill(skills); // CHAMA A FUNÇÃO PARA OBTER PRIMEIRA SKILL
  const skillStats = calculateStats(normalizeSessionsForStats(sessions), GLOBAL_SKILL_ID); // CHAMA FUNÇÃO PARA OBTER OS STATS
  const skillStreak = calculateStreak(normalizeSessionsForStreak(sessions), GLOBAL_SKILL_ID); // CHAMA FUNÇÃO PARA OBTER OS STREAK
  const featuredSkillStats = firstSkill ? getSkillStats(sessions, firstSkill.id) : null; // RECEBE O RESULTADO DA FUNÇÃO CASO EXISTA O PRIMEIRO SKILL
  const featuredStatusType = featuredSkillStats 
    ? getSkillStatus(featuredSkillStats.totalTime)
    : 'behind'; // // DEFINE O VALOR DO STATUS A PARTIR DO FUNÇÃO QUE VERIFICA O TOTAL DE HORAS

  return {
    featured: firstSkill
      ? {
          skillId: firstSkill.id,
          skillName: firstSkill.name,
          totalTime: featuredSkillStats.totalTime,
          status: {
            type: featuredStatusType,
            label: getStatusLabel(featuredStatusType),
          },
          minutesToday: 30,
        }
      : null,
    globalStats: {
      totalTime: skillStats.totalTime,
      totalSessions: skillStats.totalSessions,
      currentStreak: skillStreak.currentStreak,
    },
    consistency: getConsistencyByDate(sessions),
    recentActivity: getRecentActivity(sessions, skills),
    skills: mapSkills(skills, sessions),
  };

  // RETORNA O OBJETO ESTRUTURADO PARA SER UTILIZADO NA VIEW
}
