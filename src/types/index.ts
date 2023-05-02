import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  authenticationRequired?: boolean;
  getLayout?: (page: ReactElement) => ReactNode;
};

export type LayoutProps = {
  readonly children: ReactNode;
};

export interface HomePageProps {
  blog: any;
  dehydratedState: any;
}

export interface BlogPageProps {
  dehydratedState: any;
}

export interface QueryOptions {
  page?: number;
  limit?: number;
}

export interface PaginatorInfo<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface Blog {
  createdAt: string;
  shortDescription: string;
  thumbnail: string;
  title: string;
  view: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profile: {
    id?: string;
    contact?: string;
    bio?: string;
    avatar?: string;
  };
}
export interface AuthResponse {
  token: string;
  permissions: string[];
}
export interface UpdateUserInput extends Partial<User> {
  id: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export type SocialLoginInputType = {
  provider: string;
  access_token: string;
};
export type SendOtpCodeInputType = {
  phone_number: string;
};

export interface RegisterUserInput {
  fullName: string;
  email: string;
  password: string;
}

export interface ForgotPasswordUserInput {
  email: string;
}

export interface ResetPasswordUserInput {
  email: string;
  token: string;
  password: string;
}

export interface VerifyForgotPasswordUserInput {
  token: string;
  email: string;
}

export interface ChangePasswordUserInput {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateUserInput extends Partial<User> {
  id: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}
export interface PasswordChangeResponse {
  success: boolean;
  message: string;
}

export interface CreateContactUsInput {
  name: string;
  email: string;
  subject: string;
  description: string;
}
export interface Settings {
  id: string;
  name: string;
  slug: string;
  options: {
    [key: string]: string;
  };
}

export interface EducationData {
  id: number;
  attributes: {
    degree: string;
    department: string;
    time: string;
    institute: string;
    description: any[];
  };
}

export interface Skills {
  id: number;
  attributes: {
    stack: string;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
    data: string[];
  };
}

export interface EducationsData extends Array<EducationData> {}
export interface SkillData extends Array<Skills> {}

export interface NewBlogData {
  title: string;
  thumbnail: string;
  category: string;
  shortDescription: string;
  content: string;
}
export interface BlogType {
  id: number;
  attributes: Blog;
}

export interface CategoryInput {
  name: string;
}
