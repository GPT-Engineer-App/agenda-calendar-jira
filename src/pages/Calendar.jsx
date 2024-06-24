import { Box, Flex, Text, VStack, Heading, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMinutes, startOfDay, addDays } from "date-fns";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const startHour = 5; // 5 AM
  const endHour = 24; // Midnight
  const timeSlots = Array.from({ length: (endHour - startHour) * 2 }, (_, i) => addMinutes(startOfDay(new Date()), (startHour * 60) + (i * 30)));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <Box p={4}>
      <Heading mb={4}>Calendar</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Time</Th>
            {daysOfWeek.map((day) => (
              <Th key={day}>{day}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {timeSlots.map((timeSlot, index) => (
            <Tr key={index}>
              <Td>{format(timeSlot, "hh:mm a")}</Td>
              {daysInMonth.slice(0, 7).map((day, dayIndex) => (
                <Td key={dayIndex}>
                  {dayIndex === index % 7 && format(day, "d")}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Calendar;