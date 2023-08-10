import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    fetchSignInMethodsForEmail,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useAuth } from "@/firebase/auth";
import Link from "next/link";
import Loader from "@/components/Loader";

const Provider = new GoogleAuthProvider();

const RegisterForm = () => {
    const router = useRouter();
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const { authUser, isLoading, setAuthUser } = useAuth();
    const [isPasswordValid, setPasswordValid] = useState(true); // Initialize as true
    const [userExistsError, setUserExistsError] = useState(false);

    useEffect(() => {
        if (!isLoading && authUser) {
            router.push("/");
        }
    }, [authUser, isLoading]);

    const signupHandler = async () => {
        if (!email || !password || !username || !isPasswordValid) return;

        try {
            const userExists = await fetchSignInMethodsForEmail(auth, email);

            if (userExists.length > 0) {
                // User with the provided email already exists
                setUserExistsError(true);
                return;
            }

            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await updateProfile(auth.currentUser, {
                displayName: username,
            });

            setAuthUser({
                uid: user.uid,
                email: user.email,
                username,
            });
        } catch (error) {
            console.error("An error occurred", error);
        }
    };

    const signInWithGoogle = async () => {
        const user = await signInWithPopup(auth, Provider);
        console.log(user);
    };

    const handlePasswordChange = (newPassword) => {
        setPassword(newPassword);
        setPasswordValid(newPassword.length >= 6); // Update password validity based on its length
    };

    return isLoading || (!isLoading && !!authUser) ? (
        <Loader />
    ) : (
        <main className="flex lg:h-[100vh]">
            <div className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
                <div className="p-8 w-[600px]">
                    <h1 className="text-6xl font-semibold">Sign Up</h1>
                    <p className="mt-6 ml-1">
                        Already have an account ?{" "}
                        <Link
                            href="/login"
                            className="underline hover:text-blue-400 cursor-pointer"
                        >
                            Login
                        </Link>
                    </p>
                    {userExistsError && (
                        <p style={{ color: 'red', marginTop: '0.5rem' }}>An account with this email already exists</p>
                    )}
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Name</label>
                            <input
                                type="text"
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                onChange={(e) => handlePasswordChange(e.target.value)}
                                required
                            />
                            {!isPasswordValid && (
                                <p style={{ color: 'red', marginTop: '0.5rem' }}>Password must be at least 6 characters long</p>
                            )}
                        </div>
                        <button
                            className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90"
                            onClick={signupHandler}
                            disabled={!isPasswordValid}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
            <div
                className="w-[40%] bg-slate-400 bg-cover bg-right-top hidden lg:block"
                style={{
                    backgroundImage: "url('/register.jpg')",
                }}
            ></div>
        </main>
    );
};

export default RegisterForm;
