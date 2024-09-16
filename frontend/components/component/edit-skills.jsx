import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { loadUser, updateSkills } from "@/actions/userActions";
import { allskills } from "@/lib/data";

export function EditSkills({ openModal }) {
  const dispatch = useDispatch();

  const { isAuthenticated, user, error } = useSelector((state) => state.auth);
  const { isUpdated } = useSelector((state) => state.user);

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (user) {
      setSkills([...user.skills]);
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
    dispatch(updateSkills(skills));
  };

  const handleDeleteSkill = (index) => {
    const newSkills = [...skills];

    newSkills.splice(index, 1);

    setSkills(newSkills);
  };

  return (
    <div
      key="1"
      className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center"
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Edit Profile</h2>
          <Button
            className="ml-auto"
            size="icon"
            variant="ghost"
            onClick={() => openModal(false)}
          >
            <XIcon className="w-5 h-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <form className="space-y-4">
          <div>
            <Label htmlFor="role">Skills</Label>
            <Select
              onValueChange={(value) => {
                setSkills([...skills, value]);
              }}
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Type here" />
              </SelectTrigger>
              <SelectContent onChange={() => alert("f")}>
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"></span>
                {allskills.map((skill) => (
                  <SelectItem value={skill}>
                    {skills.includes(skill) ? (
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
          {skills?.map((skill, index) => (
            <>
              <Badge className="mr-3">
                {skill}{" "}
                <XIcon
                  sstyle={{ color: "red", cursor: "default" }}
                  onMouseEnter={(e) => (e.target.style.color = "red")} // Hover effect
                  onMouseLeave={(e) => (e.target.style.color = "white")}
                  onClick={() => handleDeleteSkill(index)}
                  className="ml-1.5 w-4 h-4"
                />
              </Badge>
            </>
          ))}
          <div className="grid grid-cols-2 gap-4" />
          <div className="flex justify-end">
            <Button type="submit" onClick={submitHandler}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
