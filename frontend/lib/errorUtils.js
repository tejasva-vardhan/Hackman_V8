import { NextResponse } from 'next/server';

export function isDuplicateKeyError(error) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 11000
  );
}

export function isValidationError(error) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    error.name === 'ValidationError'
  );
}

export function handleError(error) {
  console.error('API Error:', error);

  if (isDuplicateKeyError(error)) {
    return NextResponse.json(
      { message: 'A team with this name already exists.' },
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
    { message: 'An error occurred on the server.' },
    { status: 500 }
  );
}


