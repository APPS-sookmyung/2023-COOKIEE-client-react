import { createContext, useContext, useMemo, useRef, useState } from "react";

export const CalendarDataContext = createContext();
export const CalendarDataActionsContext = createContext();
export { useCalendarDataActions, useCalendarData };

export const CalendarDataProvider = ({ children }) => {
  const idRef = useRef(0);
  const eIdRef = useRef(0);
  const [calendarData, setCalendarData] = useState([]);

  const actions = useMemo(
    () => ({
      addEvent(newEvent) {
        const id = idRef.current;
        idRef.current += 1;
        const eId = eIdRef.current;
        eIdRef.current += 1;
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
};

export default CalendarDataProvider;

function useCalendarData() {
  const value = useContext(CalendarDataContext);
  if (value === undefined) {
    throw new Error(
      "useCalendarData should be used within CalendarDataProvider"
    );
  }
  return value;
}

function useCalendarDataActions() {
  const value = useContext(CalendarDataActionsContext);
  if (value === undefined) {
    throw new Error(
      "useCalendarDataActions should be used within CalendarDataProvider"
    );
  }
  return value;
}
