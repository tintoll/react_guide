import { render, screen, fireEvent } from "@testing-library/react";

import Greeting from "./Greeting";

describe("Gretting Component", () => {
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

  test('render "good to see you" if click button not clicked', () => {
    render(<Greeting />);
    const outputElement = screen.getByText("good to see you", { exact: false });
    expect(outputElement).toBeInTheDocument();
  });

  test('render "Changed!" if click button clicked', () => {
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByText("Change Text!");
    fireEvent.click(buttonElement);

    const outputElement = screen.getByText("Changed!");
    expect(outputElement).toBeInTheDocument();
  });

  test('render is not text "good to see you" if click button clicked', () => {
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByText("Change Text!");
    fireEvent.click(buttonElement);

    // query는 결과값이 없으면 null을 리턴
    const outputElement = screen.queryByText("good to see you", {
      exact: false,
    });
    expect(outputElement).toBeNull();
  });
});
