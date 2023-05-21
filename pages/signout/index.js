import React from 'react';
import { useRouter } from 'next/router';
import { getServerSideProps } from '../../lib/getServerSideProps'
import { getAuth, signOut } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast'
import { auth } from '../../lib/firebase/config'


export { getServerSideProps };


export default function Logout() {
  const router = useRouter();
  const [data, setData] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
    const logout = async () => {
      const result = await signOut(auth);
      const res = await fetch('/api/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: "",
      });

      const json = await res.json()
      setData(json.data);
      setIsLoading(false);
      if (res.ok) {
        return router.replace(`/novels/`);
      } else {
        toast.error("ログイン失敗しました。");
      }
    }

    logout();
  }, [])

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      {data}
    </div>
  )
}
