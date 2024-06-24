import { Select, Grid, GridItem, Box, Flex, Text, VStack, Heading, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";
import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMinutes, startOfDay, addDays } from "date-fns";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [selectedMonth, setSelectedMonth] = useState(currentMonth.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentMonth.getFullYear());

  useEffect(() => {
    setCurrentMonth(new Date(selectedYear, selectedMonth));
  }, [selectedMonth, selectedYear]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    // Logic to handle drag and drop
  };

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
      <Flex mb={4}>
        <Select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))} mr={2}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>{format(new Date(0, i), "MMMM")}</option>
          ))}
        </Select>
        <Select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={currentMonth.getFullYear() - 5 + i}>{currentMonth.getFullYear() - 5 + i}</option>
          ))}
        </Select>
      </Flex>
      <Grid templateColumns="3fr 1fr" gap={4}>
        <GridItem>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="calendar">
              {(provided) => (
                <Table variant="simple" {...provided.droppableProps} ref={provided.innerRef}>
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
                        <Td>{format(timeSlot, "HH:mm")}</Td>
                        {daysInMonth.slice(0, 7).map((day, dayIndex) => (
                          <Td key={dayIndex}>
                            <Draggable draggableId={`item-${index}-${dayIndex}`} index={index}>
                              {(provided) => (
                                <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                  {dayIndex === index % 7 && format(day, "d")}
                                </Box>
                              )}
                            </Draggable>
                          </Td>
                        ))}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
            </Droppable>
          </DragDropContext>
        </GridItem>
        <GridItem>
          <Box bg="gray.100" p={4}>
            <Heading size="md" mb={4}>JIRA Tickets</Heading>
            {/* Placeholder for JIRA tickets */}
            <Text>No tickets available</Text>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Calendar;