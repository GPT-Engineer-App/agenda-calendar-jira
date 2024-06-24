# agenda-calendar-jira

an app that on the left side displays a calendar with my agenda. All items must be drag and doppable. Calendar should look like a proper calendar with Days of the week on the top starting by Monday ending with Sunday, and the lines should represent 30 minutes slots, starting at 5 am in the morning. All items in the calendar such as meetings, appointments should be drag and droppable. 
On the right side, I want a list of JIRA tickets with Epic, Key, Summary, Status, Assignee, Reporter and Story Points. The tickets are drag and droppable to re-arrange their order, but also should be drag and droppable towards the calendar, and in that case it should generate an appointment in the calendar in the cell where we dropped the JIRA ticket.

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/agenda-calendar-jira.git
cd agenda-calendar-jira
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
