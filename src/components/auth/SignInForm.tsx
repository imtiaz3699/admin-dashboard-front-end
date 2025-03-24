import { useState } from "react";
import { Link, useNavigate, } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import SocialLoginSignupBtn from "../SocialLoginSignupBtn/SocialLoginSignupBtn";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import { useUser } from "../../context/userContext";
import Cookies from "js-cookie";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useApi } from "../../context/apiFuncContext";
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required.")
})
export default function SignInForm() {
  const { setUser, setToken } = useUser();
  const { postRequest } = useApi()
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      error: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await postRequest('/auth/login', values);
        if (res?.status === 200) {
          formik.setFieldValue('error', '');
          Cookies.set("token", res?.data?.token, {
            expires: 7,
            secure: true,
          });
          Cookies.set("user", JSON.stringify(res?.data?.user), {
            expires: 7,
            secure: true,
          });
          setUser(res?.data?.user);
          setToken(res?.data?.token);
          navigate("/dashboard")
        }
      } catch (error: any) {
        console.log(error, 'fadslfashdlkf');
        formik.setFieldValue('error', error?.response?.data?.message)
      }
    },
  })
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <SocialLoginSignupBtn btnText="in" />
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  Or
                </span>
              </div>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="space-y-6">
                <InputWithLabel
                  label='Email'
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && formik.errors.email ? true : false}
                  errorMessage={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                  disabled={formik.isSubmitting}
                />
                <div className='relative'>
                  <InputWithLabel
                    label="Password"
                    name="password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && formik.errors.password ? true : false}
                    errorMessage={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
                    disabled={formik.isSubmitting}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute z-30 -translate-y-1/2 cursor-pointer right-4  ${formik.touched.password && formik.errors.password ? "top-[55%]" : "top-[70%]"} `}
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className='flex flex-col gap-1'>
                  {
                    formik.values.error && <div className='text-red-500 text-[14px] text-center'>{formik.values.error}</div>
                  }
                  <Button disabled={formik.isSubmitting} type="submit" className="w-full" size="sm">
                    Sign in
                  </Button>
                </div>
              </div>
            </form>


            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
