"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { logout } from "@/actions/userActions";
import { useRouter } from 'next/router';

export function Header() {
  const { isAuthenticated, user, error } = useSelector((state) => state.auth);
  console.log(user);
  const router = useRouter();
 
  const logoutHandler = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Remove the token from local storage
      localStorage.removeItem('accessToken');
      window.location.reload();
       // Adjust 'token' if your key is different
      // Redirect to the home page
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col">
      <header className="flex h-16 w-full shrink-0 items-center px-4 md:px-6 border-b">
        <Link className="mr-6 flex items-center" href="/">
          <img
              src="https://png.pngtree.com/png-vector/20190115/ourmid/pngtree-graduation-cap-flat-multi-color-icon-png-image_315724.jpg"
              alt="Dal Collab"
              className="h-10 w-10"
          />
          {/* <MountainIcon className="h-6 w-6" /> */}
          <span className="sr-only">Acme Inc</span>
        </Link>

        <nav className="ml-auto flex gap-4 sm:gap-6">
          {user ? (
            <>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/user/Profile"
              >
                {user.userName?.split('@')[0]}
              </Link>
              <button
                className="text-sm font-medium hover:underline underline-offset-4"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/auth/login"
              >
                Login
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/auth/register"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}

// function MountainIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
//     </svg>
//   );
// }
