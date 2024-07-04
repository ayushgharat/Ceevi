"use server"

import { readFileSync, writeFileSync } from "fs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import ResumeParser from "resume-parser"

import { createClient } from "~utils/supabase/server"

export async function login(email: string, password: string) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return {
      message: error.message
    }
  }

  console.log("User has logged in")

  revalidatePath("/", "layout")
  redirect("/dashboard")
}

export async function signup(email, password, firstName, lastName) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const {
    data: { user },
    error
  } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: `${firstName} ${lastName}`,
        profile_created: false
      }
    }
  })

  if (error) {
    return {
      message: error.message
    }
  } else {
    if (user) {
      let redirectPath: string | null = null

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/db/new-user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ user })
          }
        )

        if (!response.ok) {
          return {
            message: JSON.stringify(response.json())
          }
        } else {
          redirectPath = `/dashboard/profile/edit-profile`
        }
      } catch (error) {
        console.error("Error creating user:", error)
      } finally {
        //Clear resources
        if (redirectPath)
          redirect(redirectPath)
      }
    }
  }
  //revalidatePath("/", "layout")
  //redirect("/dashboard")
}

export async function checkIfUserIsLoggedIn() {
  const supabase = createClient()
  const {
    data: { user },
    error
  } = await supabase.auth.getUser()

  if (error) {
    console.log(error)
    return { error }
  }

  return { user }
}

export async function signInWithGoogle() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/callback`
    }
  })

  if (data.url) redirect(data.url)
}

export async function signOut() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect("/error")
  }

  revalidatePath("/", "layout")
  redirect("/authneticate/login")
}

export async function getUserProfile(id) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("users")
    .select("profile")
    .eq("id", id)

  if (error) {
    return { error: error }
  }

  return { profile: data }
}
