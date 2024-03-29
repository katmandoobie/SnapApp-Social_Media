import * as z from "zod"
import { Button} from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation";
import { Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";




const SignupForm = () => {
  const {toast} = useToast();
  const {mutateAsync:createUserAccount,isLoading:isCreatingUser} = useCreateUserAccount();
  const {mutateAsync: signInAccount, isLoading: isSigningIn} = useSignInAccount();
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // Do something with the form values.
    const newUser = await createUserAccount(values);
    console.log(newUser);
    // ✅ This will be type-safe and validated.
    if(!newUser) {
      return toast({
        title: "Sign up failed. Please try again."
      });
    }

    const session = await signInAccount({
      email: values.email, 
      password: values.password
    });

    if(!session){
      return toast({title: 'Sign in failed. Please try again.'});
    }


  }

  return (
    <Form {...form}>
      <div  className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular">To use SnapApp, enter your details</p>
      


        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-p w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormDescription>
                  
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormDescription>
                  
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormDescription>
                  
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormDescription>
                  
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
              {isCreatingUser ? (
                <div className="flex-center gap-2"><Loader />Loading...</div>
              ): "Sign Up"}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log In</Link>
          </p>
        </form>
      </div>
    </Form>
  )
  
}

export default SignupForm