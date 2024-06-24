import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";

const initialTickets = [
  { id: "1", epic: "Epic 1", key: "KEY-1", summary: "Summary 1", status: "To Do", assignee: "User 1", reporter: "Reporter 1", storyPoints: 3 },
  { id: "2", epic: "Epic 2", key: "KEY-2", summary: "Summary 2", status: "In Progress", assignee: "User 2", reporter: "Reporter 2", storyPoints: 5 },
];

const Calendar = () => {
  const [tickets, setTickets] = useState(initialTickets);

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
        {/* Calendar implementation here */}
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