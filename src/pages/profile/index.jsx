import EditProfile from "@/components/EditProfile";
import LandingPage from "@/layouts/LandingPage";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setEdit, setUser, setLoading } from "@/redux/features/userSlice";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
export default function Profile() {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const URL_API = process.env.NEXT_PUBLIC_API_URL;
  const { data, isEdit, isLoading } = useSelector((state) => state.user);
  const firstName = data.Username[0];

  const getId = async (token, URL_API, dispatch) => {
    dispatch(setLoading(true));
    try {
      if (!token) return;
      const decode = jwt_decode(token);
      const id = decode.id;
      const dataUser = await fetch(`${URL_API}/players/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await dataUser.json();
      if (response) {
        dispatch(
          setUser({
            id: response.data.id,
            Username: response.data.Username,
            Email: response.data.Email,
            City: response.data.City,
            Biodata: response.data.Biodata,
          }),
        );
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getId(token, URL_API, dispatch);
  }, [token, URL_API, dispatch]);

  return (
    <LandingPage>
      <div className="h-full">
        <div className="p-6 ">
          <div className="grid grid-cols-4  gap-4">
            <div className=" py-10">
              <div className="px-5 bg-white shadow-2xl w-full rounded-2xl relative flex items-center flex-col">
                <div
                  className={
                    isLoading
                      ? "avatar animate-pulse bg-gray-200 placeholder flex justify-center"
                      : "avatar placeholder flex justify-center"
                  }
                >
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-24 absolute -top-1/2 -translate-y-1/2">
                    <span className="text-3xl uppercase">{isLoading ? "" : firstName}</span>
                  </div>
                </div>

                <div className="text-center pt-20 pb-10 w-full px-5">
                  <div>
                    {isEdit ? (
                      <EditProfile />
                    ) : (
                      <div>
                        {isLoading ? (
                          <div>
                            <div className="flex w-full justify-center">
                              <div className="rounded-lg bg-gray-200 h-8 w-20 animate-pulse"></div>
                            </div>
                            <div className="flex w-full justify-center my-2">
                              <div className="rounded-lg bg-gray-200 h-3 w-10 animate-pulse"></div>
                            </div>
                            <div className="rounded-lg bg-gray-200 h-3 w-full animate-pulse"></div>
                            <div className="rounded-lg bg-gray-200 my-2 h-3 w-full animate-pulse"></div>
                            <div className="rounded-lg bg-gray-200  h-3 w-full animate-pulse"></div>
                            <div className="flex w-full justify-center my-2">
                              <div className="rounded-lg bg-gray-200  h-12 w-20 mt-5 animate-pulse"></div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h1 className="font-semibold text-[1.5rem]">{data.Username}</h1>
                            <p className="mb-5">user</p>
                            <div className="flex justify-between  flex-wrap">
                              <div className="font-medium">Email:</div>
                              <div className="">{data.Email}</div>
                            </div>
                            <div className="flex justify-between  flex-wrap">
                              <div className="font-medium">City:</div>
                              <div className={!data.City ? "italic font-light" : null}>
                                {!data.City ? "empty" : data.City}
                              </div>
                            </div>
                            <div className="flex justify-between  flex-wrap">
                              <div className="font-medium">Biodata:</div>
                              <div className={!data.Biodata ? "italic font-light" : null}>
                                {!data.Biodata ? "empty" : data.Biodata}
                              </div>
                            </div>
                            {!isEdit && (
                              <div className="flex gap-2 justify-center pt-10 flex-wrap">
                                <button className="btn btn-sm" onClick={() => dispatch(setEdit(true))}>
                                  edit data
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3 bg-blue-gray-600">
              <div className="grid grid-cols-1 gap-3 p-3">
                <div className="bg-white rounded-lg p-4 shadow-xl">
                  <h2 className="font-medium text-[1.2rem] mb-2">profile</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione assumenda, consequatur voluptatem
                    obcaecati incidunt molestiae vel? Molestias alias, esse accusamus commodi laudantium, nobis placeat
                    minima expedita cupiditate dignissimos explicabo saepe magni. Nesciunt dicta, dolor, molestiae
                    maiores, temporibus odio minima reiciendis quo labore deserunt cupiditate aut accusamus recusandae
                    porro blanditiis veniam.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-2 shadow-xl">2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingPage>
  );
}

export const getServerSideProps = ({ req }) => {
  const { token } = req.cookies;
  if (!token) {
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
};
