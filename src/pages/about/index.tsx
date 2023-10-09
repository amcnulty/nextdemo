/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Layout from "~/components/layout";
import useSWR from "swr";
import { fetcher } from "~/util/fetcher";

export default function About() {
  const { data } = useSWR("/api/hello", fetcher);
  console.log("data :>> ", data);

  const { data: examples } = useSWR("/api/example", fetcher);

  console.log("examples :>> ", examples);

  return (
    <Layout>
      <h1 className="text-center text-3xl">About Fake Store</h1>
      <p className="p-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
        voluptatibus <b>porro suscipit</b> nisi repellendus repellat sit
        similique. Blanditiis expedita aperiam dolor, fugit dicta qui et
        similique eius quae! Mollitia, eum.
      </p>
      <p className="p-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
        placeat deserunt exercitationem enim et expedita voluptatibus vitae.
        Dicta accusamus ipsam aperiam <b>numquam quis</b> quas ullam delectus
        optio corrupti, quod aliquid amet dignissimos sapiente laborum officiis
        vero magni voluptate rerum unde. Quam quia tempore molestias beatae
        dolor voluptatibus ex. <i>Molestias corporis quia</i> dolores
        accusantium reprehenderit perferendis recusandae laudantium mollitia
        placeat esse amet incidunt et odio rem possimus eius sint est odit
        voluptas aperiam, fuga cupiditate corrupti sit vitae. Sit, reiciendis
        ad?
      </p>
      <p className="p-4">
        <b>Lorem ipsum dolor</b> sit amet consectetur adipisicing elit. Sint
        deleniti voluptate itaque, repellendus distinctio quis vitae sapiente
        ad. Cum perspiciatis mollitia aliquid et unde consequatur id dignissimos
        voluptas maxime odit minus, reiciendis culpa dolorum temporibus eos
        quibusdam doloremque laboriosam nam labore tempore quaerat expedita
        distinctio voluptate iure? Necessitatibus, nostrum voluptas?
      </p>
      <div className="bg-gray-200 py-10">
        <h1 className="text-center text-3xl font-bold">Our Stats</h1>
        <div className="stats mb-4 mt-10 w-full shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Downloads</div>
            <div className="stat-value">31K</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">New Users</div>
            <div className="stat-value">4,200</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>
        </div>
        <div className="stats mb-10 w-full shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">New Registers</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Likes</div>
            <div className="stat-value text-primary">25.6K</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>
      </div>
      <h2 className="py-8 text-center text-2xl font-bold">FAQ</h2>
      <div className="collapse collapse-arrow rounded-none bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          How do I place an order on your website?
        </div>
        <div className="collapse-content">
          <p>
            Ordering from us is easy! Simply browse our product catalog, choose
            the items you want, and click the &quot;Add to Cart&quot; button.
            When you&apos;re ready, click &quot;Checkout,&quot; enter your
            shipping information, and complete your purchase.
          </p>
        </div>
      </div>
      <div className="collapse-arrow collapse rounded-none bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          What payment methods do you accept?
        </div>
        <div className="collapse-content">
          <p>
            We accept a variety of payment methods, including credit cards,
            debit cards, and PayPal. Rest assured, your payment information is
            kept secure throughout the transaction.
          </p>
        </div>
      </div>
      <div className="collapse-arrow collapse rounded-none bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          How long does shipping take?
        </div>
        <div className="collapse-content">
          <p>
            Our standard shipping typically takes 3-5 business days within the
            continental United States. For international orders, delivery times
            may vary. You can track your order using the provided tracking
            number.
          </p>
        </div>
      </div>
      <div className="collapse-arrow collapse rounded-none bg-base-200 mb-10">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          What is your return policy?
        </div>
        <div className="collapse-content">
          <p>
            We want you to be happy with your purchase! If you&apos;re not
            satisfied, you can return items within 30 days of delivery. Please
            review our detailed return policy for instructions on initiating a
            return.
          </p>
        </div>
      </div>
    </Layout>
  );
}
