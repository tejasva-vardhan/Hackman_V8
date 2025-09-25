import { NextResponse } from 'next/server';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface RegistrationData {
  teamName: string;
  collegeName: string;
  projectTitle: string;
  projectDescription: string;
  teamLeadId: number | null;
  members: TeamMember[];
}

export async function POST(request: Request) {
  try {
    const data: RegistrationData = await request.json();

    if (!data.teamName || !data.collegeName || data.members.length < 2 || data.members.length > 4) {
      return NextResponse.json(
        { message: 'Validation failed: Invalid team name or member count.' },
        { status: 400 } // Bad Request
      );
    }
    

    // 3. (DATABASE LOGIC) - This is where you would save the data to your database
    // For now, we'll just log it to the console to confirm it was received.
    console.log('Received registration data:', data);

    return NextResponse.json(
      { message: 'Registration successful!', data: data },
      { status: 201 } // Created
    );

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { message: 'An error occurred on the server.' },
      { status: 500 } // Internal Server Error
    );
  }
}