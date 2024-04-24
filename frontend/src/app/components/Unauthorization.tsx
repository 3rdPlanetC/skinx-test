import Link from "next/link"

export default () => {
    return (
        <div className="h-screen m-auto flex flex-col justify-center text-center">
            <p className="mb-3">Unauthorization</p>
            <Link href={"/login"} className="underline">
                Go To Login
            </Link>
        </div>
    )
}
