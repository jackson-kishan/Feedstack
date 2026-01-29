import { Config } from 'ziggy-js';

export interface User {
    roles: any;
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };

};

export interface CategoryType {
    id: number;
    name: string;
    color: string|number;
    board_id: number;
}

export interface StatusType {
    id: number;
    name: string;
    color: string|number;
    users: User;
    board: BoardType;
    in_roadmap: boolean;
}

export interface TopicType {
    id: number;
   name: string;
   board_id: number;
}

export interface BoardType
{
  id:number;
  name: string;
  slug: string;
  privacy: string;
}

export type TaskStatus = "feture-request" | "in-progress" | "completed";

export interface TaskType
{
    id: string;
    content: string;
    Status: TaskStatus;
}

export interface Column
{
    id: TaskStatus;
    title: string;
    tasks: Task[];
}

export interface PostType
{
    id: number;
    title: string;
    slug: string;
    body: string;
    vote: number;
    post_status: string;
    post_approval: string;
    board_id: BoardType;
    has_voted: boolean;
    status: StatusType;
    created_by: User;
    topics: TopicType;
    created_at: string;
    updated_at: Date;
}

export interface CommentType
{
  id: number;
  body: string;
  vote: number;
  post_id: number;
  parent_id: number;
  created_at: Date;
  updated_at: Date;
  user?: User;
  children: CommentType[];
  status: null | StatusType;
}

export interface VoteTye
{
    id: number;
    user: User;
}

export interface PostTopicType
{
    id: number;
    post_id: PostType;
    topic_id: TopicType;
}


export interface RoleType
{
    id: number;
    name: string;
}

export interface PermissionType
{
    id: number;
    name: string;
}

export interface UserRoles
{
    id: number;
    user: User;
    board: BoardType;
    role: RoleType;
}

