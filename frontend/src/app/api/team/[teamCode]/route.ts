import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Registration from '../../../../models/Registration';
import { handleError } from '../../../../lib/errorUtils';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ teamCode: string }> }
) {
  try {
    await dbConnect();
    const { teamCode } = await params;
    const { searchParams } = new URL(request.url);
    const projectName = searchParams.get('projectName');

    if (!teamCode) {
      return NextResponse.json(
        { message: 'Team code is required' },
        { status: 400 }
      );
    }

    if (!projectName) {
      return NextResponse.json(
        { message: 'Project name is required' },
        { status: 400 }
      );
    }

    const team = await Registration.findOne({ 
      teamCode: teamCode.toUpperCase(),
      projectTitle: { $regex: new RegExp(`^${projectName.trim()}$`, 'i') }
    }).select('-__v');

    if (!team) {
      return NextResponse.json(
        { message: 'Invalid credentials. Please check your project name and team code.' },
        { status: 404 }
      );
    }

    return NextResponse.json(team, { status: 200 });
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ teamCode: string }> }
) {
  try {
    await dbConnect();
    const { teamCode } = await params;
    const { searchParams } = new URL(request.url);
    const projectName = searchParams.get('projectName');
    const data = await request.json();

    if (!teamCode) {
      return NextResponse.json(
        { message: 'Team code is required' },
        { status: 400 }
      );
    }

    if (!projectName) {
      return NextResponse.json(
        { message: 'Project name is required' },
        { status: 400 }
      );
    }

    // Validate submission data
    const allowedFields = [
      'projectTitle',
      'projectDescription',
      'submissionDetails.githubRepo',
      'submissionDetails.liveDemo',
      'submissionDetails.presentationLink',
      'submissionDetails.additionalNotes'
    ];

    const updateData: Record<string, unknown> = {};
    
    // Handle nested submissionDetails
    if (data.submissionDetails) {
      updateData.submissionDetails = {
        githubRepo: data.submissionDetails.githubRepo || '',
        liveDemo: data.submissionDetails.liveDemo || '',
        presentationLink: data.submissionDetails.presentationLink || '',
        additionalNotes: data.submissionDetails.additionalNotes || '',
        submittedAt: data.submissionDetails.submittedAt || null,
      };
    }

    // Handle direct fields
    if (data.projectTitle) updateData.projectTitle = data.projectTitle;
    if (data.projectDescription) updateData.projectDescription = data.projectDescription;
    if (data.submissionStatus) updateData.submissionStatus = data.submissionStatus;

    const team = await Registration.findOneAndUpdate(
      { 
        teamCode: teamCode.toUpperCase(),
        projectTitle: { $regex: new RegExp(`^${projectName.trim()}$`, 'i') }
      },
      updateData,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!team) {
      return NextResponse.json(
        { message: 'Team not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(team, { status: 200 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
