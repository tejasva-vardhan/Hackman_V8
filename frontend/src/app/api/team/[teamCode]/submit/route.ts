import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/dbConnect';
import Registration from '../../../../../models/Registration';
import { handleError } from '../../../../../lib/errorUtils';
import { z } from 'zod';

const submissionSchema = z.object({
  githubRepo: z.string().url('GitHub repository must be a valid URL'),
  liveDemo: z.string().url('Live demo must be a valid URL').optional().or(z.literal('')),
  presentationLink: z.string().url('Presentation link must be a valid URL').optional().or(z.literal('')),
  additionalNotes: z.string().max(1000, 'Additional notes must be at most 1000 characters').optional().or(z.literal('')),
});

export async function POST(
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
  { message: 'Project title is required' },
        { status: 400 }
      );
    }

    // Validate submission data
    const parsed = submissionSchema.safeParse(data);

    if (!parsed.success) {
      const { fieldErrors, formErrors } = parsed.error.flatten();
      return NextResponse.json(
        {
          message: 'Validation failed',
          errors: { fieldErrors, formErrors },
        },
        { status: 400 }
      );
    }

    const team = await Registration.findOne({
      projectTitle: { $regex: new RegExp(`^${projectName.trim()}$`, 'i') },
      'members.0.phone': teamCode
    });

    if (!team) {
      return NextResponse.json(
        { message: 'Team not found' },
        { status: 404 }
      );
    }

    // Check if already submitted
    if (team.submissionStatus === 'submitted' || team.submissionStatus === 'under_review') {
      return NextResponse.json(
        { message: 'Project has already been submitted' },
        { status: 400 }
      );
    }

    // Update submission details and status
    const updatedTeam = await Registration.findOneAndUpdate(
      {
        projectTitle: { $regex: new RegExp(`^${projectName.trim()}$`, 'i') },
        'members.0.phone': teamCode
      },
      {
        submissionDetails: {
          githubRepo: parsed.data.githubRepo,
          liveDemo: parsed.data.liveDemo || '',
          presentationLink: parsed.data.presentationLink || '',
          additionalNotes: parsed.data.additionalNotes || '',
          submittedAt: new Date(),
        },
        submissionStatus: 'submitted',
      },
      { new: true, runValidators: true }
    ).select('-__v');

    return NextResponse.json(
      { 
        message: 'Project submitted successfully!',
        team: updatedTeam 
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return handleError(error);
  }
}