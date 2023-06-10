import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("Async Component", () => {
  test("render posts if request succeeds", async () => {
    render(<Async />);

    // get으로 하면 최조 형태만 가져오기 때문에 비동기 작업을 했을때의 결과가 나오지 않는다.
    // const listItemElements = screen.getAllByRole("listitem");

    // find는 Promise를 반환하고 2번째는 정확성, 3번째 인자에 몇번 재시도할것인지, timeout 등을 설정할 수 있다.
    const listItemElements = await screen.findAllByRole("listitem");
    expect(listItemElements).not.toHaveLength(0);
  });

  test("render posts if request succeeds with Mock data ", async () => {
    // 위방법으로 하면 실제 fetch가 호출되는 부분을 실제 테스트하면 네트워크밑 속도도 느리고 실제 API 호출되어 문제가 될 수 있다.
    // 그래서 mock을 이용한 방식을 사용하는것을 권한다.
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: "p1", title: "first post" }],
    });

    render(<Async />);

    const listItemElements = await screen.findAllByRole("listitem");
    expect(listItemElements).not.toHaveLength(0);
  });
});
