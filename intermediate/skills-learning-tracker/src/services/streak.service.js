const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/; 

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

function normalizeDate(date) {
  // Normaliza a data para um valor de calendário estável em UTC, evitando drift de fuso.
  const [year, month, day] = date.split('-').map(Number);
  return Date.UTC(year, month - 1, day);
}

function getTodayDateString(referenceDate = new Date()) {
  const year = referenceDate.getFullYear();
  const month = String(referenceDate.getMonth() + 1).padStart(2, '0');
  const day = String(referenceDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function uniqueSortedDates(dates) {
  return [...new Set(dates)].sort();
}

function getLongestConsecutiveStreak(dates) {
  if (dates.length === 0) {
    return 0;
  }

  let longestStreak = 1;
  let currentStreak = 1;

  // Calcula a sequência comparando cada data com a anterior; diferença de 1 dia mantém a sequência.
  for (let index = 1; index < dates.length; index += 1) {
    const previousDate = normalizeDate(dates[index - 1]);
    const currentDate = normalizeDate(dates[index]);
    const dayDifference = (currentDate - previousDate) / 86400000;

    if (dayDifference === 1) {
      currentStreak += 1;
    } else {
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 1;
    }
  }

  return Math.max(longestStreak, currentStreak);
}

function getCurrentStreak(dates, referenceDate = new Date()) {
  if (dates.length === 0) {
    return 0;
  }

  const today = getTodayDateString(referenceDate);
  const yesterday = new Date(referenceDate);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = getTodayDateString(yesterday);
  const lastDate = dates[dates.length - 1];

  // A regra de "hoje ou ontem" limita o streak atual a uma sequência ainda ativa no calendário.
  if (lastDate !== today && lastDate !== yesterdayString) {
    return 0;
  }

  let streak = 1;

  for (let index = dates.length - 1; index > 0; index -= 1) {
    const currentDate = normalizeDate(dates[index]);
    const previousDate = normalizeDate(dates[index - 1]);
    const dayDifference = (currentDate - previousDate) / 86400000;

    if (dayDifference === 1) {
      streak += 1;
      continue;
    }

    break;
  }

  return streak;
}

export function calculateStreak(sessions = [], skillId, referenceDate = new Date()) {
  const filteredDates = sessions
    .filter((session) => session && session.skillId === skillId)
    .map((session) => session.date)
    .filter((date) => typeof date === 'string' && isValidDateString(date));

  const dates = uniqueSortedDates(filteredDates);

  return {
    currentStreak: getCurrentStreak(dates, referenceDate),
    longestStreak: getLongestConsecutiveStreak(dates),
  };
}

