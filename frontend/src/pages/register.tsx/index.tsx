import { useState } from "react"
import cookie from "js-cookie"
import { useRouter } from "next/navigation"
import Link from "next/link"
import "@/app/globals.css"

export default function RegisterPage() {
    // states
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    // routers
    const router = useRouter()
    // methods
    async function onSubmit(registerData: {
        username: string
        password: string
    }) {
        fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                username: registerData.username,
                password: registerData.password
            })
        }).then(async (response) => {
            const data = await response.json()
            if (response.status === 200) {
                await router.push("/login")
            } else if (response.status === 401) {
                setErrorMessage(data.message)
            } else {
                setErrorMessage(data.message)
            }
        })
    }
    return (
        <div className="px-4 md:px-0 lg:w-full gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
            <div className="md:mx-6 md:p-12">
                <form>
                    <p className="mb-4">Register Page</p>
                    <div className="relative mb-4" data-twe-input-wrapper-init>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput1"
                        />
                        <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary">
                            Username
                        </label>
                    </div>

                    <div className="relative mb-4" data-twe-input-wrapper-init>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput11"
                        />
                        <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary">
                            Password
                        </label>
                    </div>
                    <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                            onClick={() => onSubmit({ username, password })}
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out"
                            type="button"
                            style={{
                                background:
                                    "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"
                            }}
                        >
                            Submit Register
                        </button>
                        <Link href={"/login"}>Login</Link>
                    </div>
                </form>
                <div>error message : {errorMessage}</div>
            </div>
        </div>
    )
}
