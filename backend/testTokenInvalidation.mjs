import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

const API_URL = 'http://localhost:5000';

async function api(method, path, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${API_URL}${path}`, opts);
  const data = await res.json();
  return { status: res.status, data };
}

let passed = 0, failed = 0;
function test(name, ok) {
  if (ok) { passed++; console.log(`  PASS  ${name}`); }
  else { failed++; console.log(`  FAIL  ${name}`); }
}

console.log('=== Token Invalidation Test ===\n');

// 1. Login admin
console.log('1. Admin login');
const adminLogin = await api('POST', '/api/auth/login', { email: 'anonymousadmin@hkt.com', password: 'ThevalueofPIis3.14159@approx' });
test('Admin login succeeds', adminLogin.status === 200);
const adminToken = adminLogin.data.token;

// 2. Login sub-admin
console.log('\n2. Sub-admin login');
const subLogin = await api('POST', '/api/auth/login', { email: 'pankajkumar@hkt.com', password: 'ThevalueofPIis3.14159@@@' });
test('Sub-admin login succeeds', subLogin.status === 200);
const subToken = subLogin.data.token;

// 3. Sub-admin accesses protected route - should work
console.log('\n3. Sub-admin accesses /api/auth/me with current token');
const meBefore = await api('GET', '/api/auth/me', null, subToken);
test('Sub-admin /me works with current token', meBefore.status === 200);

// 4. Get sub-admin ID
const subId = subLogin.data.data.id;

// 5. Admin changes sub-admin password
console.log('\n4. Admin changes sub-admin password');
const changePw = await api('PUT', `/api/auth/subadmins/${subId}`, { password: 'BrandNewPass123' }, adminToken);
test('Admin changes password succeeds', changePw.status === 200);

// 6. Sub-admin tries /me with OLD token - should fail (401)
console.log('\n5. Sub-admin tries /me with OLD token after password change');
const meAfter = await api('GET', '/api/auth/me', null, subToken);
test('Old token is rejected (401)', meAfter.status === 401);

// 7. Sub-admin logs in with NEW password
console.log('\n6. Sub-admin logs in with new password');
const newLogin = await api('POST', '/api/auth/login', { email: 'pankajkumar@hkt.com', password: 'BrandNewPass123' });
test('New password login succeeds', newLogin.status === 200);
const newToken = newLogin.data.token;

// 8. Sub-admin uses new token - should work
console.log('\n7. Sub-admin uses new token');
const meNew = await api('GET', '/api/auth/me', null, newToken);
test('New token works', meNew.status === 200);

// 9. Restore original password
console.log('\n8. Restore original password');
await api('PUT', `/api/auth/subadmins/${subId}`, { password: 'ThevalueofPIis3.14159@@@' }, adminToken);
const restoreLogin = await api('POST', '/api/auth/login', { email: 'pankajkumar@hkt.com', password: 'ThevalueofPIis3.14159@@@' });
test('Original password restored', restoreLogin.status === 200);

console.log(`\n=== Results: ${passed} passed, ${failed} failed ===`);
process.exit(failed > 0 ? 1 : 0);
