import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";
test("render Hello World as a text", () => {
  // Arrage
  render(<Greeting />);

  // Act

  // Assert
  // get은 찾지 못하면 에러가 발생
  // 옵션으로 exact를 줄수도 있음.
  const helloWorldElement = screen.getByText("Hello World", { exact: false });
  expect(helloWorldElement).toBeInTheDocument();
});
