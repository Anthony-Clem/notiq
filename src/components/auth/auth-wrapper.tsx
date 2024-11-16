"use client";

import React, { ReactNode } from "react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";

interface AuthWrapperProps {
  children: ReactNode;
  cardTitle: string;
  cardDescription: string;
  redirectText?: string;
  href?: string;
  showSocial?: boolean;
}

const AuthWrapper = ({
  children,
  cardTitle,
  cardDescription,
  redirectText,
  href,
  showSocial,
}: AuthWrapperProps) => {
  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-1 text-neutral-950">{cardTitle}</CardTitle>
        <CardDescription className="text-5 text-neutral-600">
          {cardDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-start w-full">
        {children}
      </CardContent>
      {showSocial && href && (
        <CardFooter className="flex flex-col w-full gap-4">
          <Separator />
          <p className="text-5 text-neutral-600">Or log in with:</p>
          <Button variant="outline" className="w-full" size="lg">
            <FaGoogle />
            Google
          </Button>
          <Separator />
          <Link href={href} className="text-5 text-neutral-600 hover:underline">
            {redirectText}
          </Link>
        </CardFooter>
      )}
    </>
  );
};

export default AuthWrapper;
