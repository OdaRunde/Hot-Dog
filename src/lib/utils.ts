// src/lib/utils.ts

export const isSameDay = (d1: Date, d2: Date): boolean => {
	// [2026-01-25T]09:00:00 === [2026-01-25T]12:00:00
	return d1.toISOString().slice(0, 10) === d2.toISOString().slice(0, 10);
};

const dateFormating = {
	day: 'numeric',
	month: 'short',
	year: 'numeric'
} as const;

const timeFormating = {
	hour: 'numeric',
	minute: 'numeric',
	hour12: false
} as const;

export const formatDate = (d: Date) => d.toLocaleDateString('en-US', dateFormating);
export const formatTime = (d: Date) => d.toLocaleTimeString('en-US', timeFormating);

export default {
	isSameDay,
	formatDate,
	formatTime
};
