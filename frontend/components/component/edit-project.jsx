import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { allskills } from "@/lib/data"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import { loadUser, updateProject } from "@/actions/userActions";

export function EditProject({ openModal, projectId }) {

  const dispatch = useDispatch();

  const { isAuthenticated, user, error } = useSelector((state) => state.auth);
  const { isUpdated } = useSelector((state) => state.user);

  const [projectName, setProjectName] = useState();
  const [description, setDescription] = useState();

  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (user) {
      setProjectName(user?.projects[projectId].name)
      setDescription(user?.projects[projectId].description);
      setTags(user?.projects[projectId]?.tags);
    }

    if (isUpdated) {
      // alert("Here")
      dispatch(loadUser());
      dispatch({
        type: "UPDATE_PROFILE_RESET",
      });
      openModal(false);
    }
  }, [dispatch, user, isUpdated]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const project = {id: user?.projects[projectId]?.id, name: projectName, description, tags};
    dispatch(updateProject(project));
  };

  const handleDeleteTag = (index) => {
    const newTags = [...tags];

    newTags.splice(index, 1);

    setTags(newTags);
  };


  return (
    <div
    className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center">
    <div
      className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Edit ProjectName</h2>
        <Button className="ml-auto" size="icon" variant="ghost" onClick={() => openModal(false)}>
          <XIcon className="w-5 h-5" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      <form className="space-y-4">
        <div>
          <Label htmlFor="email">Project Name</Label>
          <Input defaultValue={projectName} id="email" type="email" onChange={(e) => setProjectName(e.target.value)}/>
        </div>
        <div>
          <Label htmlFor="bio">Description</Label>
          <Textarea
            defaultValue={description}
            id="description"
            rows={6} 
            onChange={(e) => setDescription(e.target.value)}
            />
        </div>
        <div>
            <Label htmlFor="role">Technology</Label>
            <Select
              onValueChange={(value) => {
                setTags([...tags, value]);
              }}
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Type here" />
              </SelectTrigger>
              <SelectContent onChange={() => alert("f")}>
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"></span>
                {allskills.map((skill) => (
                  <SelectItem value={skill}>
                    {tags.includes(skill) ? (
                      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                        <Check className="h-4 w-4" />
                      </span>
                    ) : (
                      <></>
                    )}
                    {skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {tags?.map((tag, index) => (
            <>
              <Badge className="mr-3">
                {tag}{" "}
                <XIcon
                  sstyle={{ color: "red", cursor: "default" }}
                  onMouseEnter={(e) => (e.target.style.color = "red")} // Hover effect
                  onMouseLeave={(e) => (e.target.style.color = "white")}
                  onClick={() => handleDeleteTag(index)}
                  className="ml-1.5 w-4 h-4"
                />
              </Badge>
            </>
          ))}
          
        <div className="flex justify-end">
          <Button type="submit" onClick={submitHandler}>
              Save Changes
            </Button>
        </div>
      </form>
    </div>
  </div>);
}

function XIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>)
  );
}
