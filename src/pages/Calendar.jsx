import { Select, Grid, GridItem, Box, Flex, Text, VStack, Heading, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMinutes, startOfDay, addDays, startOfWeek, endOfWeek } from "date-fns";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentMonth.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentMonth.getFullYear());
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [uniqueEvents, setUniqueEvents] = useState([
    { id: 'event-1', content: 'Team Standup', day: 0, time: 10 }, // Monday at 10:00 AM
    { id: 'event-2', content: 'Client Call', day: 1, time: 14 }, // Tuesday at 2:00 PM
    { id: 'event-3', content: 'Project Meeting', day: 2, time: 16 }, // Wednesday at 4:00 PM
    { id: 'event-4', content: 'Code Review', day: 3, time: 11 }, // Thursday at 11:00 AM
    { id: 'event-5', content: 'Sprint Planning', day: 4, time: 9 }, // Friday at 9:00 AM
  ]);
  const [mockJiraTickets, setMockJiraTickets] = useState([
    { id: 'ticket-1', content: 'JIRA-123: Fix login bug' },
    { id: 'ticket-2', content: 'JIRA-456: Update user profile page' },
    { id: 'ticket-3', content: 'JIRA-789: Implement new feature' },
  ]);

  useEffect(() => {
    setCurrentMonth(new Date(selectedYear, selectedMonth));
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    setCurrentWeek(startOfWeek(new Date(selectedYear, selectedMonth), { weekStartsOn: 1 }));
  }, [selectedMonth, selectedYear]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same list
      if (source.droppableId === 'jira-tickets') {
        const items = Array.from(mockJiraTickets);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        setMockJiraTickets(items);
      } else {
        const items = Array.from(uniqueEvents);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        setUniqueEvents(items);
      }
    } else {
      // Moving between lists
      if (source.droppableId === 'jira-tickets' && destination.droppableId.startsWith('cell-')) {
        const items = Array.from(mockJiraTickets);
        const [movedItem] = items.splice(source.index, 1);
        const [_, dayIndex, timeIndex] = destination.droppableId.split('-').map(Number);
        setUniqueEvents([...uniqueEvents, { ...movedItem, day: dayIndex, time: timeIndex }]);
        setMockJiraTickets(items);
      } else if (source.droppableId.startsWith('cell-') && destination.droppableId === 'jira-tickets') {
        const items = Array.from(uniqueEvents);
        const [movedItem] = items.splice(source.index, 1);
        setMockJiraTickets([...mockJiraTickets, movedItem]);
        setUniqueEvents(items);
      }
    }
  };

  useEffect(() => {
    const handleScroll = (e) => {
      const { clientY } = e;
      const edgeThreshold = 50; // px from the edge to start scrolling
      const scrollSpeed = 10; // px per frame

      if (clientY < edgeThreshold) {
        window.scrollBy(0, -scrollSpeed);
      } else if (clientY > window.innerHeight - edgeThreshold) {
        window.scrollBy(0, scrollSpeed);
      }
    };

    window.addEventListener('dragover', handleScroll);

    return () => {
      window.removeEventListener('dragover', handleScroll);
    };
  }, []);

  const handlePreviousWeek = () => {
    setCurrentWeek((prevWeek) => addDays(prevWeek, -7));
  };

  const handleNextWeek = () => {
    setCurrentWeek((prevWeek) => addDays(prevWeek, 7));
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const startHour = 5; // 5 AM
  const endHour = 24; // Midnight
  const timeSlots = Array.from({ length: (endHour - startHour) * 2 }, (_, i) => addMinutes(startOfDay(new Date()), (startHour * 60) + (i * 30)));

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });
  const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

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
      <Flex mb={4} justifyContent="space-between">
        <Button onClick={handlePreviousWeek}>Previous Week</Button>
        <Button onClick={handleNextWeek}>Next Week</Button>
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
                                  {uniqueEvents
                                    .filter(event => event.day === dayIndex && event.time === index)
                                    .map((event, eventIndex) => (
                                      <Draggable key={event.id} draggableId={event.id} index={eventIndex}>
                                        {(provided) => (
                                          <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} p={2} m={1} bg="teal.100" borderRadius="md">
                                            {event.content}
                                          </Box>
                                        )}
                                      </Draggable>
                                    ))}
                                  {provided.placeholder}
                                </Box>
                              )}
                            </Droppable>
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