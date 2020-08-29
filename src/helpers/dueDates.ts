import monthDays from 'month-days';
import { DefaultTheme } from 'styled-components';

import { DueDateInterface } from '../types';

export enum DurationTypes {
  Year = 'YEAR',
  Month = 'MONTH',
  Day = 'DAY',
}

export enum DueStatusEnum {
  OverDue = 'OVER_DUE',
  DueToday = 'DUE_TODAY',
  NotYetDue = 'NOT_YET_DUE',
}

interface StatusInterface {
  dueDifferenceCopy: string;
  status: DueStatusEnum;
}

interface DateDiffInterface {
  amount: number;
  type: DurationTypes;
}

interface GetChoreButtonBackgroundColorInterface {
  dueDateStatus: DueStatusEnum | null;
  colors: DefaultTheme['colors'];
}

export const isDueDateFormat = (date: any): boolean => {
  return (
    date &&
    typeof date.year === 'number' &&
    typeof date.month === 'number' &&
    typeof date.day === 'number'
  );
};

export const transformDateToDueDate = (date: Date): DueDateInterface => {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
  };
};

export const transformDueDateToDate = (dueDate: DueDateInterface): Date => {
  return new Date(dueDate.year, dueDate.month, dueDate.day);
};

export const sortDueDatesFn = (
  dueDateA: DueDateInterface,
  dueDateB: DueDateInterface
): number => {
  if (dueDateA.year > dueDateB.year) {
    return 1;
  } else if (dueDateA.year < dueDateB.year) {
    return -1;
  }

  if (dueDateA.month > dueDateB.month) {
    return 1;
  } else if (dueDateA.month < dueDateB.month) {
    return -1;
  }

  if (dueDateA.day > dueDateB.day) {
    return 1;
  } else if (dueDateA.day < dueDateB.day) {
    return -1;
  }

  return 0;
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

export const getDiffFromNow = (
  dueDate: DueDateInterface
): DateDiffInterface => {
  let yearsDiff = 0;
  let monthsDiff = 0;
  let daysDiff = 0;

  const now = getNow();

  yearsDiff = dueDate.year - now.year;
  monthsDiff = dueDate.month - now.month;

  if (yearsDiff !== 0 && dueDate.month === now.month) {
    return {
      amount: yearsDiff,
      type: DurationTypes.Year,
    };
  }

  if (
    (now.year > dueDate.year && now.month > dueDate.month) ||
    (dueDate.year > now.year && dueDate.month > now.month)
  ) {
    if (Math.abs(yearsDiff) >= 1) {
      return {
        amount: yearsDiff,
        type: DurationTypes.Year,
      };
    } else if (Math.abs(monthsDiff) >= 1) {
      return {
        amount: monthsDiff,
        type: DurationTypes.Month,
      };
    }
  }

  if (
    (now.year > dueDate.year && now.month < dueDate.month) ||
    (dueDate.year > now.year && dueDate.month < now.month)
  ) {
    if (Math.abs(yearsDiff) > 1) {
      return {
        amount: yearsDiff - 1,
        type: DurationTypes.Year,
      };
    }

    monthsDiff =
      dueDate.month > now.month
        ? dueDate.month - 11 - now.month - 1 // month is 0 indexed
        : now.month - 11 + dueDate.month + 1; // month is 0 indexed
  }

  const daysInNowsMonth = monthDays({ month: now.month, year: now.year });
  const daysInDueDatesMonth = monthDays({
    month: dueDate.month,
    year: dueDate.year,
  });

  if (monthsDiff === 0) {
    daysDiff = dueDate.day - now.day;
  } else if (
    (now.month < dueDate.month && now.year <= dueDate.year) ||
    now.year < dueDate.year
  ) {
    // not yet due
    daysDiff = daysInNowsMonth - now.day;
    daysDiff += dueDate.day;
  } else {
    // due
    // not yet due
    const daysOverdueInDueDatesMonth = daysInDueDatesMonth - dueDate.day;
    daysDiff = now.day * -1 - daysOverdueInDueDatesMonth;
  }

  if (Math.abs(daysDiff) >= daysInDueDatesMonth) {
    return {
      amount: monthsDiff,
      type: DurationTypes.Month,
    };
  } else if (Math.abs(monthsDiff) > 1) {
    return {
      amount: monthsDiff - 1,
      type: DurationTypes.Month,
    };
  }

  return {
    amount: daysDiff,
    type: DurationTypes.Day,
  };
};

export const computeStatus = (dueDate: DueDateInterface): StatusInterface => {
  const overdueData = getDiffFromNow(dueDate);

  let typeCopy: string;

  switch (overdueData.type) {
    case DurationTypes.Year:
      typeCopy = Math.abs(overdueData.amount) > 1 ? 'years' : 'year';
      break;
    case DurationTypes.Month:
      typeCopy = Math.abs(overdueData.amount) > 1 ? 'months' : 'month';
      break;
    case DurationTypes.Day:
      typeCopy = 'days';
      break;
  }

  if (isDue(dueDate)) {
    if (overdueData.amount) {
      if (overdueData.amount === -1 && overdueData.type === DurationTypes.Day) {
        return {
          status: DueStatusEnum.OverDue,
          dueDifferenceCopy: '(due yesterday)',
        };
      }

      return {
        status: DueStatusEnum.OverDue,
        dueDifferenceCopy: `(due ${Math.abs(
          overdueData.amount
        )} ${typeCopy} ago)`,
      };
    } else {
      return {
        status: DueStatusEnum.DueToday,
        dueDifferenceCopy: '(due today)',
      };
    }
  } else {
    if (overdueData.amount === 1 && overdueData.type === DurationTypes.Day) {
      return {
        status: DueStatusEnum.NotYetDue,
        dueDifferenceCopy: '(due tomorrow)',
      };
    }

    return {
      status: DueStatusEnum.NotYetDue,
      dueDifferenceCopy: `(due in ${Math.abs(overdueData.amount)} ${typeCopy})`,
    };
  }
};

export const getChoreButtonBackgroundColor = ({
  dueDateStatus,
  colors,
}: GetChoreButtonBackgroundColorInterface): string => {
  switch (dueDateStatus) {
    case DueStatusEnum.NotYetDue:
      return colors.green;
    case DueStatusEnum.DueToday:
      return colors.yellow;
    case DueStatusEnum.OverDue:
      return colors.red;
    default:
      return colors.white;
  }
};
