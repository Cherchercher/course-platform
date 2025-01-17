/* This example requires Tailwind CSS v2.0+ */
import { CheckCircleIcon } from '@heroicons/react/outline';

const tier = {
  name: 'Standard',
  href: '#',
  price: 5,
  description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
  features: [
    'Private Discord Community',
    'Access to online ebook',
    'Access to resources list',
  ],
};

export const Pricing = () => {
  return (
    <section>
      <div className="pt-12 sm:pt-16 lg:pt-24">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-4 lg:max-w-none">
            <h2 className="text-3xl  font-extrabold sm:text-4xl lg:text-5xl">
              Pricing
            </h2>
            <p className="text-xl max-w-lg mx-auto">
              Learn the skills that will help you level up your career!
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 pb-12 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24">
        <div className="relative">
          <div className="absolute inset-0 h-3/4" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto space-y-4 lg:gap-5 lg:space-y-0">
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-8 sm:p-10 sm:pb-6">
                  <div>
                    <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-indigo-100 text-indigo-600">
                      {tier.name}
                    </h3>
                  </div>
                  <div className="mt-4 flex items-baseline text-6xl font-extrabold">
                    ${tier.price}
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6">
                  <ul role="list" className="space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <div className="flex-shrink-0">
                          <CheckCircleIcon
                            className="h-6 w-6 text-green-500"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="ml-3 text-base text-gray-700">
                          {feature}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <form action="/api/checkout?productId=prod_NNTSCDGlblRowA" method="POST">
                    <section>
                      <button
                        className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        type="submit"
                        role="link"
                      >
                        Buy now
                      </button>
                    </section>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
