import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
  CircularProgress,
} from "@/layouts/RegisterPage";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { globalToast } from "../../../../utils/globaToast";
import { useRouter } from "next/router";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const payload = {
    Email: "",
    Username: "",
    Password: "",
    Total_score: 0,
    Biodata: "",
    City: "",
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      ...payload,
      agree: false,
    },
  });
  const onSubmit = async (data) => {
    const { agree, ...payload } = data;
    setLoading(true);
    try {
      const register = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/players`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const response = await register.json();
      if (register.ok) {
        globalToast.success(response.message);
        router.push("/auth/login");
      }
    } catch (error) {
      globalToast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardBody className="flex flex-col gap-2">
              <p className="text-[1.5rem]">Register Page</p>
              <div>
                <Input
                  label="Username"
                  size="lg"
                  {...register("Username", {
                    required: {
                      value: true,
                      message: "cannot be empty",
                    },
                    minLength: {
                      value: 3,
                      message: "Username should be at least 3 characters long.",
                    },
                  })}
                />
                <div className="pt-1 flex flex-col">
                  <div className={`text-sm text-red-400 ${errors.Username ? "" : "invisible"}`}>
                    {" "}
                    {errors.Username ? <p>{errors.Username?.message}</p> : <div className="invisible">invisible</div>}
                  </div>
                </div>
              </div>
              <div>
                <Input
                  type="text"
                  {...register("Email", {
                    required: "Email is required!",
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Invalid email address",
                    },
                  })}
                  label="Email"
                  size="lg"
                />
                <div className={`text-sm text-red-400 ${errors.Email ? "" : "invisible"}`}>
                  {" "}
                  {errors.Email ? <p>{errors.Email?.message}</p> : <div className="invisible">invisible</div>}
                </div>
              </div>
              <div>
                <Input
                  type="password"
                  {...register("Password", {
                    required: "Password cannot be empty",
                    pattern: {
                      value: /^(?=.*[A-Z]).*$/,
                      message: "at least one Uppercase Character",
                    },
                  })}
                  label="Password"
                  size="lg"
                />
                <div className={`text-sm text-red-400 ${errors.Password ? "" : "invisible"}`}>
                  {errors.Password ? <p>{errors.Password?.message}</p> : <div className="invisible">invisible</div>}
                </div>
              </div>
              <div className="-ml-2.5">
                <Checkbox
                  label="I agree the Terms and Conditions"
                  {...register("agree", {
                    required: {
                      value: true,
                      message: "you must agree the terms and condition",
                    },
                  })}
                />
                <div className={`ml-2.5 text-sm text-red-400 ${errors.agree ? "" : "invisible"}`}>
                  {errors.agree ? <p>{errors.agree?.message}</p> : <div className="invisible">invisible</div>}
                </div>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <div>
                <button className="btn btn-primary w-full" type="submit" disabled={loading}>
                  {loading ? <BeatLoader color="#fff" size={10} /> : "Register"}
                </button>
              </div>
              <Typography variant="small" className="mt-6 flex justify-center">
                Already have an account?
                <Link href="/auth/login">
                  <Typography as="span" variant="small" color="blue" className="ml-1 font-bold">
                    Sign in
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
          </form>
        </Card>
      </div>
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
