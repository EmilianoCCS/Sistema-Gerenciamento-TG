import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

import { getWeekDays } from "@/utils/get-week-days";

import styles from './styles.module.css';

interface CalendarWeek {
  week: number;
  days: Array<{
    date: dayjs.Dayjs;
    disabled: boolean;
  }>;
}

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelected: (date: Date) => void;
}

type CalendarWeeks = Array<CalendarWeek>;

export function Calendar({ selectedDate, onDateSelected }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1);
  });

  const handlePreviusMonth = () => {
    const previousMonthDate = currentDate.subtract(1, 'month');

    setCurrentDate(previousMonthDate);
  }

  const handleNextMonth = () => {
    const nextMonthDate = currentDate.add(1, 'month');

    setCurrentDate(nextMonthDate);
  }

  const sliptDaysInWeeks = (weeks: number, _: any, i: number, original: any) => {

  }

  const shortWeekDays = getWeekDays({ short: true });

  const currentMonth = currentDate.format('MMMM');
  const currentYear = currentDate.format('YYYY');

  const calendarWeekDays = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, index) => {
      return currentDate.set('date', index + 1);
    });

    const firstWeekDay = currentDate.get('day');

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    }).map((_, index) => {
      return currentDate.subtract(index + 1, 'day');
    }).reverse();

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth()
    );
    const lastWeekDay = lastDayInCurrentMonth.get('day');

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, index) => {
      return lastDayInCurrentMonth.add(index + 1, 'day');
    });

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return {
          date,
          disabled: true,
        }
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled: date.endOf('day').isBefore(new Date()),
        }
      }),
      ...nextMonthFillArray.map((date) => {
        return {
          date,
          disabled: true,
        }
      }),
    ];

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, index, original) => {
        const isNewWeek = index % 7 === 0;

        if (isNewWeek) {
          weeks.push({
            week: index / 7 + 1,
            days: original.slice(index, index + 7),
          });
        }

        return weeks;
      },
      []
    );

    return calendarWeeks;
  }, [currentDate]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {currentMonth} <span>{currentYear}</span>
        </h2>
        <div className={styles.actions}>
          <button
            type="button"
            onClick={handlePreviusMonth}
          >
            <GoChevronLeft />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
          >
            <GoChevronRight />
          </button>
        </div>
      </div>
      <table className={styles.body}>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeekDays.map((week) => {
            return (
              <tr key={week.week}>
                {week.days.map(({ date, disabled }) => {
                  return (
                    <td key={date.toString()}>
                      <button
                        className={styles.day}
                        disabled={disabled}
                        onClick={() => onDateSelected(date.toDate())}
                      >
                        {date.get('date')}
                      </button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}