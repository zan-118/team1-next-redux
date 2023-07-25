import { setEdit, setLoading, setUser } from "@/redux/features/userSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { globalToast } from "../../../utils/globaToast";

export default function EditProfile() {
  const { data, isEdit, isLoading } = useSelector((state) => state.user);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const URL_API = process.env.NEXT_PUBLIC_API_URL;
  const token = Cookies.get("token");
  const router = useRouter();

  const handleEdit = async (req) => {
    try {
      dispatch(setLoading(true));
      dispatch(setEdit(false));
      const putData = await fetch(`${URL_API}/players/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Username: req.Username,
          Email: req.Email,
          Biodata: req.Biodata,
          City: req.City,
        }),
      });
      const response = await putData.json();
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
      console.log(error);
    }
  };
  return (
    <div className="">
      <form className="gap-2 flex flex-col" onSubmit={handleSubmit(handleEdit)}>
        <input
          type="text"
          placeholder={data.Username}
          {...register("Username")}
          className="input input-bordered input-sm w-full max-w-xs"
        />
        <input
          type="text"
          placeholder={data.Email}
          {...register("Email")}
          className="input input-bordered input-sm w-full max-w-xs"
        />
        <input
          type="text"
          placeholder={data.City}
          {...register("City")}
          className="input input-bordered input-sm w-full max-w-xs"
        />
        <input
          type="text"
          placeholder={data.Biodata}
          {...register("Biodata")}
          className="input input-bordered input-sm w-full max-w-xs"
        />
        <div className="flex gap-2 justify-center pt-10 flex-wrap">
          <div
            className="btn btn-sm btn-warning"
            onClick={() => {
              dispatch(setEdit(false));
            }}
          >
            cancel
          </div>
          <button className="btn btn-sm btn-primary" type="submit">
            save
          </button>
        </div>
      </form>
    </div>
  );
}
