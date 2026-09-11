import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.js'],
    coverage: {
      provider: 'v8',
      include: ['src/controllers/enquiryController.js', 'src/models/Enquiry.js'],
    },
    testTimeout: 10000,
  },
});
