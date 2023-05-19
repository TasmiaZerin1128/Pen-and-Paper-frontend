import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import matchers from '@testing-library/jest-dom/matchers';

global.jest = vi;

expect.extend(matchers);

afterEach(() => {
    cleanup();
});

