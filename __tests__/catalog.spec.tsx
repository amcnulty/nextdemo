/* eslint-disable @typescript-eslint/no-unsafe-return */
import { render, screen } from "@testing-library/react";
import Catalog from "../src/pages/catalog";
import useSWR from "swr";
import { AppProvider } from "~/context/AppContext";

const mockProducts = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: {
      rate: 4.1,
      count: 259,
    },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: {
      rate: 4.7,
      count: 500,
    },
  },
];

jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

describe("catalog page", () => {
  it("should render catalog header", async () => {
    expect.hasAssertions();
    (useSWR as jest.Mock).mockReturnValue({ data: [], isLoading: true });
    render(
      <AppProvider>
        <Catalog />
      </AppProvider>,
    );
    const element = await screen.findByText("Catalog");
    expect(element).toBeInTheDocument();
  });

  it("should show loading indicator when request is loading", async () => {
    expect.hasAssertions();
    (useSWR as jest.Mock).mockReturnValue({ data: [], isLoading: true });
    render(
      <AppProvider>
        <Catalog />
      </AppProvider>,
    );
    const element = await screen.findByTestId("loadingIndicator");
    expect(element).toBeInTheDocument();
  });

  it("should show product names when data is returned", async () => {
    expect.hasAssertions();
    (useSWR as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockProducts,
    });
    render(
      <AppProvider>
        <Catalog />
      </AppProvider>,
    );
    const product1 = await screen.findByText(
      "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    );
    const product2 = await screen.findByText(
      "Mens Casual Premium Slim Fit T-Shirts",
    );
    const product3 = await screen.findByText("Mens Cotton Jacket");
    expect(product1).toBeInTheDocument();
    expect(product2).toBeInTheDocument();
    expect(product3).toBeInTheDocument();
  });
});
