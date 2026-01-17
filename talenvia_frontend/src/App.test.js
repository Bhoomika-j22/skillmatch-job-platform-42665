import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders dashboard content heading", () => {
  render(<App />);
  const heading = screen.getByRole("heading", { name: /recommended jobs/i });
  expect(heading).toBeInTheDocument();
});
