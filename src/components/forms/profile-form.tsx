"use client"
import { EditUserProfileSchema } from "@/lib/types";
import React, { useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
type Props = {
  user: any
  onUpdate?: any
}
const ProfileForm = ({ user, onUpdate }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof EditUserProfileSchema>>({
      mode: 'onChange',
      resolver: zodResolver(EditUserProfileSchema),
      defaultValues: {
        name: user.name,
        email: user.email,
      },
    })
  return (
    <div>
      <Form {...form}>
        <form action="submit">
            <FormField 
              disabled={isLoading}
              name="name"
              control={form.control}
              render={({field}) => (
                <FormItem>
                <FormLabel className="text-lg">User full name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={true}
                    placeholder="Email"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
          type="submit"
          className="self-start hover:bg-[#2F006B] hover:text-white "
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving
            </>
          ) : (
            'Save User Settings'
          )}
        </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;