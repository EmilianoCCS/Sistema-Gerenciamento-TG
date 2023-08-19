import { useState } from "react";

import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import nookies, { parseCookies } from "nookies";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import z from 'zod';

import { Group, Teacher } from "@/types";

import { withSSRAuth } from "@/utils/withSSRAuth";

import { api } from "@/services/apiClient";
import { setupAPIClient } from "@/services/api";

import { formatData } from "@/utils/format-data";
import { formatLongDate } from "@/utils/format-long-date";

import { Navbar } from "@/components/common/Navbar";
import { Calendar } from "@/components/Calendar";
import { TextInput } from "@/components/common/TextInput";
import { Select } from "@/components/common/Select";
import { Button } from "@/components/common/Button";

import styles from './styles.module.css';

const hours = [
  "08:00h",
  "08:30h",
  "09:00h",
  "09:30h",
  "10:00h",
  "10:30h",
  "11:00h",
  "11:30h",
  "12:00h",
  "12:30h",
  "13:00h",
  "13:30h",
  "14:00h",
  "14:30h",
  "15:00h",
  "15:30h",
  "16:00h",
  "16:30h",
  "17:00h",
  "17:30h",
  "18:00h",
  "18:30h",
  "19:00h",
  "19:30h",
  "20:00h",
  "20:30h",
];

const scheduleFormSchema = z.object({
  groupTheme: z.string().nullable(),
  teacher: z.string().nullable(),
  examiner1: z.string()
    .nonempty({ message: "Examinador obrigatório" }),
  examiner2: z.string()
    .nonempty({ message: "Examinador obrigatório" }),
});

type ScheduleFormData = z.infer<typeof scheduleFormSchema>;

type SchedulePageProps = {
  group: Group;
  teachers: Teacher[];
};

export default function SchedulePage({ group, teachers }: SchedulePageProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  const [teachersFilter, setTeachersFilter] = useState<Teacher[]>(teachers);

  const isDateSelected = !!selectedDate;
  const isHourSelected = !!selectedHour;

  const { back } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      groupTheme: group.theme,
      teacher: `${group.teachers[0].user.fullName} (${group.teachers[0].user.email})`,
    }
  });

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date);
  }

  const onSubmit: SubmitHandler<ScheduleFormData> = async ({
    examiner1,
    examiner2,
  }) => {
    try {
      if (!selectedDate || !selectedHour) {
        return;
      }

      const examinerIds: string[] = [];

      examinerIds.push(examiner1);
      examinerIds.push(examiner2);

      await api.post("/schedules", {
        date: formatData(selectedDate),
        hour: selectedHour,
        group_id: group.id,
        examinerIds: [],
      });

      back();
    } catch (error) {
      console.log(error);
    }
  }

  const handleToScheduleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    await handleSubmit(onSubmit)();
  }

  return (
    <>
      <Navbar pageTitle="/schedule" />
      <main className={styles.container}>
        <div className={styles.content}>
          {!isHourSelected && (
            <div className={`${styles.calendarStep} ${isDateSelected ? styles.open : styles.close}`}>
              <div className={styles.calendarContainer}>
                <Calendar
                  selectedDate={selectedDate}
                  onDateSelected={handleDateSelected}
                />
              </div>
              {isDateSelected && (
                <div className={styles.timePickerContainer}>
                  <div className={styles.timePicker}>
                    <div className={styles.timePickerHeader}>
                      {formatLongDate(selectedDate.toLocaleDateString())}
                    </div>
                    <div className={styles.timePickerList}>
                      {hours.map((hour) => (
                        <button
                          key={hour}
                          className={styles.timePickerItem}
                          onClick={() => setSelectedHour(hour)}
                        >
                          {hour}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {isHourSelected && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.title}>
                  Agendamento da bancada, {selectedDate ? formatLongDate(selectedDate.toLocaleDateString()) : ""}
                </h2>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.formControl}>
                  <label
                    htmlFor="groupTheme"
                    className={styles.label}
                  >
                    Tema do Grupo
                  </label>
                  <TextInput
                    id="groupTheme"
                    type='text'
                    {...register('groupTheme')}
                    disabled
                  />
                  {errors.groupTheme && (
                    <small className={styles.messageError}>
                      {errors.groupTheme?.message}
                    </small>
                  )}
                </div>

                <div className={styles.formControl}>
                  <label
                    htmlFor="teacher"
                    className={styles.label}
                  >
                    Professor Orientador
                  </label>
                  <TextInput
                    id="teacher"
                    type='text'
                    {...register('teacher')}
                    disabled
                  />
                  {errors.teacher && (
                    <small className={styles.messageError}>
                      {errors.teacher?.message}
                    </small>
                  )}
                </div>

                <div className={styles.formControl}>
                  <label
                    htmlFor="examiner1"
                    className={styles.subtitle}
                  >
                    Examinador 1
                  </label>
                  <Select
                    id="examiner1"
                    {...register('examiner1')}
                  >
                    <option value="">Selecione...</option>
                    {teachersFilter.filter(
                      teacher => teacher.id !== group.teachers[0].id
                    ).map(item => (
                      <option key={item.id} value={item.id}>
                        {item.user.email}
                      </option>
                    ))}
                  </Select>
                  {errors.examiner1 && (
                    <small className={styles.messageError}>
                      {errors.examiner1?.message}
                    </small>
                  )}
                </div>

                <div className={styles.formControl}>
                  <label
                    htmlFor="examiner2"
                    className={styles.subtitle}
                  >
                    Examinador 2
                  </label>
                  <Select
                    id="examiner2"
                    {...register('examiner2')}
                  >
                    <option value="">Selecione...</option>
                    {teachersFilter.filter(
                      teacher => teacher.id !== group.teachers[0].id
                    ).map(item => (
                      <option key={item.id} value={item.id}>
                        {item.user.email}
                      </option>
                    ))}
                  </Select>
                  {errors.examiner2 && (
                    <small className={styles.messageError}>
                      {errors.examiner2?.message}
                    </small>
                  )}
                </div>

                <hr className={styles.divider} />

                <Button
                  onClick={handleToScheduleSubmit}
                >
                  Agendar
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth<SchedulePageProps>(async (ctx) => {
  const { id } = ctx.params as {
    id: string;
  };

  const api = setupAPIClient(ctx);
  const [groupResponse, teachersResponse] = await Promise.all([
    api.get(`/groups/${id}`),
    api.get("/teachers")
  ])

  const { group } = groupResponse.data;
  const { teachers } = teachersResponse.data;

  return {
    props: {
      group,
      teachers,
    }
  }
});
