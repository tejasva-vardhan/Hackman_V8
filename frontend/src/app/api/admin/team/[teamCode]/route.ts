import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Registration from '@/models/Registration';
// Admin endpoints rely on strong token auth; no rate limiting applied
import { sanitizeString } from '@/lib/security';
import { sendSelectionEmail } from '@/lib/selectionEmail';

function isAuthorized(request: NextRequest): boolean {
  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const expected = process.env.ADMIN_TOKEN || '';
  
  return Boolean(expected) && token === expected;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ teamCode: string }> }
): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const params = await context.params;
  const teamCode = sanitizeString(params.teamCode).substring(0, 20);

  try {
    await dbConnect();
    const team = await Registration.findOne({ 
      teamCode: teamCode.toUpperCase() 
    }).lean();

    if (!team) {
      return NextResponse.json({ message: 'Team not found' }, { status: 404 });
    }

    return NextResponse.json({ data: team });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching team' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ teamCode: string }> }
): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const params = await context.params;
  const teamCode = sanitizeString(params.teamCode).substring(0, 20);

  try {
    const body = await request.json();
    const { selectionStatus, reviewComments, finalScore } = body;

    const allowed = ['pending', 'selected', 'waitlisted', 'rejected'];
    if (selectionStatus && !allowed.includes(selectionStatus)) {
      return NextResponse.json({ message: 'Invalid selectionStatus' }, { status: 400 });
    }

    await dbConnect();
    // Fetch existing doc to detect status transition
    const existing = await Registration.findOne({ teamCode: teamCode.toUpperCase() }).lean();
    const update: Record<string, unknown> = {};
    if (selectionStatus) update.selectionStatus = selectionStatus;
    if (typeof reviewComments === 'string') update.reviewComments = reviewComments;
    if (typeof finalScore === 'number' || finalScore === null) update.finalScore = finalScore;

    const team = await Registration.findOneAndUpdate(
      { teamCode: teamCode.toUpperCase() },
      update,
      { new: true, runValidators: true }
    ).lean();

    if (!team) {
      return NextResponse.json({ message: 'Team not found' }, { status: 404 });
    }

    // If transitioning to selected, send email notification to team members
    const transitionedToSelected = selectionStatus === 'selected' && existing && existing.selectionStatus !== 'selected';
    if (transitionedToSelected && team) {
      try {
        type MemberLike = { email?: string };
        const membersUnknown: unknown = (team as unknown as { members?: unknown }).members;
        const recipients: string[] = Array.isArray(membersUnknown)
          ? (membersUnknown as MemberLike[])
              .map((m) => m.email)
              .filter((e): e is string => typeof e === 'string' && e.length > 0)
          : [];
        await sendSelectionEmail({ teamName: team.teamName, teamCode: team.teamCode, recipients });
      } catch (emailErr) {
        console.error('Failed to send selection email(s):', emailErr);
      }
    }

    return NextResponse.json({ data: team });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Failed to update team';
    return NextResponse.json({ message: msg }, { status: 400 });
  }
}


