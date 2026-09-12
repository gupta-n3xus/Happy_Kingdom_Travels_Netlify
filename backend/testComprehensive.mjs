const BASE = 'http://localhost:5000/api';
let passed = 0;
let failed = 0;
let total = 0;
let adminToken = '';
let subAdminToken = '';
let subAdminId = '';
let createdSubAdminId = '';
let testPackageId = '';
let testBlogId = '';

function test(num, description) {
  return { num, description };
}

function pass(t) {
  total++;
  passed++;
  console.log(`  PASS #${t.num}: ${t.description}`);
}

function fail(t, msg) {
  total++;
  failed++;
  console.log(`  FAIL #${t.num}: ${t.description} — ${msg}`);
}

async function api(method, path, { body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE}${path}`, opts);
  let data;
  const text = await res.text();
  try { data = JSON.parse(text); } catch { data = text; }
  return { status: res.status, data };
}

async function run() {
  console.log('\n========================================================');
  console.log('  COMPREHENSIVE TEST SUITE — SubAdmin + Activity Logging');
  console.log('========================================================\n');

  // ════════════════════════════════════════════
  // SECTION 1: AUTHENTICATION
  // ════════════════════════════════════════════
  console.log('─── 1. AUTHENTICATION ───');

  {
    const t = test(1, 'Admin login with valid credentials');
    const { status, data } = await api('POST', '/auth/login', {
      body: { email: 'anonymousadmin@hkt.com', password: 'ThevalueofPIis3.14159@approx' }
    });
    if (status === 200 && data.success && data.token) {
      adminToken = data.token;
      pass(t);
    } else {
      fail(t, `status=${status}, success=${data?.success}`);
    }
  }

  {
    const t = test(2, 'Admin login with wrong password → 401');
    const { status, data } = await api('POST', '/auth/login', {
      body: { email: 'anonymousadmin@hkt.com', password: 'wrongpassword' }
    });
    if (status === 401 && data.success === false) pass(t);
    else fail(t, `status=${status}, expected 401`);
  }

  {
    const t = test(3, 'Admin login with non-existent email → 401');
    const { status } = await api('POST', '/auth/login', {
      body: { email: 'nonexistent@hkt.com', password: 'anything' }
    });
    if (status === 401) pass(t);
    else fail(t, `status=${status}, expected 401`);
  }

  {
    const t = test(4, 'Access /auth/me without token → 401');
    const { status } = await api('GET', '/auth/me');
    if (status === 401) pass(t);
    else fail(t, `status=${status}, expected 401`);
  }

  {
    const t = test(5, 'Access /auth/me with valid admin token → 200');
    const { status, data } = await api('GET', '/auth/me', { token: adminToken });
    if (status === 200 && data.success && data.data.role === 'admin') pass(t);
    else fail(t, `status=${status}, role=${data?.data?.role}`);
  }

  {
    const t = test(6, 'Access /auth/me with invalid/fake token → 401');
    const { status } = await api('GET', '/auth/me', { token: 'fake.jwt.token' });
    if (status === 401) pass(t);
    else fail(t, `status=${status}, expected 401`);
  }

  // ════════════════════════════════════════════
  // SECTION 2: SUB-ADMIN CRUD (admin operations)
  // ════════════════════════════════════════════
  console.log('\n─── 2. SUB-ADMIN CRUD ───');

  {
    const t = test(7, 'List sub-admins with admin token → count >= 1');
    const { status, data } = await api('GET', '/auth/subadmins', { token: adminToken });
    if (status === 200 && data.success && data.count >= 1 && Array.isArray(data.data)) {
      subAdminId = data.data[0]._id;
      pass(t);
    } else {
      fail(t, `status=${status}, count=${data?.count}`);
    }
  }

  {
    const t = test(8, `Get sub-admin by ID (${subAdminId})`);
    const { status, data } = await api('GET', `/auth/subadmins/${subAdminId}`, { token: adminToken });
    if (status === 200 && data.success && data.data._id === subAdminId) pass(t);
    else fail(t, `status=${status}`);
  }

  {
    const t = test(9, 'Get sub-admin with invalid ID → 404');
    const { status } = await api('GET', '/auth/subadmins/000000000000000000000000', { token: adminToken });
    if (status === 404) pass(t);
    else fail(t, `status=${status}, expected 404`);
  }

  {
    const t = test(10, 'Create new sub-admin "Test User"');
    const { status, data } = await api('POST', '/auth/subadmins', {
      token: adminToken,
      body: {
        name: 'Test User',
        email: 'testuser@hkt.com',
        password: 'TestPass123',
        permissions: ['packages:view', 'reviews:view', 'blog:view']
      }
    });
    if (status === 201 && data.success && data.data.name === 'Test User') {
      createdSubAdminId = data.data.id;
      pass(t);
    } else {
      fail(t, `status=${status}, data=${JSON.stringify(data).slice(0, 120)}`);
    }
  }

  {
    const t = test(11, 'Create sub-admin with duplicate email → 400');
    const { status } = await api('POST', '/auth/subadmins', {
      token: adminToken,
      body: { name: 'Dup', email: 'testuser@hkt.com', password: 'TestPass123', permissions: [] }
    });
    if (status === 400) pass(t);
    else fail(t, `status=${status}, expected 400`);
  }

  {
    const t = test(12, 'Update sub-admin name and permissions');
    const { status, data } = await api('PUT', `/auth/subadmins/${subAdminId}`, {
      token: adminToken,
      body: { name: 'Pankaj Kumar Updated', permissions: ['packages:view', 'reviews:view'] }
    });
    if (status === 200 && data.success && data.data.name === 'Pankaj Kumar Updated') pass(t);
    else fail(t, `status=${status}, name=${data?.data?.name}`);
  }

  {
    const t = test(13, 'Verify updated sub-admin name and permissions');
    const { status, data } = await api('GET', `/auth/subadmins/${subAdminId}`, { token: adminToken });
    const perms = data?.data?.permissions || [];
    if (status === 200 && data.data.name === 'Pankaj Kumar Updated' && perms.length === 2) pass(t);
    else fail(t, `status=${status}, name=${data?.data?.name}, perms=${perms.length}`);
  }

  {
    const t = test(14, 'Delete sub-admin');
    const { status, data } = await api('DELETE', `/auth/subadmins/${createdSubAdminId}`, { token: adminToken });
    if (status === 200 && data.success) pass(t);
    else fail(t, `status=${status}`);
  }

  {
    const t = test(15, 'Delete sub-admin with invalid ID → 404');
    const { status } = await api('DELETE', '/auth/subadmins/000000000000000000000000', { token: adminToken });
    if (status === 404) pass(t);
    else fail(t, `status=${status}, expected 404`);
  }

  // ════════════════════════════════════════════
  // SECTION 3: SUB-ADMIN LOGIN + PERMISSION-BASED ACCESS
  // (must run BEFORE password changes that invalidate tokens)
  // ════════════════════════════════════════════
  console.log('\n─── 3. SUB-ADMIN LOGIN + PERMISSIONS ───');

  {
    const t = test(16, 'Sub-admin login with original password → success');
    const { status, data } = await api('POST', '/auth/login', {
      body: { email: 'pankajkumar@hkt.com', password: 'ThevalueofPIis3.14159@@@' }
    });
    if (status === 200 && data.success && data.token) {
      subAdminToken = data.token;
      pass(t);
    } else {
      fail(t, `status=${status}`);
    }
  }

  {
    const t = test(17, 'Sub-admin accesses /auth/me → returns sub_admin role');
    const { status, data } = await api('GET', '/auth/me', { token: subAdminToken });
    if (status === 200 && data.data.role === 'sub_admin') pass(t);
    else fail(t, `status=${status}, role=${data?.data?.role}`);
  }

  {
    const t = test(18, 'Sub-admin accesses /auth/subadmins → 403 (admin-only)');
    const { status } = await api('GET', '/auth/subadmins', { token: subAdminToken });
    if (status === 403) pass(t);
    else fail(t, `status=${status}, expected 403`);
  }

  {
    const t = test(19, 'Sub-admin creates sub-admin → 403 (admin-only)');
    const { status } = await api('POST', '/auth/subadmins', {
      token: subAdminToken,
      body: { name: 'Hacker', email: 'h@h.com', password: '123456', permissions: [] }
    });
    if (status === 403) pass(t);
    else fail(t, `status=${status}, expected 403`);
  }

  {
    const t = test(20, 'Sub-admin deletes sub-admin → 403 (admin-only)');
    const { status } = await api('DELETE', `/auth/subadmins/${subAdminId}`, { token: subAdminToken });
    if (status === 403) pass(t);
    else fail(t, `status=${status}, expected 403`);
  }

  // Permission-based: sub-admin has packages:view, reviews:view
  {
    const t = test(21, 'Sub-admin with packages:view → GET /packages/admin/:id → allowed');
    const { status } = await api('GET', '/packages/admin/000000000000000000000000', { token: subAdminToken });
    if (status !== 403) pass(t);
    else fail(t, `status=${status}, should NOT be 403`);
  }

  {
    const t = test(22, 'Sub-admin WITHOUT destinations:create → POST /destinations → 403');
    const { status } = await api('POST', '/destinations', { token: subAdminToken, body: { name: 'test' } });
    if (status === 403) pass(t);
    else fail(t, `status=${status}, expected 403`);
  }

  {
    const t = test(23, 'Sub-admin WITHOUT packages:create → POST /packages → 403');
    const { status } = await api('POST', '/packages', {
      token: subAdminToken,
      body: { title: 'test', shortDescription: 'test', description: 'test', duration: { nights: 1, days: 2 }, startingPrice: 100, category: 'adventure' }
    });
    if (status === 403) pass(t);
    else fail(t, `status=${status}, expected 403`);
  }

  {
    const t = test(24, 'Sub-admin WITH reviews:view → GET /reviews/all → allowed');
    const { status } = await api('GET', '/reviews/all', { token: subAdminToken });
    if (status !== 403) pass(t);
    else fail(t, `status=${status}, should NOT be 403`);
  }

  {
    const t = test(25, 'Sub-admin WITHOUT reviews:approve → PUT /reviews/:id/approve → 403');
    const { status } = await api('PUT', '/reviews/000000000000000000000000/approve', { token: subAdminToken });
    if (status === 403) pass(t);
    else fail(t, `status=${status}, expected 403`);
  }

  {
    const t = test(26, 'Sub-admin WITHOUT reviews:delete → DELETE /reviews/:id → 403');
    const { status } = await api('DELETE', '/reviews/000000000000000000000000', { token: subAdminToken });
    if (status === 403) pass(t);
    else fail(t, `status=${status}, expected 403`);
  }

  {
    const t = test(27, 'Sub-admin WITHOUT enquiries:view → GET /enquiries → 403');
    const { status } = await api('GET', '/enquiries', { token: subAdminToken });
    if (status === 403) pass(t);
    else fail(t, `status=${status}, expected 403`);
  }

  {
    const t = test(28, 'Sub-admin WITHOUT blog:create → POST /blog → 403');
    const { status } = await api('POST', '/blog', {
      token: subAdminToken,
      body: { title: 'test', content: 'test', category: 'Travel Tips' }
    });
    if (status === 403) pass(t);
    else fail(t, `status=${status}, expected 403`);
  }

  {
    const t = test(29, 'Sub-admin WITHOUT gallery:approve → PUT /gallery/:id/approve → 403');
    const { status } = await api('PUT', '/gallery/000000000000000000000000/approve', { token: subAdminToken });
    if (status === 403) pass(t);
    else fail(t, `status=${status}, expected 403`);
  }

  {
    const t = test(30, 'Sub-admin WITHOUT blog:view → GET /blog (public) → allowed (public route)');
    const { status } = await api('GET', '/blog');
    if (status === 200) pass(t);
    else fail(t, `status=${status}, expected 200`);
  }

  // ════════════════════════════════════════════
  // SECTION 4: ADMIN CRUD OPERATIONS
  // ════════════════════════════════════════════
  console.log('\n─── 4. ADMIN CRUD OPERATIONS ───');

  {
    const t = test(31, 'Admin creates package');
    const { status, data } = await api('POST', '/packages', {
      token: adminToken,
      body: {
        title: 'Test Activity Package',
        shortDescription: 'Testing activity logging',
        description: 'Full description for test package',
        duration: { nights: 3, days: 4 },
        startingPrice: 500,
        category: 'adventure',
        status: 'draft'
      }
    });
    if (status === 201 && data.success) {
      testPackageId = data.data._id;
      pass(t);
    } else {
      fail(t, `status=${status}, data=${JSON.stringify(data).slice(0, 200)}`);
    }
  }

  {
    const t = test(32, 'Admin updates package');
    const { status } = await api('PUT', `/packages/${testPackageId}`, {
      token: adminToken,
      body: { title: 'Test Activity Package Updated', startingPrice: 600 }
    });
    if (status === 200) pass(t);
    else fail(t, `status=${status}`);
  }

  {
    const t = test(33, 'Admin deletes package');
    const { status } = await api('DELETE', `/packages/${testPackageId}`, { token: adminToken });
    if (status === 200) pass(t);
    else fail(t, `status=${status}`);
  }

  {
    const t = test(34, 'Admin creates blog post');
    const { status, data } = await api('POST', '/blog', {
      token: adminToken,
      body: { title: 'Test Blog Post', content: 'Test content', category: 'Travel Tips', published: true }
    });
    if (status === 201 && data.success) {
      testBlogId = data.data._id;
      pass(t);
    } else {
      fail(t, `status=${status}`);
    }
  }

  {
    const t = test(35, 'Admin updates blog post');
    const { status } = await api('PUT', `/blog/${testBlogId}`, {
      token: adminToken,
      body: { title: 'Test Blog Post Updated' }
    });
    if (status === 200) pass(t);
    else fail(t, `status=${status}`);
  }

  {
    const t = test(36, 'Admin deletes blog post');
    const { status } = await api('DELETE', `/blog/${testBlogId}`, { token: adminToken });
    if (status === 200) pass(t);
    else fail(t, `status=${status}`);
  }

  {
    const t = test(37, 'Admin views all enquiries');
    const { status } = await api('GET', '/enquiries', { token: adminToken });
    if (status === 200) pass(t);
    else fail(t, `status=${status}`);
  }

  {
    const t = test(38, 'Admin views all reviews');
    const { status } = await api('GET', '/reviews/all', { token: adminToken });
    if (status === 200) pass(t);
    else fail(t, `status=${status}`);
  }

  {
    const t = test(39, 'Admin views all gallery items');
    const { status } = await api('GET', '/gallery/all', { token: adminToken });
    if (status === 200) pass(t);
    else fail(t, `status=${status}`);
  }

  // ════════════════════════════════════════════
  // SECTION 5: ADMIN PROFILE
  // ════════════════════════════════════════════
  console.log('\n─── 5. ADMIN PROFILE ───');

  {
    const t = test(40, 'Admin profile update with correct current password');
    const { status, data } = await api('PUT', '/auth/profile', {
      token: adminToken,
      body: { currentPassword: 'ThevalueofPIis3.14159@approx', name: 'Anonymous Admin Updated' }
    });
    if (status === 200 && data.success) pass(t);
    else fail(t, `status=${status}`);
  }

  {
    const t = test(41, 'Admin profile update with WRONG current password → 401');
    const { status } = await api('PUT', '/auth/profile', {
      token: adminToken,
      body: { currentPassword: 'WrongPassword123', name: 'Should Not Update' }
    });
    if (status === 401) pass(t);
    else fail(t, `status=${status}, expected 401`);
  }

  {
    const t = test(42, 'Admin profile update with short new password → 400');
    const { status } = await api('PUT', '/auth/profile', {
      token: adminToken,
      body: { currentPassword: 'ThevalueofPIis3.14159@approx', newPassword: '12345' }
    });
    if (status === 400) pass(t);
    else fail(t, `status=${status}, expected 400`);
  }

  // ════════════════════════════════════════════
  // SECTION 6: TOKEN INVALIDATION (password changes)
  // ════════════════════════════════════════════
  console.log('\n─── 6. TOKEN INVALIDATION ───');

  {
    const t = test(43, 'Admin changes sub-admin password → token version incremented');
    const { status } = await api('PUT', `/auth/subadmins/${subAdminId}`, {
      token: adminToken,
      body: { password: 'BrandNewPass456' }
    });
    if (status === 200) pass(t);
    else fail(t, `status=${status}`);
  }

  {
    const t = test(44, 'Old sub-admin token rejected after password change');
    const { status } = await api('GET', '/auth/me', { token: subAdminToken });
    if (status === 401) pass(t);
    else fail(t, `status=${status}, expected 401`);
  }

  {
    const t = test(45, 'Sub-admin login with OLD password → 401');
    const { status } = await api('POST', '/auth/login', {
      body: { email: 'pankajkumar@hkt.com', password: 'ThevalueofPIis3.14159@@@' }
    });
    if (status === 401) pass(t);
    else fail(t, `status=${status}, expected 401`);
  }

  {
    const t = test(46, 'New sub-admin login with changed password');
    const { status, data } = await api('POST', '/auth/login', {
      body: { email: 'pankajkumar@hkt.com', password: 'BrandNewPass456' }
    });
    if (status === 200 && data.success && data.token) {
      subAdminToken = data.token;
      pass(t);
    } else {
      fail(t, `status=${status}`);
    }
  }

  {
    const t = test(47, 'New token works for /auth/me');
    const { status, data } = await api('GET', '/auth/me', { token: subAdminToken });
    if (status === 200 && data.success) pass(t);
    else fail(t, `status=${status}`);
  }

  // ════════════════════════════════════════════
  // SECTION 7: ACTIVITY LOGGING
  // ════════════════════════════════════════════
  console.log('\n─── 7. ACTIVITY LOGGING ───');

  {
    const t = test(48, 'Admin accesses activity log → 200 with data');
    const { status, data } = await api('GET', '/activity?limit=10', { token: adminToken });
    if (status === 200 && data.success && Array.isArray(data.data)) pass(t);
    else fail(t, `status=${status}, data=${JSON.stringify(data).slice(0, 120)}`);
  }

  {
    const t = test(49, 'Sub-admin accesses activity log → 403 (admin-only)');
    const { status } = await api('GET', '/activity', { token: subAdminToken });
    if (status === 403) pass(t);
    else fail(t, `status=${status}, expected 403`);
  }

  {
    const t = test(50, 'Admin accesses sub-admin specific activity log');
    const { status, data } = await api('GET', `/activity/subadmin/${subAdminId}`, { token: adminToken });
    if (status === 200 && data.success && Array.isArray(data.data)) pass(t);
    else fail(t, `status=${status}`);
  }

  {
    const t = test(51, 'Activity logs contain login entries with device/browser/os info');
    const { status, data } = await api('GET', '/activity?limit=20', { token: adminToken });
    if (status === 200 && data.data.length > 0) {
      const loginLog = data.data.find(l => l.action === 'login');
      if (loginLog && loginLog.ip && loginLog.device && loginLog.os) {
        pass(t);
      } else if (loginLog) {
        fail(t, `login log fields: ip=${loginLog.ip}, device=${loginLog.device}, os=${loginLog.os}`);
      } else {
        fail(t, `no login entries found in ${data.data.length} logs`);
      }
    } else {
      fail(t, `no logs found, status=${status}`);
    }
  }

  {
    const t = test(52, 'Activity logs contain profile_update or password_change entries');
    const { status, data } = await api('GET', '/activity?limit=50', { token: adminToken });
    if (status === 200) {
      const hasUpdate = data.data.some(l => l.action === 'profile_update' || l.action === 'password_change');
      if (hasUpdate) pass(t);
      else fail(t, `no profile_update/password_change entries found`);
    } else {
      fail(t, `status=${status}`);
    }
  }

  {
    const t = test(53, 'Activity log entries have populated user field');
    const { status, data } = await api('GET', '/activity?limit=1', { token: adminToken });
    if (status === 200 && data.data.length > 0) {
      const log = data.data[0];
      if (log.user && log.user.name && log.user.email && log.user.role) pass(t);
      else fail(t, `user not populated: ${JSON.stringify(log.user)}`);
    } else {
      fail(t, `no logs`);
    }
  }

  {
    const t = test(54, 'Activity log pagination works');
    const { status, data } = await api('GET', '/activity?page=1&limit=2', { token: adminToken });
    if (status === 200 && data.data.length <= 2 && data.totalPages >= 1) pass(t);
    else fail(t, `status=${status}, count=${data.data.length}, totalPages=${data.totalPages}`);
  }

  {
    const t = test(55, 'Activity logs show CRUD actions from this test session');
    const { status, data } = await api('GET', '/activity?limit=50', { token: adminToken });
    if (status === 200) {
      const hasCreate = data.data.some(l => l.action === 'create');
      const hasDelete = data.data.some(l => l.action === 'delete');
      if (hasCreate && hasDelete) pass(t);
      else fail(t, `create=${hasCreate}, delete=${hasDelete}`);
    } else {
      fail(t, `status=${status}`);
    }
  }

  // ════════════════════════════════════════════
  // SECTION 8: PUBLIC ROUTES (no auth)
  // ════════════════════════════════════════════
  console.log('\n─── 8. PUBLIC ROUTES ───');

  {
    const t = test(56, 'GET /packages (public) works without token');
    const { status } = await api('GET', '/packages');
    if (status === 200) pass(t);
    else fail(t, `status=${status}`);
  }

  {
    const t = test(57, 'GET /reviews (public approved) works without token');
    const { status } = await api('GET', '/reviews');
    if (status === 200) pass(t);
    else fail(t, `status=${status}`);
  }

  {
    const t = test(58, 'GET /blog (public) works without token');
    const { status } = await api('GET', '/blog');
    if (status === 200) pass(t);
    else fail(t, `status=${status}`);
  }

  {
    const t = test(59, 'GET /gallery (public approved) works without token');
    const { status } = await api('GET', '/gallery');
    if (status === 200) pass(t);
    else fail(t, `status=${status}`);
  }

  {
    const t = test(60, 'POST /reviews (public create) works without token');
    const { status } = await api('POST', '/reviews', {
      body: { customerName: 'Test User', rating: 5, review: 'Great experience!' }
    });
    if (status === 201) pass(t);
    else fail(t, `status=${status}`);
  }

  {
    const t = test(61, 'GET /activity (protected) without token → 401');
    const { status } = await api('GET', '/activity');
    if (status === 401) pass(t);
    else fail(t, `status=${status}, expected 401`);
  }

  // ════════════════════════════════════════════
  // SECTION 9: EDGE CASES
  // ════════════════════════════════════════════
  console.log('\n─── 9. EDGE CASES ───');

  {
    const t = test(62, 'Create sub-admin with empty permissions array');
    const { status, data } = await api('POST', '/auth/subadmins', {
      token: adminToken,
      body: { name: 'No Perms', email: 'noperms@hkt.com', password: 'TestPass123', permissions: [] }
    });
    if (status === 201 && data.data.permissions.length === 0) {
      createdSubAdminId = data.data.id;
      pass(t);
    } else {
      fail(t, `status=${status}, perms=${data?.data?.permissions?.length}`);
    }
  }

  {
    const t = test(63, 'Sub-admin with NO permissions → protected routes → 403');
    const loginRes = await api('POST', '/auth/login', { body: { email: 'noperms@hkt.com', password: 'TestPass123' } });
    const token = loginRes.data.token;
    if (token) {
      const res = await api('GET', '/packages/admin/000000000000000000000000', { token });
      if (res.status === 403) pass(t);
      else fail(t, `status=${res.status}, expected 403`);
    } else {
      fail(t, 'could not login noperms user');
    }
  }

  {
    const t = test(64, 'Sub-admin with NO permissions → POST /packages → 403');
    const loginRes = await api('POST', '/auth/login', { body: { email: 'noperms@hkt.com', password: 'TestPass123' } });
    const token = loginRes.data.token;
    if (token) {
      const res = await api('POST', '/packages', {
        token,
        body: { title: 'x', shortDescription: 'x', description: 'x', duration: { nights: 1, days: 2 }, startingPrice: 100, category: 'adventure' }
      });
      if (res.status === 403) pass(t);
      else fail(t, `status=${res.status}, expected 403`);
    } else {
      fail(t, 'could not login');
    }
    // Cleanup
    await api('DELETE', `/auth/subadmins/${createdSubAdminId}`, { token: adminToken });
  }

  {
    const t = test(65, 'Get sub-admin by ID with lastLogin populated');
    const { status, data } = await api('GET', `/auth/subadmins/${subAdminId}`, { token: adminToken });
    if (status === 200 && data.data.lastLogin) pass(t);
    else fail(t, `status=${status}, lastLogin=${data?.data?.lastLogin}`);
  }

  // ════════════════════════════════════════════
  // SECTION 10: ADMIN SELF-DELETE PREVENTION
  // ════════════════════════════════════════════
  console.log('\n─── 10. ADMIN SELF-DELETE PREVENTION ───');

  {
    const t = test(66, 'Sub-admin cannot use admin routes to delete itself');
    // sub-admin token (from test 46) tries to access admin-only route → 403
    const { status } = await api('DELETE', `/auth/subadmins/${subAdminId}`, { token: subAdminToken });
    if (status === 403) pass(t);
    else fail(t, `status=${status}, expected 403`);
  }

  // ════════════════════════════════════════════
  // CLEANUP & RESTORE
  // ════════════════════════════════════════════
  console.log('\n─── CLEANUP ───');

  {
    const t = test(67, 'Restore sub-admin password to original');
    const { status, data } = await api('PUT', `/auth/subadmins/${subAdminId}`, {
      token: adminToken,
      body: { password: 'ThevalueofPIis3.14159@@@' }
    });
    if (status === 200 && data.success) pass(t);
    else fail(t, `status=${status}`);
  }

  {
    const t = test(68, 'Restore admin name');
    const { status } = await api('PUT', '/auth/profile', {
      token: adminToken,
      body: { currentPassword: 'ThevalueofPIis3.14159@approx', name: 'Anonymous Admin' }
    });
    if (status === 200) pass(t);
    else fail(t, `status=${status}`);
  }

  {
    const t = test(69, 'Verify restored sub-admin can login with original password');
    const { status, data } = await api('POST', '/auth/login', {
      body: { email: 'pankajkumar@hkt.com', password: 'ThevalueofPIis3.14159@@@' }
    });
    if (status === 200 && data.success) pass(t);
    else fail(t, `status=${status}`);
  }

  // ── SUMMARY ──
  console.log('\n========================================================');
  console.log(`  FINAL RESULTS: ${passed}/${total} passed, ${failed}/${total} failed`);
  console.log('========================================================\n');

  if (failed > 0) process.exit(1);
}

run().catch((err) => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
