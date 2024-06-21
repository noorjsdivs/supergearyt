import React from "react";
import Container from "./Container";

const FooterTop = () => {
  const incentives = [
    {
      name: "Free shipping",
      imageSrc:
        "https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg",
      description:
        "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
    },
    {
      name: "10-year warranty",
      imageSrc:
        "https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg",
      description:
        "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
    },
    {
      name: "Exchanges",
      imageSrc:
        "https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg",
      description:
        "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
    },
  ];
  return (
    <Container className="py-0">
      <div className=" rounded-2xl bg-[#f6f6f6] px-6 py-16 sm:p-16">
        <div className="mx-auto max-w-xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              We built our business on customer service
            </h2>
          </div>
        </div>
        <div className="mx-auto mt-12 grid max-w-sm grid-cols-1 gap-8 sm:max-w-none lg:grid-cols-3">
          {incentives.map((item) => (
            <div
              key={item?.name}
              className="text-center sm:flex sm:text-left lg:block lg:text-center"
            >
              <div className=" sm:flex-shrink-0">
                <div className="flex-root">
                  <img
                    src={item?.imageSrc}
                    alt="image"
                    className="mx-auto h-16 w-16"
                  />
                </div>
              </div>
              <div className="mt-3 sm:ml-6 lg:ml-0">
                <h3 className="text-base font-medium text-gray-900">
                  {item?.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {item?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FooterTop;
