import { NextPage } from 'next';
import { Card, CardBody } from '@nextui-org/react';
import { siteConfig } from '@/config/site';

const Home: NextPage = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardBody>
          <h1 className="text-2xl font-bold mb-4">{siteConfig.name}</h1>
          <p className="text-gray-600">{siteConfig.description}</p>
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">
              Enlaces del proyecto:
            </h2>
            <ul className="list-disc pl-5">
              <li>
                <a
                  href={siteConfig.links.githubFrontend}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Frontend Repository
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.githubBackend}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Backend Repository
                </a>
              </li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </main>
  );
};

export default Home;
