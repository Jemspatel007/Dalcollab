"use client";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import Link from "next/link";
import { EditProfile } from "./edit-profile";
import { EditSkills } from "./edit-skills";
import { EditIntrests } from "./edit-intrests";
import { EditProject } from "./edit-project";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AddProject } from "./add-project";

export function ProfilePage() {
  const [editModal, setEditModal] = useState(false);
  const [editSkills, setEditSkills] = useState(false);
  const [editIntrests, setEditIntrests] = useState(false);
  const [editProject, setEditProject] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [projectId, setProjectId] = useState(0);

  const { isAuthenticated, user, error } = useSelector((state) => state.auth);

  console.log(user);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 max-w-6xl mx-auto py-10 px-4 md:px-6">
      {editModal && <EditProfile openModal={setEditModal} />}
      {editSkills && <EditSkills openModal={setEditSkills} />}
      {editIntrests && <EditIntrests openModal={setEditIntrests} />}
      {addProject && <AddProject openModal={setAddProject} />}
      {editProject && (
        <EditProject openModal={setEditProject} projectId={projectId} />
      )}
      <div>
        <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
            <AvatarImage
              alt={user?.userName}
              src={user?.profileImage || "/placeholder-avatar.jpg"}
              // https://jemsimage.s3.amazonaws.com/a0ab1f85-c734-41dd-a441-4d6844d1c553.png
            />
            <AvatarFallback>
              {user?.userName?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="w-full">
            <div className="w-full flex items-center justify-between">
              <h1 className="text-2xl font-bold">{user?.userName}</h1>
              <Button onClick={() => setEditModal(true)}>Edit Profile</Button>
            </div>
            {/* <p className="text-gray-500 dark:text-gray-400">{user?.tagline}</p> */}
          </div>
        </div>
        {/* <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          {user?.bio}
        </p> */}
        <div className="grid gap-4 mt-8">
          <div className="rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-100 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Add New Project</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Click to add a new project.
                  </p>
                </div>
                <Button
                  className="ml-auto"
                  size="icon"
                  variant="ghost"
                  onClick={() => setAddProject(true)}
                >
                  <PlusIcon className="w-4 h-4" />
                  <span className="sr-only">Add Project</span>
                </Button>
              </div>
            </div>
          </div>
          {user?.projects?.length > 0 &&
            user?.projects.map((project, i) => (
              <div key={i} className="rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-100 dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{project.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {project.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {project.githubRepoLink}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 mb-2">
                            <Badge
                              className="hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                              variant="secondary"
                            >
                              {project.git}
                            </Badge>
                      </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="ml-auto"
                          size="icon"
                          variant="ghost"
                        >
                          <MoveHorizontalIcon className="w-4 h-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Project</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setEditProject(true);
                            setProjectId(i);
                          }}
                        >
                          Edit Project
                        </DropdownMenuItem>
                        <DropdownMenuItem>Delete Project</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags &&
                      project.tags.map((tag, index) => (
                        <Badge key={index}>{tag}</Badge>
                      ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <Button onClick={() => setEditSkills(true)}>Edit</Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {user?.skills?.map((skill, index) => (
                <Badge key={index}>{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Interests</CardTitle>
            <Button onClick={() => setEditIntrests(true)}>Edit</Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {user?.interests?.map((interest, index) => (
                <Badge key={index}>{interest}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Social</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <TwitterIcon className="h-5 w-5 text-[#1DA1F2]" />
                <Link className="text-sm hover:underline" href="#">
                  @johndoe
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <LinkedinIcon className="h-5 w-5 text-[#0077B5]" />
                <Link className="text-sm hover:underline" href="#">
                  John Doe
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <GithubIcon className="h-5 w-5 text-gray-900 dark:text-gray-50" />
                <Link className="text-sm hover:underline" href="#">
                  johndoe
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function GithubIcon(props) {
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
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
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
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  );
}

function PlusIcon(props) {
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
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function TwitterIcon(props) {
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
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  );
}