import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { loadUser, updateProfile } from "@/actions/userActions"


export function EditProfile({ openModal }) {
  const dispatch = useDispatch();

  const [userName, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { isAuthenticated, user, error } = useSelector((state) => state.auth);
  const { isUpdated } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setUsername(user.userName);
      setMobileNumber(user.mobileNumber);
      setTagline(user.tagline);
      setBio(user.bio);
      setProfileImagePreview(user.profileImage || "/placeholder-avatar.jpg");
    }
    if (isUpdated) {
      dispatch(loadUser());
      dispatch({
        type: "UPDATE_PROFILE_RESET",
      });
      openModal(false);
    }
  }, [dispatch, user, isUpdated]);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setProfileImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("mobileNumber", mobileNumber);
    formData.append("tagline", tagline);
    formData.append("bio", bio);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    dispatch(updateProfile(formData));
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center">
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
        <form className="space-y-4" onSubmit={submitHandler}>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-4 flex items-center justify-center">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  alt={userName}
                  className="rounded-full object-cover"
                  src={profileImagePreview}
                />
                <AvatarFallback>
                  {userName?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 w-52">
                <Input id="profile-photo" type="file" onChange={onImageChange} />
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="tagline">Tag Line</Label>
            <Input
              id="tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="mobile">Mobile</Label>
            <Input
              id="mobile"
              type="number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={5}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function XIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
