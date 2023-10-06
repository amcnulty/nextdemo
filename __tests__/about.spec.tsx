import { render, screen } from "@testing-library/react";
import About from '../src/pages/about/index';

describe("About page", () => {
  it("should render about page header", async () => {
    expect.hasAssertions();
    render(<About />);
    const element = await screen.findByText('About page header');
    expect(screen.getByText('About page header')).toBeInTheDocument();
    expect(element).toBeInTheDocument();
  });
});
