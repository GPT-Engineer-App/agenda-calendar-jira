import { Select, Grid, GridItem, Box, Flex, Text, VStack, Heading, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMinutes, startOfDay, addDays, startOfWeek, endOfWeek } from "date-fns";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentMonth.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentMonth.getFullYear());
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  useEffect(() => {
    setCurrentMonth(new Date(selectedYear, selectedMonth));
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    setCurrentWeek(startOfWeek(new Date(selectedYear, selectedMonth), { weekStartsOn: 1 }));
  }, [selectedMonth, selectedYear]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    // Logic to handle drag and drop
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const startHour = 5; // 5 AM
  const endHour = 24; // Midnight
  const timeSlots = Array.from({ length: (endHour - startHour) * 2 }, (_, i) => addMinutes(startOfDay(new Date()), (startHour * 60) + (i * 30)));

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });
  const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const mockMeetings = [
    { id: 'meeting-1', content: 'Team Meeting' },
    { id: 'meeting-2', content: 'Client Call' },
    { id: 'meeting-3', content: 'Project Discussion' },
  ];

  const mockJiraTickets = [
    { id: 'ticket-1', content: 'JIRA-123: Fix login bug' },
    { id: 'ticket-2', content: 'JIRA-456: Update user profile page' },
    { id: 'ticket-3', content: 'JIRA-789: Implement new feature' },
  ];

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
                        {daysInWeek.map((day, dayIndex) => (
                          <Td key={dayIndex}>
                            <Droppable droppableId={`cell-${index}-${dayIndex}`}>
                              {(provided) => (
                                <Box ref={provided.innerRef} {...provided.droppableProps} minHeight="50px" border="1px solid lightgray">
                                  {mockMeetings.map((meeting, meetingIndex) => (
                                    <Draggable key={meeting.id} draggableId={meeting.id} index={meetingIndex}>
                                      {(provided) => (
                                        <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} p={2} m={1} bg="teal.100" borderRadius="md">
                                          {meeting.content}
                                        </Box>
                                      )}
                                    </Draggable>
                                  ))}
                                  {provided.placeholder}
                                </Box>
                              )}
                            </Droppable>
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
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="jira-tickets">
                {(provided) => (
                  <VStack {...provided.droppableProps} ref={provided.innerRef} spacing={4}>
                    {mockJiraTickets.map((ticket, index) => (
                      <Draggable key={ticket.id} draggableId={ticket.id} index={index}>
                        {(provided) => (
                          <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} p={2} bg="teal.100" borderRadius="md" width="100%">
                            {ticket.content}
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </VStack>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Calendar;