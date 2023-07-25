import { Card, CardHeader, CardBody, CardFooter, Input, Checkbox, Button, Typography } from "@/layouts/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { login, setLoading } from "@/redux/features/authSlice";
import Link from "next/link";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { globalToast } from "../../../../utils/globaToast";
import { SyncLoader } from "react-spinners";
import { useRouter } from "next/router";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const URL_API = process.env.NEXT_PUBLIC_API_URL;
  const auth = useSelector((state) => state.auth);
  const { loading } = auth;

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    const { Username, Password } = data;
    if (!data.Username && !data.Password) {
      globalToast.error("form cannot be empty");
      dispatch(setLoading(false));
      return;
    }
    if (!data.Password) {
      globalToast.error("password cannot be empty");
      dispatch(setLoading(false));
      return;
    }
    if (!data.Username) {
      globalToast.error("username cannot be empty");
      dispatch(setLoading(false));
      return;
    }
    try {
      const loginData = await fetch(`${URL_API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Username,
          Password,
        }),
      });
      const response = await loginData.json();
      if (loginData.status === 401) {
        globalToast.error(response.msg);
        dispatch(setLoading(false));
        return;
      }
      if (!response.auth) {
        globalToast.error(response.message);
        dispatch(setLoading(false));
        return;
      }
      dispatch(login({ Username }));
      if (response.token) {
        Cookies.set("token", response.token);
        globalToast.success(`success login as ${Username}`);
        dispatch(setLoading(false));
        router.push("/");
      }
    } catch (error) {
      globalToast.error(error.message);
    }
  };
  return (
    <div className="flex w-full justify-center h-screen items-center">
      <Card className="w-full max-w-[24rem] h-auto">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="flex flex-col gap-4">
            <p className="text-lg">login page</p>
            <Input type="text" label="Username" size="lg" {...register("Username")} />
            <Input type="password" label="Password" size="lg" {...register("Password")} />
            {/* <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div> */}
          </CardBody>
          <CardFooter className="pt-0">
            <div>
              <button className="btn btn-primary w-full" type="submit" disabled={loading}>
                {loading ? <SyncLoader color="#fff" size={10} /> : "Sign In"}
              </button>
            </div>
            <Typography variant="small" className="mt-6 flex justify-center">
              Dont have an account?
              <Link href="/auth/register">
                <Typography as="span" variant="small" color="blue" className="ml-1 font-bold">
                  Register now
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export function getServerSideProps({ req }) {
  const { token } = req.cookies;

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
