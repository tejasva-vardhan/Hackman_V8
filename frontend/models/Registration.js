import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the member's name."],
  },
  email: {
    type: String,
    required: [true, "Please provide the member's email."],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  phone: {
    type: String,
    required: [true, "Please provide the member's phone number."],
    match: [/^\d{10}$/, 'Phone must contain exactly 10 digits'],
  },
  usn: {
    type: String,
    required: false,
    match: [/^1[a-zA-Z]{2}2[1-5][a-zA-Z]{2}\d{3}$/, 'USN must match 1 + 2 letters + 21-25 + 2 letters + 3 digits'],
  },
  linkedin: {
    type: String,
    required: [true, "Please provide the member's LinkedIn profile URL."],
    match: [/^(https?:\/\/)?([a-z0-9-]+\.)*linkedin\.com\//i, 'LinkedIn URL must be from linkedin.com'],
  },
  github: {
    type: String,
    required: [true, "Please provide the member's GitHub profile URL."],
    match: [/^(https?:\/\/)?([a-z0-9-]+\.)*github\.com\//i, 'GitHub URL must be from github.com'],
  },
});

const RegistrationSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: [true, 'Please provide a team name.'],
    unique: true,
  },
  collegeName: {
    type: String,
    required: [true, 'Please provide a college name.'],
  },
  projectTitle: {
    type: String,
    required: [true, 'Please provide a project title.'],
  },
  projectDescription: {
    type: String,
    required: [true, 'Please provide a project description.'],
  },
  teamLeadId: {
    type: Number,
    required: true,
  },
  members: {
    type: [MemberSchema],
    validate: [v => v.length >= 2 && v.length <= 4, 'Team must have between 2 and 4 members.']
  },
}, { 
  timestamps: true
});

export default mongoose.models.Registration || mongoose.model('Registration', RegistrationSchema);