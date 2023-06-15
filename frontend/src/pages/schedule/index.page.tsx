import { useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import z from 'zod';

import { Navbar } from "@/components/common/Navbar";
import { Calendar } from "@/components/Calendar";

import styles from './styles.module.css';
import { TextInput } from "@/components/common/TextInput";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/router";
import { Select } from "@/components/common/Select";
import nookies, { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/utils/withSSRAuth";

const hours = [
  "08:00h",
  "09:00h",
  "10:00h",
  "11:00h",
  "12:00h",
  "13:00h",
  "14:00h",
  "15:00h",
  "16:00h",
  "17:00h",
  "18:00h",
  "19:00h",
  "20:00h",
];

const scheduleFormSchema = z.object({
  group: z.string()
    .nonempty({ message: 'Grupo é obrigatório' }),
});

type ScheduleFormData = z.infer<typeof scheduleFormSchema>;

type SchedulePageProps = {};

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  const isDateSelected = !!selectedDate;
  const isHourSelected = !!selectedHour;

  const { back } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleFormSchema),
  });

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date);
  }

  const onSubmit: SubmitHandler<ScheduleFormData> = async (data) => {
    try {

      const data = {
        data: "09 de Junho, ás 09:00h",
        grupo: "Sistema de Gestão de Trabalho de Graduação",
      }

      const cookies = parseCookies();
      const scheduleData = cookies["schedule"];

      const scheduleList = scheduleData ? JSON.parse(scheduleData) : [];

      scheduleList.push(data);

      nookies.set(undefined, 'schedule', JSON.stringify(scheduleList));

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
      <Navbar />
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
                      Sexta-Feira, <span>9 de Junho</span>
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
                  Agendamento da bancada
                </h2>
              </div>
              <div className={styles.cardBody}>
                {/* <div className={styles.formControl}>
                  <label
                    htmlFor="fullName"
                    className={styles.label}
                  >
                    Grupo
                  </label>
                  <TextInput
                    id="group"
                    type='text'
                    {...register('group')}
                  />
                  {errors.group && (
                    <small className={styles.messageError}>
                      {errors.group?.message}
                    </small>
                  )}
                </div> */}

                <div className={styles.formControl}>
                  <label
                    htmlFor="group"
                    className={styles.label}
                  >
                    Disciplina
                  </label>
                  <Select
                    id="group"
                    {...register('group')}
                  >
                    <option>Selecione...</option>
                    <option value="Sistema de Gestão de Trabalho de Graduação">
                      Sistema de Gestão de Trabalho de Graduação
                    </option>
                  </Select>
                  {errors.group && (
                    <small className={styles.messageError}>
                      {errors.group?.message}
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
  return {
    props: {}
  }
});
