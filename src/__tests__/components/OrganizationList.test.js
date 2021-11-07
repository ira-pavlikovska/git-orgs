import React from "react";
import {render, screen} from "@testing-library/react";
import OrganizationList from "../../components/OrganizationList";
import apiMock from "./api-resp-mock.json";
import {MemoryRouter} from "react-router-dom";

describe("OrganizationList", () => {
  test("renders without crash", () => {
    render(<OrganizationList orgs={[]}/>);
    expect(screen.queryAllByTestId("tweet").length).toBe(0);
  });

  test("renders 3 organization from api", () => {
    render(
      <MemoryRouter>
        <OrganizationList orgs={apiMock}/>
      </MemoryRouter>
    );
    expect(screen.queryAllByTestId("organization").length).toBe(3);
    expect(screen.queryAllByTestId("avatar").length).toBe(3);
    expect(screen.queryAllByTestId("organization-text").length).toBe(3);

    // the first org from api mock
    expect(screen.getByText("errfree")).toBeDefined();
  });
});
