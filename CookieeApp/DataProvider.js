import { createContext, useContext, useMemo, useRef, useState } from "react";

export const CalendarDataContext = createContext();
export const CalendarDataActionsContext = createContext();
export { useCalendarDataActions, useCalendarData };

export function CalendarDataProvider({ children }) {
  const idRef = useRef(3);
  const [calendarData, setCalendarData] = useState([
    {
      id: 3,
      year: 2023,
      month: 10,
      date: 12,
      thumbnail: "",
      events: [
        {
          eId: 1,
          imgUrl: [],
          cate: [],
          time: "",
          place: "",
          detail: "",
          people: "",
        },
        {
          eId: 2,
          imgUrl: [],
          cate: [],
          time: "",
          place: "",
          detail: "",
          people: "",
        },
      ],
    },
  ]);

  const actions = useMemo(
    () => ({
      addEvent(newEvent) {
        const id = idRef.current;
        idRef.current += 1;
        setCalendarData((prevData) => [
          ...prevData,
          {
            id,
            ...newEvent,
          },
        ]);
      },

      updateEvent(updatedEvent) {
        setCalendarData((prevData) =>
          prevData.map((data) =>
            data.id === updatedEvent.id ? { ...data, ...updatedEvent } : data
          )
        );
      },

      removeEvent(eventId) {
        setCalendarData((prevData) =>
          prevData.filter((data) => data.id !== eventId)
        );
      },
    }),
    []
  );

  return (
    <CalendarDataActionsContext.Provider value={actions}>
      <CalendarDataContext.Provider value={calendarData}>
        {children}
      </CalendarDataContext.Provider>
    </CalendarDataActionsContext.Provider>
  );
}

function useCalendarData() {
  const value = useContext(CalendarDataContext);
  if (value === undefined) {
    // throw new Error(
    //   "useCalendarData should be used within CalendarDataProvider"
    // );
    console.log("[DataProvider.js] useCalendarData: value === undefined");
  }
  return value;
}

function useCalendarDataActions() {
  const value = useContext(CalendarDataActionsContext);
  if (value === undefined) {
    // throw new Error(
    //   "useCalendarDataActions should be used within CalendarDataProvider"
    // );
    console.log(
      "[DataProvider.js] useCalendarDataActions: value === undefined"
    );
  }
  return value;
}
