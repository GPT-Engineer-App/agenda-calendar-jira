import { Box, Flex, Text, VStack, Heading } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";

const initialTickets = [
  { id: "1", epic: "Epic 1", key: "KEY-1", summary: "Summary 1", status: "To Do", assignee: "User 1", reporter: "Reporter 1", storyPoints: 3 },
  { id: "2", epic: "Epic 2", key: "KEY-2", summary: "Summary 2", status: "In Progress", assignee: "User 2", reporter: "Reporter 2", storyPoints: 5 },
  { id: "3", epic: "Epic 3", key: "KEY-3", summary: "Summary 3", status: "Done", assignee: "User 3", reporter: "Reporter 3", storyPoints: 8 },
  { id: "4", epic: "Epic 4", key: "KEY-4", summary: "Summary 4", status: "To Do", assignee: "User 4", reporter: "Reporter 4", storyPoints: 2 },
  { id: "5", epic: "Epic 5", key: "KEY-5", summary: "Summary 5", status: "In Progress", assignee: "User 5", reporter: "Reporter 5", storyPoints: 13 },
];

const initialMeetings = [
  { id: "1", title: "Meeting 1", date: "2023-10-01", time: "10:00 AM", description: "Description for Meeting 1" },
  { id: "2", title: "Meeting 2", date: "2023-10-02", time: "11:00 AM", description: "Description for Meeting 2" },
  { id: "3", title: "Meeting 3", date: "2023-10-03", time: "02:00 PM", description: "Description for Meeting 3" },
  { id: "4", title: "Meeting 4", date: "2023-10-04", time: "03:00 PM", description: "Description for Meeting 4" },
  { id: "5", title: "Meeting 5", date: "2023-10-05", time: "04:00 PM", description: "Description for Meeting 5" },
];

const Calendar = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [meetings, setMeetings] = useState(initialMeetings);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tickets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTickets(items);
  };

  return (
    <Flex>
      <Box flex="1" p={4} borderRight="1px solid #ccc">
        <Text fontSize="2xl" mb={4}>Calendar</Text>
        <VStack spacing={4}>
          {meetings.map((meeting) => (
            <Box key={meeting.id} p={4} bg="gray.100" borderRadius="md" boxShadow="md" width="100%">
              <Heading size="md">{meeting.title}</Heading>
              <Text><strong>Date:</strong> {meeting.date}</Text>
              <Text><strong>Time:</strong> {meeting.time}</Text>
              <Text><strong>Description:</strong> {meeting.description}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
      <Box flex="1" p={4}>
        <Text fontSize="2xl" mb={4}>JIRA Tickets</Text>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tickets">
            {(provided) => (
              <VStack {...provided.droppableProps} ref={provided.innerRef} spacing={4}>
                {tickets.map((ticket, index) => (
                  <Draggable key={ticket.id} draggableId={ticket.id} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        p={4}
                        bg="gray.100"
                        borderRadius="md"
                        boxShadow="md"
                        width="100%"
                      >
                        <Text><strong>Epic:</strong> {ticket.epic}</Text>
                        <Text><strong>Key:</strong> {ticket.key}</Text>
                        <Text><strong>Summary:</strong> {ticket.summary}</Text>
                        <Text><strong>Status:</strong> {ticket.status}</Text>
                        <Text><strong>Assignee:</strong> {ticket.assignee}</Text>
                        <Text><strong>Reporter:</strong> {ticket.reporter}</Text>
                        <Text><strong>Story Points:</strong> {ticket.storyPoints}</Text>
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
    </Flex>
  );
};

export default Calendar;