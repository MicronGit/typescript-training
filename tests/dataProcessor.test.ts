import { beforeEach, describe, expect, test } from 'vitest';

import {
  Department,
  Project,
  User,
  assignUserToProject,
  calculateDepartmentBudgetUtilization,
  findUsersByDepartment,
  generateProjectReport,
  getUsersByAgeRange,
} from '../src/utils/dataProcessor';

describe('高度なデータ処理の問題', () => {
  // テストデータ
  let users: User[];
  let departments: Department[];
  let projects: Project[];

  beforeEach(() => {
    // テストの前にデータを初期化
    users = [
      {
        id: 1,
        name: '山田太郎',
        age: 32,
        email: 'yamada@example.com',
        departments: ['dev', 'research'],
        isActive: true,
        joinDate: new Date('2020-01-15'),
        lastLogin: new Date('2023-05-01T08:30:00'),
        metadata: {
          permissions: ['read', 'write', 'admin'],
          preferences: { theme: 'dark', notifications: true },
        },
      },
      {
        id: 2,
        name: '佐藤花子',
        age: 28,
        email: 'sato@example.com',
        departments: ['marketing'],
        isActive: true,
        joinDate: new Date('2021-03-20'),
        lastLogin: new Date('2023-05-02T10:15:00'),
        metadata: {
          permissions: ['read', 'write'],
          preferences: { theme: 'light', notifications: false },
        },
      },
      {
        id: 3,
        name: '鈴木一郎',
        age: 45,
        email: 'suzuki@example.com',
        departments: ['finance', 'management'],
        isActive: false,
        joinDate: new Date('2015-11-05'),
        lastLogin: new Date('2022-12-15T14:20:00'),
        metadata: {
          permissions: ['read'],
          preferences: { theme: 'system', language: 'ja' },
        },
      },
      {
        id: 4,
        name: '田中誠',
        age: 22,
        email: 'tanaka@example.com',
        departments: ['dev'],
        isActive: true,
        joinDate: new Date('2022-09-01'),
        metadata: {
          permissions: ['read', 'write'],
          preferences: { theme: 'dark', fontSize: 'large' },
        },
      },
      {
        id: 5,
        name: '伊藤順子',
        age: 38,
        email: 'ito@example.com',
        departments: ['hr', 'management'],
        isActive: true,
        joinDate: new Date('2019-06-10'),
        lastLogin: new Date('2023-05-03T09:45:00'),
        metadata: {
          permissions: ['read', 'write', 'hr'],
          preferences: { language: 'en', notifications: true },
        },
      },
    ];

    departments = [
      {
        id: 'dev',
        name: '開発部',
        budget: 5000000,
        location: '東京',
        head: 1,
      },
      {
        id: 'marketing',
        name: 'マーケティング部',
        budget: 3000000,
        location: '大阪',
      },
      {
        id: 'finance',
        name: '財務部',
        budget: 2000000,
        location: '名古屋',
        head: 3,
      },
      {
        id: 'research',
        name: '研究開発部',
        budget: 4000000,
        location: '東京',
      },
      {
        id: 'hr',
        name: '人事部',
        budget: 1500000,
        location: '東京',
        head: 5,
      },
      {
        id: 'management',
        name: '経営部',
        budget: 1000000,
        location: '東京',
      },
    ];

    projects = [
      {
        id: 'p1',
        name: 'ウェブサイトリニューアル',
        departmentId: 'dev',
        members: [1, 4],
        startDate: new Date('2023-01-10'),
        endDate: new Date('2023-06-30'),
        budget: 2000000,
        status: 'active',
        priority: 1,
      },
      {
        id: 'p2',
        name: 'マーケティングキャンペーン2023',
        departmentId: 'marketing',
        members: [2],
        startDate: new Date('2023-02-15'),
        endDate: new Date('2023-08-15'),
        budget: 1500000,
        status: 'active',
        priority: 2,
      },
      {
        id: 'p3',
        name: '財務システム刷新',
        departmentId: 'finance',
        members: [3],
        startDate: new Date('2022-11-01'),
        endDate: new Date('2023-03-31'),
        budget: 1800000,
        status: 'completed',
        priority: 2,
      },
      {
        id: 'p4',
        name: '新技術研究',
        departmentId: 'research',
        members: [1],
        startDate: new Date('2023-04-01'),
        budget: 3000000,
        status: 'active',
        priority: 1,
      },
      {
        id: 'p5',
        name: '採用計画2023',
        departmentId: 'hr',
        members: [5],
        startDate: new Date('2023-01-01'),
        endDate: new Date('2023-12-31'),
        budget: 1000000,
        status: 'active',
        priority: 3,
      },
      {
        id: 'p6',
        name: '事業拡大計画',
        departmentId: 'management',
        members: [3, 5],
        startDate: new Date('2023-03-01'),
        budget: 800000,
        status: 'planning',
        priority: 1,
      },
    ];
  });

  test('問題1: findUsersByDepartment - 指定された部署に所属するすべてのユーザーを返す', () => {
    const devUsers = findUsersByDepartment(users, 'dev');
    expect(devUsers.length).toBe(2);
    expect(devUsers.map(u => u.id).sort()).toEqual([1, 4]);

    const managementUsers = findUsersByDepartment(users, 'management');
    expect(managementUsers.length).toBe(2);
    expect(managementUsers.map(u => u.id).sort()).toEqual([3, 5]);

    const nonExistentDeptUsers = findUsersByDepartment(users, 'nonexistent');
    expect(nonExistentDeptUsers.length).toBe(0);
  });

  test('問題2: getUsersByAgeRange - 指定された年齢範囲のユーザーを返す', () => {
    const youngUsers = getUsersByAgeRange(users, 20, 30);
    expect(youngUsers.length).toBe(2);
    expect(youngUsers.map(u => u.id).sort()).toEqual([2, 4]);

    const middleAgedUsers = getUsersByAgeRange(users, 30, 40);
    expect(middleAgedUsers.length).toBe(2);
    expect(middleAgedUsers.map(u => u.id).sort()).toEqual([1, 5]);

    const seniorUsers = getUsersByAgeRange(users, 40, 50);
    expect(seniorUsers.length).toBe(1);
    expect(seniorUsers[0].id).toBe(3);

    // 境界値テスト
    const exactAgeUsers = getUsersByAgeRange(users, 32, 32);
    expect(exactAgeUsers.length).toBe(1);
    expect(exactAgeUsers[0].id).toBe(1);
  });

  test('問題3: assignUserToProject - ユーザーをプロジェクトに割り当てる', () => {
    // 新しいメンバーをプロジェクトに追加
    const updatedProjects = assignUserToProject(projects, 2, 'p1');
    const updatedProject = updatedProjects.find(p => p.id === 'p1');
    expect(updatedProject?.members).toContain(2);
    expect(updatedProject?.members.length).toBe(3);

    // すでにメンバーになっているユーザーを追加しようとした場合
    const noChangeProjects = assignUserToProject(projects, 1, 'p1');
    const noChangeProject = noChangeProjects.find(p => p.id === 'p1');
    expect(noChangeProject?.members.length).toBe(2);

    // 存在しないプロジェクトの場合はエラーをスローするか元の配列を返す
    expect(() => assignUserToProject(projects, 1, 'nonexistent')).not.toThrow();
  });

  test('問題4: calculateDepartmentBudgetUtilization - 部署ごとのプロジェクト予算使用率を計算', () => {
    const budgetUtilization = calculateDepartmentBudgetUtilization(departments, projects);

    // 開発部: プロジェクト予算 5,000,000円のうち、2つのプロジェクト（p1: 2,000,000 ）で2,000,000円使用 = 40%
    expect(budgetUtilization.find(b => b.departmentId === 'dev')?.utilizationPercentage).toBe(40);

    // マーケティング部: 予算 3,000,000円のうち、1つのプロジェクト（p2: 1,500,000）で1,500,000円使用 = 50%
    expect(budgetUtilization.find(b => b.departmentId === 'marketing')?.utilizationPercentage).toBe(
      50
    );

    // 全ての部署が結果に含まれていることを確認
    expect(budgetUtilization.length).toBe(departments.length);
  });

  //   // 問題5: プロジェクトレポートを生成する関数
  test('問題5: generateProjectReport - プロジェクトの詳細レポートを生成', () => {
    const report = generateProjectReport(projects[0], departments, users);

    // レポートに正しい情報が含まれているか確認
    expect(report.projectName).toBe('ウェブサイトリニューアル');
    expect(report.departmentName).toBe('開発部');
    expect(report.teamMembers.length).toBe(2);
    expect(report.teamMembers.map(m => m.name)).toContain('山田太郎');
    expect(report.teamMembers.map(m => m.name)).toContain('田中誠');
    expect(report.duration).toBe(171); // プロジェクト期間の日数（端数は四捨五入）
    expect(report.status).toBe('active');
    expect(report.budgetAllocation).toBe(2000000);
  });

  //   // 問題6: 期間が重複するプロジェクトを検索する関数

  //   it('問題6: findOverlappingProjects - 指定したプロジェクトと期間が重複する他のプロジェクトを検索', () => {
  //     // p1 (2023-01-10 to 2023-06-30) と重複するプロジェクト
  //     const overlappingWithP1 = findOverlappingProjects(projects, 'p1');

  //     expect(overlappingWithP1.length).toBe(4); // p2, p4, p5, p6 と重複

  //     // p3 (2022-11-01 to 2023-03-31) と重複するプロジェクト
  //     const overlappingWithP3 = findOverlappingProjects(projects, 'p3');

  //     expect(overlappingWithP3.length).toBe(3); // p1, p2, p5 と重複

  //     // 存在しないプロジェクトの場合
  //     expect(() => findOverlappingProjects(projects, 'nonexistent')).toThrow();
  //   });

  //   // 問題7: プロジェクトのタイムラインを取得する関数

  //   it('問題7: getProjectTimeline - すべてのプロジェクトを時系列順に並べ替え、各月の進行中プロジェクト数を取得', () => {
  //     const timeline = getProjectTimeline(projects, new Date('2023-01-01'), new Date('2023-12-31'));

  //     // 2023年1月には4つのプロジェクトが進行中 (p1, p3, p5, 2023年1月内にp2開始)

  //     expect(timeline.find(t => t.month === '2023-01')?.activeProjects).toBe(4);

  //     // 2023年4月には4つのプロジェクトが進行中 (p1, p2, p4, p5, p6、p3は3月に終了)

  //     expect(timeline.find(t => t.month === '2023-04')?.activeProjects).toBe(5);

  //     // すべての月（1月から12月）がタイムラインに含まれていることを確認

  //     expect(timeline.length).toBe(12);
  //   });

  //   // 問題8: ユーザーのアクティビティサマリーを取得する関数

  //   it('問題8: getUserActivitySummary - ユーザーの詳細なアクティビティ情報を取得', () => {
  //     const summary = getUserActivitySummary(users[0], projects, departments);

  //     // 山田太郎（id: 1）の情報を確認
  //     expect(summary.userName).toBe('山田太郎');

  //     expect(summary.activeProjects.length).toBe(2); // p1とp4に参加
  //     expect(summary.departments.length).toBe(2); // dev, researchに所属
  //     expect(summary.isActive).toBe(true);
  //     expect(summary.workload).toBeGreaterThan(0); // 具体的な計算方法は実装による

  //     // workloadの計算が妥当かを確認（プロジェクトの数と優先度に基づく）
  //     const user3Summary = getUserActivitySummary(users[2], projects, departments);

  //     expect(user3Summary.workload).toBeLessThan(summary.workload); // 山田太郎のほうがワークロードが高い
  //   });

  //   // 問題9: リソース配分の最適化を提案する関数
  //   it('問題9: optimizeResourceAllocation - リソース配分の最適化提案を生成', () => {
  //     const optimization = optimizeResourceAllocation(users, projects, departments);

  //     // 最適化提案の構造を確認
  //     expect(optimization.overallocatedUsers.length).toBeGreaterThanOrEqual(0);

  //     expect(optimization.underutilizedUsers.length).toBeGreaterThanOrEqual(0);
  //     expect(optimization.recommendations.length).toBeGreaterThan(0);

  //     // 少なくとも山田太郎は過負荷の可能性あり（2つの高優先度プロジェクト）
  //     const yamadasRec = optimization.recommendations.find(r => r.includes('山田太郎'));

  //     expect(yamadasRec).toBeDefined();
  //   });

  //   // 問題10: 複合条件でユーザーを検索する関数

  //   it('問題10: searchUsers - 複数の条件でユーザーを高度に検索', () => {
  //     // 開発部に所属し、30歳以上で、管理者権限を持つユーザーを検索
  //     const devAdmins = searchUsers(users, {
  //       departments: ['dev'],

  //       minAge: 30,

  //       permissions: ['admin'],
  //     });

  //     expect(devAdmins.length).toBe(1);
  //     expect(devAdmins[0].id).toBe(1); // 山田太郎のみ

  //     // 東京にあるいずれかの部署に所属し、「dark」テーマを好むアクティブなユーザー

  //     const tokyoDarkThemeUsers = searchUsers(
  //       users,
  //       {
  //         departmentLocations: ['東京'],

  //         isActive: true,
  //         preferences: { theme: 'dark' },
  //       },
  //       departments
  //     );

  //     expect(tokyoDarkThemeUsers.length).toBe(2);

  //     expect(tokyoDarkThemeUsers.map(u => u.id).sort()).toEqual([1, 4]);

  //     // 検索条件が指定されていない場合は全ユーザーを返す
  //     const allUsers = searchUsers(users, {});

  //
  //   });
});
