export interface CaseDigest {
  _id: string;
  name: string;
  filepath: string;
  year: number;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  description: string;
  justice: string;
  pages: number;
  reading_time: string;
  session: Session;
}

export interface BarQandA {
  _id: string;
  name: string;
  filepath: string;
  year: number;
  subjectId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  pages: number;
  reading_time: string;
  session: Session;
}

export interface LastMinuteTips {
  _id: string;
  name: string;
  filepath: string;
  year: number;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  description: string;
  pages: number;
  reading_time: string;
  session: Session;
}

export interface BarExamForecast {
  _id: string;
  name: string;
  filepath: string;
  year: number;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  description: string;
  pages: number;
  reading_time: string;
  session: Session;
}

export interface MockBarExam {
  _id: string;
  name: string;
  year: number;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  description: string;
  mockbar_result_status: string;
  mockBarExamResultId: string;
}

export interface PersonalInformation {
  full_name: string;
  email: string;
  phone_no: string;
  location: string;
  bar_exam_date: string;
  bio: string;
  profile_pic?: string;
  initial_payment?: number;
}

export interface Plan {
  _id: string;
  name: string;
  inclusions: Inclusion[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  price: number;
  period: string;
  description: string;
  features: string[];
  enabled: boolean;
  popular?: boolean;
  current?: boolean;
  level: number;
}

export interface Inclusion {
  name: string;
  sub_items: SubItem[];
  enabled: boolean;
  _id: string;
  tag: string;
}

export interface SubItem {
  name: string;
  _id: string;
}

export interface Subscription {
  _id: string;
  userId: string;
  planId: string;
  year_subscribed: number;
  status: string;
  transaction_id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  plan: Plan;
}

export interface SidebarItem {
  label: string;
  path: string;
  name: string;
  icon: string;
  enabled: boolean;
}

export interface AddOns {
  _id: string;
  name: string;
  price: number;
  enabled: boolean;
  description: string;
  subjectId: string;
  group_type: string;
  group_name: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  subscribed: boolean;
}

export interface Reviewer {
  _id: string;
  name: string;
  filepath: string;
  year: number;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  description: string;
  reading_time: string;
  pages: number;
  session: Session;
}

export interface Session {
  _id: string;
  metadata: Session_Metadata;
}

export interface Session_Metadata {
  current_page: number;
  subjectId: string;
  materialId: string;
  _id: string;
}

export interface MockExamDetail {
  _id: string;
  name: string;
  year: number;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  description: string;
  items: Item[];
  time_limit: number;
  started_at: string;
  mockBarExamResultId: string;
  mockbar_result_status: string;
}

export interface Item {
  _id: string;
  question: string;
  answer: string;
}

export interface UserList {
  _id: string;
  email: string;
  full_name: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  account_activation_date: string;
  subscription: Subscription;
}

export interface Subscription {
  _id: string;
  userId: string;
  planId: string;
  status: string;
  transaction_id: string;
  exam_year: number;
  has_pending_adjustment: boolean;
  inclusions: Inclusion[];
  addons: string[];
  total: number;
  addons_package_type: string | null;
  adjustments: Adjustment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  plan_name: string;
}

export interface Inclusion {
  name: string;
  enabled: boolean;
  tag: string;
  path: string;
  label: string;
  icon: string;
  _id: string;
}

export interface Adjustment {
  type: string;
  amount: number;
  transaction_id: string;
  description: string;
  date: string;
  status: string;
  inclusions: any[];
  addons: string[];
  _id: string;
}

export interface MockBarResult {
  _id: string;
  userId: string;
  year: number;
  subjectId: string;
  items: Item[];
  mockBarExamId: string;
  total_score: number;
  status: string;
  started_at: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  last_submitted_at: string;
  completed_at: string;
}

export interface Item {
  question: string;
  answer: string;
  is_checked: boolean;
  score: number;
  _id: string;
}

export interface StudyTracker {
  _id: string;
  userId: string;
  subjectId: string;
  year: number;
  syllabus: Syllabus[];
  tag: string;
  title: string;
}

export interface Syllabus {
  section: string;
  topics: Topic[];
  description?: string;
  _id: string;
}

export interface Topic {
  sub_section: string;
  sub_topics?: SubTopic[];
  status?: string;
  _id: string;
}

export interface SubTopic {
  title: string;
  sub_topics?: SubTopic2[];
  status?: string;
  _id: string;
}

export interface SubTopic2 {
  title: string;
  sub_topics?: SubTopic3[];
  status?: string;
  _id: string;
}

export interface SubTopic3 {
  title: string;
  sub_topics?: SubTopic4[];
  status?: string;
  _id: string;
}

export interface SubTopic4 {
  title: string;
  status?: string;
  _id: string;
}

export interface StudyPlanner {
  _id: string;
  userId: string;
  plan: string;
  start_date: string;
  end_date: string;
  all_day: boolean;
  year: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Notifications {
  _id: string;
  userId: string;
  studyCalendarId: string;
  year: number;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  is_deleted: boolean;
  createdAt: string;
  __v: number;
  updatedAt: string;
}
