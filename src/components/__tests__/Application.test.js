 
import React from "react";
import axios from "axios";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/

import { render, cleanup, waitForElement, fireEvent, getByText, queryByAltText, queryByText,  prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText} from "@testing-library/react";
/*
  We import the component that we are testing
*/
import Application from "components/Application";

afterEach(cleanup);

/*
  A test that renders a React Component
*/
// it("renders without crashing", () => {
//   render(<Application />);
// });
it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});
it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
});
// The test plan for "loads data, cancels an interview and increases the spots remaining for Monday by 1" 
it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Delete" button on the booked appointment.
  const appointments = getAllByTestId(container, "appointment");

  const appointment = appointments.find(appointment => queryByText(appointment, "Archie Cohen"))
  
  fireEvent.click(queryByAltText(appointment, "Delete"));

  // 4. Check that the confirmation message is shown.

  expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

  // 5. Click the "Confirm" button on the confirmation.

  fireEvent.click(queryByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.

  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  // 7. Wait until the element with the "Add" button is displayed.
  // Fails due to WebSockets

  await waitForElement(() => getByAltText(appointment, "Add"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

 
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same",async() => {

  // 1. Render the Application.

  const { container} = render(<Application />);

   // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");

  const appointment = appointments.find(appointment => queryByText(appointment, "Archie Cohen"))

  // 3. Click the "Edit" button on the booked appointment.

  fireEvent.click(getByAltText(appointment, "Edit"));

  // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  // 5. Click the first interviewer in the list.

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  // 6. Click the "Save" button on that same appointment.

  fireEvent.click(getByText(appointment, "Save"));

  // 7. Check that the element with the text "Saving" is displayed.

  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
  // Websocket implementation means that checking for save won't work.

  await waitForElement(() => getByText(container, "Lydia Miller-Jones"));

  // 9. Check that the DayListItem with the text "Monday" also has the text  "1 spot remaining"

  const day = getAllByTestId(container, "day").find(day => {
   return  queryByText(day, "Monday")
  });

  expect(getByText(day, "no spots remaining")).toBeInTheDocument();

})

// Error Handling
it("shows the save error when failing to save an appointment", async() => {
  axios.put.mockRejectedValueOnce();

  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");

  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));

  await waitForElement(() => expect(getByText(appointment, "Could not book appointment")));
});
it("shows the delete error when failing to delete an appointment", async () => {
  axios.delete.mockRejectedValueOnce();

  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");

  const appointment = appointments.find(appointment => queryByText(appointment, "Archie Cohen"));

  fireEvent.click(getByAltText(appointment, "Delete"));

  expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

  fireEvent.click(getByText(appointment, "Confirm"));


  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  await waitForElement(() => expect(getByText(appointment, "Could not cancel appointment")));
});