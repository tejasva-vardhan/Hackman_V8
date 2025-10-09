import { NextResponse } from 'next/server';

interface DuplicateKeyError {
  code: number;
  keyPattern?: Record<string, unknown>;
  [key: string]: unknown;
}

interface ValidationError {
  name: string;
  errors: Record<string, { message: string }>;
  [key: string]: unknown;
}

export function isDuplicateKeyError(error: unknown): error is DuplicateKeyError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as DuplicateKeyError).code === 11000
  );
}

export function isValidationError(error: unknown): error is ValidationError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    (error as ValidationError).name === 'ValidationError'
  );
}

export function handleError(error: unknown): NextResponse {
  console.error('API Error:', error);

  if (isDuplicateKeyError(error)) {
    // Check which field caused the duplicate key error
    if (error.keyPattern && error.keyPattern.teamCode) {
      return NextResponse.json(
        { message: 'Team code already exists. Please try registering again.' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: 'A team with this information already exists.' },
      { status: 400 }
    );
  }
  
  if (isValidationError(error)) {
    const messages = Object.values(error.errors).map((err) => err.message);
    return NextResponse.json(
      { message: `Validation failed: ${messages.join(', ')}` },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: 'An error occurred on the server. Please try again.' },
    { status: 500 }
  );
}
