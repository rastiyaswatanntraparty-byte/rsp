export type Language = 'ne' | 'en';

export interface WardStats {
  population: number;
  totalVoters: number;
  maleVoters: number;
  malePercent: number;
  femaleVoters: number;
  femalePercent: number;
  otherVoters: number;
  otherPercent: number;
  partyMembers: number;
  toleCount: number;
  schoolsCount: number;
  healthPostCount: number;
  policePostCount: number;
}

export interface Leader {
  id: string;
  nameNe: string;
  nameEn: string;
  roleNe: string;
  roleEn: string;
  phone?: string;
  toleNe: string;
  toleEn: string;
  isKeyContact?: boolean;
  category: 'coordinator' | 'president' | 'executive' | 'member';
}

export interface ToleCommittee {
  id: number;
  nameNe: string;
  nameEn: string;
  coordinatorNe: string;
  coordinatorEn: string;
  phone?: string;
  email?: string;
  status: 'active' | 'in_process';
  keyFocusNe: string;
  keyFocusEn: string;
}

export interface WardAgenda {
  id: string;
  number: string;
  titleNe: string;
  titleEn: string;
  descriptionNe: string;
  descriptionEn: string;
  keyPointsNe: string[];
  keyPointsEn: string[];
  category: string;
}

export interface PollOption {
  id: string;
  textNe: string;
  textEn: string;
  votes: number;
}

export interface MembershipCardData {
  id: string;
  membershipNo: string;
  fullName: string;
  fullNameEn?: string;
  gender: string;
  dob: string;
  phone: string;
  tole: string;
  citizenshipNo: string;
  occupation: string;
  bloodGroup: string;
  issuedDate: string;
  levelWard: string;
  photoUrl?: string;
}

export interface GrievanceItem {
  id: string;
  token: string;
  citizenName: string;
  phone: string;
  tole: string;
  category: string;
  title: string;
  description: string;
  status: 'registered' | 'reviewing' | 'in_progress' | 'resolved';
  submittedDate: string;
  officialNote?: string;
}

export interface FieldReport {
  id: string;
  titleNe: string;
  titleEn: string;
  date: string;
  locationNe: string;
  locationEn: string;
  excerptNe: string;
  excerptEn: string;
  contentNe: string;
  contentEn: string;
  categoryNe: string;
  categoryEn: string;
}
