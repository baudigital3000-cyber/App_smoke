import type { Milestone, Achievement } from '@/types';

export const milestones: Milestone[] = [
  { time: '20 Min', benefit: 'Herzfrequenz & Blutdruck normalisieren sich', icon: '❤️', secs: 1200, detail: 'Dein Körper beginnt bereits mit der Heilung. Der Puls sinkt auf ein normales Niveau.' },
  { time: '8 Std', benefit: 'Kohlenmonoxid im Blut halbiert', icon: '🫁', secs: 28800, detail: 'Sauerstoffgehalt steigt auf normales Niveau. Du atmest schon besser.' },
  { time: '24 Std', benefit: 'CO komplett aus dem Körper', icon: '✨', secs: 86400, detail: 'Deine Lunge beginnt, Schleim und Ablagerungen abzubauen.' },
  { time: '48 Std', benefit: 'Geschmacks- & Geruchssinn verbessert', icon: '👅', secs: 172800, detail: 'Nervenenden beginnen nachzuwachsen. Essen schmeckt wieder intensiver!' },
  { time: '72 Std', benefit: 'Bronchien entspannen sich', icon: '💨', secs: 259200, detail: 'Atmung wird merklich leichter. Energielevel steigt.' },
  { time: '1 Woche', benefit: 'Schlafqualität verbessert sich', icon: '😴', secs: 604800, detail: 'Dein Körper reguliert den Schlaf-Wach-Rhythmus besser.' },
  { time: '2 Wochen', benefit: 'Kreislauf & Lungenfunktion verbessert', icon: '🏃', secs: 1209600, detail: 'Sport wird wieder deutlich einfacher. Treppensteigen ohne Keuchen.' },
  { time: '1 Monat', benefit: 'Husten und Kurzatmigkeit nehmen ab', icon: '😮‍💨', secs: 2592000, detail: 'Flimmerhärchen in der Lunge regenerieren sich und reinigen wieder.' },
  { time: '3 Monate', benefit: 'Lungenfunktion um 30% verbessert', icon: '🫀', secs: 7776000, detail: 'Herzinfarktrisiko beginnt deutlich zu sinken. Kreislauf stabilisiert sich.' },
  { time: '6 Monate', benefit: 'Husten verschwindet weitgehend', icon: '🗣️', secs: 15552000, detail: 'Stimme wird klarer. Weniger Infekte der oberen Atemwege.' },
  { time: '1 Jahr', benefit: 'Herzinfarktrisiko halbiert', icon: '💪', secs: 31536000, detail: 'Grosser Meilenstein! Das Risiko für koronare Herzkrankheiten sinkt um 50%.' },
  { time: '5 Jahre', benefit: 'Schlaganfallrisiko wie Nichtraucher', icon: '🧠', secs: 157680000, detail: 'Dein Gehirn dankt es dir. Auch das Risiko für Mund- und Rachenkrebs sinkt deutlich.' },
  { time: '10 Jahre', benefit: 'Lungenkrebsrisiko halbiert', icon: '🏆', secs: 315360000, detail: 'Du hast es geschafft! Das Risiko für viele Krebsarten sinkt signifikant.' },
  { time: '15 Jahre', benefit: 'Herzinfarktrisiko wie Nichtraucher', icon: '🎉', secs: 473040000, detail: 'Dein Herz-Kreislauf-System hat sich vollständig erholt. Respekt!' },
];

export const achievements: Achievement[] = [
  { id: 'first_hour', name: 'Erste Stunde', desc: '1 Stunde rauchfrei', icon: '⭐', requirement: 3600 },
  { id: 'first_day', name: 'Erster Tag', desc: '24 Stunden rauchfrei', icon: '🌟', requirement: 86400 },
  { id: 'three_days', name: 'Drei Tage', desc: '72 Stunden rauchfrei', icon: '✨', requirement: 259200 },
  { id: 'one_week', name: 'Eine Woche', desc: '7 Tage rauchfrei', icon: '🎯', requirement: 604800 },
  { id: 'two_weeks', name: 'Zwei Wochen', desc: '14 Tage rauchfrei', icon: '💪', requirement: 1209600 },
  { id: 'one_month', name: 'Ein Monat', desc: '30 Tage rauchfrei', icon: '🏆', requirement: 2592000 },
  { id: 'three_months', name: 'Drei Monate', desc: '90 Tage rauchfrei', icon: '👑', requirement: 7776000 },
  { id: 'six_months', name: 'Sechs Monate', desc: '180 Tage rauchfrei', icon: '💎', requirement: 15552000 },
  { id: 'one_year', name: 'Ein Jahr', desc: '365 Tage rauchfrei', icon: '🎉', requirement: 31536000 },
  { id: 'saved_100', name: 'CHF 100', desc: 'Erstes Sparziel erreicht', icon: '💰', requirement: 'saved_100' },
  { id: 'saved_500', name: 'CHF 500', desc: 'Halbes Tausend gespart!', icon: '💵', requirement: 'saved_500' },
  { id: 'saved_1000', name: 'CHF 1\'000', desc: 'Vierstellig gespart!', icon: '🤑', requirement: 'saved_1000' },
  { id: 'saved_5000', name: 'CHF 5\'000', desc: 'Fünftausend gespart!', icon: '🏦', requirement: 'saved_5000' },
  { id: 'craving_5', name: 'Craving-Fighter', desc: '5 Cravings überstanden', icon: '🥊', requirement: 'cravings_5' },
  { id: 'craving_20', name: 'Craving-Champion', desc: '20 Cravings überstanden', icon: '🏅', requirement: 'cravings_20' },
  { id: 'checkin_7', name: 'Routine', desc: '7 Tage Check-in Streak', icon: '📅', requirement: 'checkin_7' },
];
