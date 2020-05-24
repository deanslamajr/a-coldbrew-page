import { DueDateInterface } from '../types';

interface OverdueInterface {
  years?: number;
  months?: number;
  days?: number;
}

export const transformDateToDueDate = (date: Date): DueDateInterface => {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
  };
};

export const isBefore = (
  dueDateA: DueDateInterface,
  dueDateB: DueDateInterface
): boolean => {
  if (dueDateA.year !== dueDateB.year) {
    return dueDateB.year - dueDateA.year > 0;
  } else if (dueDateA.month !== dueDateB.month) {
    return dueDateB.month - dueDateA.month > 0;
  } else {
    return dueDateB.day - dueDateA.day > 0;
  }
};

const getNow = (): DueDateInterface =>
  transformDateToDueDate(new Date(Date.now()));

export const isDue = (dueDate: DueDateInterface): boolean => {
  const now = getNow();

  if (dueDate.year > now.year) {
    return false;
  } else if (dueDate.year < now.year) {
    return true;
  }

  if (dueDate.month > now.month) {
    return false;
  } else if (dueDate.month < now.month) {
    return true;
  }

  if (dueDate.day > now.day) {
    return false;
  }

  return true;
};

export const getOverdue = (dueDate: DueDateInterface): OverdueInterface => {
  let yearsDiff;
  let monthsDiff;
  let daysDiff;

  const now = getNow();

  if (dueDate.year !== now.year) {
    yearsDiff = dueDate.year - now.year;
  }

  if (dueDate.month !== now.month) {
    monthsDiff = dueDate.month - now.month;
  }

  if (dueDate.day !== now.day) {
    daysDiff = dueDate.day - now.day;
  }

  return {
    years: yearsDiff,
    months: monthsDiff,
    days: daysDiff,
  };
};
