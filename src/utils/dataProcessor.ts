/**
 * このファイルにはデータ操作関連の関数を実装してください。
 * 要件はテストファイルを参照してください。
 */

// ここに実装を追加してください

export type User = {
  id: number;
  name: string;
  age: number;
  email: string;
  departments: string[];
  isActive: boolean;
  joinDate: Date;
  lastLogin?: Date;
  metadata: {
    permissions: string[];
    preferences: Record<string, unknown>;
  };
};

export type Department = {
  id: string;
  name: string;
  budget: number;
  location: string;
  head?: number; // User ID of department head
};

export type Project = {
  id: string;
  name: string;
  departmentId: string;
  members: number[]; // User IDs
  startDate: Date;
  endDate?: Date;
  budget: number;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  priority: 1 | 2 | 3; // 1: High, 2: Medium, 3: Low
};

export type Report = {
  projectName: string;
  departmentName: string;
  teamMembers: { id: number; name: string; role: string }[];
  duration: number; // 日数
  status: Project['status'];
  budgetAllocation: number;
  startDate: Date;
  endDate?: Date;
  completionPercentage?: number;
};

export type BudgetUtilization = {
  departmentId: string;
  departmentName: string;
  totalBudget: number;
  usedBudget: number;
  utilizationPercentage: number;
};

export type UserWorkload = {
  userId: number;
  userName: string;
  workload: number;
  activeProjects: {
    id: string;
    name: string;
    priority: Project['priority'];
  }[];
};

export type Timeline = {
  month: string; // YYYY-MM形式
  activeProjects: number;
  projects: string[]; // プロジェクトID
};

export type UserActivitySummary = {
  userId: number;
  userName: string;
  departments: {
    id: string;
    name: string;
  }[];
  activeProjects: {
    id: string;
    name: string;
    role: string;
  }[];
  isActive: boolean;
  workload: number;
  lastActive?: Date;
};

export type ResourceOptimization = {
  overallocatedUsers: UserWorkload[];
  underutilizedUsers: UserWorkload[];
  recommendations: string[];
};

export type UserSearchCriteria = {
  departments?: string[];
  minAge?: number;
  maxAge?: number;
  isActive?: boolean;
  permissions?: string[];
  departmentLocations?: string[];
  preferences?: Record<string, unknown>;
};

export const findUsersByDepartment = (users: User[], departmentName: string): User[] =>
  users.filter(u => u.departments.includes(departmentName));

export const getUsersByAgeRange = (users: User[], ageFrom: number, ageTo: number): User[] =>
  users.filter(u => u.age >= ageFrom && u.age <= ageTo);

export const assignUserToProject = (
  projects: Project[],
  memberId: number,
  projectId: string
): Project[] => {
  // プロジェクト配列内の対象プロジェクトを特定
  const projectIndex = projects.findIndex(p => p.id === projectId);

  // 対象プロジェクトが見つからない場合は元の配列を返す
  if (projectIndex === -1) return [...projects];

  // 対象プロジェクトを取得
  const targetProject = projects[projectIndex];

  // すでにメンバーに含まれている場合は元の配列を返す
  if (targetProject.members.includes(memberId)) return [...projects];

  // 新しいプロジェクト配列を作成
  return projects.map((project, index) => {
    // 対象プロジェクトの場合、メンバーを追加した新しいオブジェクトを返す
    if (index === projectIndex) {
      return {
        ...project,
        members: [...project.members, memberId],
      };
    }
    // それ以外のプロジェクトはそのまま返す
    return project;
  });
};
