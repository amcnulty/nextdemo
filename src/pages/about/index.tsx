/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Layout from "~/components/layout";
import useSWR from "swr";
import { fetcher } from "~/util/fetcher";

export default function About() {
  const { data } = useSWR(
    '/api/hello',
    fetcher,
  );
  console.log('data :>> ', data);

    const { data: examples } = useSWR('/api/example', fetcher);

  return (
    <Layout>
      <h1>About page header</h1>
    </Layout>
  );
}
