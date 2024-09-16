import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProjects } from "@/actions/projectActions";
import { allskills } from "@/lib/data";

export function HomePage() {
  const dispatch = useDispatch();

  const [selectedTag, setSelectedTag] = useState([]);

  const { isAuthenticated, user, error } = useSelector((state) => state.auth);
  const { loading, projects } = useSelector((state) => state.projects);
  const { isUpdated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  useEffect(() => {
    console.log(`Effect: ${JSON.stringify(projects)}`);
  }, [projects]);

  const filteredProjects =
    projects?.length > 0 &&
    projects.filter((project) =>
      project.tags.some((tag) => selectedTag.includes(tag))
    );

  const alterSelectedTags = (tag) => {
    if (selectedTag.includes(tag)) {
      const updatedTags = [...selectedTag];
      updatedTags.splice(selectedTag.indexOf(tag), 1);
      setSelectedTag([...updatedTags]);
    } else {
      setSelectedTag([...selectedTag, tag]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
      {/* <header
        className="flex items-center justify-between h-16 px-4 border-b shrink-0 md:px-6">
        <Link
          className="flex items-center gap-2 text-lg font-semibold sm:text-base"
          href="#">
          <FrameIcon className="w-6 h-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav
          className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
          <Link className="font-bold" href="#">
            Home
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Projects
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Deployments
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Analytics
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Logs
          </Link>
        </nav>
        <div className="flex items-center w-fit  gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="flex-1 relative">
            <SearchIcon
              className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="pl-10 pr-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-gray-300 dark:focus:ring-offset-gray-800 w-full"
              placeholder="Search..."
              type="search" />
          </form>
          <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="rounded-full ml-auto" size="icon" variant="ghost">
                        <img
                          alt="Avatar"
                          className="rounded-full border"
                          height="32"
                          src="/placeholder.svg"
                          style={{
                            aspectRatio: "32/32",
                            objectFit: "cover",
                          }}
                          width="32" />
                        <span className="sr-only">Toggle user menu</span>
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
        </div>
      </header> */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 bg-gray-100 dark:bg-gray-800 p-4 md:p-10">
        <div className="hidden md:block">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            <div className="space-y-4">
              {/* <div>
                <h4 className="text-sm font-medium mb-2">Category</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="category-web-development" />
                    <Label className="text-sm font-normal" htmlFor="category-web-development">
                      Web Development
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="category-design" />
                    <Label className="text-sm font-normal" htmlFor="category-design">
                      Design
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="category-devops" />
                    <Label className="text-sm font-normal" htmlFor="category-devops">
                      DevOps
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="category-mobile" />
                    <Label className="text-sm font-normal" htmlFor="category-mobile">
                      Mobile
                    </Label>
                  </div>
                </div>
              </div> */}
              <div>
                <h4 className="text-sm font-medium mb-2">Tags</h4>
                <div className="space-y-2">
                  {allskills.map((tag) => (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="tag-javascript"
                        onClick={() => alterSelectedTags(tag)}
                      />
                      <Label
                        className="text-sm font-normal"
                        htmlFor="tag-javascript"
                      >
                        {tag}
                      </Label>
                    </div>
                  ))}
                  {/* <div className="flex items-center gap-2">
                    <Checkbox id="tag-react" />
                    <Label className="text-sm font-normal" htmlFor="tag-react">
                      React
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="tag-css" />
                    <Label className="text-sm font-normal" htmlFor="tag-css">
                      CSS
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="tag-performance" />
                    <Label className="text-sm font-normal" htmlFor="tag-performance">
                      Performance
                    </Label>
                  </div> */}
                </div>
              </div>
            </div>
            {/* <div className="mt-4">
              <Button
                className="w-full bg-gray-900 text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90"
                size="sm"
                variant="ghost"
                onClick={() => console.log(selectedTag)}>
                Search
              </Button>
            </div> */}
          </div>
        </div>
        <div className="grid gap-8 auto-rows-min">
          {filteredProjects?.length > 0 ? (
            <>
              {filteredProjects.map((project, i) => (
                <section className="h-full">
                  <div className="group relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 dark:border-gray-800">
                    <Link className="absolute inset-0 z-10" href="#">
                      <span className="sr-only">View post</span>
                    </Link>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {project?.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2 mb-2">
                        {project?.tags?.length > 0 &&
                          project?.tags.map((tag) => (
                            <Badge
                              className={`hover:bg-gray-100/50 dark:hover:bg-gray-800/50 ${
                                selectedTag?.includes(tag)
                                  ? "bg-blue-500 text-white"
                                  : ""
                              }`}
                              variant="secondary"
                            >
                              {tag}
                            </Badge>
                          ))}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <img
                            alt="Author avatar"
                            className="rounded-full"
                            height="32"
                            src="/placeholder.svg"
                            style={{
                              aspectRatio: "32/32",
                              objectFit: "cover",
                            }}
                            width="32"
                          />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {project.developerName}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          May 2, 2024
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              ))}
              <div class="flex items-center">
                <hr class="flex-grow h-px bg-gray-200 mr-4" />
                Other Projects
                <hr class="flex-grow h-px bg-gray-200 ml-4" />
              </div>
            </>
          ) : (
            <></>
          )}
          {projects?.length > 0 ? (
            <>
              {projects.map((project, index) => (
                <section className="h-full" key={index}>
                  <div className="group relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700    bg-white dark:bg-gray-900 dark:border-gray-800">
                    <Link className="absolute inset-0 z-10" href="#">
                      <span className="sr-only">View post</span>
                    </Link>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {project?.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2 mb-2">
                        {project?.tags?.length > 0 &&
                          project?.tags.map((tag) => (
                            <Badge
                              className="hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                              variant="secondary"
                            >
                              {tag}
                            </Badge>
                          ))}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                      {project.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                      {project.githubRepoLink}
                      </p>
                      {/* {project.githubRepoLink && (
                        <div className="mt-2">
                          <Link href={project.githubRepoLink} className="text-sm text-blue-500 hover:underline">
                            {project.githubRepoLink}
                          </Link>
                        </div>
                      )} */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <img
                            alt="Author avatar"
                            className="rounded-full"
                            height="32"
                            src="/placeholder.svg"
                            style={{
                              aspectRatio: "32/32",
                              objectFit: "cover",
                            }}
                            width="32"
                          />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {project.developerName}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          May 2, 2024
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </>
          ) : (
            <>
              <h1>No Projects to show</h1>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function FrameIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" x2="2" y1="6" y2="6" />
      <line x1="22" x2="2" y1="18" y2="18" />
      <line x1="6" x2="6" y1="2" y2="22" />
      <line x1="18" x2="18" y1="2" y2="22" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function MoveHorizontalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}
