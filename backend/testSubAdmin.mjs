const BASE = 'http://localhost:5000/api';
let passed = 0;
let failed = 0;
let total = 0;
let adminToken = '';
let subAdminToken = '';
let subAdminId = '';
let createdSubAdminId = '';

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
  console.log('\n==============================');
  console.log('  SubAdmin Management API Tests');
  console.log('==============================\n');

  // ── 1. Admin Login ──
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

  // ── 2. Admin Login wrong password ──
  {
    const t = test(2, 'Admin login with WRONG password → 401');
    const { status, data } = await api('POST', '/auth/login', {
      body: { email: 'anonymousadmin@hkt.com', password: 'wrongpassword' }
    });
    if (status === 401 && data.success === false) {
      pass(t);
    } else {
      fail(t, `status=${status}, expected 401`);
    }
  }

  // ── 3. List Sub Admins ──
  {
    const t = test(3, 'List sub-admins with admin token → count >= 1');
    const { status, data } = await api('GET', '/auth/subadmins', { token: adminToken });
    if (status === 200 && data.success && data.count >= 1 && Array.isArray(data.data)) {
      subAdminId = data.data[0]._id;
      pass(t);
    } else {
      fail(t, `status=${status}, count=${data?.count}, data=${JSON.stringify(data).slice(0, 120)}`);
    }
  }

  // ── 4. Get Sub Admin by ID ──
  {
    const t = test(4, `Get sub-admin by ID (${subAdminId})`);
    const { status, data } = await api('GET', `/auth/subadmins/${subAdminId}`, { token: adminToken });
    if (status === 200 && data.success && data.data._id === subAdminId) {
      pass(t);
    } else {
      fail(t, `status=${status}, data=${JSON.stringify(data).slice(0, 120)}`);
    }
  }

  // ── 5. Update Sub Admin name & permissions ──
  {
    const t = test(5, 'Update sub-admin name to "Pankaj Kumar Updated" + restricted permissions');
    const { status, data } = await api('PUT', `/auth/subadmins/${subAdminId}`, {
      token: adminToken,
      body: {
        name: 'Pankaj Kumar Updated',
        permissions: ['packages:view', 'reviews:view']
      }
    });
    if (status === 200 && data.success && data.data.name === 'Pankaj Kumar Updated') {
      pass(t);
    } else {
      fail(t, `status=${status}, name=${data?.data?.name}`);
    }
  }

  // ── 6. Verify updated sub-admin ──
  {
    const t = test(6, 'Verify name=Updated + permissions=[packages:view,reviews:view]');
    const { status, data } = await api('GET', `/auth/subadmins/${subAdminId}`, { token: adminToken });
    const perms = data?.data?.permissions || [];
    const nameOk = data?.data?.name === 'Pankaj Kumar Updated';
    const permsOk = perms.length === 2 && perms.includes('packages:view') && perms.includes('reviews:view');
    if (status === 200 && data.success && nameOk && permsOk) {
      pass(t);
    } else {
      fail(t, `status=${status}, name=${data?.data?.name}, perms=${JSON.stringify(perms)}`);
    }
  }

  // ── 7. Change sub-admin password ──
  {
    const t = test(7, 'Change sub-admin password to "NewPass123"');
    const { status, data } = await api('PUT', `/auth/subadmins/${subAdminId}`, {
      token: adminToken,
      body: { password: 'NewPass123' }
    });
    if (status === 200 && data.success) {
      pass(t);
    } else {
      fail(t, `status=${status}, data=${JSON.stringify(data).slice(0, 120)}`);
    }
  }

  // ── 8. Login sub-admin with OLD password → should FAIL ──
  {
    const t = test(8, 'Sub-admin login with OLD password → 401');
    const { status, data } = await api('POST', '/auth/login', {
      body: { email: 'pankajkumar@hkt.com', password: 'ThevalueofPIis3.14159@@@' }
    });
    if (status === 401 && data.success === false) {
      pass(t);
    } else {
      fail(t, `status=${status}, expected 401`);
    }
  }

  // ── 9. Login sub-admin with NEW password → should SUCCEED ──
  {
    const t = test(9, 'Sub-admin login with NEW password → success');
    const { status, data } = await api('POST', '/auth/login', {
      body: { email: 'pankajkumar@hkt.com', password: 'NewPass123' }
    });
    if (status === 200 && data.success && data.token) {
      subAdminToken = data.token;
      pass(t);
    } else {
      fail(t, `status=${status}, success=${data?.success}`);
    }
  }

  // ── 10. Sub-admin → /api/auth/subadmins → 403 ──
  {
    const t = test(10, 'Sub-admin accesses /api/auth/subadmins → 403');
    const { status, data } = await api('GET', '/auth/subadmins', { token: subAdminToken });
    if (status === 403) {
      pass(t);
    } else {
      fail(t, `status=${status}, expected 403`);
    }
  }

  // ── 11. Sub-admin with packages:view → /api/packages/admin/test → permission check ──
  // The GET /api/packages route is public (no protect), so use /packages/admin/:id which has checkPermission('packages:view')
  {
    const t = test(11, 'Sub-admin with packages:view accesses protected /api/packages/admin/:id → allowed (not 403)');
    const { status } = await api('GET', '/packages/admin/000000000000000000000000', { token: subAdminToken });
    if (status !== 403) {
      pass(t);
    } else {
      fail(t, `status=${status}, expected NOT 403 (permission should be granted)`);
    }
  }

  // ── 12. Sub-admin with NO destinations:create → POST /api/destinations → 403 ──
  // GET /api/destinations is public, so use POST which requires destinations:create permission
  {
    const t = test(12, 'Sub-admin WITHOUT destinations:create → POST /api/destinations → 403');
    const { status } = await api('POST', '/destinations', { token: subAdminToken, body: { name: 'test' } });
    if (status === 403) {
      pass(t);
    } else {
      fail(t, `status=${status}, expected 403`);
    }
  }

  // ── 13. Admin profile update ──
  {
    const t = test(13, 'Admin profile update with correct current password');
    const { status, data } = await api('PUT', '/auth/profile', {
      token: adminToken,
      body: {
        currentPassword: 'ThevalueofPIis3.14159@approx',
        name: 'Anonymous Admin Updated'
      }
    });
    if (status === 200 && data.success) {
      pass(t);
    } else {
      fail(t, `status=${status}, data=${JSON.stringify(data).slice(0, 120)}`);
    }
  }

  // ── 14. Admin profile update with WRONG current password ──
  {
    const t = test(14, 'Admin profile update with WRONG current password → fail');
    const { status, data } = await api('PUT', '/auth/profile', {
      token: adminToken,
      body: {
        currentPassword: 'WrongPassword123',
        name: 'Should Not Update'
      }
    });
    if (status === 401 && data.success === false) {
      pass(t);
    } else {
      fail(t, `status=${status}, expected 401`);
    }
  }

  // ── 15. Create new sub-admin ──
  {
    const t = test(15, 'Create new sub-admin "Test Created"');
    const { status, data } = await api('POST', '/auth/subadmins', {
      token: adminToken,
      body: {
        name: 'Test Created',
        email: 'testcreated@hkt.com',
        password: 'TestPass123',
        permissions: ['gallery:view', 'gallery:upload']
      }
    });
    if (status === 201 && data.success && data.data.name === 'Test Created') {
      createdSubAdminId = data.data.id;
      pass(t);
    } else {
      fail(t, `status=${status}, data=${JSON.stringify(data).slice(0, 120)}`);
    }
  }

  // ── 16. Delete sub-admin ──
  {
    const t = test(16, `Delete sub-admin (${createdSubAdminId})`);
    const { status, data } = await api('DELETE', `/auth/subadmins/${createdSubAdminId}`, { token: adminToken });
    if (status === 200 && data.success) {
      pass(t);
    } else {
      fail(t, `status=${status}, data=${JSON.stringify(data).slice(0, 120)}`);
    }
  }

  // ── 17. Restore original sub-admin ──
  {
    const t = test(17, 'Restore sub-admin to original name + full permissions');
    const fullPerms = [
      'packages:view', 'packages:create', 'packages:edit', 'packages:delete',
      'reviews:view', 'reviews:approve', 'reviews:edit',
      'gallery:view', 'gallery:upload', 'gallery:approve'
    ];
    const { status, data } = await api('PUT', `/auth/subadmins/${subAdminId}`, {
      token: adminToken,
      body: {
        name: 'Pankaj Kumar',
        permissions: fullPerms
      }
    });
    const nameOk = data?.data?.name === 'Pankaj Kumar';
    const permsOk = Array.isArray(data?.data?.permissions) && data.data.permissions.length === fullPerms.length;
    if (status === 200 && data.success && nameOk && permsOk) {
      pass(t);
    } else {
      fail(t, `status=${status}, name=${data?.data?.name}, perms=${JSON.stringify(data?.data?.permissions)}`);
    }
  }

  // ── Summary ──
  console.log('\n==============================');
  console.log(`  SUMMARY: ${passed}/${total} passed, ${failed}/${total} failed`);
  console.log('==============================\n');

  if (failed > 0) process.exit(1);
}

run().catch((err) => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
