import Link from "next/link"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { register, clearErrors } from "@/actions/userActions"
import { useRouter } from 'next/router';


import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Register() {

  const dispatch = useDispatch();

  const [userName, setUsername] = useState();
  const [email, setEmail] = useState();
  const [mobileNumber, setMobileNumber] = useState(0);
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const router = useRouter();


  const { isAuthenticated, error } = useSelector(state => state.auth)

    useEffect(() => {
      if (isAuthenticated) {
        router.push('/')
      }
  
      if(error){
        console.log(error);
        // toast.error(error);
        if(error === 'User already exists !!') document.getElementById('email').classList.add('red-border');
        // else document.getElementById('form').classList.add('red-border');
        dispatch(clearErrors())
      } 
    }, [dispatch , error]);

    const removeErrorLayout = () => {
      document.getElementById('password').classList.remove('red-border');
      document.getElementById('cpassword').classList.remove('red-border');
      document.getElementById('form').classList.remove('red-border');
      document.getElementById('email').classList.remove('red-border');
      document.getElementById('username').classList.remove('red-border');
      document.getElementById('mobileNumber').classList.remove('red-border');
}

const isValidationPassed = () => {
  if(userName == ''){
    // document.getElementById('username').classList.add('red-border');
    // toast.error('Please enter First name !!');
    return false;

  }else if(email == '' || email == undefined){

    // document.getElementById('email').classList.add('red-border');
    // toast.error('Please enter email !!');
    return false;
  }else if(isNaN(mobileNumber) || mobileNumber == undefined || mobileNumber == 0){

    // document.getElementById('mobileNumber').classList.add('red-border');
    // toast.error('Please enter mobile number !!');
    return false;
  }else if(password == '' || password == undefined){

    // document.getElementById('password').classList.add('red-border');
    // toast.error('Please enter password !!')
    return false;
  }else if(password !== confirmpassword){
    
      // document.getElementById('password').classList.add('red-border');
      // document.getElementById('cpassword').classList.add('red-border');
      // toast.error("Passwords do not match !!")
      return false;
  }
  return true;
}

    const submitHandler = async (e) => {
      console.log({userName, email, mobileNumber, password})
      e.preventDefault();
      // removeErrorLayout();
      if(isValidationPassed()){
        const user = {userName, email, mobileNumber, password};
        console.log(user);
        dispatch(register(user))
        router.push("/")
      }
    }

  return (
    (<div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1">
        <div>
          <form className="flex h-full items-center justify-center px-4 py-12 md:px-6">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-2xl">Register</CardTitle>
                <CardDescription>Create a new account by entering your details below.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="username" placeholder="John Doe" required type="text" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="m@example.com" required type="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input id="mobileNumber" placeholder="+1 (123) 456-7890" required type="tel" onChange={(e) => setMobileNumber(e.target.value)}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" required type="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Confirm Password</Label>
                  <Input id="cpassword" required type="password" onChange={(e) => setConfirmpassword(e.target.value)}/>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={submitHandler}>Register</Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </main>
      <footer
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Acme Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>)
  );
}

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>)
  );
}
