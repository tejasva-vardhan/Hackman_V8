import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Registration from '../../../../models/Registration';
import { handleError } from '../../../../lib/errorUtils';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');

    if (!email) {
      return NextResponse.json({ message: 'Team lead email is required' }, { status: 400 });
    }
    if (!phone) {
      return NextResponse.json({ message: 'Team lead phone number is required' }, { status: 400 });
    }

    // Find team and check if the member at teamLeadId index matches the provided email and phone
    const team = await Registration.findOne({
      $expr: {
        $and: [
          { $eq: [ { $arrayElemAt: [ "$members.email", "$teamLeadId" ] }, email.trim() ] },
          { $eq: [ { $arrayElemAt: [ "$members.phone", "$teamLeadId" ] }, phone.trim() ] }
        ]
      }
    }).select('-__v');

    if (team) {
      return NextResponse.json(team, { status: 200 });
    }
    return NextResponse.json({ message: 'Invalid credentials. Please check your team lead email and phone number.' }, { status: 404 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
