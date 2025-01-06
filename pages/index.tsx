import { NextPage } from 'next';
import {
  Card,
  CardBody,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import { siteConfig } from '@/config/site';
import { GithubIcon } from '@/components/icons';

const Home: NextPage = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <Navbar className="p-0">
              <NavbarContent>
                {siteConfig.navItems.map((item) => (
                  <NavbarItem key={item.href}>
                    <Link
                      className="text-gray-600 hover:text-gray-900"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </NavbarItem>
                ))}
              </NavbarContent>
            </Navbar>
            <h1 className="text-2xl font-bold">{siteConfig.name}</h1>
          </div>
          <p className="text-gray-600 text-center">{siteConfig.description}</p>
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">
              Enlaces del proyecto:
            </h2>
            <ul className="list-disc pl-5">
              <li className="flex items-center gap-2">
                <GithubIcon className="text-gray-600" size={20} />
                <a
                  href={siteConfig.links.githubFrontend}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Frontend Repository
                </a>
              </li>
              <li className="flex items-center gap-2">
                <GithubIcon className="text-gray-600" size={20} />
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
